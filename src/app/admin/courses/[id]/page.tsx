'use client';

import { useParams, useRouter } from 'next/navigation';
import { programs, Course, Module, Lesson } from '@/lib/data';
import { ChevronLeft, Save, FileText, Clock, PlayCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function CourseDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    // Find course across all programs
    const course = programs.flatMap(p => p.courses).find(c => c.id === id);
    const parentProgram = programs.find(p => p.courses.some(c => c.id === id));

    const [isEditing, setIsEditing] = useState(false);

    if (!course) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900">Course not found</h2>
                <button onClick={() => router.back()} className="mt-4 text-orange-500 hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in-up pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                    <p className="text-orange-500 text-sm">{parentProgram?.title || 'Unassigned Program'}</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                    <Edit className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Course'}
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
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Total Lessons</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{course.totalLessons}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Duration</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{course.duration}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <PlayCircle className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-700">Completion</h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                        {course.completedLessons || 0}/{course.totalLessons} Lessons Completed
                    </p>
                </div>
            </div>

            {/* Content & Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Details Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Course Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                                {isEditing ? (
                                    <textarea
                                        defaultValue={course.description}
                                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        rows={4}
                                    />
                                ) : (
                                    <p className="text-sm text-gray-700 leading-relaxed">{course.description}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Instructor</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={course.instructor}
                                        className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    />
                                ) : (
                                    <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Course Modules</h2>
                            <button className="text-sm text-orange-500 font-medium hover:underline flex items-center gap-1">
                                <Plus className="w-4 h-4" /> Add Module
                            </button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {course.modules && course.modules.length > 0 ? (
                                course.modules.map((module) => (
                                    <div key={module.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-md">Module {module.order}</span>
                                                {module.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg transition-colors">
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pl-4 border-l-2 border-gray-100 space-y-2 mt-2">
                                            {module.lessons.map((lesson) => (
                                                <div key={lesson.id} className="flex items-center justify-between group p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-1.5 rounded-lg ${lesson.type === 'video' ? 'bg-red-50 text-red-500' :
                                                                lesson.type === 'audio' ? 'bg-purple-50 text-purple-500' :
                                                                    'bg-blue-50 text-blue-500'
                                                            }`}>
                                                            {lesson.type === 'video' ? <PlayCircle className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                                                        </div>
                                                        <span className="text-sm text-gray-700">{lesson.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                                        <span>{lesson.duration}</span>
                                                        <button className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="w-full py-2 text-xs text-center text-gray-400 border border-dashed border-gray-200 rounded-lg hover:border-orange-200 hover:text-orange-500 transition-colors flex items-center justify-center gap-1">
                                                <Plus className="w-3 h-3" /> Add Lesson
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    No modules created yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
