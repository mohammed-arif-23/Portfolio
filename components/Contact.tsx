'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
    { label: "LinkedIn", sub: "linkedin.com/in/mohammedarif2303", url: "https://www.linkedin.com/in/mohammedarif2303/" },
    { label: "GitHub", sub: "github.com/mohammed-arif-23", url: "https://github.com/mohammed-arif-23" },
    { label: "Email", sub: "mohammedarif2303@gmail.com", url: "mailto:mohammedarif2303@gmail.com" },
];

export default function Contact() {
    const scopeRef = useRef<HTMLElement>(null);
    const svgLineRef = useRef<SVGPathElement>(null);
    const svgSigRef = useRef<SVGPathElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [time, setTime] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    /* Clock */
    useEffect(() => {
        const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {

        /* Anime.js: draw background SVG thread on scroll enter */
        ScrollTrigger.create({
            trigger: scopeRef.current,
            start: 'top 75%',
            once: true,
            onEnter: () => {
                [svgLineRef, svgSigRef].forEach(ref => {
                    if (!ref.current) return;
                    const len = ref.current.getTotalLength?.() || 600;
                    ref.current.style.strokeDasharray = `${len}`;
                    ref.current.style.strokeDashoffset = `${len}`;
                    anime({ targets: ref.current, strokeDashoffset: [len, 0], easing: 'easeInOutSine', duration: 3200, delay: 300 });
                });
                // Social rows slide in
                anime({
                    targets: '.contact-social-row',
                    opacity: [0, 1],
                    translateX: [-60, 0],
                    delay: anime.stagger(110, { start: 500 }),
                    duration: 900,
                    easing: 'easeOutExpo',
                });
                // Form fields rise
                anime({
                    targets: '.contact-field',
                    opacity: [0, 1],
                    translateY: [50, 0],
                    delay: anime.stagger(80, { start: 300 }),
                    duration: 800,
                    easing: 'easeOutExpo',
                });
            }
        });

        const ctx = gsap.context(() => {

            // Parallax opposing headline
            gsap.to('.cta-line-1', {
                x: '-8vw', ease: 'none',
                scrollTrigger: { trigger: scopeRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
            });
            gsap.to('.cta-line-2', {
                x: '6vw', ease: 'none',
                scrollTrigger: { trigger: scopeRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
            });

            // Title words mask reveal
            gsap.fromTo('.contact-title-word', { yPercent: 115 }, {
                yPercent: 0, duration: 1.3, ease: 'power4.out', stagger: 0.07,
                scrollTrigger: { trigger: scopeRef.current, start: 'top 78%', once: true }
            });

            // Rules
            gsap.fromTo('.contact-rule', { scaleX: 0, transformOrigin: 'left center' }, {
                scaleX: 1, duration: 1.8, ease: 'power3.out',
                scrollTrigger: { trigger: scopeRef.current, start: 'top 78%', once: true }
            });

        }, scopeRef);

        return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        await new Promise(r => setTimeout(r, 1600));
        setSent(true);
        formRef.current?.reset();
        setTimeout(() => setSent(false), 5000);
        setSending(false);
    };

    return (
        <section ref={scopeRef} className="relative w-full bg-[#E4DDD3] overflow-hidden">

            {/* Film grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
            />

            {/* ── SVG BACKGROUND THREADS ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Main flowing line */}
                <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 1000">
                    <path
                        ref={svgLineRef}
                        d="M -100,900 C 300,100 700,1000 1000,300 C 1150,50 1300,700 1400,400"
                        fill="none" stroke="#00A19B" strokeWidth="2.5" strokeLinecap="round"
                    />
                </svg>
                {/* Signature-style secondary line */}
                <svg className="absolute w-full h-full opacity-15" style={{ top: '40%' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 400">
                    <path
                        ref={svgSigRef}
                        d="M 50,200 C 150,50 200,350 300,200 C 380,80 420,320 500,200 C 580,80 620,300 700,180 C 780,60 850,280 950,200"
                        fill="none" stroke="#00A19B" strokeWidth="2" strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* ── KINETIC HEADLINE ── */}
            <div className="overflow-hidden pt-20 md:pt-28 pb-10 md:pb-16 select-none pointer-events-none">
                <div
                    className="cta-line-1 whitespace-nowrap pl-6 md:pl-16 xl:pl-32 text-[#00A19B] text-[clamp(5rem,17vw,260px)] leading-[0.82] font-black tracking-tight uppercase will-change-transform"
                    style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2000' }}
                >LET&apos;S BUILD</div>
                <div
                    className="cta-line-2 whitespace-nowrap pl-16 md:pl-48 xl:pl-64 text-[#00A19B]/20 text-[clamp(5rem,17vw,260px)] leading-[0.82] font-black tracking-tight uppercase will-change-transform"
                    style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2000' }}
                >SOMETHING</div>
            </div>

            {/* ── BODY ── */}
            <div className="relative z-10 px-6 md:px-16 xl:px-32 pb-0">

                <div className="contact-rule w-full h-[2px] bg-[#00A19B]/25 mb-16 origin-left" />

                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 xl:gap-28">

                    {/* ── LEFT: Info + Socials ── */}
                    <div className="flex flex-col justify-between gap-12">
                        <div>
                            <div className="flex flex-wrap gap-x-[0.15em] mb-6 overflow-hidden">
                                {["GET", "IN", "TOUCH"].map((w, i) => (
                                    <div key={i} className="overflow-hidden">
                                        <span
                                            className="contact-title-word inline-block text-[#00A19B] text-[clamp(2rem,6vw,80px)] leading-[0.85] tracking-tight uppercase will-change-transform"
                                            style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" 2000' }}
                                        >{w}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[#00A19B]/65 text-lg md:text-xl leading-relaxed font-light max-w-sm">
                                Available for freelance commissions, full-time roles, and creative collaborations. Drop a signal.
                            </p>

                            {/* Location + status pill */}
                            <div className="flex flex-wrap gap-3 mt-8">
                                <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A19B]/20 text-[#00A19B]/60 text-xs font-mono tracking-widest uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A19B] animate-pulse" />
                                    Salem, India
                                </span>
                                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A19B]/8 border border-[#00A19B]/20 text-[#00A19B]/70 text-xs font-mono tracking-widest uppercase">
                                    Open to Work
                                </span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="flex flex-col border-t border-[#00A19B]/15">
                            {SOCIALS.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-social-row group relative flex items-center justify-between py-7 md:py-8 border-b border-[#00A19B]/12 hover:border-[#00A19B]/50 transition-all duration-400 overflow-hidden opacity-0 will-change-transform"
                                >
                                    {/* Teal flood */}
                                    <div className="absolute inset-0 bg-[#00A19B]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />

                                    <div className="relative z-10">
                                        <div
                                            className="text-[#00A19B] text-2xl md:text-3xl uppercase font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300"
                                            style={{ fontFamily: '"Bangers", sans-serif', letterSpacing: '0.06em' }}
                                        >{s.label}</div>
                                        <div className="text-[#00A19B]/40 text-xs font-mono tracking-wide mt-0.5">{s.sub}</div>
                                    </div>

                                    <div className="relative z-10 flex-none text-[#00A19B]/30 group-hover:text-[#00A19B] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Form ── */}
                    <div>
                        <h3
                            className="text-[#00A19B]/50 text-xs font-mono tracking-[0.4em] uppercase mb-10"
                        >Send a Transmission</h3>

                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10">

                            {/* Name */}
                            <div className="contact-field group relative opacity-0 will-change-transform">
                                <label className="block text-[#00A19B]/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-3 group-focus-within:text-[#00A19B] transition-colors duration-300">
                                    Name
                                </label>
                                <input
                                    type="text" name="name" required
                                    placeholder="Your full name"
                                    className="w-full bg-transparent border-b-2 border-[#00A19B]/20 pb-3 text-[#00A19B] placeholder-[#00A19B]/20 text-xl outline-none focus:border-[#00A19B] transition-colors duration-400"
                                />
                            </div>

                            {/* Email */}
                            <div className="contact-field group relative opacity-0 will-change-transform">
                                <label className="block text-[#00A19B]/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-3 group-focus-within:text-[#00A19B] transition-colors duration-300">
                                    Email
                                </label>
                                <input
                                    type="email" name="email" required
                                    placeholder="your@email.com"
                                    className="w-full bg-transparent border-b-2 border-[#00A19B]/20 pb-3 text-[#00A19B] placeholder-[#00A19B]/20 text-xl outline-none focus:border-[#00A19B] transition-colors duration-400"
                                />
                            </div>

                            {/* Message */}
                            <div className="contact-field group relative opacity-0 will-change-transform">
                                <label className="block text-[#00A19B]/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-3 group-focus-within:text-[#00A19B] transition-colors duration-300">
                                    Message
                                </label>
                                <textarea
                                    name="message" required rows={4}
                                    placeholder="Tell me about your project or idea..."
                                    className="w-full bg-transparent border-b-2 border-[#00A19B]/20 pb-3 text-[#00A19B] placeholder-[#00A19B]/20 text-xl outline-none focus:border-[#00A19B] transition-colors duration-400 resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <div className="contact-field opacity-0 will-change-transform">
                                <button
                                    type="submit"
                                    disabled={sending || sent}
                                    className="group relative w-full md:w-auto py-5 px-12 rounded-full border-2 border-[#00A19B] overflow-hidden transition-all duration-400 active:scale-95"
                                >
                                    <div className="absolute inset-0 bg-[#00A19B] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                                    <span className="relative z-10 text-[#00A19B] group-hover:text-[#E4DDD3] transition-colors duration-300 font-mono text-sm tracking-widest uppercase font-bold">
                                        {sending ? 'Transmitting...' : sent ? '✓ Transmission Sent' : 'Send Message →'}
                                    </span>
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>

            {/* ── FOOTER ── */}
            <div className="relative z-10 mt-24 border-t border-[#00A19B]/15 px-6 md:px-16 xl:px-32 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-[#00A19B]/35 text-xs font-mono tracking-widest uppercase">© 2026 Mohammed Arif</span>
                <span className="text-[#00A19B]/25 text-xs font-mono tracking-widest uppercase">{time && `Local: ${time} IST`}</span>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[#00A19B]/35 text-xs font-mono tracking-widest uppercase hover:text-[#00A19B] transition-colors group flex items-center gap-2"
                >
                    Back to top
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>

            {/* ── GIANT FOOTER WATERMARK ── */}
            <div className="overflow-hidden pointer-events-none select-none">
                <div
                    className="text-[#00A19B]/[0.07] font-black tracking-tight text-center leading-[0.75] uppercase whitespace-nowrap"
                    style={{
                        fontFamily: '"Climate Crisis", sans-serif',
                        fontVariationSettings: '"YEAR" 1979',
                        fontSize: 'clamp(5rem, 22vw, 320px)',
                    }}
                >©ARIF</div>
            </div>

        </section>
    );
}