'use client';

import { useRef, useEffect, ReactNode, useState } from 'react';

interface FadeSlideInProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
}

export default function FadeSlideIn({
  children,
  className = '',
  duration = 700,
  delay = 0,
  y = 48,
  x,
}: FadeSlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!visible && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          setVisible(true);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  const translateClass = x !== undefined
    ? (visible ? 'translate-x-0' : `-translate-x-[${x}px]`)
    : (visible ? 'translate-y-0' : `translate-y-[${y}px]`);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className} ${visible ? 'opacity-100' : 'opacity-0'} ${translateClass}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
} 