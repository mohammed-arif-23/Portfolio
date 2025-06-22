'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface TextSplitProps {
  children: string;
  className?: string;
  animation?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: boolean;
}

export default function TextSplit({
  children,
  className = '',
  animation = 'chars',
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  ease = 'power2.out',
  trigger = true
}: TextSplitProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !trigger) return;

    const text = textRef.current;
    const split = new SplitText(text, { type: animation });
    
    const tl = gsap.timeline();
    
    tl.fromTo(
      split[animation],
      {
        opacity: 0,
        y: 50,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration,
        stagger,
        delay,
        ease,
        clearProps: 'transform,opacity'
      }
    );

    return () => {
      split.revert();
    };
  }, []);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
} 