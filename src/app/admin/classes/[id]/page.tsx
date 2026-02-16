'use client';

import { useParams, useRouter } from 'next/navigation';
import { classes, students } from '@/lib/data';
import { ChevronLeft, Save, BookOpen, Clock, Users, Calendar, Edit, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ClassDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const cls = classes.find(c => c.id === id);
    const classStudents = students.filter(s => s.classId === id);

    const [isEditing, setIsEditing] = useState(false);

    if (!cls) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900">Class not found</h2>
                <button onClick={() => router.back()} className="mt-4 text-orange-500 hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{cls.name}</h1>
                    <p className="text-orange-500 text-sm">{cls.programTitle}</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                    <Edit className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Class'}
                </button>
                {isEditing && (
                    <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                )}
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <Users className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Students</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{cls.studentCount}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Schedule</h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2" title={cls.schedule}>{cls.schedule}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Start Date</h3>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{cls.startDate}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">End Date</h3>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{cls.endDate}</p>
                </div>
            </div>

            {/* Details & Students */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Details Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Class Configuration</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Instructor</label>
                                {isEditing ? (
                                    <input
                                        defaultValue={cls.instructor}
                                        className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                                            {cls.instructor.charAt(0)}
                                        </div>
                                        <p className="text-sm text-gray-700 font-medium">{cls.instructor}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Schedule</label>
                                {isEditing ? (
                                    <input
                                        defaultValue={cls.schedule}
                                        className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                    />
                                ) : (
                                    <p className="text-sm text-gray-700">{cls.schedule}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${cls.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {cls.status.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Enrolled Students</h2>
                            <button className="text-sm text-orange-500 font-medium hover:underline flex items-center gap-1">
                                <Users className="w-4 h-4" /> Manage Enrollment
                            </button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {classStudents.length > 0 ? (
                                classStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        onClick={() => router.push(`/admin/students/${student.id}`)}
                                        className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-sm border border-orange-200">
                                                {student.avatar}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                                <p className="text-xs text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {student.status.toUpperCase()}
                                            </span>
                                            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Mail className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    No students enrolled in this class yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
