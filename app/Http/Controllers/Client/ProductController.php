<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products with optional filtering by brand and search term.
     */
    public function index(Request $request)
    {
        // Start query with brand relationship loaded (to display brand name)
        $query = Product::with('brand')->where('is_active', true); // only active products

        // Filter by brand slug if provided
        if ($request->has('brand') && $request->brand !== 'all') {
            $brand = Brand::where('slug', $request->brand)->first();
            if ($brand) {
                $query->where('brand_id', $brand->id);
            }
        }

        // Filter by search term if provided
        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Order products by newest first
        $products = $query->orderBy('created_at', 'desc')->paginate(12);

        // Get all brands for the filter buttons
        $brands = Brand::orderBy('name')->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'brands' => $brands,
            'filters' => [
                'brand' => $request->brand ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Display a single product detail page.
     */
    public function show($slug)
    {
        // Find product by slug with its brand
        $product = Product::with('brand')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
}
