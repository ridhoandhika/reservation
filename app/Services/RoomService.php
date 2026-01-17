<?php

namespace App\Services;

use App\Repositories\RoomRepository;
use App\Models\Room;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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
       
        $output['output'] = [
            'playstations' => $data->items(),
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
        // tambahkan logika bisnis/transformasi di sini bila perlu
        $room = $this->repo->create($data);

        $output['status'] = 200;
        $output['message'] = 'success';
        if( $room === null ) {
            $output['status'] = 500;
            $output['message'] = 'failed';

            return $output;
        }

        return $output;
    }

    public function update(string $id, array $data): array
    {
        $room = $this->repo->update($id, $data);

        $output['status'] = 200;
        $output['message'] = 'success';
        
        if( $room === null ) {
            $output['status'] = 500;
            $output['message'] = 'failed';

            return $output;
        }

        return $output;
    }

    public function delete(string $id): array
    {
        $room = $this->repo->delete($id);

        $output['status'] = 200;
        $output['message'] = 'success';

        if ($room === null) {
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
            'room' => $room,
        ];

        return $output;
    }
}