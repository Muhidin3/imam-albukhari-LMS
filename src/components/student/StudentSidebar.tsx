'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, BookOpen, PlayCircle,
    Award, Bell, LogOut, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import { currentStudent } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

interface StudentSidebarProps {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
}

export default function StudentSidebar({ collapsed, setCollapsed }: StudentSidebarProps) {
    const pathname = usePathname();
    const { t } = useLanguage();

    const menuItems = [
        { label: t('Dashboard'), icon: LayoutDashboard, href: '/student/dashboard' },
        { label: t('Programs'), icon: BookOpen, href: '/student/programs' },
        { label: t('Lesson Viewer'), icon: PlayCircle, href: '/student/lessons' },
        { label: t('Certificates'), icon: Award, href: '/student/certificates' },
        { label: t('Announcements'), icon: Bell, href: '/student/announcements' },
        { label: t('Profile'), icon: User, href: '/student/profile' },
    ];

    return (
        <aside
            className={`
                fixed top-0 left-0 h-full bg-white/60 backdrop-blur-2xl border-r border-white/5 text-black
                transition-all duration-300 z-40 hidden lg:flex flex-col
                ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}
            `}
        >
            {/* Logo */}
            <div className={`h-16 flex items-center ${collapsed ? 'justify-center' : 'justify-between px-4'} border-b border-white/5`}>
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                            <Image src="/logo.png" alt="Logo" className="w-10 h-10" width={1000} height={1000} />
                        </div>
                        <div>
                            <span className="text-gray-700 font-bold text-sm block">{t('Student Portal')}</span>
                            <span className="text-orange-400 text-[9px] -mt-0.5 block tracking-wider uppercase">Imam Al-Bukhari</span>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                    </div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-500 hover:text-black transition-colors"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                <div className={`text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-3 ${collapsed ? 'hidden' : ''}`}>
                    Menu
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                ? 'bg-orange-500/10 text-orange-400'
                                : 'text-gray-400 hover:text-orange-400 hover:bg-white/5'
                                } ${collapsed ? 'justify-center' : ''}`}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-orange-400' : ''}`} />
                            <span className={collapsed ? 'hidden' : 'block'}>
                                {item.label}
                            </span>
                            {isActive && !collapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="border-t border-white/5 p-3">
                <Link href="/student/profile" className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {currentStudent.avatar || <User className="w-4 h-4" />}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-gray-700 text-sm font-medium truncate">{currentStudent.name}</p>
                            <p className="text-gray-500 text-xs truncate">{currentStudent.email}</p>
                        </div>
                    )}
                </Link>
                <Link
                    href="/"
                    className={`flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 text-sm transition-all ${collapsed ? 'justify-center' : ''}`}
                >
                    <LogOut className="w-4 h-4" />
                    {!collapsed && <span>Sign Out</span>}
                </Link>
            </div>
        </aside>
    );
}
