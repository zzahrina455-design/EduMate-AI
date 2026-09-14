<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman Utama (Landing Page)
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// Halaman Berproteksi (Wajib Login)
Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/chat', function () {
        return Inertia::render('Chat');
    })->name('chat');

    Route::get('/upload', function () {
        return Inertia::render('Upload');
    })->name('upload');

    Route::get('/history', function () {
        return Inertia::render('History');
    })->name('history');

});

require __DIR__.'/auth.php';