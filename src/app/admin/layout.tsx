'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Menu, Bell, Search } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F8F9FC]">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-30 flex items-center px-4 justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-gray-900">{t('Admin Panel')}</span>
                </div>
                <LanguageToggle />
            </div>

            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <main
                className={`min-h-screen transition-all duration-300 pt-16 lg:pt-0 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
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

                <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden glass"
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </LanguageProvider>
    );
}
