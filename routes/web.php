<?php

use Illuminate\Support\Facades\Route;

// Catch-all route for React SPA - must be last
Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');
