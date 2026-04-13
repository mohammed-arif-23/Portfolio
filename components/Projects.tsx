'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: "01", label: "College Website", year: "2024",
        title: "AVSEC",
        desc: "Official website of AVS Engineering College — high-performance, Tamil Nadu's flagship institution.",
        stack: ["PHP", "MySQL", "HTML/CSS"],
        img: "/images/project-thumb-avsengg.png",
        link: "https://www.avsenggcollege.ac.in/",
    },
    {
        id: "02", label: "College Website", year: "2024",
        title: "SSWC",
        desc: "Mobile-first site for Sakthi Kailash Women's College — admissions, departments, campus life.",
        stack: ["PHP", "MySQL", "HTML/CSS"],
        img: "/images/project-thumb-sswc.png",
        link: "https://www.sakthikailashcollege.org/",
    },
    {
        id: "03", label: "College Portal", year: "2024",
        title: "AVS OMALUR",
        desc: "Production-ready academic portal — programmes, events, SEO-optimized for students & faculty.",
        stack: ["PHP", "MySQL", "HTML/CSS"],
        img: "/images/project-thumb-avsomalur.png",
        link: "https://www.avscollegeomalur.edu.in/",
    },
    {
        id: "04", label: "Booking Platform", year: "2024",
        title: "CINEMAHUB",
        desc: "Live ticket booking with interactive seat selection and automated email confirmations.",
        stack: ["Next.js", "Node.js", "Express"],
        img: "/images/project-thumb-1.png",
        link: "http://cinemahub-arif.vercel.app/",
    },
    {
        id: "05", label: "AI Vision", year: "2023",
        title: "PIX2PLATE",
        desc: "Deep learning platform for food recognition and nutritional analysis via computer vision.",
        stack: ["Python", "TensorFlow", "OpenCV"],
        img: "/images/project-thumb-pixels-to-plates.png",
        link: "https://pixelstoplates.streamlit.app/",
    },
    {
        id: "06", label: "ML Recommender", year: "2023",
        title: "MOVIE AI",
        desc: "Cosine-similarity recommendation engine over a rich curated movie dataset.",
        stack: ["Python", "Streamlit", "Pandas"],
        img: "/images/project-thumb-3.png",
        link: "https://arif-nm-movieapi.streamlit.app/",
    },
];

const N = PROJECTS.length;
const ROTATIONS = [-4, 3, -2, 5, -3, 2]; // fixed — avoids hydration mismatch

