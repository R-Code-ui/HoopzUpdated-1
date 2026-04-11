import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({
    totalSales,
    totalOrders,
    totalCustomers,
    totalProducts, // ✅ Received from controller
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
            <Head title="Admin Dashboard" />

            <div className="py-6 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* HEADER */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black">
                            Dashboard
                        </h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">
                            System Overview & Analytics
                        </p>
                    </div>

                    {/* 🔥 METRIC CARDS (Responsive 5-column grid) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">

                        {/* TOTAL SALES */}
                        <div className="bg-white border-2 border-black p-4 md:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 truncate">Total Sales</h2>
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-black break-all">
                                {formatCurrency(totalSales)}
                            </p>
                        </div>

                        {/* TOTAL ORDERS */}
                        <div className="bg-white border-2 border-black p-4 md:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Orders</h2>
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-black">
                                {totalOrders}
                            </p>
                        </div>

                        {/* TOTAL CUSTOMERS */}
                        <div className="bg-white border-2 border-black p-4 md:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Customers</h2>
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-black">
                                {totalCustomers}
                            </p>
                        </div>

                        {/* TOTAL PRODUCTS ✅ */}
                        <div className="bg-white border-2 border-black p-4 md:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Products</h2>
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-black">
                                {totalProducts}
                            </p>
                        </div>

                        {/* LOW STOCK COUNT */}
                        <div className="bg-white border-2 border-black p-4 md:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] col-span-2 md:col-span-1">
                            <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Low Stock</h2>
                            <p className={`text-xl md:text-2xl lg:text-3xl font-black ${lowStockProducts.length > 0 ? 'text-red-600' : 'text-black'}`}>
                                {lowStockProducts.length}
                            </p>
                        </div>

                    </div>

                    {/* ⚠️ LOW STOCK PRODUCTS LIST */}
                    <div className="bg-white border-2 border-black p-4 md:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-4 mb-6 gap-2">
                            <h2 className="text-sm font-black uppercase tracking-widest text-black">
                                Low Stock Alerts
                            </h2>
                            {lowStockProducts.length > 0 && (
                                <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1">
                                    Action Required
                                </span>
                            )}
                        </div>

                        {lowStockProducts.length === 0 ? (
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 py-4">
                                All products are well stocked ✅
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[300px]">
                                    <thead>
                                        <tr className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            <th className="pb-4">Product Name</th>
                                            <th className="pb-4 text-right">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/5">
                                        {lowStockProducts.map(product => (
                                            <tr key={product.id} className="group">
                                                <td className="py-4 text-xs font-bold uppercase tracking-tight text-black pr-4">
                                                    {product.name}
                                                </td>
                                                <td className="py-4 text-right text-xs font-black text-red-600 uppercase whitespace-nowrap">
                                                    {product.stock} units
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
