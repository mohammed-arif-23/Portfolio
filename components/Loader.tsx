'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loaderRef.current) {
            gsap.set(loaderRef.current, { display: 'none' });
          }
        },
      });
    }
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    />
  );
} 