'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { students, programs, classes } from '@/lib/data';
import { Users, Search, Filter, Plus, Edit, Trash2, Eye, Download, UserPlus, Mail, Grid, List, GraduationCap } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function AdminStudents() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [viewMode, setViewMode] = useState<'list' | 'program'>('list');
    const [showModal, setShowModal] = useState(false);

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStudentType = (studentId: string) => {
        const student = students.find(s => s.id === studentId);
        if (!student) return 'Unknown';
        const hasDegree = student.enrolledPrograms.some(pid => programs.find(p => p.id === pid)?.type === 'degree');
        return hasDegree ? 'Degree Student' : 'Short Term';
    };

    const handleNavigate = (id: string) => {
        router.push(`/admin/students/${id}`);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                    <p className="text-gray-500 text-sm mt-1">View and manage all registered students</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white border border-gray-200 rounded-xl p-1 flex items-center">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                            title="List View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('program')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'program' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Group by Program"
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                        <Download className="w-4 h-4" /> Export
                    </button>
                    <button onClick={() => setShowModal(true)} className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-orange-500/20">
                        <UserPlus className="w-4 h-4" /> Add Student
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search students by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                    {['all', 'active', 'inactive', 'suspended'].map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap ${statusFilter === s ? 'gradient-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >{s}</button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {viewMode === 'list' ? (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500 bg-gray-50/80">
                                    <th className="px-6 py-4 font-medium">Student</th>
                                    <th className="px-6 py-4 font-medium">Programs</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Joined</th>
                                    <th className="px-6 py-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredStudents.map((student) => {
                                    const avgProgress = Object.values(student.progress).reduce((a, b) => a + b, 0) / (Object.values(student.progress).length || 1);
                                    const type = getStudentType(student.id);
                                    const studentPrograms = programs.filter(p => student.enrolledPrograms.includes(p.id));

                                    return (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                            onClick={() => handleNavigate(student.id)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">{student.avatar}</div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{student.name}</p>
                                                        <p className="text-xs text-gray-400">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-xs">
                                                {studentPrograms.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {studentPrograms.map(p => (
                                                            <span key={p.id} className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md whitespace-nowrap">
                                                                {p.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : '—'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${student.status === 'active' ? 'badge-success' :
                                                    student.status === 'inactive' ? 'badge-warning' : 'badge-danger'
                                                    }`}>{student.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-xs">{student.joinedDate}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                    <button onClick={() => handleNavigate(student.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
                                                    <button onClick={() => handleNavigate(student.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-orange-500 transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-green-500 transition-colors"><Mail className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {/* Unenrolled Students */}
                    {filteredStudents.some(s => !s.enrolledPrograms || s.enrolledPrograms.length === 0) && (
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center"><Users className="w-4 h-4 text-gray-500" /></div>
                                Unenrolled Students
                                <span className="ml-auto text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
                                    {filteredStudents.filter(s => !s.enrolledPrograms || s.enrolledPrograms.length === 0).length}
                                </span>
                            </div>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredStudents.filter(s => !s.enrolledPrograms || s.enrolledPrograms.length === 0).map(student => (
                                    <div
                                        key={student.id}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all bg-white cursor-pointer"
                                        onClick={() => handleNavigate(student.id)}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">{student.avatar}</div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                                            <p className="text-xs text-gray-400">{getStudentType(student.id)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Program Groups */}
                    {programs.map(prog => {
                        const programStudents = filteredStudents.filter(s => s.enrolledPrograms && s.enrolledPrograms.includes(prog.id));
                        if (programStudents.length === 0) return null;

                        return (
                            <div key={prog.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-orange-50/30 border-b border-orange-100/50 font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                                    {prog.title}
                                    <span className="text-xs font-normal text-gray-500 ml-2">({prog.type})</span>
                                    <span className="ml-auto text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
                                        {programStudents.length} Students
                                    </span>
                                </div>
                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {programStudents.map(student => (
                                        <div
                                            key={student.id}
                                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all bg-white group cursor-pointer"
                                            onClick={() => handleNavigate(student.id)}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">{student.avatar}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 text-sm truncate">{student.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs text-gray-400">{getStudentType(student.id)}</p>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'active' ? 'bg-green-500' : 'bg-red-400'}`}></span>
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={(e) => { e.stopPropagation(); handleNavigate(student.id); }} className="text-gray-400 hover:text-blue-500"><Edit className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add Student Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Student">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                            <input type="text" placeholder="e.g. Ahmad Ali" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <input type="email" placeholder="email@example.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Program Enrollments (Hold Ctrl/Cmd to select multiple)</label>
                        <select multiple className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700 bg-white h-32">
                            {programs.map(p => <option key={p.id} value={p.id}>{p.title} ({p.type})</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Add Student</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
