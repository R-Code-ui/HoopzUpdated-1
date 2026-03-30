import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react'; // ✅ Single import
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import QuantitySelector from '@/Components/QuantitySelector';

export default function Show({ product, isInWishlist = false }) {
    const [quantity, setQuantity] = useState(1);

    // Add to cart using router.post
    const handleAddToCart = () => {
        router.post('/cart/add', {
            product_id: product.id,
            quantity: quantity,
        }, {
            preserveScroll: true, // Stay on the same page after adding
        });
    };

    // Toggle wishlist (add/remove) using router.post
    const toggleWishlist = () => {
        router.post('/wishlist/toggle', {
            product_id: product.id,
        }, {
            preserveScroll: true,
        });
    };

    // Helper to format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <>
            <Head title={`${product.name} - Hoopz`} />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Product Image */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {product.image ? (
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">No image</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2">
                        <p className="text-sm text-gray-500 mb-1">{product.brand?.name}</p>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-2xl font-bold text-blue-600 mb-4">{formatPrice(product.price)}</p>

                        {/* Stock Availability */}
                        <div className="mb-4">
                            {product.stock > 0 ? (
                                <span className="text-green-600 font-semibold">In Stock ({product.stock} available)</span>
                            ) : (
                                <span className="text-red-600 font-semibold">Out of Stock</span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-600">{product.description || 'No description available.'}</p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6 flex items-center space-x-4">
                            <span className="font-semibold">Quantity:</span>
                            <QuantitySelector
                                initialQuantity={1}
                                min={1}
                                max={product.stock}
                                onQuantityChange={setQuantity}
                            />
                        </div>

                        {/* Action Buttons: Add to Cart + Wishlist */}
                        <div className="flex gap-4">
                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`flex-1 py-3 rounded-lg font-bold text-white transition-colors ${
                                    product.stock > 0
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>

                            {/* Wishlist Button – only visible if user is logged in (optional) */}
                            <button
                                onClick={toggleWishlist}
                                className="p-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                {isInWishlist ? (
                                    // Filled heart (in wishlist)
                                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                ) : (
                                    // Outline heart (not in wishlist)
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
