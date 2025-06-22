'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface FloatProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  ease?: string;
  y?: number;
  x?: number;
  rotation?: number;
  delay?: number;
  repeat?: number;
  yoyo?: boolean;
}

export default function Float({
  children,
  className = '',
  duration = 2,
  ease = 'power1.inOut',
  y = 20,
  x = 0,
  rotation = 0,
  delay = 0,
  repeat = -1,
  yoyo = true
}: FloatProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const tl = gsap.timeline({
      repeat,
      yoyo,
      delay
    });

    tl.to(element, {
      y: -y,
      x: x,
      rotation: rotation,
      duration: duration,
      ease
    });

    return () => {
      tl.kill();
    };
  }, [duration, ease, y, x, rotation, delay, repeat, yoyo]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
} 