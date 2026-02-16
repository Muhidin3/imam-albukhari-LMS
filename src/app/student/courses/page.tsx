'use client';

import Link from 'next/link';
import { programs, currentStudent } from '@/lib/data';
import { BookOpen, Clock, Play, FileText, Headphones, ChevronRight, CheckCircle2, Circle, GraduationCap } from 'lucide-react';

export default function StudentCourses() {
    const enrolledPrograms = programs.filter(p => currentStudent.enrolledPrograms.includes(p.id));
    const allCourses = enrolledPrograms.flatMap(p => p.courses);

    const getIcon = (type: string) => {
        switch (type) {
            case 'video': return <Play className="w-3.5 h-3.5" />;
            case 'audio': return <Headphones className="w-3.5 h-3.5" />;
            case 'pdf': return <FileText className="w-3.5 h-3.5" />;
            default: return <BookOpen className="w-3.5 h-3.5" />;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                <p className="text-gray-500 text-sm mt-1">View all courses from your enrolled programs</p>
            </div>

            <div className="space-y-6">
                {allCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        {/* Course Header */}
                        <div className="p-6 border-b border-gray-50">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <GraduationCap className="w-4 h-4 text-orange-500" />
                                        <span className="text-xs text-orange-500 font-medium uppercase tracking-wider">
                                            {enrolledPrograms.find(p => p.id === course.programId)?.title}
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">{course.title}</h2>
                                    <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                                        <span>👨‍🏫 {course.instructor}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-orange-500">{course.progress || 0}%</div>
                                    <div className="text-xs text-gray-500">{course.completedLessons}/{course.totalLessons} lessons</div>
                                </div>
                            </div>
                            <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="progress-bar h-full" style={{ width: `${course.progress || 0}%` }}></div>
                            </div>
                        </div>

                        {/* Modules */}
                        <div className="p-6">
                            <div className="space-y-4">
                                {course.modules.map((module) => (
                                    <div key={module.id} className="border border-gray-100 rounded-xl overflow-hidden">
                                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                                            <h3 className="text-sm font-semibold text-gray-700">Module {module.order}: {module.title}</h3>
                                            <span className="text-xs text-gray-500">
                                                {module.lessons.filter(l => l.completed).length}/{module.lessons.length} done
                                            </span>
                                        </div>
                                        <div className="divide-y divide-gray-50">
                                            {module.lessons.map((lesson) => (
                                                <Link
                                                    key={lesson.id}
                                                    href={`/student/lessons?lessonId=${lesson.id}`}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 transition-colors"
                                                >
                                                    {lesson.completed ? (
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className={`text-sm font-medium ${lesson.completed ? 'text-gray-400' : 'text-gray-900'}`}>{lesson.title}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${lesson.type === 'video' ? 'bg-blue-50 text-blue-600' :
                                                                lesson.type === 'audio' ? 'bg-purple-50 text-purple-600' :
                                                                    lesson.type === 'pdf' ? 'bg-red-50 text-red-600' :
                                                                        'bg-gray-50 text-gray-600'
                                                            }`}>
                                                            {getIcon(lesson.type)} {lesson.type}
                                                        </span>
                                                        <span className="text-xs text-gray-400">{lesson.duration}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
