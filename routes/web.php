<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Client\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\WishlistController;
use Inertia\Inertia;

// Redirect root to product listing
Route::redirect('/', '/products');

// Client product routes (public)
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::post('/add', [CartController::class, 'add'])->name('cart.add');
    Route::patch('/update', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/remove', [CartController::class, 'remove'])->name('cart.remove');
});

// Checkout routes (AUTH REQUIRED)
Route::middleware('auth')->prefix('checkout')->group(function () {
    Route::get('/', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/process', [CheckoutController::class, 'process'])->name('checkout.process');
    Route::get('/success/{order}', [CheckoutController::class, 'success'])->name('checkout.success');
});

// Profile routes (authenticated users only)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Wishlist routes (authenticated users only)
Route::middleware('auth')->prefix('wishlist')->name('wishlist.')->group(function () {
    Route::get('/', [WishlistController::class, 'index'])->name('index');
    Route::post('/add', [WishlistController::class, 'add'])->name('add');
    Route::delete('/remove', [WishlistController::class, 'remove'])->name('remove');
    Route::post('/toggle', [WishlistController::class, 'toggle'])->name('toggle');
});

// Admin routes – protected by 'role:admin' middleware
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('products', AdminProductController::class);
    Route::post('/products/{product}/toggle-availability', [AdminProductController::class, 'toggleAvailability'])->name('products.toggle');
    Route::put('/products/{product}/stock', [AdminProductController::class, 'updateStock'])->name('products.stock');

    // 🔥 ADD THIS
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
});

require __DIR__.'/auth.php';

//How to Access Admin Panel
// Admin Dashboard: http://127.0.0.1:8000/admin/dashboard
// Admin Products: http://127.0.0.1:8000/admin/products
// Add New Product: http://127.0.0.1:8000/admin/products/create
// Edit Product: http://127.0.0.1:8000/admin/products/{id}/edit
