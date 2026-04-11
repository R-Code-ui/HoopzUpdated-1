import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                // Using 'flex' instead of 'inline-flex' to allow vertical stacking
                'flex items-center text-sm font-black uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-white underline underline-offset-8 decoration-2' // Active: White + Underline
                    : 'text-gray-400 hover:text-white') + // Inactive: Gray (same as your screenshot)
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
