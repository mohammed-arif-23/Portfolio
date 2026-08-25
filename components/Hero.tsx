'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // Subtle blob parallax on mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: W, innerHeight: H } = window;
      const nx = (e.clientX / W - 0.5) * 2;  // -1 to 1
      const ny = (e.clientY / H - 0.5) * 2;
      gsap.to(blob1Ref.current, {
        x: nx * 40,
        y: ny * 25,
        duration: 2.5,
        ease: 'power1.out',
      });
      gsap.to(blob2Ref.current, {
        x: nx * -25,
        y: ny * -18,
        duration: 3,
        ease: 'power1.out',
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Intro reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from('.h-line-inner', {
        yPercent: 115,
        stagger: 0.08,
        duration: 1.1,
        ease: 'power4.out',
      })
      .from('.h-sub', { opacity: 0, y: 14, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.h-meta-item', { opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .from('.h-nav-item', { opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }, '-=0.6');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0C4137 0%, #071e19 100%)' }}
    >
      {/* Emerald atmospheric blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-[-15%] right-[-8%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(6,214,160,0.20) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-[-5%] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(6,214,160,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── HEADER ─────────────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 xl:px-20 py-7">
        {/* Wordmark */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
          className="h-nav-item text-[#E6FBF6] text-sm tracking-[0.25em] uppercase font-semibold"
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          Arif.
        </a>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="h-nav-item px-4 py-2 text-xs tracking-[0.2em] uppercase text-[rgba(230,251,246,0.55)] hover:text-[#E6FBF6] transition-colors duration-200 font-mono"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:mohammedarif1118@gmail.com"
            className="h-nav-item ml-3 px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-mono border border-[rgba(6,214,160,0.4)] text-[#06D6A0] hover:bg-[rgba(6,214,160,0.08)] rounded-full transition-all duration-200"
          >
            Hire me
          </a>
        </nav>
      </header>

      {/* ── HERO BODY ───────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 xl:px-20 py-10">
        {/* Label */}
        <div className="line-mask mb-8">
          <span className="h-line-inner flex items-center gap-3 text-xs font-mono tracking-[0.35em] uppercase text-[#06D6A0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06D6A0] animate-pulse" />
            Available for work · Salem, India
          </span>
        </div>

        {/* HEADLINE — massive display type */}
        <h1 className="display uppercase text-[#E6FBF6] mb-10" aria-label="Full Stack Engineer & Creative Developer">
          {['Full', 'Stack'].map((word, i) => (
            <div key={i} className="line-mask">
              <span
                className="h-line-inner block"
                style={{ fontSize: 'clamp(4.5rem, 13.5vw, 190px)', lineHeight: 0.87 }}
              >
                {word}
              </span>
            </div>
          ))}

          {/* "Engineer" with emerald accent line underneath */}
          <div className="line-mask">
            <span
              className="h-line-inner block text-[#06D6A0]"
              style={{ fontSize: 'clamp(4.5rem, 13.5vw, 190px)', lineHeight: 0.87 }}
            >
              Engineer.
            </span>
          </div>
        </h1>

        {/* Sub copy + CTA row */}
        <div className="h-sub flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-[1400px]">
          <p
            className="text-[rgba(230,251,246,0.65)] text-base md:text-xl font-light leading-relaxed max-w-lg"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            I build web products that are fast, sharp, and actually ship — from patient management systems to immersive 3D interfaces. 3+ years in production.
          </p>

          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); scrollTo('#work'); }}
            className="group inline-flex items-center gap-4 text-[#E6FBF6] text-sm font-mono tracking-widest uppercase whitespace-nowrap"
          >
            <span className="w-12 h-px bg-[#06D6A0] group-hover:w-24 transition-all duration-500" />
            View Work
            <span className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">↓</span>
          </a>
        </div>
      </div>

      {/* ── BOTTOM META BAR ─────────────────────────── */}
      <footer
        className="relative z-10 px-6 md:px-12 xl:px-20 py-6 border-t"
        style={{ borderColor: 'rgba(230,251,246,0.08)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.25em] uppercase text-[rgba(230,251,246,0.4)]">
          <div className="h-meta-item flex items-center gap-6">
            <span>Next.js · Node.js · Python</span>
            <span className="hidden md:block">Three.js · PostgreSQL · MongoDB</span>
          </div>
          <div className="h-meta-item flex items-center gap-6">
            <span className="text-[rgba(6,214,160,0.7)]">15+ Projects</span>
            <span>5k+ Users</span>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
