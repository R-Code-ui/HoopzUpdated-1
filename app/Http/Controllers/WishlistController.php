<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * Display the user's wishlist.
     */
    public function index()
    {
        $user = Auth::user();
        $wishlist = $user->wishlist()->with('brand')->get(); // Load brand relation for display

        return Inertia::render('Wishlist/Index', [
            'wishlist' => $wishlist,
        ]);
    }

    /**
     * Add a product to the wishlist.
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = Auth::user();
        $user->wishlist()->attach($request->product_id);

        return redirect()->back()->with('success', 'Product added to wishlist!');
    }

    /**
     * Remove a product from the wishlist.
     */
    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = Auth::user();
        $user->wishlist()->detach($request->product_id);

        return redirect()->back()->with('success', 'Product removed from wishlist!');
    }

    /**
     * Toggle (add/remove) a product from the wishlist.
     * Useful for a single button that changes state.
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = Auth::user();
        $productId = $request->product_id;

        if ($user->wishlist()->where('product_id', $productId)->exists()) {
            $user->wishlist()->detach($productId);
            $message = 'Product removed from wishlist!';
        } else {
            $user->wishlist()->attach($productId);
            $message = 'Product added to wishlist!';
        }

        return redirect()->back()->with('success', $message);
    }
}
