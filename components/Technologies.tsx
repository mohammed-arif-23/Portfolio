'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const TECH_ITEMS = [
  { name: 'Next.js', src: '/images/logos/Next.js.svg' },
  { name: 'React', src: '/images/logos/React.svg' },
  { name: 'TypeScript', src: '/images/logos/TypeScript.svg' },
  { name: 'Tailwind', src: '/images/logos/Tailwind.svg' },
  { name: 'JavaScript', src: '/images/logos/JavaScript.svg' },
  { name: 'Node.js', src: '/images/logos/Node.js.svg' },
  { name: 'Python', src: '/images/logos/Python.svg' },
  { name: 'PHP', src: '/images/logos/PHP.svg' },
  { name: 'Django', src: '/images/logos/Django.svg' },
  { name: 'MongoDB', src: '/images/logos/MongoDB.svg' },
  { name: 'MySQL', src: '/images/logos/MySQL.svg' },
  { name: 'Supabase', src: '/images/logos/Supabase.svg' },
  { name: 'TensorFlow', src: '/images/logos/TensorFlow.svg' },
  { name: 'PyTorch', src: '/images/logos/PyTorch.svg' },
  { name: 'OpenCV', src: '/images/logos/OpenCV.svg' },
  { name: 'GSAP', src: '/images/logos/gsap-black.svg' },
  { name: 'Redux', src: '/images/logos/Redux.svg' },
  { name: 'Git', src: '/images/logos/Git.svg' },
  { name: 'Express', src: '/images/logos/Express.svg' },
  { name: 'C++', src: '/images/logos/C++.svg' },
  { name: 'Firebase', src: '/images/logos/Firebase.svg' },
  { name: 'HTML5', src: '/images/logos/HTML5.svg' },
];

const N = TECH_ITEMS.length;
const CX = 500, CY = 500, R = 360;
const CIRC = 2 * Math.PI * R;

