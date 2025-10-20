'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src?: string;
  alt?: string;
  speed?: number;
  className?: string;
}

export default function ParallaxImage({ 
  src, 
  alt = 'Parallax Image', 
  speed = 0.5,
  className = '' 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.to(image, {
      y: `${speed * 100}%`,
      ease: 'none',
    });

    return () => {
      tl.kill();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`parallax-container ${className}`}>
      <div 
        ref={imageRef} 
        className="parallax-image w-full h-[120%] -translate-y-[10%]"
        style={{
          backgroundImage: src ? `url(${src})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
