'use client';

import Link from 'next/link';
import { programs, currentStudent, transcripts } from '@/lib/data';
import { BookOpen, ArrowRight, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';

export default function StudentPrograms() {
    // Get the student's transcripts
    const studentTranscripts = transcripts.filter(t => t.studentId === currentStudent.id);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Programs</h1>
                <p className="text-gray-500 text-sm mt-1">View your enrolled programs and progress</p>
            </div>

            {studentTranscripts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {studentTranscripts.map((transcript) => {
                        const program = programs.find(p => p.id === transcript.programId);
                        const allChapters = transcript.semesters.flatMap(sem => sem.courses);
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

                        const progress = currentStudent.progress[transcript.programId] || 0;

                        return (
                            <Link key={transcript.programId} href={`/student/programs/${transcript.programId}`}>
                                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover cursor-pointer group h-full">
                                    {/* Program Header */}
                                    <div className="relative p-6 bg-linear-to-br from-orange-50 to-amber-50/30 border-b border-orange-100/50">
                                        <div className="absolute top-4 right-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                                <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                                                <BookOpen className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{program?.title || 'Unknown Program'}</h3>
                                                <p className="text-xs text-gray-500 mt-1">{program?.duration} • {allChapters.length} chapters</p>
                                            </div>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between text-xs mb-1.5">
                                                <span className="text-gray-500">Progress</span>
                                                <span className="font-bold text-orange-600">{progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                                                <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="p-5">
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="text-center p-3 bg-orange-50/50 rounded-xl">
                                                <div className="flex items-center justify-center mb-1">
                                                    <TrendingUp className="w-4 h-4 text-orange-500" />
                                                </div>
                                                <div className="text-lg font-bold text-gray-900">{programAverage}</div>
                                                <div className="text-[10px] text-gray-500 mt-0.5">Average / 100</div>
                                            </div>
                                            <div className="text-center p-3 bg-green-50/50 rounded-xl">
                                                <div className="flex items-center justify-center mb-1">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                </div>
                                                <div className="text-lg font-bold text-gray-900">{completedChapters.length}</div>
                                                <div className="text-[10px] text-gray-500 mt-0.5">Completed</div>
                                            </div>
                                            <div className="text-center p-3 bg-blue-50/50 rounded-xl">
                                                <div className="flex items-center justify-center mb-1">
                                                    <BarChart3 className="w-4 h-4 text-blue-500" />
                                                </div>
                                                <div className="text-lg font-bold text-gray-900">{inProgressChapters.length}</div>
                                                <div className="text-[10px] text-gray-500 mt-0.5">In Progress</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${progress === 100 ? 'bg-green-50 text-green-600' : progress > 0 ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-500'}`}>
                                                {progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started'}
                                            </span>
                                            <span className="text-xs text-orange-500 font-medium group-hover:underline flex items-center gap-1">
                                                Continue Learning <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">No Programs</h3>
                    <p className="text-gray-500">You don&apos;t have any enrolled programs yet.</p>
                </div>
            )}
        </div>
    );
}
