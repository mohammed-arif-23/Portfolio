'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PageTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blocks = transitionRef.current?.querySelectorAll('.page-transition-block');
    if (!blocks) return;

    // Animate blocks on page load
    gsap.fromTo(
      blocks,
      {
        scaleY: 1,
      },
      {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power4.inOut',
        delay: 0.3,
      }
    );
  }, []);

  return (
    <div ref={transitionRef} className="page-transition">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="page-transition-block" />
      ))}
    </div>
  );
}
