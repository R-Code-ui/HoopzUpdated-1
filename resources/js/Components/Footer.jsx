import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 mt-12 font-sans tracking-tight">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">

                    {/* Customer Services */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Customer Services</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="#" className="hover:text-gray-400 transition">Contact us</Link></li>
                            <li><Link href="#" className="hover:text-gray-400 transition">Facebook Messenger</Link></li>
                            <li className="pt-2 text-gray-300">Monday - Friday</li>
                            <li className="text-gray-300 uppercase italic">10:00 AM - 6:00 PM</li>
                        </ul>
                    </div>

                    {/* My Account */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">My Account</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="/login" className="hover:text-gray-400 transition">Sign-in / Register</Link></li>
                            <li><Link href="#" className="hover:text-gray-400 transition">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Connect With Us */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Connect With Us</h3>
                        <div className="flex gap-5">
                            {/* Facebook Icon SVG */}
                            <a href="#" className="hover:text-gray-400 transition">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                                </svg>
                            </a>
                            {/* Instagram Icon SVG */}
                            <a href="#" className="hover:text-gray-400 transition">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28-.073-1.689-.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Legal Disclaimer Section */}
                <div className="border-t border-zinc-900 pt-12 pb-10">
                    <p className="text-[11px] md:text-[13px] leading-relaxed text-center max-w-5xl mx-auto font-bold text-white px-4 uppercase tracking-tighter opacity-90">
                        The NBA and individual NBA member team identifications reproduced on this site and its products are trademarks, copyrighted designs,
                        and/or other forms of intellectual property that are the exclusive property of NBA Properties, Inc. and the respective NBA member
                        teams. These may not be used, in whole or in part, without the prior written consent of NBA Properties, Inc.
                    </p>
                </div>

                {/* Bottom Copyright */}
                <div className="text-center pb-4 border-t border-zinc-900/50 pt-8">
                    <p className="text-xs md:text-sm font-bold tracking-tight">
                        © {new Date().getFullYear()} Hoopz | A Division of Titanomachy International, Inc. All Rights Reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
