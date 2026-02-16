'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'am';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<string, Record<Language, string>> = {
    // Common
    'Dashboard': { en: 'Dashboard', am: 'ዳሽቦርድ' },
    'Programs': { en: 'Programs', am: 'ፕሮግራሞች' },
    'Courses': { en: 'Courses', am: 'ኮርሶች' },
    'Students': { en: 'Students', am: 'ተማሪዎች' },
    'Exams': { en: 'Exams', am: 'ፈተናዎች' },
    'Certificates': { en: 'Certificates', am: 'የምስክር ወረቀቶች' },
    'Announcements': { en: 'Announcements', am: 'ማስታወቂያዎች' },
    'Settings': { en: 'Settings', am: 'ቅንብሮች' },
    'Log Out': { en: 'Log Out', am: 'ውጣ' },
    'Sign Out': { en: 'Sign Out', am: 'ውጣ' },
    'Profile': { en: 'Profile', am: 'መገለጫ' },
    'Search': { en: 'Search', am: 'ፈልግ' },
    'Filter': { en: 'Filter', am: 'አጣራ' },
    'All': { en: 'All', am: 'ሁሉም' },
    'Active': { en: 'Active', am: 'ንቁ' },
    'Inactive': { en: 'Inactive', am: 'ቦዘኔ' },
    'View': { en: 'View', am: 'ተመልከት' },
    'Edit': { en: 'Edit', am: 'አርትዕ' },
    'Delete': { en: 'Delete', am: 'ሰርዝ' },
    'Save': { en: 'Save', am: 'አስቀምጥ' },
    'Cancel': { en: 'Cancel', am: 'አቋርጥ' },
    'Create': { en: 'Create', am: 'ፍጠር' },
    'Add': { en: 'Add', am: 'ጨምር' },
    'Name': { en: 'Name', am: 'ስም' },
    'Email': { en: 'Email', am: 'ኢሜይል' },
    'Phone': { en: 'Phone', am: 'ስልክ' },
    'Role': { en: 'Role', am: 'ሚና' },
    'Status': { en: 'Status', am: 'ሁኔታ' },
    'Action': { en: 'Action', am: 'ድርጊት' },
    'Date': { en: 'Date', am: 'ቀን' },
    'Time': { en: 'Time', am: 'ሰዓት' },
    'Description': { en: 'Description', am: 'መግለጫ' },
    'Title': { en: 'Title', am: 'ርዕስ' },
    'Content': { en: 'Content', am: 'ይዘት' },
    'Author': { en: 'Author', am: 'ደራሲ' },
    'Category': { en: 'Category', am: 'ምድብ' },
    'Type': { en: 'Type', am: 'ዓይነት' },
    'Duration': { en: 'Duration', am: 'ቆይታ' },
    'Level': { en: 'Level', am: 'ደረጃ' },
    'Price': { en: 'Price', am: 'ዋጋ' },
    'Free': { en: 'Free', am: 'ነጻ' },
    'Paid': { en: 'Paid', am: 'የሚከፈልበት' },
    'Enrolled': { en: 'Enrolled', am: 'ተመዝግቧል' },
    'Completed': { en: 'Completed', am: 'ተጠናቀቀ' },
    'In Progress': { en: 'In Progress', am: 'በሂደት ላይ' },
    'Not Started': { en: 'Not Started', am: 'አልተጀመረም' },
    'Passed': { en: 'Passed', am: 'አልፏል' },
    'Failed': { en: 'Failed', am: 'ወድቋል' },
    'Score': { en: 'Score', am: 'ውጤት' },
    'Grade': { en: 'Grade', am: 'ደረጃ' },
    'Certificate': { en: 'Certificate', am: 'የምስክር ወረቀት' },
    'Download': { en: 'Download', am: 'አውርድ' },
    'Upload': { en: 'Upload', am: 'ስቀል' },
    'File': { en: 'File', am: 'ፋይል' },
    'Image': { en: 'Image', am: 'ምስል' },
    'Video': { en: 'Video', am: 'ቪዲዮ' },
    'Audio': { en: 'Audio', am: 'ድምጽ' },
    'Text': { en: 'Text', am: 'ጽሑፍ' },
    'Quiz': { en: 'Quiz', am: 'ኩዊዝ' },
    'Assignment': { en: 'Assignment', am: 'የቤት ሥራ' },
    'Lesson': { en: 'Lesson', am: 'ትምህርት' },
    'Module': { en: 'Module', am: 'ሞዱል' },
    'Course': { en: 'Course', am: 'ኮርስ' },
    'Program': { en: 'Program', am: 'ፕሮግራም' },
    'Student': { en: 'Student', am: 'ተማሪ' },
    'Teacher': { en: 'Teacher', am: 'አስተማሪ' },
    'Admin': { en: 'Admin', am: 'አስተዳዳሪ' },
    'User': { en: 'User', am: 'ተጠቃሚ' },
    'Login': { en: 'Login', am: 'ግባ' },
    'Register': { en: 'Register', am: 'ተመዝገብ' },
    'ForgotPassword': { en: 'Forgot Password?', am: 'የይለፍ ቃል ረሱ?' },
    'ResetPassword': { en: 'Reset Password', am: 'የይለፍ ቃል ዳግም አስጀምር' },
    'Submit': { en: 'Submit', am: 'አስገባ' },
    'Next': { en: 'Next', am: 'ቀጣይ' },
    'Previous': { en: 'Previous', am: 'ቀዳሚ' },
    'Back': { en: 'Back', am: 'ተመለስ' },
    'Home': { en: 'Home', am: 'መነሻ' },
    'About': { en: 'About', am: 'ስለ እኛ' },
    'Contact': { en: 'Contact', am: 'ያግኙን' },
    'Privacy': { en: 'Privacy', am: 'ግላዊነት' },
    'Terms': { en: 'Terms', am: 'ውሎች' },
    'Language': { en: 'Language', am: 'ቋንቋ' },
    'English': { en: 'English', am: 'እንግሊዝኛ' },
    'Amharic': { en: 'Amharic', am: 'አማርኛ' },
    'Class Manager': { en: 'Class Manager', am: 'የክፍል አስተዳዳሪ' },
    'Exam Builder': { en: 'Exam Builder', am: 'ፈተና አዘጋጅ' },
    'Management': { en: 'Management', am: 'አስተዳደር' },
    'My Courses': { en: 'My Courses', am: 'የእኔ ኮርሶች' },
    'Lesson Viewer': { en: 'Lesson Viewer', am: 'ትምህርት መመልከቻ' },
    'Welcome back': { en: 'Welcome back', am: 'እንኳን ደህና መጡ' },
    'Admin Panel': { en: 'Admin Panel', am: 'የአስተዳዳሪ ፓነል' },
    'Student Portal': { en: 'Student Portal', am: 'የተማሪ ፓርታል' },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    // Retrieve language from localStorage on mount
    useEffect(() => {
        const storedLang = localStorage.getItem('language') as Language;
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    // Save language to localStorage on change
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
