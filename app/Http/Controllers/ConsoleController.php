<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateConsoleRequest;
use App\Http\Requests\UpdateConsoleRequest;
use App\Services\ConsoleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ConsoleController extends Controller
{

    public function __construct(
        protected ConsoleService $service
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $playsations = $this->service->list();
        return $this->baseResponse($playsations, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(CreateConsoleRequest $request)
    {
        try {
            $playsations =  $this->service->create($request->all());
            return $this->baseResponse($playsations, 200);
        } catch (\Throwable $e) {
            Log::error('Console creation failed', [
                'message' => $e->getMessage(),
                'time' => now()
            ]);
            return $this->baseResponse([
                'status'  => 500,
                'message' => 'Console creation failed',
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $playsations = $this->service->find($id);
        return $this->baseResponse($playsations, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConsoleRequest $request, string $id)
    {
        try {
            //code...
            $playsations = $this->service->update($id, $request->all());
            return $this->baseResponse($playsations, 200);
        } catch (\Throwable $e) {
            Log::error('Console creation failed', [
                'message' => $e->getMessage(),
                'time' => now()
            ]);
            return $this->baseResponse([
                'status'  => 500,
                'message' => 'Console update failed',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $playsations = $this->service->delete($id);
            return $this->baseResponse($playsations, 200);
        } catch (\Throwable $e) {
            Log::error('Playstation deletion failed', [
                'message' => $e->getMessage(),
                'time' => now()
            ]);
            return $this->baseResponse([
                'status'  => 500,
                'message' => 'Playstation deletion failed',
            ], 500);
        }
    }
}
