'use client';

import { useState, useSearchParams } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
    Users, Search, Filter, GraduationCap,
    FileText, CheckCircle, AlertCircle,
    ChevronRight, Save, Download, Send, FileIcon, Clock
} from 'lucide-react';
import { classes, teachers, students, exams } from '@/lib/data';

interface StudentSubmission {
    studentId: string;
    studentName: string;
    submittedDate: string;
    fileName: string;
    status: 'graded' | 'pending';
    score?: number;
    feedback?: string;
}

interface Assignment {
    id: string;
    title: string;
    dueDate: string;
    submissions: StudentSubmission[];
}

export default function StudentGrading() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const initialClassId = searchParams.get('classId');
    
    const [selectedClass, setSelectedClass] = useState(initialClassId || classes[0]?.id);
    const [selectedAssignment, setSelectedAssignment] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [gradingData, setGradingData] = useState<Record<string, { score: number; feedback: string }>>({});
    const [view, setView] = useState<'assignments' | 'grading'>('assignments');
    
    const teacher = teachers[0]; // Assumption
    const myClasses = classes.filter(c => c.teacherId === teacher.id);
    const activeClass = myClasses.find(c => c.id === selectedClass) || myClasses[0];
    const classStudents = students.filter(s => activeClass?.studentIds.includes(s.id));

    // Mock assignments for the selected class
    const assignments: Assignment[] = [
        {
            id: 'assign-1',
            title: 'Assignment 1: Introduction to Islamic Studies',
            dueDate: '2024-02-01',
            submissions: classStudents.map(student => ({
                studentId: student.id,
                studentName: student.name,
                submittedDate: '2024-01-31',
                fileName: `assignment-${student.id}.pdf`,
                status: 'pending' as const,
            })),
        },
        {
            id: 'assign-2',
            title: 'Assignment 2: Historical Analysis',
            dueDate: '2024-02-15',
            submissions: classStudents.map((student, idx) => ({
                studentId: student.id,
                studentName: student.name,
                submittedDate: '2024-02-14',
                fileName: `assignment-${student.id}.pdf`,
                status: idx % 2 === 0 ? 'graded' as const : 'pending' as const,
                score: idx % 2 === 0 ? 85 + idx * 3 : undefined,
                feedback: idx % 2 === 0 ? 'Good analysis and clear writing.' : undefined,
            })),
        },
    ];

    const currentAssignment = assignments.find(a => a.id === selectedAssignment);
    const filteredSubmissions = currentAssignment?.submissions.filter(sub =>
        sub.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleScoreChange = (submissionId: string, score: number) => {
        setGradingData(prev => ({
            ...prev,
            [submissionId]: {
                ...prev[submissionId],
                score,
            },
        }));
    };

    const handleFeedbackChange = (submissionId: string, feedback: string) => {
        setGradingData(prev => ({
            ...prev,
            [submissionId]: {
                ...prev[submissionId],
                feedback,
            },
        }));
    };

    const handleSubmitGrade = (submissionId: string) => {
        alert(`Grade submitted for ${submissionId}`);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{t('Grade Assignments')}</h1>
                    <p className="text-gray-600 mt-1">{t('Review and grade student submissions')}</p>
                </div>
            </div>

            {/* Selection Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t('Select Class')}</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedAssignment('');
                            setView('assignments');
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        {myClasses.map(c => (
                            <option key={c.id} value={c.id}>{c.name} - {c.programTitle}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t('Select Assignment')}</label>
                    <select
                        value={selectedAssignment}
                        onChange={(e) => {
                            setSelectedAssignment(e.target.value);
                            if (e.target.value) setView('grading');
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        <option value="">{t('Select an assignment...')}</option>
                        {assignments.map(assign => (
                            <option key={assign.id} value={assign.id}>
                                {assign.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Assignments Overview */}
            {view === 'assignments' && (
                <div className="space-y-4">
                    <h2 className="font-bold text-gray-900">{t('Class Assignments')} - {activeClass?.name}</h2>
                    <div className="grid gap-4">
                        {assignments.map(assignment => {
                            const pendingCount = assignment.submissions.filter(s => s.status === 'pending').length;
                            const completedCount = assignment.submissions.filter(s => s.status === 'graded').length;
                            
                            return (
                                <div 
                                    key={assignment.id}
                                    onClick={() => {
                                        setSelectedAssignment(assignment.id);
                                        setView('grading');
                                    }}
                                    className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                Due: {assignment.dueDate}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                                            <p className="text-xs text-gray-600">pending</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-4 text-sm">
                                        <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">✓ {completedCount} graded</span>
                                        <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">⏱ {pendingCount} pending</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Grading Interface */}
            {view === 'grading' && currentAssignment && (
                <div className="space-y-6">
                    {/* Assignment Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <button
                                onClick={() => {
                                    setSelectedAssignment('');
                                    setView('assignments');
                                }}
                                className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1"
                            >
                                ← {t('Back to Assignments')}
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{currentAssignment.title}</h2>
                        <p className="text-gray-600 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Due: {currentAssignment.dueDate}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('Search students...')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Submissions */}
                    <div className="space-y-4">
                        {filteredSubmissions.length > 0 ? (
                            filteredSubmissions.map((submission) => (
                                <div key={submission.studentId} className="bg-white rounded-2xl border border-gray-100 p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{submission.studentName}</h3>
                                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <FileIcon className="w-4 h-4" />
                                                    {submission.fileName}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {submission.submittedDate}
                                                </span>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                                            submission.status === 'graded'
                                                ? 'bg-green-50 text-green-600 flex items-center gap-1'
                                                : 'bg-yellow-50 text-yellow-600 flex items-center gap-1'
                                        }`}>
                                            {submission.status === 'graded' ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3" />
                                                    Graded
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle className="w-3 h-3" />
                                                    Pending
                                                </>
                                            )}
                                        </span>
                                    </div>

                                    {/* Grading Form */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                        {/* Score */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('Score')}</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={gradingData[submission.studentId]?.score || submission.score || ''}
                                                onChange={(e) => handleScoreChange(submission.studentId, parseInt(e.target.value) || 0)}
                                                placeholder="0-100"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Feedback */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-600 mb-2">{t('Feedback')}</label>
                                            <textarea
                                                value={gradingData[submission.studentId]?.feedback || submission.feedback || ''}
                                                onChange={(e) => handleFeedbackChange(submission.studentId, e.target.value)}
                                                placeholder="Add feedback for the student..."
                                                rows={1}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => handleSubmitGrade(submission.studentId)}
                                            className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2"
                                        >
                                            <Send className="w-4 h-4" />
                                            {t('Submit Grade')}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">{t('No submissions found')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
