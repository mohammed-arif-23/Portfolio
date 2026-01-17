import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";


export const metadata: Metadata = {
  metadataBase: new URL('https://arif.zone.id/'),
  title: {
    default: "T Mohammed Arif | Full Stack Developer",
    template: "%s | T Mohammed Arif"
  },
  description: "Part-Time Full Stack Developer specializing in Next.js, Node.js, and Automation. Building real-world web systems and institutional platforms in Salem, Tamilnadu.",
  keywords: [
    "T Mohammed Arif",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Expert",
    "Automation Specialist",
    "Web Development Salem",
    "Portfolio Mohammed Arif"
  ],
  authors: [{ name: "T Mohammed Arif" }],
  creator: "T Mohammed Arif",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arif.zone.id/",
    title: "T Mohammed Arif | Full Stack Developer",
    description: "Highly efficient portfolio of T Mohammed Arif - Part-Time Full Stack Developer & Automation Support.",
    siteName: "Arif Zone",
    images: [
      {
        url: "/profile.png", // Ensure this exists or I should create it
        width: 1200,
        height: 630,
        alt: "T Mohammed Arif Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "T Mohammed Arif | Full Stack Developer",
    description: "Building real-world web systems and automation workflows.",
    images: ["/profile.png"],
    creator: "@mohammedarif2303"
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
    google: "LWo4AHpMtilr-8ORZJWnVWzOHGS4e2EJckFzAk_hl6g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="LWo4AHpMtilr-8ORZJWnVWzOHGS4e2EJckFzAk_hl6g" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
