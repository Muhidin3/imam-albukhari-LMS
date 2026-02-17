'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
    Users, Calendar, Clock,
    MoreVertical, Bell, FileText, Video,
    Search, Filter
} from 'lucide-react';
import { classes, teachers } from '@/lib/data';

export default function TeacherClasses() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    // Assumed logged in teacher (tea-1)
    const teacher = teachers[0];
    const myClasses = classes.filter(c => c.teacherId === teacher.id);

    const filteredClasses = myClasses.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.programTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('My Classes')}</h1>
                    <p className="text-gray-500">{t('Manage your assigned classes and communicate with students')}</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('Search classes...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 w-full md:w-64"
                        />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredClasses.map((cls) => (
                    <Link href={`/teacher/classes/${cls.id}`} key={cls.id}>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col lg:flex-row lg:h-64 cursor-pointer group">
                            {/* Class Info Side */}
                            <div className="p-6 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-50 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="px-2.5 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                                            {cls.status}
                                        </span>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">{cls.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{cls.programTitle}</p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>{cls.schedule}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span>{cls.studentCount} {t('Students')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span>Ends: {cls.endDate}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold rounded-xl transition-colors text-sm">
                                    {t('View Details')}
                                </button>
                            </div>

                            {/* Management Tasks Side */}
                            <div className="p-6 flex-1 bg-gray-50/30 flex flex-col">
                                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">{t('Quick Actions')}</h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                                    <button className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all text-left group/btn">
                                        <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover/btn:bg-orange-100">
                                            <Bell className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900 text-sm">{t('Announcement')}</span>
                                            <span className="text-xs text-gray-500">{t('Notify class')}</span>
                                        </div>
                                    </button>

                                    <button className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all text-left group/btn">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/btn:bg-blue-100">
                                            <Video className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900 text-sm">{t('Materials')}</span>
                                            <span className="text-xs text-gray-500">{t('Upload resources')}</span>
                                        </div>
                                    </button>

                                    <button className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all text-left group/btn">
                                        <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover/btn:bg-green-100">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900 text-sm">{t('Grades')}</span>
                                            <span className="text-xs text-gray-500">{t('Grade assignments')}</span>
                                        </div>
                                    </button>

                                    <button className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all text-left group/btn">
                                        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover/btn:bg-purple-100">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900 text-sm">{t('Students')}</span>
                                            <span className="text-xs text-gray-500">{t('View roster')}</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
