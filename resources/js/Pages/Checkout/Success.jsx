import React from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Success({ order }) {

    return (
        <>
            <Header />

            <div className="max-w-4xl mx-auto p-6">

                {/* SUCCESS MESSAGE */}
                <div className="bg-white p-6 rounded shadow text-center mb-6">
                    <h1 className="text-3xl font-bold text-green-600 mb-2">
                        Order Placed Successfully!
                    </h1>

                    <p className="text-gray-600">
                        Thank you for your purchase 🎉
                    </p>

                    <p className="mt-3">
                        Order Number: <strong>{order.order_number}</strong>
                    </p>
                </div>

                {/* ORDER DETAILS */}
                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-4 font-semibold border-b pb-2 mb-3 text-sm">
                        <span>Product</span>
                        <span>Qty</span>
                        <span>Price</span>
                        <span>Total</span>
                    </div>

                    {/* ORDER ITEMS */}
                    {order.items.map(item => (
                        <div key={item.id} className="grid grid-cols-4 mb-3 text-sm">

                            {/* PRODUCT NAME + BRAND */}
                            <span>
                                {item.product?.brand?.name} - {item.product?.name}
                            </span>

                            <span>{item.quantity}</span>

                            <span>${parseFloat(item.price).toFixed(2)}</span>

                            <span>
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <hr className="my-4" />

                    {/* TOTAL */}
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total Paid</span>
                        <span>${parseFloat(order.total).toFixed(2)}</span>
                    </div>

                </div>

                {/* BUTTON */}
                <div className="text-center mt-6">
                    <Link
                        href="/products"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                    >
                        Continue Shopping
                    </Link>
                </div>

            </div>
        </>
    );
}
