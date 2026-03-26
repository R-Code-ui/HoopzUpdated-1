<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CartService;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    // Show checkout page
    public function index()
    {
        $cart = $this->cartService->getCart();

        // Prevent access if cart is empty
        if (empty($cart)) {
            return redirect()->route('cart.index')
                ->with('error', 'Cart is empty!');
        }

        return Inertia::render('Checkout/Index', [
            'cart' => $cart,
            'total' => $this->cartService->getTotal(),
        ]);
    }

    // Process order
    public function process(Request $request)
    {
        $cart = $this->cartService->getCart();

        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        // Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
        ]);

        // Generate order number (UNIQUE)
        $orderNumber = 'ORD-' . now()->format('Ymd') . '-' . strtoupper(Str::random(5));

        // Create order
        $order = Order::create([
            'user_id' => auth()->id(),
            'order_number' => $orderNumber,
            'status' => 'pending', // ✅ Option B (simulation)
            'total' => $this->cartService->getTotal(),
        ]);

        // Save order items
        foreach ($cart as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'], // IMPORTANT: store price snapshot
            ]);
        }

        // Clear cart after order
        session()->forget('cart');

        return redirect()->route('checkout.success', $order->id);
    }

    // Success page
    public function success(Order $order)
    {
        return Inertia::render('Checkout/Success', [
            'order' => $order
        ]);
    }
}
