'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero"></div>
                <div className="absolute inset-0 islamic-pattern opacity-20"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-float"></div>
                <div className="relative flex flex-col justify-center px-16">
                    <Link href="/" className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-white font-bold text-xl">Imam Al-Bukhari</span>
                            <span className="block text-orange-300 text-xs font-medium tracking-widest uppercase">Islamic Institute</span>
                        </div>
                    </Link>
                    <h2 className="text-4xl font-bold text-white leading-tight mb-6">
                        Begin Your Islamic <span className="text-orange-400">Education</span> Today
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Join a community of seekers of knowledge. Access structured programs taught by qualified scholars.
                    </p>

                    <div className="mt-12 space-y-4">
                        {['Free registration & enrollment', 'Access to video, audio & PDF lessons', 'Interactive MCQ exams', 'Earn verified certificates'].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                </div>
                                <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#FAFAF8]">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-900 font-bold text-lg">Imam Al-Bukhari</span>
                        </Link>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-500 mb-8">Fill in your details to register as a student</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
                                    id="register-name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
                                    id="register-email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="+251 ..."
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
                                    id="register-phone"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
                                    id="register-password"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 pt-1">
                            <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-300" />
                            <span className="text-sm text-gray-500">I agree to the <a href="#" className="text-orange-500 font-medium">Terms of Service</a> and <a href="#" className="text-orange-500 font-medium">Privacy Policy</a></span>
                        </div>

                        <Link href="/student/dashboard" className="block w-full gradient-primary text-white py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20 text-center mt-4">
                            Create Account
                        </Link>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-orange-500 font-semibold hover:text-orange-600">Sign in here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
