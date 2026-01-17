<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_booking_can_be_created_and_saved_to_database()
    {
        // 1. buat room dulu (karena booking butuh room_id)
        $room = Room::factory()->create();

        $payload = [
            'room_id' => $room->id,
            'name' => 'John Doe',
            'email' => 'john@mail.com',
            'phone_number' => '08123456789',
            'slots' => [
                [
                    'start_time' => '2026-01-17 09:00:00',
                    'end_time'   => '2026-01-17 10:00:00',
                    'price'      => 100000,
                ]
            ]
        ];

        // 2. panggil endpoint booking (pastikan route sudah ada)
        $response = $this->postJson('/api/bookings', $payload);

        $response->assertStatus(200);

        // 3. cek data booking tersimpan
        $this->assertDatabaseHas('bookings', [
            'room_id' => $room->id,
            'name' => 'John Doe',
            'email' => 'john@mail.com',
        ]);

        // // 4. cek data slot tersimpan
        $this->assertDatabaseHas('booking_slots', [
            'room_id' => $room->id,
            'price' => 100000,
        ]);
    }
}
