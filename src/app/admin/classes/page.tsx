'use client';

import { useState } from 'react';
import { classes, programs } from '@/lib/data';
import { Users, Plus, Calendar, BookOpen, Clock, Edit, UserPlus, Search } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

export default function AdminClasses() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleClassClick = (id: string) => {
        router.push(`/admin/classes/${id}`);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Class Manager</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage student groups, schedules, and assignments</p>
                </div>
                <button onClick={() => setShowModal(true)} className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-orange-500/20">
                    <Plus className="w-4 h-4" /> Create Class
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search classes..." className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
            </div>

            {/* Class Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                    <div
                        key={cls.id}
                        onClick={() => handleClassClick(cls.id)}
                        className="bg-white rounded-2xl border border-gray-100 p-5 cursor-pointer transition-all card-hover hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cls.status === 'active' ? 'badge-success' : cls.status === 'upcoming' ? 'badge-info' : 'badge-warning'
                                }`}>{cls.status}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{cls.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{cls.programTitle}</p>

                        <div className="space-y-2 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                <span>{cls.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 text-gray-400" />
                                <span>{cls.studentCount} students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                                <span>{cls.instructor}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                            <button onClick={(e) => { e.stopPropagation(); handleClassClick(cls.id); }} className="flex-1 text-center py-2 text-xs font-medium text-orange-500 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                <Edit className="w-3 h-3 inline mr-1" /> Edit
                            </button>
                            <button className="flex-1 text-center py-2 text-xs font-medium text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <UserPlus className="w-3 h-3 inline mr-1" /> Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Class">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Class Name</label>
                        <input type="text" placeholder="e.g., Al-Farooq Class A" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Program</label>
                        <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                            {programs.map(p => <option key={p.id}>{p.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Schedule</label>
                        <input type="text" placeholder="e.g., Sun, Tue, Thu 6-8 PM" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Instructor</label>
                        <input type="text" placeholder="Instructor name" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                            <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                            <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Create Class</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
