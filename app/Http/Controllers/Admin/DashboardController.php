<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

// 🔥 Import models (IMPORTANT)
use App\Models\Order;
use App\Models\User;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        // Authorization (you already had this ✔)
        Gate::authorize('view dashboard');

        // TOTAL SALES (sum of all orders)
        $totalSales = Order::sum('total');

        // TOTAL ORDERS (count all orders)
        $totalOrders = Order::count();

        // TOTAL CUSTOMERS (only users with customer role)
        $totalCustomers = User::role('customer')->count();
        // If you want all users instead:
        // $totalCustomers = User::count();

        // LOW STOCK PRODUCTS (less than 5)
        $lowStockProducts = Product::where('stock', '<', 5)
            ->where('is_active', true) // only active products
            ->get();

        // Send data to React (Inertia)
        return Inertia::render('Admin/Dashboard', [
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
            'totalCustomers' => $totalCustomers,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }
}
