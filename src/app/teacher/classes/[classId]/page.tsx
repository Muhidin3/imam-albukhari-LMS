'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
    Users, ChevronLeft, Calendar, Upload, FileText, Video, Music,
    Trash2, Download
} from 'lucide-react';
import { classes, students, programs } from '@/lib/data';

export default function ClassDetails() {
    const { t } = useLanguage();
    const params = useParams();
    const classId = params.classId as string;
    
    const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'students' | 'assignments'>('overview');
    const [materials] = useState([
        { id: '1', title: 'Introduction to Course', type: 'video', uploadedDate: '2024-01-15', size: '250 MB' },
        { id: '2', title: 'Course Syllabus', type: 'pdf', uploadedDate: '2024-01-10', size: '2.5 MB' },
        { id: '3', title: 'Week 1 Lecture Audio', type: 'audio', uploadedDate: '2024-01-20', size: '45 MB' },
    ]);
    
    const [assignments] = useState([
        { id: '1', title: 'Assignment 1: Introduction', dueDate: '2024-02-01', status: 'pending', submissions: 2, total: 4 },
        { id: '2', title: 'Assignment 2: Analysis', dueDate: '2024-02-15', status: 'graded', submissions: 4, total: 4 },
    ]);

    // Find the class
    const classData = classes.find(c => c.id === classId);
    if (!classData) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900">{t('Class not found')}</h1>
                <Link href="/teacher/classes" className="text-orange-600 hover:text-orange-700 mt-4 inline-block">
                    {t('Back to Classes')}
                </Link>
            </div>
        );
    }

    // Get enrolled students
    const enrolledStudents = students.filter(s => classData.studentIds.includes(s.id));
    
    // Get course info
    const course = programs.flatMap(p => p.courses).find(c => 
        c.programId === classData.programId && c.instructor === classData.instructor
    );

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div>
                <Link href="/teacher/classes" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4 font-medium">
                    <ChevronLeft className="w-4 h-4" />
                    {t('Back to Classes')}
                </Link>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{classData.name}</h1>
                            <p className="text-lg text-gray-600">{classData.programTitle}</p>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                            classData.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                            {classData.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">{t('Schedule')}</p>
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                {classData.schedule}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">{t('Students')}</p>
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                                <Users className="w-4 h-4 text-orange-500" />
                                {classData.studentCount}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">{t('Start Date')}</p>
                            <p className="font-semibold text-gray-900">{classData.startDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">{t('End Date')}</p>
                            <p className="font-semibold text-gray-900">{classData.endDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex gap-8">
                    {[
                        { id: 'overview' as const, label: 'Overview', icon: '📋' },
                        { id: 'materials' as const, label: 'Materials', icon: '📚' },
                        { id: 'students' as const, label: 'Students', icon: '👥' },
                        { id: 'assignments' as const, label: 'Assignments', icon: '📝' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in-up">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('Course Information')}</h2>
                            {course ? (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{t('Course Title')}</p>
                                        <p className="font-semibold text-gray-900">{course.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{t('Description')}</p>
                                        <p className="text-gray-700">{course.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">{t('Duration')}</p>
                                            <p className="font-semibold text-gray-900">{course.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{t('Total Lessons')}</p>
                                            <p className="font-semibold text-gray-900">{course.totalLessons}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{t('Instructor')}</p>
                                            <p className="font-semibold text-gray-900">{course.instructor}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">{t('Course information not available')}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Materials Tab */}
                {activeTab === 'materials' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">{t('Course Materials')}</h2>
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                {t('Upload Material')}
                            </button>
                        </div>

                        <div className="space-y-3">
                            {materials.length > 0 ? (
                                materials.map(material => (
                                    <div key={material.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`p-3 rounded-lg ${
                                                material.type === 'video' ? 'bg-red-50 text-red-600' :
                                                material.type === 'pdf' ? 'bg-orange-50 text-orange-600' :
                                                'bg-purple-50 text-purple-600'
                                            }`}>
                                                {material.type === 'video' ? <Video className="w-5 h-5" /> :
                                                 material.type === 'pdf' ? <FileText className="w-5 h-5" /> :
                                                 <Music className="w-5 h-5" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{material.title}</p>
                                                <p className="text-xs text-gray-500">{material.uploadedDate} • {material.size}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-xl">
                                    <p className="text-gray-500">{t('No materials uploaded yet')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Students Tab */}
                {activeTab === 'students' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">{t('Enrolled Students')} ({enrolledStudents.length})</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {enrolledStudents.length > 0 ? (
                                enrolledStudents.map(student => (
                                    <div key={student.id} className="bg-white rounded-xl border border-gray-100 p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-xl">
                                                {student.avatar}
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{student.email}</p>
                                        <p className="text-xs text-gray-500 mt-2">ID: {student.id}</p>
                                        <button className="w-full mt-4 py-2 border border-orange-200 text-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors">
                                            {t('View Profile')}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-8 bg-gray-50 rounded-xl">
                                    <p className="text-gray-500">{t('No students enrolled in this class')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Assignments Tab */}
                {activeTab === 'assignments' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">{t('Class Assignments')}</h2>
                            <Link href={`/teacher/grading?classId=${classId}`} className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
                                {t('View Grading')}
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {assignments.length > 0 ? (
                                assignments.map(assignment => (
                                    <div key={assignment.id} className="bg-white rounded-xl border border-gray-100 p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        Due: {assignment.dueDate}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {assignment.submissions}/{assignment.total} submitted
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                                                assignment.status === 'graded' 
                                                    ? 'bg-green-50 text-green-600' 
                                                    : 'bg-yellow-50 text-yellow-600'
                                            }`}>
                                                {assignment.status === 'graded' ? '✓ Graded' : 'Pending'}
                                            </span>
                                        </div>
                                        <button className="mt-4 text-orange-600 text-sm font-semibold hover:text-orange-700">
                                            {t('Review Submissions')}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-xl">
                                    <p className="text-gray-500">{t('No assignments created yet')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
