import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    // Helper to format price with 2 decimals
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <Link href={`/products/${product.slug}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Product Image */}
                <div className="h-48 overflow-hidden">
                    {product.image ? (
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.brand?.name}</p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</p>
                </div>
            </div>
        </Link>
    );
}
