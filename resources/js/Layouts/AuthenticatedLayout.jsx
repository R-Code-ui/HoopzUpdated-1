import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const permissions = auth.permissions || [];

    const canManageProducts = permissions.includes('manage products');
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans tracking-tight">

            {/* --- SIDEBAR / MOBILE HEADER --- */}
            <nav className="w-full md:w-64 bg-black text-white md:min-h-screen flex-shrink-0 z-50 relative">
                <div className="flex flex-col h-full">

                    {/* TOP BAR: Logo & Mobile Toggle */}
                    <div className="flex h-20 items-center justify-between px-6 border-b border-white/10 md:border-none">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/images/HoopzLogo-1.png"
                                alt="Hoopz Logo"
                                className="h-7 w-auto invert brightness-0"
                            />
                        </Link>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="md:hidden p-2 text-white outline-none focus:ring-0"
                        >
                            <span className="text-2xl leading-none">
                                {showingNavigationDropdown ? '✕' : '☰'}
                            </span>
                        </button>
                    </div>

                    {/* NAVIGATION LINKS: Vertical Stack */}
                    <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} md:block flex-1 px-8 py-6`}>

                        {/* MANAGEMENT SECTION */}
                        <div className="flex flex-col space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
                                Management
                            </p>

                            {canManageProducts && (
                                <NavLink
                                    href={route('admin.dashboard')}
                                    active={route().current('admin.dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                            )}

                            {canManageProducts && (
                                <NavLink
                                    href={route('admin.products.index')}
                                    active={route().current('admin.products.*')}
                                >
                                    Products
                                </NavLink>
                            )}

                            {canManageProducts && (
                                <NavLink
                                    href={route('admin.orders.index')}
                                    active={route().current('admin.orders.*')}
                                >
                                    Orders
                                </NavLink>
                            )}
                        </div>

                        {/* ACCOUNT SECTION */}
                        <div className="mt-12 pt-12 border-t border-white/10 flex flex-col space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
                                Account
                            </p>

                            <Link
                                href={route('profile.edit')}
                                className="text-sm font-black uppercase tracking-widest text-white hover:text-gray-300 transition duration-150"
                            >
                                Profile Settings
                            </Link>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition duration-150 text-left"
                            >
                                Sign Out
                            </Link>
                        </div>
                    </div>

                    {/* DESKTOP USER FOOTER */}
                    <div className="hidden md:block p-8 border-t border-white/10 bg-black/20">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white truncate">
                            {user.name}
                        </div>
                        <div className="text-[9px] text-gray-500 truncate uppercase tracking-tighter mt-1">
                            {user.email}
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {header && (
                    <header className="bg-white border-b border-gray-200">
                        <div className="px-6 py-10 md:px-12">
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black">
                                {header}
                            </h2>
                        </div>
                    </header>
                )}

                <main className="flex-1 overflow-y-auto p-6 md:p-12">
                    <div className="max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
