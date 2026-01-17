'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import SplitType from 'split-type';
import { GlitchMorphText } from './ui/glitch-morph-text';

gsap.registerPlugin(ScrollTrigger);

const BOOT_LOGS = [
  "> INITIALIZING KERNEL...",
  "> LOADING CREATIVE MODULES...",
  "> BYPASSING SECURITY PROTOCOLS...",
  "> CONNECTING TO SERVER...",
  "> ACCESS GRANTED TO PORTFOLIO"
];

const PROFILE_IMG = "images/profile.png";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [bootStage, setBootStage] = useState<'booting' | 'complete'>('booting');
  const [logs, setLogs] = useState<string[]>([]);
  const [nameHover, setNameHover] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Generate particle data once to avoid hydration mismatch
  const particles = useMemo(() =>
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5
    })),
    []
  );

  useEffect(() => {
    // 1. Terminal Boot Sequence (Self-Driving)
    const runBootSequence = async () => {
      // Type logs
      for (const log of BOOT_LOGS) {
        setLogs(prev => [...prev, log]);
        await new Promise(r => setTimeout(r, Math.random() * 200 + 50));
      }

      // Short pause
      await new Promise(r => setTimeout(r, 600));

      // Collapse Terminal
      const tl = gsap.timeline({
        onStart: () => {
          setBootStage('complete');
        },
        onComplete: () => {
          if (terminalRef.current) terminalRef.current.style.display = 'none';
        }
      });

      tl.to(terminalRef.current, {
        scaleY: 0.005,
        duration: 0.2,
        ease: 'power4.in'
      })
        .to(terminalRef.current, {
          width: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power4.in'
        });
    };

    runBootSequence();
    setHasMounted(true);

  }, []);

  useEffect(() => {
    if (bootStage !== 'complete') return;

    let titleSplit: SplitType | null = null;
    let ctx: gsap.Context;

    // 2. Main Hero Reveal
    const runReveal = () => {
      ctx = gsap.context(() => {

        // Setup Text Split with 3D transform
        if (textRef.current) {
          titleSplit = new SplitType(textRef.current, { types: 'chars' });
          gsap.set(titleSplit.chars, { y: '120%', opacity: 0, rotateY: -90, transformOrigin: 'center' });
        }

        // Initial States
        gsap.set(welcomeRef.current, { opacity: 0, scale: 0.9 });
        gsap.set(imageRef.current, { opacity: 0, scale: 0.8, filter: 'grayscale(100%) blur(10px)' });

        const tl = gsap.timeline();

        // Reveal Sequence
        tl.to(welcomeRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.1
        })
          .to(welcomeRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in',
            delay: 0.4
          })
          .add(() => {
            // Image Reveal (Subtle background fade in)
            if (imageRef.current) {
              gsap.to(imageRef.current, {
                opacity: 1, // 100% opacity
                scale: 1,
                filter: 'grayscale(0%) blur(0px)',
                duration: 1.5,
                ease: 'power2.out'
              });
            }

            // Name Reveal - Enhanced 3D Flip
            if (titleSplit && titleSplit.chars) {
              gsap.to(titleSplit.chars, {
                y: '0%',
                opacity: 1,
                rotateY: 0,
                duration: 1.4,
                stagger: 0.05,
                ease: 'expo.out'
              });
            }
          }, '-=0.2') // Start with text
          // Socials & Elements
          .fromTo('.hero-social',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
            '-=1'
          );

      }, containerRef);
    };

    const timer = setTimeout(runReveal, 50);

    // Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5);
      const yPos = (clientY / window.innerHeight - 0.5);

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: xPos * 60,
          y: yPos * 60,
          duration: 1,
          ease: 'power2.out',
        });
      }

      // Reverse Parallax for Image (Depth effect)
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: -xPos * 30,
          y: -yPos * 30,
          duration: 1.2,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll-based Parallax with GSAP
    if (textRef.current) {
      gsap.to(textRef.current, {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 100,
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (ctx) ctx.revert();
      if (titleSplit) titleSplit.revert();
      clearTimeout(timer);
    }
  }, [bootStage]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Solid Black Background */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.02),transparent_50%)]"></div>

      {/* Floating Particles - CSS Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hasMounted && particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-accent/30 rounded-full blur-sm"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Depth Parallax Layers */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(204,255,0,0.1),transparent_40%)] animate-pulse-slower"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(204,255,0,0.08),transparent_50%)] animate-pulse-slow"></div>
      </div>

      {/* TERMINAL OVERLAY */}
      <div
        ref={terminalRef}
        className="absolute inset-0 z-[100] bg-[#050505] flex items-center justify-center font-mono text-[#ccff00] p-10"
      >
        {/* ... Terminal Content ... */}
        <div className="w-full max-w-2xl">
          {logs.map((log, i) => (
            <div key={i} className="mb-2 text-lg md:text-xl opacity-80">{log}</div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center transition-opacity duration-500 ${bootStage === 'complete' ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Welcome Tag */}
        <div ref={welcomeRef} className="absolute top-[20%] text-sm font-mono text-brand-accent tracking-widest uppercase select-none z-30">
          WELCOME DEV!!
        </div>

        {/* IMAGE (Centered) with Orbital Rings */}
        <div
          ref={imageRef}
          className="group/image relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-0 z-10 flex items-center justify-center"
        >
          {/* Orbital Ring 1 - Slow Rotate */}
          <div className="absolute inset-[-30px] rounded-full border-2 border-brand-accent/20 animate-[spin_25s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-brand-accent rounded-full -translate-x-1/2 blur-sm"></div>
          </div>

          {/* Orbital Ring 2 - Counter Rotate */}
          <div className="absolute inset-[-60px] rounded-full border border-brand-accent/10 animate-[spin_40s_linear_infinite_reverse]">
            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-brand-accent/50 rounded-full -translate-y-1/2 blur-sm"></div>
          </div>

          {/* Orbital Ring 3 - Fastest */}
          <div className="absolute inset-[-90px] rounded-full border border-brand-accent/5 animate-[spin_15s_linear_infinite]">
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-brand-accent/30 rounded-full -translate-x-1/2 blur-sm"></div>
          </div>

          {/* Hover Glow Pulse */}
          <div className="absolute inset-0 rounded-full bg-brand-accent/0 group-hover/image:bg-brand-accent/10 transition-all duration-1000 blur-3xl scale-150 group-hover/image:scale-[1.8]"></div>

          {/* Subtle glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-accent/10 via-transparent to-transparent blur-xl"></div>
          <div className="absolute inset-0 rounded-full ring-1 ring-brand-accent/20 group-hover/image:ring-brand-accent/40 transition-all duration-500"></div>

          {/* Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <img
              src={PROFILE_IMG}
              alt="Mohammed Arif"
              className="w-full h-full object-contain group-hover/image:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* TEXT OVERLAY (Pinned Top/Bottom & Centered & Blend Mode) */}
        <div
          ref={textRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-50 mix-blend-difference flex flex-col py-0"
        >
          {/* Top Text - MOHAMMED */}
          <div className="w-full flex justify-center pt-2">
            <h1
              className={`pointer-events-auto cursor-pointer text-[13.5vw] leading-none font-bold font-cookie text-[#ffffff] select-none tracking-tighter whitespace-nowrap transition-transform duration-500 ${nameHover ? 'skew-x-2 scale-105' : 'skew-x-0 scale-100'}`}
              onMouseEnter={() => setNameHover(true)}
              onMouseLeave={() => setNameHover(false)}
            >
              <GlitchMorphText text="MOHAMMED" />
            </h1>
          </div>

          {/* Bottom Text - ARIF */}
          <div className="w-full flex justify-center pb-2">
            <h1
              className={`pointer-events-auto cursor-pointer text-[13.5vw] leading-none font-bold font-cookie text-[#ffffff] select-none tracking-tighter whitespace-nowrap transition-transform duration-500 ${nameHover ? '-skew-x-2 scale-105' : 'skew-x-0 scale-100'}`}
              onMouseEnter={() => setNameHover(true)}
              onMouseLeave={() => setNameHover(false)}
            >
              <GlitchMorphText text="ARIF" />
            </h1>
          </div>
        </div>


        {/* Socials & Scroll Down */}
        <div className="absolute bottom-6 flex flex-col items-center gap-6 z-40 mix-blend-difference">
          <div className="flex gap-6">
            <MagneticWrapper>
              <a href="https://github.com/mohammed-arif-23" target="_blank" rel="noopener noreferrer" className="hero-social group block text-[#ededed] hover:text-[#ccff00] transition-all duration-300 p-3 relative">
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/20 rounded-full blur-xl transition-all duration-500 scale-0 group-hover:scale-150"></div>
                <Github size={24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a href="https://www.linkedin.com/in/mohammedarif2303/" target="_blank" rel="noopener noreferrer" className="hero-social group block text-[#ededed] hover:text-[#ccff00] transition-all duration-300 p-3 relative">
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/20 rounded-full blur-xl transition-all duration-500 scale-0 group-hover:scale-150"></div>
                <Linkedin size={24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a href="mailto:mohammedarif2303@gmail.com" className="hero-social group block text-[#ededed] hover:text-[#ccff00] transition-all duration-300 p-3 relative">
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/20 rounded-full blur-xl transition-all duration-500 scale-0 group-hover:scale-150"></div>
                <Mail size={24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </MagneticWrapper>
          </div>

        </div>
      </div>
    </section >
  );
}
