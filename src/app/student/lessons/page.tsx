/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { programs, currentStudent } from '@/lib/data';
import {
    Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, BookOpen,
    FileText, Headphones, ChevronLeft, ChevronRight, CheckCircle2, Circle,
    Download, Clock, ChevronDown, ArrowLeft, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LessonViewer() {
    const searchParams = useSearchParams();
    const programIdParam = searchParams.get('programId');
    const chapterIdParam = searchParams.get('chapterId');
    const { t } = useLanguage();

    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedProgramId, setSelectedProgramId] = useState<string | null>(programIdParam);

    const enrolledPrograms = programs.filter(p => currentStudent.enrolledPrograms.includes(p.id));
    const activeProgram = selectedProgramId ? programs.find(p => p.id === selectedProgramId) : null;

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

    const allLessons = useMemo(() => chapterList.flatMap(c => c.allLessons), [chapterList]);

    const startingLessonIndex = useMemo(() => {
        if (chapterIdParam && chapterList.length > 0) {
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
                const first = targetChapter.allLessons[0];
                if (first) {
                    const idx = allLessons.findIndex((l: any) => l.id === first.id);
                    if (idx >= 0) return idx;
                }
            }
        }
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
    // NO PROGRAM SELECTED
    // =====================================================
    if (!selectedProgramId || !activeProgram) {
        return (
            <div className="space-y-4 animate-fade-in-up">
                <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{t('Lesson Viewer')}</h1>
                    <p className="text-gray-500 text-sm mt-0.5">{t('Select a program to start learning')}</p>
                </div>

                {enrolledPrograms.length > 0 ? (
                    <div className="space-y-3">
                        {enrolledPrograms.map((program) => {
                            const progress = currentStudent.progress[program.id] || 0;
                            const totalLessons = program.courses.reduce((acc, c) => acc + c.totalLessons, 0);
                            const completedLessons = program.courses.reduce((acc, c) => acc + (c.completedLessons || 0), 0);

                            return (
                                <button
                                    key={program.id}
                                    onClick={() => setSelectedProgramId(program.id)}
                                    className="card-mobile p-4 w-full text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-orange-600 transition-colors">{program.title}</h3>
                                            <p className="text-xs text-gray-500 mt-0.5">{program.courses.length} {t('chapters')} - {totalLessons} {t('lessons')}</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 shrink-0 group-hover:text-orange-400 transition-colors" />
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-400">{completedLessons}/{totalLessons} {t('done')}</span>
                                            <span className="font-bold text-orange-500">{progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">{t('Not enrolled yet')}</p>
                    </div>
                )}
            </div>
        );
    }

    // No lessons edge case
    if (allLessons.length === 0) {
        return (
            <div className="space-y-4 animate-fade-in-up">
                <button onClick={() => setSelectedProgramId(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
                    <ArrowLeft className="w-4 h-4" /> {t('Back')}
                </button>
                <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">{t('No lessons available yet')}</p>
                </div>
            </div>
        );
    }

    // =====================================================
    // CONTENT RENDERERS
    // =====================================================
    const renderContent = () => {
        if (!currentLesson) {
            return (
                <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-300" />
                </div>
            );
        }

        switch (currentLesson.type) {
            case 'video':
                return (
                    <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <button className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3 hover:bg-orange-500/30 transition-colors" onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <Pause className="w-8 h-8 lg:w-10 lg:h-10 text-orange-400" /> : <Play className="w-8 h-8 lg:w-10 lg:h-10 text-orange-400 ml-1" />}
                                </button>
                                <p className="text-gray-400 text-xs">{currentLesson.duration}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3 lg:p-4">
                            <div className="w-full h-1 bg-gray-700 rounded-full mb-3">
                                <div className="w-1/3 h-full bg-orange-500 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 lg:gap-3">
                                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center">
                                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                    </button>
                                    <button className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center"><SkipBack className="w-4 h-4" /></button>
                                    <button className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center"><SkipForward className="w-4 h-4" /></button>
                                    <span className="text-gray-400 text-[10px] lg:text-xs">15:24 / {currentLesson.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center"><Volume2 className="w-4 h-4" /></button>
                                    <button className="text-white min-w-[44px] min-h-[44px] flex items-center justify-center"><Maximize2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'audio':
                return (
                    <div className="bg-linear-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 lg:p-12 text-center">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                            <Headphones className="w-12 h-12 lg:w-16 lg:h-16 text-purple-300" />
                        </div>
                        <h3 className="text-base lg:text-xl font-bold text-white mb-1">{currentLesson.title}</h3>
                        <p className="text-purple-300 text-xs mb-6">{currentLesson.duration}</p>
                        <div className="max-w-sm mx-auto">
                            <div className="w-full h-2 bg-white/10 rounded-full mb-4">
                                <div className="w-2/5 h-full bg-purple-400 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-purple-300">
                                <span className="text-xs">12:30</span>
                                <div className="flex items-center gap-3">
                                    <button className="min-w-[44px] min-h-[44px] flex items-center justify-center"><SkipBack className="w-5 h-5" /></button>
                                    <button className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center" onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
                                    </button>
                                    <button className="min-w-[44px] min-h-[44px] flex items-center justify-center"><SkipForward className="w-5 h-5" /></button>
                                </div>
                                <span className="text-xs">{currentLesson.duration}</span>
                            </div>
                        </div>
                    </div>
                );
            case 'pdf':
                return (
                    <div className="card-mobile p-4 lg:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">{currentLesson.title}</h3>
                                    <p className="text-xs text-gray-500">{currentLesson.duration}</p>
                                </div>
                            </div>
                            <button className="min-w-[44px] min-h-[44px] flex items-center justify-center text-orange-500"><Download className="w-5 h-5" /></button>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 min-h-[200px] flex items-center justify-center border border-gray-100">
                            <div className="text-center">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-400 text-xs">{t('PDF Viewer')}</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="card-mobile p-4 lg:p-8">
                        <h3 className="text-base lg:text-xl font-bold text-gray-900 mb-3">{currentLesson.title}</h3>
                        <div className="prose max-w-none text-gray-600 text-sm">
                            <p>This is a text-based lesson covering important concepts.</p>
                            <h4 className="text-gray-900 font-bold mt-4 text-sm">Key Points</h4>
                            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
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

    const renderChapterList = () => (
        <>
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">{activeProgram.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{allLessons.filter((l: any) => l.completed).length}/{allLessons.length} {t('Lessons').toLowerCase()}</p>
            </div>
            <div className="xl:max-h-[50vh] xl:overflow-y-auto">
                {chapterList.map((chapter) => (
                    <div key={chapter.chapterId} className="border-b border-gray-50 last:border-0">
                        <button
                            onClick={() => setExpandedChapter(expandedChapter === chapter.chapterId ? null : chapter.chapterId)}
                            className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-orange-50/30 transition-colors min-h-[48px]"
                        >
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${expandedChapter === chapter.chapterId ? 'rotate-180' : ''}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-900 truncate">{chapter.chapterName}</p>
                                <p className="text-[10px] text-gray-500">{chapter.allLessons.length} {t('lessons')}</p>
                            </div>
                        </button>

                        {expandedChapter === chapter.chapterId && (
                            <div className="bg-gray-50/50">
                                {chapter.allLessons.map((lesson: any) => {
                                    const globalIdx = allLessons.findIndex((l: any) => l.id === lesson.id);
                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => {
                                                setCurrentLessonIndex(globalIdx);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-t border-gray-100 min-h-[48px] ${globalIdx === currentLessonIndex ? 'bg-orange-50 border-l-2 border-l-orange-500 pl-3' : 'hover:bg-orange-50/50'}`}
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
                                                <p className="text-[10px] text-gray-400">{lesson.type} - {lesson.duration}</p>
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
            <div className="flex items-center gap-3">
                {programIdParam ? (
                    <Link href={`/student/programs/${programIdParam}`} className="text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                ) : (
                    <button onClick={() => setSelectedProgramId(null)} className="text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                )}
                <div className="min-w-0">
                    <h1 className="text-base lg:text-xl font-bold text-gray-900 truncate">{currentLesson?.title || t('Lesson Viewer')}</h1>
                    <p className="text-gray-500 text-[11px] truncate">{currentChapterForLesson?.chapterName}</p>
                </div>
            </div>

            {/* Main layout */}
            <div className="flex gap-6">
                <div className="flex-1 min-w-0 space-y-3">
                    {renderContent()}

                    {/* Lesson Controls */}
                    {currentLesson && (
                        <div className="card-mobile p-4">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {currentLesson.duration}</span>
                                <span className="capitalize px-2 py-0.5 rounded bg-gray-100 text-[10px]">{currentLesson.type}</span>
                                <span className="text-[10px] text-gray-400">{currentLessonIndex + 1}/{allLessons.length}</span>
                            </div>

                            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-2">
                                <button className="w-full sm:w-auto py-3 sm:py-2 gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> {t('Mark Complete')}
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentLessonIndex === 0}
                                        className="flex-1 sm:flex-initial min-w-[44px] min-h-[44px] flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition-colors gap-1"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> {t('Prev')}
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentLessonIndex === allLessons.length - 1}
                                        className="flex-1 sm:flex-initial min-w-[44px] min-h-[44px] flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition-colors gap-1"
                                    >
                                        {t('Next')} <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contents - inline below video for mobile & tablet */}
                    <div className="xl:hidden card-mobile overflow-hidden">
                        {renderChapterList()}
                    </div>
                </div>

                {/* Desktop Sidebar - right side for large screens */}
                <div className="w-80 shrink-0 hidden xl:block">
                    <div className="card-mobile overflow-hidden sticky top-20">
                        {renderChapterList()}
                    </div>
                </div>
            </div>
        </div>
    );
}
