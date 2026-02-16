'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, BookOpen, GraduationCap, PlayCircle, FileText,
    Award, Bell, LogOut, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import { useState } from 'react';
import { currentStudent } from '@/lib/data';

const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/student/dashboard' },
    { label: 'Programs', icon: BookOpen, href: '/student/programs' },
    { label: 'My Courses', icon: GraduationCap, href: '/student/courses' },
    { label: 'Lesson Viewer', icon: PlayCircle, href: '/student/lessons' },
    { label: 'Exams', icon: FileText, href: '/student/exams' },
    { label: 'Certificates', icon: Award, href: '/student/certificates' },
    { label: 'Announcements', icon: Bell, href: '/student/announcements' },
];

export default function StudentSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`fixed top-0 left-0 h-full bg-[#1A1A2E] border-r border-white/5 transition-all duration-300 z-40 flex flex-col ${collapsed ? 'w-[72px]' : 'w-64'}`}>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
                {!collapsed && (
                    <Link href="/student/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-bold text-sm">Imam Al-Bukhari</span>
                    </Link>
                )}
                {collapsed && (
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mx-auto">
                        <BookOpen className="w-4 h-4 text-white" />
                    </div>
                )}
                <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 hover:text-white transition-colors hidden lg:block">
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'bg-orange-500/10 text-orange-400 border-l-0'
                                    : 'text-gray-400 hover:text-gray-200'
                                } ${collapsed ? 'justify-center' : ''}`}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-orange-400' : ''}`} />
                            {!collapsed && <span>{item.label}</span>}
                            {isActive && !collapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="border-t border-white/5 p-3">
                <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-lg shrink-0">
                        <User className="w-4 h-4 text-orange-400" />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{currentStudent.name}</p>
                            <p className="text-gray-500 text-xs truncate">{currentStudent.email}</p>
                        </div>
                    )}
                </div>
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
