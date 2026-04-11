import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { props } = usePage();
    const { cartCount, auth } = props;
    const user = auth?.user || null;
    const permissions = auth?.permissions || [];
    const isAdmin = permissions.includes('manage products');

    return (
        <header className="sticky top-0 z-50 w-full bg-white font-sans">
            {/* 1. Announcement Bar (Black) */}
            <div className="bg-black text-white text-[11px] md:text-xs py-2.5 px-4 text-center font-medium tracking-wide uppercase">
                Free Shipping on orders over PHP3,000
            </div>

            {/* 2. Top Navigation Links (Find a Store, Help, Login/Register) */}
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-end items-center h-10 space-x-4 text-[11px] md:text-xs font-medium text-black uppercase tracking-wider">
                    <Link href="#" className="hover:opacity-60 transition">Find a Store</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="#" className="hover:opacity-60 transition">Help</Link>
                    <span className="text-gray-300">|</span>

                    {!user ? (
                        <>
                            <Link href="/login" className="hover:opacity-60 transition">Login</Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/register" className="hover:opacity-60 transition">Register</Link>
                        </>
                    ) : (
                        <>
                            <span className="normal-case text-gray-500 italic">Hi, {user.name}</span>
                            <span className="text-gray-300">|</span>
                            {isAdmin && (
                                <>
                                    <Link href="/admin/dashboard" className="hover:opacity-60 transition">Admin</Link>
                                    <span className="text-gray-300">|</span>
                                </>
                            )}
                            <Link href="/logout" method="post" as="button" className="hover:text-red-600 transition uppercase">Logout</Link>
                        </>
                    )}
                </div>
            </div>

            {/* 3. Main Header (Logo & Icons) */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="transition-opacity hover:opacity-80">
                    <img
                        src="/images/HoopzLogo-1.png"
                        alt="Hoopz Logo"
                        className="h-8 md:h-12 w-auto object-contain"
                    />
                </Link>

                {/* Icons (Functional) */}
                <div className="flex items-center space-x-5 md:space-x-8">
                    {/* Wishlist */}
                    <Link href="/wishlist" className="relative group">
                        <svg className="w-6 h-6 md:w-7 md:h-7 fill-none stroke-black stroke-2 group-hover:fill-black transition-all" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.77-8.77 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative group">
                        <svg className="w-6 h-6 md:w-7 md:h-7 fill-none stroke-black stroke-2 transition-all" viewBox="0 0 24 24">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
