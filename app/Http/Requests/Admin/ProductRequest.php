<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class ProductRequest extends FormRequest
{
    // 👉 ProductRequest is a Laravel validation class that checks and prepares product data before it gets saved.
    // 🔑 Simple breakdown:
    // ✅ Validates input (name, price, stock, image, etc.)
    // ✅ Prevents invalid data from reaching your database
    // ✅ Auto-generates a slug from the product name
    // ✅ Keeps your controller clean

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization handled by middleware
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $productId = $this->route('product') ? $this->route('product')->id : null;

        return [
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255|unique:products,name,' . $productId,
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    /**
     * Prepare the data for validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->name),
        ]);
    }
}
