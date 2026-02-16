import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imam Al-Bukhari Islamic Institute - Learning Management System",
  description: "A comprehensive Islamic learning platform offering structured programs in Aqeedah, Fiqh, Hadith Sciences, Quran Memorization and more. Join our community of seekers of knowledge.",
  keywords: "Islamic education, Quran, Hadith, Fiqh, Islamic studies, online learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
