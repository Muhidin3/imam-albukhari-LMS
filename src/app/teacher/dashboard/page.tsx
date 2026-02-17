'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
    Users, BookOpen, GraduationCap, FileText,
    TrendingUp, Calendar, ArrowRight, Bell, AlertCircle, CheckCircle2, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { teachers, classes, students, exams, announcements, programs } from '@/lib/data';

export default function TeacherDashboard() {
    const { t } = useLanguage();

    // For demo purposes, we'll assume we are tea-1 (Sheikh Ahmad Al-Farsi)
    const teacher = teachers[0];
    const myClasses = classes.filter(c => c.teacherId === teacher.id);
    const myStudentsCount = myClasses.reduce((acc, c) => acc + c.studentCount, 0);
    
    // Get courses assigned to this teacher
    const assignedCourses = programs.flatMap(prog => 
        prog.courses.filter(course => course.instructor === teacher.name)
    );
    
    // Mock pending grades data (in progress courses)
    const pendingGrades = myClasses.reduce((acc, cls) => {
        return acc + cls.studentIds.length;
    }, 0);

    const stats = [
        { label: t('My Classes'), value: myClasses.length, icon: Users, color: 'primary' },
        { label: t('Total Students'), value: myStudentsCount, icon: GraduationCap, color: 'primary' },
        { label: t('Assigned Courses'), value: assignedCourses.length, icon: BookOpen, color: 'orange' },
        { label: t('Pending Grades'), value: pendingGrades, icon: FileText, color: 'green' },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl gradient-primary p-8">
                <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">👋</span>
                        <h1 className="text-2xl font-bold text-white">{t('Welcome back')}, {teacher.name.split(' ')[0]}!</h1>
                    </div>
                    <p className="text-orange-100 text-sm max-w-xl">{t('Welcome to your teaching dashboard. Here you can manage your classes, grade students, and share resources.')}</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-primary-500/20">
                            {t('Make Announcement')}
                            <Bell className="w-4 h-4" />
                        </button>
                        <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors border border-white/10">
                            {t('View Schedule')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* My Classes List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">{t('My Assigned Classes')}</h2>
                        <Link href="/teacher/classes" className="text-orange-600 text-sm font-semibold hover:text-orange-700 flex items-center gap-1">
                            {t('View All')}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {myClasses.slice(0, 3).map((cls) => (
                            <Link href={`/teacher/classes/${cls.id}`} key={cls.id}>
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">{cls.name}</h3>
                                        <p className="text-sm text-gray-500">{cls.programTitle}</p>
                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md text-nowrap">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {cls.schedule}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md">
                                                <Users className="w-3.5 h-3.5" />
                                                {cls.studentCount} {t('Students')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-100 transition-colors">
                                            {t('Manage')}
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pending Grades & Courses */}
                <div className="space-y-6">
                    {/* Pending Grades */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-orange-500" />
                            {t('Pending Grades')}
                        </h2>
                        <div className="bg-linear-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-100 p-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">{pendingGrades}</div>
                                <p className="text-sm text-gray-600 mb-4">Student assignments awaiting grading</p>
                                <Link href="/teacher/grading" className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
                                    {t('Grade Now')}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Courses */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            {t('Assigned Courses')}
                        </h2>
                        <div className="space-y-2">
                            {assignedCourses.length > 0 ? (
                                assignedCourses.slice(0, 4).map((course) => (
                                    <div key={course.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                                        <p className="font-semibold text-gray-900 text-sm line-clamp-1">{course.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">{course.duration} • {course.totalLessons} lessons</p>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-xl border border-gray-100 p-4 text-center text-gray-500 text-sm">
                                    {t('No courses assigned')}
                                </div>
                            )}
                            {assignedCourses.length > 4 && (
                                <button className="w-full py-2 text-orange-600 text-sm font-semibold hover:text-orange-700">
                                    {t('View All')} ({assignedCourses.length})
                                </button>
                            )}
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
}
