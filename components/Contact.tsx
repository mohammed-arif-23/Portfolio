'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Terminal, ArrowUp, Send, Loader2, ArrowUpRight } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
    { label: "LINKEDIN", url: "https://www.linkedin.com/in/mohammedarif2303/", icon: <Linkedin size={18} /> },
    { label: "GITHUB", url: "https://github.com/mohammed-arif-23", icon: <Github size={18} /> },
    { label: "EMAIL", url: "mailto:mohammedarif2303@gmail.com", icon: <Mail size={18} /> }
];

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [time, setTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Clock
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        const timer = setInterval(updateTime, 1000);
        updateTime();

        const ctx = gsap.context(() => {

            // Staggered reveal for form elements
            gsap.from('.contact-reveal', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%'
                }
            });

            // Form Spotlight Effect
            const form = document.querySelector('.group\\/form');
            if (form) {
                form.addEventListener('mousemove', (e: any) => {
                    const rect = form.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    form.setAttribute('style', `--mouse-x: ${x}px; --mouse-y: ${y}px`);
                });
            }

            // Footer Text Letter-by-Letter Reveal
            const chars = document.querySelectorAll('.footer-char');
            gsap.set(chars, { yPercent: 120, opacity: 0, rotateX: -90 }); // Force initial state

            gsap.to(chars, {
                yPercent: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.05,
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play reverse play reverse'
                }
            });

        }, containerRef);

        return () => {
            clearInterval(timer);
            ctx.revert();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to send message');
            }

            setIsSuccess(true);
            if (formRef.current) formRef.current.reset();

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to send transmission. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={containerRef} className="relative py-4 px-6 md:px-12 lg:px-24 bg-[#050505] overflow-hidden">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left: Content & Socials */}
                <div className="flex flex-col justify-between h-full">
                    <div className="contact-reveal">
                        <div className="flex items-center gap-3 mb-8 group/status cursor-help">
                            <Terminal size={14} className="text-brand-accent animate-pulse" />
                            <span className="font-mono text-xs text-brand-accent tracking-[0.2em] uppercase group-hover/status:animate-glitch">System_Shutdown</span>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] mb-8 tracking-tighter">
                            LET'S START<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/60 group-hover:from-brand-accent group-hover:to-brand-accent/50 transition-all duration-500">A PROJECT</span>
                        </h2>

                        <p className="text-white/60 text-lg font-light max-w-md mb-12 leading-relaxed">
                            Available for freelance commissions and full-time mission objectives. Drop a signal.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 contact-reveal">
                        {SOCIALS.map((social, i) => (
                            <MagneticWrapper key={i}>
                                <a href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-6 border-t border-white/10 hover:border-brand-accent/50 transition-colors cursor-none overflow-hidden relative">
                                    <div className="absolute inset-0 bg-brand-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>
                                    <span className="relative z-10 font-mono text-sm text-white/40 group-hover:text-white transition-colors tracking-widest uppercase pl-2 group-hover:pl-4 duration-300">
                                        {social.label}
                                    </span>
                                    <span className="relative z-10 text-white/40 group-hover:text-brand-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 pr-2 group-hover:pr-4">
                                        <ArrowUpRight size={20} />
                                    </span>
                                </a>
                            </MagneticWrapper>
                        ))}
                    </div>
                </div>

                {/* Right: Premium Form Spotlight */}
                <div
                    className="contact-reveal bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm relative overflow-hidden group/form"
                    style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}
                >

                    {/* Spotlight Glow */}
                    <div
                        className="absolute inset-0 z-0 opacity-0 group-hover/form:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)'
                        }}
                    ></div>

                    <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
                        <h3 className="text-2xl text-white font-light mb-4">Send a transmission</h3>

                        <div className="flex flex-col gap-2 group/input relative">
                            <label htmlFor="name" className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1 group-focus-within/input:text-brand-accent transition-colors">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full bg-black/20 border-b border-white/10 p-4 text-white placeholder-white/10 focus:outline-none focus:border-brand-accent transition-all duration-500 text-lg group-focus-within/input:px-6"
                                placeholder="ENTER NAME"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent group-focus-within/input:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>
                        </div>

                        <div className="flex flex-col gap-2 group/input relative">
                            <label htmlFor="email" className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1 group-focus-within/input:text-brand-accent transition-colors">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full bg-black/20 border-b border-white/10 p-4 text-white placeholder-white/10 focus:outline-none focus:border-brand-accent transition-all duration-500 text-lg group-focus-within/input:px-6"
                                placeholder="ENTER EMAIL"
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent group-focus-within/input:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>
                        </div>

                        <div className="flex flex-col gap-2 group/input relative">
                            <label htmlFor="message" className="text-xs font-mono text-white/40 uppercase tracking-widest ml-1 group-focus-within/input:text-brand-accent transition-colors">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-black/20 border-b border-white/10 p-4 text-white placeholder-white/10 focus:outline-none focus:border-brand-accent transition-all duration-500 text-lg resize-none group-focus-within/input:px-6"
                                placeholder="DESCRIBE YOUR MISSION..."
                            ></textarea>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent group-focus-within/input:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className={`group/btn mt-4 w-full py-5 px-8 rounded-full border border-white/10 relative overflow-hidden flex items-center justify-center gap-3 transition-colors duration-300 ${isSuccess ? 'border-green-500' : 'hover:border-white'}`}
                        >
                            <div className={`absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isSuccess ? 'bg-green-500' : 'bg-white'}`}></div>

                            <span className={`relative z-10 font-bold text-sm tracking-widest uppercase transition-colors duration-500 ${isSuccess ? 'text-green-500 group-hover/btn:text-black' : 'text-white group-hover/btn:text-black'}`}>
                                {isSubmitting ? 'TRANSMITTING...' : isSuccess ? 'TRANSMISSION SENT' : 'INITIATE SEND'}
                            </span>

                            {!isSubmitting && !isSuccess && (
                                <Send size={16} className="relative z-10 text-white group-hover/btn:text-black transition-colors duration-500 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                            )}
                            {isSubmitting && <Loader2 size={16} className="relative z-10 animate-spin text-white group-hover/btn:text-black" />}
                        </button>
                    </form>

                </div>

            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 text-white/20 font-mono text-[10px] uppercase">
                <div className="flex gap-6 mb-4 md:mb-0">
                    <span>© 2024 MOHAMMED ARIF</span>
                    <span>LOCAL_TIME: {time}</span>
                </div>

                <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-brand-accent transition-colors cursor-pointer group">
                    BACK TO TOP <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>

            {/* Big Footer Text - Animated */}
            <div className="w-full mt-12 flex justify-center overflow-hidden pointer-events-none select-none pb-1">
                <h1 className="flex text-[9vw] font-black text-neutral-800 leading-none tracking-tighter">
                    {"©MOHAMMED_ARIF".split("").map((char, i) => (
                        <span key={i} className="footer-char inline-block origin-bottom transform will-change-transform">
                            {char}
                        </span>
                    ))}
                </h1>
            </div>

        </section>
    );
}