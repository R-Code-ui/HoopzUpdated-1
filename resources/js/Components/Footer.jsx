import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Hoopz. All rights reserved.</p>
                    <p className="text-xs text-gray-400 mt-2">Your premier destination for basketball shoes.</p>
                </div>
            </div>
        </footer>
    );
}
