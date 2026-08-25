import type { Metadata, Viewport } from "next";
import "./base.css";
import "lenis/dist/lenis.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./portfolio-sotd.css";
import SmoothScroll from "@/components/SmoothScroll";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};


export const metadata: Metadata = {
  metadataBase: new URL('https://arif.zone.id/'),
  title: {
    default: "T Mohammed Arif — Full-Stack Developer & Technical Product Builder",
    template: "%s | T Mohammed Arif"
  },
  description: "Portfolio of T Mohammed Arif, a full-stack developer and technical product builder creating production web systems, healthcare digital experiences, automation tools and high-traffic platforms.",
  keywords: [
    "T Mohammed Arif",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
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
    title: "T Mohammed Arif — Full-Stack Developer & Technical Product Builder",
    description: "Production engineering with visual craft: web platforms, healthcare systems, automation and digital growth.",
    siteName: "Arif Zone",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "T Mohammed Arif Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "T Mohammed Arif — Full-Stack Developer & Technical Product Builder",
    description: "Production engineering with visual craft: web platforms, healthcare systems, automation and digital growth.",
    images: ["/og.png"]
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
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
