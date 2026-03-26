import React from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Index({ cart, total }) {
    const items = Object.values(cart);

    const updateQuantity = (id, quantity) => {
        router.patch('/cart/update', { id, quantity });
    };

    const removeItem = (id) => {
        router.delete('/cart/remove', { data: { id } });
    };

    return (
        <>
            <Header />

            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

                {items.length === 0 && <p>Your cart is empty.</p>}

                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={`/storage/${item.image}`}
                                className="w-20 h-20 object-cover"
                            />
                            <div>
                                <h2 className="font-semibold">{item.name}</h2>
                                <p>${item.price}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) =>
                                    updateQuantity(item.id, parseInt(e.target.value))
                                }
                                className="w-16 border text-center"
                            />

                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {/* TOTAL */}
                <div className="text-right mt-6">
                    <h2 className="text-xl font-bold">
                        Total: ${total}
                    </h2>
                </div>

                <div className="flex justify-between mt-6">
                    {/* BACK BUTTON */}
                    <button
                        onClick={() => window.history.back()}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        ← Back
                    </button>

                    {/* CHECKOUT BUTTON */}
                    <button
                        onClick={() => router.visit('/checkout')}
                        className="bg-blue-600 text-white px-6 py-2 rounded"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
}
