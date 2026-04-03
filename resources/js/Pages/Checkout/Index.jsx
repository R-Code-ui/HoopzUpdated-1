import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Index({ cart, total }) {

    // ✅ Form state
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        payment_method: 'cod', // default
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Send form to backend
        router.post('/checkout/process', form);
    };

    const items = Object.values(cart);

    return (
        <>
            <Header />

            <div className="max-w-7xl mx-auto p-6">

                {/* TITLE */}
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                {/* GRID LAYOUT (like real eCommerce) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* ================= LEFT SIDE (FORM) ================= */}
                    <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 rounded shadow">

                        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

                        {/* NAME */}
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border p-3 mb-4 rounded"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />

                        {/* ADDRESS */}
                        <textarea
                            placeholder="Full Address"
                            className="w-full border p-3 mb-4 rounded"
                            rows="4"
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            required
                        />

                        {/* PHONE */}
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="w-full border p-3 mb-4 rounded"
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            required
                        />

                        {/* PAYMENT METHOD */}
                        <h2 className="text-xl font-bold mt-6 mb-3">Payment Method</h2>

                        <select
                            className="w-full border p-3 mb-6 rounded"
                            onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
                        >
                            <option value="cod">Cash on Delivery</option>
                            <option value="gcash">GCash (Simulated)</option>
                        </select>

                        {/* PLACE ORDER BUTTON */}
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold">
                            Place Order
                        </button>

                    </form>

                    {/* ================= RIGHT SIDE (SUMMARY) ================= */}
                    <div className="bg-white p-6 rounded shadow">

                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        {/* ITEMS */}
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between mb-3 text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}

                        <hr className="my-4" />

                        {/* TOTAL */}
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${parseFloat(total).toFixed(2)}</span>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}
