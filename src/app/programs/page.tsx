'use client';

import PublicNavbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { programs } from '@/lib/data';
import { BookOpen, Clock, Users, ChevronRight, Search, Filter, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProgramsPage() {
    const [search, setSearch] = useState('');
    const [level, setLevel] = useState('all');

    const filtered = programs.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
        const matchesLevel = level === 'all' || p.level.toLowerCase() === level.toLowerCase();
        return matchesSearch && matchesLevel;
    });

    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            <PublicNavbar />

            {/* Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 gradient-dark"></div>
                <div className="absolute inset-0 islamic-pattern opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20 mb-4">
                            <BookOpen className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-300 text-sm font-medium">Our Programs</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Islamic Education <span className="text-orange-400">Programs</span></h1>
                        <p className="text-gray-300 text-lg">Explore our comprehensive catalog of programs designed to deepen your understanding of Islamic sciences.</p>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
                <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search programs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700"
                        />
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        {['all', 'beginner', 'intermediate', 'advanced', 'all levels'].map((l) => (
                            <button
                                key={l}
                                onClick={() => setLevel(l)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${level === l ? 'gradient-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {l === 'all' ? 'All Levels' : l}
                            </button>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* Programs Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((program) => (
                        <div key={program.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group">
                            <div className="h-52 gradient-primary relative overflow-hidden">
                                <div className="absolute inset-0 islamic-pattern opacity-20"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${program.status === 'active' ? 'bg-green-500/20 text-green-100 border border-green-500/30' :
                                        program.status === 'upcoming' ? 'bg-blue-500/20 text-blue-100 border border-blue-500/30' :
                                            'bg-gray-500/20 text-gray-100 border border-gray-500/30'
                                        }`}>{program.status === 'active' ? '● Active' : '◐ Coming Soon'}</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-orange-200 text-sm font-medium">{program.level}</p>
                                    <h3 className="text-xl font-bold text-white mt-1">{program.title}</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-right text-orange-400 font-arabic text-lg mb-3">{program.titleAr}</p>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5">{program.description}</p>

                                <div className="grid grid-cols-3 gap-4 mb-5">
                                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                                        <Clock className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                                        <div className="text-xs text-gray-500">{program.duration}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                                        <BookOpen className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                                        <div className="text-xs text-gray-500">{program.totalCourses} courses</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                                        <Users className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                                        <div className="text-xs text-gray-500">{program.enrolledStudents}</div>
                                    </div>
                                </div>

                                <Link href="/register" className="block w-full text-center gradient-primary text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                                    Enroll Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <GraduationCap className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No programs found</h3>
                        <p className="text-gray-400 text-sm">Try adjusting your search or filter</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
