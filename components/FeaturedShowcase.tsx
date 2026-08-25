'use client';

import React from 'react';
import ScrollExpand from '@/components/ui/ScrollExpand';
import StrokeText from '@/components/ui/StrokeText';
import { LiquidGlassCard, LiquidButton, NotificationCenter } from '@/components/ui/LiquidGlassCard';

export default function FeaturedShowcase() {
  return (
    <section className="relative w-full bg-[#0A0D0D] text-white py-16 overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(0,161,155,0.25),transparent_70%)]" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-16 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00A19B] animate-pulse" />
          <span className="text-[#00A19B] text-xs font-mono tracking-[0.4em] uppercase">
            FLAGSHIP ARCHITECTURE & IMMERSIVE STAGE
          </span>
        </div>

        <div className="max-w-3xl">
          <StrokeText
            text="ENGINEERED TO SCALE"
            strokeColor="#00A19B"
            fillColor="#E4DDD3"
            fontSize={72}
            strokeWidth={1.5}
            trigger="scroll"
            fillMode="wipe"
            className="font-bold tracking-tight uppercase"
          />
          <p className="text-white/60 text-base md:text-lg mt-4 font-light leading-relaxed">
            Scroll to open the portal. Explore institutional architectures, high-concurrency portals, and mission-critical production platforms built for real-world reliability.
          </p>
        </div>
      </div>

      {/* ScrollExpand Interactive Stage */}
      <div className="w-full h-[120vh] relative">
        <ScrollExpand
          src="/images/project-thumb-avsengg.png"
          alt="AVS Engineering College Portal Architecture"
          title="AVS INSTITUTIONAL SUITE"
          scrollHint="Scroll to expand view"
          startWidth={48}
          startHeight={58}
          startRadius={28}
          endRadius={0}
          mediaZoom={1.3}
          scrollDistance={1.4}
          holdDistance={0.4}
          overlayScrim={0.65}
          useWindowScroll={true}
          className="w-full h-full"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-6">
            <span className="px-4 py-1.5 rounded-full bg-[#00A19B]/30 border border-[#00A19B] text-[#5eead4] text-xs font-mono uppercase tracking-widest">
              Live Production Deployment · 2024–2026
            </span>

            <h2
              className="text-white text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight"
              style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2024' }}
            >
              MISSION CRITICAL WEB PLATFORMS
            </h2>

            <p className="text-white/80 text-sm md:text-base max-w-2xl font-light leading-relaxed">
              Engineered with optimized SQL indexing, sub-second TTFB, responsive layout systems, and custom automation modules serving tens of thousands of active students and faculty.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
              <a
                href="https://www.avsenggcollege.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiquidButton className="px-6 py-3 rounded-full bg-[#00A19B] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#5eead4]">
                  Launch Live System ↗
                </LiquidButton>
              </a>
              <a
                href="https://github.com/mohammed-arif-23"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiquidButton variant="outline" className="px-6 py-3 rounded-full border-white/30 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10">
                  Inspect Codebase
                </LiquidButton>
              </a>
            </div>
          </div>
        </ScrollExpand>
      </div>

      {/* Interactive Liquid Glass Widget Row */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="text-[#00A19B] text-xs font-mono tracking-[0.3em] uppercase">
            OPERATIONAL PULSE // REAL-TIME SIGNALS
          </span>
          <h3 className="text-2xl md:text-4xl font-bold uppercase text-white" style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.04em' }}>
            Refraction & Liquid Metal Controls
          </h3>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            The user interface responds to live cursor interaction with dynamic SVG displacement map shaders, simulating natural fluid refraction across glass cards and metallic controls.
          </p>
        </div>

        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <NotificationCenter />
        </div>
      </div>
    </section>
  );
}
