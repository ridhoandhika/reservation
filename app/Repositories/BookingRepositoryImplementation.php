<?php

namespace App\Repositories;

use App\Models\Booking;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class BookingRepositoryImplementation implements BookingRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator
    {
        return Booking::query()->paginate($perPage);
    }

    public function find(string $id): ?Booking
    {
        return Booking::find($id);
    }

    public function create(array $data): Booking
    {
        return Booking::create($data);
    }

    public function update(string $id, array $data): bool
    {
        $booking = $this->find($id);
        if (! $booking) {
            return false;
        }
        return $booking->update($data);
    }

    public function delete(string $id): bool
    {
        $booking = $this->find($id);
        if (! $booking) {
            return false;
        }
        return (bool) $booking->delete();
    }
}