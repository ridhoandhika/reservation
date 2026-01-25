<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Room;
use App\Models\RoomImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RoomRepositoryImplementation implements RoomRepository
{
    public function all(int $perPage = 15): LengthAwarePaginator
    {
        return Room::with('images', 'consoles')
            ->paginate($perPage);
    }

    public function find(string $id): ?Room
    {
        return Room::with('images', 'consoles')->find($id);
    }

    public function create(array $data, array $images = []): Room
    {
        return DB::transaction(function () use ($data, $images) {
            $consoles = $data['consoles'] ?? [];
            unset($data['consoles']);

            $room = Room::create($data);

            // Attach consoles
            if (!empty($consoles)) {
                $room->consoles()->sync($consoles);
            }

            foreach ($images as $base64) {
                $path = $this->storeImage($room->id, $base64);

                RoomImage::create([
                    'room_id' => $room->id,
                    'image_path' => $path
                ]);
            }

            return $room->load('images', 'consoles');
        });
    }


    public function update(
        string $id,
        array $data,
        array $consoles = [],
        array $images = []
    ): bool {
        return DB::transaction(function () use ($id, $data, $consoles, $images) {

            $room = $this->find($id);

            if (! $room) {
                return false;
            }

            // update room data
            $room->update($data);

            /**
             * ============================
             * CONSOLE SYNC (SMART UPDATE)
             * ============================
             */

            // ambil console_id lama dari DB
            $currentConsoleIds = $room->consoles()
                ->pluck('consoles.id')
                ->map(fn($id) => (string) $id)
                ->sort()
                ->values()
                ->toArray();

            // normalisasi console dari request
            $incomingConsoleIds = collect($consoles)
                ->map(fn($id) => (string) $id)
                ->sort()
                ->values()
                ->toArray();

            // hanya sync kalau beda
            if ($currentConsoleIds !== $incomingConsoleIds) {
                $room->consoles()->sync($incomingConsoleIds);
            }

            /**
             * ============================
             * IMAGE UPDATE (REPLACE)
             * ============================
             */
            if (! empty($images)) {
                foreach ($room->images as $image) {
                    Storage::delete($image->image_path);
                    $image->delete();
                }

                foreach ($images as $base64) {
                    $path = $this->storeImage($room->id, $base64);

                    RoomImage::create([
                        'room_id' => $room->id,
                        'image_path' => $path
                    ]);
                }
            }

            return true;
        });
    }



    public function delete(string $id): bool
    {
        $room = $this->find($id);
        if (! $room) {
            return false;
        }

        foreach ($room->images as $image) {
            Storage::delete($image->image_path);
        }

        return (bool) $room->delete();
    }

    private function storeImage(string $roomId, string $base64): string
    {
        $image = preg_replace('/^data:image\/\w+;base64,/', '', $base64);
        $image = base64_decode($image);

        $filename = Str::uuid() . '.png';
        $path = "rooms/{$roomId}/{$filename}";

        Storage::put($path, $image);

        return $path;
    }
}
