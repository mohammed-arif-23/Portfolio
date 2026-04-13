'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const TECH_ITEMS = [
    { name: "Next.js", src: "/images/logos/Next.js.svg" },
    { name: "React", src: "/images/logos/React.svg" },
    { name: "TypeScript", src: "/images/logos/TypeScript.svg" },
    { name: "Tailwind", src: "/images/logos/Tailwind.svg" },
    { name: "JavaScript", src: "/images/logos/JavaScript.svg" },
    { name: "HTML5", src: "/images/logos/HTML5.svg" },
    { name: "GSAP", src: "/images/logos/gsap-black.svg" },
    { name: "Node.js", src: "/images/logos/Node.js.svg" },
    { name: "Python", src: "/images/logos/Python.svg" },
    { name: "PHP", src: "/images/logos/PHP.svg" },
    { name: "Django", src: "/images/logos/Django.svg" },
    { name: "MongoDB", src: "/images/logos/MongoDB.svg" },
    { name: "MySQL", src: "/images/logos/MySQL.svg" },
    { name: "Supabase", src: "/images/logos/Supabase.svg" },
    { name: "Firebase", src: "/images/logos/Firebase.svg" },
    { name: "TensorFlow", src: "/images/logos/TensorFlow.svg" },
    { name: "PyTorch", src: "/images/logos/PyTorch.svg" },
    { name: "OpenCV", src: "/images/logos/OpenCV.svg" },
    { name: "Redux", src: "/images/logos/Redux.svg" },
    { name: "C++", src: "/images/logos/C++.svg" },
    { name: "Git", src: "/images/logos/Git.svg" },
    { name: "Express", src: "/images/logos/Express.svg" },
];

const N = TECH_ITEMS.length;
const CX = 500;
const CY = 500;
const R = 360;
const CIRC = 2 * Math.PI * R;

// Pre-compute icon positions (0–1000 virtual space) — rounded to prevent SSR hydration mismatch
const positions = TECH_ITEMS.map((_, i) => {
    const a = ((i * 360) / N - 90) * (Math.PI / 180);
    return {
        x: Math.round((CX + R * Math.cos(a)) * 10000) / 10000,
        y: Math.round((CY + R * Math.sin(a)) * 10000) / 10000,
    };
});

