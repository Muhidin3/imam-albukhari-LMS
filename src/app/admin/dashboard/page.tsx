'use client';

import Link from 'next/link';
import {
    Users, BookOpen, GraduationCap, FileText, Award, Bell, Layers,
    TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3, Activity,
    Calendar, ChevronRight
} from 'lucide-react';
import { adminStats, programs, students, announcements, classes } from '@/lib/data';

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening with the institute.</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: adminStats.totalStudents, icon: Users, color: 'from-orange-400 to-orange-600', change: '+12%', up: true },
                    { label: 'Active Programs', value: adminStats.activePrograms, icon: BookOpen, color: 'from-orange-500 to-amber-500', change: '+2', up: true },
                    { label: 'Total Chapters', value: adminStats.totalCourses, icon: Layers, color: 'from-green-500 to-emerald-500', change: '+5', up: true },
                    { label: 'Completion Rate', value: `${adminStats.completionRate}%`, icon: TrendingUp, color: 'from-purple-500 to-violet-500', change: '+3%', up: true },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 card-hover">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Active Classes', value: adminStats.totalClasses, icon: GraduationCap, bg: 'bg-orange-50', color: 'text-orange-500' },
                    { label: 'Published Exams', value: adminStats.publishedExams, icon: FileText, bg: 'bg-pink-50', color: 'text-pink-500' },
                    { label: 'Certificates Issued', value: adminStats.certificatesIssued, icon: Award, bg: 'bg-amber-50', color: 'text-amber-500' },
                    { label: 'Announcements', value: adminStats.announcements, icon: Bell, bg: 'bg-orange-50', color: 'text-orange-500' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-500">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Students */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Students</h2>
                        <Link href="/admin/students" className="text-sm text-orange-500 font-medium flex items-center gap-1 hover:text-orange-600">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500 border-b border-gray-100">
                                    <th className="pb-3 font-medium">Student</th>
                                    <th className="pb-3 font-medium">Programs</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {students.slice(0, 6).map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50/50">
                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-sm">
                                                    {student.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{student.name}</p>
                                                    <p className="text-xs text-gray-400">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 text-gray-600">{student.enrolledPrograms.length}</td>
                                        <td className="py-3">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${student.status === 'active' ? 'badge-success' : student.status === 'inactive' ? 'badge-warning' : 'badge-danger'
                                                }`}>{student.status}</span>
                                        </td>
                                        <td className="py-3 text-gray-500">{student.joinedDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Program Status */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Programs Overview</h2>
                        <div className="space-y-3">
                            {programs.slice(0, 4).map((prog) => (
                                <div key={prog.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                                        <BookOpen className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{prog.title}</p>
                                        <p className="text-xs text-gray-500">{prog.enrolledStudents} students</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${prog.status === 'active' ? 'badge-success' : 'badge-info'
                                        }`}>{prog.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Announcements */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Recent Announces</h2>
                            <Link href="/admin/announcements" className="text-sm text-orange-500 font-medium">View All</Link>
                        </div>
                        <div className="space-y-3">
                            {announcements.slice(0, 3).map((ann) => (
                                <div key={ann.id} className="p-3 rounded-xl border border-gray-100 hover:border-orange-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${ann.priority === 'high' ? 'bg-red-500' : ann.priority === 'medium' ? 'bg-orange-500' : 'bg-gray-400'
                                            }`}></div>
                                        <p className="text-sm font-medium text-gray-900 truncate">{ann.title}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 ml-4">{ann.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            {[
                                { label: 'Create Program', href: '/admin/programs', icon: BookOpen },
                                { label: 'Add Chapter', href: '/admin/chapters', icon: Layers },
                                { label: 'Create Exam', href: '/admin/exams', icon: FileText },
                                { label: 'New Announcement', href: '/admin/announcements', icon: Bell },
                            ].map((action) => (
                                <Link key={action.label} href={action.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors group">
                                    <action.icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                                    <span className="text-sm text-gray-700 group-hover:text-orange-600 font-medium">{action.label}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-orange-400" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
