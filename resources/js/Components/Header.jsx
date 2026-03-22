import React from 'react';
import { Link } from '@inertiajs/react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'; // optional, you can use your own icons

export default function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
                    Hoopz
                </Link>

                {/* Right side icons */}
                <div className="flex items-center space-x-4">
                    <Link href="/wishlist" className="text-gray-600 hover:text-blue-600">
                        <HeartIcon className="h-6 w-6" />
                    </Link>
                    <Link href="/cart" className="text-gray-600 hover:text-blue-600">
                        <ShoppingCartIcon className="h-6 w-6" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
