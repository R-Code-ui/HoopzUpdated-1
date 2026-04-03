import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function SearchBar({
    initialSearch = '',
    routeName = '/products', // 🔥 DEFAULT (for products)
    extraParams = {} // 🔥 allow filters like status
}) {

    const [searchTerm, setSearchTerm] = useState(initialSearch);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🔥 MERGE search + extra params (like status filter)
        router.get(routeName, {
            search: searchTerm,
            ...extraParams
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search orders..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                    🔍
                </button>
            </div>
        </form>
    );
}
