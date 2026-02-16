import StudentSidebar from '@/components/student/StudentSidebar';
import ChatBot from '@/components/ChatBot';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            <StudentSidebar />
            <main className="lg:ml-64 min-h-screen">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
            <ChatBot />
        </div>
    );
}
