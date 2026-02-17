'use client';

import Link from 'next/link';
import { programs, currentStudent, transcripts } from '@/lib/data';
import { BookOpen, Clock, Users, ArrowRight, GraduationCap, ChevronRight, BookMarked, CheckCircle2, Circle, User } from 'lucide-react';
import { useState } from 'react';

export default function StudentSemesters() {
    const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
    
    // Get the student's transcript
    const transcript = transcripts.find(t => t.studentId === currentStudent.id);
    const semesters = transcript?.semesters ?? [];
    
    // Get the program details
    const enrolledProgram = programs.find(p => p.id === transcript?.programId);
    
    // Find current semester (last one with in-progress courses)
    const currentSemester = semesters.find(s => s.courses.some(c => c.status === 'in-progress'));
    const pastSemesters = semesters.filter(s => s.id !== currentSemester?.id);

    // Helper function to get course instructor from programs data
    const getCourseInstructor = (courseCode: string) => {
        for (const program of programs) {
            for (const course of program.courses) {
                if (course.id === courseCode) {
                    return course.instructor;
                }
            }
        }
        return 'Not Available';
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Semesters</h1>
                <p className="text-gray-500 text-sm mt-1">View your current and past semesters with courses and instructors</p>
            </div>

            {/* Current Semester */}
            {currentSemester && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BookMarked className="w-5 h-5 text-orange-500" />
                        Current Semester
                    </h2>
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <button
                            onClick={() => setExpandedSemester(expandedSemester === currentSemester.id ? null : currentSemester.id)}
                            className="w-full flex items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-left">
                                <h3 className="text-lg font-bold text-gray-900">{currentSemester.name}</h3>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span>GPA: <span className="font-semibold text-gray-900">{currentSemester.gpa}</span></span>
                                    <span className="text-orange-500 font-semibold">{currentSemester.courses.length} courses</span>
                                </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSemester === currentSemester.id ? 'rotate-90' : ''}`} />
                        </button>

                        {expandedSemester === currentSemester.id && (
                            <div className="p-6 space-y-4">
                                {currentSemester.courses.map((course, idx) => (
                                    <Link href={`/student/courses?courseCode=${course.code}`} key={course.code}>
                                        <div className="bg-linear-to-r from-orange-50 to-transparent rounded-xl border border-orange-100 p-4 cursor-pointer hover:shadow-md transition-all group">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{course.title}</h4>
                                                        {course.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">{course.code} • {course.credits} credits</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">{course.grade}</div>
                                                    <div className="text-xs text-gray-500">{course.score}%</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span className={`px-2.5 py-1 rounded-full font-medium ${course.status === 'pass' ? 'bg-green-50 text-green-600' : course.status === 'fail' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    {course.status === 'in-progress' ? 'In Progress' : course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    Instructor Info Available
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Past Semesters */}
            {pastSemesters.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-gray-500" />
                        Past Semesters
                    </h2>
                    <div className="space-y-4">
                        {pastSemesters.map((semester) => (
                            <div key={semester.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                <button
                                    onClick={() => setExpandedSemester(expandedSemester === semester.id ? null : semester.id)}
                                    className="w-full flex items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="text-left">
                                        <h3 className="text-base font-semibold text-gray-900">{semester.name}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                            <span>GPA: <span className="font-semibold text-gray-700">{semester.gpa}</span></span>
                                            <span>{semester.courses.length} courses</span>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSemester === semester.id ? 'rotate-90' : ''}`} />
                                </button>

                                {expandedSemester === semester.id && (
                                    <div className="p-6 space-y-3 bg-gray-50/30">
                                        {semester.courses.map((course) => (
                                            <div key={course.code} className="bg-white rounded-lg border border-gray-100 p-4 flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                                                        {course.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">{course.code} • {course.credits} credits</div>
                                                </div>
                                                <div className="text-right ml-4">
                                                    <div className="font-semibold text-gray-900">{course.grade}</div>
                                                    <div className="text-xs text-gray-500">{course.score}%</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
