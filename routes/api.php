<?php

use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConsoleController;
use App\Http\Controllers\RoomAvailabilityController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;


Route::middleware(['throttle:api'])->group(function () {
    Route::get('/status', function () {
        return response()->json(['status' => 'ok']);
    });

    // route ke controller
    // respond to preflight OPTIONS requests for the API (helps avoid 405 on CORS preflight)
    Route::options('{any}', function () {
        return response()->json([], 200);
    })->where('any', '.*');


    Route::get('/consoles', [ConsoleController::class, 'index']);
    Route::get('/consoles/{id}', [ConsoleController::class, 'show']);
    Route::post('/consoles', [ConsoleController::class, 'create']);
    Route::put('/consoles/{id}', [ConsoleController::class, 'update']);
    Route::delete('/consoles/{id}', [ConsoleController::class, 'destroy']);

    Route::get('/rooms', [RoomController::class, 'index']);
    Route::get('/rooms/{id}', [RoomController::class, 'show']);
    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);

    Route::post('/bookings', [BookingController::class, 'store']);
    Route::post('/mail', function (Request $request) {
        dispatch(new \App\Jobs\SendEmailJob($request->email));

        return response()->json(['status' => 'email dispatched'], 200);
    });

    Route::get('/rooms/{roomId}/available-slots', [RoomAvailabilityController::class, 'index']);

    Route::get(
        '/rooms/{roomId}/available-start-times',
        [RoomAvailabilityController::class, 'startTimes']
    );

    Route::get(
        '/rooms/{roomId}/available-durations',
        [RoomAvailabilityController::class, 'durations']
    );
});
