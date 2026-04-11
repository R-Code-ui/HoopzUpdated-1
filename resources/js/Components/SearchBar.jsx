import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function SearchBar({
    initialSearch = '',
    routeName = '/products',
    extraParams = {},
    placeholder = "Search" // Default placeholder to match image
}) {
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    const handleSubmit = (e) => {
        e.preventDefault();

        router.get(routeName, {
            search: searchTerm,
            ...extraParams
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full mb-6">
            <div className="flex w-full items-stretch">
                {/* Search Input Field */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-black rounded-none text-sm md:text-base placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-black transition-colors"
                />

                {/* Black Square Search Button */}
                <button
                    type="submit"
                    className="bg-black text-white px-5 flex items-center justify-center hover:bg-zinc-800 transition-colors border border-black border-l-0"
                >
                    {/* Zero-Dependency SVG Icon */}
                    <svg
                        className="w-5 h-5 md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}
