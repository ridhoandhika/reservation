<?php

namespace App\Repositories;

use App\Models\BookingSlot;
use Illuminate\Support\Collection;

interface BookingSlotRepository
{
    public function create(array $data): BookingSlot;

    public function isAvailable(
        string $roomId,
        string $startTime,
        string $endTime
    ): bool;

    public function getByRoomAndTime(
        string $roomId,
        string $startTime,
        string $endTime
    ): Collection;
}
