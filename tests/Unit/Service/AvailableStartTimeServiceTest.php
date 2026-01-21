<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\AvailableStartTimeService;
use App\Models\Room;
use App\Models\BookingSlot;
use Carbon\Carbon;

class AvailableStartTimeServiceTest extends TestCase
{
    use RefreshDatabase;

    protected AvailableStartTimeService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(AvailableStartTimeService::class);
    }

    public function test_returns_start_times_before_next_booking_only()
    {
        $room = Room::factory()->create();

        // Existing booking: 13:05 - 14:05
        BookingSlot::factory()->create([
            'room_id'    => $room->id,
            'start_time' => '2026-01-21 13:05:00',
            'end_time'   => '2026-01-21 14:05:00',
        ]);

        $times = $this->service->get(
            $room->id,
            '2026-01-21',
            60,
            5
        );

        // Allowed
        $this->assertContains('12:05', $times);

        // Not allowed (overlap)
        $this->assertNotContains('12:10', $times);
        $this->assertNotContains('13:00', $times);
    }
}
