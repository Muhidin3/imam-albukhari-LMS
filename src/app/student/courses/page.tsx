'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { currentStudent, transcripts, programs } from '@/lib/data';
import { ChevronRight, CheckCircle2, Circle, GraduationCap, BookOpen, Download, FileText, Video, Headphones, Play } from 'lucide-react';

export default function StudentCourses() {
    const searchParams = useSearchParams();
    const courseCodeParam = searchParams.get('courseCode');
    
    const [expandedCourse, setExpandedCourse] = useState<string | null>(courseCodeParam || null);
    
    const transcript = transcripts.find(t => t.studentId === currentStudent.id);
    const semesters = transcript?.semesters ?? [];
    
    // Get current semester (the one with in-progress courses)
    const currentSemester = semesters.find(s => s.courses.some(c => c.status === 'in-progress'));

    if (!currentSemester) {
        return (
            <div className="space-y-8 animate-fade-in-up">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Current Courses</h1>
                    <p className="text-gray-500 text-sm mt-1">View your current semester courses with materials</p>
                </div>
                <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">No Current Courses</h3>
                    <p className="text-gray-500">You don&apos;t have any courses in progress at the moment.</p>
                </div>
            </div>
        );
    }

    // Get course details from programs
    const getCourseDetails = (courseCode: string) => {
        for (const program of programs) {
            for (const course of program.courses) {
                if (course.id === courseCode || course.id.includes(courseCode)) {
                    return course;
                }
            }
        }
        return null;
    };

    // Mock materials for demonstration
    const getMaterials = (courseCode: string) => [
        { id: 'mat-1', title: 'Week 1 Lecture', type: 'video', fileName: 'week-1-lecture.mp4', duration: '45 min' },
        { id: 'mat-2', title: 'Course Overview PDF', type: 'pdf', fileName: 'course-overview.pdf', size: '2.5 MB' },
        { id: 'mat-3', title: 'Study Guide - Chapter 1', type: 'pdf', fileName: 'study-guide-ch1.pdf', size: '1.8 MB' },
        { id: 'mat-4', title: 'Audio Lecture - Introduction', type: 'audio', fileName: 'intro-lecture.mp3', duration: '30 min' },
        { id: 'mat-5', title: 'Practical Examples', type: 'pdf', fileName: 'examples.pdf', size: '3.2 MB' },
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'video': return 'bg-red-50 text-red-600 border-red-100';
            case 'pdf': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'audio': return 'bg-purple-50 text-purple-600 border-purple-100';
            default: return 'bg-blue-50 text-blue-600 border-blue-100';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="w-4 h-4" />;
            case 'pdf': return <FileText className="w-4 h-4" />;
            case 'audio': return <Headphones className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Current Courses</h1>
                <p className="text-gray-500 text-sm mt-1">{currentSemester.name} • Click course to view materials</p>
            </div>

            <div className="space-y-4">
                {currentSemester.courses.map((course) => {
                    const courseDetails = getCourseDetails(course.code);
                    const materials = getMaterials(course.code);
                    const isExpanded = expandedCourse === course.code;

                    return (
                        <div key={course.code} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setExpandedCourse(isExpanded ? null : course.code)}
                                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b border-gray-50"
                            >
                                <div className="text-left flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
                                            <p className="text-xs text-gray-500">{course.code} • {course.credits} credits</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-900">{course.grade}</div>
                                        <div className="text-xs text-gray-500">{course.score}%</div>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="p-6 bg-gray-50/30 space-y-6">
                                    {/* Instructor Info */}
                                    {courseDetails && (
                                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Instructor</h4>
                                            <p className="text-gray-700">{courseDetails.instructor}</p>
                                            <p className="text-sm text-gray-500 mt-2">{courseDetails.description}</p>
                                        </div>
                                    )}

                                    {/* Course Materials */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-orange-500" />
                                            Course Materials ({materials.length})
                                        </h4>
                                        <div className="space-y-2">
                                            {materials.map((material) => (
                                                <div
                                                    key={material.id}
                                                    className={`border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-all cursor-pointer ${getTypeColor(material.type)}`}
                                                >
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <div className={`p-2.5 rounded-lg ${getTypeColor(material.type)}`}>
                                                            {getTypeIcon(material.type)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">{material.title}</p>
                                                            <p className="text-xs text-gray-500">{material.fileName} • {material.duration || material.size}</p>
                                                        </div>
                                                    </div>
                                                    <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Course Progress */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                                        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Status</h4>
                                        <div className="flex items-center justify-between">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                                                course.status === 'pass' ? 'bg-green-50 text-green-600' :
                                                course.status === 'fail' ? 'bg-red-50 text-red-600' :
                                                'bg-blue-50 text-blue-600'
                                            }`}>
                                                {course.status === 'in-progress' ? (
                                                    <>
                                                        <Circle className="w-2 h-2 animate-pulse" />
                                                        In Progress
                                                    </>
                                                ) : course.status === 'pass' ? (
                                                    <>
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        Passed
                                                    </>
                                                ) : (
                                                    'Failed'
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
