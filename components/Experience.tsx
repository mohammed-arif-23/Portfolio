'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const IMPACTS = [
  { num: "01", headline: "Infrastructure at Scale", body: "Owned and maintained critical hospital software and hardware stacks — ensuring zero-downtime 24/7 across a live medical facility." },
  { num: "02", headline: "Zero Downtime Resolution", body: "First-response technical support for medical staff. Diagnosed and resolved high-priority system failures before they impacted patient care." },
  { num: "03", headline: "Query & DB Optimization", body: "Tuned SQL and MongoDB queries, restructured data pipelines and cut administrative retrieval times significantly." },
  { num: "04", headline: "Automation Engineering", body: "Built streamlined Zoho Creator and custom workflows eliminating manual data entry and reducing human error across departments." },
  { num: "05", headline: "Campaign Design", body: "Designed digital campaigns and medical information visuals — bridging clinical complexity with clear, impactful communication." },
];

const TECH_TAGS = ["Next.js", "Node.js", "MongoDB", "SQL", "Zoho Creator", "Automation", "Prompt Eng.", "AI Tools"];

export default function Experience() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {

    /* ── Anime.js draw SVG thread ── */
    if (svgPathRef.current) {
      ScrollTrigger.create({
        trigger: scopeRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          anime({
            targets: svgPathRef.current,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 3500,
          });
        }
      });
    }

    /* ── Anime.js: impact rows rise in ── */
    ScrollTrigger.create({
      trigger: '.impact-list',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        anime({
          targets: '.impact-row',
          opacity: [0, 1],
          translateX: [-60, 0],
          delay: anime.stagger(100),
          duration: 900,
          easing: 'easeOutExpo',
        });
      }
    });

    /* ── Anime.js: tech tags pop ── */
    ScrollTrigger.create({
      trigger: '.exp-tags',
      start: 'top 90%',
      once: true,
      onEnter: () => {
        anime({
          targets: '.exp-tag',
          scale: [0, 1],
          opacity: [0, 1],
          delay: anime.stagger(50),
          duration: 500,
          easing: 'easeOutBack',
        });
      }
    });

    /* ── GSAP: structural reveals ── */
    const ctx = gsap.context(() => {

      // Giant company name crashes DOWN from top
      gsap.fromTo('.exp-company',
        { yPercent: -110, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1.4, ease: 'power4.out',
          scrollTrigger: { trigger: scopeRef.current, start: 'top 75%', once: true }
        }
      );

      // Role slides up from bottom
      gsap.fromTo('.exp-role',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2,
          scrollTrigger: { trigger: scopeRef.current, start: 'top 72%', once: true }
        }
      );

      // Year badge pops
      gsap.fromTo('.exp-badge',
        { scale: 0, rotation: -90, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(2)',
          scrollTrigger: { trigger: scopeRef.current, start: 'top 65%', once: true }
        }
      );

      // Horizontal rules expand
      gsap.fromTo('.exp-rule',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.6, ease: 'power3.out',
          scrollTrigger: { trigger: scopeRef.current, start: 'top 78%', once: true }
        }
      );

      // Parallax on the watermark number
      gsap.to('.exp-watermark', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: scopeRef.current, start: 'top bottom', end: 'bottom top', scrub: true
        }
      });

    }, scopeRef);

    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    /* Light cream — matches brand palette */
    <section ref={scopeRef} className="relative w-full bg-[#E4DDD3] py-24 xl:py-40 px-6 md:px-16 xl:px-32 overflow-hidden">

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
      />

      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="exp-watermark text-[40vw] leading-none font-black text-[#00A19B]/[0.06] will-change-transform"
          style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 1979' }}
        >
          ARIF
        </span>
      </div>

      {/* SVG thread */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            ref={svgPathRef}
            d="M -100,800 C 400,100 900,1400 1400,400 C 1900,-300 2500,900 3000,300"
            fill="none" stroke="#00A19B" strokeWidth="3" strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto">

        {/* ── HEADER: label ── */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[#00A19B]/50 text-xs tracking-[0.5em] uppercase font-mono">Professional Experience · 01</span>
          <span className="exp-badge will-change-transform flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full border border-[#00A19B]/40 text-[#00A19B] opacity-0">
            <span className="text-[9px] md:text-xs font-mono tracking-widest text-center leading-tight uppercase">NOV<br />2025</span>
          </span>
        </div>

        <div className="exp-rule w-full h-px bg-[#00A19B]/25 mb-10 origin-left" />

        {/* ── COMPANY (crashes down) ── */}
        <div className="overflow-hidden mb-2">
          <h2
            className="exp-company text-[#00A19B] text-[clamp(2.5rem,9vw,140px)] leading-[0.8] tracking-tight uppercase will-change-transform"
            style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2024' }}
          >
            VALLI SUPER SPECIALITY HOSPITAL
          </h2>
        </div>

        {/* ── ROLE (slides up) ── */}
        <div className="overflow-hidden mb-12 md:mb-20">
          <h3
            className="exp-role text-[#00A19B] text-[clamp(1rem,3.5vw,52px)] font-bold uppercase tracking-tight will-change-transform"
            style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.06em' }}
          >
            Software Technician · Part-Time · On-site / Hybrid
          </h3>
        </div>

        {/* ── IMPACT LIST ─────────────────────────── */}
        <div className="impact-list flex flex-col border-t border-[#E4DDD3]/8 mb-16 md:mb-24">
          {IMPACTS.map((item, i) => (
            <div
              key={i}
              className="impact-row group flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-8 md:py-10 border-b border-[#00A19B]/12 hover:border-[#00A19B]/50 transition-colors duration-500 cursor-default opacity-0 will-change-transform"
            >
              {/* Number */}
              <span
                className="flex-none text-[#00A19B]/20 text-5xl md:text-7xl font-black leading-none group-hover:text-[#00A19B]/45 transition-colors duration-400 will-change-auto"
                style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 1985' }}
              >
                {item.num}
              </span>

              {/* Content */}
              <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-16">
                <h4
                  className="text-[#00A19B] text-xl md:text-2xl xl:text-3xl font-bold uppercase tracking-tight flex-shrink-0 group-hover:text-[#002f2d] transition-colors duration-400"
                  style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.04em' }}
                >
                  {item.headline}
                </h4>
                <p className="text-[#00A19B]/50 text-sm md:text-base leading-relaxed max-w-[520px] group-hover:text-[#00A19B]/80 transition-colors duration-400">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── TECH TAGS ── */}
        <div className="exp-rule w-full h-px bg-[#00A19B]/20 mb-8 origin-left" />
        <div className="exp-tags flex flex-wrap gap-2.5">
          {TECH_TAGS.map((tag) => (
            <span
              key={tag}
              className="exp-tag px-4 py-2 rounded-full border border-[#00A19B]/25 text-[#00A19B]/60 text-xs font-mono tracking-widest uppercase hover:border-[#00A19B] hover:text-[#00A19B] hover:bg-[#00A19B]/8 transition-all duration-300 cursor-default will-change-transform opacity-0"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
