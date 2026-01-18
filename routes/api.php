<?php

use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlaystationController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;

Route::get('/status', function () {
    return response()->json(['status' => 'ok']);
});

// route ke controller
// respond to preflight OPTIONS requests for the API (helps avoid 405 on CORS preflight)
Route::options('{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');

Route::get('/playstations', [PlaystationController::class, 'index']);
Route::get('/playstations/{id}', [PlaystationController::class, 'show']);
Route::post('/playstations', [PlaystationController::class, 'create']);
Route::put('/playstations/{id}', [PlaystationController::class, 'update']);
Route::delete('/playstations/{id}', [PlaystationController::class, 'destroy']);

Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::post('/rooms', [RoomController::class, 'create']);

Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/mail', function (Request $request) {
    dispatch(new \App\Jobs\SendEmailJob($request->email));

    return response()->json(['status' => 'email dispatched'], 200);
});