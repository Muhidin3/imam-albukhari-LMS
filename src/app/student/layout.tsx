'use client';

import { useState, useEffect } from 'react';
import StudentSidebar from '@/components/student/StudentSidebar';
import BottomTabBar from '@/components/student/BottomTabBar';
import ChatBot from '@/components/ChatBot';
import { Bell, Search } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Image from 'next/image';
import Link from 'next/link';

function StudentLayoutContent({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        if (!mounted) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMounted(true);
        }
    }, [mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F8F9FC]">
            {/* Mobile Top Bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-xl border-b border-gray-100 z-30 flex items-center px-4 justify-between">
            <Link href="/" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={28} height={28} className="w-7 h-7 rounded-md" />
                    <span className="font-bold text-sm text-gray-900">Imam Al-Bukhari</span>
                </div>
            </Link>
                <div className="flex items-center gap-1">
                    <button className="touch-target relative text-gray-400 hover:text-gray-600">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <LanguageToggle />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <StudentSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main
                className={`min-h-screen transition-all duration-300 pt-14 lg:pt-0 pb-[70px] lg:pb-0 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
                    }`}
            >
                {/* Desktop Header */}
                <div className="hidden lg:flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-30">
                    <div className="w-1/3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('Search') + '...'}
                                className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-100"></div>
                        <LanguageToggle />
                    </div>
                </div>

                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>

            {/* Bottom Tab Bar - mobile only */}
            <BottomTabBar />

            <ChatBot />
        </div>
    );
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <StudentLayoutContent>{children}</StudentLayoutContent>
        </LanguageProvider>
    );
}
