/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { programs, currentStudent } from '@/lib/data';
import {
    Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, BookOpen,
    FileText, Headphones, ChevronLeft, ChevronRight, CheckCircle2, Circle,
    Download, Clock, List, ChevronDown, ArrowLeft, ArrowRight
} from 'lucide-react';

export default function LessonViewer() {
    const searchParams = useSearchParams();
    const programIdParam = searchParams.get('programId');
    const chapterIdParam = searchParams.get('chapterId');

    const [isPlaying, setIsPlaying] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [selectedProgramId, setSelectedProgramId] = useState<string | null>(programIdParam);

    // Get enrolled programs
    const enrolledPrograms = programs.filter(p => currentStudent.enrolledPrograms.includes(p.id));

    // Active program (from URL param or user selection)
    const activeProgram = selectedProgramId ? programs.find(p => p.id === selectedProgramId) : null;

    // Build chapters and lessons directly from the program's courses (no transcript matching needed)
    const chapterList = useMemo(() => {
        if (!activeProgram) return [];

        return activeProgram.courses
            .filter(course => course.modules.length > 0)
            .map(course => ({
                chapterId: course.id,
                chapterName: course.title,
                instructor: course.instructor,
                allLessons: course.modules.flatMap(m =>
                    m.lessons.map(l => ({
                        ...l,
                        moduleName: m.title,
                        chapterId: course.id,
                        chapterName: course.title
                    }))
                )
            }));
    }, [activeProgram]);

    // All lessons flat list
    const allLessons = useMemo(() => chapterList.flatMap(c => c.allLessons), [chapterList]);

    // Find starting lesson index based on chapterId param or first incomplete
    const startingLessonIndex = useMemo(() => {
        if (chapterIdParam && chapterList.length > 0) {
            // Try to match chapterId param to a chapter (could be code like ISL101 or id like course-1)
            const targetChapter = chapterList.find(c =>
                c.chapterId === chapterIdParam ||
                c.chapterName.toLowerCase().includes(chapterIdParam.toLowerCase())
            );
            if (targetChapter) {
                const firstIncomplete = targetChapter.allLessons.find((l: any) => !l.completed);
                if (firstIncomplete) {
                    const idx = allLessons.findIndex((l: any) => l.id === firstIncomplete.id);
                    if (idx >= 0) return idx;
                }
                // Start at first lesson of that chapter
                const first = targetChapter.allLessons[0];
                if (first) {
                    const idx = allLessons.findIndex((l: any) => l.id === first.id);
                    if (idx >= 0) return idx;
                }
            }
        }
        // Default: first incomplete lesson
        const idx = allLessons.findIndex((l: any) => !l.completed);
        return idx >= 0 ? idx : 0;
    }, [allLessons, chapterList, chapterIdParam]);

    const [currentLessonIndex, setCurrentLessonIndex] = useState(startingLessonIndex);
    const currentLesson: any = allLessons[currentLessonIndex];
    const currentChapterForLesson = currentLesson ? chapterList.find(c => c.chapterId === currentLesson.chapterId) : null;
    const [expandedChapter, setExpandedChapter] = useState<string | null>(currentChapterForLesson?.chapterId || (chapterList.length > 0 ? chapterList[0].chapterId : null));

    const handlePrevious = () => {
        if (currentLessonIndex > 0) setCurrentLessonIndex(currentLessonIndex - 1);
    };

    const handleNext = () => {
        if (currentLessonIndex < allLessons.length - 1) setCurrentLessonIndex(currentLessonIndex + 1);
    };

    // =====================================================
    // NO PROGRAM SELECTED - Show program picker
    // =====================================================
    if (!selectedProgramId || !activeProgram) {
        return (
            <div className="space-y-6 animate-fade-in-up">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lesson Viewer</h1>
                    <p className="text-gray-500 text-sm mt-1">Select a program to start learning</p>
                </div>

                {enrolledPrograms.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {enrolledPrograms.map((program) => {
                            const progress = currentStudent.progress[program.id] || 0;
                            const totalLessons = program.courses.reduce((acc, c) => acc + c.totalLessons, 0);
                            const completedLessons = program.courses.reduce((acc, c) => acc + (c.completedLessons || 0), 0);

                            return (
                                <button
                                    key={program.id}
                                    onClick={() => setSelectedProgramId(program.id)}
                                    className="bg-white rounded-2xl border border-gray-100 p-6 text-left hover:border-orange-200 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{program.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{program.courses.length} chapters • {totalLessons} lessons</p>

                                            <div className="mt-3">
                                                <div className="flex items-center justify-between text-xs mb-1">
                                                    <span className="text-gray-500">{completedLessons} of {totalLessons} lessons done</span>
                                                    <span className="font-bold text-orange-500">{progress}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900">No Programs</h3>
                        <p className="text-gray-500">You are not enrolled in any programs yet.</p>
                        <Link href="/student/programs" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-100 transition-colors">
                            Browse Programs
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    // =====================================================
    // PROGRAM SELECTED BUT NO LESSONS (edge case)
    // =====================================================
    if (allLessons.length === 0) {
        return (
            <div className="space-y-6 animate-fade-in-up">
                <button onClick={() => setSelectedProgramId(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" /> Change Program
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lesson Viewer</h1>
                    <p className="text-gray-500 text-sm mt-1">{activeProgram.title}</p>
                </div>
                <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">No Lessons Available</h3>
                    <p className="text-gray-500">This program doesn&apos;t have any lessons yet.</p>
                </div>
            </div>
        );
    }

    // =====================================================
    // LESSON VIEWER
    // =====================================================
    const renderContent = () => {
        if (!currentLesson) {
            return (
                <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center">
                    <div className="text-center">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Select a lesson to begin</p>
                    </div>
                </div>
            );
        }

        switch (currentLesson.type) {
            case 'video':
                return (
                    <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-orange-500/30 transition-colors" onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <Pause className="w-10 h-10 text-orange-400" /> : <Play className="w-10 h-10 text-orange-400 ml-1" />}
                                </div>
                                <p className="text-gray-400 text-sm">{currentLesson.title}</p>
                                <p className="text-gray-600 text-xs mt-1">Video Lesson • {currentLesson.duration}</p>
                            </div>
                        </div>
                        {/* Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                            <div className="w-full h-1 bg-gray-700 rounded-full mb-3 cursor-pointer">
                                <div className="w-1/3 h-full bg-orange-500 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-orange-400 transition-colors">
                                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                    </button>
                                    <button className="text-white hover:text-orange-400 transition-colors"><SkipBack className="w-4 h-4" /></button>
                                    <button className="text-white hover:text-orange-400 transition-colors"><SkipForward className="w-4 h-4" /></button>
                                    <span className="text-gray-400 text-xs">15:24 / {currentLesson.duration}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="text-white hover:text-orange-400 transition-colors"><Volume2 className="w-4 h-4" /></button>
                                    <button className="text-white hover:text-orange-400 transition-colors"><Maximize2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'audio':
                return (
                    <div className="bg-linear-to-br from-purple-900 to-indigo-900 rounded-2xl p-12 text-center">
                        <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                            <Headphones className="w-16 h-16 text-purple-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{currentLesson.title}</h3>
                        <p className="text-purple-300 text-sm mb-8">Audio Lesson • {currentLesson.duration}</p>
                        <div className="max-w-md mx-auto">
                            <div className="w-full h-2 bg-white/10 rounded-full mb-4 cursor-pointer">
                                <div className="w-2/5 h-full bg-purple-400 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-purple-300">
                                <span>12:30</span>
                                <div className="flex items-center gap-4">
                                    <button className="hover:text-white transition-colors"><SkipBack className="w-5 h-5" /></button>
                                    <button className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors" onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
                                    </button>
                                    <button className="hover:text-white transition-colors"><SkipForward className="w-5 h-5" /></button>
                                </div>
                                <span>{currentLesson.duration}</span>
                            </div>
                        </div>
                    </div>
                );
            case 'pdf':
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{currentLesson.title}</h3>
                                    <p className="text-sm text-gray-500">PDF Document • {currentLesson.duration} read</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-500 rounded-xl text-sm font-medium hover:bg-orange-100 transition-colors">
                                <Download className="w-4 h-4" /> Download
                            </button>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-8 min-h-100 flex items-center justify-center border border-gray-100">
                            <div className="text-center">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-sm">PDF Viewer</p>
                                <p className="text-gray-400 text-xs mt-1">Document content would be rendered here</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{currentLesson.title}</h3>
                        <div className="prose max-w-none text-gray-600">
                            <p>This is a text-based lesson covering important concepts. In a full implementation, rich text content would be displayed here with proper formatting, images, and interactive elements.</p>
                            <h4 className="text-gray-900 font-bold mt-6">Key Points</h4>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>Understanding the fundamental concepts</li>
                                <li>Practical application in daily life</li>
                                <li>Connection to Quran and Sunnah</li>
                                <li>Summary and review questions</li>
                            </ul>
                        </div>
                    </div>
                );
        }
    };

    // Shared chapter/lesson list component
    const renderChapterList = () => (
        <>
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">{activeProgram.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{chapterList.length} chapters • {allLessons.filter((l: any) => l.completed).length}/{allLessons.length} lessons</p>
            </div>
            <div className="max-h-[50vh] xl:max-h-[60vh] overflow-y-auto">
                {chapterList.map((chapter) => (
                    <div key={chapter.chapterId} className="border-b border-gray-50">
                        <button
                            onClick={() => setExpandedChapter(expandedChapter === chapter.chapterId ? null : chapter.chapterId)}
                            className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-orange-50/30 transition-colors"
                        >
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedChapter === chapter.chapterId ? 'rotate-180' : ''}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-900 truncate">{chapter.chapterName}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">{chapter.allLessons.length} lessons</p>
                            </div>
                        </button>

                        {expandedChapter === chapter.chapterId && (
                            <div className="bg-gray-50/50 border-t border-gray-50">
                                {chapter.allLessons.map((lesson: any) => {
                                    const globalIdx = allLessons.findIndex((l: any) => l.id === lesson.id);
                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => {
                                                setCurrentLessonIndex(globalIdx);
                                                // Auto-hide panel on mobile after selecting a lesson
                                                if (window.innerWidth < 1280) setShowSidebar(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 transition-colors border-t border-gray-100 text-xs ${globalIdx === currentLessonIndex ? 'bg-orange-50 border-l-2 border-l-orange-500 pl-3' : ''}`}
                                        >
                                            {lesson.completed ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                            ) : globalIdx === currentLessonIndex ? (
                                                <Play className="w-4 h-4 text-orange-500 shrink-0" />
                                            ) : (
                                                <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-medium truncate ${globalIdx === currentLessonIndex ? 'text-orange-600' : 'text-gray-700'}`}>{lesson.title}</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">{lesson.type} • {lesson.duration}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <div className="space-y-4 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        {programIdParam ? (
                            <Link href={`/student/programs/${programIdParam}`} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        ) : (
                            <button onClick={() => setSelectedProgramId(null)} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                        )}
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Lesson Viewer</h1>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm truncate">{activeProgram.title} — {currentChapterForLesson?.chapterName || 'Lessons'}</p>
                </div>
                <button onClick={() => setShowSidebar(!showSidebar)} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
                    <List className="w-4 h-4" /> <span className="hidden sm:inline">{showSidebar ? 'Hide' : 'Show'}</span> Content
                </button>
            </div>



            {/* Main layout */}
            <div className="flex gap-6">
                {/* Main Content */}
                <div className="flex-1 min-w-0 space-y-4">
                    {renderContent()}

                    {/* Lesson Info */}
                    {currentLesson && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
                            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{currentLesson.title}</h2>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {currentLesson.duration}</span>
                                <span className="capitalize px-2 py-0.5 rounded bg-gray-100 text-xs">{currentLesson.type}</span>
                                <span className="text-gray-400 text-xs sm:text-sm truncate">Chapter: {currentLesson.chapterName}</span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentLessonIndex === 0}
                                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Previous</span>
                                </button>
                                <button className="px-4 sm:px-6 py-2 gradient-primary text-white rounded-xl text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity">
                                    Mark Complete
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={currentLessonIndex === allLessons.length - 1}
                                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className="hidden sm:inline">Next</span> <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop Sidebar (xl and up) */}
                {showSidebar && (
                    <div className="w-80 shrink-0 hidden xl:block">
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-6">
                            {renderChapterList()}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile: Collapsible chapter/lesson panel */}
            {showSidebar && (
                <div className="xl:hidden bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {renderChapterList()}
                </div>
            )}
        </div>
    );
}
