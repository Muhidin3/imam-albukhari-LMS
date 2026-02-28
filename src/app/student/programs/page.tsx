'use client';

import Link from 'next/link';
import { programs, currentStudent, transcripts } from '@/lib/data';
import { BookOpen, ChevronRight, CheckCircle2, TrendingUp, BarChart3, Clock, Users, Compass } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function StudentPrograms() {
    const { t, language } = useLanguage();
    const studentTranscripts = transcripts.filter(t => t.studentId === currentStudent.id);
    const enrolledIds = currentStudent.enrolledPrograms;
    const explorePrograms = programs.filter(p => !enrolledIds.includes(p.id));

    return (
        <div className="space-y-5 animate-fade-in-up">
            <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{t('Programs')}</h1>
                <p className="text-gray-500 text-sm mt-0.5">{t('View your enrolled programs and progress')}</p>
            </div>

            {studentTranscripts.length > 0 ? (
                <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                    {studentTranscripts.map((transcript) => {
                        const program = programs.find(p => p.id === transcript.programId);
                        const allChapters = transcript.semesters.flatMap(sem => sem.courses);
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
                        const progress = currentStudent.progress[transcript.programId] || 0;

                        return (
                            <Link key={transcript.programId} href={`/student/programs/${transcript.programId}`}>
                                <div className="card-mobile p-4 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-orange-600 transition-colors">
                                                {language === 'am' ? program?.titleAm || program?.title : program?.title || 'Unknown Program'}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">{program?.duration} - {allChapters.length} {t('Chapters').toLowerCase()}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 shrink-0 group-hover:text-orange-400 transition-colors" />
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-400">{t('Progress')}</span>
                                            <span className="font-bold text-orange-500">{progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>

                                    {/* Compact stats */}
                                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3 text-orange-400" /> {t('Avg')}: {programAverage}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3 text-green-500" /> {completedChapters.length} {t('Completed').toLowerCase()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BarChart3 className="w-3 h-3 text-orange-400" /> {inProgressChapters.length} {t('active')}
                                        </span>
                                    </div>

                                    {/* Status badge */}
                                    <div className="mt-3">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${progress === 100 ? 'bg-green-50 text-green-600' : progress > 0 ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-500'}`}>
                                            {progress === 100 ? t('Completed') : progress > 0 ? t('In Progress') : t('Not Started')}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">{t('No Programs')}</h3>
                    <p className="text-gray-500 text-sm">{t('No enrolled programs yet')}</p>
                </div>
            )}

            {/* Explore Programs */}
            {explorePrograms.length > 0 && (
                <div className="pt-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Compass className="w-5 h-5 text-orange-500" />
                        <h2 className="text-lg font-bold text-gray-900">{t('Explore Programs')}</h2>
                    </div>
                    <p className="text-gray-400 text-xs mb-4">{t('Discover new programs to expand your knowledge')}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {explorePrograms.map((program) => (
                            <div key={program.id} className="card-mobile overflow-hidden group">
                                <div className="h-20 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
                                    <div className="absolute inset-0 islamic-pattern opacity-20"></div>
                                    <div className="absolute bottom-2 left-2">
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                            program.status === 'active' ? 'bg-white/90 text-green-600' :
                                            program.status === 'upcoming' ? 'bg-white/90 text-orange-600' :
                                            'bg-white/90 text-gray-600'
                                        }`}>
                                            {program.status === 'active' ? t('Active') : program.status === 'upcoming' ? t('Upcoming') : t('Completed')}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="text-[10px] text-orange-500 font-semibold uppercase tracking-wider mb-0.5">{program.level}</div>
                                    <h3 className="text-xs font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors">
                                        {language === 'am' ? program.titleAm || program.title : program.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                                        <span className="flex items-center gap-0.5">
                                            <Clock className="w-2.5 h-2.5" /> {program.duration}
                                        </span>
                                        <span className="flex items-center gap-0.5">
                                            <Users className="w-2.5 h-2.5" /> {program.enrolledStudents}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
