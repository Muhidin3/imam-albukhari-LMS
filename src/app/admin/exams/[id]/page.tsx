'use client';

import { useParams, useRouter } from 'next/navigation';
import { exams, programs, Question } from '@/lib/data';
import { ChevronLeft, Save, FileText, Clock, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ExamDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const exam = exams.find(e => e.id === id);
    const course = programs.flatMap(p => p.courses).find(c => c.id === exam?.courseId);

    const [questions, setQuestions] = useState<Question[]>(exam?.questions || []);

    if (!exam) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900">Exam not found</h2>
                <button onClick={() => router.back()} className="mt-4 text-orange-500 hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in-up pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
                    <p className="text-orange-500 text-sm">{course?.title || 'Unassigned Chapter'}</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all text-gray-600">
                        Preview
                    </button>
                    <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Exam
                    </button>
                </div>
            </div>

            {/* Config & Questions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Config (Sidebar) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Configuration</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                                <textarea
                                    defaultValue={exam.description}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Duration (min)</label>
                                <input
                                    type="number"
                                    defaultValue={exam.duration}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pass Score (%)</label>
                                <input
                                    type="number"
                                    defaultValue={exam.passingScore}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                                <select defaultValue={exam.status} className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions Builder */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Questions ({questions.length})</h2>
                        <button
                            onClick={() => setQuestions([...questions, { id: `q-${Date.now()}`, text: '', options: ['', '', '', ''], correctAnswer: 0, points: 10 }])}
                            className="text-sm text-orange-500 font-medium hover:underline flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" /> Add Question
                        </button>
                    </div>

                    <div className="space-y-4">
                        {questions.map((q, idx) => (
                            <div key={q.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group">
                                <button
                                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    onClick={() => setQuestions(questions.filter(qi => qi.id !== q.id))}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <span className="absolute top-6 left-6 text-xs font-bold text-gray-300">Q{idx + 1}</span>

                                <div className="pl-8">
                                    <input
                                        type="text"
                                        value={q.text}
                                        onChange={(e) => {
                                            const newQuestions = [...questions];
                                            newQuestions[idx].text = e.target.value;
                                            setQuestions(newQuestions);
                                        }}
                                        placeholder="Enter question text..."
                                        className="w-full p-2 border-b border-gray-100 font-medium text-gray-900 focus:outline-none focus:border-orange-300 mb-4"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {q.options.map((opt, optIdx) => (
                                            <div key={optIdx} className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name={`q-${q.id}`}
                                                    checked={q.correctAnswer === optIdx}
                                                    onChange={() => {
                                                        const newQuestions = [...questions];
                                                        newQuestions[idx].correctAnswer = optIdx;
                                                        setQuestions(newQuestions);
                                                    }}
                                                    className="w-4 h-4 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) => {
                                                        const newQuestions = [...questions];
                                                        newQuestions[idx].options[optIdx] = e.target.value;
                                                        setQuestions(newQuestions);
                                                    }}
                                                    placeholder={`Option ${optIdx + 1}`}
                                                    className={`flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-300 ${q.correctAnswer === optIdx ? 'border-orange-300 bg-orange-50/50' : 'border-gray-100'
                                                        }`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {questions.length === 0 && (
                        <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center border-dashed">
                            <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">No questions added yet. Start by adding one.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
