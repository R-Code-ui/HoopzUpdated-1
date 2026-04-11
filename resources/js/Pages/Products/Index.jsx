import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import SearchBar from '@/Components/SearchBar';
import ProductCard from '@/Components/ProductCard';
import Footer from '@/Components/Footer';

export default function Index({ products, brands, filters }) {
    const activeBrand = filters.brand || 'all';
    const activeSort = filters.sort || 'default';

    const handleBrandFilter = (brandSlug) => {
        router.get('/products', {
            brand: brandSlug,
            search: filters.search,
            sort: activeSort,
        }, { preserveState: true });
    };

    const handleSortChange = (sortValue) => {
        router.get('/products', {
            brand: activeBrand,
            search: filters.search,
            sort: sortValue,
        }, { preserveState: true });
    };

    return (
        <div className="bg-white min-h-screen font-sans tracking-tight">
            <Head title="Hoopz - Basketball Shoes" />

            {/* Header stays at the top */}
            <Header />

            {/* 1. SEARCH BAR: Now directly below the Header */}
            <div className="w-full bg-white border-b border-gray-100 py-4">
                <div className="max-w-xl mx-auto px-4">
                    <SearchBar initialSearch={filters.search} placeholder="Search..." />
                </div>
            </div>

            <main>
                {/* 2. HERO SECTION: Luka Background */}
                <section className="relative w-full h-[350px] md:h-[500px] overflow-hidden bg-[#E30613]">
                    <img
                        src="/images/luka.jpeg"
                        alt="Luka Doncic"
                        className="w-full h-full object-cover object-top"
                    />

                    {/* 3. LOGO LETTERING: Resized to ~44px height */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <img
                            src="/images/HoopzLogoLettering-2.png"
                            alt="Hoopz"
                            className="h-200px] md:h-[200px] object-contain"
                        />
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* BRAND LOGOS GRID */}
                    <div className="grid grid-cols-3 gap-4 md:gap-12 py-12 border-b border-gray-100">
                        {[
                            { name: 'Kobe Bryant', slug: 'kobe', img: '/images/kobe-logo.png' },
                            { name: 'Michael Jordan', slug: 'jordan', img: '/images/jordan-logo.png' },
                            { name: 'LeBron James', slug: 'lebron', img: '/images/lebron-logo.png' }
                        ].map((iconic) => (
                            <button
                                key={iconic.slug}
                                onClick={() => handleBrandFilter(iconic.slug)}
                                className="flex flex-col items-center group transition-transform hover:scale-105"
                            >
                                <img src={iconic.img} alt={iconic.name} className="h-12 md:h-24 object-contain mb-3" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{iconic.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* CATEGORY & FILTER SECTION */}
                    <div className="py-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
                            <div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Category</h2>
                                <div className="flex flex-wrap gap-2">
                                    {['all', ...brands.map(b => b.slug)].map((slug) => (
                                        <button
                                            key={slug}
                                            onClick={() => handleBrandFilter(slug)}
                                            className={`px-5 py-2 border text-[10px] font-bold uppercase tracking-widest transition-all
                                                ${activeBrand === slug
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-gray-200 hover:border-black'}`}
                                        >
                                            {slug === 'all' ? 'All Products' : brands.find(b => b.slug === slug)?.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* PRICE SORTING */}
                            <div className="w-full md:w-auto">
                                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400 text-right">Sort By</label>
                                <select
                                    value={activeSort}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="w-full md:w-48 px-3 py-2 border border-gray-300 font-bold uppercase text-[10px] tracking-widest focus:ring-0 focus:outline-none focus:border-black appearance-none cursor-pointer bg-white"
                                >
                                    <option value="default">Newest</option>
                                    <option value="price_asc">Price: Low-High</option>
                                    <option value="price_desc">Price: High-Low</option>
                                </select>
                            </div>
                        </div>

                        {/* ACTIVE CATEGORY TITLE */}
                        <div className="mb-8 border-l-4 border-black pl-4">
                            <h3 className="text-xl font-bold uppercase tracking-tighter">
                                {activeBrand === 'all' ? 'Fresh Arrivals' : `${activeBrand.replace('-', ' ')} Shoes`}
                            </h3>
                        </div>

                        {/* PRODUCTS GRID */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* PAGINATION */}
                        <div className="mt-20 flex justify-center items-center gap-1">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    className={`px-4 py-2 border border-black font-bold text-[10px] tracking-widest transition-all
                                        ${link.active ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
                                        ${!link.url ? 'opacity-20 cursor-not-allowed border-gray-200' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
