'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { programs, currentStudent, transcripts, announcements, exams } from '@/lib/data';
import {
    BookOpen, ArrowLeft, Play, CheckCircle2, Clock, TrendingUp,
    Bell, FileText, ChevronRight, Circle, Award, ArrowRight,
    BarChart3, Lock
} from 'lucide-react';

export default function StudentProgramDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'chapters' | 'announcements' | 'tests'>('chapters');

    // Get program
    const program = programs.find(p => p.id === id);
    if (!program) {
        return (
            <div className="space-y-6 animate-fade-in-up">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">Program not found</h3>
                </div>
            </div>
        );
    }

    // Get transcript for this program
    const transcript = transcripts.find(t => t.studentId === currentStudent.id && t.programId === id);
    const allChapters = transcript?.semesters.flatMap(sem => sem.courses) || [];
    const completedChapters = allChapters.filter(c => c.status === 'pass');
    const inProgressChapters = allChapters.filter(c => c.status === 'in-progress');

    // Per-program average
    let programScore = 0;
    let programChapterCount = 0;
    allChapters.forEach(c => {
        if (c.score > 0) {
            programScore += c.score;
            programChapterCount++;
        }
    });
    const programAverage = programChapterCount > 0 ? (programScore / programChapterCount).toFixed(1) : '0.0';

    const progress = currentStudent.progress[id] || 0;

    // Find the current chapter (first in-progress) for "Continue Learning"
    const currentChapter = inProgressChapters[0];

    // Get program announcements
    const programAnnouncements = announcements.filter(
        a => a.targetAudience === 'all' || a.targetAudience === 'students' ||
            (a.targetAudience === 'specific-program' && a.programId === id)
    ).slice(0, 5);

    // Get exams for this program's courses
    const programCourseIds = program.courses.map(c => c.id);
    const programExams = exams.filter(e => programCourseIds.includes(e.courseId) && e.status === 'published');

    // Determine which chapters have completed (and thus the test is "available")
    // For simplicity: a test is available for the next in-progress chapter test
    const getChapterExamStatus = (chapterCode: string) => {
        const chapter = allChapters.find(c => c.code === chapterCode);
        if (!chapter) return 'locked';
        if (chapter.status === 'pass') return 'completed';
        if (chapter.status === 'in-progress') return 'available';
        return 'locked';
    };

    const tabs = [
        { id: 'chapters' as const, label: 'Chapters', icon: BookOpen },
        { id: 'announcements' as const, label: 'Announcements', icon: Bell },
        { id: 'tests' as const, label: 'Tests', icon: FileText },
    ];

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Back button */}
            <button onClick={() => router.push('/student/programs')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Programs
            </button>

            {/* Program Header */}
            <div className="relative overflow-hidden rounded-2xl gradient-primary p-8">
                <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                            <BookOpen className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-white">{program.title}</h1>
                            <p className="text-orange-100 text-sm mt-1 max-w-2xl">{program.description}</p>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-yellow-300" />
                            <div>
                                <p className="text-white/70 text-[10px]">Average Score</p>
                                <p className="text-white font-bold text-lg leading-tight">{programAverage} <span className="text-xs font-normal text-white/60">/ 100</span></p>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-300" />
                            <div>
                                <p className="text-white/70 text-[10px]">Completed</p>
                                <p className="text-white font-bold text-lg leading-tight">{completedChapters.length} <span className="text-xs font-normal text-white/60">/ {allChapters.length}</span></p>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-orange-300" />
                            <div>
                                <p className="text-white/70 text-[10px]">Progress</p>
                                <p className="text-white font-bold text-lg leading-tight">{progress}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white/40 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Continue Learning CTA */}
            {currentChapter && (
                <Link href={`/student/lessons?programId=${id}`}>
                    <div className="bg-white rounded-2xl border border-orange-100 p-5 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                    <Play className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-orange-500 font-medium">Continue Learning</p>
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{currentChapter.title}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{currentChapter.code} • In Progress</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab: Chapters */}
            {activeTab === 'chapters' && (
                <div className="space-y-3">
                    {allChapters.length > 0 ? (
                        allChapters.map((chapter, idx) => (
                            <Link
                                key={chapter.code}
                                href={`/student/lessons?programId=${id}&chapterId=${chapter.code}`}
                            >
                                <div
                                    className={`bg-white rounded-xl border p-4 transition-all cursor-pointer group hover:shadow-md mb-3 ${chapter.status === 'in-progress'
                                        ? 'border-orange-200 shadow-sm'
                                        : 'border-gray-100 hover:border-orange-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Chapter number */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${chapter.status === 'pass'
                                            ? 'bg-green-100 text-green-600'
                                            : chapter.status === 'in-progress'
                                                ? 'bg-orange-100 text-orange-600'
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {chapter.status === 'pass' ? (
                                                <CheckCircle2 className="w-5 h-5" />
                                            ) : (
                                                idx + 1
                                            )}
                                        </div>

                                        {/* Chapter info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">{chapter.title}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">{chapter.code} • {chapter.credits} credits</p>
                                        </div>

                                        {/* Status badge */}
                                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium shrink-0 ${chapter.status === 'pass'
                                            ? 'bg-green-50 text-green-600'
                                            : chapter.status === 'in-progress'
                                                ? 'bg-orange-50 text-orange-600'
                                                : 'bg-red-50 text-red-600'
                                            }`}>
                                            {chapter.status === 'in-progress' ? 'In Progress' : chapter.status === 'pass' ? 'Completed' : 'Failed'}
                                        </span>

                                        {/* Arrow */}
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p>No chapters available for this program yet.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Tab: Announcements */}
            {activeTab === 'announcements' && (
                <div className="space-y-3">
                    {programAnnouncements.length > 0 ? (
                        programAnnouncements.map((ann) => (
                            <div key={ann.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-orange-100 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${ann.priority === 'high' ? 'bg-red-500' : ann.priority === 'medium' ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="font-semibold text-gray-900 text-sm">{ann.title}</h4>
                                            <span className="text-[10px] text-gray-400 shrink-0">{ann.date}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">{ann.content}</p>
                                        <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400">
                                            <span>{ann.author}</span>
                                            <span className={`px-2 py-0.5 rounded-full ${ann.priority === 'high' ? 'bg-red-50 text-red-500' : ann.priority === 'medium' ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-500'}`}>
                                                {ann.priority}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p>No announcements for this program.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Tab: Tests */}
            {activeTab === 'tests' && (
                <div className="space-y-3">
                    {allChapters.length > 0 ? (
                        allChapters.map((chapter, idx) => {
                            // Find a matching exam for this chapter
                            const matchingExam = programExams.find(e => {
                                const course = program.courses.find(c => c.title.includes(chapter.title.split(' ').slice(-1)[0]) || chapter.title.includes(c.title.split(' ').slice(-1)[0]));
                                return course && e.courseId === course.id;
                            });

                            const status = chapter.status === 'pass' ? 'completed' : chapter.status === 'in-progress' ? 'available' : 'locked';

                            return (
                                <div
                                    key={chapter.code}
                                    className={`bg-white rounded-xl border p-5 transition-all ${status === 'available'
                                        ? 'border-orange-200 hover:shadow-md cursor-pointer'
                                        : status === 'completed'
                                            ? 'border-green-100'
                                            : 'border-gray-100 opacity-60'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${status === 'completed'
                                            ? 'bg-green-100'
                                            : status === 'available'
                                                ? 'bg-orange-100'
                                                : 'bg-gray-100'
                                            }`}>
                                            {status === 'completed' ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            ) : status === 'available' ? (
                                                <FileText className="w-5 h-5 text-orange-500" />
                                            ) : (
                                                <Lock className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 text-sm">Chapter {idx + 1} Test: {chapter.title}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {status === 'completed'
                                                    ? `Score: ${chapter.score} / 100`
                                                    : status === 'available'
                                                        ? 'Complete this chapter to take the test'
                                                        : 'Locked — Complete previous chapters first'
                                                }
                                            </p>
                                        </div>
                                        <div className="shrink-0">
                                            {status === 'completed' && (
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-medium">Passed</span>
                                            )}
                                            {status === 'available' && (
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-medium">Available</span>
                                            )}
                                            {status === 'locked' && (
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 font-medium">Locked</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p>No tests available yet.</p>
                        </div>
                    )}

                    {/* Program Final Exam */}
                    <div className="mt-6">
                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-orange-500" />
                            Program Final Exam
                        </h3>
                        <div className={`bg-white rounded-xl border p-5 ${progress === 100 ? 'border-orange-200 hover:shadow-md cursor-pointer' : 'border-gray-100 opacity-60'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress === 100 ? 'bg-orange-100' : 'bg-gray-100'}`}>
                                    {progress === 100 ? (
                                        <Award className="w-5 h-5 text-orange-500" />
                                    ) : (
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-sm">{program.title} — Final Examination</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {progress === 100
                                            ? 'You are eligible to take the final exam and earn your certificate!'
                                            : `Complete all chapters to unlock (${progress}% done)`
                                        }
                                    </p>
                                </div>
                                {progress === 100 ? (
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-medium">Take Exam</span>
                                ) : (
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 font-medium">Locked</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
