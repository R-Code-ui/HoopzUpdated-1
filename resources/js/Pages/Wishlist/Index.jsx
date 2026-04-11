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
        <div className="bg-white min-h-screen font-sans tracking-tight">
            <Head title="My Wishlist - Hoopz" />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* 1. SECTION HEADER: Styled like the "Category" header */}
                <div className="mb-12 border-l-4 border-black pl-4">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                        My Wishlist
                    </h1>
                </div>

                {wishlist.length === 0 ? (
                    /* 2. EMPTY STATE: Monochrome & Minimalist */
                    <div className="text-center py-24 border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold uppercase tracking-widest italic mb-8">
                            Your wishlist is empty.
                        </p>
                        <Link
                            href="/products"
                            className="inline-block px-8 py-3 border-2 border-black bg-black text-white text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    /* 3. WISHLIST GRID: Matches the Product Grid spacing */
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {wishlist.map(product => (
                            <div key={product.id} className="relative group">
                                <ProductCard product={product} />

                                {/* 4. REMOVE BUTTON: Minimalist X in a black box */}
                                <button
                                    onClick={() => handleRemove(product.id)}
                                    className="absolute top-0 right-0 bg-black text-white p-2 transition-transform hover:scale-110 z-10"
                                    title="Remove from wishlist"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
