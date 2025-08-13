'use client';

import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'Mohammed Arif T - Portfolio',
  description = 'Full Stack Developer specializing in Next.js, React, and Node.js. Creating modern, scalable web solutions with a focus on performance and user experience.',
  keywords = [
    'AVS Engineering College',
    'AVSEC',
    'Mohammed Arif AVSEC',
    'AVSEC Salem',
    'Full Stack Developer',
    'Web Developer', 
    'Portfolio',
    'Web Developer Portfolio',
    'AI&ML Architect',
    'Next.js',
    'React Developer',
    'Node.js Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'Salem',
    'Tamil Nadu',
    'Portfolio',
    'Freelance Developer',
    'UI/UX Developer',
    'Frontend Developer',
    'Backend Developer'
  ],
  image = 'https://myportfolio-arif.vercel.app/images/profile.jpg',
  url = 'https://myportfolio-arif.vercel.app/',
  type = 'website'
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "T Mohammed Arif",
    "jobTitle": "Full Stack Developer",
    "description": description,
    "url": url,
    "image": image,
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
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="T Mohammed Arif" />
      <meta name="creator" content="T Mohammed Arif" />
      <meta name="publisher" content="T Mohammed Arif" />
      <meta name="category" content="technology" />
      <meta name="classification" content="Portfolio" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="google-site-verification" content="8_WJN27z1Q0WVlN6N471Gf93AmxyqidjgRnRfNLwfWI" />
      <meta name="format-detection" content="email=no, address=no, telephone=no" />
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content="T Mohammed Arif - Full Stack Developer" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="T Mohammed Arif Portfolio" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="T Mohammed Arif - Full Stack Developer" />
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
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
};