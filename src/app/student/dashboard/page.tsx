'use client';

import Link from 'next/link';
import {
    BookOpen, GraduationCap, Award, FileText, Bell, Clock, TrendingUp,
    ArrowRight, Play, Flame, Calendar, ChevronRight, CheckCircle2, BarChart3
} from 'lucide-react';
import { programs, announcements, examResults, studentStats, currentStudent } from '@/lib/data';

export default function StudentDashboard() {
    const enrolledPrograms = programs.filter(p => currentStudent.enrolledPrograms.includes(p.id));
    const recentAnnouncements = announcements.slice(0, 3);

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Welcome Header */}
            <div className="relative overflow-hidden rounded-2xl gradient-primary p-8">
                <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">👋</span>
                        <h1 className="text-2xl font-bold text-white">Assalamu Alaikum, {currentStudent.name.split(' ')[0]}!</h1>
                    </div>
                    <p className="text-orange-100 text-sm max-w-xl">Continue your journey of seeking knowledge. You have made great progress this week!</p>

                    <div className="flex items-center gap-6 mt-6">
                        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                            <Flame className="w-4 h-4 text-yellow-300" />
                            <span className="text-white text-sm font-medium">{studentStats.currentStreak} Day Streak</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                            <Clock className="w-4 h-4 text-orange-200" />
                            <span className="text-white text-sm font-medium">{studentStats.studyHoursThisWeek}h this week</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Enrolled Programs', value: studentStats.enrolledPrograms, icon: BookOpen, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Completed Lessons', value: `${studentStats.completedLessons}/${studentStats.totalLessons}`, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Upcoming Exams', value: studentStats.upcomingExams, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Overall Progress', value: `${studentStats.overallProgress}%`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 card-hover">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Programs Progress */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">My Programs</h2>
                        <Link href="/student/programs" className="text-sm text-orange-500 font-medium hover:text-orange-600 flex items-center gap-1">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-5">
                        {enrolledPrograms.map((program) => {
                            const progress = currentStudent.progress[program.id] || 0;
                            return (
                                <div key={program.id} className="p-4 rounded-xl border border-gray-50 hover:border-orange-100 hover:shadow-sm transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-sm">{program.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{program.totalCourses} courses • {program.duration}</p>
                                        </div>
                                        <span className="text-sm font-bold text-orange-500">{progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${progress === 100 ? 'badge-success' : progress > 0 ? 'badge-warning' : 'badge-info'
                                            }`}>
                                            {progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started'}
                                        </span>
                                        <Link href="/student/courses" className="text-xs text-orange-500 font-medium flex items-center gap-1 hover:text-orange-600">
                                            Continue <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Exam Results */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Recent Exams</h2>
                            <Link href="/student/exams" className="text-sm text-orange-500 font-medium">View All</Link>
                        </div>
                        <div className="space-y-3">
                            {examResults.map((result) => (
                                <div key={result.examId} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{result.examTitle.length > 25 ? result.examTitle.substring(0, 25) + '...' : result.examTitle}</p>
                                            <p className="text-xs text-gray-500 mt-1">{result.completedAt}</p>
                                        </div>
                                        <div className={`text-lg font-bold ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                                            {result.percentage}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {examResults.length === 0 && (
                                <p className="text-sm text-gray-400 text-center py-4">No exams taken yet</p>
                            )}
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Announcements</h2>
                            <Link href="/student/announcements" className="text-sm text-orange-500 font-medium">View All</Link>
                        </div>
                        <div className="space-y-3">
                            {recentAnnouncements.map((ann) => (
                                <div key={ann.id} className="p-3 rounded-xl border border-gray-100 hover:border-orange-100 transition-colors cursor-pointer">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${ann.priority === 'high' ? 'bg-red-500' : ann.priority === 'medium' ? 'bg-orange-500' : 'bg-gray-400'
                                            }`}></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{ann.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{ann.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Continue Learning', icon: Play, href: '/student/lessons', color: 'from-orange-500 to-amber-500' },
                                { label: 'Take Exam', icon: FileText, href: '/student/exams', color: 'from-blue-500 to-cyan-500' },
                                { label: 'Certificates', icon: Award, href: '/student/certificates', color: 'from-green-500 to-emerald-500' },
                                { label: 'Schedule', icon: Calendar, href: '/student/announcements', color: 'from-purple-500 to-violet-500' },
                            ].map((action) => (
                                <Link key={action.label} href={action.href} className="p-4 rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all group text-center">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                                        <action.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
