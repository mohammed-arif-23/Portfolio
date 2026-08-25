'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StrokeText from '@/components/ui/StrokeText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRACTICES = [
  {
    num: "01",
    title: "Product Logic & Architecture",
    category: "System Design",
    desc: "The invisible foundation before code: data schemas, state flow, database indexing, and edge-case modeling.",
    meta: ["Architecture from scratch", "Zero-debt scalability"]
  },
  {
    num: "02",
    title: "Visual Direction & Rhythm",
    category: "Surface & Interaction",
    desc: "Typographic discipline, motion physics, and spatial hierarchy that command attention without unnecessary clutter.",
    meta: ["Design systems", "Micro-interactions"]
  },
  {
    num: "03",
    title: "High-Performance Execution",
    category: "Core Engineering",
    desc: "Next.js 16, Node.js, WebGL2 shaders, and async pipelines built for sub-millisecond responsiveness and zero downtime.",
    meta: ["Production-ready", "100% Uptime"]
  },
  {
    num: "04",
    title: "Maintainable & Evolving Systems",
    category: "Engineering Longevity",
    desc: "Modular codebases, rigorous typing, automated workflows, and robust documentation engineered to outlive trends.",
    meta: ["Modular APIs", "Automation Workflows"]
  }
];

export default function SystemPractice() {
  const [activeTab, setActiveTab] = useState(0);
  const [mode, setMode] = useState<'surface' | 'system'>('system');
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.axis-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="practice"
      className="relative w-full bg-[#E4DDD3] text-[#0A0D0D] py-24 md:py-36 px-6 md:px-16 xl:px-32 overflow-hidden border-t border-[#0A0D0D]/10"
    >
      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px'
        }}
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Top Section Header with specia1ne signature numbering */}
        <header className="flex flex-col gap-6 mb-16 md:mb-24">
          <div className="flex items-center justify-between border-b border-[#0A0D0D]/15 pb-4">
            <p className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-[#0A0D0D]/60">
              <span className="text-[#00A19B] font-bold">03</span>
              <span>/</span>
              <span>Practice & System</span>
            </p>
            <p className="text-xs font-mono tracking-widest text-[#0A0D0D]/50 uppercase">
              In focus: <span className="text-[#00A19B] font-bold font-mono">0{activeTab + 1} / 04</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2
                className="text-[clamp(2.2rem,6vw,84px)] font-bold leading-[0.92] tracking-tight uppercase"
                style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2024' }}
              >
                SURFACE IS WHAT PEOPLE SEE. <br />
                <span className="text-[#00A19B]">SYSTEM IS WHAT MAKES IT WORK.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-[#0A0D0D]/70 text-base md:text-lg font-light leading-relaxed">
                I shape both: the visible interactive experience and the rigorous operating architecture running underneath.
              </p>
            </div>
          </div>
        </header>

        {/* Dual Axis Switcher (Surface vs System Node) */}
        <div className="mb-16 p-6 rounded-3xl border border-[#0A0D0D]/15 bg-white/40 backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#0A0D0D]/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#0A0D0D]/60">Core Dualism</span>
              <span className="font-mono text-sm text-[#00A19B] font-bold">[ • ]</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0A0D0D]/5 p-1 rounded-full border border-[#0A0D0D]/10">
              <button
                type="button"
                onClick={() => setMode('surface')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'surface'
                    ? 'bg-[#00A19B] text-black font-bold shadow-sm'
                    : 'text-[#0A0D0D]/60 hover:text-[#0A0D0D]'
                }`}
              >
                [ Surface ]
              </button>
              <button
                type="button"
                onClick={() => setMode('system')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'system'
                    ? 'bg-[#00A19B] text-black font-bold shadow-sm'
                    : 'text-[#0A0D0D]/60 hover:text-[#0A0D0D]'
                }`}
              >
                [ System ]
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                mode === 'surface'
                  ? 'border-[#00A19B] bg-[#00A19B]/10 shadow-md'
                  : 'border-[#0A0D0D]/10 bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-xl uppercase font-mono tracking-wide">The Surface</h4>
                <span className="text-xs font-mono text-[#00A19B]">01</span>
              </div>
              <p className="text-[#0A0D0D]/70 text-sm leading-relaxed">
                Interfaces, rhythm, micro-interactions, shaders, typography, and optical balance that make complex digital systems clear, fast, and captivating.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                mode === 'system'
                  ? 'border-[#00A19B] bg-[#00A19B]/10 shadow-md'
                  : 'border-[#0A0D0D]/10 bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-xl uppercase font-mono tracking-wide">The System</h4>
                <span className="text-xs font-mono text-[#00A19B]">02</span>
              </div>
              <p className="text-[#0A0D0D]/70 text-sm leading-relaxed">
                Database schemas, serverless logic, caching strategies, zero-downtime reliability, state machines, and modular pipelines that sustain heavy traffic.
              </p>
            </div>
          </div>
        </div>

        {/* The 4-Row Interactive Practice List */}
        <ol className="flex flex-col border-t border-[#0A0D0D]/15">
          {PRACTICES.map((p, i) => (
            <li
              key={p.num}
              onMouseEnter={() => setActiveTab(i)}
              className={`axis-item group relative flex flex-col lg:flex-row lg:items-center justify-between py-8 md:py-10 border-b border-[#0A0D0D]/15 transition-all duration-300 cursor-pointer ${
                activeTab === i ? 'bg-[#00A19B]/5 pl-4 -mx-4 rounded-xl' : ''
              }`}
            >
              {/* Active Indicator Line */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-[#00A19B] transition-opacity duration-300 ${
                  activeTab === i ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Title & Category */}
              <div className="flex items-start gap-6 lg:w-1/2">
                <span
                  className="font-mono text-2xl md:text-3xl font-black text-[#00A19B]"
                >
                  {p.num}
                </span>
                <div>
                  <h3
                    className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#0A0D0D] group-hover:text-[#00A19B] transition-colors"
                    style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.04em' }}
                  >
                    {p.title}
                  </h3>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0A0D0D]/50 mt-1 block">
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 lg:mt-0 lg:w-1/3">
                <p className="text-sm md:text-base text-[#0A0D0D]/70 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              {/* Brackets Metadata */}
              <div className="mt-4 lg:mt-0 lg:w-1/6 flex lg:justify-end">
                <div className="flex flex-col text-[11px] font-mono text-[#0A0D0D]/60 text-left lg:text-right">
                  <span className="text-[#00A19B] font-bold">[ {p.meta[0]}</span>
                  <span>{p.meta[1]} ]</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* ── "ONE CONTINUOUS LINE" MEASURE (specia1ne signature) ── */}
        <div className="mt-20 md:mt-28 pt-12 border-t border-[#0A0D0D]/15">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#0A0D0D]/60">
              The Continuity Principle
            </span>
            <span className="text-xs font-mono text-[#00A19B] uppercase font-bold">
              04 / Continuum
            </span>
          </div>

          <div className="relative py-8 px-4 flex items-center justify-between border border-[#0A0D0D]/15 rounded-3xl bg-white/30 backdrop-blur-sm overflow-hidden">
            {/* Left Tick: Idea */}
            <div className="flex items-center gap-3 relative z-10">
              <span className="w-3 h-3 rounded-full bg-[#00A19B] animate-ping" />
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest font-bold">
                [ IDEA ]
              </span>
            </div>

            {/* Middle Connecting Line with Center Node */}
            <div className="flex-1 mx-6 relative flex items-center justify-center">
              <div className="w-full h-[2px] bg-gradient-to-r from-[#00A19B] via-[#0A0D0D]/40 to-[#00A19B]" />
              <div className="absolute px-4 py-1.5 rounded-full bg-[#E4DDD3] border border-[#0A0D0D]/20 text-[10px] font-mono uppercase tracking-widest font-semibold shadow-md whitespace-nowrap">
                MOHAMMED ARIF · HELD IN ONE LINE
              </div>
            </div>

            {/* Right Tick: Working Form */}
            <div className="flex items-center gap-3 relative z-10">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest font-bold text-[#00A19B]">
                [ WORKING FORM ]
              </span>
              <span className="w-3 h-3 rounded-full bg-[#00A19B]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
