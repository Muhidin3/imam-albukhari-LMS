'use client';

import { useState } from 'react';
import { exams, examResults } from '@/lib/data';
import { FileText, Clock, CheckCircle2, XCircle, Award, ArrowRight, ChevronLeft, AlertCircle } from 'lucide-react';

export default function StudentExams() {
    const [activeExam, setActiveExam] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const exam = exams.find(e => e.id === activeExam);
    const availableExams = exams.filter(e => e.status === 'published');
    const completedExamIds = examResults.map(r => r.examId);

    const handleSubmit = () => {
        if (!exam) return;
        let correct = 0;
        exam.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) correct++;
        });
        setScore(Math.round((correct / exam.questions.length) * 100));
        setSubmitted(true);
    };

    if (activeExam && exam) {
        if (submitted) {
            return (
                <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                        <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${score >= exam.passingScore ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                            {score >= exam.passingScore ? (
                                <Award className="w-12 h-12 text-green-500" />
                            ) : (
                                <XCircle className="w-12 h-12 text-red-500" />
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {score >= exam.passingScore ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}
                        </h2>
                        <p className="text-gray-500 mb-6">
                            {score >= exam.passingScore
                                ? 'You have successfully passed the exam.'
                                : `You need ${exam.passingScore}% to pass. Review the material and try again.`}
                        </p>
                        <div className="text-5xl font-bold mb-2" style={{ color: score >= exam.passingScore ? '#27AE60' : '#E74C3C' }}>
                            {score}%
                        </div>
                        <p className="text-gray-400 text-sm mb-8">
                            Passing Score: {exam.passingScore}%
                        </p>

                        {/* Review answers */}
                        <div className="text-left space-y-4 mb-8">
                            {exam.questions.map((q, i) => (
                                <div key={q.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-900 mb-3">{i + 1}. {q.text}</p>
                                    <div className="space-y-2">
                                        {q.options.map((opt, idx) => (
                                            <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${idx === q.correctAnswer ? 'bg-green-50 text-green-700 border border-green-200' :
                                                    idx === answers[q.id] && idx !== q.correctAnswer ? 'bg-red-50 text-red-700 border border-red-200' :
                                                        'text-gray-600'
                                                }`}>
                                                {idx === q.correctAnswer ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> :
                                                    idx === answers[q.id] ? <XCircle className="w-4 h-4 text-red-500 shrink-0" /> :
                                                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0"></div>}
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => { setActiveExam(null); setSubmitted(false); setAnswers({}); }} className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                            Back to Exams
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
                <button onClick={() => setActiveExam(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back to Exams
                </button>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
                            <p className="text-sm text-gray-500 mt-1">{exam.description}</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl text-orange-600 text-sm font-medium">
                            <Clock className="w-4 h-4" /> {exam.duration} min
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
                        <span>{exam.totalQuestions} questions</span>
                        <span>Passing: {exam.passingScore}%</span>
                    </div>

                    <div className="space-y-6">
                        {exam.questions.map((q, i) => (
                            <div key={q.id} className="p-5 rounded-xl border border-gray-100 hover:border-orange-100 transition-colors">
                                <p className="text-sm font-semibold text-gray-900 mb-4">
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-orange-50 text-orange-500 text-xs font-bold mr-2">{i + 1}</span>
                                    {q.text}
                                </p>
                                <div className="space-y-2 ml-9">
                                    {q.options.map((opt, idx) => (
                                        <label key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all text-sm ${answers[q.id] === idx ? 'bg-orange-50 border-2 border-orange-300 text-orange-700' : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 text-gray-700'
                                            }`}>
                                            <input
                                                type="radio"
                                                name={q.id}
                                                checked={answers[q.id] === idx}
                                                onChange={() => setAnswers({ ...answers, [q.id]: idx })}
                                                className="w-4 h-4 text-orange-500 focus:ring-orange-300"
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            {Object.keys(answers).length}/{exam.totalQuestions} answered
                        </p>
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(answers).length < exam.totalQuestions}
                            className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            Submit Exam <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Exams</h1>
                <p className="text-gray-500 text-sm mt-1">Take exams and view your results</p>
            </div>

            {/* Completed Exams */}
            {examResults.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" /> Completed Exams
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {examResults.map((result) => (
                            <div key={result.examId} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${result.passed ? 'bg-green-50' : 'bg-red-50'
                                    }`}>
                                    <span className={`text-xl font-bold ${result.passed ? 'text-green-500' : 'text-red-500'}`}>{result.percentage}%</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-sm">{result.examTitle}</h3>
                                    <p className="text-xs text-gray-500 mt-1">Completed: {result.completedAt}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${result.passed ? 'badge-success' : 'badge-danger'}`}>
                                    {result.passed ? 'Passed' : 'Failed'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Available Exams */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" /> Available Exams
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {availableExams.map((exam) => {
                        const isCompleted = completedExamIds.includes(exam.id);
                        return (
                            <div key={exam.id} className="bg-white rounded-2xl border border-gray-100 p-6 card-hover">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Clock className="w-3.5 h-3.5" /> {exam.duration} min
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{exam.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{exam.description}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                                    <span>{exam.totalQuestions} questions</span>
                                    <span>•</span>
                                    <span>Pass: {exam.passingScore}%</span>
                                </div>
                                <button
                                    onClick={() => { setActiveExam(exam.id); setAnswers({}); setSubmitted(false); }}
                                    className="w-full py-2.5 gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                >
                                    {isCompleted ? 'Retake Exam' : 'Start Exam'} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
