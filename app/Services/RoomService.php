<?php

namespace App\Services;

use App\Http\Resources\RoomResource;
use App\Repositories\RoomRepository;

class RoomService
{
    public function __construct(
        protected RoomRepository $repo
    ) {}

    public function list(int $perPage = 10): array
    {
        $output['status'] = 200;
        $output['message'] = 'success';

        $data = $this->repo->all($perPage);


        $rooms = RoomResource::collection($data->items());

        $output['output'] = [
            'rooms' => @$rooms,
            'attribute' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage()
            ]
        ];
        return $output;
    }

    public function create(array $data): array
    {
        $output['status'] = 200;
        $output['message'] = 'success';

        // pisahkan images
        $images = $data['images'] ?? [];
        unset($data['images']);
        // tambahkan logika bisnis/transformasi di sini bila perlu

        // kirim data room + images ke repo
        $room = $this->repo->create($data, $images);
        if (!$room) {
            $output['status'] = 500;
            $output['message'] = 'failed';

            return $output;
        }

        return $output;
    }

    public function update(string $id, array $data): array
    {
        $output['status'] = 200;
        $output['message'] = 'success';

        // pisahkan consoles
        $consoles = $data['consoles'] ?? [];
        unset($data['consoles']);

        // pisahkan images
        $images = $data['images'] ?? [];
        unset($data['images']);

        // kirim data room + images ke repo
        $room = $this->repo->update($id, $data, $consoles, $images);

        if (!$room) {
            $output['status'] = 500;
            $output['message'] = 'failed';

            return $output;
        }

        return $output;
    }

    public function delete(string $id): array
    {
        $output['status'] = 200;
        $output['message'] = 'success';

        $room = $this->repo->delete($id);


        if (!$room) {
            $output['status'] = 500;
            $output['message'] = 'failed';

            return $output;
        }

        return $output;
    }

    public function find(string $id): array
    {
        $room = $this->repo->find($id);
        
        $output['status'] = 200;
        $output['message'] = 'success';
        $output['output'] = [
            'room' => new RoomResource($room),
        ];

        return $output;
    }
}
