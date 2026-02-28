'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, PlayCircle, MoreHorizontal, User, Bell, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function BottomTabBar() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    const tabs = [
        { label: t('Home'), icon: Home, href: '/student/dashboard' },
        { label: t('Programs'), icon: BookOpen, href: '/student/programs' },
        { label: t('Lessons'), icon: PlayCircle, href: '/student/lessons' },
        { label: t('More'), icon: MoreHorizontal, href: null },
    ];

    const moreItems = [
        { label: t('Profile'), icon: User, href: '/student/profile' },
        { label: t('Announcements'), icon: Bell, href: '/student/announcements' },
        { label: t('Sign Out'), icon: LogOut, href: '/' },
    ];

    const isActive = (href: string | null) => {
        if (!href) return false;
        return pathname === href || pathname.startsWith(href + '/');
    };

    const isMoreActive = moreItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'));

    return (
        <>
            <AnimatePresence>
                {isMoreOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
                            onClick={() => setIsMoreOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-[70px] left-0 right-0 z-40 bg-white rounded-t-2xl p-3 pb-2 lg:hidden"
                        >
                            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
                            {moreItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMoreOpen(false)}
                                    className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                                        item.href === '/' ? 'hover:bg-red-50' : 'hover:bg-orange-50'
                                    }`}
                                >
                                    <item.icon className={`w-5 h-5 ${
                                        item.href === '/' ? 'text-red-400' : 'text-gray-500'
                                    }`} />
                                    <span className={`text-sm font-medium ${
                                        item.href === '/' ? 'text-red-500' : 'text-gray-700'
                                    }`}>
                                        {item.label}
                                    </span>
                                </Link>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <nav
                className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden"
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
                <div className="flex items-center justify-around px-2 pt-2 pb-1">
                    {tabs.map((tab) => {
                        const active = tab.href ? isActive(tab.href) : (isMoreOpen || isMoreActive);

                        if (tab.href === null) {
                            return (
                                <button
                                    key="more"
                                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                                    className="flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px]"
                                >
                                    <tab.icon className={`w-6 h-6 ${active ? 'text-orange-500' : 'text-gray-400'}`} />
                                    <span className={`text-[10px] font-medium ${active ? 'text-orange-500' : 'text-gray-400'}`}>
                                        {tab.label}
                                    </span>
                                    {active && <div className="w-1 h-1 rounded-full bg-orange-500" />}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className="flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px]"
                            >
                                <tab.icon className={`w-6 h-6 ${active ? 'text-orange-500' : 'text-gray-400'}`} />
                                <span className={`text-[10px] font-medium ${active ? 'text-orange-500' : 'text-gray-400'}`}>
                                    {tab.label}
                                </span>
                                {active && <div className="w-1 h-1 rounded-full bg-orange-500" />}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
