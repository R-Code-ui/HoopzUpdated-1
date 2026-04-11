import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    // Helper to format price in PHP (Philippine Peso) as per your image
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(price);
    };

    return (
        <Link href={`/products/${product.slug}`} className="group block w-full">
            <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 group-hover:border-black flex flex-col h-full">

                {/* Product Image Container */}
                {/* aspect-square ensures the card stays perfectly shaped */}
                <div className="relative aspect-square w-full bg-white flex items-center justify-center p-8 overflow-hidden">
                    {product.image ? (
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            // object-contain ensures the whole shoe is visible without being cropped
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-50 flex items-center justify-center">
                            <span className="text-zinc-400 font-medium uppercase tracking-widest text-xs">No Image</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                    {/* Brand Name */}
                    <p className="text-lg md:text-xl font-medium text-black mb-1">
                        {product.brand?.name || 'Nike'}
                    </p>

                    {/* Product Name - Bold and Sharp */}
                    <h3 className="text-xl md:text-2xl font-bold text-black leading-tight mb-4 flex-grow tracking-tight">
                        {product.name}
                    </h3>

                    {/* Price - Right Aligned as per reference */}
                    <div className="mt-auto flex justify-end">
                        <p className="text-xl md:text-2xl font-bold text-black tracking-tighter">
                            {formatPrice(product.price)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
