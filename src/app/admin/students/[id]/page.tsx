'use client';

import { useState, useEffect, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { students, programs, classes, transcripts, Transcript } from '@/lib/data';
import {
    User, Mail, Calendar, Book, GraduationCap, Clock,
    Shield, MapPin, Phone, Award, FileText, ArrowLeft,
    CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    icon: React.ElementType;
}

function TabButton({ active, onClick, children, icon: Icon }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${active
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
        >
            <Icon className="w-4 h-4" />
            {children}
        </button>
    );
}

export default function StudentDetail({ params }: { params: Promise<{ id: string }> }) {
    // Un-await the params using React.use()
    const { id } = use(params);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'profile'>('overview');

    const student = students.find(s => s.id === id);
    const transcript = transcripts.find(t => t.studentId === id);

    if (!student) {
        notFound();
    }

    const enrolledProgs = programs.filter(p => student.enrolledPrograms.includes(p.id));

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header / Back */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Students
            </button>

            {/* Student Profile Header */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-4xl shadow-inner border-4 border-white">
                    {student.avatar}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                    <div className="text-gray-500 text-sm mt-1 flex flex-col md:flex-row items-center gap-3">
                        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {student.email}</span>
                        <span className="hidden md:block text-gray-300">|</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {student.joinedDate}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${student.status === 'active' ? 'badge-success' : 'badge-danger'
                            }`}>
                            {student.status.toUpperCase()}
                        </span>
                        {enrolledProgs.map(p => (
                            <span key={p.id} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                                {p.title}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                        Suspend
                    </button>
                    <button className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100 overflow-x-auto">
                    <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={User}>
                        Overview
                    </TabButton>
                    <TabButton active={activeTab === 'academic'} onClick={() => setActiveTab('academic')} icon={GraduationCap}>
                        Academic Record
                    </TabButton>
                    <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={Shield}>
                        Profile Settings
                    </TabButton>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <h3 className="font-bold text-gray-900">Enrolled Programs</h3>
                                {enrolledProgs.map(prog => (
                                    <div key={prog.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-900">{prog.title}</h4>
                                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">{prog.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-orange-500 rounded-full"
                                                    style={{ width: `${student.progress[prog.id] || 0}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{student.progress[prog.id] || 0}%</span>
                                        </div>
                                        <div className="text-xs text-gray-500 flex justify-between">
                                            <span>{prog.totalCourses} Courses</span>
                                            <span>Last activity: 2d ago</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-gray-900">Recent Activity</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex gap-3 items-start">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-900">Completed quiz <span className="font-medium">Fiqh of Salah</span></p>
                                                <span className="text-xs text-gray-500">2 days ago • Score: 87%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'academic' && (
                        <div>
                            {transcript ? (
                                <div className="space-y-8">
                                    <div className="flex flex-wrap gap-4 items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <div>
                                            <h3 className="font-bold text-blue-900">Cumulative GPA</h3>
                                            <p className="text-3xl font-bold text-blue-700 mt-1">{transcript.cumulativeGPA.toFixed(2)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-blue-600 font-medium">Total Credits Earned</p>
                                            <p className="text-2xl font-bold text-blue-800">{transcript.totalCredits}</p>
                                        </div>
                                    </div>

                                    {transcript.semesters.map((sem) => (
                                        <div key={sem.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                                <h3 className="font-bold text-gray-800">{sem.name}</h3>
                                                <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-lg border border-gray-200">
                                                    Semester GPA: <span className={sem.gpa >= 3.0 ? 'text-green-600' : sem.gpa >= 2.0 ? 'text-orange-600' : 'text-red-600'}>{sem.gpa.toFixed(2)}</span>
                                                </span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="bg-gray-50/50 border-b border-gray-100 text-left text-gray-500">
                                                            <th className="px-6 py-3 font-medium">Course Code</th>
                                                            <th className="px-6 py-3 font-medium">Course Title</th>
                                                            <th className="px-6 py-3 font-medium">Credits</th>
                                                            <th className="px-6 py-3 font-medium">Grade</th>
                                                            <th className="px-6 py-3 font-medium">Score</th>
                                                            <th className="px-6 py-3 font-medium">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {sem.courses.map((course, idx) => (
                                                            <tr key={idx} className="hover:bg-gray-50/50">
                                                                <td className="px-6 py-3 font-mono text-gray-600">{course.code}</td>
                                                                <td className="px-6 py-3 font-medium text-gray-900">{course.title}</td>
                                                                <td className="px-6 py-3 text-gray-600">{course.credits}</td>
                                                                <td className="px-6 py-3 font-bold">
                                                                    <span className={
                                                                        ['A', 'A-', 'B+'].includes(course.grade) ? 'text-green-600' :
                                                                            ['F', 'D'].includes(course.grade) ? 'text-red-600' : 'text-gray-900'
                                                                    }>{course.grade}</span>
                                                                </td>
                                                                <td className="px-6 py-3 text-gray-600">{course.score > 0 ? course.score : '-'}</td>
                                                                <td className="px-6 py-3">
                                                                    {course.status === 'pass' && (
                                                                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-medium w-fit">
                                                                            <CheckCircle className="w-3 h-3" /> Passed
                                                                        </span>
                                                                    )}
                                                                    {course.status === 'fail' && (
                                                                        <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs font-medium w-fit">
                                                                            <XCircle className="w-3 h-3" /> Failed
                                                                        </span>
                                                                    )}
                                                                    {course.status === 'in-progress' && (
                                                                        <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs font-medium w-fit">
                                                                            <Clock className="w-3 h-3" /> In Progress
                                                                        </span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">No Transcript Available</h3>
                                    <p className="text-gray-500 mt-2">No academic record found for this student.</p>
                                    <button className="mt-4 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                                        Generate Transcript
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="max-w-2xl">
                            <h3 className="font-bold text-gray-900 mb-6">Personal Information</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                                        <input type="text" defaultValue={student.name.split(' ')[0]} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                                        <input type="text" defaultValue={student.name.split(' ').slice(1).join(' ')} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                    <input type="email" defaultValue={student.email} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                    <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                                </div>

                                <h3 className="font-bold text-gray-900 mt-8 mb-4">Account Settings</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Status</label>
                                    <select defaultValue={student.status} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>

                                <div className="pt-6">
                                    <button className="px-6 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