export default function Projects() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGPathElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!cards.length || !wrapRef.current) return;

        // ── Initial DOM state ──
        // Card 0: fully visible, centered
        // Cards 1-N: hidden below (yPercent 100)
        cards.forEach((card, i) => {
            gsap.set(card, {
                yPercent: i === 0 ? 0 : 100,
                x: 0, y: 0,
                scale: 1,
                rotation: 0,
                borderRadius: 0,
                zIndex: N - i,
            });
        });

        // Corner slot for each dismissed card (top-left cluster)
        const getCornerPos = (idx: number) => {
            const col = idx % 4;
            const row = Math.floor(idx / 4);
            return {
                x: -(window.innerWidth * 0.5) + 50 + col * 90,
                y: -(window.innerHeight * 0.5) + 50 + row * 76,
            };
        };

        // ── ScrollTrigger — NO pin, CSS sticky handles viewport lock ──
        const st = ScrollTrigger.create({
            trigger: wrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.65,
            onUpdate: (self) => {
                // rawStep: 0 → N-1 across the full scroll range
                const rawStep = self.progress * (N - 1);
                setActive(Math.min(Math.round(rawStep), N - 1));

                cards.forEach((card, i) => {
                    // When does card i enter and exit?
                    // Card i enters: rawStep goes from (i-1) to i
                    // Card i exits : rawStep goes from i to (i+1)
                    const enterProgress = i === 0 ? 1 : gsap.utils.clamp(0, 1, rawStep - (i - 1));
                    const exitProgress = gsap.utils.clamp(0, 1, rawStep - i);

                    if (exitProgress > 0) {
                        // Card is exiting toward top-left corner
                        const pos = getCornerPos(i);
                        gsap.set(card, {
                            yPercent: 0,
                            x: pos.x * exitProgress,
                            y: pos.y * exitProgress,
                            scale: 1 - (1 - 0.18) * exitProgress,
                            rotation: ROTATIONS[i] * exitProgress,
                            borderRadius: 14 * exitProgress,
                        });
                    } else if (enterProgress < 1) {
                        // Card is entering from below
                        gsap.set(card, {
                            yPercent: (1 - enterProgress) * 100,
                            x: 0, y: 0,
                            scale: 1,
                            rotation: 0,
                            borderRadius: 0,
                        });
                    } else {
                        // Card is fully active and centred
                        gsap.set(card, {
                            yPercent: 0,
                            x: 0, y: 0,
                            scale: 1,
                            rotation: 0,
                            borderRadius: 0,
                        });
                    }
                });
            },
        });

        // ── Anime.js: draw SVG thread on scroll entry ──
        if (svgRef.current) {
            const len = svgRef.current.getTotalLength?.() || 800;
            svgRef.current.style.strokeDasharray = String(len);
            svgRef.current.style.strokeDashoffset = String(len);
            ScrollTrigger.create({
                trigger: wrapRef.current,
                start: 'top 65%',
                once: true,
                onEnter: () => {
                    anime({ targets: svgRef.current, strokeDashoffset: [len, 0], duration: 3000, easing: 'easeInOutSine' });
                },
            });
        }

        // ── Title crash ──
        gsap.fromTo('.proj-title-span', { yPercent: 115 }, {
            yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.1,
            scrollTrigger: { trigger: wrapRef.current, start: 'top 80%', once: true },
        });

        return () => { st.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, []);

    // ── 3D parallax tilt on the active card only ──
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
        if (i !== active) return;
        const el = cardRefs.current[i];
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const imgEl = el.querySelector<HTMLElement>('.c-img');
        const infoEl = el.querySelector<HTMLElement>('.c-info');
        const numEl = el.querySelector<HTMLElement>('.c-num');
        if (imgEl) gsap.to(imgEl, { x: x * 24, y: y * 24, duration: 0.5, ease: 'power2.out' });
        if (infoEl) gsap.to(infoEl, { x: x * 10, y: y * 10, duration: 0.5, ease: 'power2.out' });
        if (numEl) gsap.to(numEl, { x: x * -18, y: y * -18, duration: 0.5, ease: 'power2.out' });
    };

    const handleMouseLeave = (i: number) => {
        if (i !== active) return;
        const el = cardRefs.current[i];
        if (!el) return;
        ['.c-img', '.c-info', '.c-num'].forEach(cls => {
            gsap.to(el.querySelector<HTMLElement>(cls), { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' });
        });
    };

    return (
        /*
         * Outer: N × 100vh creates the scroll space.
         * Inner: CSS sticky locks it to the viewport — NO GSAP pin.
         */
        <div ref={wrapRef} style={{ height: `${N * 100}vh` }} className="relative bg-[#E4DDD3]">

            {/* ── CSS-STICKY VIEWPORT ── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Film grain */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
                />

                {/* SVG decorative thread */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path
                            ref={svgRef}
                            d="M -100,600 C 300,-100 600,900 1000,200 C 1300,-200 1600,700 2000,300"
                            fill="none" stroke="#00A19B" strokeWidth="2.5" strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* ── HEADER ── */}
                <div className="absolute top-0 left-0 right-0 z-50 flex items-end justify-between px-6 md:px-12 xl:px-20 pt-8 pb-3 pointer-events-none">
                    <div className="flex flex-wrap gap-x-[0.18em] overflow-hidden">
                        {['SELECTED', 'WORKS'].map((w, i) => (
                            <div key={i} className="overflow-hidden">
                                <span
                                    className="proj-title-span inline-block text-[#00A19B] leading-[0.85] tracking-tight uppercase will-change-transform"
                                    style={{
                                        fontFamily: '"Climate Crisis", sans-serif',
                                        fontVariationSettings: '"YEAR" 2000',
                                        fontSize: 'clamp(1.6rem, 5vw, 72px)',
                                    }}
                                >{w}</span>
                            </div>
                        ))}
                    </div>

                    {/* Dot progress + counter */}
                    <div className="flex items-center gap-2 mb-1">
                        {PROJECTS.map((_, i) => (
                            <div
                                key={i}
                                className="rounded-full transition-all duration-500"
                                style={{
                                    width: i === active ? 28 : 6,
                                    height: 6,
                                    backgroundColor: i <= active ? '#00A19B' : 'rgba(0,161,155,0.2)',
                                }}
                            />
                        ))}
                        <span className="ml-2 text-[#00A19B]/40 text-xs font-mono tabular-nums">
                            {String(active + 1).padStart(2, '0')}/{String(N).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* ── CARDS ── */}
                {PROJECTS.map((p, i) => (
                    <div
                        key={p.id}
                        ref={el => { cardRefs.current[i] = el; }}
                        className="absolute inset-0 w-full h-full will-change-transform overflow-hidden"
                        onMouseMove={e => handleMouseMove(e, i)}
                        onMouseLeave={() => handleMouseLeave(i)}
                        onClick={() => { if (i === active) window.open(p.link, '_blank'); }}
                        style={{ cursor: i === active ? 'pointer' : 'default' }}
                    >
                        {/* Full-bleed image */}
                        <div className="c-img absolute inset-0 will-change-transform">
                            <img
                                src={p.img}
                                alt={p.title}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                            {/* Gradient overlays so copy is always readable */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#E4DDD3] via-[#E4DDD3]/50 to-[#E4DDD3]/05" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#E4DDD3]/75 via-transparent to-transparent" />
                        </div>

                        {/* Giant number watermark */}
                        <span
                            className="c-num absolute right-0 bottom-0 text-[#00A19B]/[0.05] font-black leading-none pointer-events-none select-none will-change-transform"
                            style={{
                                fontFamily: '"Climate Crisis", sans-serif',
                                fontVariationSettings: '"YEAR" 1979',
                                fontSize: 'clamp(14rem, 40vw, 560px)',
                            }}
                        >{p.id}</span>

                        {/* Content */}
                        <div className="c-info absolute bottom-0 left-0 right-0 px-6 md:px-12 xl:px-20 pb-10 md:pb-14 will-change-transform">
                            {/* Meta */}
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-[#00A19B]/50 text-xs font-mono tracking-[0.4em] uppercase">{p.label}</span>
                                <span className="text-[#00A19B]/25 text-xs font-mono">·</span>
                                <span className="text-[#00A19B]/40 text-xs font-mono tracking-widest">{p.year}</span>
                            </div>

                            {/* Title */}
                            <h2
                                className="text-[#00A19B] leading-[0.82] tracking-tight uppercase mb-5"
                                style={{
                                    fontFamily: '"Climate Crisis", sans-serif',
                                    fontVariationSettings: '"YEAR" 2000',
                                    fontSize: 'clamp(3rem, 11vw, 150px)',
                                }}
                            >{p.title}</h2>

                            {/* Bottom row */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <p className="text-[#00A19B]/60 text-sm md:text-base leading-relaxed max-w-lg mb-4">
                                        {p.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {p.stack.map(t => (
                                            <span
                                                key={t}
                                                className="px-3 py-1.5 rounded-full border border-[#00A19B]/20 text-[#00A19B]/55 text-[10px] font-mono tracking-widest uppercase"
                                            >{t}</span>
                                        ))}
                                    </div>
                                </div>

                                {i === active && (
                                    <a
                                        href={p.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        className="flex-none group flex items-center gap-3 px-6 py-3.5 rounded-full border-2 border-[#00A19B] text-[#00A19B] hover:bg-[#00A19B] hover:text-[#E4DDD3] transition-all duration-300 text-sm font-mono tracking-widest uppercase whitespace-nowrap"
                                    >
                                        View Project
                                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Active indicator */}
                        {i === active && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#00A19B]" />}
                    </div>
                ))}

                {/* Scroll hint */}
                {active === 0 && (
                    <div className="absolute bottom-8 right-10 z-50 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
                        <span className="text-[#00A19B]/35 text-[9px] font-mono tracking-[0.35em] uppercase">Scroll</span>
                        <svg className="text-[#00A19B]/35" width="14" height="18" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path d="M8 2v12M3 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}

            </div>
        </div>
    );
}
