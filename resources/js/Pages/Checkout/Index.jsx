import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Index({ cart, total }) {
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/checkout/process', form);
    };

    const items = Object.values(cart);

    return (
        <>
            <Header />

            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>

                <div className="grid grid-cols-2 gap-6">

                    {/* LEFT: FORM */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border p-2 mb-3"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <textarea
                            placeholder="Address"
                            className="w-full border p-2 mb-3"
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            className="w-full border p-2 mb-3"
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />

                        {/* PAYMENT SIMULATION */}
                        <select className="w-full border p-2 mb-3">
                            <option>Cash on Delivery</option>
                            <option>GCash (Simulated)</option>
                        </select>

                        <button className="bg-green-600 text-white px-6 py-2 rounded">
                            Place Order
                        </button>
                    </form>

                    {/* RIGHT: ORDER SUMMARY */}
                    <div>
                        <h2 className="font-bold mb-4">Order Summary</h2>

                        {items.map(item => (
                            <div key={item.id} className="flex justify-between mb-2">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}

                        <hr className="my-4" />

                        <h2 className="text-xl font-bold">
                            Total: ${total}
                        </h2>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
