<?php

namespace App\Services;

use App\Repositories\BookingSlotRepository;
use Carbon\Carbon;

class AvailableStartTimeService
{
    public function __construct(
        protected BookingSlotRepository $repo
    ) {}

    public function get(
        string $roomId,
        string $date,
        int $minDuration = 60,
        int $interval = 1
    ): array {
        $open  = Carbon::parse("$date 12:00");
        $close = Carbon::parse("$date 22:00");

        $times = [];
        $cursor = $open->copy();

        while ($cursor->copy()->addMinutes($minDuration)->lte($close)) {
            $start = $cursor->copy();
            $end   = $start->copy()->addMinutes($minDuration);

            if ($this->repo->isAvailable(
                $roomId,
                $start->toDateTimeString(),
                $end->toDateTimeString()
            )) {
                $times[] = $start->format('H:i');
            }

            $cursor->addMinutes($interval);
        }

        return $times;
    }
}
