// ==============================
// MOCK DATA FOR LMS
// ==============================

export interface Program {
  id: string;
  title: string;
  titleAr: string;
  titleAm?: string;
  description: string;
  descriptionAm?: string;
  duration: string;
  level: string;
  type: 'degree' | 'short-term';
  enrolledStudents: number;
  totalCourses: number;
  image: string;
  status: 'active' | 'upcoming' | 'completed';
  courses: Course[];
}

export interface Course {
  id: string;
  programId: string;
  title: string;
  titleAm?: string;
  description: string;
  descriptionAm?: string;
  instructor: string;
  duration: string;
  modules: Module[];
  progress?: number;
  totalLessons: number;
  completedLessons?: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: 'video' | 'audio' | 'pdf' | 'text';
  duration: string;
  completed?: boolean;
  content?: string;
  url?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledPrograms: string[];
  classId?: string;
  progress: Record<string, number>;
  joinedDate: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  avatar: string;
  specialization: string;
  assignedClasses: string[];
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface Exam {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number;
  questions: Question[];
  status: 'draft' | 'published' | 'archived';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  programTitle: string;
  courseTitle: string;
  issueDate: string;
  grade: string;
  templateId: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: 'all' | 'students' | 'specific-class' | 'specific-program';
  classId?: string;
  programId?: string;
  authorId?: string;
  authorRole?: 'admin' | 'teacher';
}

export interface ClassGroup {
  id: string;
  name: string;
  programId: string;
  programTitle: string;
  schedule: string;
  studentCount: number;
  studentIds: string[];
  instructor: string;
  teacherId?: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  bgColor: string;
  borderStyle: string;
  createdAt: string;
}

// ==============================
// PROGRAMS
// ==============================
export const programs: Program[] = [
  {
    id: 'prog-1',
    title: 'Fundamentals of Islamic Studies',
    titleAr: 'أساسيات الدراسات الإسلامية',
    titleAm: 'የእስልምና ጥናቶች መሰረታዊ',
    description: 'A comprehensive introduction to Islamic knowledge covering Aqeedah, Fiqh, Seerah, and essential Arabic. This program is designed for beginners seeking a solid foundation in Islamic studies.',
    descriptionAm: 'የእስልምና እውቀት አጠቃላይ መግቢያ፣ አቂዳ፣ ፊቅህ፣ ሲራ እና መሰረታዊ አረብኛን ያካትታል። ይህ ፕሮግራም በእስልምና ጥናቶች ጠንካራ መሰረት ለሚፈልጉ ጀማሪዎች የተዘጋጀ ነው።',
    duration: '6 months',
    level: 'Bachelor',
    type: 'degree',
    enrolledStudents: 245,
    totalCourses: 4,
    image: '/programs/islamic-studies.jpg',
    status: 'active',
    courses: [
      {
        id: 'course-1',
        programId: 'prog-1',
        title: 'Introduction to Aqeedah',
        titleAm: 'የአቂዳ መግቢያ',
        description: 'Learn the core beliefs of a Muslim including Tawheed, Angels, Prophets, and the Day of Judgment.',
        descriptionAm: 'የሙስሊም ዋና እምነቶችን ተውሂድ፣ መላእክት፣ ነቢያት እና የፍርድ ቀን ተማር።',
        instructor: 'Sheikh Ahmad Al-Farsi',
        duration: '6 weeks',
        totalLessons: 18,
        completedLessons: 12,
        progress: 67,
        modules: [
          {
            id: 'mod-1',
            courseId: 'course-1',
            title: 'Pillars of Iman',
            order: 1,
            lessons: [
              { id: 'les-1', moduleId: 'mod-1', title: 'Belief in Allah', type: 'video', duration: '45 min', completed: true },
              { id: 'les-2', moduleId: 'mod-1', title: 'Belief in Angels', type: 'video', duration: '38 min', completed: true },
              { id: 'les-3', moduleId: 'mod-1', title: 'Belief in Holy Books', type: 'audio', duration: '30 min', completed: true },
              { id: 'les-4', moduleId: 'mod-1', title: 'Belief in Prophets', type: 'video', duration: '42 min', completed: true },
              { id: 'les-5', moduleId: 'mod-1', title: 'Belief in Day of Judgment', type: 'pdf', duration: '25 min', completed: true },
              { id: 'les-6', moduleId: 'mod-1', title: 'Belief in Qadr', type: 'video', duration: '40 min', completed: true },
            ]
          },
          {
            id: 'mod-2',
            courseId: 'course-1',
            title: 'Tawheed - Oneness of Allah',
            order: 2,
            lessons: [
              { id: 'les-7', moduleId: 'mod-2', title: 'Tawheed Al-Rububiyyah', type: 'video', duration: '50 min', completed: true },
              { id: 'les-8', moduleId: 'mod-2', title: 'Tawheed Al-Uluhiyyah', type: 'video', duration: '48 min', completed: true },
              { id: 'les-9', moduleId: 'mod-2', title: 'Tawheed Al-Asma wa Sifat', type: 'audio', duration: '35 min', completed: true },
              { id: 'les-10', moduleId: 'mod-2', title: 'Types of Shirk', type: 'video', duration: '55 min', completed: true },
              { id: 'les-11', moduleId: 'mod-2', title: 'Protecting Tawheed', type: 'pdf', duration: '20 min', completed: true },
              { id: 'les-12', moduleId: 'mod-2', title: 'Summary & Review', type: 'text', duration: '15 min', completed: true },
            ]
          },
          {
            id: 'mod-3',
            courseId: 'course-1',
            title: 'Common Misconceptions',
            order: 3,
            lessons: [
              { id: 'les-13', moduleId: 'mod-3', title: 'Understanding Bid\'ah', type: 'video', duration: '45 min', completed: false },
              { id: 'les-14', moduleId: 'mod-3', title: 'Superstitions vs Faith', type: 'video', duration: '40 min', completed: false },
              { id: 'les-15', moduleId: 'mod-3', title: 'Intercession in Islam', type: 'audio', duration: '30 min', completed: false },
              { id: 'les-16', moduleId: 'mod-3', title: 'Understanding Tawakkul', type: 'video', duration: '35 min', completed: false },
              { id: 'les-17', moduleId: 'mod-3', title: 'Contemporary Issues', type: 'pdf', duration: '25 min', completed: false },
              { id: 'les-18', moduleId: 'mod-3', title: 'Final Review & Q&A', type: 'text', duration: '20 min', completed: false },
            ]
          }
        ]
      },
      {
        id: 'course-2',
        programId: 'prog-1',
        title: 'Essentials of Fiqh',
        description: 'Learn the practical aspects of Islamic jurisprudence covering prayer, fasting, zakah, and hajj.',
        instructor: 'Sheikh Ibrahim Al-Bakri',
        duration: '8 weeks',
        totalLessons: 24,
        completedLessons: 8,
        progress: 33,
        modules: [
          {
            id: 'mod-4',
            courseId: 'course-2',
            title: 'Taharah (Purification)',
            order: 1,
            lessons: [
              { id: 'les-19', moduleId: 'mod-4', title: 'Types of Water', type: 'video', duration: '30 min', completed: true },
              { id: 'les-20', moduleId: 'mod-4', title: 'Wudu - Step by Step', type: 'video', duration: '45 min', completed: true },
              { id: 'les-21', moduleId: 'mod-4', title: 'Ghusl & Tayammum', type: 'video', duration: '40 min', completed: true },
              { id: 'les-22', moduleId: 'mod-4', title: 'Nullifiers of Wudu', type: 'audio', duration: '25 min', completed: true },
            ]
          },
          {
            id: 'mod-5',
            courseId: 'course-2',
            title: 'Salah (Prayer)',
            order: 2,
            lessons: [
              { id: 'les-23', moduleId: 'mod-5', title: 'Conditions of Salah', type: 'video', duration: '50 min', completed: true },
              { id: 'les-24', moduleId: 'mod-5', title: 'Pillars of Salah', type: 'video', duration: '55 min', completed: true },
              { id: 'les-25', moduleId: 'mod-5', title: 'Obligatory Acts', type: 'audio', duration: '35 min', completed: true },
              { id: 'les-26', moduleId: 'mod-5', title: 'Sunnah Acts', type: 'pdf', duration: '20 min', completed: true },
            ]
          },
          {
            id: 'mod-6',
            courseId: 'course-2',
            title: 'Siyam (Fasting)',
            order: 3,
            lessons: [
              { id: 'les-27', moduleId: 'mod-6', title: 'Rulings of Fasting', type: 'video', duration: '45 min', completed: false },
              { id: 'les-28', moduleId: 'mod-6', title: 'What Breaks the Fast', type: 'video', duration: '38 min', completed: false },
            ]
          }
        ]
      },
      {
        id: 'course-3',
        programId: 'prog-1',
        title: 'Seerah of the Prophet ﷺ',
        description: 'A chronological study of the life of Prophet Muhammad ﷺ from birth to the farewell pilgrimage.',
        instructor: 'Dr. Fatimah Al-Zahra',
        duration: '10 weeks',
        totalLessons: 30,
        completedLessons: 0,
        progress: 0,
        modules: [
          {
            id: 'mod-7',
            courseId: 'course-3',
            title: 'Pre-Islamic Arabia',
            order: 1,
            lessons: [
              { id: 'les-29', moduleId: 'mod-7', title: 'The Arabian Peninsula', type: 'video', duration: '40 min', completed: false },
              { id: 'les-30', moduleId: 'mod-7', title: 'Religious Landscape', type: 'video', duration: '35 min', completed: false },
            ]
          }
        ]
      },
      {
        id: 'course-4',
        programId: 'prog-1',
        title: 'Arabic for Beginners',
        description: 'Learn to read and understand basic Arabic to enhance your connection with the Quran.',
        instructor: 'Ustadha Maryam Hassan',
        duration: '12 weeks',
        totalLessons: 36,
        completedLessons: 0,
        progress: 0,
        modules: [
          {
            id: 'mod-8',
            courseId: 'course-4',
            title: 'Arabic Alphabet',
            order: 1,
            lessons: [
              { id: 'les-31', moduleId: 'mod-8', title: 'Letters Alif to Tha', type: 'video', duration: '30 min', completed: false },
              { id: 'les-32', moduleId: 'mod-8', title: 'Letters Jim to Kha', type: 'video', duration: '30 min', completed: false },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'prog-2',
    title: 'Advanced Hadith Sciences',
    titleAr: 'علوم الحديث المتقدمة',
    description: 'Deep dive into the science of Hadith including classification, authentication, and scholarly methodology. For students with prior Islamic knowledge.',
    duration: '9 months',
    level: 'Advanced',
    type: 'short-term',
    enrolledStudents: 128,
    totalCourses: 3,
    image: '/programs/hadith.jpg',
    status: 'active',
    courses: [
      {
        id: 'course-5',
        programId: 'prog-2',
        title: 'Mustalah Al-Hadith',
        description: 'Understanding the terminology and methodology of Hadith science.',
        instructor: 'Dr. Muhammad Al-Azhari',
        duration: '12 weeks',
        totalLessons: 36,
        completedLessons: 20,
        progress: 56,
        modules: [
          {
            id: 'mod-9',
            courseId: 'course-5',
            title: 'Introduction to Hadith Sciences',
            order: 1,
            lessons: [
              { id: 'les-33', moduleId: 'mod-9', title: 'What is Hadith?', type: 'video', duration: '45 min', completed: true },
              { id: 'les-34', moduleId: 'mod-9', title: 'Isnad & Matn', type: 'video', duration: '50 min', completed: true },
              { id: 'les-35', moduleId: 'mod-9', title: 'Classifications Overview', type: 'audio', duration: '35 min', completed: true },
            ]
          }
        ]
      },
      {
        id: 'course-6',
        programId: 'prog-2',
        title: 'Sahih Al-Bukhari Study',
        description: 'A detailed study of selected chapters from Sahih Al-Bukhari.',
        instructor: 'Sheikh Ahmad Al-Farsi',
        duration: '16 weeks',
        totalLessons: 48,
        completedLessons: 0,
        progress: 0,
        modules: [
          {
            id: 'mod-10',
            courseId: 'course-6',
            title: 'Book of Revelation',
            order: 1,
            lessons: [
              { id: 'les-36', moduleId: 'mod-10', title: 'How Revelation Began', type: 'video', duration: '60 min', completed: false },
              { id: 'les-37', moduleId: 'mod-10', title: 'The First Revelation', type: 'video', duration: '55 min', completed: false },
            ]
          }
        ]
      },
      {
        id: 'course-7',
        programId: 'prog-2',
        title: 'Hadith Authentication Methods',
        description: 'Practical techniques for evaluating the authenticity of narrations.',
        instructor: 'Dr. Muhammad Al-Azhari',
        duration: '10 weeks',
        totalLessons: 30,
        completedLessons: 0,
        progress: 0,
        modules: [
          {
            id: 'mod-11',
            courseId: 'course-7',
            title: 'Narrator Evaluation',
            order: 1,
            lessons: [
              { id: 'les-38', moduleId: 'mod-11', title: 'Jarh wa Ta\'dil', type: 'video', duration: '50 min', completed: false },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'prog-3',
    title: 'Quran Memorization & Tajweed',
    titleAr: 'حفظ القرآن والتجويد',
    description: 'Structured program for Quran memorization with proper Tajweed rules and regular assessment sessions.',
    duration: '12 months',
    level: 'All Levels',
    type: 'short-term',
    enrolledStudents: 380,
    totalCourses: 3,
    image: '/programs/quran.jpg',
    status: 'active',
    courses: [
      {
        id: 'course-8',
        programId: 'prog-3',
        title: 'Tajweed Rules',
        description: 'Complete guide to proper Quran recitation rules.',
        instructor: 'Qari Abdullah Mansoor',
        duration: '8 weeks',
        totalLessons: 24,
        completedLessons: 24,
        progress: 100,
        modules: [
          {
            id: 'mod-12',
            courseId: 'course-8',
            title: 'Makharij Al-Huruf',
            order: 1,
            lessons: [
              { id: 'les-39', moduleId: 'mod-12', title: 'Throat Letters', type: 'video', duration: '40 min', completed: true },
              { id: 'les-40', moduleId: 'mod-12', title: 'Tongue Letters', type: 'video', duration: '45 min', completed: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'prog-4',
    title: 'Islamic Finance & Ethics',
    titleAr: 'المالية الإسلامية والأخلاق',
    description: 'Understanding financial transactions from an Islamic perspective. Covers halal investments, Islamic banking, and business ethics.',
    duration: '4 months',
    level: 'Intermediate',
    type: 'short-term',
    enrolledStudents: 95,
    totalCourses: 2,
    image: '/programs/finance.jpg',
    status: 'upcoming',
    courses: []
  },
  {
    id: 'prog-5',
    title: 'Islamic History & Civilization',
    titleAr: 'التاريخ والحضارة الإسلامية',
    description: 'From the Golden Age of Islam to modern times. Explore the contributions of Muslim scholars, scientists, and leaders.',
    duration: '8 months',
    level: 'Intermediate',
    type: 'short-term',
    enrolledStudents: 156,
    totalCourses: 4,
    image: '/programs/history.jpg',
    status: 'active',
    courses: []
  },
  {
    id: 'prog-6',
    title: 'Youth Islamic Development',
    titleAr: 'التنمية الشبابية الإسلامية',
    description: 'Specially designed for young Muslims to learn about their faith in an engaging, age-appropriate manner.',
    duration: '3 months',
    level: 'Beginner',
    type: 'short-term',
    enrolledStudents: 210,
    totalCourses: 3,
    image: '/programs/youth.jpg',
    status: 'active',
    courses: []
  }
];

// ==============================
// STUDENTS
// ==============================
export const students: Student[] = [
  { id: 'stu-1', name: 'Ahmad ibn Khalid', email: 'ahmad@example.com', avatar: '👨‍🎓', enrolledPrograms: ['prog-1', 'prog-2'], classId: 'class-1', progress: { 'prog-1': 45, 'prog-2': 28 }, joinedDate: '2025-09-01', status: 'active' },
  { id: 'stu-2', name: 'Fatimah Al-Noor', email: 'fatimah@example.com', avatar: '👩‍🎓', enrolledPrograms: ['prog-1', 'prog-3'], classId: 'class-1', progress: { 'prog-1': 72, 'prog-3': 100 }, joinedDate: '2025-08-15', status: 'active' },
  { id: 'stu-3', name: 'Omar Hassan', email: 'omar@example.com', avatar: '👨‍🎓', enrolledPrograms: ['prog-1'], classId: 'class-1', progress: { 'prog-1': 30 }, joinedDate: '2025-10-01', status: 'active' },
  { id: 'stu-4', name: 'Aisha Siddiqui', email: 'aisha@example.com', avatar: '👩‍🎓', enrolledPrograms: ['prog-2', 'prog-3'], classId: 'class-2', progress: { 'prog-2': 85, 'prog-3': 60 }, joinedDate: '2025-07-20', status: 'active' },
  { id: 'stu-5', name: 'Yusuf Al-Mahmoud', email: 'yusuf@example.com', avatar: '👨‍🎓', enrolledPrograms: ['prog-1', 'prog-2', 'prog-3'], classId: 'class-2', progress: { 'prog-1': 90, 'prog-2': 45, 'prog-3': 30 }, joinedDate: '2025-06-10', status: 'active' },
  { id: 'stu-6', name: 'Khadijah Bint Amr', email: 'khadijah@example.com', avatar: '👩‍🎓', enrolledPrograms: ['prog-3'], classId: 'class-3', progress: { 'prog-3': 55 }, joinedDate: '2025-09-15', status: 'active' },
  { id: 'stu-7', name: 'Ibrahim Al-Rashid', email: 'ibrahim@example.com', avatar: '👨‍🎓', enrolledPrograms: ['prog-1'], classId: 'class-1', progress: { 'prog-1': 15 }, joinedDate: '2025-11-01', status: 'inactive' },
  { id: 'stu-8', name: 'Maryam Al-Hashimi', email: 'maryam@example.com', avatar: '👩‍🎓', enrolledPrograms: ['prog-2'], classId: 'class-2', progress: { 'prog-2': 65 }, joinedDate: '2025-08-01', status: 'active' },
  { id: 'stu-9', name: 'Bilal Osman', email: 'bilal@example.com', avatar: '👨‍🎓', enrolledPrograms: ['prog-1', 'prog-3'], classId: 'class-3', progress: { 'prog-1': 50, 'prog-3': 80 }, joinedDate: '2025-07-01', status: 'active' },
  { id: 'stu-10', name: 'Zainab Al-Ali', email: 'zainab@example.com', avatar: '👩‍🎓', enrolledPrograms: ['prog-1'], progress: { 'prog-1': 10 }, joinedDate: '2025-12-01', status: 'active' },
];

// ==============================
// TEACHERS
// ==============================
export const teachers: Teacher[] = [
  { id: 'tea-1', name: 'Sheikh Ahmad Al-Farsi', email: 'ahmad.farsi@example.com', avatar: '👨‍🏫', specialization: 'Aqeedah & Fiqh', assignedClasses: ['class-1'], joinedDate: '2024-01-10', status: 'active' },
  { id: 'tea-2', name: 'Dr. Muhammad Al-Azhari', email: 'muhammad.azhari@example.com', avatar: '👨‍🏫', specialization: 'Hadith Sciences', assignedClasses: ['class-2'], joinedDate: '2024-03-15', status: 'active' },
  { id: 'tea-3', name: 'Qari Abdullah Mansoor', email: 'abdullah.mansoor@example.com', avatar: '👨‍🏫', specialization: 'Quran & Tajweed', assignedClasses: ['class-3'], joinedDate: '2024-05-20', status: 'active' },
];

// ==============================
// EXAMS
// ==============================
export const exams: Exam[] = [
  {
    id: 'exam-1',
    courseId: 'course-1',
    title: 'Aqeedah Fundamentals - Midterm',
    description: 'Mid-term examination covering Pillars of Iman and Tawheed',
    duration: 45,
    totalQuestions: 10,
    passingScore: 70,
    status: 'published',
    questions: [
      { id: 'q-1', text: 'How many pillars of Iman are there in Islam?', options: ['4', '5', '6', '7'], correctAnswer: 2, points: 10 },
      { id: 'q-2', text: 'What is Tawheed Al-Rububiyyah?', options: ['Oneness of worship', 'Oneness of Lordship', 'Oneness of names', 'Unity of Muslims'], correctAnswer: 1, points: 10 },
      { id: 'q-3', text: 'Which of the following is NOT a pillar of Iman?', options: ['Belief in Angels', 'Belief in Jinn', 'Belief in Qadr', 'Belief in Prophets'], correctAnswer: 1, points: 10 },
      { id: 'q-4', text: 'What does Tawheed Al-Uluhiyyah refer to?', options: ['Allah is the only Lord', 'Allah has beautiful names', 'Allah alone deserves worship', 'Allah controls everything'], correctAnswer: 2, points: 10 },
      { id: 'q-5', text: 'The belief in predestination is called:', options: ['Tawakkul', 'Qadr', 'Rizq', 'Hidayah'], correctAnswer: 1, points: 10 },
      { id: 'q-6', text: 'How many holy books are mentioned in the Quran by name?', options: ['2', '3', '4', '5'], correctAnswer: 2, points: 10 },
      { id: 'q-7', text: 'What is the opposite of Tawheed?', options: ['Kufr', 'Shirk', 'Nifaq', 'Bid\'ah'], correctAnswer: 1, points: 10 },
      { id: 'q-8', text: 'Which category of Tawheed deals with Allah\'s names and attributes?', options: ['Al-Rububiyyah', 'Al-Uluhiyyah', 'Al-Asma wa Sifat', 'Al-Hakimiyyah'], correctAnswer: 2, points: 10 },
      { id: 'q-9', text: 'Iman increases with:', options: ['Good deeds', 'Knowledge only', 'Age', 'Wealth'], correctAnswer: 0, points: 10 },
      { id: 'q-10', text: 'The first pillar of Iman is belief in:', options: ['Angels', 'Prophets', 'Allah', 'Day of Judgment'], correctAnswer: 2, points: 10 },
    ]
  },
  {
    id: 'exam-2',
    courseId: 'course-2',
    title: 'Fiqh of Salah - Quiz',
    description: 'Quick assessment on the rulings of prayer',
    duration: 30,
    totalQuestions: 8,
    passingScore: 75,
    status: 'published',
    questions: [
      { id: 'q-11', text: 'How many obligatory prayers are there daily?', options: ['3', '4', '5', '6'], correctAnswer: 2, points: 12.5 },
      { id: 'q-12', text: 'What is required before performing Salah?', options: ['Eating', 'Wudu', 'Exercise', 'Sleeping'], correctAnswer: 1, points: 12.5 },
      { id: 'q-13', text: 'In which direction do Muslims pray?', options: ['North', 'East', 'Qibla', 'West'], correctAnswer: 2, points: 12.5 },
      { id: 'q-14', text: 'What breaks the Wudu?', options: ['Talking', 'Sleeping deeply', 'Walking', 'Reading'], correctAnswer: 1, points: 12.5 },
      { id: 'q-15', text: 'How many Rak\'at is Fajr prayer?', options: ['2', '3', '4', '1'], correctAnswer: 0, points: 12.5 },
      { id: 'q-16', text: 'What is Tayammum?', options: ['Dry ablution', 'Full bath', 'Partial wash', 'Meditation'], correctAnswer: 0, points: 12.5 },
      { id: 'q-17', text: 'Sujood is prostration to:', options: ['The Kaaba', 'The ground', 'Allah', 'The Imam'], correctAnswer: 2, points: 12.5 },
      { id: 'q-18', text: 'What do you say at the start of Salah?', options: ['Bismillah', 'Allahu Akbar', 'Assalamu Alaikum', 'SubhanAllah'], correctAnswer: 1, points: 12.5 },
    ]
  },
  {
    id: 'exam-3',
    courseId: 'course-5',
    title: 'Hadith Sciences - Comprehensive',
    description: 'Final examination on Hadith terminology and classification',
    duration: 60,
    totalQuestions: 5,
    passingScore: 80,
    status: 'published',
    questions: [
      { id: 'q-19', text: 'What is the Isnad of a Hadith?', options: ['The text', 'The chain of narrators', 'The meaning', 'The source book'], correctAnswer: 1, points: 20 },
      { id: 'q-20', text: 'A Hadith classified as "Sahih" means it is:', options: ['Fabricated', 'Weak', 'Authentic', 'Unknown'], correctAnswer: 2, points: 20 },
      { id: 'q-21', text: 'Who compiled Sahih Al-Bukhari?', options: ['Imam Muslim', 'Imam Al-Bukhari', 'Imam Malik', 'Imam Ahmad'], correctAnswer: 1, points: 20 },
      { id: 'q-22', text: 'What is a "Mutawatir" Hadith?', options: ['Weak hadith', 'Hadith narrated by many', 'Fabricated hadith', 'Short hadith'], correctAnswer: 1, points: 20 },
      { id: 'q-23', text: 'The "Matn" of a Hadith refers to:', options: ['The narrators', 'The text/content', 'The book', 'The grade'], correctAnswer: 1, points: 20 },
    ]
  },
  {
    id: 'exam-4',
    courseId: 'course-1',
    title: 'Aqeedah Final Exam',
    description: 'Comprehensive final examination',
    duration: 90,
    totalQuestions: 5,
    passingScore: 70,
    status: 'draft',
    questions: [
      { id: 'q-24', text: 'Draft question 1', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, points: 20 },
      { id: 'q-25', text: 'Draft question 2', options: ['A', 'B', 'C', 'D'], correctAnswer: 1, points: 20 },
      { id: 'q-26', text: 'Draft question 3', options: ['A', 'B', 'C', 'D'], correctAnswer: 2, points: 20 },
      { id: 'q-27', text: 'Draft question 4', options: ['A', 'B', 'C', 'D'], correctAnswer: 3, points: 20 },
      { id: 'q-28', text: 'Draft question 5', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, points: 20 },
    ]
  }
];

// ==============================
// CERTIFICATES
// ==============================
export const certificates: Certificate[] = [
  { id: 'cert-1', studentId: 'stu-2', studentName: 'Fatimah Al-Noor', programTitle: 'Quran Memorization & Tajweed', courseTitle: 'Tajweed Rules', issueDate: '2026-01-15', grade: 'A', templateId: 'tmpl-1' },
  { id: 'cert-2', studentId: 'stu-5', studentName: 'Yusuf Al-Mahmoud', programTitle: 'Fundamentals of Islamic Studies', courseTitle: 'Introduction to Aqeedah', issueDate: '2026-01-20', grade: 'A+', templateId: 'tmpl-1' },
  { id: 'cert-3', studentId: 'stu-4', studentName: 'Aisha Siddiqui', programTitle: 'Advanced Hadith Sciences', courseTitle: 'Mustalah Al-Hadith', issueDate: '2025-12-10', grade: 'B+', templateId: 'tmpl-2' },
];

// ==============================
// CERTIFICATE TEMPLATES
// ==============================
export const certificateTemplates: CertificateTemplate[] = [
  { id: 'tmpl-1', name: 'Classic Gold', description: 'Elegant gold border with Islamic geometric pattern', bgColor: '#FFF8E7', borderStyle: 'double', createdAt: '2025-06-01' },
  { id: 'tmpl-2', name: 'Modern Orange', description: 'Clean modern design with orange accents', bgColor: '#FFF5EB', borderStyle: 'solid', createdAt: '2025-07-15' },
  { id: 'tmpl-3', name: 'Royal Green', description: 'Traditional green theme with calligraphy border', bgColor: '#F0FFF0', borderStyle: 'groove', createdAt: '2025-08-20' },
];

// ==============================
// ANNOUNCEMENTS
// ==============================
export const announcements: Announcement[] = [
  { id: 'ann-1', title: 'Ramadan Schedule Updates', content: 'Dear students, please note the revised class schedule during the blessed month of Ramadan. All evening classes will be moved to after Taraweeh prayers. Please check your dashboard for updated timings.', author: 'Admin Office', date: '2026-02-10', priority: 'high', targetAudience: 'all' },
  { id: 'ann-2', title: 'New Program: Islamic Finance & Ethics', content: 'We are excited to announce our upcoming program on Islamic Finance & Ethics. Registration opens next month. Early bird discounts available for current students.', author: 'Program Director', date: '2026-02-08', priority: 'medium', targetAudience: 'all' },
  { id: 'ann-3', title: 'Exam Week Reminder', content: 'Midterm examinations for the Fundamentals of Islamic Studies program will begin next week. Please ensure you have completed all prerequisite lessons before attempting the exam.', author: 'Academic Affairs', date: '2026-02-05', priority: 'high', targetAudience: 'students' },
  { id: 'ann-4', title: 'Library Resources Updated', content: 'New digital resources have been added to our library including tafseer collections and hadith reference materials. Access them through your student portal.', author: 'Library Services', date: '2026-02-01', priority: 'low', targetAudience: 'all' },
  { id: 'ann-5', title: 'Guest Lecture: Understanding Maqasid Al-Shariah', content: 'Join us for a special guest lecture by Dr. Hassan Al-Turabi on the objectives of Islamic law. The session will be held online and all students are welcome.', author: 'Events Committee', date: '2026-01-28', priority: 'medium', targetAudience: 'all' },
  { id: 'ann-6', title: 'Class A - Schedule Change', content: 'Class A students: Your Thursday sessions have been moved to Friday mornings effective immediately. Please update your calendars.', author: 'Class Coordinator', date: '2026-02-12', priority: 'high', targetAudience: 'specific-class', classId: 'class-1' },
];

// ==============================
// CLASSES
// ==============================
export const classes: ClassGroup[] = [
  { id: 'class-1', name: 'Al-Farooq Class A', programId: 'prog-1', programTitle: 'Fundamentals of Islamic Studies', schedule: 'Sun, Tue, Thu - 6:00 PM to 8:00 PM', studentCount: 4, studentIds: ['stu-1', 'stu-2', 'stu-3', 'stu-7'], instructor: 'Sheikh Ahmad Al-Farsi', teacherId: 'tea-1', startDate: '2025-09-01', endDate: '2026-03-01', status: 'active' },
  { id: 'class-2', name: 'Al-Noor Class B', programId: 'prog-2', programTitle: 'Advanced Hadith Sciences', schedule: 'Mon, Wed - 7:00 PM to 9:00 PM', studentCount: 3, studentIds: ['stu-4', 'stu-5', 'stu-8'], instructor: 'Dr. Muhammad Al-Azhari', teacherId: 'tea-2', startDate: '2025-09-15', endDate: '2026-06-15', status: 'active' },
  { id: 'class-3', name: 'Al-Huda Class C', programId: 'prog-3', programTitle: 'Quran Memorization & Tajweed', schedule: 'Daily - 5:00 AM to 6:30 AM', studentCount: 2, studentIds: ['stu-6', 'stu-9'], instructor: 'Qari Abdullah Mansoor', teacherId: 'tea-3', startDate: '2025-10-01', endDate: '2026-10-01', status: 'active' },
  { id: 'class-4', name: 'Al-Barakah Class D', programId: 'prog-1', programTitle: 'Fundamentals of Islamic Studies', schedule: 'Sat - 10:00 AM to 1:00 PM', studentCount: 0, studentIds: [], instructor: 'Sheikh Ibrahim Al-Bakri', startDate: '2026-03-01', endDate: '2026-09-01', status: 'upcoming' },
];

// ==============================
// EXAM RESULTS (for current student)
// ==============================
export interface ExamResult {
  examId: string;
  examTitle: string;
  score: number;
  totalScore: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  answers: Record<string, number>;
}

export const examResults: ExamResult[] = [
  { examId: 'exam-1', examTitle: 'Aqeedah Fundamentals - Midterm', score: 80, totalScore: 100, percentage: 80, passed: true, completedAt: '2026-01-10', answers: {} },
  { examId: 'exam-2', examTitle: 'Fiqh of Salah - Quiz', score: 87.5, totalScore: 100, percentage: 87.5, passed: true, completedAt: '2026-01-25', answers: {} },
];

export interface CourseGrade {
  code: string;
  title: string;
  credits: number;
  grade: string;
  score: number;
  status: 'pass' | 'fail' | 'in-progress';
}

export interface Semester {
  id: string;
  name: string;
  gpa: number;
  courses: CourseGrade[];
}

export interface Transcript {
  studentId: string;
  programId: string;
  cumulativeGPA: number;
  totalCredits: number;
  semesters: Semester[];
}

export const transcripts: Transcript[] = [
  {
    studentId: 'stu-1',
    programId: 'prog-1',
    cumulativeGPA: 3.8,
    totalCredits: 30,
    semesters: [
      {
        id: 'sem-1',
        name: 'Year 1 - Fall 2025',
        gpa: 3.9,
        courses: [
          { code: 'ISL101', title: 'Intro to Aqeedah', credits: 3, grade: 'A', score: 95, status: 'pass' },
          { code: 'ARB101', title: 'Arabic Grammar I', credits: 3, grade: 'A-', score: 91, status: 'pass' },
          { code: 'FQH101', title: 'Fiqh of Worship', credits: 3, grade: 'A', score: 94, status: 'pass' },
          { code: 'SIR101', title: 'Seerah: Makkan Period', credits: 3, grade: 'B+', score: 88, status: 'pass' },
          { code: 'QUR101', title: 'Tajweed Level 1', credits: 2, grade: 'A', score: 98, status: 'pass' },
        ]
      },
      {
        id: 'sem-2',
        name: 'Year 1 - Spring 2026',
        gpa: 3.7,
        courses: [
          { code: 'ISL102', title: 'Tawheed Advanced', credits: 3, grade: 'A-', score: 90, status: 'pass' },
          { code: 'ARB102', title: 'Arabic Grammar II', credits: 3, grade: 'B+', score: 87, status: 'pass' },
          { code: 'FQH102', title: 'Fiqh of Transactions', credits: 3, grade: 'B', score: 85, status: 'pass' },
          { code: 'SIR102', title: 'Seerah: Madinan Period', credits: 3, grade: 'A', score: 96, status: 'pass' },
          { code: 'HAD101', title: '40 Hadith Nawawi', credits: 3, grade: 'in-progress', score: 0, status: 'in-progress' },
        ]
      }
    ]
  },
  {
    studentId: 'stu-7',
    programId: 'prog-1',
    cumulativeGPA: 2.1,
    totalCredits: 12,
    semesters: [
      {
        id: 'sem-1',
        name: 'Year 1 - Fall 2025',
        gpa: 2.1,
        courses: [
          { code: 'ISL101', title: 'Intro to Aqeedah', credits: 3, grade: 'C', score: 75, status: 'pass' },
          { code: 'ARB101', title: 'Arabic Grammar I', credits: 3, grade: 'F', score: 45, status: 'fail' },
          { code: 'FQH101', title: 'Fiqh of Worship', credits: 3, grade: 'D', score: 62, status: 'pass' },
          { code: 'SIR101', title: 'Seerah: Makkan Period', credits: 3, grade: 'C+', score: 78, status: 'pass' },
        ]
      }
    ]
  }
];

// ==============================
// CURRENT USER (Student)
// ==============================
export const currentStudent = students[0];

// ==============================
// STATS
// ==============================
export const adminStats = {
  totalStudents: students.length,
  activeStudents: students.filter(s => s.status === 'active').length,
  totalPrograms: programs.length,
  activePrograms: programs.filter(p => p.status === 'active').length,
  totalCourses: programs.reduce((acc, p) => acc + p.totalCourses, 0),
  totalClasses: classes.length,
  totalExams: exams.length,
  publishedExams: exams.filter(e => e.status === 'published').length,
  certificatesIssued: certificates.length,
  announcements: announcements.length,
  recentEnrollments: 12,
  completionRate: 68,
  totalTeachers: teachers.length,
};

export const studentStats = {
  enrolledPrograms: 2,
  totalCourses: 7,
  completedLessons: 32,
  totalLessons: 108,
  upcomingExams: 1,
  certificatesEarned: 0,
  overallProgress: 45,
  studyHoursThisWeek: 12,
  currentStreak: 7,
};

// ==============================
// BOT RESPONSES
// ==============================
export const botResponses: Record<string, string> = {
  'hello': 'Assalamu Alaikum! 👋 Welcome to the Imam Al-Bukhari Learning Platform. How can I help you today?',
  'hi': 'Wa Alaikum Assalam! 🌟 How can I assist you today?',
  'help': 'I can help you with:\n📌 Navigation - Finding pages and features\n📚 Enrollment - Your enrolled programs info\n📅 Schedule - Class timings and dates\n📝 Exams - Upcoming exam information\n🏆 Certificates - Certificate availability\n\nJust type your question!',
  'navigation': 'Here are the main sections:\n📊 Dashboard - Your overview\n📚 Programs - Browse all programs\n📖 Courses - Your enrolled courses\n📝 Exams - Take assessments\n🏆 Certificates - Your achievements\n📢 Announcements - Latest news',
  'enrollment': 'You are currently enrolled in:\n1. 📚 Fundamentals of Islamic Studies (45% complete)\n2. 📚 Advanced Hadith Sciences (28% complete)\n\nWould you like to know more about any program?',
  'schedule': 'Your class schedule:\n📅 Al-Farooq Class A\n🕕 Sun, Tue, Thu - 6:00 PM to 8:00 PM\n👨‍🏫 Instructor: Sheikh Ahmad Al-Farsi\n📍 Online Session',
  'exam': 'Upcoming exams:\n📝 Aqeedah Final Exam - Not yet scheduled\n\nCompleted exams:\n✅ Aqeedah Fundamentals - Midterm: 80%\n✅ Fiqh of Salah - Quiz: 87.5%',
  'certificate': 'You haven\'t earned any certificates yet. Keep studying! 📖\n\nTo earn a certificate, you need to:\n1. Complete all course lessons\n2. Pass the final exam with the minimum score\n\nYou\'re 45% through your current program!',
  'default': 'I\'m sorry, I didn\'t understand that. Try asking about:\n• Navigation\n• Enrollment\n• Schedule\n• Exams\n• Certificates\n\nOr type "help" for more options. 😊',
};
