'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import MagneticWrapper from './MagneticWrapper';

gsap.registerPlugin(ScrollTrigger);

/* ─── Stats ──────────────────────────────────────────────── */
const STATS = [
  { value: 15, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: 'yrs', label: 'Real-World Experience' },
  { value: 5, suffix: 'k+', label: 'Users Served' },
  { value: 8, suffix: '+', label: 'Tech Domains' },
];

const BIO_WORDS = "I engineer  digital  experiences  that  blur the  line between art  and  technology — crafting fast, beautiful, soul-first products for the real world.".split(/\s+/);

/* ─── Component ───────────────────────────────────────────── */
export default function About() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGPathElement>(null);
  const svgRef2 = useRef<SVGPathElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useEffect(() => {
    /* ── Cursor reactive glow ─────────────────────────── */
    const onMove = (e: MouseEvent) => {
      if (!cursorGlowRef.current) return;
      gsap.to(cursorGlowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.2,
        ease: 'power3.out',
      });
    };
    window.addEventListener('mousemove', onMove);

    /* ── Anime SVG draw ────────────────────────────────── */
    let a1: anime.AnimeInstance, a2: anime.AnimeInstance;
    if (svgRef.current) {
      a1 = anime({ targets: svgRef.current, strokeDashoffset: [anime.setDashoffset, 0], easing: 'easeInOutSine', duration: 5000, loop: true, direction: 'alternate' });
    }
    if (svgRef2.current) {
      a2 = anime({ targets: svgRef2.current, strokeDashoffset: [anime.setDashoffset, 0], easing: 'easeInOutCubic', duration: 7000, loop: true, direction: 'alternate', delay: 1500 });
    }

    /* ── Main GSAP ctx ─────────────────────────────────── */
    const ctx = gsap.context(() => {

      /* === SCENE 1: TITLE CRASH-IN ===================== */
      const s1 = gsap.timeline({
        scrollTrigger: { trigger: '#s1', start: 'top top', end: 'bottom top', scrub: 1.5 }
      });
      // Giant title shatters in from 3D space
      s1.fromTo('#s1 .title-top',
        { yPercent: -120, rotationX: 90, opacity: 0, transformOrigin: 'center bottom' },
        { yPercent: 0, rotationX: 0, opacity: 1, duration: 1.5, ease: 'power4.out' }, 0
      )
        .fromTo('#s1 .title-bot',
          { yPercent: 120, rotationX: -90, opacity: 0, transformOrigin: 'center top' },
          { yPercent: 0, rotationX: 0, opacity: 1, duration: 1.5, ease: 'power4.out' }, 0
        )
        // On exit — implode back
        .to('#s1 .exit-dissolve', {
          scale: 0.5, opacity: 0, filter: 'blur(60px)', duration: 1, ease: 'power4.in'
        }, 1.5)
        // SVG path parallax
        .to('#s1 .svg-layer', { yPercent: -30, ease: 'none' }, 0);

      /* === SCENE 2: KINETIC STAT COUNTER ============== */
      const s2 = gsap.timeline({
        scrollTrigger: { trigger: '#s2', start: 'top top', end: 'bottom top', scrub: 1.2 }
      });

      // Horizontal rule smash
      s2.fromTo('#s2 .hr-left', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'power4.out' }, 0);
      s2.fromTo('#s2 .hr-right', { scaleX: 0, transformOrigin: 'right center' }, { scaleX: 1, duration: 1.2, ease: 'power4.out' }, 0.2);

      // Each stat card flips in from 3D
      gsap.utils.toArray('#s2 .stat-card').forEach((el, i) => {
        s2.fromTo(el as Element,
          { rotationY: 90, opacity: 0, transformOrigin: 'left center', x: -80 },
          { rotationY: 0, opacity: 1, x: 0, duration: 1.2, ease: 'power4.out' },
          i * 0.15
        );
      });

      // Count up the numbers (triggered independently by visibility)
      STATS.forEach((stat, i) => {
        const el = document.getElementById(`stat-num-${i}`);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            anime({ targets: { val: 0 }, val: stat.value, duration: 2200, easing: 'easeOutExpo', round: 1, update(a) { el.textContent = Math.floor(a.animations[0].currentValue as any).toString(); } });
          }
        });
      });

      // Exit: cards slam into rows collapsing
      s2.to('#s2 .stat-card', { y: 80, opacity: 0, stagger: 0.08, duration: 1, ease: 'power4.in' }, 2);

      /* === SCENE 3: WORD-MASK BIO SCRUB ============== */
      const s3 = gsap.timeline({
        scrollTrigger: { trigger: '#s3', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      // Bio words slide up from masked clips, one wave
      const bioWords = gsap.utils.toArray('#s3 .bio-mask-inner');
      gsap.set(bioWords, { y: '110%' });
      s3.to(bioWords, { y: '0%', stagger: 0.04, duration: 2, ease: 'power4.out' }, 0);

      // Background teal floods in from bottom
      s3.fromTo('#s3 .teal-flood', { yPercent: 100 }, { yPercent: 0, duration: 1.5, ease: 'power3.inOut' }, 0);

      // CV badge spins into position
      s3.fromTo('#s3 .cv-spin-badge',
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.6)' }, 0.5
      );

    }, wrapRef);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMove);
      a1?.pause();
      a2?.pause();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">

      {/* ── CURSOR GLOW ──────────────────────────────── */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999] bg-[#00A19B]/10 blur-[120px]"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* ══════════════════════════════════════════════
          SCENE 1 — "WHO I AM" CRASH TITLE   (100vh sticky)
      ══════════════════════════════════════════════════ */}
      <div id="s1" className="relative h-[250vh] bg-[#E4DDD3]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center" style={{ perspective: '1200px' }}>

          {/* SVG Layer */}
          <div className="absolute inset-0 svg-layer pointer-events-none overflow-hidden opacity-70">
            <svg className="w-[200vw] h-full absolute -left-[50vw]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path ref={svgRef} d="M-200,300 Q400,-200 900,600 T2000,200 T3000,700" fill="none" stroke="#00A19B" strokeWidth="6" strokeLinecap="round" />
              <path ref={svgRef2} d="M-200,700 Q600,1200 1200,100 T2400,800 T3400,200" fill="none" stroke="#00A19B" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>

          {/* Grain texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
          />

          {/* Giant 3D crash title */}
          <div className="exit-dissolve will-change-transform text-center select-none px-4">
            <h2
              className="title-top block text-[#00A19B] text-[clamp(5rem,18vw,280px)] leading-[0.75] tracking-[-0.04em] uppercase will-change-transform"
              style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2024' }}
            >
              WHO
            </h2>
            <h2
              className="title-bot block text-[#00A19B] text-[clamp(5rem,18vw,280px)] leading-[0.75] tracking-[-0.04em] uppercase will-change-transform"
              style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 1979' }}
            >
              AM I?
            </h2>
          </div>

          {/* Baseline label */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[#00A19B] text-xs tracking-[0.4em] uppercase font-mono">Scroll to discover</span>
            <div className="w-px h-16 bg-[#00A19B] animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SCENE 2 — STAT COUNTER GRID   (250vh sticky)
      ══════════════════════════════════════════════════ */}
      <div id="s2" className="relative h-[250vh] bg-[#00A19B]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-6 md:px-16 xl:px-32" style={{ perspective: '800px' }}>

          {/* Grain overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
          />

          <div className="relative z-10 flex flex-col gap-8 md:gap-12">
            {/* Top rule + label */}
            <div className="flex items-center gap-6">
              <div className="hr-left flex-1 h-[2px] bg-[#E4DDD3]/40"></div>
              <span className="text-[#E4DDD3]/60 text-xs tracking-[0.5em] uppercase font-mono shrink-0">By The Numbers</span>
              <div className="hr-right flex-1 h-[2px] bg-[#E4DDD3]/40"></div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card group relative border border-[#E4DDD3]/20 rounded-2xl p-6 md:p-8 xl:p-10 overflow-hidden cursor-default will-change-transform hover:border-[#E4DDD3]/60 transition-colors duration-500"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  {/* Card hover flood */}
                  <div className={`absolute inset-0 bg-[#E4DDD3]/10 transition-all duration-500 ${hoveredStat === i ? 'opacity-100' : 'opacity-0'}`}></div>

                  <p className="text-[#E4DDD3] text-[clamp(3rem,7vw,100px)] font-bold leading-none tabular-nums" style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2000' }}>
                    <span id={`stat-num-${i}`}>0</span>
                    <span className="text-[#E4DDD3]/60 text-[0.4em] align-top ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-[#E4DDD3]/70 text-sm md:text-base mt-3 md:mt-4 uppercase tracking-widest font-mono">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bottom label */}
            <p className="text-[#E4DDD3]/40 text-sm font-mono tracking-widest text-right uppercase">Mohammed Arif · Full Stack Developer</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SCENE 3 — MASK-REVEAL BIO + CV BADGE   (300vh sticky)
      ══════════════════════════════════════════════════ */}
      <div id="s3" className="relative h-[300vh] bg-[#E4DDD3]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

          {/* Teal flood from the bottom */}
          <div className="absolute inset-0 teal-flood bg-[#00A19B] pointer-events-none z-0 will-change-transform"></div>

          {/* Grain overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-10"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
          />

          {/* Bio text mask reveal */}
          <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-16 xl:px-32 flex flex-col justify-center h-full">
            <h2 className="text-[#E4DDD3] text-[clamp(2rem,3.8vw,65px)] font-bold leading-[1.15] tracking-tight" style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.04em' }}>
              {BIO_WORDS.map((word, i) => (
                <span key={i} className="inline-flex overflow-hidden pb-[0.1em] -mb-[0.1em] mr-[0.4em]">
                  <span className="bio-mask-inner inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Actions row */}
            <div className="mt-12 md:mt-20 flex items-center gap-8 flex-wrap">
              <MagneticWrapper>
                <a
                  href="t-mohammed-arif.pdf"
                  className="cv-spin-badge will-change-transform flex flex-col items-center justify-center w-[130px] h-[130px] md:w-[170px] md:h-[170px] rounded-full bg-[#E4DDD3] text-[#00A19B] group overflow-hidden relative shadow-2xl hover:shadow-[0_0_80px_rgba(0,161,155,0.6)] transition-shadow duration-500"
                >
                  <span
                    className="text-2xl md:text-3xl uppercase leading-none text-center group-hover:-translate-y-[200%] transition-transform duration-500 will-change-transform font-bold"
                    style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2024' }}
                  >GET<br />CV</span>
                  <span className="absolute text-3xl md:text-4xl translate-y-[200%] group-hover:translate-y-0 transition-transform duration-500 will-change-transform">↓</span>
                </a>
              </MagneticWrapper>

              <div className="flex flex-col gap-1">
                <span className="text-[#E4DDD3]/60 text-xs uppercase tracking-[0.4em] font-mono">Currently open to work</span>
                <span className="text-[#E4DDD3] text-lg md:text-2xl font-semibold" style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.05em' }}>Full Stack · Frontend · Backend</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
