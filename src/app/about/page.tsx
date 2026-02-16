'use client';

import PublicNavbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { BookOpen, Users, Award, Target, Heart, Globe, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            <PublicNavbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 gradient-dark"></div>
                <div className="absolute inset-0 islamic-pattern opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About <span className="text-orange-400">Imam Al-Bukhari</span> Institute</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Dedicated to preserving and spreading authentic Islamic knowledge through modern education technology since 2020.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 card-hover">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                            <Target className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-500 leading-relaxed">
                            To provide accessible, authentic Islamic education through a modern learning platform that connects students with qualified scholars. We aim to make the seeking of Islamic knowledge easy, structured, and accessible to everyone regardless of their location.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 card-hover">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                            <Globe className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                        <p className="text-gray-500 leading-relaxed">
                            To become a leading global institution for Islamic education, nurturing a generation of knowledgeable Muslims who understand their faith deeply and can contribute positively to society.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our <span className="text-orange-500">Core Values</span></h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: BookOpen, title: 'Authenticity', desc: 'Grounded in Quran and Sunnah with scholarly verification' },
                            { icon: Heart, title: 'Sincerity', desc: 'Pure intention in spreading knowledge for the sake of Allah' },
                            { icon: Users, title: 'Community', desc: 'Building a supportive global learning community' },
                            { icon: GraduationCap, title: 'Excellence', desc: 'Striving for the highest quality in education delivery' },
                        ].map((v) => (
                            <div key={v.title} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
                                    <v.icon className="w-7 h-7 text-orange-500" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                                <p className="text-gray-500 text-sm">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 gradient-dark"></div>
                <div className="absolute inset-0 islamic-pattern opacity-15"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { number: '1,200+', label: 'Active Students' },
                            { number: '6', label: 'Programs' },
                            { number: '20+', label: 'Qualified Scholars' },
                            { number: '15+', label: 'Countries Reached' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scholars */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our <span className="text-orange-500">Scholars</span></h2>
                        <p className="text-gray-500">Meet the qualified educators guiding our programs</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'Sheikh Ahmad Al-Farsi', role: 'Aqeedah & Bukhari Studies', emoji: '👨‍🏫' },
                            { name: 'Dr. Muhammad Al-Azhari', role: 'Hadith Sciences', emoji: '👨‍🎓' },
                            { name: 'Dr. Fatimah Al-Zahra', role: 'Seerah & Islamic History', emoji: '👩‍🏫' },
                            { name: 'Qari Abdullah Mansoor', role: 'Quran & Tajweed', emoji: '🧑‍🏫' },
                        ].map((scholar) => (
                            <div key={scholar.name} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-lg transition-all group">
                                <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4 text-4xl group-hover:scale-110 transition-transform">
                                    {scholar.emoji}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{scholar.name}</h3>
                                <p className="text-orange-500 text-sm">{scholar.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
