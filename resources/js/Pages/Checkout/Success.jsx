import React from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Success({ order }) {
    return (
        <>
            <Header />

            <div className="text-center mt-20">
                <h1 className="text-3xl font-bold text-green-600">
                    Order Placed Successfully!
                </h1>

                <p className="mt-4">
                    Order Number: <strong>{order.order_number}</strong>
                </p>

                <Link
                    href="/products"
                    className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Continue Shopping
                </Link>
            </div>
        </>
    );
}
