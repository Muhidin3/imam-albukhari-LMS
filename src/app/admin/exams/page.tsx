'use client';

import { useState } from 'react';
import { exams, programs } from '@/lib/data';
import { FileText, Plus, Edit, Trash2, Eye, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

export default function AdminExams() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleExamClick = (id: string) => {
        router.push(`/admin/exams/${id}`);
    };

    const handleCreate = () => {
        // In a real app, this would create ID and redirect.
        // For now, we'll just redirect to a mock ID or handle it.
        // Let's just close modal and console log for prototype.
        setShowModal(false);
        // router.push('/admin/exams/new-id'); 
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Exam Builder</h1>
                    <p className="text-gray-500 text-sm mt-1">Create and manage tests for chapters and exams for programs</p>
                </div>
                <button onClick={() => setShowModal(true)} className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-orange-500/20">
                    <Plus className="w-4 h-4" /> Create Exam
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><FileText className="w-5 h-5 text-blue-500" /></div>
                    <div><div className="text-xl font-bold text-gray-900">{exams.length}</div><div className="text-xs text-gray-500">Total Exams</div></div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                    <div><div className="text-xl font-bold text-gray-900">{exams.filter(e => e.status === 'published').length}</div><div className="text-xs text-gray-500">Published</div></div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center"><AlertCircle className="w-5 h-5 text-orange-500" /></div>
                    <div><div className="text-xl font-bold text-gray-900">{exams.filter(e => e.status === 'draft').length}</div><div className="text-xs text-gray-500">Drafts</div></div>
                </div>
            </div>

            {/* Exams List */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 bg-gray-50/80">
                                <th className="px-6 py-4 font-medium">Exam</th>
                                <th className="px-6 py-4 font-medium">Chapter</th>
                                <th className="px-6 py-4 font-medium">Questions</th>
                                <th className="px-6 py-4 font-medium">Duration</th>
                                <th className="px-6 py-4 font-medium">Pass Score</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {exams.map((exam) => {
                                const course = programs.flatMap(p => p.courses).find(c => c.id === exam.courseId);
                                return (
                                    <tr
                                        key={exam.id}
                                        onClick={() => handleExamClick(exam.id)}
                                        className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><FileText className="w-5 h-5 text-blue-500" /></div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{exam.title}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{exam.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-xs">{course?.title || '—'}</td>
                                        <td className="px-6 py-4 text-gray-600">{exam.totalQuestions}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-400" /> {exam.duration} min</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{exam.passingScore}%</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${exam.status === 'published' ? 'badge-success' :
                                                exam.status === 'draft' ? 'badge-warning' : 'badge-info'
                                                }`}>{exam.status}</span>
                                        </td>
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleExamClick(exam.id)}
                                                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-orange-500"><Edit className="w-4 h-4" /></button>
                                                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Exam Modal (Simplified) */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Exam">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Exam Title</label>
                        <input type="text" placeholder="e.g., Midterm Exam" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Chapter</label>
                        <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                            {programs.flatMap(p => p.courses).map(c => <option key={c.id}>{c.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                        <textarea rows={2} placeholder="Brief description..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none text-gray-700"></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                        <button onClick={handleCreate} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Create & Build</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
