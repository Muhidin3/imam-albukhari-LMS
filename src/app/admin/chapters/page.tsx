'use client';

import { useState } from 'react';
import { programs } from '@/lib/data';
import { Layers, Plus, ChevronDown, ChevronRight, Edit, Trash2, Play, Headphones, FileText, BookOpen, Video, Upload } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function AdminCourses() {
    const [expandedCourse, setExpandedCourse] = useState<string | null>('course-1');
    const [showBuilder, setShowBuilder] = useState(false);

    // Controlled form state for the "Create New Course" modal
    const [form, setForm] = useState({
        programId: programs[0]?.id ?? '',
        title: '',
        description: '',
        instructor: '',
        duration: ''
    });

    const openBuilder = () => {
        setForm({ programId: programs[0]?.id ?? '', title: '', description: '', instructor: '', duration: '' });
        setShowBuilder(true);
    };

    const closeBuilder = () => {
        setShowBuilder(false);
        setForm({ programId: programs[0]?.id ?? '', title: '', description: '', instructor: '', duration: '' });
    };

    const allCourses = programs.flatMap(p => p.courses.map(c => ({ ...c, programTitle: p.title })));

    return (
        <>
            <div className="space-y-8 animate-fade-in-up">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Chapter & Lesson Builder</h1>
                        <p className="text-gray-500 text-sm mt-1">Create and organize chapters and lessons</p>
                    </div>
                    <button onClick={openBuilder} className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-orange-500/20">
                        <Plus className="w-4 h-4" /> New Chapter
                    </button>
                </div>

                {/* Course List */}
                <div className="space-y-4">
                    {allCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            {/* Course Header */}
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedCourse(expandedCourse === course.id ? null : course.id); } }}
                                className="w-full flex items-center gap-4 p-5 hover:bg-gray-50/50 transition-colors text-left cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                    <Layers className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                                        <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">{course.programTitle}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{course.instructor} • {course.duration} • {course.totalLessons} lessons</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-orange-500 transition-colors" onClick={(e) => e.stopPropagation()}>
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors" onClick={(e) => e.stopPropagation()}>
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    {expandedCourse === course.id ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                                </div>
                            </div>

                            {expandedCourse === course.id && (
                                <div className="border-t border-gray-100 px-5 pb-5">
                                    {course.modules.map((module, index) => (
                                        <div key={module.id} className="mt-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                        <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">Lesson {index + 1}</span>
                                                        {module.title}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button className="p-1.5 text-gray-400 hover:text-orange-500 rounded-lg transition-colors border border-gray-100 hover:border-orange-200" title="Edit Lesson">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors border border-gray-100 hover:border-red-200" title="Delete Lesson">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                                    <Play className="w-5 h-5" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700">Upload Lesson Video</p>
                                                <p className="text-xs text-gray-400 mt-1">MP4 or WebM (Max 500MB)</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="mt-4 flex items-center gap-2 text-sm gradient-primary text-white rounded-lg py-2 px-4 shadow-sm hover:opacity-90 font-medium transition-colors border border-gray-200 hover:border-orange-300">
                                        <Plus className="w-4 h-4" /> Add Lesson
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Builder Modal */}
            <Modal isOpen={showBuilder} onClose={closeBuilder} title="Create New Chapter" maxWidth="max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Program</label>
                        <select value={form.programId} onChange={(e) => setForm(prev => ({ ...prev, programId: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                            {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Chapter Title</label>
                        <input value={form.title} onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))} type="text" placeholder="Enter chapter title" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                        <textarea value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3} placeholder="Describe the chapter..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none text-gray-700"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Instructor</label>
                            <input value={form.instructor} onChange={(e) => setForm(prev => ({ ...prev, instructor: e.target.value }))} type="text" placeholder="Instructor name" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
                            <input value={form.duration} onChange={(e) => setForm(prev => ({ ...prev, duration: e.target.value }))} type="text" placeholder="e.g., 8 weeks" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                        </div>
                    </div>

                    {/* Lesson Upload Section */}
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Lessons</h3>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">Drag & drop files here or click to browse</p>
                            <p className="text-xs text-gray-400 mt-1">Supports: MP4, MP3, PDF, DOCX</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={closeBuilder} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button onClick={closeBuilder} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                            Create Chapter
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
