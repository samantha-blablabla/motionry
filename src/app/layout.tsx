import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

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
    <html lang="en" className={`${plusJakarta.variable} dark`}>
      <body className={`${plusJakarta.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
