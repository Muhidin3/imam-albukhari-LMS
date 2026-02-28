'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
    BookOpen, Play, CheckCircle2, TrendingUp, ChevronRight,
    Flame, ArrowRight
} from 'lucide-react';
import { programs, announcements, examResults, studentStats, currentStudent } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function StudentDashboard() {
    const { t, language } = useLanguage();
    const enrolledPrograms = programs.filter(p => currentStudent.enrolledPrograms.includes(p.id));

    // Find the current program & lesson for "Continue Learning"
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const continueData = useMemo(() => {
        // Find first in-progress program
        const activeProgram = enrolledPrograms.find(p => {
            const progress = currentStudent.progress[p.id] || 0;
            return progress > 0 && progress < 100;
        }) || enrolledPrograms[0];

        if (!activeProgram) return null;

        // Find first incomplete lesson
        let nextLesson = null;
        let nextChapter = null;
        for (const course of activeProgram.courses) {
            for (const mod of course.modules) {
                for (const lesson of mod.lessons) {
                    if (!lesson.completed) {
                        nextLesson = lesson;
                        nextChapter = course;
                        break;
                    }
                }
                if (nextLesson) break;
            }
            if (nextLesson) break;
        }

        const progress = currentStudent.progress[activeProgram.id] || 0;
        const totalLessons = activeProgram.courses.reduce((acc, c) => acc + c.totalLessons, 0);
        const completedLessons = activeProgram.courses.reduce((acc, c) => acc + (c.completedLessons || 0), 0);

        return {
            program: activeProgram,
            chapter: nextChapter,
            lesson: nextLesson,
            progress,
            totalLessons,
            completedLessons,
        };
    }, [enrolledPrograms]);

    const recentAnnouncements = announcements
        .filter(a => a.targetAudience === 'all' || a.targetAudience === 'students')
        .slice(0, 3);

    const stats = [
        { label: t('Programs'), value: studentStats.enrolledPrograms, icon: BookOpen, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: t('Completed'), value: `${studentStats.completedLessons}/${studentStats.totalLessons}`, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
        { label: t('Streak'), value: `${studentStats.currentStreak}d`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: t('Score'), value: `${studentStats.overallProgress}%`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-5 animate-fade-in-up">
            {/* Greeting */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {t('Welcome back')}, {currentStudent.name.split(' ')[0]}!
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">{t('Continue your learning journey')}</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-lg shrink-0">
                    {currentStudent.avatar}
                </div>
            </div>

            {/* Continue Learning Hero */}
            {continueData && (
                <Link href={`/student/lessons?programId=${continueData.program.id}`}>
                    <div className="continue-hero-gradient rounded-2xl p-5 relative overflow-hidden bg-orange-500 hover:brightness-105 transition-all cursor-pointer">
                        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative">
                            <p className="text-orange-100 text-xs font-semibold uppercase tracking-wider">{t('Continue Learning')}</p>
                            <h2 className="text-white text-lg font-bold mt-1.5">
                                {language === 'am' ? continueData.program.titleAm || continueData.program.title : continueData.program.title}
                            </h2>
                            {continueData.lesson && (
                                <p className="text-orange-100 text-sm mt-1">
                                    {continueData.lesson.title}
                                </p>
                            )}

                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-orange-100 mb-1.5">
                                    <span>{continueData.progress}% {t('Completed').toLowerCase()}</span>
                                    <span>{continueData.completedLessons}/{continueData.totalLessons} {t('Lessons').toLowerCase()}</span>
                                </div>
                                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/80 rounded-full transition-all duration-500" style={{ width: `${continueData.progress}%` }} />
                                </div>
                            </div>

                            <div className="w-full mt-4 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl text-base transition-colors flex items-center justify-center gap-2">
                                <Play className="w-5 h-5" fill="currentColor" /> {t('Continue Lesson')}
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* Stats Row - horizontal scroll */}
            {/* <div className="flex gap-3 overflow-x-scroll-mx-4 px-4 py-1 scroll-snap-x">
                {stats.map((stat) => (
                    <div key={stat.label} className="card-mobile px-4 py-3 flex items-center gap-3 shrink-0 min-w-[140px]">
                        <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                            <div className="text-[10px] text-gray-500">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div> */}

            {/* My Programs - horizontal carousel */}
            <div className='mt-8'>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-gray-900">{t('Programs')}</h2>
                    <Link href="/student/programs" className="text-sm text-orange-500 font-medium flex items-center gap-1">
                        {t('See All')} <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="flex flex-col gap-3 scroll-snap-x -mx-4 px-4">
                    {enrolledPrograms.map((program) => {
                        const progress = currentStudent.progress[program.id] || 0;
                        const totalLessons = program.courses.reduce((acc, c) => acc + c.totalLessons, 0);
                        const completedLessons = program.courses.reduce((acc, c) => acc + (c.completedLessons || 0), 0);

                        return (
                            <Link key={program.id} href={`/student/programs/${program.id}`} className="swipe-card">
                                <div className="card-mobile p-4 h-full">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                                            <BookOpen className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-gray-900 text-sm truncate">
                                                {language === 'am' ? program.titleAm || program.title : program.title}
                                            </h3>
                                            <p className="text-xs text-gray-500">{completedLessons}/{totalLessons} {t('Lessons').toLowerCase()}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-gray-400">{t('Progress')}</span>
                                        <span className="font-bold text-orange-500">{progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Announcements */}
            {recentAnnouncements.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-bold text-gray-900">{t('Announcements')}</h2>
                        <Link href="/student/announcements" className="text-sm text-orange-500 font-medium flex items-center gap-1">
                            {t('See All')} <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {recentAnnouncements.map((ann) => (
                            <Link key={ann.id} href="/student/announcements">
                                <div className="card-mobile p-3.5 flex items-center gap-3 mb-2">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${ann.priority === 'high' ? 'bg-red-500' : ann.priority === 'medium' ? 'bg-orange-500' : 'bg-gray-400'
                                        }`}></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{ann.title}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{ann.date}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Scores */}
            {examResults.length > 0 && (
                <div>
                    <h2 className="text-base font-bold text-gray-900 mb-3">{t('Recent Scores')}</h2>
                    <div className="space-y-2">
                        {examResults.slice(0, 2).map((result) => (
                            <div key={result.examId} className="card-mobile p-3.5 flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate">{result.examTitle}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{result.completedAt}</p>
                                </div>
                                <div className={`text-lg font-bold ml-3 ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                                    {result.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
);
}
