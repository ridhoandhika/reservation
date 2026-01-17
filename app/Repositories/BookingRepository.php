<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Booking;

interface BookingRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator;
    public function find(string $id): ?Booking;
    public function create(array $data): Booking;
    public function update(string $id, array $data): bool;
    public function delete(string $id): bool;
}

