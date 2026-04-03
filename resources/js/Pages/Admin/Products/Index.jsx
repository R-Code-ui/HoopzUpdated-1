import React from 'react';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchBar from '@/Components/SearchBar';

export default function Index({ products, filters }) {
    const { flash = {} } = usePage().props;
    const { delete: destroy, processing } = useForm();

    // DELETE PRODUCT
    const handleDelete = (id, name) => {
        if (confirm(`Delete "${name}"?`)) {
            destroy(`/admin/products/${id}`);
        }
    };

    // TOGGLE STATUS
    const toggleAvailability = async (id) => {
        await fetch(`/admin/products/${id}/toggle-availability`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        });
        window.location.reload();
    };

    // SORT HANDLER
    const handleSort = (e) => {
        router.get(route('admin.products.index'), {
            search: filters.search,
            sort: e.target.value,
        }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* SUCCESS MESSAGE */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 p-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Product Management</h1>
                        <Link
                            href="/admin/products/create"
                            className="bg-black text-white px-4 py-2 rounded"
                        >
                            + Add Product
                        </Link>
                    </div>

                    {/* 🔍 SEARCH BAR */}
                    <SearchBar initialSearch={filters.search} />

                    {/* 🔽 SORT FILTER */}
                    <div className="mb-4">
                        <select
                            value={filters.sort}
                            onChange={handleSort}
                            className="border p-2"
                        >
                            <option value="default">Default</option>
                            <option value="low-high">Price: Low → High</option>
                            <option value="high-low">Price: High → Low</option>
                        </select>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white shadow rounded">
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">Image</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Brand</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Stock</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.data.map(product => (
                                    <tr key={product.id} className="border-t">
                                        <td className="p-2">
                                            {product.image ? (
                                                <img src={`/storage/${product.image}`} className="w-12 h-12 object-cover" />
                                            ) : 'No image'}
                                        </td>

                                        <td className="p-2">{product.name}</td>
                                        <td className="p-2">{product.brand?.name}</td>
                                        <td className="p-2">${product.price}</td>

                                        {/* STOCK INPUT */}
                                        <td className="p-2">
                                            <input
                                                type="number"
                                                defaultValue={product.stock}
                                                className="w-16 border"
                                                onBlur={(e) => {
                                                    fetch(`/admin/products/${product.id}/stock`, {
                                                        method: 'PUT',
                                                        headers: {
                                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({ stock: e.target.value })
                                                    }).then(() => window.location.reload());
                                                }}
                                            />
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-2">
                                            <button
                                                onClick={() => toggleAvailability(product.id)}
                                                className={`px-2 py-1 text-xs rounded ${
                                                    product.is_active ? 'bg-green-200' : 'bg-red-200'
                                                }`}
                                            >
                                                {product.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="p-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-blue-600 mr-2"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* 🔥 PAGINATION (B/W CENTER STYLE) */}
                        <div className="mt-10 flex flex-wrap justify-center gap-2 p-4">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={`
                                        px-4 py-2 border-2 border-black font-bold text-xs
                                        ${link.active
                                            ? 'bg-black text-white'
                                            : 'bg-white text-black hover:bg-black hover:text-white'
                                        }
                                        ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
