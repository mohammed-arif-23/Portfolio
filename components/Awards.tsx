'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Move the reveal image with cursor
            const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3", opacity: 0 });
            const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

            const onMouseMove = (e: MouseEvent) => {
                // Optimized: Removed getBoundingClientRect() which causes layout thrashing
                // Since the cursor image is fixed, we can use client coordinates directly
                xTo(e.clientX);
                yTo(e.clientY);
            };

            window.addEventListener('mousemove', onMouseMove);

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (activeIndex !== null) {
            gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
        } else {
            gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
        }
    }, [activeIndex]);

    return (
        <section ref={containerRef} className="relative w-full py-8 px-4 md:px-12 bg-[#020202] overflow-hidden cursor-default">

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

                {/* Awards List - with Focus Effect */}
                <div className="flex flex-col group/list w-full max-w-7xl mx-auto">
                    {AWARDS.map((award, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/40 hover:px-8 hover:bg-white/5 opacity-100 group-hover/list:opacity-30 hover:!opacity-100 z-10"
                        >
                            {/* Left: Year & Org */}
                            <div className="flex items-baseline gap-8 mb-4 md:mb-0 transition-transform duration-500 group-hover:translate-x-2">
                                <span className="font-mono text-brand-accent text-sm md:text-base opacity-70 group-hover:opacity-100">
                                    {award.year}
                                </span>
                                <span className="font-mono text-white/40 text-xs md:text-sm uppercase tracking-widest group-hover:text-white transition-colors">
                                    {award.org}
                                </span>
                            </div>

                            {/* Center: Title & Project */}
                            <div className="flex-1 md:text-center md:absolute md:left-1/2 md:-translate-x-1/2 transition-transform duration-700 ease-out group-hover:scale-105 origin-center">
                                <h3 className="text-3xl md:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
                                    {award.title}
                                </h3>
                                <p className="text-white/40 text-sm md:text-lg mt-2 font-light group-hover:text-white/80 transition-colors">
                                    {award.project}
                                </p>
                            </div>

                            {/* Right: Icon (Visual Balance) */}
                            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-white">
                                <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-500" />
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Image Reveal (Cursor Follower) - Enhanced */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[400px] h-[260px] pointer-events-none z-50 rounded-lg overflow-hidden opacity-0 scale-50 origin-center will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 transition-opacity duration-300"
                style={{ transform: 'translate(-50%, -50%)' }}
            >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 mix-blend-overlay"></div>
                {activeIndex !== null && (
                    <img
                        src={AWARDS[activeIndex].img}
                        alt="Award Proof"
                        className="w-full h-full object-cover scale-110 animate-slow-zoom"
                    />
                )}
            </div>

        </section>
    );
}
