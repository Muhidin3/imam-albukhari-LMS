'use client';

import { certificates, examResults } from '@/lib/data';
import { Award, Download, Calendar, Star, BookOpen, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function StudentCertificates() {
    const { t } = useLanguage();
    const studentCerts = certificates.slice(0, 1);

    return (
        <div className="space-y-5 animate-fade-in-up">
            <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{t('Certificates')}</h1>
                <p className="text-gray-500 text-sm mt-0.5">{t('View and download your earned certificates')}</p>
            </div>

            {/* Stats - horizontal scroll */}
            <div className="flex gap-3 overflow-x-auto scroll-snap-x -mx-4 px-4 py-1">
                <div className="card-mobile px-4 py-3 flex items-center gap-3 shrink-0 min-w-[130px]">
                    <Award className="w-6 h-6 text-orange-500 shrink-0" />
                    <div>
                        <div className="text-xl font-bold text-gray-900">{studentCerts.length}</div>
                        <div className="text-[10px] text-gray-500">{t('Earned')}</div>
                    </div>
                </div>
                <div className="card-mobile px-4 py-3 flex items-center gap-3 shrink-0 min-w-[130px]">
                    <BookOpen className="w-6 h-6 text-orange-500 shrink-0" />
                    <div>
                        <div className="text-xl font-bold text-gray-900">2</div>
                        <div className="text-[10px] text-gray-500">{t('In Progress')}</div>
                    </div>
                </div>
                <div className="card-mobile px-4 py-3 flex items-center gap-3 shrink-0 min-w-[130px]">
                    <FileText className="w-6 h-6 text-green-500 shrink-0" />
                    <div>
                        <div className="text-xl font-bold text-gray-900">{examResults.filter(r => r.passed).length}</div>
                        <div className="text-[10px] text-gray-500">{t('Exams Passed')}</div>
                    </div>
                </div>
            </div>

            {/* Earned Certificates */}
            <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">{t('Earned Certificates')}</h2>
                {studentCerts.length > 0 ? (
                    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                        {studentCerts.map((cert) => (
                            <div key={cert.id} className="card-mobile overflow-hidden">
                                {/* Certificate Preview */}
                                <div className="relative p-5 bg-linear-to-br from-amber-50 to-orange-50 border-b border-orange-100">
                                    <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                                    <div className="relative text-center">
                                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                                            <Award className="w-6 h-6 text-orange-500" />
                                        </div>
                                        <p className="text-[10px] text-orange-500 font-semibold uppercase tracking-widest mb-1">{t('Certificate of Completion')}</p>
                                        <h3 className="text-base font-bold text-gray-900">{cert.programTitle}</h3>
                                        <div className="flex items-center justify-center gap-0.5 mt-2">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar className="w-3.5 h-3.5" /> {cert.issueDate}
                                        </div>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-success">{t('Grade')}: {cert.grade}</span>
                                    </div>
                                    <button className="w-full py-2.5 gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" /> {t('Download PDF')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card-mobile p-10 text-center">
                        <Award className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                        <h3 className="text-base font-semibold text-gray-400 mb-1">{t('No certificates yet')}</h3>
                        <p className="text-gray-400 text-sm">{t('Complete programs and pass exams to earn certificates')}</p>
                    </div>
                )}
            </div>

            {/* How to earn */}
            <div className="bg-orange-50 rounded-2xl border border-orange-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">{t('How to Earn a Certificate')}</h3>
                <div className="space-y-3 sm:grid sm:grid-cols-3 sm:gap-3 sm:space-y-0">
                    {[
                        { step: '1', title: t('Complete Chapters'), desc: t('Finish all chapters in the program') },
                        { step: '2', title: t('Pass the Exam'), desc: t('Score above the passing threshold') },
                        { step: '3', title: t('Download'), desc: t('Your certificate will be auto-generated') },
                    ].map(s => (
                        <div key={s.step} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full gradient-primary text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">{s.title}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
