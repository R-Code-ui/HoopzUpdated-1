<?php

namespace App\Services;

use App\Models\Product;

class CartService
{
    protected $cart;

    public function __construct()
    {
        // Get cart from session or empty array
        $this->cart = session()->get('cart', []);
    }

    // Get all cart items
    public function getCart()
    {
        return $this->cart;
    }

    // Add product to cart
    public function add($productId, $quantity)
    {
        $product = Product::findOrFail($productId);

        if (isset($this->cart[$productId])) {
            // If already in cart → increase quantity
            $this->cart[$productId]['quantity'] += $quantity;
        } else {
            // Add new item
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

    // Update quantity
    public function update($productId, $quantity)
    {
        if (isset($this->cart[$productId])) {
            $this->cart[$productId]['quantity'] = $quantity;
            session()->put('cart', $this->cart);
        }
    }

    // Remove item
    public function remove($productId)
    {
        if (isset($this->cart[$productId])) {
            unset($this->cart[$productId]);
            session()->put('cart', $this->cart);
        }
    }

    // Get total price
    public function getTotal()
    {
        return collect($this->cart)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });
    }

    // Clear cart after checkout
    public function clear()
    {
        session()->forget('cart');
    }
}
