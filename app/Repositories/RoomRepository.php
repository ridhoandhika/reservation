<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Room;

interface RoomRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator;
    public function find(string $id): ?Room;
    public function create(array $data): Room;
    public function update(string $id, array $data): bool;
    public function delete(string $id): bool;
}

