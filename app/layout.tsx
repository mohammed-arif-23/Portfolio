import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Mohammed Arif T - Portfolio',
    template: '%s | Mohammed Arif T'
  },
  description: 'Full Stack Developer and AI & ML Architect specializing in Next.js, MERN, PyTorch and modern web technologies.',
  keywords: [
    'Mohammed Arif T',
    'Portfolio',
    'Full Stack Developer Portfolio',
    'AI & ML Architect', 
    'Next.js Developer',
    'MERN Developer',
    'TypeScript Developer',
    'Salem Developer',
    'Tamil Nadu Developer',
    'Web Developer',],
  authors: [{ name: 'T Mohammed Arif' }],
  creator: 'T Mohammed Arif',
  publisher: 'T Mohammed Arif',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://myportfolio-arif.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myportfolio-arif.vercel.app/',
    title: 'Mohammed Arif T - Portfolio',
    description: 'Full Stack Developer and AI & ML Architect specializing in Next.js, MERN, PyTorch and modern web technologies',
    siteName: 'Mohammed Arif T - Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohammed Arif T - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Arif T - Portfolio',
    description: 'Full Stack Developer and AI & ML Architect specializing in Next.js, MERN, PyTorch and modern web technologies',
    creator: '@mohdarif2303',
    images: ['/profile.jpg'],
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
    google: '8_WJN27z1Q0WVlN6N471Gf93AmxyqidjgRnRfNLwfWI',
  },
  category: 'technology',
  classification: 'Portfolio',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://myportfolio-arif.vercel.app" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={`${inter.className} text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}