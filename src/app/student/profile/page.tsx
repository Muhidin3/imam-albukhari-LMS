'use client';

import { useState } from 'react';
import { currentStudent, programs, certificates, examResults } from '@/lib/data';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Lock, BookOpen, CheckCircle, Award, Download, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProfilePage() {
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: currentStudent.name,
        email: currentStudent.email,
        phone: '+251 91 234 5678',
        location: 'Addis Ababa, Ethiopia',
        bio: 'Seeking knowledge in Islamic studies.',
    });

    const enrolledPrograms = programs.filter(p => currentStudent.enrolledPrograms.includes(p.id));
    const studentCerts = certificates.slice(0, 1);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="space-y-5 animate-fade-in-up">
            {/* Profile Card */}
            <div className="card-mobile overflow-hidden">
                {/* Cover - desktop only */}
                <div className="h-20 lg:h-28 bg-linear-to-r from-orange-400 to-red-500 relative hidden lg:block">
                    <div className="absolute inset-0 islamic-pattern opacity-15"></div>
                </div>

                <div className="p-4 lg:px-6 lg:pb-6">
                    <div className="flex items-center gap-4 lg:-mt-10">
                        {/* Avatar */}
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl lg:text-3xl border-4 border-white shadow-md shrink-0">
                            {currentStudent.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-lg lg:text-xl font-bold text-gray-900">{currentStudent.name}</h1>
                                    <span className="text-xs text-orange-500 font-medium">{t('Student')}</span>
                                </div>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="touch-target text-gray-400 hover:text-orange-500 transition-colors"
                                >
                                    <Edit3 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Mail className="w-4 h-4 text-gray-400" /> {currentStudent.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-4 h-4 text-gray-400" /> {formData.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 text-gray-400" /> {formData.location}
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                                <p className="text-[10px] text-gray-400">{t('Joined')}</p>
                                <p className="text-sm font-medium text-gray-700">{currentStudent.joinedDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-orange-400" />
                            <div>
                                <p className="text-[10px] text-gray-400">{t('Programs')}</p>
                                <p className="text-sm font-medium text-gray-700">{enrolledPrograms.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <div>
                                <p className="text-[10px] text-gray-400">{t('Status')}</p>
                                <p className="text-sm font-medium text-green-600 capitalize">{currentStudent.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
                <div className="card-mobile p-4">
                    <h2 className="text-base font-bold text-gray-900 mb-4">{t('Personal Information')}</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">{t('Full Name')}</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => handleChange('name', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">{t('Email')}</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">{t('Phone')}</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">{t('Location')}</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={e => handleChange('location', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">{t('Bio')}</label>
                            <textarea
                                value={formData.bio}
                                onChange={e => handleChange('bio', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none"
                            />
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 py-3 gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" /> {t('Save Changes')}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <X className="w-4 h-4" /> {t('Cancel')}
                        </button>
                    </div>

                    {/* Security */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors">
                            <Lock className="w-4 h-4" /> {t('Change Password')}
                        </button>
                    </div>
                </div>
            )}

            {/* Enrolled Programs Quick View */}
            {!isEditing && (
                <div className="card-mobile p-4">
                    <h2 className="text-base font-bold text-gray-900 mb-3">{t('Enrolled Programs')}</h2>
                    <div className="space-y-2">
                        {enrolledPrograms.map(program => {
                            const progress = currentStudent.progress[program.id] || 0;
                            return (
                                <div key={program.id} className="flex items-center gap-3 py-2">
                                    <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                                        <BookOpen className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{program.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-orange-500">{progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Certificates */}
            {!isEditing && (
                <div className="card-mobile p-4">
                    <h2 className="text-base font-bold text-gray-900 mb-3">{t('Certificates')}</h2>
                    {studentCerts.length > 0 ? (
                        <div className="space-y-3">
                            {studentCerts.map((cert) => (
                                <div key={cert.id} className="rounded-xl overflow-hidden border border-gray-100">
                                    <div className="relative p-4 bg-linear-to-br from-amber-50 to-orange-50 border-b border-orange-100">
                                        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                                        <div className="relative flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                <Award className="w-5 h-5 text-orange-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-gray-900 truncate">{cert.programTitle}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] text-gray-500">{cert.issueDate}</span>
                                                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold badge-success">{cert.grade}</span>
                                                    <div className="flex items-center gap-0.5">
                                                        {[1, 2, 3, 4, 5].map(i => (
                                                            <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <button className="w-full py-2 gradient-primary text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                                            <Download className="w-3.5 h-3.5" /> {t('Download PDF')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <Award className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">{t('No certificates yet')}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{t('Complete programs and pass exams to earn certificates')}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
