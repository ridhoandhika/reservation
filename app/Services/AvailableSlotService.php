<?php

namespace App\Services;

use App\Repositories\BookingSlotRepository;
use Carbon\Carbon;

class AvailableSlotService
{
    public function __construct(
        protected BookingSlotRepository $slotRepo
    ) {}

    public function getAvailableSlots(
        string $roomId,
        string $date,
        int $duration = 60,
        int $interval = 5
    ): array {
        $openTime  = Carbon::parse("$date 10:00"); // jam buka
        $closeTime = Carbon::parse("$date 22:00"); // jam tutup

        $slots = [];

        $cursor = $openTime->copy();

        while ($cursor->copy()->addMinutes($duration)->lte($closeTime)) {
            $start = $cursor->copy();
            $end   = $cursor->copy()->addMinutes($duration);

            if ($this->slotRepo->isAvailable(
                $roomId,
                $start->toDateTimeString(),
                $end->toDateTimeString()
            )) {
                $slots[] = [
                    'start_time' => $start->format('H:i'),
                    'end_time'   => $end->format('H:i'),
                ];
            }

            $cursor->addMinutes($interval);
        }

        return $slots;
    }
}
