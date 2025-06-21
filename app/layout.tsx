import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'T Mohammed Arif - Full Stack Developer',
    template: '%s | T Mohammed Arif'
  },
  description: 'Award-winning Full Stack Web Developer specializing in Next.js, React, Node.js, and modern web technologies. Creating scalable solutions with exceptional user experiences.',
  keywords: [
    'Full Stack Developer',
    'Web Developer', 
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'Salem Developer',
    'Tamil Nadu Developer',
    'Portfolio',
    'Freelance Developer',
    'UI/UX Developer',
    'Frontend Developer',
    'Backend Developer'
  ],
  authors: [{ name: 'T Mohammed Arif' }],
  creator: 'T Mohammed Arif',
  publisher: 'T Mohammed Arif',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mohammedarif.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohammedarif.dev',
    title: 'T Mohammed Arif - Full Stack Developer',
    description: 'Award-winning Full Stack Web Developer creating modern, scalable web solutions with Next.js, React, and Node.js',
    siteName: 'T Mohammed Arif Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'T Mohammed Arif - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T Mohammed Arif - Full Stack Developer',
    description: 'Award-winning Full Stack Web Developer creating modern, scalable web solutions',
    creator: '@mohammed_arif',
    images: ['/og-image.jpg'],
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://mohammedarif.dev" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        
        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "T Mohammed Arif",
              "jobTitle": "Full Stack Developer",
              "description": "Award-winning Full Stack Web Developer specializing in Next.js, React, Node.js, and modern web technologies",
              "url": "https://mohammedarif.dev",
              "image": "https://mohammedarif.dev/images/profile.jpg",
              "sameAs": [
                "https://github.com/mohammed-arif-23",
                "https://linkedin.com/in/mohammed-arif-23"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Salem",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              },
              "knowsAbout": [
                "Next.js",
                "React",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "Full Stack Development",
                "Web Development",
                "UI/UX Design"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}