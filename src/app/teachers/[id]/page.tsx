'use client';

import { use } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { programs, teachers } from '@/lib/data';
import {
  BookOpen, Clock, Users, ChevronRight, ArrowLeft,
  GraduationCap, Mail
} from 'lucide-react';

export default function TeacherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const teacher = teachers.find(t => t.id === id);

  if (!teacher) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <PublicNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Teacher not found</h1>
            <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">
              Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Find all courses and programs taught by this teacher
  const teacherPrograms = programs
    .map(program => {
      const matchingCourses = program.courses.filter(c => c.instructor === teacher.name);
      if (matchingCourses.length === 0) return null;
      return { ...program, courses: matchingCourses };
    })
    .filter(Boolean) as typeof programs;

  const totalCourses = teacherPrograms.reduce((acc, p) => acc + p.courses.length, 0);
  const totalStudents = teacherPrograms.reduce((acc, p) => acc + p.enrolledStudents, 0);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <PublicNavbar />

      {/* Teacher Header */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50"></div>
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-5xl shadow-lg border-4 border-white shrink-0">
              {teacher.avatar}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{teacher.name}</h1>
              <p className="text-orange-500 font-medium mt-1">{teacher.specialization}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-orange-400" /> {totalCourses} {totalCourses === 1 ? 'Course' : 'Courses'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-orange-400" /> {totalStudents}+ Students
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-orange-400" /> {teacher.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Courses */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
            Programs & Courses by <span className="text-orange-500">{teacher.name.split(' ')[0]}</span>
          </h2>

          {teacherPrograms.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-500 text-sm">This teacher&apos;s courses will appear here soon.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {teacherPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  {/* Program Header */}
                  <div className="p-5 sm:p-6 border-b border-gray-50 bg-gradient-to-r from-orange-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{program.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {program.duration}</span>
                          <span>{program.level}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            program.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                          }`}>{program.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Courses List - Horizontal Scroll */}
                  <div className="p-4 sm:p-6">
                    <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                      {program.courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-orange-200 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">{course.title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{course.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" /> {course.totalLessons} lessons
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Want to learn from {teacher.name.split(' ')[0]}?</h3>
            <p className="text-gray-600 text-sm mb-6">Register now and enroll in one of the programs taught by our scholars.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25">
              Register Now <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
