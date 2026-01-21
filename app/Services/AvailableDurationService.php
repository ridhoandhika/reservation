<?php

namespace App\Services;

use App\Repositories\BookingSlotRepository;
use Carbon\Carbon;

class AvailableDurationService
{
    public function __construct(
        protected BookingSlotRepository $repo
    ) {}

    public function get(
        string $roomId,
        string $date,
        string $startTime,
        int $closeHour = 22
    ): array {
        $start = Carbon::parse("$date $startTime");

        /** Jam tutup */
        $closeTime = Carbon::parse("$date {$closeHour}:00");

        /** Booking terdekat setelah start */
        $nextBookingStart = $this->repo->getNextBookingStart(
            $roomId,
            $start->toDateTimeString()
        );

        $limitEndTime = $closeTime;

        if ($nextBookingStart) {
            $nextBooking = Carbon::parse($nextBookingStart);
            if ($nextBooking->lt($limitEndTime)) {
                $limitEndTime = $nextBooking;
            }
        }

        /** Hitung max durasi */
        $maxMinutes = $start->diffInMinutes($limitEndTime);

        $durations = [];

        for ($hour = 1; $hour <= floor($maxMinutes / 60); $hour++) {
            $durations[] = [
                'label' => "{$hour} jam",
                'value' => $hour * 60,
            ];
        }

        return $durations;
    }
}
