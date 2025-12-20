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
            </nav>

            {/* Mobile Menu Overlay - Fuera del nav para que backdrop-blur funcione correctamente */}
            <div 
                className={`
                    fixed inset-0 h-dvh bg-black/30 backdrop-blur-2xl z-200 transition-all duration-300 md:hidden 
                    flex items-center justify-center overscroll-none
                    ${isMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}
                `}
                style={{
                    backdropFilter: isMenuOpen ? 'blur(24px)' : 'blur(0px)',
                    WebkitBackdropFilter: isMenuOpen ? 'blur(24px)' : 'blur(0px)',
                }}
            >
                <button
                    className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-10"
                    onClick={() => setIsMenuOpen(false)}>
                    <X size={32} />
                </button>

                <div className="flex flex-col items-center justify-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-3xl font-black uppercase tracking-tighter text-white hover:text-emerald-500 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
