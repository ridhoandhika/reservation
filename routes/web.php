<?php

use App\Mail\BookingMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/status', function () {
    return response()->json(['status' => 'ok']);
});

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/mail', function () {
    Mail::to('ridhoandhik95@gmail.com')->send(new BookingMail());
});