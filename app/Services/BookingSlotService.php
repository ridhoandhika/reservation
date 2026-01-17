<?php

namespace App\Services;

use App\Repositories\BookingSlotRepository;
use App\Exceptions\BusinessException;

class BookingSlotService
{
    public function __construct(
        protected BookingSlotRepository $repo
    ) {}

    public function createSlotsForBooking(
        string $bookingId,
        string $roomId,
        array $slots
    ): array {
        $created = [];

        foreach ($slots as $slot) {
            if (! $this->repo->isAvailable(
                $roomId,
                $slot['start_time'],
                $slot['end_time']
            )) {
                throw new BusinessException(
                    "Room not available from {$slot['start_time']} to {$slot['end_time']}",
                    409 // conflict
                );
            }

            $created[] = $this->repo->create([
                'booking_id' => $bookingId,
                'room_id'    => $roomId,
                'start_time' => $slot['start_time'],
                'end_time'   => $slot['end_time'],
                'price'      => $slot['price'],
            ]);
        }

        return $created;
    }

    public function checkAvailability(
        string $roomId,
        string $startTime,
        string $endTime
    ): bool {
        return $this->repo->isAvailable($roomId, $startTime, $endTime);
    }

    public function getSlots(
        string $roomId,
        string $startTime,
        string $endTime
    ) {
        return $this->repo->getByRoomAndTime($roomId, $startTime, $endTime);
    }
}
