<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\BookingService;
use App\Services\BookingSlotService;
use App\Repositories\BookingRepository;
use App\Models\Booking;
use App\Exceptions\BusinessException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;

class BookingServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $bookingRepo;
    protected $slotService;
    protected BookingService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->bookingRepo = Mockery::mock(BookingRepository::class);
        $this->slotService = Mockery::mock(BookingSlotService::class);

        $this->service = new BookingService(
            $this->bookingRepo,
            $this->slotService
        );
    }

    /** @test */
    public function it_can_create_booking_successfully()
    {
        $payload = [
            'room_id' => 'room-uuid',
            'name' => 'John Doe',
            'email' => 'john@mail.com',
            'phone_number' => '08123',
            'slots' => [
                [
                    'start_time' => '2026-01-17 09:00:00',
                    'end_time'   => '2026-01-17 10:00:00',
                    'price'      => 100000,
                ],
            ],
        ];

        $booking = new Booking([
            'id' => 'booking-uuid',
            'room_id' => 'room-uuid',
            'total_price' => 0,
            'status' => 'pending'
        ]);

        /** MOCK repository */
        $this->bookingRepo
            ->shouldReceive('create')
            ->once()
            ->andReturn($booking);

        $this->bookingRepo
            ->shouldReceive('update')
            ->once()
            ->andReturn(true);

        /** MOCK slot service */
        $this->slotService
            ->shouldReceive('createSlotsForBooking')
            ->once()
            ->andReturn([
                ['price' => 100000]
            ]);

        /** ACT */
        $result = $this->service->create($payload);

        $response = $result[0];
        $statusCode = $result[1];

        /** ASSERT */
        $this->assertEquals(200, $statusCode);
        $this->assertEquals('success', $response['message']);
        $this->assertArrayHasKey('booking', $response['output']);
    }

    /** @test */
    public function it_fails_when_slot_is_not_available()
    {
        $payload = [
            'room_id' => 'room-uuid',
            'name' => 'John Doe',
            'email' => 'john@mail.com',
            'phone_number' => '08123',
            'slots' => [
                [
                    'start_time' => '2026-01-17 09:00:00',
                    'end_time'   => '2026-01-17 10:00:00',
                    'price'      => 100000,
                ],
            ],
        ];

        $booking = new Booking([
            'id' => 'booking-uuid',
        ]);

        $this->bookingRepo
            ->shouldReceive('create')
            ->once()
            ->andReturn($booking);

        $this->slotService
            ->shouldReceive('createSlotsForBooking')
            ->once()
            ->andThrow(
                new BusinessException('Room not available', 409)
            );

        $result = $this->service->create($payload);

        // $this->assertEquals(409, $result['status']);
        // $this->assertEquals('Room not available', $result['message']);
        // $this->assertNull($result['output']);

        $response = $result[0];
        $statusCode = $result[1];

        $this->assertEquals(409, $statusCode);
        $this->assertEquals(409, $response['status']);
        $this->assertEquals('Room not available', $response['message']);
        $this->assertNull($response['output']);
    }


    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
