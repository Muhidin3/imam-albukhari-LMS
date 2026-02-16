'use client';

import { useParams, useRouter } from 'next/navigation';
import { programs } from '@/lib/data';
import { ChevronLeft, Save, BookOpen, Clock, Users, Plus, Edit } from 'lucide-react';
import { useState } from 'react';

export default function ProgramDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const program = programs.find(p => p.id === id);

    const [isEditing, setIsEditing] = useState(false);

    if (!program) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900">Program not found</h2>
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
                    <h1 className="text-2xl font-bold text-gray-900">{program.title}</h1>
                    <p className="text-orange-500 text-sm">{program.titleAr}</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                    <Edit className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Program'}
                </button>
                {isEditing && (
                    <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                )}
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Total Courses</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{program.totalCourses}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Users className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Enrolled Students</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{program.enrolledStudents}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Duration</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{program.duration}</p>
                </div>
            </div>

            {/* Details & Courses */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Details Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Program Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                                {isEditing ? (
                                    <textarea
                                        defaultValue={program.description}
                                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        rows={4}
                                    />
                                ) : (
                                    <p className="text-sm text-gray-700 leading-relaxed">{program.description}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Level</label>
                                {isEditing ? (
                                    <select defaultValue={program.level} className="w-full p-2 border border-gray-200 rounded-lg text-sm">
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                ) : (
                                    <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                                        {program.level}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${program.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {program.status.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Included Courses</h2>
                            <button className="text-sm text-orange-500 font-medium hover:underline flex items-center gap-1">
                                <Plus className="w-4 h-4" /> Add Course
                            </button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {program.courses && program.courses.length > 0 ? (
                                program.courses.map((course) => (
                                    <div key={course.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                            <BookOpen className="w-6 h-6 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{course.title}</h3>
                                            <p className="text-xs text-gray-500">{course.totalLessons} Lessons • {course.duration}</p>
                                        </div>
                                        <button
                                            onClick={() => router.push(`/admin/courses/${course.id}`)}
                                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium hover:bg-white hover:border-gray-300 transition-all"
                                        >
                                            Manage
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    No courses added yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
