<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Repositories\BookingRepository;
use Illuminate\Support\Facades\DB;

class BookingService
{

    public function __construct(
        protected BookingRepository $bookingRepo,
        protected BookingSlotService $slotService
    ) {}

    public function create(array $data): array
    {
        try {
            $booking = DB::transaction(function () use ($data) {

                $booking = $this->bookingRepo->create([
                    'room_id'      => $data['room_id'],
                    'name'         => $data['name'],
                    'email'        => $data['email'],
                    'phone_number' => $data['phone_number'],
                    'status'       => 'pending',
                    'total_price'  => 0,
                ]);

                $slots = $this->slotService->createSlotsForBooking(
                    $booking->id,
                    $data['room_id'],
                    $data['slots']
                );

                $this->bookingRepo->update($booking->id, [
                    'total_price' => collect($slots)->sum('price'),
                    'status'      => 'confirmed',
                ]);

                return $booking->fresh();
            });

            return [[
                'status'  => 200,
                'message' => 'success',
                'output'  => [
                    'booking' => $booking
                ]
            ], 200];
        } catch (BusinessException $e) {
            /**
             * BUSINESS ERROR
             * ex: slot not available
             */
            return [[
                'status'  => $e->getStatus(),
                'message' => $e->getMessage(),
                'output'  => null,
            ], 409];
        }
    }
}
