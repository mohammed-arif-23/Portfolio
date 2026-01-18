'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
    {
        title: "1st Place",
        project: "Web Development - Spring Fest",
        org: "KSR College of Technology",
        year: "2024",
        img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop"
    },
    {
        title: "1st Place",
        project: "Code Debugging - National Level Symposium",
        org: "Mahendra Institutions of Technology",
        year: "2024",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1740&auto=format&fit=crop"
    },
];

export default function Awards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !cursorRef.current) return;

        // Reset follower element
        gsap.set(cursorRef.current, {
            xPercent: -50,
            yPercent: -50,
            scale: 0.5,
            opacity: 0,
            display: 'none'
        });

        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.35, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', onMouseMove);

        // Scroll triggers for mobile
        const items = document.querySelectorAll('.award-item');
        const triggers: ScrollTrigger[] = [];
        items.forEach((item, index) => {
            triggers.push(
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                    onLeave: () => setActiveIndex((prev) => prev === index ? null : prev),
                    onLeaveBack: () => setActiveIndex((prev) => prev === index ? null : prev)
                })
            );
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            triggers.forEach(t => t.kill());
        };
    }, [mounted]);

    // Handle visibility separately to avoid conflicts
    useEffect(() => {
        if (!mounted || !cursorRef.current) return;

        if (activeIndex !== null) {
            gsap.set(cursorRef.current, { display: 'block' });
            gsap.to(cursorRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.7)"
            });
        } else {
            gsap.to(cursorRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    if (activeIndex === null) gsap.set(cursorRef.current, { display: 'none' });
                }
            });
        }
    }, [activeIndex, mounted]);

    return (
        <section ref={containerRef} className="relative w-full py-20 px-4 md:px-12 bg-[#020202] overflow-visible">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-20 flex items-end justify-between border-b border-white/10 pb-8">
                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter">
                        HONORS <span className="text-brand-accent">&</span><br />AWARDS
                    </h2>
                    <span className="hidden md:block font-mono text-white/40 text-sm tracking-widest uppercase">
                        RECOGNITION_ARCHIVE
                    </span>
                </div>

                {/* Awards List */}
                <div className="flex flex-col group/list w-full max-w-7xl mx-auto">
                    {AWARDS.map((award, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className={`award-item group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b transition-all duration-500 z-10 ${activeIndex === i ? 'border-brand-accent/50 bg-white/5 opacity-100' : 'border-white/10 opacity-100 md:opacity-50 md:group-hover/list:opacity-30 md:hover:!opacity-100'}`}
                        >
                            {/* Left: Year & Org */}
                            <div className="flex items-baseline gap-8 mb-4 md:mb-0">
                                <span className={`font-mono text-sm md:text-base ${activeIndex === i ? 'text-brand-accent' : 'text-brand-accent/70'}`}>
                                    {award.year}
                                </span>
                                <span className={`font-mono text-xs md:text-sm uppercase tracking-widest ${activeIndex === i ? 'text-white' : 'text-white/40'}`}>
                                    {award.org}
                                </span>
                            </div>

                            {/* Center: Title */}
                            <div className="flex-1 md:text-center md:absolute md:left-1/2 md:-translate-x-1/2">
                                <h3 className={`text-3xl md:text-5xl font-black transition-all ${activeIndex === i ? 'text-white' : 'text-white/60'}`}>
                                    {award.title}
                                </h3>
                                <p className={`text-sm md:text-lg mt-2 font-light ${activeIndex === i ? 'text-white/90' : 'text-white/40'}`}>
                                    {award.project}
                                </p>
                            </div>

                            {/* Mobile Image Preview */}
                            <div className={`md:hidden overflow-hidden transition-all duration-500 ${activeIndex === i ? 'max-h-64 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <img src={award.img} alt={award.title} className="w-full rounded-lg" />
                            </div>

                            {/* Right: Icon */}
                            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 text-white">
                                <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Cursor Follower Portal */}
            {mounted && typeof document !== 'undefined' && createPortal(
                <div
                    ref={cursorRef}
                    className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block overflow-hidden rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/20 bg-black"
                    style={{ width: '420px', height: '280px' }}
                >
                    {activeIndex !== null && (
                        <img
                            src={AWARDS[activeIndex].img}
                            alt="Award Proof"
                            className="w-full h-full object-cover scale-105"
                        />
                    )}
                </div>,
                document.body
            )}
        </section>
    );
}