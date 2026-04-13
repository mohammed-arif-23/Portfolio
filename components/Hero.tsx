'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const PROFILE_IMG = "images/profile.png";

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInsideRef = useRef<HTMLImageElement>(null);
  const stringPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let stringAnim: anime.AnimeInstance | null = null;

    let ctx = gsap.context(() => {

      // ----------- 0. ANIME.JS: Draw String -----------
      if (stringPathRef.current) {
        stringAnim = anime({
          targets: stringPathRef.current,
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 4000,
          delay: 200,
        });
      }

      // ----------- 1. ENTRY ANIMATION (No Text Clipping) -----------
      gsap.set('.name-char', { y: 100, opacity: 0 });
      gsap.set(imageWrapperRef.current, { scale: 0.9, opacity: 0 });
      gsap.set(imageInsideRef.current, { scale: 1.15 });

      const loadTl = gsap.timeline({ delay: 0.1 });

      loadTl.to(imageWrapperRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out'
      })
        .to(imageInsideRef.current, {
          scale: 1,
          duration: 1.8,
          ease: 'power3.out'
        }, "<")
        .to('.name-char', {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 1.2,
          ease: 'power4.out',
        }, "-=1.2");

      // ----------- 2. SMOOTH UNDISAPPEARING SCROLL -----------
      // We rely on CSS 'sticky' for pinning so React NEVER crashes with removeChild. 
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // Variable Font thins out smoothly
      scrollTl.to(containerRef.current, {
        '--climate-year': 1979,
        duration: 2.5,
        ease: 'none'
      }, 0);

      // Typography glides upward cleanly
      scrollTl.to([firstNameRef.current, lastNameRef.current], {
        yPercent: -50,
        scale: 0.9,
        duration: 2,
        ease: 'power2.inOut'
      }, 0);

      // Image glides upward slightly, NEVER losing opacity
      scrollTl.to(imageWrapperRef.current, {
        yPercent: -30,
        scale: 0.95,
        duration: 2,
        ease: 'power2.inOut'
      }, 0);

      // String parallax
      scrollTl.to('.hero-svg-overlay', {
        yPercent: -20,
        duration: 2,
        ease: 'power1.inOut'
      }, 0);

    }, scopeRef);

    return () => {
      ctx.revert();
      if (stringAnim) stringAnim.pause();
    };
  }, []);

  return (
    <div ref={scopeRef} className="w-full relative h-[250vh]">

      <div
        ref={stickyWrapperRef}
        className="sticky top-0 w-full h-screen bg-[#E4DDD3] overflow-hidden"
      >

        {/* SVG STRING IS FULLY VISIBLE INSIDE BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none hero-svg-overlay z-0 mix-blend-multiply flex justify-center items-center opacity-70">
          <svg className="w-full h-full min-w-[100vw]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              ref={stringPathRef}
              d="M-50,800 Q 300,100 800,500 T 1800,200 T 2600,600"
              fill="none"
              stroke="#00A19B"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <section
          ref={containerRef}
          className="w-full h-full flex flex-col xl:flex-row items-center justify-center relative overscroll-none max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 gap-8 xl:gap-0"
          style={{ '--climate-year': 2000 } as React.CSSProperties}
        >

          {/* LEFT COLUMN: Typography */}
          <div className="flex-none xl:flex-1 flex flex-col justify-end xl:justify-center relative z-20 w-full mt-20 xl:mt-0 items-start text-left">

            <div className="flex flex-col select-none w-full">
              {/* First Name */}
              <div className="flex w-full justify-start" style={{ overflow: 'visible' }}>
                <h1
                  ref={firstNameRef}
                  className="text-[#00A19B] text-[clamp(2.5rem,11.5vw,130px)] leading-[0.85] tracking-tight uppercase whitespace-nowrap"
                  style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" var(--climate-year)' }}
                >
                  {"MOHAMMED".split('').map((char, i) => (
                    <span key={`f-${i}`} className="name-char inline-block">{char}</span>
                  ))}
                </h1>
              </div>

              {/* Last Name */}
              <div className="flex w-full justify-start pl-[5vw] xl:pl-[8vw]" style={{ overflow: 'visible' }}>
                <h1
                  ref={lastNameRef}
                  className="text-[#00A19B] text-[clamp(2.5rem,11.5vw,130px)] leading-[0.85] tracking-tight uppercase whitespace-nowrap"
                  style={{ fontFamily: '"Climate Crisis", sans-serif', fontVariationSettings: '"YEAR" var(--climate-year)' }}
                >
                  {"ARIF".split('').map((char, i) => (
                    <span key={`l-${i}`} className="name-char inline-block">{char}</span>
                  ))}
                </h1>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Minimal Blob Photo */}
          <div className="flex-none xl:flex-[0.8] w-full flex items-center justify-center z-10 pointer-events-none mt-8 xl:mt-0 xl:ml-auto">
            {/* CSS blob-shape ensures clean organic bounds without weird clipping issues */}
            <div
              ref={imageWrapperRef}
              className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] blob-shape bg-[#00A19B]/5"
            >
              <img
                ref={imageInsideRef}
                src={PROFILE_IMG}
                alt="Mohammed Arif"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </section>
      </div>

    </div>
  );
}
