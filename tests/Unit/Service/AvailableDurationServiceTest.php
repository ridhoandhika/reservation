<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\AvailableDurationService;
use App\Models\Room;
use App\Models\BookingSlot;

class AvailableDurationServiceTest extends TestCase
{
    use RefreshDatabase;

    protected AvailableDurationService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(AvailableDurationService::class);
    }

    public function test_duration_is_limited_by_next_booking()
    {
        $room = Room::factory()->create();

        // Next booking at 13:05
        BookingSlot::factory()->create([
            'room_id'    => $room->id,
            'start_time' => '2026-01-21 13:05:00',
            'end_time'   => '2026-01-21 14:05:00',
        ]);

        $durations = $this->service->get(
            $room->id,
            '2026-01-21',
            '12:05'
        );

        // Only 1 hour allowed
        $this->assertCount(1, $durations);
        $this->assertEquals(60, $durations[0]['value']);
    }

    public function test_duration_is_limited_by_close_time()
    {
        $room = Room::factory()->create();

        // No booking, but close time is 22:00
        $durations = $this->service->get(
            $room->id,
            '2026-01-21',
            '20:00'
        );

        // Only 2 hours allowed
        $this->assertCount(2, $durations);
        $this->assertEquals(120, $durations[1]['value']);
    }

    public function test_duration_is_limited_by_earliest_of_booking_or_close_time()
    {
        $room = Room::factory()->create();

        // Booking at 21:00
        BookingSlot::factory()->create([
            'room_id'    => $room->id,
            'start_time' => '2026-01-21 21:00:00',
            'end_time'   => '2026-01-21 22:00:00',
        ]);

        $durations = $this->service->get(
            $room->id,
            '2026-01-21',
            '20:00'
        );

        // Only 1 hour allowed (20-21)
        $this->assertCount(1, $durations);
        $this->assertEquals(60, $durations[0]['value']);
    }
}
