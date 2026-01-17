'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Standard smooth scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Standard multiplier
      touchMultiplier: 2.0, // Better touch responsiveness
      infinite: false,
    });

    lenisRef.current = lenis;

    // GSAP integration & Skew Effect
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();

      // Skew effect based on velocity
      const skew = e.velocity * 0.05; // Reduced sensitivity
      gsap.to(document.body, {
        skewY: skew,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });
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

  return <>{children}</>;
}
