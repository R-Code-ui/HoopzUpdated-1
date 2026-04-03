    import React from 'react';
    import { Head, Link, router } from '@inertiajs/react';
    import Header from '@/Components/Header';
    import SearchBar from '@/Components/SearchBar';
    import ProductCard from '@/Components/ProductCard';
    import Footer from '@/Components/Footer';

    export default function Index({ products, brands, filters }) {
        const activeBrand = filters.brand;
        const activeSort = filters.sort || 'default';

        // Handler for brand filter
        const handleBrandFilter = (brandSlug) => {
            router.get('/products', {
                brand: brandSlug,
                search: filters.search,
                sort: activeSort, // preserve current sort
            }, { preserveState: true });
        };

        // Handler for sorting
        const handleSortChange = (sortValue) => {
            router.get('/products', {
                brand: activeBrand,
                search: filters.search,
                sort: sortValue,
            }, { preserveState: true });
        };

        return (
            <>
                <Head title="Hoopz - Basketball Shoes" />
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Search Bar Component */}
                    <SearchBar initialSearch={filters.search} />

                    {/* Brand Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
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

                    {/* Sorting Dropdown */}
                    <div className="flex justify-end mb-6">
                        <select
                            value={activeSort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="default">Default (Newest)</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
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

                    {/* 🔥 PAGINATION (BLACK & WHITE - CENTERED LIKE ADMIN) */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2">
                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"} // if no URL → disable
                                className={`
                                    px-4 py-2 border-2 border-black font-bold uppercase text-xs tracking-widest transition-all duration-200

                                    /* ACTIVE PAGE (current page) */
                                    ${link.active
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-black hover:text-white'
                                    }

                                    /* DISABLED BUTTON (no link) */
                                    ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}
                                `}
                                dangerouslySetInnerHTML={{ __html: link.label }} // Laravel pagination labels
                            />
                        ))}
                    </div>
                </main>

                <Footer />
            </>
        );
    }
