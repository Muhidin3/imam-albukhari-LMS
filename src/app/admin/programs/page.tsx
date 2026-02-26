'use client';

import { useState } from 'react';
import { programs } from '@/lib/data';
import { BookOpen, Plus, Edit, Trash2, Users, Clock, Search, Eye } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

import { useLanguage } from '@/context/LanguageContext';

export default function AdminPrograms() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const { t, language } = useLanguage();

    const handleRowClick = (id: string) => {
        router.push(`/admin/programs/${id}`);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('Programs')}</h1>
                    <p className="text-gray-500 text-sm mt-1">{t('Management')}</p>
                </div>
                <button onClick={() => setShowModal(true)} className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-orange-500/20">
                    <Plus className="w-4 h-4" /> {t('Create')}
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder={t('Search') + "..."} className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
            </div>

            {/* Programs Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 bg-gray-50/80">
                                <th className="px-6 py-4 font-medium">{t('Program')}</th>
                                <th className="px-6 py-4 font-medium">{t('Duration')}</th>
                                <th className="px-6 py-4 font-medium">{t('Chapters')}</th>
                                <th className="px-6 py-4 font-medium">{t('Students')}</th>
                                <th className="px-6 py-4 font-medium">{t('Status')}</th>
                                <th className="px-6 py-4 font-medium">{t('Action')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {programs.map((prog) => (
                                <tr
                                    key={prog.id}
                                    onClick={() => handleRowClick(prog.id)}
                                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                                                <BookOpen className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{language === 'am' ? (prog.titleAm || prog.title) : prog.title}</p>
                                                <p className="text-xs text-orange-400 mt-0.5">{prog.titleAr}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-400" /> {prog.duration}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{prog.totalCourses}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-gray-400" /> {prog.enrolledStudents}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${prog.status === 'active' ? 'badge-success' : prog.status === 'upcoming' ? 'badge-info' : 'badge-warning'
                                            }`}>{prog.status}</span>
                                    </td>
                                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleRowClick(prog.id)}
                                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-orange-500 transition-colors" title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



            {/* Create Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Program">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Program Title</label>
                        <input type="text" placeholder="e.g., Fundamentals of Islamic Studies" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Arabic Title</label>
                        <input type="text" placeholder="العنوان بالعربية" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 text-right" dir="rtl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                        <textarea rows={3} placeholder="Describe the program..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none text-gray-700"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Level</label>
                            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                                <option>All Levels</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
                            <input type="text" placeholder="e.g., 6 months" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                            Create Program
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
