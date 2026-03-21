<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController; // we'll create this
use App\Http\Controllers\Admin\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated user routes (customer area)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes – protected by 'role:admin' middleware
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Product Management Routes
    Route::resource('products', ProductController::class);

    // Additional product management routes (non-resource)
    Route::post('/products/{product}/toggle-availability', [ProductController::class, 'toggleAvailability'])->name('products.toggle');
    Route::put('/products/{product}/stock', [ProductController::class, 'updateStock'])->name('products.stock');
});

require __DIR__.'/auth.php';
