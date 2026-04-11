import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import QuantitySelector from '@/Components/QuantitySelector';

export default function Show({ product, isInWishlist = false }) {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        router.post('/cart/add', {
            product_id: product.id,
            quantity: quantity,
        }, {
            preserveScroll: true,
        });
    };

    const toggleWishlist = () => {
        router.post('/wishlist/toggle', {
            product_id: product.id,
        }, {
            preserveScroll: true,
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <div className="bg-white min-h-screen font-sans tracking-tight">
            <Head title={`${product.name} - Hoopz`} />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-24">

                    {/* 1. PRODUCT IMAGE: Minimalist box without shadows */}
                    <div className="md:w-1/2">
                        <div className="border-2 border-black bg-white aspect-square flex items-center justify-center p-8">
                            {product.image ? (
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="text-xs font-black uppercase tracking-widest text-gray-300">
                                    No Image Available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. PRODUCT INFO */}
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <div className="mb-8">
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
                                {product.brand?.name || 'Hoopz Exclusive'}
                            </p>
                            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-bold tracking-tighter">
                                {formatPrice(product.price)}
                            </p>
                        </div>

                        {/* Stock Availability: Clean text, no bubbles */}
                        <div className="mb-8">
                            <p className={`text-xs font-black uppercase tracking-widest ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `In Stock / ${product.stock} units` : 'Out of Stock'}
                            </p>
                        </div>

                        {/* Description: Simple typography */}
                        <div className="mb-10 max-w-md">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-3 border-b border-black pb-1 inline-block">
                                Description
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                {product.description || 'Minimalist performance gear designed for the modern athlete.'}
                            </p>
                        </div>

                        {/* 3. ACTIONS: Quantity and Buttons */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-6">
                                <span className="text-xs font-black uppercase tracking-widest">Qty:</span>
                                <div className="border-2 border-black inline-block">
                                    <QuantitySelector
                                        initialQuantity={1}
                                        min={1}
                                        max={product.stock}
                                        onQuantityChange={setQuantity}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {/* Add to Cart Button: Solid Black */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] border-2 border-black transition-all ${
                                        product.stock > 0
                                            ? 'bg-black text-white hover:bg-white hover:text-black'
                                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                    }`}
                                >
                                    {product.stock > 0 ? 'Add to Bag' : 'Sold Out'}
                                </button>

                                {/* Wishlist Button: Monochrome Square */}
                                <button
                                    onClick={toggleWishlist}
                                    className="p-4 border-2 border-black hover:bg-gray-50 transition-colors"
                                    aria-label="Toggle Wishlist"
                                >
                                    <svg
                                        className={`w-5 h-5 ${isInWishlist ? 'fill-black' : 'fill-none stroke-black stroke-2'}`}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
