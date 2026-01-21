<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomAvailablityRequest;
use App\Services\AvailableDurationService;
use App\Services\AvailableSlotService;
use App\Services\AvailableStartTimeService;
use Illuminate\Http\Request;

class RoomAvailabilityController extends Controller
{

    public function __construct(
        protected AvailableSlotService $service,
        protected AvailableDurationService $durationService,
        protected AvailableStartTimeService $slotService,
    ) {}

    public function index(RoomAvailablityRequest $request, string $roomId)
    {
        // dump('masuk');
        // var_dump($request->validated());
        $slots = $this->service->getAvailableSlots(
            $roomId,
            ...$request->validated(),
        );
        return $this->baseResponse([
            'status'  => 200,
            'message' => 'Success',
            'output'  => [
                'data' => $slots
            ],
        ], 200);
    }

    public function startTimes(Request $request, string $roomId)
    {
        $slots  = $this->slotService->get(
            $roomId,
            $request->query('date'),
        );

        return $this->baseResponse([
            'status'  => 200,
            'message' => 'Success',
            'output'  => [
                'data' => $slots
            ],
        ], 200);
    }

    public function durations(Request $request, string $roomId)
    {
        $slots  = $this->durationService->get(
            $roomId,
            $request->query('date'),
            $request->query('start_time')
        );

          return $this->baseResponse([
            'status'  => 200,
            'message' => 'Success',
            'output'  => [
                'data' => $slots
            ],
        ], 200);
    }
}
