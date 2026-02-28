'use client';

import Link from 'next/link';
import PublicNavbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import {
  BookOpen, GraduationCap, Users, Award, ArrowRight, Star,
  Play, ChevronRight, Sparkles, BookMarked, Mic, FileText as FileTextIcon,
  CheckCircle2, Clock, Globe
} from 'lucide-react';
import { programs, teachers } from '@/lib/data';

export default function LandingPage() {
  return (
    // <div className="min-h-screen bg-[#FAFAF8]">
    <div className="min-h-screen islamic-pattern bg-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden min-h-[50vh] sm:min-h-[70vh] lg:min-h-[90vh]">
        {/* Floating elements */}
        {/* <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float hidden sm:block"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-float hidden sm:block" style={{ animationDelay: '1.5s' }}></div> */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:py-32 bg-linear-to-b from-white via-orange-300 to-white w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="stagger-children">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-100/80 rounded-full border border-orange-200 mb-4 sm:mb-6">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                <span className="text-orange-700 text-xs sm:text-sm font-medium">Begin Your Journey of Knowledge</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Seeking Knowledge is an{' '}
                <span className="text-orange-500">Obligation</span>{' '}
                Upon Every Muslim
              </h1>

              <div className="mt-4 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link href="/register" className="gradient-primary text-white px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/25 flex items-center gap-2 text-xs sm:text-sm">
                  Start Learning <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
                <Link href="/programs" className="border border-orange-200 text-orange-700 px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2 text-xs sm:text-sm">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Explore Programs
                </Link>
              </div>

              {/* <div className="mt-6 sm:mt-10 flex items-center gap-6 sm:gap-8">
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">1200+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Students</div>
                </div>
                <div className="w-px h-8 sm:h-10 bg-gray-200"></div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">6</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Programs</div>
                </div>
                <div className="w-px h-8 sm:h-10 bg-gray-200"></div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">20+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Scholars</div>
                </div>
              </div> */}
            </div>

            {/* Hero Card */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative glass rounded-3xl p-8 border border-white/10">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-gray-900 text-xl font-bold">Imam Al-Bukhari</h3>
                    <p className="text-orange-600 text-sm mt-1">Islamic Institute</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: BookMarked, label: 'Aqeedah & Fiqh', color: 'text-orange-500' },
                      { icon: Mic, label: 'Quran & Tajweed', color: 'text-orange-500' },
                      { icon: FileTextIcon, label: 'Hadith Sciences', color: 'text-orange-500' },
                      { icon: Globe, label: 'Islamic History', color: 'text-orange-500' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    </div>
                    <p className="text-gray-600 text-xs italic">&quot;An excellent platform for authentic Islamic learning. The courses are well-structured and the scholars are knowledgeable.&quot;</p>
                    <p className="text-orange-500 text-xs mt-2 font-medium">— Fatimah Al-Noor, Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-10 sm:py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-12">
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900">Our <span className="text-orange-500">Programs</span></h2>
            </div>
            <Link href="/programs" className="flex items-center gap-1 text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
            {programs.slice(0, 6).map((program) => (
              <Link key={program.id} href="/programs" className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden card-hover group">
                {/* Compact gradient strip */}
                <div className="h-20 sm:h-28 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
                  <div className="absolute inset-0 islamic-pattern opacity-20"></div>
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 text-xl sm:text-2xl">📚</div>
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                      program.status === 'active' ? 'bg-white/90 text-green-600' :
                      program.status === 'upcoming' ? 'bg-white/90 text-orange-600' :
                      'bg-white/90 text-gray-600'
                    }`}>
                      {program.status === 'active' ? 'Active' : program.status === 'upcoming' ? 'Soon' : 'Done'}
                    </span>
                  </div>
                </div>

                {/* Compact body */}
                <div className="p-3 sm:p-4">
                  <div className="text-[10px] sm:text-xs text-orange-500 font-semibold uppercase tracking-wider mb-1">{program.level}</div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors leading-tight line-clamp-2">{program.title}</h3>
                  <div className="flex items-center gap-2 sm:gap-3 mt-2 text-[10px] sm:text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {program.enrolledStudents}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Scholars Section */}
      <section className="py-10 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900">Our <span className="text-orange-500">Scholars</span></h2>
          </div>

          <div className="flex gap-3 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
            {teachers.map((teacher) => {
              const teacherCourses = programs.flatMap(p =>
                p.courses.filter(c => c.instructor === teacher.name).map(c => ({ ...c, programTitle: p.title }))
              );
              return (
                <Link
                  key={teacher.id}
                  href={`/teachers/${teacher.id}`}
                  className="flex-shrink-0 w-[160px] sm:w-[280px] snap-start group"
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 h-full">
                    <div className="h-16 sm:h-24 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
                      <div className="absolute inset-0 islamic-pattern opacity-20"></div>
                      <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg border-2 sm:border-4 border-white">
                        {teacher.avatar}
                      </div>
                    </div>
                    <div className="pt-8 sm:pt-10 pb-4 sm:pb-5 px-3 sm:px-5 text-center">
                      <h3 className="text-xs sm:text-base font-bold text-gray-900 group-hover:text-orange-500 transition-colors leading-tight">{teacher.name}</h3>
                      <p className="text-[10px] sm:text-xs text-orange-500 font-medium mt-0.5 sm:mt-1">{teacher.specialization}</p>
                      <div className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-[10px] sm:text-xs text-orange-500 font-medium group-hover:gap-2 transition-all">
                        View Courses <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100 mb-4">
              <span className="text-orange-600 text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">A Modern Approach to <span className="text-orange-500">Islamic Education</span></h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Experience a seamless learning journey with our comprehensive platform designed for seekers of knowledge</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Structured Programs', desc: 'Carefully curated curriculum following a clear path from basics to advanced studies', color: 'from-orange-400 to-orange-600' },
              { icon: GraduationCap, title: 'Qualified Scholars', desc: 'Learn from scholars with ijazah and recognized credentials in their fields', color: 'from-orange-300 to-orange-500' },
              { icon: Play, title: 'Multi-format Lessons', desc: 'Access video lectures, audio recordings, and PDF materials at your own pace', color: 'from-orange-200 to-orange-400' },
              { icon: FileTextIcon, title: 'Interactive Exams', desc: 'Test your knowledge with MCQ exams and receive instant results and feedback', color: 'from-orange-300 to-orange-500' },
              { icon: Award, title: 'Certificates', desc: 'Earn verified certificates upon successful completion of programs and courses', color: 'from-orange-400 to-orange-600' },
              { icon: Users, title: 'Community Learning', desc: 'Join classes with fellow students and benefit from group learning and discussion', color: 'from-orange-200 to-orange-500' },
            ].map((feature) => (
              <div key={feature.title} className="group p-8 rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 bg-white card-hover">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* How it Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It <span className="text-orange-500">Works</span></h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">Your journey from registration to certification in four simple steps</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Register', desc: 'Create your free account and set up your profile', icon: Users },
              { step: '02', title: 'Enroll', desc: 'Choose a program and start your learning journey', icon: BookOpen },
              { step: '03', title: 'Learn', desc: 'Watch lectures, complete lessons, and take exams', icon: GraduationCap },
              { step: '04', title: 'Achieve', desc: 'Earn certificates and track your progress', icon: Award },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center mb-6 transition-colors duration-300 border border-orange-100 group-hover:border-orange-500">
                  <item.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-5xl font-black text-orange-100 absolute -top-2 -left-2">{item.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidde">
        <div className="absolute inset-0 bg-linear-to-t from-orange-50 via-orange-100 to-white"></div>
        <div className="absolute inset-0 islamic-pattern opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Ready to Begin Your <span className="text-orange-500">Journey?</span></h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students worldwide who are deepening their understanding of Islam through structured, authentic education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="gradient-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-xl shadow-orange-500/30 flex items-center gap-2">
              Register Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/programs" className="bg-white text-orange-700 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-colors border border-orange-200">
              View Programs
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Free Registration</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Certified Scholars</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Flexible Schedule</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
