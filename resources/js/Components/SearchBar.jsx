import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function SearchBar({ initialSearch = '' }) {
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to products index with search parameter
        router.get('/products', { search: searchTerm }, { preserveState: true });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for shoes..."
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
