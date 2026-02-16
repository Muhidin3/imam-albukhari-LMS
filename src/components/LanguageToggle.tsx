'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors shadow-sm"
            title={language === 'en' ? 'Switch to Amharic' : 'ወደ እንግሊዝኛ ቀይር'}
        >
            <Globe className="w-4 h-4 text-orange-500" />
            <span>{language === 'en' ? 'English' : 'አማርኛ'}</span>
        </button>
    );
}
