'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BookOpen, GraduationCap, ChevronDown, LogIn } from 'lucide-react';

export default function PublicNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [programsOpen, setProgramsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-white font-bold text-lg tracking-tight">Imam Al-Bukhari</span>
                            <span className="block text-orange-300 text-[10px] -mt-1 font-medium tracking-widest uppercase">Islamic Institute</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/" className="text-gray-300 hover:text-orange-400 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5">
                            Home
                        </Link>

                        <div className="relative" onMouseEnter={() => setProgramsOpen(true)} onMouseLeave={() => setProgramsOpen(false)}>
                            <Link href="/programs" className="text-gray-300 hover:text-orange-400 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1">
                                Programs <ChevronDown className="w-3 h-3" />
                            </Link>
                            {programsOpen && (
                                <div className="absolute top-full left-0 mt-1 w-64 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-2xl p-2 animate-fade-in-up">
                                    <Link href="/programs" className="block px-4 py-3 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-colors text-sm">
                                        <div className="font-medium">All Programs</div>
                                        <div className="text-xs text-gray-500 mt-0.5">Browse our full catalog</div>
                                    </Link>
                                    <Link href="/programs#islamic-studies" className="block px-4 py-3 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-colors text-sm">
                                        <div className="font-medium">Islamic Studies</div>
                                        <div className="text-xs text-gray-500 mt-0.5">Aqeedah, Fiqh & more</div>
                                    </Link>
                                    <Link href="/programs#quran" className="block px-4 py-3 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-colors text-sm">
                                        <div className="font-medium">Quran Sciences</div>
                                        <div className="text-xs text-gray-500 mt-0.5">Memorization & Tajweed</div>
                                    </Link>
                                    <Link href="/programs#hadith" className="block px-4 py-3 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-colors text-sm">
                                        <div className="font-medium">Hadith Sciences</div>
                                        <div className="text-xs text-gray-500 mt-0.5">Authentication & study</div>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link href="/about" className="text-gray-300 hover:text-orange-400 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5">
                            About
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2">
                            <LogIn className="w-4 h-4" />
                            Sign In
                        </Link>
                        <Link href="/register" className="gradient-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            Register
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-[#1A1A2E] border-t border-white/10 animate-fade-in-up">
                    <div className="px-4 py-4 space-y-1">
                        <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium">
                            Home
                        </Link>
                        <Link href="/programs" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium">
                            Programs
                        </Link>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium">
                            About
                        </Link>
                        <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                            <Link href="/login" onClick={() => setIsOpen(false)} className="block text-center px-4 py-3 text-gray-300 border border-white/20 rounded-xl text-sm font-medium">
                                Sign In
                            </Link>
                            <Link href="/register" onClick={() => setIsOpen(false)} className="block text-center px-4 py-3 gradient-primary text-white rounded-xl text-sm font-semibold">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
