'use client';

import { certificates, examResults } from '@/lib/data';
import { Award, Download, Calendar, Star, BookOpen, FileText } from 'lucide-react';

export default function StudentCertificates() {
    // For demo, show some mock data -- current student hasn't earned certificates yet
    const studentCerts = certificates.slice(0, 1); // show one as example

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
                <p className="text-gray-500 text-sm mt-1">View and download your earned certificates</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                    <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{studentCerts.length}</div>
                    <div className="text-xs text-gray-500">Earned</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                    <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">2</div>
                    <div className="text-xs text-gray-500">In Progress</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                    <FileText className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{examResults.filter(r => r.passed).length}</div>
                    <div className="text-xs text-gray-500">Exams Passed</div>
                </div>
            </div>

            {/* Earned Certificates */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Earned Certificates</h2>
                {studentCerts.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {studentCerts.map((cert) => (
                            <div key={cert.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover">
                                {/* Certificate Preview */}
                                <div className="relative p-8 bg-linear-to-br from-amber-50 to-orange-50 border-b border-orange-100">
                                    <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                                    <div className="relative text-center">
                                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                                            <Award className="w-8 h-8 text-orange-500" />
                                        </div>
                                        <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-2">Certificate of Completion</p>
                                        <h3 className="text-lg font-bold text-gray-900">{cert.programTitle}</h3>
                                        <div className="flex items-center justify-center gap-1 mt-3">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" /> {cert.issueDate}
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold badge-success">Grade: {cert.grade}</span>
                                    </div>
                                    <button className="w-full py-2.5 gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" /> Download PDF
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                        <Award className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-400 mb-2">No certificates yet</h3>
                        <p className="text-gray-400 text-sm">Complete programs and pass exams to earn certificates</p>
                    </div>
                )}
            </div>

            {/* How to earn */}
            <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">How to Earn a Certificate</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        { step: '1', title: 'Complete Chapters', desc: 'Finish all chapters in the program' },
                        { step: '2', title: 'Pass the Exam', desc: 'Score above the passing threshold' },
                        { step: '3', title: 'Download', desc: 'Your certificate will be auto-generated' },
                    ].map(s => (
                        <div key={s.step} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center text-sm font-bold shrink-0">{s.step}</div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">{s.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
