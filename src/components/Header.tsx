//components/Header.tsx
"use client";
import Link from 'next/link';
import { UserIcon } from "@heroicons/react/24/outline";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-2xl md:text-4xl text-gray-800">
                    <Link href="/"><span className="font-extrabold">big</span><span className="font-light">stretch</span></Link>
                </div>
                <nav className="space-x-2 md:space-x-4 text-gray-700 uppercase text-sm md:text-lg">
                    <Link href="#" className="hover:text-cyan-600 align-middle">Services</Link>
                    <Link href="/provider/signup" className="hover:text-cyan-600 font-semibold align-middle">Be a Coach</Link>
                    <Link href="#" className="hover:text-cyan-600 inline-flex items-center gap-1 align-middle">
                        <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
}
