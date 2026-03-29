import React from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ order }) {

    const updateStatus = (e) => {
        router.patch(route('admin.orders.updateStatus', order.id), {
            status: e.target.value
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white shadow-sm sm:rounded-lg p-6">

                        <h1 className="text-2xl font-bold mb-4">
                            Order #{order.order_number}
                        </h1>

                        {/* CUSTOMER INFO */}
                        <p><strong>Customer:</strong> {order.user.name}</p>
                        <p><strong>Status:</strong> {order.status}</p>

                        {/* UPDATE STATUS */}
                        <div className="my-4">
                            <select
                                value={order.status}
                                onChange={updateStatus}
                                className="border p-2"
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="shipped">Shipped</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* ITEMS */}
                        <h2 className="text-xl font-bold mt-6">Items</h2>

                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between border-b py-2">
                                <span>{item.product.name}</span>
                                <span>{item.quantity} x ${item.price}</span>
                            </div>
                        ))}

                        {/* TOTAL */}
                        <div className="text-right mt-4 font-bold">
                            Total: ${order.total}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
