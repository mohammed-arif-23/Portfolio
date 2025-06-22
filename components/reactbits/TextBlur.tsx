'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextBlurProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: boolean;
  blurAmount?: number;
}

export default function TextBlur({
  children,
  className = '',
  duration = 1,
  delay = 0,
  ease = 'power2.out',
  trigger = true,
  blurAmount = 10
}: TextBlurProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !trigger) return;

    const text = textRef.current;
    
    gsap.to(
      text,
      {
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease,
        clearProps: 'all'
      }
    );
  }, [children, duration, delay, ease, trigger]);

  return (
    <div 
      ref={textRef} 
      className={className}
      style={{
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
        transform: `scale(0.8)`
      }}
    >
      {children}
    </div>
  );
} 