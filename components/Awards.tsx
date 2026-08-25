'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HONORS = [
  {
    org: 'Smart India Hackathon',
    year: '2023',
    title: 'National Finalist',
    desc: 'Selected from thousands of teams nationwide for real-world problem-solving in the central government track.',
  },
  {
    org: 'IIT Madras · Shaastra',
    year: '2023',
    title: 'Technical Excellence',
    desc: 'Recognized at one of India\'s premier technical festivals for engineering innovation and project quality.',
  },
  {
    org: 'KPRIET Hackathon',
    year: '2022',
    title: 'Winner',
    desc: 'First-place finish for rapid prototyping and full-stack implementation under pressure.',
  },
  {
    org: 'GDG · Google Devfest',
    year: '2022',
    title: 'Participant',
    desc: 'Participated and networked with the Google Developer ecosystem, learning cutting-edge tooling.',
  },
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.award-title', {
        yPercent: 110,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });

      gsap.from('.award-item', {
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.awards-list', start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 px-6 md:px-12 xl:px-20"
      style={{ background: 'linear-gradient(180deg, #071e19 0%, #0C4137 100%)' }}
    >
      {/* Section tag */}
      <div className="flex items-center gap-4 mb-16 md:mb-24">
        <span className="text-[#06D6A0] text-xs font-mono tracking-[0.3em] uppercase">06 / Recognition</span>
        <div className="h-px flex-1 max-w-16 bg-[rgba(6,214,160,0.3)]" />
      </div>

      {/* Title */}
      <div className="overflow-hidden mb-16 md:mb-20">
        <h2
          className="award-title text-[#E6FBF6] font-black uppercase"
          style={{
            fontFamily: '"Climate Crisis", sans-serif',
            fontVariationSettings: '"YEAR" 2024',
            fontSize: 'clamp(3rem, 8vw, 110px)',
            lineHeight: 0.87,
            letterSpacing: '-0.03em',
          }}
        >
          Honors &amp;<br />
          <span className="text-[#06D6A0]">Recognition.</span>
        </h2>
      </div>

      {/* Awards grid */}
      <div className="awards-list grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(230,251,246,0.06)]">
        {HONORS.map((h, i) => (
          <div
            key={i}
            className="award-item relative group p-8 md:p-10 overflow-hidden"
            style={{ background: '#071e19' }}
          >
            {/* Hover emerald corner */}
            <div
              className="absolute top-0 left-0 w-0 h-0 border-t-0 border-l-0 group-hover:border-t-[2px] group-hover:border-l-[2px] border-[#06D6A0] transition-all duration-300"
              style={{ width: 0, height: 0 }}
            />
            <div className="absolute top-0 left-0 w-0 h-px bg-[#06D6A0] group-hover:w-12 transition-all duration-500" />
            <div className="absolute top-0 left-0 h-0 w-px bg-[#06D6A0] group-hover:h-12 transition-all duration-500" />

            <div className="flex items-start justify-between mb-6">
              <span className="text-[rgba(230,251,246,0.3)] text-xs font-mono tracking-widest uppercase">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[#06D6A0] text-xs font-mono">{h.year}</span>
            </div>

            <p className="text-[rgba(6,214,160,0.7)] text-xs font-mono tracking-widest uppercase mb-3">{h.org}</p>

            <h3
              className="text-[#E6FBF6] font-bold mb-4 transition-colors group-hover:text-[#06D6A0] duration-300"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}
            >
              {h.title}
            </h3>

            <p className="text-[rgba(230,251,246,0.5)] text-sm leading-relaxed font-light">
              {h.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}