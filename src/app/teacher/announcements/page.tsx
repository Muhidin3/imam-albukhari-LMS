'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
    Bell, Send, Trash2, Edit3,
    Filter, Search, Users, Eye,
    MoreVertical, Plus
} from 'lucide-react';
import { announcements, classes, teachers } from '@/lib/data';

export default function TeacherAnnouncements() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const teacher = teachers[0];

    // Filter announcements authored by this teacher or relevant to their classes
    const teacherAnnouncements = announcements.filter(ann =>
        ann.authorId === teacher.id ||
        (ann.targetAudience === 'specific-class' && teacher.assignedClasses.includes(ann.classId || ''))
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('Announcements')}</h1>
                    <p className="text-gray-500">{t('Communicate important updates to your students')}</p>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20">
                    <Plus className="w-5 h-5" />
                    {t('New Announcement')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Announcement List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('Search announcements...')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 w-full bg-white"
                            />
                        </div>
                        <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-600 hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>

                    {teacherAnnouncements.map((ann) => (
                        <div key={ann.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-1 h-full ${ann.priority === 'high' ? 'bg-red-500' : ann.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                                }`}></div>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-900 text-lg">{ann.title}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ann.priority === 'high' ? 'bg-red-50 text-red-600' :
                                                ann.priority === 'medium' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-blue-50 text-blue-600'
                                            }`}>
                                            {ann.priority}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {ann.targetAudience === 'all' ? t('All Students') :
                                                ann.targetAudience === 'specific-class' ? (classes.find(c => c.id === ann.classId)?.name || t('Specific Class')) :
                                                    t('Specific Group')}
                                        </span>
                                        <span>•</span>
                                        <span>{ann.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                {ann.content}
                            </p>

                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                                <span className="text-gray-400">{t('Sent by')}: <span className="font-medium text-gray-700">{ann.author}</span></span>
                                <button className="text-orange-600 font-bold hover:underline flex items-center gap-1">
                                    {t('View Details')}
                                    <Eye className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Panel - Stats & Quick Post */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="font-bold text-gray-900 mb-4">{t('Compose Quick Message')}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t('Select Class')}</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-100">
                                    {teacher.assignedClasses.map(id => (
                                        <option key={id} value={id}>{classes.find(c => c.id === id)?.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t('Message')}</label>
                                <textarea
                                    rows={4}
                                    placeholder={t('Type your message here...')}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-100 resize-none"
                                ></textarea>
                            </div>
                            <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors">
                                <Send className="w-4 h-4" />
                                {t('Post Now')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-orange-600 to-amber-700 p-6 rounded-3xl text-white">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{t('Communication Tips')}</h3>
                        <p className="text-orange-100 text-sm leading-relaxed">
                            {t('Keep your announcements clear and concise. Use high priority for urgent schedule changes only.')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
