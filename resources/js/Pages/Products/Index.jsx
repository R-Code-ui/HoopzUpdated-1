import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import SearchBar from '@/Components/SearchBar';
import ProductCard from '@/Components/ProductCard';
import Footer from '@/Components/Footer';

export default function Index({ products, brands, filters }) {
    // Handler for brand filter buttons
    const handleBrandFilter = (brandSlug) => {
        router.get('/products', { brand: brandSlug, search: filters.search }, { preserveState: true });
    };

    // Format brand slug for "All Products" button
    const activeBrand = filters.brand;

    return (
        <>
            <Head title="Hoopz - Basketball Shoes" />
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar Component */}
                <SearchBar initialSearch={filters.search} />

                {/* Brand Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {/* All Products button */}
                    <button
                        onClick={() => handleBrandFilter('all')}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                            activeBrand === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        All Products
                    </button>

                    {/* Dynamic brand buttons from database */}
                    {brands.map((brand) => (
                        <button
                            key={brand.id}
                            onClick={() => handleBrandFilter(brand.slug)}
                            className={`px-4 py-2 rounded-full font-medium transition-colors ${
                                activeBrand === brand.slug
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {brand.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* No products message */}
                {products.data.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No products found.</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-8">
                    {products.links && (
                        <div className="flex justify-center">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`mx-1 px-3 py-1 rounded ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
