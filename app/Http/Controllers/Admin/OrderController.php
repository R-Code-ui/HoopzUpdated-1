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
        // Get filters
        $status = $request->status;
        $date = $request->date;
        $search = $request->search; // 🔥 NEW (search input)

        // Base query with relationships
        $query = Order::with(['user']);

        // 🔥 SEARCH LOGIC (VERY IMPORTANT)
        if ($search) {
            $query->where(function ($q) use ($search) {
                // Search by order number
                $q->where('order_number', 'like', "%{$search}%")

                // OR search by customer name
                ->orWhereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%{$search}%");
                });
            });
        }

        // Filter by status
        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        // Filter by date
        if ($date) {
            $query->whereDate('created_at', $date);
        }

        // Pagination
        $orders = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => [
                'status' => $status ?? 'all',
                'date' => $date,
                'search' => $search ?? '', // 🔥 pass to frontend
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
