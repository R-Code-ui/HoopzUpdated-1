<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // ✅ Use Auth facade
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products with filtering, sorting, and wishlist status.
     */
    public function index(Request $request)
    {
        // Start query with brand relationship
        $query = Product::with('brand')->where('is_active', true);

        // Filter by brand
        if ($request->has('brand') && $request->brand !== 'all') {
            $brand = Brand::where('slug', $request->brand)->first();
            if ($brand) {
                $query->where('brand_id', $brand->id);
            }
        }

        // Filter by search
        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sorting
        $sort = $request->get('sort', 'default');
        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $products = $query->paginate(12);
        $brands = Brand::orderBy('name')->get();

        // ✅ Get wishlist IDs for the current user (if logged in)
        $wishlistIds = [];
        if (Auth::check()) {
            $wishlistIds = Auth::user()->wishlist()->pluck('product_id')->toArray();
        }

        return Inertia::render('Products/Index', [
            'products'    => $products,
            'brands'      => $brands,
            'filters'     => [
                'brand'  => $request->brand ?? 'all',
                'search' => $request->search ?? '',
                'sort'   => $sort,
            ],
            'wishlistIds' => $wishlistIds, // 👈 passed to frontend
        ]);
    }

    /**
     * Display a single product detail page.
     */
    public function show($slug)
    {
        $product = Product::with('brand')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // ✅ Check if product is in user's wishlist (if logged in)
        $isInWishlist = false;
        if (Auth::check()) {
            $isInWishlist = Auth::user()->wishlist()->where('product_id', $product->id)->exists();
        }

        return Inertia::render('Products/Show', [
            'product'      => $product,
            'isInWishlist' => $isInWishlist, // 👈 passed to frontend
        ]);
    }
}
