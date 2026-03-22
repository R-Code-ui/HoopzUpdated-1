import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import QuantitySelector from '@/Components/QuantitySelector';

export default function Show({ product }) {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        // Placeholder – will implement cart later
        console.log(`Added ${quantity} of ${product.name} to cart`);
        alert(`Added ${quantity} of ${product.name} to cart (demo)`);
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

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${
                                product.stock > 0
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
