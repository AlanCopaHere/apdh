"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { href: "/", label: "Inicio" },
        { href: "/about", label: "Nosotros" },
        { href: "/clubes", label: "Clubes" },
        { href: "/posiciones", label: "Posiciones" },
        { href: "/form", label: "Habilitarse" },
    ];

    return (
        <>
            <nav className="fixed top-0 w-full z-100 bg-black/60 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                        <img src="/APDH.png" alt="Logo" className="h-10 w-auto" />
                        <span className="font-black text-xl tracking-tighter">
                            APDH <span className="text-emerald-500 text-sm not-italic">2026</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-emerald-400 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`
        fixed inset-0 top-20 bg-[#0a0f0d] z-50 transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {/* Aca se hace la apertura */}
                    <div className="z-150 bg-black/60 backdrop-blur-3xl">
                        <div className="flex flex-col items-center justify-center h-full gap-10 pb-20">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-black uppercase tracking-tighter hover:text-emerald-500 transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
