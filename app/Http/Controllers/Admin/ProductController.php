<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of products (paginated)
     */
    public function index(Request $request)
    {
        // Get query inputs
        $search = $request->search;
        $sort = $request->sort;

        // Base query with relationship
        $query = Product::with('brand');

        // 🔍 SEARCH (name or brand name)
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhereHas('brand', function ($q2) use ($search) {
                    $q2->where('name', 'like', "%{$search}%");
                });
            });
        }

        // 🔽 SORTING (price)
        if ($sort === 'low-high') {
            $query->orderBy('price', 'asc');
        } elseif ($sort === 'high-low') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest(); // default
        }

        // Pagination (IMPORTANT: keep query string)
        $products = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'sort' => $sort ?? 'default',
            ]
        ]);
    }

    /**
     * Show form to create a new product
     */
    public function create()
    {
        // Get all brands for the dropdown selection
        $brands = Brand::orderBy('name')->get();

        return Inertia::render('Admin/Products/Create', [
            'brands' => $brands
        ]);
    }

    /**
     * Store a newly created product
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255|unique:products,name',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048' // ✅ added webp
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Store image in public disk (storage/app/public/products)
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        // Create the product
        Product::create($validated);

        // Redirect to product list with success message
        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully!');
    }

    /**
     * Show form to edit a product
     */
    public function edit(Product $product)
    {
        // Get all brands for dropdown
        $brands = Brand::orderBy('name')->get();

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'brands' => $brands
        ]);
    }

    /**
     * Update the specified product
     */
    public function update(Request $request, Product $product)
    {
        // Validate request
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255|unique:products,name,' . $product->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048' // ✅ added webp
        ]);

        // Update slug
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($product->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($product->image);
            }

            // Store new image
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        } else {
            // Keep old image
            $validated['image'] = $product->image;
        }

        // Update product
        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully!');
    }

    /**
     * Delete the specified product
     */
    public function destroy(Product $product)
    {
        // Delete the product image from storage if exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        // Delete the product
        $product->delete();

        // Redirect back with success message
        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully!');
    }

    /**
     * Toggle product availability (active/inactive)
     */
    public function toggleAvailability(Product $product)
    {
        // Toggle the is_active status
        $product->is_active = !$product->is_active;
        $product->save();

        // Return JSON response for AJAX requests
        return response()->json([
            'success' => true,
            'is_active' => $product->is_active,
            'message' => 'Product status updated!'
        ]);
    }

    /**
     * Update product stock
     */
    public function updateStock(Request $request, Product $product)
    {
        // Validate stock
        $validated = $request->validate([
            'stock' => 'required|integer|min:0'
        ]);

        // Update stock
        $product->stock = $validated['stock'];
        $product->save();

        return response()->json([
            'success' => true,
            'stock' => $product->stock,
            'message' => 'Stock updated successfully!'
        ]);
    }
}
