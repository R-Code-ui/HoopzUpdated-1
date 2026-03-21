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
    public function index()
    {
        // Get all products with their brand relationship, paginated (10 per page)
        $products = Product::with('brand')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Return Inertia view with products data
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // 2MB max
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
        // Validate the request data
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255|unique:products,name,' . $product->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Update slug if name changed
        $validated['slug'] = Str::slug($validated['name']);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            // Store new image
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        // Update the product
        $product->update($validated);

        // Redirect back with success message
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
