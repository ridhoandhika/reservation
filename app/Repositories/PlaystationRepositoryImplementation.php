<?php

namespace App\Repositories;

use App\Models\Playstation;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PlaystationRepositoryImplementation implements PlaystationRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator
    {
        return Playstation::query()->paginate($perPage);
    }

    public function find(string $id): ?Playstation
    {
        return Playstation::find($id);
    }

    public function create(array $data): Playstation
    {
        return Playstation::create($data);
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