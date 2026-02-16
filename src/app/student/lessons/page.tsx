'use client';

import { useState } from 'react';
import { programs } from '@/lib/data';
import {
    Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, BookOpen,
    FileText, Headphones, ChevronLeft, ChevronRight, CheckCircle2, Circle,
    Download, Clock, List
} from 'lucide-react';

export default function LessonViewer() {
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);

    const allLessons = programs[0].courses[0].modules.flatMap(m =>
        m.lessons.map(l => ({ ...l, moduleName: m.title }))
    );
    const currentLesson = allLessons[currentLessonIndex];

    const renderContent = () => {
        switch (currentLesson.type) {
            case 'video':
                return (
                    <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-orange-500/30 transition-colors" onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <Pause className="w-10 h-10 text-orange-400" /> : <Play className="w-10 h-10 text-orange-400 ml-1" />}
                                </div>
                                <p className="text-gray-400 text-sm">{currentLesson.title}</p>
                                <p className="text-gray-600 text-xs mt-1">Video Lecture • {currentLesson.duration}</p>
                            </div>
                        </div>
                        {/* Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <div className="w-full h-1 bg-gray-700 rounded-full mb-3 cursor-pointer">
                                <div className="w-1/3 h-full bg-orange-500 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-orange-400 transition-colors">
                                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                    </button>
                                    <button className="text-white hover:text-orange-400 transition-colors"><SkipBack className="w-4 h-4" /></button>
                                    <button className="text-white hover:text-orange-400 transition-colors"><SkipForward className="w-4 h-4" /></button>
                                    <span className="text-gray-400 text-xs">15:24 / {currentLesson.duration}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="text-white hover:text-orange-400 transition-colors"><Volume2 className="w-4 h-4" /></button>
                                    <button className="text-white hover:text-orange-400 transition-colors"><Maximize2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'audio':
                return (
                    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-12 text-center">
                        <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                            <Headphones className="w-16 h-16 text-purple-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{currentLesson.title}</h3>
                        <p className="text-purple-300 text-sm mb-8">Audio Lecture • {currentLesson.duration}</p>
                        <div className="max-w-md mx-auto">
                            <div className="w-full h-2 bg-white/10 rounded-full mb-4 cursor-pointer">
                                <div className="w-2/5 h-full bg-purple-400 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-purple-300">
                                <span>12:30</span>
                                <div className="flex items-center gap-4">
                                    <button className="hover:text-white transition-colors"><SkipBack className="w-5 h-5" /></button>
                                    <button className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors" onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
                                    </button>
                                    <button className="hover:text-white transition-colors"><SkipForward className="w-5 h-5" /></button>
                                </div>
                                <span>{currentLesson.duration}</span>
                            </div>
                        </div>
                    </div>
                );
            case 'pdf':
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{currentLesson.title}</h3>
                                    <p className="text-sm text-gray-500">PDF Document • {currentLesson.duration} read</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-500 rounded-xl text-sm font-medium hover:bg-orange-100 transition-colors">
                                <Download className="w-4 h-4" /> Download
                            </button>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-8 min-h-[400px] flex items-center justify-center border border-gray-100">
                            <div className="text-center">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-sm">PDF Viewer</p>
                                <p className="text-gray-400 text-xs mt-1">Document content would be rendered here</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{currentLesson.title}</h3>
                        <div className="prose max-w-none text-gray-600">
                            <p>This is a text-based lesson covering important concepts. In a full implementation, rich text content would be displayed here with proper formatting, images, and interactive elements.</p>
                            <h4 className="text-gray-900 font-bold mt-6">Key Points</h4>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>Understanding the fundamental concepts</li>
                                <li>Practical application in daily life</li>
                                <li>Connection to Quran and Sunnah</li>
                                <li>Summary and review questions</li>
                            </ul>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lesson Viewer</h1>
                    <p className="text-gray-500 text-sm mt-1">Introduction to Aqeedah</p>
                </div>
                <button onClick={() => setShowSidebar(!showSidebar)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <List className="w-4 h-4" /> {showSidebar ? 'Hide' : 'Show'} Lessons
                </button>
            </div>

            <div className="flex gap-6">
                {/* Main Content */}
                <div className={`${showSidebar ? 'flex-1' : 'w-full'} space-y-4`}>
                    {renderContent()}

                    {/* Lesson Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">{currentLesson.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {currentLesson.duration}</span>
                            <span className="capitalize px-2 py-0.5 rounded bg-gray-100 text-xs">{currentLesson.type}</span>
                            <span className="text-gray-400">Module: {currentLesson.moduleName}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                                disabled={currentLessonIndex === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </button>
                            <button className="px-6 py-2 gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                                Mark Complete
                            </button>
                            <button
                                onClick={() => setCurrentLessonIndex(Math.min(allLessons.length - 1, currentLessonIndex + 1))}
                                disabled={currentLessonIndex === allLessons.length - 1}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                {showSidebar && (
                    <div className="w-80 shrink-0 hidden xl:block">
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-6">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900 text-sm">Course Content</h3>
                                <p className="text-xs text-gray-500 mt-1">{allLessons.filter(l => l.completed).length}/{allLessons.length} completed</p>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto">
                                {allLessons.map((lesson, idx) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setCurrentLessonIndex(idx)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50/50 transition-colors border-b border-gray-50 ${idx === currentLessonIndex ? 'bg-orange-50 border-l-2 border-l-orange-500' : ''
                                            }`}
                                    >
                                        {lesson.completed ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                        ) : idx === currentLessonIndex ? (
                                            <Play className="w-4 h-4 text-orange-500 shrink-0" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-medium truncate ${idx === currentLessonIndex ? 'text-orange-600' : 'text-gray-700'}`}>{lesson.title}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{lesson.type} • {lesson.duration}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
