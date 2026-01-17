<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Room;

class RoomRepositoryImplementation implements RoomRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator
    {
        return Room::query()->paginate($perPage);
    }

    public function find(string $id): ?Room
    {
        return Room::with('playstation')->find($id);
    }

    public function create(array $data): Room
    {
        return Room::create($data);
    }

    public function update(string $id, array $data): bool
    {
        $room = $this->find($id);
        if (! $room) {
            return false;
        }
        return $room->update($data);
    }

    public function delete(string $id): bool
    {
        $room = $this->find($id);
        if (! $room) {
            return false;
        }
        return (bool) $room->delete();
    }
}
