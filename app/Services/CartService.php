<?php

namespace App\Services;

use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CartService
{
    protected $cart;

    public function __construct()
    {
        // Session cart (for guests)
        $this->cart = session()->get('cart', []);
    }

    // GET CART (works for both session + DB)
    public function getCart()
    {
        // If user is logged in → use database
        if (Auth::check()) {
            return CartItem::with('product')
                ->where('user_id', Auth::id())
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'image' => $item->product->image,
                        'quantity' => $item->quantity,
                    ];
                })
                ->toArray();
        }

        // Guest → session
        return $this->cart;
    }

    // ADD ITEM
    public function add($productId, $quantity)
    {
        $product = Product::findOrFail($productId);

        // If logged in → DB
        if (Auth::check()) {

            $item = CartItem::where('user_id', Auth::id())
                ->where('product_id', $productId)
                ->first();

            if ($item) {
                // Already exists → increase quantity
                $item->quantity += $quantity;
                $item->save();
            } else {
                // Create new row
                CartItem::create([
                    'user_id' => Auth::id(),
                    'product_id' => $productId,
                    'quantity' => $quantity,
                ]);
            }

            return;
        }

        // Guest → session logic
        if (isset($this->cart[$productId])) {
            $this->cart[$productId]['quantity'] += $quantity;
        } else {
            $this->cart[$productId] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
                'quantity' => $quantity,
            ];
        }

        session()->put('cart', $this->cart);
    }

    // UPDATE
    public function update($productId, $quantity)
    {
        if (Auth::check()) {
            CartItem::where('user_id', Auth::id())
                ->where('product_id', $productId)
                ->update(['quantity' => $quantity]);

            return;
        }

        if (isset($this->cart[$productId])) {
            $this->cart[$productId]['quantity'] = $quantity;
            session()->put('cart', $this->cart);
        }
    }

    // REMOVE
    public function remove($productId)
    {
        if (Auth::check()) {
            CartItem::where('user_id', Auth::id())
                ->where('product_id', $productId)
                ->delete();

            return;
        }

        if (isset($this->cart[$productId])) {
            unset($this->cart[$productId]);
            session()->put('cart', $this->cart);
        }
    }

    // TOTAL
    public function getTotal()
    {
        return collect($this->getCart())->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });
    }

    // CLEAR CART
    public function clear()
    {
        if (Auth::check()) {
            CartItem::where('user_id', Auth::id())->delete();
            return;
        }

        session()->forget('cart');
    }
}
