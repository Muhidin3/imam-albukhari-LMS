'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { programs, currentStudent, transcripts, announcements, exams } from '@/lib/data';
import {
    BookOpen, ArrowLeft, Play, CheckCircle2, 
    Bell, FileText, Award, ArrowRight,
    Lock
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function StudentProgramDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<'chapters' | 'announcements' | 'tests'>('chapters');

    const program = programs.find(p => p.id === id);
    if (!program) {
        return (
            <div className="space-y-6 animate-fade-in-up">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
                    <ArrowLeft className="w-4 h-4" /> {t('Back')}
                </button>
                <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">{t('Program not found')}</h3>
                </div>
            </div>
        );
    }

    const transcript = transcripts.find(t => t.studentId === currentStudent.id && t.programId === id);
    const allChapters = transcript?.semesters.flatMap(sem => sem.courses) || [];
    const completedChapters = allChapters.filter(c => c.status === 'pass');
    const inProgressChapters = allChapters.filter(c => c.status === 'in-progress');

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
    const currentChapter = inProgressChapters[0];

    const programAnnouncements = announcements.filter(
        a => a.targetAudience === 'all' || a.targetAudience === 'students' ||
            (a.targetAudience === 'specific-program' && a.programId === id)
    ).slice(0, 5);

    const programCourseIds = program.courses.map(c => c.id);
    const programExams = exams.filter(e => programCourseIds.includes(e.courseId) && e.status === 'published');

    const tabs = [
        { id: 'chapters' as const, label: t('Chapters'), icon: BookOpen },
        { id: 'announcements' as const, label: t('Announcements'), icon: Bell },
        { id: 'tests' as const, label: t('Tests'), icon: FileText },
    ];

    return (
        <div className="space-y-4 animate-fade-in-up">
            {/* Compact Header */}
            <div className="continue-hero-gradient rounded-2xl p-4 lg:p-6 relative overflow-hidden  bg-orange-500 hover:brightness-105 transition-all">
                <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                <div className="relative ">
                    <button onClick={() => router.push('/student/programs')} className="text-white/70 hover:text-white mb-2 flex items-center gap-1 text-sm">
                        <ArrowLeft className="w-4 h-4" /> {t('Back')}
                    </button>

                    <h1 className="text-lg lg:text-2xl font-bold text-white">
                        {language === 'am' ? program.titleAm || program.title : program.title}
                    </h1>
                    <p className="text-orange-100 text-xs mt-1 line-clamp-2">{language === 'am' ? program.descriptionAm || program.description : program.description}</p>

                    {/* Stats pills */}
                    <div className="flex gap-2 mt-3 overflow-x-auto scroll-snap-x">
                        <div className="bg-white/15 rounded-lg px-3 py-2 shrink-0">
                            <p className="text-white/60 text-[10px]">{t('Avg')}</p>
                            <p className="text-white font-bold text-sm">{programAverage}</p>
                        </div>
                        <div className="bg-white/15 rounded-lg px-3 py-2 shrink-0">
                            <p className="text-white/60 text-[10px]">{t('Completed')}</p>
                            <p className="text-white font-bold text-sm">{completedChapters.length}/{allChapters.length}</p>
                        </div>
                        <div className="bg-white/15 rounded-lg px-3 py-2 shrink-0">
                            <p className="text-white/60 text-[10px]">{t('Progress')}</p>
                            <p className="text-white font-bold text-sm">{progress}%</p>
                        </div>
                    </div>

                    <div className="mt-3 h-1.5 bg-white/15 rounded-full overflow-hidden">
                        <div className="h-full bg-white/50 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Continue Learning CTA */}
            {currentChapter && (
                <Link href={`/student/lessons?programId=${id}`}>
                    <div className="card-mobile p-4 group">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors shrink-0">
                                <Play className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-orange-500 font-semibold uppercase">{t('Continue Learning')}</p>
                                <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">{currentChapter.title}</h3>
                            </div>
                            <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform shrink-0" />
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
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all min-h-[44px] ${activeTab === tab.id
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.label.substring(0, 4)}</span>
                    </button>
                ))}
            </div>

            {/* Tab: Chapters */}
            {activeTab === 'chapters' && (
                <div className="space-y-2">
                    {allChapters.length > 0 ? (
                        allChapters.map((chapter, idx) => (
                            <Link
                                key={chapter.code}
                                href={`/student/lessons?programId=${id}&chapterId=${chapter.code}`}
                            >
                                <div className={`card-mobile p-4 group mb-2 ${chapter.status === 'in-progress' ? 'border-l-4 border-l-orange-400' : ''}`}>
                                    <div className="flex items-center gap-3">
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

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-orange-600 transition-colors">{chapter.title}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">{chapter.code} - {chapter.credits} {t('credits')}</p>
                                        </div>

                                        <span className={`text-[10px] px-2 py-1 rounded-full font-medium shrink-0 ${chapter.status === 'pass'
                                            ? 'bg-green-50 text-green-600'
                                            : chapter.status === 'in-progress'
                                                ? 'bg-orange-50 text-orange-600'
                                                : 'bg-red-50 text-red-600'
                                            }`}>
                                            {chapter.status === 'in-progress' ? t('In Progress') : chapter.status === 'pass' ? t('Completed') : t('Failed')}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p>{t('No chapters available for this program yet.')}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Tab: Announcements */}
            {activeTab === 'announcements' && (
                <div className="space-y-2">
                    {programAnnouncements.length > 0 ? (
                        programAnnouncements.map((ann) => (
                            <div key={ann.id} className={`card-mobile p-4 border-l-4 ${ann.priority === 'high' ? 'border-l-red-400' : ann.priority === 'medium' ? 'border-l-orange-400' : 'border-l-gray-300'}`}>
                                <h4 className="font-semibold text-gray-900 text-sm">{ann.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                                <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                                    <span>{ann.author}</span>
                                    <span>{ann.date}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p>{t('No announcements for this program')}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Tab: Tests */}
            {activeTab === 'tests' && (
                <div className="space-y-2">
                    {allChapters.length > 0 ? (
                        allChapters.map((chapter, idx) => {
                            const status = chapter.status === 'pass' ? 'completed' : chapter.status === 'in-progress' ? 'available' : 'locked';

                            return (
                                <div
                                    key={chapter.code}
                                    className={`card-mobile p-4 ${status === 'locked' ? 'opacity-50' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
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
                                            <h4 className="font-semibold text-gray-900 text-sm truncate">Ch. {idx + 1}: {chapter.title}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {status === 'completed'
                                                    ? `${t('Score')}: ${chapter.score}/100`
                                                    : status === 'available'
                                                        ? t('Available')
                                                        : t('Locked')
                                                }
                                            </p>
                                        </div>
                                        <span className={`text-[10px] px-2 py-1 rounded-full font-medium shrink-0 ${status === 'completed' ? 'bg-green-50 text-green-600' : status === 'available' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
                                            {status === 'completed' ? t('Passed') : status === 'available' ? t('Available') : t('Locked')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p>{t('No tests available yet')}</p>
                        </div>
                    )}

                    {/* Final Exam */}
                    <div className="mt-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4 text-orange-500" />
                            {t('Final Exam')}
                        </h3>
                        <div className={`card-mobile p-4 ${progress < 100 ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress === 100 ? 'bg-orange-100' : 'bg-gray-100'}`}>
                                    {progress === 100 ? (
                                        <Award className="w-5 h-5 text-orange-500" />
                                    ) : (
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 text-sm truncate">{program.title} - {t('Final Exam')}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {progress === 100
                                            ? t('Ready to take!')
                                            : `${progress}% ${t('Completed').toLowerCase()}`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
