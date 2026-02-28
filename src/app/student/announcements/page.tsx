'use client';

import { useState } from 'react';
import { announcements } from '@/lib/data';
import { Bell, Calendar, User, AlertTriangle, Info, Megaphone, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function StudentAnnouncements() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filters = [
        { key: 'all' as const, label: t('All') },
        { key: 'high' as const, label: t('High') },
        { key: 'medium' as const, label: t('Medium') },
        { key: 'low' as const, label: t('Low') },
    ];

    const filteredAnnouncements = announcements
        .filter(a => a.targetAudience === 'all' || a.targetAudience === 'students')
        .filter(a => activeFilter === 'all' || a.priority === activeFilter);

    const getPriorityBorder = (priority: string) => {
        switch (priority) {
            case 'high': return 'border-l-red-400';
            case 'medium': return 'border-l-orange-400';
            default: return 'border-l-gray-300';
        }
    };

    return (
        <div className="space-y-4 animate-fade-in-up">
            <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{t('Announcements')}</h1>
                <p className="text-gray-500 text-sm mt-0.5">{t('Stay updated with the latest news')}</p>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 overflow-x-auto py-1">
                {filters.map((filter) => (
                    <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                        className={`px-4 py-2 rounded-full text-xs font-medium shrink-0 transition-all min-h-[36px] ${
                            activeFilter === filter.key
                                ? 'gradient-primary text-white shadow-sm'
                                : 'bg-white border border-gray-200 text-gray-500 hover:border-orange-200'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Announcement cards */}
            <div className="space-y-2">
                {filteredAnnouncements.map((ann) => {
                    const isExpanded = expandedId === ann.id;
                    return (
                        <div
                            key={ann.id}
                            className={`card-mobile p-4 border-l-4 ${getPriorityBorder(ann.priority)} cursor-pointer`}
                            onClick={() => setExpandedId(isExpanded ? null : ann.id)}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm">{ann.title}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {ann.author}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ann.date}</span>
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${
                                    ann.priority === 'high' ? 'bg-red-50 text-red-500' :
                                    ann.priority === 'medium' ? 'bg-orange-50 text-orange-500' :
                                    'bg-gray-50 text-gray-500'
                                }`}>
                                    {t(ann.priority.charAt(0).toUpperCase() + ann.priority.slice(1))}
                                </span>
                            </div>
                            <p className={`text-sm text-gray-600 mt-2 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                                {ann.content}
                            </p>
                            {ann.content.length > 100 && (
                                <button className="text-xs text-orange-500 mt-1 font-medium flex items-center gap-0.5">
                                    {isExpanded ? (
                                        <>{t('Show less')} <ChevronUp className="w-3 h-3" /></>
                                    ) : (
                                        <>{t('Read more')} <ChevronDown className="w-3 h-3" /></>
                                    )}
                                </button>
                            )}
                        </div>
                    );
                })}

                {filteredAnnouncements.length === 0 && (
                    <div className="text-center py-12">
                        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">{t('No announcements found')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
