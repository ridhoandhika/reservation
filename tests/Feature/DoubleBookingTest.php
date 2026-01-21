<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DoubleBookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_two_users_cannot_book_the_same_room_and_time_slot()
    {
        // 1️⃣ Arrange
        $room = Room::factory()->create();

        $payload = [
            'room_id' => $room->id,
            'name' => 'User One',
            'email' => 'user1@mail.com',
            'phone_number' => '0811111111',
            'slots' => [
                [
                    'start_time' => '2026-01-17 09:00:00',
                    'end_time'   => '2026-01-17 10:00:00',
                    'price'      => 100000,
                ]
            ]
        ];

        // 2️⃣ Act — USER PERTAMA booking (harus sukses)
        $response1 = $this->postJson('/api/bookings', $payload);

        $response1
            ->assertStatus(200)
            ->assertJson([
                'status' => 200,
                'message' => 'success',
            ]);

        // Pastikan booking & slot masuk DB
        $this->assertDatabaseCount('bookings', 1);
        $this->assertDatabaseCount('booking_slots', 1);

        // 3️⃣ Act — USER KEDUA booking slot yang sama (harus gagal)
        $payload['name'] = 'User Two';
        $payload['email'] = 'user2@mail.com';

        $response2 = $this->postJson('/api/bookings', $payload);

        // 4️⃣ Assert — HARUS CONFLICT
        $response2
            ->assertStatus(409)
            ->assertJson([
                'status' => 409,
                'message' => 'Room not available from 2026-01-17 09:00:00 to 2026-01-17 10:00:00',
            ]);

        // Pastikan DB tidak bertambah
        $this->assertDatabaseCount('bookings', 1);
        $this->assertDatabaseCount('booking_slots', 1);
    }
}
