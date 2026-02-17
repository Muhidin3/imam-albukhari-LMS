'use client';

import { useState } from 'react';
import { announcements, programs, classes } from '@/lib/data';
import { Bell, Plus, Edit, Trash2, Search, Megaphone, AlertTriangle, Info, Calendar, User, Send, Users, Layers, GraduationCap } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function AdminAnnouncements() {
    const [showModal, setShowModal] = useState(false);
    const [targetAudience, setTargetAudience] = useState('all');

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'medium': return <Megaphone className="w-4 h-4 text-orange-500" />;
            default: return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    const getAudienceLabel = (ann: Announcement) => {
        switch (ann.targetAudience) {
            case 'all': return 'All Users';
            case 'students': return 'All Students';
            case 'specific-class':
                const cls = classes.find(c => c.id === ann.classId);
                return `Class: ${cls?.name || 'Unknown'}`;
            case 'specific-program':
                const prog = programs.find(p => p.id === ann.programId);
                return `Program: ${prog?.title || 'Unknown'}`;
            default: return ann.targetAudience;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                    <p className="text-gray-500 text-sm mt-1">Create and manage institute-wide announcements</p>
                </div>
                <button onClick={() => setShowModal(true)} className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-orange-500/20">
                    <Plus className="w-4 h-4" /> New Announcement
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Bell className="w-5 h-5 text-blue-500" /></div>
                    <div><div className="text-xl font-bold text-gray-900">{announcements.length}</div><div className="text-xs text-gray-500">Total</div></div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-500" /></div>
                    <div><div className="text-xl font-bold text-gray-900">{announcements.filter(a => a.priority === 'high').length}</div><div className="text-xs text-gray-500">High Priority</div></div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><Send className="w-5 h-5 text-green-500" /></div>
                    <div><div className="text-xl font-bold text-gray-900">{announcements.filter(a => a.targetAudience === 'all').length}</div><div className="text-xs text-gray-500">Sent to All</div></div>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Announcements List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search announcements..." className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>

                    {announcements.map((ann) => (
                        <div key={ann.id} className={`bg-white rounded-2xl border p-6 card-hover group ${ann.priority === 'high' ? 'border-red-100' : 'border-gray-100'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${ann.priority === 'high' ? 'bg-red-50' : ann.priority === 'medium' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                                    {getPriorityIcon(ann.priority)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-900 truncate pr-4">{ann.title}</h3>
                                            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {ann.author}</span>
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ann.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-orange-500"><Edit className="w-4 h-4" /></button>
                                            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-2">{ann.content}</p>

                                    <div className="mt-4 flex items-center gap-2">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${ann.targetAudience === 'all' ? 'bg-gray-100 text-gray-600' :
                                                ann.targetAudience === 'specific-program' ? 'bg-purple-50 text-purple-600' :
                                                    ann.targetAudience === 'specific-class' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                            }`}>
                                            {getAudienceLabel(ann)}
                                        </span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${ann.priority === 'high' ? 'badge-danger' : ann.priority === 'medium' ? 'badge-warning' : 'badge-info'}`}>
                                            {ann.priority} Priority
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter Sidebar (Mock) */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-200" />
                                All Priority Levels
                            </label>
                            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-200" />
                                High Priority
                            </label>
                            <div className="border-t border-gray-100 my-3"></div>
                            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-200" />
                                All Audiences
                            </label>
                            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-200" />
                                Students Only
                            </label>
                            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-200" />
                                Specific Classes
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Announcement">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                        <input type="text" placeholder="Announcement title" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
                        <textarea rows={4} placeholder="Write your announcement..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none text-gray-700"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
                            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Audience</label>
                            <select
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white"
                            >
                                <option value="all">All Users</option>
                                <option value="students">All Students</option>
                                <option value="admins">Admins Only</option>
                                <option value="specific-program">Specific Program</option>
                                <option value="specific-class">Specific Class</option>
                            </select>
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {targetAudience === 'specific-program' && (
                        <div className="animate-fade-in-up">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Program</label>
                            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                                <option value="">Select a program...</option>
                                {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                            </select>
                        </div>
                    )}
                    {targetAudience === 'specific-class' && (
                        <div className="animate-fade-in-up">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Class</label>
                            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                                <option value="">Select a class...</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Publish</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
