import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Facebook, Youtube, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0F0F1A] text-gray-400 border-t border-white/5">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="text-white font-bold text-lg">Imam Al-Bukhari</span>
                                <span className="block text-orange-400 text-[10px] -mt-1 font-medium tracking-widest uppercase">Islamic Institute</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                            Dedicated to providing authentic Islamic education through structured programs, qualified scholars, and modern learning tools.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 flex items-center justify-center transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 flex items-center justify-center transition-all">
                                <Youtube className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 flex items-center justify-center transition-all">
                                <Send className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'About Us', href: '/about' },
                                { label: 'Programs', href: '/programs' },
                                { label: 'Student Login', href: '/login' },
                                { label: 'Register', href: '/register' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm hover:text-orange-400 transition-colors hover:pl-1 transition-all">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Programs</h4>
                        <ul className="space-y-3">
                            {[
                                'Islamic Studies',
                                'Hadith Sciences',
                                'Quran & Tajweed',
                                'Islamic Finance',
                                'Youth Development',
                            ].map((program) => (
                                <li key={program}>
                                    <Link href="/programs" className="text-sm hover:text-orange-400 transition-colors hover:pl-1 transition-all">
                                        {program}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                                <span className="text-sm">Imam Al-Bukhari Islamic Institute, Addis Ababa, Ethiopia</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                                <span className="text-sm">+251 911 123 456</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                                <span className="text-sm">info@imambukhari.edu</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © 2026 Imam Al-Bukhari Islamic Institute. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-600 font-arabic">
                    </p>
                </div>
            </div>
        </footer>
    );
}
