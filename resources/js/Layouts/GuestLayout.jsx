import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        /* White background and tracking-tight to match the store aesthetic */
        <div className="flex min-h-screen flex-col items-center bg-white pt-6 sm:justify-center sm:pt-0 font-sans tracking-tight">
            <div>
                <Link href="/" className="text-4xl font-black uppercase italic tracking-tighter">
                    Hoopz
                </Link>
            </div>

            <div className="mt-8 w-full bg-white px-8 py-10 border-2 border-black sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
