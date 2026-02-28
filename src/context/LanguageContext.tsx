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
    'Continue Learning': { en: 'Continue Learning', am: 'መማርዎን ይቀጥሉ' },
    'Continue Lesson': { en: 'Continue Lesson', am: 'ትምህርቱን ቀጥል' },
    'Continue your learning journey': { en: 'Continue your learning journey', am: 'የመማር ጉዞዎን ይቀጥሉ' },
    'See All': { en: 'See All', am: 'ሁሉንም ይመልከቱ' },
    'Read more': { en: 'Read more', am: 'ተጨማሪ ያንብቡ' },
    'Show less': { en: 'Show less', am: 'ያነሰ ያሳዩ' },
    'Contents': { en: 'Contents', am: 'ይዘቶች' },
    'More': { en: 'More', am: 'ተጨማሪ' },
    'Start Learning': { en: 'Start Learning', am: 'መማር ይጀምሩ' },
    'Streak': { en: 'Streak', am: 'ተከታታይ' },
    'Recent Scores': { en: 'Recent Scores', am: 'የቅርብ ውጤቶች' },
    'Mark Complete': { en: 'Mark Complete', am: 'ያጠናቅቁ' },
    'Prev': { en: 'Prev', am: 'ቀዳሚ' },
    'View your enrolled programs and progress': { en: 'View your enrolled programs and progress', am: 'የተመዘገቡበትን ፕሮግራሞች እና ሂደት ይመልከቱ' },
    'Stay updated with the latest news': { en: 'Stay updated with the latest news', am: 'በዘመናዊ ዜናዎች ይከታተሉ' },
    'View and download your earned certificates': { en: 'View and download your earned certificates', am: 'የተገኙ ሰርቲፊኬቶችን ይመልከቱ እና ያውርዱ' },
    'Select a program to start learning': { en: 'Select a program to start learning', am: 'ለመማር ፕሮግራም ይምረጡ' },
    'Avg': { en: 'Avg', am: 'አማካይ' },
    'active': { en: 'active', am: 'ንቁ' },
    'High': { en: 'High', am: 'ከፍተኛ' },
    'Medium': { en: 'Medium', am: 'መካከለኛ' },
    'Low': { en: 'Low', am: 'ዝቅተኛ' },
    'Earned': { en: 'Earned', am: 'የተገኘ' },
    'Exams Passed': { en: 'Exams Passed', am: 'ያለፉ ፈተናዎች' },
    'Earned Certificates': { en: 'Earned Certificates', am: 'የተገኙ ሰርቲፊኬቶች' },
    'No certificates yet': { en: 'No certificates yet', am: 'ገና ሰርቲፊኬት የለም' },
    'Complete programs and pass exams to earn certificates': { en: 'Complete programs and pass exams to earn certificates', am: 'ሰርቲፊኬቶችን ለማግኘት ፕሮግራሞችን ያጠናቅቁ' },
    'How to Earn a Certificate': { en: 'How to Earn a Certificate', am: 'ሰርቲፊኬት እንዴት ማግኘት ይቻላል' },
    'Complete Chapters': { en: 'Complete Chapters', am: 'ምዕራፎችን ያጠናቅቁ' },
    'Finish all chapters in the program': { en: 'Finish all chapters in the program', am: 'በፕሮግራሙ ውስጥ ሁሉንም ምዕራፎች ያጠናቅቁ' },
    'Pass the Exam': { en: 'Pass the Exam', am: 'ፈተናውን ያልፉ' },
    'Score above the passing threshold': { en: 'Score above the passing threshold', am: 'ከማለፊያ ውጤት በላይ ያስመዝግቡ' },
    'Your certificate will be auto-generated': { en: 'Your certificate will be auto-generated', am: 'ሰርቲፊኬትዎ በራስ ሰር ይፈጠራል' },
    'Download PDF': { en: 'Download PDF', am: 'PDF አውርድ' },
    'Joined': { en: 'Joined', am: 'ተቀላቀሉ' },
    'Personal Information': { en: 'Personal Information', am: 'የግል መረጃ' },
    'Full Name': { en: 'Full Name', am: 'ሙሉ ስም' },
    'Save Changes': { en: 'Save Changes', am: 'ለውጦችን ያስቀምጡ' },
    'Change Password': { en: 'Change Password', am: 'የይለፍ ቃል ቀይር' },
    'Enrolled Programs': { en: 'Enrolled Programs', am: 'የተመዘገቡ ፕሮግራሞች' },
    'Final Exam': { en: 'Final Exam', am: 'የመጨረሻ ፈተና' },
    'Ready to take!': { en: 'Ready to take!', am: 'ለመውሰድ ዝግጁ!' },
    'Available': { en: 'Available', am: 'ይገኛል' },
    'Locked': { en: 'Locked', am: 'ተቆልፏል' },
    'No chapters available for this program yet.': { en: 'No chapters available for this program yet.', am: 'ለዚህ ፕሮግራም ገና ምዕራፎች የሉም።' },
    'Explore Programs': { en: 'Explore Programs', am: 'ፕሮግራሞችን ያስሱ' },
    'Discover new programs to expand your knowledge': { en: 'Discover new programs to expand your knowledge', am: 'እውቀትዎን ለማስፋት አዳዲስ ፕሮግራሞችን ያግኙ' },
    'Upcoming': { en: 'Upcoming', am: 'መጪ' },
    'Chapters': { en: 'Chapters', am: 'ምዕራፎች' },
    'Progress': { en: 'Progress', am: 'ሂደት' },
    'No Programs': { en: 'No Programs', am: 'ፕሮግራሞች የሉም' },
    'Lessons': { en: 'Lessons', am: 'ትምህርቶች' },
    'Tests': { en: 'Tests', am: 'ፈተናዎች' },
    'Location': { en: 'Location', am: 'አድራሻ' },
    'Bio': { en: 'Bio', am: 'ስለራስ' },
    'No announcements found': { en: 'No announcements found', am: 'ማስታወቂያዎች አልተገኙም' },
    'No announcements for this program': { en: 'No announcements for this program.', am: 'ለዚህ ፕሮግራም ማስታወቂያ የለም።' },
    'No tests available yet': { en: 'No tests available yet.', am: 'ገና ፈተናዎች የሉም።' },
    'No lessons available yet': { en: 'No lessons available yet.', am: 'ገና ትምህርቶች የሉም።' },
    'Not enrolled yet': { en: 'You are not enrolled in any programs yet.', am: 'ገና በምንም ፕሮግራም አልተመዘገቡም።' },
    'No enrolled programs yet': { en: "You don't have any enrolled programs yet.", am: 'ገና የተመዘገቡበት ፕሮግራም የለም።' },
    'Program not found': { en: 'Program not found', am: 'ፕሮግራም አልተገኘም' },
    'Certificate of Completion': { en: 'Certificate of Completion', am: 'የማጠናቀቂያ ሰርቲፊኬት' },
    'credits': { en: 'credits', am: 'ክሬዲቶች' },
    'done': { en: 'done', am: 'ተጠናቋል' },
    'lessons': { en: 'lessons', am: 'ትምህርቶች' },
    'chapters': { en: 'chapters', am: 'ምዕራፎች' },
    'PDF Viewer': { en: 'PDF Viewer', am: 'PDF መመልከቻ' },
    'Assalamu Alaikum': { en: 'Assalamu Alaikum', am: 'አሰላሙ ዓለይኩም' },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    // Retrieve language from localStorage on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const storedLang = localStorage.getItem('language') as Language;
        if (storedLang && (storedLang === 'en' || storedLang === 'am')) {
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
