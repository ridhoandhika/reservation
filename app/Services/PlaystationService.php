<?php

namespace App\Services;

use App\Repositories\PlaystationRepository;

class PlaystationService
{
    public function __construct(
        protected PlaystationRepository $repo
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
        $output['status'] = 200;
        $output['message'] = 'success';
        
        $playstation = $this->repo->create($data);

        if ($playstation === null) {
            $output['status'] = 500;
            $output['message'] = 'failed';

            return $output;
        }

        $output['output'] = [
            'playstation' => $playstation,
        ];

        return $output;
    }

    public function update(string $id, array $data): array
    {
        $output['status'] = 200;
        $output['message'] = 'success';

        $playstation = $this->repo->update($id, $data);

        if ($playstation === null) {
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

        $playstation = $this->repo->delete($id);

        if ($playstation === null) {
            $output['status'] = 500;
            $output['message'] = 'failed';

            return $output;
        }

        return $output;
    }

    public function find(string $id): array
    {
        $output['status'] = 200;
        $output['message'] = 'success';

        $playstation = $this->repo->find($id);

        $output['output'] = [
            'playstation' => $playstation,
        ];
       return $output;
    }
}
