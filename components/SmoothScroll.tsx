'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // ref for desktop skew — targets body directly, no wrapper div needed
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Touch device = native scroll, do NOT initialize Lenis at all
    // Uses pointer/hover media query to detect actual touch hardware
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouch) {
      // Native scroll on mobile — GSAP ScrollTrigger works perfectly without Lenis
      ScrollTrigger.refresh();
      return;
    }

    // ── Desktop only: Lenis v1.3.x ───────────────────────────────────────────
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis virtual scroll position
    lenis.on('scroll', () => ScrollTrigger.update());

    // Subtle skew on body (no wrapper div needed)
    lenis.on('scroll', (e: any) => {
      gsap.to(document.body, {
        skewY: e.velocity * 0.04,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });

    const rafCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      // Reset body skew on unmount
      gsap.set(document.body, { skewY: 0 });
      isInitialized.current = false;
    };
  }, []);

  // NO wrapper div — children rendered directly into the DOM tree
  // A wrapper div (even with no styles) was creating a block-formatting-context
  // that interfered with native scroll position detection on mobile browsers.
  return <>{children}</>;
}
