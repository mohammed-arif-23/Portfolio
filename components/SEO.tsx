'use client';

import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'T Mohammed Arif - Full Stack Developer',
  description = 'Award-winning Full Stack Web Developer specializing in Next.js, React, Node.js, and modern web technologies. Creating scalable solutions with exceptional user experiences.',
  keywords = 'Full Stack Developer, Web Developer, Next.js, React, Node.js, JavaScript, TypeScript, Salem, Tamil Nadu, Portfolio',
  image = 'https://myportfolio-arif.vercel.app/images/profile.jpg',
  url = 'https://myportfolio-arif.vercel.app/',
  type = 'website'
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "T Mohammed Arif",
    "jobTitle": "Full Stack Developer",
    "description": "Award-winning Full Stack Web Developer specializing in Next.js, React, Node.js, and modern web technologies",
    "url": "https://myportfolio-arif.vercel.app/",
    "image": "https://myportfolio-arif.vercel.app/images/profile.jpg",
    "sameAs": [
      "https://github.com/mohammed-arif-23",
      "https://www.linkedin.com/in/mohammed-arif-0ab6402a1"
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
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="T Mohammed Arif" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google-site-verification" content="8_WJN27z1Q0WVlN6N471Gf93AmxyqidjgRnRfNLwfWI" />
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="T Mohammed Arif Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@mohammed_arif" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0f172a" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
} 