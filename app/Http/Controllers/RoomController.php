<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Services\RoomService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{

    public function __construct(
        protected RoomService $service
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $data = $this->service->list();

            return $this->baseResponse($data, 200);
        } catch (\Throwable $e) {
            Log::error('Failed get Rooms', [
                'message' => $e->getMessage(),
                'time' => now()
            ]);
            return $this->baseResponse([
                'status'  => 500,
                'message' => 'Rooms fetch failed',
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(CreateRoomRequest $request)
    {
        try {
            return $this->baseResponse(
                $this->service->create($request->validated()),
                200
            );
        } catch (\Throwable $e) {
            Log::error('Room creation failed', [
                'message' => $e->getMessage(),
                'time' => now()
            ]);
            return $this->baseResponse([
                'status'  => 500,
                'message' => 'Rooms created failed',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            return $this->baseResponse($this->service->find($id), 200);
        } catch (\Throwable $e) {
            Log::error('Get Room failed', [
                'message' => $e->getMessage(),
                'time' => now()
            ]);
            return $this->baseResponse([
                'status'  => 500,
                'message' => 'failed',
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, string $id)
    {
        try {
            return $this->baseResponse($this->service->update($id, $request->validated()), 200);
        } catch (\Throwable $e) {
            Log::error('Get Room failed', [
                'message' => $e->getMessage(),
                'time' => now()
            ]);
            return $this->baseResponse([
                'status'  => 500,
                'message' => 'failed',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
