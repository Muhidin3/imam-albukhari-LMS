'use client';

import Link from 'next/link';
import { programs, currentStudent } from '@/lib/data';
import { BookOpen, Clock, Users, ArrowRight, GraduationCap, ChevronRight } from 'lucide-react';

export default function StudentPrograms() {
    const enrolledPrograms = programs.filter(p => currentStudent.enrolledPrograms.includes(p.id));
    const otherPrograms = programs.filter(p => !currentStudent.enrolledPrograms.includes(p.id));

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Programs</h1>
                <p className="text-gray-500 text-sm mt-1">Browse and manage your enrolled programs</p>
            </div>

            {/* Enrolled Programs */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-orange-500" />
                    My Enrolled Programs
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {enrolledPrograms.map((program) => {
                        const progress = currentStudent.progress[program.id] || 0;
                        return (
                            <div key={program.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover">
                                <div className="h-32 gradient-primary relative">
                                    <div className="absolute inset-0 islamic-pattern opacity-15"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-lg font-bold text-white">{program.title}</h3>
                                        <p className="text-orange-200 text-xs mt-1">{program.level} • {program.duration}</p>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{program.description}</p>
                                    <div className="flex items-center justify-between text-sm mb-3">
                                        <span className="text-gray-500">{program.totalCourses} courses</span>
                                        <span className="font-semibold text-orange-500">{progress}% complete</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
                                        <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <Link href="/student/courses" className="flex items-center justify-center gap-2 w-full py-2.5 border border-orange-200 text-orange-500 rounded-xl text-sm font-medium hover:bg-orange-50 transition-colors">
                                        View Courses <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Browse Other Programs */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Explore More Programs
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {otherPrograms.map((program) => (
                        <div key={program.id} className="bg-white rounded-2xl border border-gray-100 p-5 card-hover">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-orange-500" />
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${program.status === 'active' ? 'badge-success' : 'badge-info'
                                    }`}>{program.status === 'active' ? 'Open' : 'Coming Soon'}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{program.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{program.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {program.duration}</span>
                                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {program.enrolledStudents}</span>
                            </div>
                            <button className="w-full py-2.5 gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                                Enroll Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
