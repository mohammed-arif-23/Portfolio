'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import { createPortal } from 'react-dom';

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
    {
        id: "01",
        rank: "1st Place",
        event: "Web Development",
        category: "Spring Fest · Open Category",
        org: "KSR College of Technology",
        year: "2024",
        img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop",
    },
    {
        id: "02",
        rank: "1st Place",
        event: "Code Debugging",
        category: "National Level Symposium",
        org: "Mahendra Institutions of Technology",
        year: "2024",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1740&auto=format&fit=crop",
    },
];

/* SVG Trophy path — drawn by Anime.js */
const TrophyPath = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
            className="trophy-path"
            d="M25 8 h30 v28 c0 18 -30 18 -30 0 V8z M10 8 h15 v16 c0 8 -15 8 -15 0 V8z M55 8 h15 v16 c0 8 -15 8 -15 0 V8z M32 58 v14 M48 58 v14 M22 72 h36 M30 8 V4 M50 8 V4"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        />
    </svg>
);

const StarPath = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
            className="star-path"
            d="M40 8 L48 30 H72 L52 44 L60 66 L40 52 L20 66 L28 44 L8 30 H32 L40 8Z"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        />
    </svg>
);

export default function Awards() {
    const scopeRef = useRef<HTMLElement>(null);
    const svgRef = useRef<SVGPathElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    /* Physics cursor follow */
    useEffect(() => {
        if (!mounted) return;
        const pos = { x: 0, y: 0 }, mouse = { x: 0, y: 0 };
        const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        window.addEventListener('mousemove', onMove);
        let raf: number;
        const loop = () => {
            pos.x += (mouse.x - pos.x) * 0.08;
            pos.y += (mouse.y - pos.y) * 0.08;
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${pos.x - 160}px, ${pos.y - 100}px)`;
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
    }, [mounted]);

    useEffect(() => {
        /* SVG scroll path draw */
        if (svgRef.current) {
            const len = svgRef.current.getTotalLength?.() || 800;
            svgRef.current.style.strokeDasharray = `${len}`;
            svgRef.current.style.strokeDashoffset = `${len}`;
            ScrollTrigger.create({
                trigger: scopeRef.current,
                start: 'top 70%',
                once: true,
                onEnter: () => {
                    anime({ targets: svgRef.current, strokeDashoffset: [len, 0], duration: 3000, easing: 'easeInOutSine' });
                }
            });
        }

        /* Anime.js: trophy + title animations */
        ScrollTrigger.create({
            trigger: '.award-cards-grid',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                anime({
                    targets: '.award-card',
                    opacity: [0, 1],
                    translateY: [80, 0],
                    rotateX: [20, 0],
                    delay: anime.stagger(150),
                    duration: 1000,
                    easing: 'easeOutExpo',
                });
                // Draw all trophy SVG paths
                document.querySelectorAll('.trophy-path, .star-path').forEach(el => {
                    const path = el as SVGPathElement;
                    const len = path.getTotalLength?.() || 200;
                    anime({
                        targets: path,
                        strokeDashoffset: [len, 0],
                        easing: 'easeInOutSine',
                        duration: 2000,
                        delay: 400,
                    });
                });
            }
        });

        const ctx = gsap.context(() => {
            gsap.fromTo('.award-rule', { scaleX: 0, transformOrigin: 'left center' }, {
                scaleX: 1, duration: 1.8, ease: 'power3.out',
                scrollTrigger: { trigger: scopeRef.current, start: 'top 78%', once: true }
            });
            gsap.fromTo('.award-title-word', { yPercent: 115 }, {
                yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.1,
                scrollTrigger: { trigger: scopeRef.current, start: 'top 76%', once: true }
            });
        }, scopeRef);

        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, []);

    return (
        <section ref={scopeRef} className="relative w-full bg-[#E4DDD3] py-24 xl:py-36 px-6 md:px-16 xl:px-32 overflow-hidden">

            {/* Film grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
            />

            {/* ── SVG BACKGROUND THREAD ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 800">
                    <path
                        ref={svgRef}
                        d="M -50,700 C 200,100 500,800 750,200 C 900,0 1100,500 1150,300"
                        fill="none" stroke="#00A19B" strokeWidth="2" strokeLinecap="round"
                    />
                </svg>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">

                {/* ── TITLE ── */}
                <div className="award-rule w-full h-[2px] bg-[#00A19B]/25 mb-10 origin-left" />
                <div className="flex flex-wrap gap-x-[0.2em] mb-3 overflow-hidden">
                    {["HONORS", "&", "WINS"].map((w, i) => (
                        <div key={i} className="overflow-hidden">
                            <span
                                className="award-title-word inline-block text-[#00A19B] text-[clamp(3rem,11vw,170px)] leading-[0.85] tracking-tight uppercase will-change-transform"
                                style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2000' }}
                            >{w}</span>
                        </div>
                    ))}
                </div>
                <p className="text-[#00A19B]/35 text-xs tracking-[0.4em] uppercase font-mono mb-16">
                    National competitions · {AWARDS.length} first-place recognitions
                </p>

                {/* ── AWARD CARDS ── */}
                <div className="award-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" style={{ perspective: '1200px' }}>
                    {AWARDS.map((a, i) => (
                        <div
                            key={a.id}
                            className="award-card group relative opacity-0 will-change-transform cursor-none"
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Card face */}
                            <div
                                className="relative overflow-hidden rounded-3xl border border-[#00A19B]/15 bg-[#E4DDD3] p-8 md:p-12 transition-all duration-500 group-hover:border-[#00A19B]/40 group-hover:shadow-2xl group-hover:shadow-[#00A19B]/10 group-hover:-translate-y-3"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Number watermark */}
                                <span
                                    className="absolute top-0 right-4 text-[#00A19B]/[0.06] font-black pointer-events-none select-none leading-none"
                                    style={{
                                        fontFamily: '"Climate Crisis", sans-serif',
                                        fontVariationSettings: '"YEAR" 1979',
                                        fontSize: 'clamp(8rem, 20vw, 240px)',
                                    }}
                                >{a.id}</span>

                                {/* Top row: SVG trophy + year */}
                                <div className="flex items-start justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        {/* Animated trophy */}
                                        <div className="w-14 h-16 text-[#00A19B] flex-shrink-0">
                                            <TrophyPath className="w-full h-full" />
                                        </div>
                                        {/* Animated star row */}
                                        <div className="flex gap-1">
                                            {[...Array(3)].map((_, si) => (
                                                <div key={si} className="w-5 h-5 text-[#00A19B]/60">
                                                    <StarPath className="w-full h-full" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-[#00A19B]/40 text-xs font-mono tracking-widest">{a.year}</span>
                                </div>

                                {/* Rank */}
                                <div
                                    className="text-[#00A19B] text-[clamp(2.5rem,7vw,90px)] leading-[0.85] font-black uppercase tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-400"
                                    style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.03em' }}
                                >
                                    {a.rank}
                                </div>

                                {/* Event */}
                                <div className="mb-2">
                                    <div className="text-[#00A19B] text-xl md:text-2xl font-bold uppercase tracking-wide"
                                        style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.05em' }}
                                    >{a.event}</div>
                                    <div className="text-[#00A19B]/50 text-sm font-mono tracking-wider mt-1">{a.category}</div>
                                </div>

                                {/* Org */}
                                <div className="mt-6 pt-6 border-t border-[#00A19B]/12 flex items-center justify-between">
                                    <span className="text-[#00A19B]/45 text-xs font-mono tracking-widest uppercase">{a.org}</span>
                                    <div className="w-9 h-9 rounded-full border border-[#00A19B]/20 flex items-center justify-center group-hover:border-[#00A19B] group-hover:bg-[#00A19B] transition-all duration-400">
                                        <svg className="text-[#00A19B] group-hover:text-[#E4DDD3] transition-colors duration-300" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Teal bottom line on hover */}
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#00A19B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Cursor follower */}
            {mounted && createPortal(
                <div
                    ref={cursorRef}
                    className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-2xl overflow-hidden border border-[#00A19B]/30 shadow-2xl transition-opacity duration-300"
                    style={{ width: '320px', height: '200px', opacity: hovered !== null ? 1 : 0, willChange: 'transform' }}
                >
                    {hovered !== null && <img src={AWARDS[hovered].img} alt="" className="w-full h-full object-cover" />}
                </div>,
                document.body
            )}
        </section>
    );
}