'use client';

import { useState } from 'react';
import { certificateTemplates, certificates } from '@/lib/data';
import { Award, Plus, Edit, Trash2, Eye, Palette, Star, Calendar, Download } from 'lucide-react';

export default function AdminCertificates() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Certificate Templates</h1>
                    <p className="text-gray-500 text-sm mt-1">Design and manage certificate templates for your programs</p>
                </div>
                <button onClick={() => setShowModal(true)} className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-orange-500/20">
                    <Plus className="w-4 h-4" /> New Template
                </button>
            </div>

            {/* Templates */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Templates</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {certificateTemplates.map((template) => (
                        <div key={template.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover">
                            <div className="p-6 text-center" style={{ backgroundColor: template.bgColor, borderBottom: `4px ${template.borderStyle} #E67E22` }}>
                                <div className="relative">
                                    <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                                    <div className="relative">
                                        <Award className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                                        <p className="text-[10px] text-orange-500 font-semibold uppercase tracking-widest mb-1">Certificate of Completion</p>
                                        <h3 className="text-lg font-bold text-gray-900">Student Name</h3>
                                        <p className="text-sm text-gray-500 mt-1">Course Name</p>
                                        <div className="flex items-center justify-center gap-1 mt-2">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-900 text-sm">{template.name}</h4>
                                    <span className="text-xs text-gray-400">{template.createdAt}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">{template.description}</p>
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 py-2 text-center text-xs font-medium text-orange-500 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center gap-1">
                                        <Edit className="w-3 h-3" /> Edit
                                    </button>
                                    <button className="flex-1 py-2 text-center text-xs font-medium text-orange-500 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center gap-1">
                                        <Eye className="w-3 h-3" /> Preview
                                    </button>
                                    <button className="py-2 px-3 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Issued Certificates */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Issued Certificates</h2>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500 bg-gray-50/80">
                                    <th className="px-6 py-4 font-medium">Student</th>
                                    <th className="px-6 py-4 font-medium">Program</th>
                                    <th className="px-6 py-4 font-medium">Course</th>
                                    <th className="px-6 py-4 font-medium">Grade</th>
                                    <th className="px-6 py-4 font-medium">Template</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {certificates.map((cert) => {
                                    const tmpl = certificateTemplates.find(t => t.id === cert.templateId);
                                    return (
                                        <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{cert.studentName}</td>
                                            <td className="px-6 py-4 text-gray-600">{cert.programTitle}</td>
                                            <td className="px-6 py-4 text-gray-600">{cert.courseTitle}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold badge-success">{cert.grade}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-xs">{tmpl?.name || '—'}</td>
                                            <td className="px-6 py-4 text-gray-500 text-xs flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {cert.issueDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-orange-500"><Eye className="w-4 h-4" /></button>
                                                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-green-500"><Download className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Template Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 animate-fade-in-up shadow-2xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Create Certificate Template</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Template Name</label>
                                <input type="text" placeholder="e.g., Classic Gold" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                <textarea rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none text-gray-700" placeholder="Describe the template..."></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Background Color</label>
                                    <div className="flex items-center gap-2">
                                        <input type="color" defaultValue="#FFF5EB" className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                                        <input type="text" defaultValue="#FFF5EB" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Border Style</label>
                                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white">
                                        <option>solid</option><option>double</option><option>groove</option><option>ridge</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Create Template</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
