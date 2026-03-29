<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // SHOW ALL ORDERS (with optional filters)
    public function index(Request $request)
    {
        // Get filter inputs
        $status = $request->status;
        $date = $request->date;

        // Base query with relationships (VERY IMPORTANT)
        $query = Order::with(['user']);

        // Filter by status
        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        // Filter by date
        if ($date) {
            $query->whereDate('created_at', $date);
        }

        // Paginate results
        $orders = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => [
                'status' => $status ?? 'all',
                'date' => $date,
            ]
        ]);
    }

    // SHOW SINGLE ORDER DETAILS
    public function show(Order $order)
    {
        // Load related data (items + product + user)
        $order->load(['user', 'items.product']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order
        ]);
    }

    // UPDATE ORDER STATUS
    public function updateStatus(Request $request, Order $order)
    {
        // Validate allowed status values
        $request->validate([
            'status' => 'required|in:pending,paid,shipped,completed',
        ]);

        // Update order status
        $order->update([
            'status' => $request->status
        ]);

        return redirect()->back()->with('success', 'Order status updated!');
    }
}
