'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0, // Ensure touch feels responsive
      infinite: false,
    });

    lenisRef.current = lenis;

    // GSAP integration & Skew Effect
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();

      // Skew effect based on velocity
      // Mobile often produces lower velocity values, so we might need to boost it slightly or just ensure it's applied
      const skew = e.velocity * 0.05;

      // Apply skew to a wrapper instead of body for better compatibility
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          skewY: skew,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
          force3D: true // Hardware acceleration
        });
      }
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => { });
    };
  }, []);

  return <div ref={contentRef} className="w-full min-h-screen will-change-transform">{children}</div>;
}
