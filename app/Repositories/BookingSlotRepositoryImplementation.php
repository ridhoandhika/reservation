<?php

namespace App\Repositories;

use App\Models\BookingSlot;
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
        return ! BookingSlot::query()
            ->where('room_id', $roomId)
            ->where(function ($q) use ($startTime, $endTime) {
                $q->whereBetween('start_time', [$startTime, $endTime])
                    ->orWhereBetween('end_time', [$startTime, $endTime])
                    ->orWhere(function ($q2) use ($startTime, $endTime) {
                        $q2->where('start_time', '<=', $startTime)
                            ->where('end_time', '>=', $endTime);
                    });
            })
            ->exists();
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
}
