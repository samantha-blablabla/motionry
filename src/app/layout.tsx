import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Motionry - Micro Animation Library for UI/UX',
  description: 'A curated collection of micro-animations with AI-friendly prompts. Copy the perfect animation for your next project.',
  keywords: ['micro-animation', 'UI animation', 'framer motion', 'react animation', 'CSS animation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-surface font-sans">
        {children}
      </body>
    </html>
  );
}
