<?php

namespace App\Http\Controllers;

use App\Exceptions\BusinessException;
use App\Http\Requests\CreateBookingRequest;
use App\Services\BookingService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    //
    public function __construct(
        protected BookingService $service
    ) {}

    public function store(CreateBookingRequest $request)
    {
        try {
            $result = $this->service->create($request->all());

            return $this->baseResponse(
                $result[0],
                $result[1]
            );
        } catch (BusinessException $e) {
            Log::error('Booking creation failed', [
                'message' => $e->getMessage(),
                'time'    => now(),
            ]);

            return $this->baseResponse([
                'status'  => 500,
                'message' => 'Booking created failed contact administrator',
            ], 500);
        }
    }
}
