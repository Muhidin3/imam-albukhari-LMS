'use client';

import { useParams, useRouter } from 'next/navigation';
import { programs, Course, Module, Lesson, exams } from '@/lib/data';
import { ChevronLeft, Save, FileText, Clock, PlayCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ChapterDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    // Find course across all programs
    const course = programs.flatMap(p => p.courses).find(c => c.id === id);
    const parentProgram = programs.find(p => p.courses.some(c => c.id === id));
    const chapterExam = exams.find(e => e.courseId === id);

    const [isEditing, setIsEditing] = useState(false);

    if (!course) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900">Chapter not found</h2>
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
                    <Edit className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Chapter'}
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
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Chapter Details</h2>
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
                            <h2 className="text-lg font-bold text-gray-900">Chapter Lessons</h2>
                            <button className="text-sm text-orange-500 font-medium hover:underline flex items-center gap-1">
                                <Plus className="w-4 h-4" /> Add Lesson
                            </button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {course.modules && course.modules.length > 0 ? (
                                course.modules.map((module, index) => (
                                    <div key={module.id} className="p-5 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">Lesson {index + 1}</span>
                                                    {module.title}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-1.5 text-gray-400 hover:text-orange-500 rounded-lg transition-colors border border-gray-100 hover:border-orange-200">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors border border-gray-100 hover:border-red-200">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                                <PlayCircle className="w-5 h-5" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-700">Upload Lesson Video</p>
                                            <p className="text-xs text-gray-400 mt-1">MP4 or WebM (Max 500MB)</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    No lessons created yet.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chapter Exam Block */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
                            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-orange-500 pl-3">Chapter Exam (Final Test)</h2>
                        </div>
                        <div className="p-6">
                            {chapterExam ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{chapterExam.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {chapterExam.totalQuestions} Questions • {chapterExam.duration} mins • {chapterExam.passingScore}% to pass
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/admin/exams/${chapterExam.id}`)}
                                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                                    >
                                        <Edit className="w-4 h-4" /> Manage Exam
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <FileText className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-1">No Exam Assigned</h3>
                                    <p className="text-sm text-gray-500 mb-4 max-w-sm mx-auto">
                                        Create a multiple-choice exam that students must pass to complete this chapter.
                                    </p>
                                    <button
                                        onClick={() => router.push('/admin/exams')}
                                        className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
                                    >
                                        <Plus className="w-4 h-4" /> Create Chapter Exam
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
