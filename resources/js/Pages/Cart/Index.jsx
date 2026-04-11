import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Index({ cart, total }) {
    const items = Object.values(cart);

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        router.patch('/cart/update', { id, quantity }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        if (confirm('Remove item from cart?')) {
            router.delete('/cart/remove', { data: { id }, preserveScroll: true });
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans tracking-tight">
            <Head title="Shopping Bag - Hoopz" />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* 1. SECTION HEADER */}
                <div className="mb-12 border-l-4 border-black pl-4">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                        Your Bag ({items.length})
                    </h1>
                </div>

                {items.length === 0 ? (
                    /* 2. EMPTY STATE */
                    <div className="text-center py-24 border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold uppercase tracking-widest italic mb-8">
                            Your bag is currently empty.
                        </p>
                        <Link
                            href="/products"
                            className="inline-block px-8 py-3 border-2 border-black bg-black text-white text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black"
                        >
                            Back to Shop
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* 3. ITEMS LIST (Left Side) */}
                        <div className="lg:col-span-8">
                            {items.map(item => (
                                <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-100 py-8 gap-6 group">
                                    <div className="flex items-center gap-6">
                                        {/* Image Box - Grayscale effect removed, always in full color */}
                                        <div className="w-24 h-24 bg-white overflow-hidden border border-gray-100 p-2 flex items-center justify-center">
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.name}
                                                className="max-w-full max-h-full object-contain" // object-contain keeps the whole shoe visible
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-black uppercase tracking-tight mb-1">{item.name}</h2>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Unit Price: ${item.price}</p>

                                            {/* Mobile-Only Remove (Hidden on Tablet+) */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="mt-2 text-[10px] font-black uppercase tracking-widest text-red-600 md:hidden"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full md:w-auto gap-8">
                                        {/* Quantity Selector Custom UI */}
                                        <div className="flex items-center border-2 border-black">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 py-1 font-bold hover:bg-black hover:text-white transition-colors"
                                            >-</button>
                                            <span className="px-4 py-1 text-xs font-black border-x-2 border-black">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-1 font-bold hover:bg-black hover:text-white transition-colors"
                                            >+</button>
                                        </div>

                                        {/* Desktop-Only Remove */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="hidden md:block text-gray-300 hover:text-black transition-colors"
                                            title="Remove Item"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 4. SUMMARY CARD (Right Side) */}
                        <div className="lg:col-span-4">
                            <div className="border-2 border-black p-8 sticky top-24">
                                <h2 className="text-xl font-black uppercase italic tracking-tighter mb-6 border-b-2 border-black pb-4">
                                    Summary
                                </h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                        <span>Subtotal</span>
                                        <span>${total}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                        <span>Shipping</span>
                                        <span className="text-black">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-black uppercase tracking-tight pt-4 border-t border-gray-100">
                                        <span>Total</span>
                                        <span>${total}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.visit('/checkout')}
                                    className="w-full bg-black text-white py-4 text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black border-2 border-black mb-4"
                                >
                                    Proceed to Checkout
                                </button>

                                <Link
                                    href="/products"
                                    className="block text-center w-full bg-white text-black py-4 text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-gray-100 border-2 border-black"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
