'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    period: '2024 — Present',
    title: 'Software Technician',
    company: 'Valli Super Speciality Hospital',
    location: 'Salem, TN',
    description: 'Sole engineer keeping critical hospital software, hardware, and patient management systems running 24/7 across a live medical facility. Zero downtime is not optional.',
    highlights: [
      'Maintained & optimized Patient Management System — sub-100ms query times',
      'First-response technical support for medical staff during critical operations',
      'Built custom Zoho Creator automations eliminating manual data entry across 4 departments',
      'Tuned PostgreSQL & MongoDB queries, reducing report generation time by 60%',
    ],
    stack: ['Node.js', 'MongoDB', 'SQL', 'Zoho Creator', 'Python', 'Automation'],
  },
  {
    period: '2022 — 2024',
    title: 'Full Stack Web Developer',
    company: 'Freelance & Institutional Projects',
    location: 'Remote',
    description: 'Designed and shipped production web platforms for engineering colleges and institutions across Tamil Nadu — handling everything from architecture to deployment.',
    highlights: [
      'Built and maintained 3 institutional websites serving tens of thousands of students',
      'Delivered SEO-optimized, accessible, mobile-first platforms',
      'Sole developer on projects from design through to DNS configuration',
      'Clients: AVS Engineering College, Sakthi Kailash College, AVS Omalur',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'SEO'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-title', {
        yPercent: 110,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });

      gsap.from('.exp-role-card', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-roles', start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 px-6 md:px-12 xl:px-20"
      style={{ background: '#071e19' }}
    >
      {/* Emerald top glow */}
      <div
        className="absolute top-0 left-[30%] w-[500px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6,214,160,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Section tag */}
      <div className="flex items-center gap-4 mb-16 md:mb-24">
        <span className="text-[#06D6A0] text-xs font-mono tracking-[0.3em] uppercase">05 / Experience</span>
        <div className="h-px flex-1 max-w-16 bg-[rgba(6,214,160,0.3)]" />
      </div>

      {/* Title */}
      <div className="overflow-hidden mb-16 md:mb-24">
        <h2
          className="exp-title text-[#E6FBF6] font-black uppercase"
          style={{
            fontFamily: '"Climate Crisis", sans-serif',
            fontVariationSettings: '"YEAR" 2024',
            fontSize: 'clamp(3rem, 8vw, 110px)',
            lineHeight: 0.87,
            letterSpacing: '-0.03em',
          }}
        >
          Where I&apos;ve<br />
          <span className="text-[#06D6A0]">Worked.</span>
        </h2>
      </div>

      {/* Roles */}
      <div className="exp-roles space-y-2">
        {ROLES.map((role, i) => (
          <div
            key={i}
            className="exp-role-card group relative border-t border-[rgba(230,251,246,0.08)] py-10 md:py-12"
          >
            {/* Hover line */}
            <div className="absolute top-0 left-0 h-px w-0 bg-[#06D6A0] group-hover:w-full transition-all duration-700 ease-out" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left: meta */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <span className="text-[#06D6A0] text-xs font-mono tracking-widest uppercase">{role.period}</span>
                <span className="text-[rgba(230,251,246,0.4)] text-xs font-mono">{role.location}</span>
              </div>

              {/* Center: content */}
              <div className="md:col-span-6">
                <h3
                  className="text-[#E6FBF6] font-bold mb-1"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 28px)' }}
                >
                  {role.title}
                </h3>
                <p className="text-[rgba(6,214,160,0.8)] text-sm font-mono mb-5">{role.company}</p>
                <p className="text-[rgba(230,251,246,0.55)] text-sm leading-relaxed mb-6 font-light">
                  {role.description}
                </p>
                <ul className="space-y-2">
                  {role.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3 text-[rgba(230,251,246,0.5)] text-sm font-light">
                      <span className="text-[#06D6A0] mt-1 flex-none text-xs">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: stack */}
              <div className="md:col-span-3 flex flex-wrap gap-2 content-start">
                {role.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-[rgba(230,251,246,0.10)] text-[rgba(230,251,246,0.4)] tracking-widest uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
