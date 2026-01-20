import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Motionry - Micro Animation Library for UI/UX',
    template: '%s | Motionry',
  },
  description: 'A curated collection of 20+ micro-animations with AI-friendly prompts. Copy the perfect Framer Motion animation for your React project in seconds.',
  keywords: [
    'micro-animation',
    'UI animation',
    'framer motion',
    'react animation',
    'CSS animation',
    'tailwind animation',
    'nextjs animation',
    'motion library',
    'UI components',
    'web animation',
  ],
  authors: [{ name: 'Motionry Team' }],
  creator: 'Motionry',
  publisher: 'Motionry',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://motionry.vercel.app',
    siteName: 'Motionry',
    title: 'Motionry - Micro Animation Library for UI/UX',
    description: 'A curated collection of 20+ micro-animations with AI-friendly prompts. Copy the perfect Framer Motion animation for your React project.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Motionry - Micro Animation Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motionry - Modern UI Components',
    description: 'A beautiful library of modern UI components and animations built with Next.js, Tailwind CSS, and Framer Motion.',
    images: ['/og-image.png'],
    creator: '@motionry',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0c' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
