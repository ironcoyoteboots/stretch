//components/Header.tsx
"use client";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-3xl text-gray-800">
                    <span className="font-extrabold">big</span><span className="font-light">stretch</span>
                </div>
                <nav className="space-x-4 text-gray-700 uppercase">
                    <a href="#" className="hover:text-cyan-600 align-middle">Services</a>
                    <a href="#" className="hover:text-cyan-600 font-semibold align-middle">Be a Coach</a>
                    <a href="#" className="hover:text-cyan-600 inline-flex items-center gap-1 align-middle">
                        <UserIcon className="h-5 w-5" />
                        Login
                    </a>
                </nav>
            </div>
        </header>
    );
}
