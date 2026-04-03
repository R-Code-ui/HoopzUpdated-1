import React from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchBar from '@/Components/SearchBar'; // 🔥 IMPORT

export default function Index({ orders, filters }) {

    const handleFilter = (e) => {
        router.get(route('admin.orders.index'), {
            status: e.target.value,
            search: filters.search, // 🔥 KEEP SEARCH
        }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white shadow-sm sm:rounded-lg p-6">

                        <h1 className="text-2xl font-bold mb-6">Orders</h1>

                        {/* 🔥 SEARCH BAR COMPONENT */}
                        <SearchBar
                            initialSearch={filters.search}
                            routeName={route('admin.orders.index')} // 🔥 IMPORTANT
                            extraParams={{ status: filters.status }} // 🔥 KEEP FILTER
                        />

                        {/* FILTER */}
                        <select
                            value={filters.status}
                            onChange={handleFilter}
                            className="mb-4 border p-2"
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                        </select>

                        {/* TABLE */}
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">Order #</th>
                                    <th className="p-2">Customer</th>
                                    <th className="p-2">Total</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.data.map(order => (
                                    <tr key={order.id} className="border-t">
                                        <td className="p-2">{order.order_number}</td>
                                        <td className="p-2">{order.user?.name}</td>
                                        <td className="p-2">${order.total}</td>
                                        <td className="p-2 capitalize">{order.status}</td>
                                        <td className="p-2">
                                            <Link
                                                href={route('admin.orders.show', order.id)}
                                                className="text-blue-600"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* PAGINATION */}
                        <div className="mt-10 flex flex-wrap justify-center gap-2">
                            {orders.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={`
                                        px-4 py-2 border-2 border-black font-bold uppercase text-xs tracking-widest transition-all duration-200
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
