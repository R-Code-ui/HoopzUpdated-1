import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminDashboard({
    totalSales,
    totalOrders,
    totalCustomers,
    lowStockProducts
}) {

    // 💰 Format price nicely
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* 🔥 METRIC CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* TOTAL SALES */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-gray-500 text-sm">Total Sales</h2>
                            <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(totalSales)}
                            </p>
                        </div>

                        {/* TOTAL ORDERS */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-gray-500 text-sm">Total Orders</h2>
                            <p className="text-2xl font-bold">
                                {totalOrders}
                            </p>
                        </div>

                        {/* TOTAL CUSTOMERS */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-gray-500 text-sm">Customers</h2>
                            <p className="text-2xl font-bold">
                                {totalCustomers}
                            </p>
                        </div>

                        {/* LOW STOCK COUNT */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-gray-500 text-sm">Low Stock</h2>
                            <p className="text-2xl font-bold text-red-600">
                                {lowStockProducts.length}
                            </p>
                        </div>

                    </div>

                    {/* ⚠️ LOW STOCK PRODUCTS LIST */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4 text-red-600">
                            Low Stock Alerts
                        </h2>

                        {lowStockProducts.length === 0 ? (
                            <p className="text-gray-500">
                                All products are well stocked ✅
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {lowStockProducts.map(product => (
                                    <div
                                        key={product.id}
                                        className="flex justify-between border-b pb-2"
                                    >
                                        {/* Product name */}
                                        <span className="font-medium">
                                            {product.name}
                                        </span>

                                        {/* Remaining stock */}
                                        <span className="text-red-600 font-bold">
                                            {product.stock} left
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
