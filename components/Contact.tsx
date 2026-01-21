'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Terminal, ArrowUp, Send, Loader2, ArrowUpRight, MousePointer2 } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import SplitType from 'split-type';
import TextPressure from './ui/TextPressure';

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

        let titleSplit: SplitType | null = null;



        const ctx = gsap.context(() => {
            // Split title for kinetic effect


            // Title Parallax - Subtle & Safe
            gsap.to('.contact-title-1', {
                x: -200,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
            gsap.to('.contact-title-2', {
                x: 200,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });

            // Mega Kinetic Entrance & Scroll Effect (SYNCED GLOBALLY)


            // High-Intensity Staggered Reveal
            gsap.from('.contact-reveal', {
                y: 100,
                opacity: 0,
                scale: 0.9,
                rotateX: 15,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%'
                }
            });

            // Immersive Form Kinetic Effect
            gsap.to('.form-kinetic', {
                y: -50,
                scale: 1.05,
                rotateY: -5,
                scrollTrigger: {
                    trigger: '.group\\/form',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5
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

            // Footer Text Entrance Animation
            gsap.fromTo('.footer-block',
                { y: '30%', opacity: 0, scale: 0.9 },
                {
                    y: '0%',
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.footer-block',
                        start: 'top 95%',
                        end: 'bottom bottom',
                        scrub: 1
                    }
                }
            );

        }, containerRef);

        return () => {
            clearInterval(timer);
            if (ctx) ctx.revert();

        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        const parent = target.parentElement;
        if (!parent) return;

        // Spawn particles
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('span');
            particle.classList.add('absolute', 'w-1', 'h-1', 'bg-brand-accent', 'rounded-full', 'pointer-events-none', 'z-50');

            // Random horizontal pos along the bottom
            const left = Math.random() * 100;
            particle.style.left = `${left}%`;
            particle.style.bottom = '0px';

            parent.appendChild(particle);

            // Animate
            gsap.to(particle, {
                y: -Math.random() * 60 - 20,
                x: (Math.random() - 0.5) * 40,
                opacity: 0,
                scale: Math.random() * 2,
                duration: 0.8 + Math.random(),
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSuccess(true);
            if (formRef.current) formRef.current.reset();


            // Reset success message after animation
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to send transmission. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={containerRef} className="relative pt-20 pb-4 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto mb-16 relative">
                <div className="flex items-center gap-3 mb-6 contact-reveal">
                    <Terminal size={14} className="text-brand-accent animate-pulse" />
                    <span className="font-mono text-xs text-brand-accent tracking-[0.3em] uppercase opacity-80">System_Shutdown</span>
                </div>

                <div className="flex flex-col relative z-20 pointer-events-none">
                    <h2 className="contact-title-1 text-[15vw] md:text-[12vw] lg:text-[10vw] font-black text-white leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
                        LET<span className="text-brand-accent">' S </span>START
                    </h2>
                    <h2 className="contact-title-2 text-[15vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/40 ml-4 md:ml-20 lg:ml-32 uppercase whitespace-nowrap">
                        A PROJECT
                    </h2>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left: Content & Socials */}
                <div className="flex flex-col justify-between h-full">
                    <div className="contact-reveal flex flex-col gap-12 mb-auto">
                        <p className="text-white/80 text-2xl md:text-3xl font-light leading-relaxed max-w-2xl">
                            Available for freelance commissions and full-time mission objectives. <br />
                            <span className="text-white/40">Drop a signal.</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-0 contact-reveal mt-12 lg:mt-24">
                        {SOCIALS.map((social, i) => (
                            <MagneticWrapper key={i}>
                                <a href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-12 md:py-14 border-t border-white/10 hover:border-white/30 transition-all duration-500 cursor-none overflow-hidden relative active:scale-95 active:brightness-125">
                                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>
                                    <span className="relative z-10 font-mono text-2xl md:text-3xl text-white/60 group-hover:text-brand-accent transition-colors tracking-widest uppercase pl-2 group-hover:translate-x-4 duration-500">
                                        {social.label}
                                    </span>
                                    <span className="relative z-10 text-white/40 group-hover:text-brand-accent group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-500 pr-2 group-hover:pr-6">
                                        <ArrowUpRight size={28} />
                                    </span>
                                </a>
                            </MagneticWrapper>
                        ))}
                        <div className="w-full h-[1px] bg-white/10"></div>
                    </div>
                </div>

                {/* Right: Premium Form Spotlight */}
                <div
                    className="contact-reveal form-kinetic bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm relative overflow-hidden group/form"
                    style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}
                >

                    {/* Spotlight Glow (Desktop Only) */}
                    <div
                        className="hidden md:block absolute inset-0 z-0 opacity-0 group-hover/form:opacity-100 transition-opacity duration-500 pointer-events-none"
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
                                className="w-full bg-black/20 border-b border-white/10 p-4 text-white placeholder-white/10 focus:outline-none focus:border-brand-accent transition-all duration-500 text-lg group-focus-within/input:px-6 active:px-8"
                                placeholder="ENTER NAME"
                                onInput={handleInput}
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
                                className="w-full bg-black/20 border-b border-white/10 p-4 text-white placeholder-white/10 focus:outline-none focus:border-brand-accent transition-all duration-500 text-lg group-focus-within/input:px-6 active:px-8"
                                placeholder="ENTER EMAIL"
                                onInput={handleInput}
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
                                onInput={handleInput}
                            ></textarea>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent group-focus-within/input:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className={`group/btn mt-4 w-full py-5 px-8 rounded-full border border-white/10 relative overflow-hidden flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] ${isSuccess ? 'border-green-500' : 'hover:border-white'}`}
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
                    <span>© 2026 MOHAMMED ARIF</span>
                    <span>LOCAL_TIME: {time}</span>
                </div>

                <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                    BACK TO TOP <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>

            {/* Big Footer Text - No Shimmer, Grey, Pushed Down & Animated */}
            <div className="footer-block w-full mt-2 md:mt-4 overflow-hidden pointer-events-none select-none ">
                <div className="h-auto relative flex items-center justify-center">
                    <TextPressure
                        text="©MOHAMMED_ARIF"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#454545ff"
                        className="font-black tracking-tighter"
                        minFontSize={48}
                    />
                </div>
            </div>

        </section >
    );
}