<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/status', function () {
    return response()->json(['status' => 'ok']);
});

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/booking', function () {
    return Inertia::render('Booking');
});

Route::get('/{id}', function ($id) {
    return Inertia::render('Room', ['roomId' => $id]);
})->name('room.show');
