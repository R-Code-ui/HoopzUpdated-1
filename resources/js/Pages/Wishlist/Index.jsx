import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import ProductCard from '@/Components/ProductCard';

export default function Index({ wishlist }) {
    const handleRemove = (productId) => {
        if (confirm('Remove from wishlist?')) {
            router.delete('/wishlist/remove', {
                data: { product_id: productId },
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="My Wishlist - Hoopz" />
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Your wishlist is empty.</p>
                        <Link
                            href="/products"
                            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map(product => (
                            <div key={product.id} className="relative">
                                <ProductCard product={product} />
                                <button
                                    onClick={() => handleRemove(product.id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
