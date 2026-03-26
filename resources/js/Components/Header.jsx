import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const page = usePage();

    const { cartCount } = usePage().props;

    // Get authentication data from Inertia (shared via HandleInertiaRequests)
    const auth = page?.props?.auth || {};
    const user = auth?.user || null;          // Logged-in user object or null
    const permissions = auth?.permissions || []; // User permissions array

    // Check if user is admin (has 'manage products' permission)
    const isAdmin = permissions.includes('manage products');

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo - links to home page (now redirects to products) */}
                <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
                    Hoopz
                </Link>

                {/* Right side icons and auth links */}
                <div className="flex items-center space-x-4">
                    {/* Wishlist and Cart icons (always visible) */}
                    <Link href="/wishlist" className="text-gray-600 hover:text-blue-600">
                        <HeartIcon className="h-6 w-6" />
                    </Link>
                    <div className="relative">
                        <Link href="/cart">
                            <ShoppingCartIcon className="h-6 w-6" />
                        </Link>

                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    {/* Conditional authentication UI */}
                    {!user ? (
                        // GUEST: Show Login and Register buttons
                        <>
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-blue-600 font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        // AUTHENTICATED USER: Show user name and logout
                        <>
                            {/* User name with dropdown style */}
                            <div className="text-gray-700 font-medium">
                                {user.name}
                            </div>

                            {/* Admin dashboard link (only visible to admins) */}
                            {isAdmin && (
                                <Link
                                    href="/admin/dashboard"
                                    className="text-gray-600 hover:text-blue-600 font-medium"
                                >
                                    Admin
                                </Link>
                            )}

                            {/* Logout button (POST request) */}
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-gray-600 hover:text-red-600 font-medium"
                            >
                                Logout
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
