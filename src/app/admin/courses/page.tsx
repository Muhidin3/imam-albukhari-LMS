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
                        <h1 className="text-2xl font-bold text-gray-900">Course & Lesson Builder</h1>
                        <p className="text-gray-500 text-sm mt-1">Create and organize courses, modules, and lessons</p>
                    </div>
                    <button onClick={openBuilder} className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-orange-500/20">
                        <Plus className="w-4 h-4" /> New Course
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

                            {/* Expanded Modules & Lessons */}
                            {expandedCourse === course.id && (
                                <div className="border-t border-gray-100 px-5 pb-5">
                                    {course.modules.map((module) => (
                                        <div key={module.id} className="mt-4">
                                            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-2">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4 text-orange-500" />
                                                    <h4 className="text-sm font-semibold text-gray-700">Module {module.order}: {module.title}</h4>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-orange-500 transition-colors">
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-green-500 transition-colors">
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1 ml-4">
                                                {module.lessons.map((lesson) => (
                                                    <div key={lesson.id} className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
                                                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${lesson.type === 'video' ? 'bg-blue-50 text-blue-500' :
                                                            lesson.type === 'audio' ? 'bg-purple-50 text-purple-500' :
                                                                lesson.type === 'pdf' ? 'bg-red-50 text-red-500' :
                                                                    'bg-gray-50 text-gray-500'
                                                            }`}>
                                                            {lesson.type === 'video' ? <Video className="w-3.5 h-3.5" /> :
                                                                lesson.type === 'audio' ? <Headphones className="w-3.5 h-3.5" /> :
                                                                    <FileText className="w-3.5 h-3.5" />}
                                                        </span>
                                                        <span className="flex-1 text-sm text-gray-700">{lesson.title}</span>
                                                        <span className="text-xs text-gray-400">{lesson.duration}</span>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-orange-500">
                                                                <Edit className="w-3 h-3" />
                                                            </button>
                                                            <button className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-red-500">
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <button className="mt-4 flex items-center gap-2 text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors px-4">
                                        <Plus className="w-4 h-4" /> Add Module
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Builder Modal */}
            <Modal isOpen={showBuilder} onClose={closeBuilder} title="Create New Course" maxWidth="max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Program</label>
                        <select value={form.programId} onChange={(e) => setForm(prev => ({ ...prev, programId: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                            {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Title</label>
                        <input value={form.title} onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))} type="text" placeholder="Enter course title" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                        <textarea value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3} placeholder="Describe the course..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none text-gray-700"></textarea>
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
                            Create Course
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
