import React from 'react';
import { useForm } from '@inertiajs/react';

export default function ProductForm({ product = null, brands, submitUrl, method = 'post' }) {
    const { data, setData, post, put, processing, errors } = useForm({
        brand_id: product?.brand_id || '',
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        stock: product?.stock || '',
        is_active: product?.is_active ?? true,
        image: null,
        _method: method === 'put' ? 'put' : undefined
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('brand_id', data.brand_id);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        formData.append('is_active', data.is_active);

        if (data.image) {
            formData.append('image', data.image);
        }

        if (method === 'put') {
            formData.append('_method', 'PUT');
            post(submitUrl, formData);
        } else {
            post(submitUrl, formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Brand Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Brand *</label>
                <select
                    value={data.brand_id}
                    onChange={(e) => setData('brand_id', e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                {errors.brand_id && <p className="text-red-500 text-xs mt-1">{errors.brand_id}</p>}
            </div>

            {/* Product Name */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Product Name *</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price ($) *</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity *</label>
                    <input
                        type="number"
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
                {product?.image && (
                    <div className="mb-2">
                        <img src={`/storage/${product.image}`} alt={product.name} className="h-32 w-32 object-cover rounded" />
                        <p className="text-xs text-gray-500 mt-1">Current image</p>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('image', e.target.files[0])}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                <p className="text-xs text-gray-500 mt-1">Allowed: JPEG, PNG, JPG, GIF (max 2MB)</p>
            </div>

            {/* Status Toggle */}
            <div className="mb-6">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="mr-2"
                    />
                    <span className="text-gray-700 text-sm font-bold">Product Active (available for sale)</span>
                </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={() => window.location.href = '/admin/products'}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                </button>
            </div>
        </form>
    );
}
