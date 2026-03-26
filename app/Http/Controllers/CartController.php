<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CartService;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    // Show cart page
    public function index()
    {
        return Inertia::render('Cart/Index', [
            'cart' => $this->cartService->getCart(),
            'total' => $this->cartService->getTotal(),
        ]);
    }

    // Add to cart
    public function add(Request $request)
    {
        $this->cartService->add(
            $request->product_id,
            $request->quantity
        );

        return redirect()->route('cart.index')
            ->with('success', 'Product added to cart!');
    }

    // Update quantity
    public function update(Request $request)
    {
        $this->cartService->update(
            $request->id,
            $request->quantity
        );

        return back();
    }

    // Remove item
    public function remove(Request $request)
    {
        $this->cartService->remove($request->id);

        return back();
    }
}
