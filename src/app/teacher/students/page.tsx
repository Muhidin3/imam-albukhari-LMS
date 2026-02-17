'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
    Users, Search, Filter, Mail,
    MoreHorizontal, GraduationCap,
    ExternalLink, MapPin
} from 'lucide-react';
import { students, classes, teachers } from '@/lib/data';

export default function TeacherStudents() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const teacher = teachers[0];

    // Get all students enrolled in any of this teacher's classes
    const myClasses = classes.filter(c => c.teacherId === teacher.id);
    const myStudentIds = new Set(myClasses.flatMap(c => c.studentIds));
    const myStudents = students.filter(s => myStudentIds.has(s.id));

    const filteredStudents = myStudents.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('My Students')}</h1>
                    <p className="text-gray-500">{t('Directory of students across all your assigned classes')}</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('Search student...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 w-full md:w-64 bg-white"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => {
                    const studentClass = myClasses.find(c => c.studentIds.includes(student.id));
                    return (
                        <div key={student.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                    {student.avatar}
                                </div>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <Mail className="w-3.5 h-3.5" />
                                {student.email}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-50">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">{t('Current Class')}</span>
                                    <span className="font-semibold text-gray-900">{studentClass?.name || t('N/A')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">{t('Overall Progress')}</span>
                                    <span className="font-semibold text-orange-600">{Object.values(student.progress).reduce((a, b) => a + b, 0) / Object.values(student.progress).length || 0}%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">{t('Status')}</span>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${student.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                        {student.status}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-gray-50 hover:bg-orange-50 hover:text-orange-600 text-gray-600 font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                {t('View Academic Profile')}
                            </button>
                        </div>
                    );
                })}
            </div>

            {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{t('No students found')}</h3>
                    <p className="text-gray-500">{t('Try adjusting your search criteria')}</p>
                </div>
            )}
        </div>
    );
}