const positions = TECH_ITEMS.map((_, i) => {
  const a = ((i * 360) / N - 90) * (Math.PI / 180);
  return {
    x: Math.round((CX + R * Math.cos(a)) * 10000) / 10000,
    y: Math.round((CY + R * Math.sin(a)) * 10000) / 10000,
  };
});

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragging, setDragging] = useState(false);

  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isDragRef = useRef(false);
  const lastAngleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastScrollY = useRef(0);
  const inViewRef = useRef(false);

  const applyRotation = (deg: number) => {
    if (!orbitRef.current) return;
    orbitRef.current.style.transform = `rotate(${deg}deg)`;
    document.querySelectorAll<HTMLElement>('.orbit-icon-inner').forEach(el => {
      el.style.transform = `rotate(${-deg}deg)`;
    });
    const norm = ((deg % 360) + 360) % 360;
    let best = 0, bestDiff = Infinity;
    TECH_ITEMS.forEach((_, i) => {
      const iconAngle = (i * 360) / N;
      const atTop = (iconAngle + norm) % 360;
      const diff = Math.min(Math.abs(atTop - 270), 360 - Math.abs(atTop - 270));
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    });
    setActiveIdx(best);
  };

  const startInertia = () => {
    const loop = () => {
      if (isDragRef.current) return;
      velocityRef.current *= 0.965;
      if (Math.abs(velocityRef.current) < 0.04) { rafRef.current = null; return; }
      angleRef.current += velocityRef.current;
      applyRotation(angleRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const onScroll = () => {
      if (!inViewRef.current) return;
      const dy = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      velocityRef.current += dy * 0.008;
      velocityRef.current = Math.max(-18, Math.min(18, velocityRef.current));
      if (!rafRef.current && !isDragRef.current) startInertia();
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  const getPointerAngle = (cx: number, cy: number) => {
    if (!orbitRef.current) return 0;
    const rect = orbitRef.current.getBoundingClientRect();
    const ocx = rect.left + rect.width / 2;
    const ocy = rect.top + rect.height / 2;
    return Math.atan2(cy - ocy, cx - ocx) * (180 / Math.PI);
  };

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      isDragRef.current = true;
      setDragging(true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      velocityRef.current = 0;
      lastAngleRef.current = getPointerAngle(e.clientX, e.clientY);
      lastTimeRef.current = performance.now();
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragRef.current) return;
      const now = performance.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      const newAngle = getPointerAngle(e.clientX, e.clientY);
      let delta = newAngle - lastAngleRef.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      angleRef.current += delta;
      velocityRef.current = (delta / dt) * 16;
      lastAngleRef.current = newAngle;
      lastTimeRef.current = now;
      applyRotation(angleRef.current);
    };

    const onPointerUp = () => {
      if (!isDragRef.current) return;
      isDragRef.current = false;
      setDragging(false);
      startInertia();
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (circleRef.current) {
      const el = circleRef.current;
      el.style.strokeDasharray = `${CIRC}`;
      el.style.strokeDashoffset = `${CIRC}`;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          anime({ targets: el, strokeDashoffset: [CIRC, 0], duration: 2600, easing: 'easeInOutSine' });
          anime({
            targets: '.orbit-icon-inner',
            opacity: [0, 1], scale: [0.5, 1],
            delay: anime.stagger(55, { start: 300 }),
            duration: 400, easing: 'easeOutBack',
          });
          setTimeout(() => { velocityRef.current = 1.6; startInertia(); }, 1200);
        },
      });

      gsap.from('.tech-title', {
        yPercent: 110,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }
  }, []);

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 flex flex-col"
      style={{ background: '#0C4137', minHeight: '100svh' }}
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,214,160,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Section header */}
      <div className="flex items-end justify-between px-6 md:px-12 xl:px-20 mb-2 z-10">
        <div className="overflow-hidden">
          <h2
            className="tech-title text-[#E6FBF6] font-black uppercase"
            style={{
              fontFamily: '"Climate Crisis", sans-serif',
              fontVariationSettings: '"YEAR" 2000',
              fontSize: 'clamp(3rem, 9vw, 128px)',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
            }}
          >
            The Stack
          </h2>
        </div>
        <span className="text-[rgba(230,251,246,0.3)] text-xs font-mono tracking-[0.3em] uppercase mb-2">
          {N} technologies
        </span>
      </div>

      {/* Orbit area */}
      <div className="flex-1 relative flex items-center justify-center px-4 z-10">
        {/* Center info */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-center">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border flex items-center justify-center shadow-xl transition-all duration-200"
              style={{ borderColor: 'rgba(6,214,160,0.3)', background: 'rgba(6,214,160,0.08)' }}
            >
              <img
                src={TECH_ITEMS[activeIdx].src}
                alt={TECH_ITEMS[activeIdx].name}
                className="w-8 h-8 md:w-11 md:h-11 object-contain"
              />
            </div>
            <span
              className="text-[#E6FBF6] uppercase tracking-widest transition-all duration-200"
              style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.12em', fontSize: 'clamp(1.1rem, 2.5vw, 2rem)' }}
            >
              {TECH_ITEMS[activeIdx].name}
            </span>
            <span className="text-[rgba(6,214,160,0.6)] text-xs font-mono tracking-widest uppercase">
              {String(activeIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Draggable wheel */}
        <div
          ref={orbitRef}
          className="relative touch-none select-none will-change-transform z-10"
          style={{
            width: 'min(80vw, 80vh)',
            height: 'min(80vw, 80vh)',
            cursor: dragging ? 'grabbing' : 'grab',
          }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
            <circle cx={CX} cy={CY} r={R + 30} fill="none" stroke="rgba(230,251,246,0.05)" strokeWidth="0.5" />
            <circle
              ref={circleRef}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke="rgba(6,214,160,0.3)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx={CX} cy={CY} r={R - 30} fill="none" stroke="rgba(230,251,246,0.04)" strokeWidth="0.5" />
            {positions.map((pos, i) => {
              const a = ((i * 360) / N - 90) * (Math.PI / 180);
              return (
                <line
                  key={i}
                  x1={CX + (R - 16) * Math.cos(a)} y1={CY + (R - 16) * Math.sin(a)}
                  x2={CX + (R + 16) * Math.cos(a)} y2={CY + (R + 16) * Math.sin(a)}
                  stroke="rgba(6,214,160,0.2)" strokeWidth="1"
                />
              );
            })}
          </svg>

          {TECH_ITEMS.map((item, i) => (
            <div
              key={item.name}
              className="absolute pointer-events-none"
              style={{
                width: 'clamp(36px, 6.5%, 60px)',
                height: 'clamp(36px, 6.5%, 60px)',
                left: `${positions[i].x / 10}%`,
                top: `${positions[i].y / 10}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="orbit-icon-inner w-full h-full rounded-full flex items-center justify-center p-2 border transition-all duration-200 opacity-0 will-change-transform"
                style={{
                  backgroundColor: i === activeIdx ? 'rgba(6,214,160,0.15)' : 'rgba(230,251,246,0.05)',
                  borderColor: i === activeIdx ? 'rgba(6,214,160,0.6)' : 'rgba(230,251,246,0.12)',
                  boxShadow: i === activeIdx ? '0 0 20px rgba(6,214,160,0.3)' : 'none',
                }}
              >
                <img src={item.src} alt={item.name} className="w-full h-full object-contain" draggable={false} />
              </div>
            </div>
          ))}
        </div>

        {/* Hint */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[rgba(230,251,246,0.25)] text-xs font-mono tracking-[0.4em] uppercase pointer-events-none">
          drag to explore
        </p>
      </div>
    </section>
  );
}
