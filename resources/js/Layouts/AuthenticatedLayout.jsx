import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const permissions = auth.permissions || [];

    // Admin check
    const canManageProducts = permissions.includes('manage products');

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">

                        {/* LEFT SIDE */}
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* DESKTOP NAV */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">

                                {canManageProducts && (
                                    <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                                        Dashboard
                                    </NavLink>
                                )}

                                {canManageProducts && (
                                    <NavLink href={route('admin.products.index')} active={route().current('admin.products.*')}>
                                        Products
                                    </NavLink>
                                )}

                                {/* 🔥 NEW: Orders */}
                                {canManageProducts && (
                                    <NavLink href={route('admin.orders.index')} active={route().current('admin.orders.*')}>
                                        Orders
                                    </NavLink>
                                )}

                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button className="inline-flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                                            {user.name}
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* MOBILE BUTTON */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 text-gray-400 hover:text-gray-500"
                            >
                                ☰
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE NAV */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">

                        {canManageProducts && (
                            <ResponsiveNavLink href={route('admin.dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                        )}

                        {canManageProducts && (
                            <ResponsiveNavLink href={route('admin.products.index')}>
                                Products
                            </ResponsiveNavLink>
                        )}

                        {/* 🔥 NEW: Orders */}
                        {canManageProducts && (
                            <ResponsiveNavLink href={route('admin.orders.index')}>
                                Orders
                            </ResponsiveNavLink>
                        )}

                    </div>

                    <div className="border-t pt-4 px-4">
                        <div>{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>

                        <ResponsiveNavLink href={route('profile.edit')}>
                            Profile
                        </ResponsiveNavLink>

                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Logout
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
