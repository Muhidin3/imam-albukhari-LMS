'use client';

import { announcements } from '@/lib/data';
import { Bell, Calendar, User, AlertTriangle, Info, Megaphone } from 'lucide-react';

export default function StudentAnnouncements() {
    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'medium': return <Megaphone className="w-4 h-4 text-orange-500" />;
            default: return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                <p className="text-gray-500 text-sm mt-1">Stay updated with the latest news and notifications</p>
            </div>

            <div className="space-y-4">
                {announcements.filter(a => a.targetAudience === 'all' || a.targetAudience === 'students').map((ann) => (
                    <div key={ann.id} className={`bg-white rounded-2xl border p-6 card-hover ${ann.priority === 'high' ? 'border-red-100' : 'border-gray-100'
                        }`}>
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${ann.priority === 'high' ? 'bg-red-50' : ann.priority === 'medium' ? 'bg-orange-50' : 'bg-blue-50'
                                }`}>
                                {getPriorityIcon(ann.priority)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{ann.title}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {ann.author}</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ann.date}</span>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${ann.priority === 'high' ? 'badge-danger' : ann.priority === 'medium' ? 'badge-warning' : 'badge-info'
                                        }`}>{ann.priority}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{ann.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
