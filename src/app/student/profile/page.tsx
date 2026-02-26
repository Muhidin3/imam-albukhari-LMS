'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Camera, Shield, Key, Save, Edit3, MapPin, Phone } from 'lucide-react';
import { currentStudent } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function ProfilePage() {
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: currentStudent.name,
        email: currentStudent.email,
        phone: '+1 234 567 8900', // Mock data
        location: 'New York, USA', // Mock data
        bio: 'Dedicated student of Islamic studies, eager to learn and grow in faith and knowledge.'
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Mock save API call
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setIsEditing(false);
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 text-gray-600">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('My Profile')}</h1>
                    <p className="text-gray-500 mt-1">{t('Manage your personal information and preferences')}</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-colors font-medium"
                    >
                        <Edit3 className="w-4 h-4" />
                        {t('Edit Profile')}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Card */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                        <div className="h-32 bg-linear-to-r from-orange-400 to-red-500 relative">
                            {/* Cover photo edit button */}
                            {isEditing && (
                                <button className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm transition-colors cursor-pointer">
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="px-6 pb-6 relative">
                            <div className="relative w-24 h-24 -mt-12 rounded-full border-4 border-white bg-white mx-auto shadow-md">
                                <div className="w-full h-full rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl">
                                    {currentStudent.avatar}
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 p-1.5 bg-gray-900 rounded-full text-white hover:bg-gray-800 transition-colors cursor-pointer">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="text-center mt-4">
                                <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
                                <p className="text-sm text-gray-500 mt-1">Student • {currentStudent.enrolledPrograms.length} Programs</p>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{formData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{formData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{formData.location}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                    >
                        <h3 className="font-semibold text-gray-900 mb-4">{t('Account Status')}</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">{t('Joined Date')}</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {new Date(currentStudent.joinedDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">{t('Status')}</span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    {t('Active')}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Forms */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-orange-500" />
                                <h2 className="text-lg font-bold text-gray-900">{t('Personal Information')}</h2>
                            </div>
                            {saved && (
                                <span className="text-sm text-green-600 flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                                    {t('Saved successfully')}
                                </span>
                            )}
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">{t('Full Name')}</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">{t('Email Address')}</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">{t('Phone Number')}</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">{t('Location')}</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">{t('Bio')}</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            disabled={!isEditing}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors cursor-pointer"
                                        >
                                            {t('Cancel')}
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-6 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-medium shadow-md shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
                                        >
                                            {isSaving ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                            {t('Save Changes')}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>

                    {/* Security Section (Only visible when editing) */}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-gray-900" />
                                    <h2 className="text-lg font-bold text-gray-900">{t('Security Settings')}</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border border-gray-200 rounded-xl p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                            <Key className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{t('Password')}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {t('Change your password to keep your account secure.')}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto shrink-0 cursor-pointer">
                                        {t('Update Password')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
