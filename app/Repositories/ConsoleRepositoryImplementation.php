<?php

namespace App\Repositories;

use App\Models\Console;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ConsoleRepositoryImplementation implements ConsoleRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator
    {
        return Console::query()->paginate($perPage);
    }

    public function find(string $id): ?Console
    {
        return Console::find($id);
    }

    public function create(array $data): Console
    {
        return Console::create($data);
    }

    public function update(string $id, array $data): bool
    {
        $play = $this->find($id);
        if (! $play) {
            return false;
        }
        return $play->update($data);
    }

    public function delete(string $id): bool
    {
        $play = $this->find($id);
        if (! $play) {
            return false;
        }
        return (bool) $play->delete();
    }
}