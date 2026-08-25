'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

function prefersNativeScroll() {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

function LenisTickerSync({ useNativeScroll }: { useNativeScroll: boolean }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    // ScrollTrigger already listens to native scroll. Avoid an extra perpetual
    // ticker on touch devices and for people who prefer reduced motion.
    if (useNativeScroll) {
      return () => cancelAnimationFrame(refreshId);
    }

    const update = (time: number) => lenis.raf(time * 1000);
    const syncScrollTrigger = () => ScrollTrigger.update();

    // Lenis owns the scroll clock on fine-pointer devices. Removing GSAP's
    // catch-up smoothing keeps scrubbed scenes attached to that same clock
    // after a throttled frame instead of visibly trailing behind it.
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', syncScrollTrigger);
    gsap.ticker.add(update);

    return () => {
      cancelAnimationFrame(refreshId);
      lenis.off('scroll', syncScrollTrigger);
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [lenis, useNativeScroll]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [useNativeScroll, setUseNativeScroll] = useState(prefersNativeScroll);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const updatePreference = () => setUseNativeScroll(prefersNativeScroll());

    updatePreference();
    reducedMotion.addEventListener('change', updatePreference);
    coarsePointer.addEventListener('change', updatePreference);

    return () => {
      reducedMotion.removeEventListener('change', updatePreference);
      coarsePointer.removeEventListener('change', updatePreference);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: useNativeScroll ? 1 : 0.14,
        smoothWheel: !useNativeScroll,
        syncTouch: false,
        wheelMultiplier: useNativeScroll ? 1 : 0.9,
        touchMultiplier: 1,
        anchors: useNativeScroll ? false : { offset: -72 },
      }}
    >
      <LenisTickerSync useNativeScroll={useNativeScroll} />
      {children}
    </ReactLenis>
  );
}
