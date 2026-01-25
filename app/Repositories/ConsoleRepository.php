<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Console;

interface ConsoleRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator;
    public function find(string $id): ?Console;
    public function create(array $data): Console;
    public function update(string $id, array $data): bool;
    public function delete(string $id): bool;
}

