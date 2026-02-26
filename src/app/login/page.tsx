'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero"></div>
                <div className="absolute inset-0 islamic-pattern opacity-20"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
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
                        Welcome Back to Your <span className="text-orange-400">Learning Journey</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Continue your pursuit of Islamic knowledge. Access your courses, track your progress, and earn certificates.
                    </p>
                    <div className="mt-12 p-6 glass rounded-2xl border border-white/10">
                        <p className="text-gray-300 text-sm italic">&quot;Whoever follows a path seeking knowledge, Allah will make easy for him a path to Paradise.&quot;</p>
                        <p className="text-orange-400 text-sm mt-3 font-medium">— Prophet Muhammad ﷺ (Sahih Muslim)</p>
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

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
                    <p className="text-gray-500 mb-8">Enter your credentials to access your account</p>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 bg-white text-gray-700"
                                    id="login-email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 bg-white text-gray-700"
                                    id="login-password"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-300" />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium">Forgot password?</a>
                        </div>

                        <div className="pt-2 space-y-3">
                            <Link href="/student/dashboard" className="block w-full gradient-primary text-white py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20 text-center">
                                Sign In as Student
                            </Link>
                            <Link href="/admin/dashboard" className="block w-full bg-[#6D2C00] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#A04000] transition-colors text-center">
                                Sign In as Admin
                            </Link>
                            <Link href="/teacher/dashboard" className="block w-full bg-orange-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors text-center shadow-lg shadow-orange-500/20">
                                Sign In as Teacher
                            </Link>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-orange-500 font-semibold hover:text-orange-600">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
