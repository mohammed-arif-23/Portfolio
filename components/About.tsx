'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '3+', label: 'Years in production' },
  { value: '15+', label: 'Projects shipped' },
  { value: '5k+', label: 'Active users served' },
  { value: '100%', label: 'Uptime on critical systems' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Statement reveal
      gsap.from('.about-line', {
        yPercent: 105,
        stagger: 0.07,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.about-body', start: 'top 75%', once: true },
      });

      // Stats count
      gsap.from('.stat-item', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 80%', once: true },
      });

      // Image reveal
      gsap.from('.about-img-wrap', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.about-img-wrap', start: 'top 75%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 px-6 md:px-12 xl:px-20"
      style={{ background: 'linear-gradient(180deg, #071e19 0%, #0C4137 100%)' }}
    >
      {/* Emerald edge line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(6,214,160,0.3)] to-transparent" />

      {/* Section tag */}
      <div className="flex items-center gap-4 mb-16 md:mb-24">
        <span className="text-[#06D6A0] text-xs font-mono tracking-[0.3em] uppercase">03 / About</span>
        <div className="h-px flex-1 max-w-16 bg-[rgba(6,214,160,0.3)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start max-w-[1400px]">
        {/* LEFT: Statement */}
        <div className="lg:col-span-7 about-body">
          <h2
            className="text-[#E6FBF6] font-black uppercase mb-10"
            style={{
              fontFamily: '"Climate Crisis", sans-serif',
              fontVariationSettings: '"YEAR" 2024',
              fontSize: 'clamp(2.8rem, 6vw, 80px)',
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
            }}
          >
            {['I build', 'things for', 'the web.'].map((line, i) => (
              <div key={i} className="line-mask">
                <span className={`about-line block ${i === 2 ? 'text-[#06D6A0]' : ''}`}>{line}</span>
              </div>
            ))}
          </h2>

          <div className="space-y-5 text-[rgba(230,251,246,0.6)] text-base md:text-lg font-light leading-relaxed max-w-xl">
            <p>
              Based in Salem, Tamil Nadu. Full stack developer with 3+ years building and maintaining production web platforms — the kind that can't go down.
            </p>
            <p>
              I work across the entire stack: from database schema design and API architecture to custom WebGL shaders and pixel-perfect UI. Currently a Software Technician at Valli Super Speciality Hospital where I keep critical patient management systems running 24/7.
            </p>
            <p>
              I'm particularly interested in the intersection of engineering rigor and visual craft — systems that are both technically sound and genuinely beautiful to use.
            </p>
          </div>

          {/* CV Button */}
          <div className="mt-12">
            <a
              href="/t-mohammed-arif.pdf"
              className="inline-flex items-center gap-4 text-[#E6FBF6] text-sm font-mono tracking-widest uppercase group"
            >
              <span className="w-10 h-px bg-[rgba(6,214,160,0.5)] group-hover:w-16 transition-all duration-500" />
              Download CV
              <span className="text-[#06D6A0] group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
            </a>
          </div>
        </div>

        {/* RIGHT: Image + Stats */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {/* Profile image */}
          <div
            className="about-img-wrap relative overflow-hidden rounded-2xl"
            style={{ aspectRatio: '4/5', clipPath: 'inset(0% 0% 0% 0%)' }}
          >
            <Image
              src="/images/profile.png"
              alt="T Mohammed Arif"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Emerald overlay on image */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(12,65,55,0.8) 0%, transparent 60%)',
              }}
            />
            {/* Name caption */}
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-[#E6FBF6] text-xs font-mono tracking-widest uppercase">
                T Mohammed Arif — Full Stack Engineer
              </p>
              <p className="text-[#06D6A0] text-xs font-mono mt-1">Salem, India · Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="about-stats mt-20 md:mt-28 pt-10 border-t border-[rgba(230,251,246,0.08)] grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <div
              className="text-[#06D6A0] font-black mb-1"
              style={{
                fontFamily: '"Climate Crisis", sans-serif',
                fontVariationSettings: '"YEAR" 2024',
                fontSize: 'clamp(2.5rem, 5vw, 64px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {s.value}
            </div>
            <div className="text-[rgba(230,251,246,0.45)] text-xs font-mono tracking-widest uppercase">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
