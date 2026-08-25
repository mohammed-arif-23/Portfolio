'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    category: 'Institutional Web',
    year: '2024',
    title: 'AVS Engineering College',
    desc: 'Full redesign and performance overhaul of Tamil Nadu\'s flagship engineering institution. PHP backend, optimized MySQL queries, serving thousands of students and faculty daily.',
    stack: ['PHP', 'MySQL', 'Responsive CSS'],
    img: '/images/project-thumb-avsengg.png',
    link: 'https://www.avsenggcollege.ac.in/',
    color: '#06D6A0',
  },
  {
    id: '02',
    category: 'Academic Portal',
    year: '2024',
    title: "Sakthi Kailash Women's College",
    desc: 'Mobile-first academic portal with admissions flow, department pages, and campus life showcase. Built for accessibility across low-bandwidth networks.',
    stack: ['PHP', 'MySQL', 'CSS3'],
    img: '/images/project-thumb-sswc.png',
    link: 'https://www.sakthikailashcollege.org/',
    color: '#0C4137',
  },
  {
    id: '03',
    category: 'Production Portal',
    year: '2024',
    title: 'AVS College Omalur',
    desc: 'SEO-optimized academic portal for programmes, events, and faculty. Production-ready with structured data markup and performance budgets.',
    stack: ['PHP', 'MySQL', 'HTML/CSS'],
    img: '/images/project-thumb-avsomalur.png',
    link: 'https://www.avscollegeomalur.edu.in/',
    color: '#06D6A0',
  },
  {
    id: '04',
    category: 'Live Booking Platform',
    year: '2024',
    title: 'CinemaHub',
    desc: 'Interactive movie ticket booking with real-time seat selection, payment integration, and automated email confirmations. Built end-to-end in Next.js.',
    stack: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
    img: '/images/project-thumb-1.png',
    link: 'http://cinemahub-arif.vercel.app/',
    color: '#0C4137',
  },
  {
    id: '05',
    category: 'AI & Computer Vision',
    year: '2023',
    title: 'Pixels to Plates',
    desc: 'Deep learning platform that identifies food from images and returns nutritional analysis. TensorFlow model trained on 50k+ food images with OpenCV preprocessing.',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'Streamlit'],
    img: '/images/project-thumb-pixels-to-plates.png',
    link: 'https://pixelstoplates.streamlit.app/',
    color: '#06D6A0',
  },
  {
    id: '06',
    category: 'ML Recommender',
    year: '2023',
    title: 'Movie Recommender AI',
    desc: 'Cosine-similarity content-based recommendation engine over a rich movie dataset. Deployed as a Streamlit app with instant similarity search.',
    stack: ['Python', 'Streamlit', 'Pandas', 'Scikit-learn'],
    img: '/images/project-thumb-3.png',
    link: 'https://arif-nm-movieapi.streamlit.app/',
    color: '#0C4137',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Horizontal scroll driven by vertical scroll
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (PROJECTS.length - 1));
            setActiveIdx(Math.min(idx, PROJECTS.length - 1));
          },
        },
      });

      // Reveal header on enter
      gsap.from('.proj-header', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[#071e19] overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Section header — stays fixed at top during scroll */}
      <div className="proj-header absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 xl:px-20 py-6 border-b border-[rgba(230,251,246,0.06)]">
        <div className="flex items-center gap-4">
          <span className="text-[#06D6A0] text-xs font-mono tracking-[0.3em] uppercase">02 / Work</span>
          <span className="text-[rgba(230,251,246,0.3)] text-xs font-mono tracking-widest">
            {String(activeIdx + 1).padStart(2, '0')} — {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>
        <h2
          className="text-[rgba(230,251,246,0.15)] text-xs font-mono tracking-[0.35em] uppercase"
        >
          Selected Work
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex items-stretch"
        style={{ height: '100vh', paddingTop: '57px' }}
      >
        {/* Intro panel */}
        <div
          className="flex-none flex flex-col justify-end px-6 md:px-12 xl:px-20 pb-16"
          style={{ width: 'clamp(360px, 40vw, 600px)' }}
        >
          <h2
            className="text-[#E6FBF6] font-black uppercase mb-4"
            style={{
              fontFamily: '"Climate Crisis", sans-serif',
              fontVariationSettings: '"YEAR" 2024',
              fontSize: 'clamp(3.5rem, 7vw, 100px)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            Things<br />
            I&apos;ve<br />
            Built.
          </h2>
          <p className="text-[rgba(230,251,246,0.5)] text-sm leading-relaxed max-w-sm font-light">
            From institutional platforms to AI-powered tools. Each one shipped to production, each one with real users.
          </p>
          <div className="mt-8 flex items-center gap-2 text-[#06D6A0] text-xs font-mono tracking-widest uppercase">
            <span className="animate-[spin_3s_linear_infinite] inline-block">→</span>
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Project cards */}
        {PROJECTS.map((proj, i) => (
          <a
            key={proj.id}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-none relative overflow-hidden block"
            style={{ width: 'clamp(340px, 38vw, 560px)', marginRight: '2px' }}
          >
            {/* Image */}
            <div className="absolute inset-0">
              <Image
                src={proj.img}
                alt={proj.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 38vw"
                priority={i < 2}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to top, rgba(7,30,25,0.97) 0%, rgba(7,30,25,0.55) 50%, rgba(12,65,55,0.20) 100%)`,
                }}
              />
              {/* Hover tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(6,214,160,0.06)' }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
              {/* Top */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[#06D6A0] text-xs font-mono tracking-[0.3em] uppercase">{proj.id}</span>
                  <span className="ml-3 text-[rgba(230,251,246,0.35)] text-xs font-mono tracking-widest">/ {proj.category}</span>
                </div>
                <span className="text-[rgba(230,251,246,0.3)] text-xs font-mono">{proj.year}</span>
              </div>

              {/* Bottom */}
              <div>
                <h3
                  className="text-[#E6FBF6] font-black uppercase mb-3 transition-colors group-hover:text-[#06D6A0] duration-300"
                  style={{
                    fontFamily: '"Climate Crisis", sans-serif',
                    fontVariationSettings: '"YEAR" 2024',
                    fontSize: 'clamp(2rem, 4vw, 52px)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {proj.title}
                </h3>
                <p className="text-[rgba(230,251,246,0.55)] text-sm leading-relaxed mb-6 font-light max-w-sm">
                  {proj.desc}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-[rgba(230,251,246,0.12)] text-[rgba(230,251,246,0.5)] tracking-widest uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#06D6A0] text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}

        {/* End panel */}
        <div
          className="flex-none flex flex-col justify-center px-16 text-[rgba(230,251,246,0.15)]"
          style={{ width: '200px' }}
        >
          <span className="text-xs font-mono tracking-widest uppercase writing-mode-vertical">
            End of selected work
          </span>
        </div>
      </div>
    </section>
  );
}
