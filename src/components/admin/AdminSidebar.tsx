'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, BookOpen, Layers, Users, GraduationCap, FileText,
    Award, Bell, LogOut, ChevronLeft, ChevronRight, Shield, X
} from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

interface AdminSidebarProps {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
    mobileOpen: boolean;
    setMobileOpen: (v: boolean) => void;
}

export default function AdminSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: AdminSidebarProps) {
    const pathname = usePathname();
    const { t } = useLanguage();

    const menuItems = [
        { label: t('Dashboard'), icon: LayoutDashboard, href: '/admin/dashboard' },
        { label: t('Programs'), icon: BookOpen, href: '/admin/programs' },
        { label: t('Students'), icon: GraduationCap, href: '/admin/students' },
        { label: t('Certificates'), icon: Award, href: '/admin/certificates' },
        { label: t('Announcements'), icon: Bell, href: '/admin/announcements' },
    ];

    return (
        <aside
            className={`
                fixed top-0 left-0 h-full bg-[#0F0F1A] border-r border-white/5 
                transition-all duration-300 z-40 flex flex-col 
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}
                w-64
            `}
        >
            {/* Logo */}
            <div className={`h-16 flex items-center ${collapsed ? 'justify-center' : 'justify-between px-4'} border-b border-white/5`}>
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div className="lg:block">
                            <span className="text-white font-bold text-sm block">{t('Admin Panel')}</span>
                            <span className="text-orange-400 text-[9px] -mt-0.5 block tracking-wider uppercase">Imam Al-Bukhari</span>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                )}

                {/* Desktop Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-500 hover:text-white transition-colors hidden lg:block"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                {/* Mobile Close Button */}
                <button
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-400 hover:text-white lg:hidden"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                <div className={`text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 mb-3 ${collapsed ? 'hidden' : ''}`}>
                    {t('Management')}
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                ? 'bg-orange-500/10 text-orange-400'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                                } ${collapsed ? 'justify-center' : ''}`}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-orange-400' : ''}`} />
                            <span className={`${collapsed ? 'hidden lg:hidden' : 'block'} ${!collapsed ? 'lg:block' : ''}`}>
                                {item.label}
                            </span>
                            {isActive && !collapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400 hidden lg:block"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Admin User */}
            <div className="border-t border-white/5 p-3">
                <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        A
                    </div>
                    {!collapsed && (
                        <div className="hidden lg:block flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">Admin User</p>
                            <p className="text-gray-500 text-xs truncate">admin@imambukhari.edu</p>
                        </div>
                    )}

                    {/* Show on mobile regardless of collapse state (since sidebar is full width on mobile) */}
                    <div className="lg:hidden flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">Admin User</p>
                        <p className="text-gray-500 text-xs truncate">admin@imambukhari.edu</p>
                    </div>
                </div>
                <Link
                    href="/"
                    className={`flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 text-sm transition-all ${collapsed ? 'justify-center' : ''}`}
                >
                    <LogOut className="w-4 h-4" />
                    {!collapsed && <span className="hidden lg:block">Sign Out</span>}
                    <span className="lg:hidden">Sign Out</span>
                </Link>
            </div>
        </aside>
    );
}