export default function Technologies() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [dragging, setDragging] = useState(false);

    // Physics state — kept in refs so RAF loop doesn't re-render
    const angleRef = useRef(0);   // current rotation degrees
    const velocityRef = useRef(0);   // degrees/frame
    const rafRef = useRef<number | null>(null);
    const isDragRef = useRef(false);
    const lastAngleRef = useRef(0);
    const lastTimeRef = useRef(0);
    const lastScrollY = useRef(0);
    const inViewRef = useRef(false);  // is section visible?

    /* ── Apply rotation to DOM directly (no React re-render) ── */
    const applyRotation = useCallback((deg: number) => {
        if (!orbitRef.current) return;
        orbitRef.current.style.transform = `rotate(${deg}deg)`;
        // Counter-rotate each icon inner so they stay upright
        document.querySelectorAll<HTMLElement>('.orbit-icon-inner').forEach(el => {
            el.style.transform = `rotate(${-deg}deg)`;
        });
        // Update active index: which icon is nearest the top (12 o'clock)
        const norm = ((deg % 360) + 360) % 360;
        // top = 270° in orbit terms (because we start icons at -90°)
        let best = 0, bestDiff = Infinity;
        TECH_ITEMS.forEach((_, i) => {
            const iconAngle = (i * 360) / N; // 0–360
            const atTop = (iconAngle + norm) % 360; // position when orbit rotated
            const diff = Math.min(Math.abs(atTop - 270), 360 - Math.abs(atTop - 270));
            if (diff < bestDiff) { bestDiff = diff; best = i; }
        });
        setActiveIdx(best);
    }, []);

    /* ── Start inertia loop (shared by scroll + drag) ── */
    const startInertia = useCallback(() => {
        const loop = () => {
            if (isDragRef.current) return;
            velocityRef.current *= 0.965; // friction
            if (Math.abs(velocityRef.current) < 0.04) {
                rafRef.current = null;
                return;
            }
            angleRef.current += velocityRef.current;
            applyRotation(angleRef.current);
            rafRef.current = requestAnimationFrame(loop);
        };
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(loop);
    }, [applyRotation]);

    /* ── Scroll → velocity injection ── */
    useEffect(() => {
        // Track visibility so scroll only spins when section is on screen
        const observer = new IntersectionObserver(
            ([entry]) => { inViewRef.current = entry.isIntersecting; },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);

        const onScroll = () => {
            if (!inViewRef.current) return;
            const dy = window.scrollY - lastScrollY.current;
            lastScrollY.current = window.scrollY;
            // Convert px scroll delta → degrees of spin
            velocityRef.current += dy * 0.008;
            // Clamp to avoid violent jumps on fast scroll
            velocityRef.current = Math.max(-18, Math.min(18, velocityRef.current));
            if (!rafRef.current && !isDragRef.current) startInertia();
        };

        lastScrollY.current = window.scrollY;
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, [startInertia]);

    /* ── Get angle from pointer relative to orbit center ── */
    const getPointerAngle = (clientX: number, clientY: number): number => {
        if (!orbitRef.current) return 0;
        const rect = orbitRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
    };

    /* ── Pointer events ── */
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
            // Clamp wrap-around (from -179 → 179 etc.)
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;

            angleRef.current += delta;
            velocityRef.current = (delta / dt) * 16; // normalize to 60fps
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
    }, [applyRotation, startInertia]);

    /* ── GSAP scroll animation for section entry ── */
    useEffect(() => {
        // Draw the SVG ring on enter with Anime.js
        if (circleRef.current) {
            const el = circleRef.current;
            el.style.strokeDasharray = `${CIRC}`;
            el.style.strokeDashoffset = `${CIRC}`;
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 70%',
                once: true,
                onEnter: () => {
                    // Draw ring
                    anime({ targets: el, strokeDashoffset: [CIRC, 0], duration: 2600, easing: 'easeInOutSine' });
                    // Icons scale in
                    anime({
                        targets: '.orbit-icon-inner',
                        opacity: [0, 1], scale: [0, 1],
                        delay: anime.stagger(55, { start: 300 }),
                        duration: 550, easing: 'easeOutBack',
                    });
                    // Auto-spin to give hint it's draggable
                    setTimeout(() => {
                        velocityRef.current = 1.8;
                        startInertia();
                    }, 1200);
                }
            });
        }

        // GSAP title reveal
        const ctx = gsap.context(() => {
            gsap.fromTo('.tech-title-word',
                { yPercent: 110 },
                {
                    yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.1,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
                }
            );
        }, sectionRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [startInertia]);

    return (
        /* Clean single-screen section — no scroll gimmicks, pure interaction */
        <section
            ref={sectionRef}
            className="relative w-full bg-[#00A19B] overflow-hidden flex flex-col"
            style={{ minHeight: '100svh' }}
        >

            {/* Film grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
            />

            {/* ── TITLE ROW ── */}
            <div className="flex-none flex items-end justify-between px-6 md:px-16 xl:px-24 pt-10 md:pt-14 pb-2 z-10">
                <div className="flex flex-wrap gap-x-[0.2em]">
                    {["THE", "ARSENAL"].map((w, i) => (
                        <div key={i} className="overflow-hidden">
                            <span
                                className="tech-title-word inline-block text-[#E4DDD3] text-[clamp(2.2rem,8vw,120px)] leading-[0.85] tracking-tight uppercase will-change-transform"
                                style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2000' }}
                            >{w}</span>
                        </div>
                    ))}
                </div>
                <span className="text-[#E4DDD3]/40 text-xs font-mono tracking-[0.3em] uppercase mb-2 hidden md:block">
                    {N} technologies
                </span>
            </div>

            {/* ── ORBIT AREA ── */}
            <div className="flex-1 relative flex items-center justify-center px-4 py-4">

                {/* Hint text */}
                <p className="absolute top-0 left-1/2 -translate-x-1/2 text-[#E4DDD3]/30 text-[10px] font-mono tracking-[0.4em] uppercase pointer-events-none select-none">
                    drag to spin
                </p>

                {/* Center info overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
                        <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#00A19B] border border-[#E4DDD3]/20 flex items-center justify-center">
                            <img
                                src={TECH_ITEMS[activeIdx].src}
                                alt={TECH_ITEMS[activeIdx].name}
                                className="w-8 h-8 md:w-12 md:h-12 object-contain transition-all duration-200"
                            />
                        </div>
                        <span
                            className="text-[#E4DDD3] text-xl md:text-3xl uppercase tracking-widest transition-all duration-200"
                            style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.12em' }}
                        >
                            {TECH_ITEMS[activeIdx].name}
                        </span>
                        <span className="text-[#E4DDD3]/30 text-[10px] font-mono tracking-widest uppercase">
                            {String(activeIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* ── ORBIT WHEEL ── draggable container */}
                <div
                    ref={orbitRef}
                    className="relative touch-none select-none will-change-transform z-10"
                    style={{
                        width: 'min(78vw, 78vh)',
                        height: 'min(78vw, 78vh)',
                        cursor: dragging ? 'grabbing' : 'grab',
                    }}
                >
                    {/* SVG: ring + ticks */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1000 1000"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Ghost outer ring */}
                        <circle cx={CX} cy={CY} r={R + 28} fill="none" stroke="#E4DDD3" strokeWidth="0.5" opacity="0.1" />
                        {/* Animated main ring */}
                        <circle
                            ref={circleRef}
                            cx={CX} cy={CY} r={R}
                            fill="none"
                            stroke="#E4DDD3"
                            strokeWidth="1.5"
                            opacity="0.35"
                            strokeLinecap="round"
                        />
                        {/* Ghost inner ring */}
                        <circle cx={CX} cy={CY} r={R - 28} fill="none" stroke="#E4DDD3" strokeWidth="0.5" opacity="0.08" />
                        {/* Tick marks */}
                        {positions.map((pos, i) => {
                            const a = ((i * 360) / N - 90) * (Math.PI / 180);
                            return (
                                <line
                                    key={i}
                                    x1={CX + (R - 14) * Math.cos(a)} y1={CY + (R - 14) * Math.sin(a)}
                                    x2={CX + (R + 14) * Math.cos(a)} y2={CY + (R + 14) * Math.sin(a)}
                                    stroke="#E4DDD3" strokeWidth="1" opacity="0.18"
                                />
                            );
                        })}
                    </svg>

                    {/* Tech icons — positioned around circumference */}
                    {TECH_ITEMS.map((item, i) => (
                        <div
                            key={item.name}
                            className="absolute pointer-events-none"
                            style={{
                                width: 'clamp(38px, 7%, 64px)',
                                height: 'clamp(38px, 7%, 64px)',
                                left: `${positions[i].x / 10}%`,
                                top: `${positions[i].y / 10}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {/* Inner div counter-rotates to keep icons upright */}
                            <div
                                className="orbit-icon-inner w-full h-full rounded-full flex items-center justify-center p-2 border transition-all duration-200 opacity-0 will-change-transform"
                                style={{
                                    backgroundColor: i === activeIdx ? '#E4DDD3' : 'rgba(228,221,211,0.08)',
                                    borderColor: i === activeIdx ? '#E4DDD3' : 'rgba(228,221,211,0.22)',
                                    boxShadow: i === activeIdx ? '0 0 20px rgba(228,221,211,0.35)' : 'none',
                                    transform: 'rotate(0deg)',
                                }}
                            >
                                <img
                                    src={item.src}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                    draggable={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}
