<?php

namespace App\Services;

use App\Repositories\BookingSlotRepository;
use App\Exceptions\BusinessException;
use App\Repositories\RoomRepository;
use Carbon\Carbon;

class BookingSlotService
{
    public function __construct(
        protected BookingSlotRepository $repo,
        protected RoomRepository $roomRepo
    ) {}

    public function createSlotsForBooking(
        string $bookingId,
        string $roomId,
        array $slots
    ): array {
        $created = [];

        $room = $this->roomRepo->find($roomId);
        if (! $room) {
            throw new BusinessException('Room not found', 404);
        }

        $pricePerHour = $room->price_per_hour;



        foreach ($slots as $slot) {
            $start = Carbon::parse($slot['start_time']);
            $end   = Carbon::parse($slot['end_time']);

            /** minimal 1 jam */
            if ($start->diffInMinutes($end) < 60) {
                throw new BusinessException(
                    'Minimum booking duration is 1 hour',
                    422
                );
            }

            /** split per jam */
            while ($start < $end) {

                $slotEnd = $start->copy()->addHour();

                if (! $this->repo->isAvailable(
                    $roomId,
                    $start->toDateTimeString(),
                    $slotEnd->toDateTimeString()
                )) {
                    throw new BusinessException(
                        "Room not available from {$start} to {$slotEnd}",
                        409
                    );
                }

                $created[] = $this->repo->create([
                    'booking_id' => $bookingId,
                    'room_id'    => $roomId,
                    'start_time' => $start,
                    'end_time'   => $slotEnd,
                    'price'      => $pricePerHour,
                ]);

                $start = $slotEnd;
            }
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
