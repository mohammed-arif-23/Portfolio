import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'T Mohammed Arif - Full Stack Developer',
  description: 'Award-winning Full Stack Web Developer specializing in Next.js, React, Node.js, and modern web technologies. Creating scalable solutions with exceptional user experiences.',
  keywords: 'Full Stack Developer, Web Developer, Next.js, React, Node.js, JavaScript, TypeScript, Salem, Tamil Nadu',
  authors: [{ name: 'T Mohammed Arif' }],
  creator: 'T Mohammed Arif',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohammedarif.dev',
    title: 'T Mohammed Arif - Full Stack Developer',
    description: 'Award-winning Full Stack Web Developer creating modern, scalable web solutions',
    siteName: 'T Mohammed Arif Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T Mohammed Arif - Full Stack Developer',
    description: 'Award-winning Full Stack Web Developer creating modern, scalable web solutions',
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://mohammedarif.dev" />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}