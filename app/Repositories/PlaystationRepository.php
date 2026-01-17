<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Playstation;

interface PlaystationRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator;
    public function find(string $id): ?Playstation;
    public function create(array $data): Playstation;
    public function update(string $id, array $data): bool;
    public function delete(string $id): bool;
}

