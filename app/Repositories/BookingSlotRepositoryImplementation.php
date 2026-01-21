<?php

namespace App\Repositories;

use App\Models\BookingSlot;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class BookingSlotRepositoryImplementation implements BookingSlotRepository
{
    public function create(array $data): BookingSlot
    {
        return BookingSlot::create($data);
    }

    public function isAvailable(
        string $roomId,
        string $startTime,
        string $endTime
    ): bool {
        $start = Carbon::parse($startTime);
        $end   = Carbon::parse($endTime);

        /** 1️⃣ Durasi minimal 1 jam */
        if ($start->diffInMinutes($end) < 60) {
            return false;
        }
        /** 2️⃣ Cek overlap (RULE UTAMA) */
        $overlap = BookingSlot::where('room_id', $roomId)
            ->where(function ($q) use ($start, $end) {
                $q->where('start_time', '<', $end)
                    ->where('end_time', '>', $start);
            })
            ->exists();

        if ($overlap) {
            return false;
        }

        return true;
    }

    public function getByRoomAndTime(
        string $roomId,
        string $startTime,
        string $endTime
    ): Collection {
        return BookingSlot::query()
            ->where('room_id', $roomId)
            ->whereBetween('start_time', [$startTime, $endTime])
            ->orderBy('start_time')
            ->get();
    }

    public function getNextBookingStart(
        string $roomId,
        string $startTime
    ): ?string {
        return BookingSlot::where('room_id', $roomId)
            ->where('start_time', '>', $startTime)
            ->orderBy('start_time')
            ->value('start_time');
    }
}
