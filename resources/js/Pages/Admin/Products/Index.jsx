import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Index({ products }) {
    const { flash = {} } = usePage().props;
    // const [loading, setLoading] = useState(false);
    const { delete: destroy, processing } = useForm();


    // Handle delete with confirmation
    const handleDelete = (productId, productName) => {
        if (confirm(`Are you sure you want to delete "${productName}"?`)) {
            destroy(`/admin/products/${productId}`);
        }
    };

    // Handle toggle availability
    const toggleAvailability = async (productId, currentStatus) => {
        try {
            const response = await fetch(`/admin/products/${productId}/toggle-availability`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                window.location.reload(); // Refresh to show updated status
            }
        } catch (error) {
            console.error('Error toggling product status:', error);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* Header with Add Product Button */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                        <Link
                            href="/admin/products/create"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add New Product
                        </Link>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.image ? (
                                                    <img
                                                        src={`/storage/${product.image}`}
                                                        alt={product.name}
                                                        className="h-12 w-12 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                                        <span className="text-xs text-gray-500">No img</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.brand?.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">${product.price}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <input
                                                        type="number"
                                                        defaultValue={product.stock}
                                                        min="0"
                                                        className="w-20 px-2 py-1 border rounded"
                                                        onBlur={(e) => {
                                                            const newStock = parseInt(e.target.value);
                                                            if (newStock !== product.stock) {
                                                                fetch(`/admin/products/${product.id}/stock`, {
                                                                    method: 'PUT',
                                                                    headers: {
                                                                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                                        'Content-Type': 'application/json'
                                                                    },
                                                                    body: JSON.stringify({ stock: newStock })
                                                                }).then(() => window.location.reload());
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => toggleAvailability(product.id, product.is_active)}
                                                    className={`px-2 py-1 rounded text-xs font-semibold ${
                                                        product.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {product.is_active ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    className="text-red-600 hover:text-red-900"
                                                    disabled={processing}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t">
                            {products.links && (
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing {products.from || 0} to {products.to || 0} of {products.total} results
                                    </div>
                                    <div className="flex space-x-2">
                                        {products.links.map((link, index) => (
                                            link.url && (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1 rounded ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
