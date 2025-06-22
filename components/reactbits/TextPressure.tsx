'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { gsap } from 'gsap';

interface TextPressureProps {
  text?: string;
  children?: ReactNode;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
}

const TextPressure: React.FC<TextPressureProps> = ({
  children,
  text: textProp,
  fontFamily,
  fontUrl,
  width,
  weight,
  italic,
  alpha,
  flex,
  stroke,
  scale,
  textColor,
  strokeColor,
  className,
  minFontSize = 24,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [lineHeight, setLineHeight] = useState(1);

  const text = (typeof children === 'string' && children) || textProp || 'Compressa';
  const chars = text.split('');

  const dist = (a: {x: number, y: number}, b: {x: number, y: number}) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof children !== 'string'  || window.innerWidth < 768) return;

    container.innerHTML = '';
    const chars = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.position = 'relative';
      if (char === ' ') {
        span.style.width = '0.3em'; 
      }
      container.appendChild(span);
      return span;
    });

    const tweens: gsap.core.Tween[] = [];

    chars.forEach((char) => {
      const xTo = gsap.quickTo(char, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(char, 'y', { duration: 0.5, ease: 'power3' });
      const rotTo = gsap.quickTo(char, 'rotation', { duration: 0.5, ease: 'power3' });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { top, left, width, height } = char.getBoundingClientRect();
        const charX = left + width / 2;
        const charY = top + height / 2;

        const distance = Math.sqrt(Math.pow(charX - clientX, 2) + Math.pow(charY - clientY, 2));
        const force = Math.max(0, 50 - distance) / 2; 

        const angle = Math.atan2(clientY - charY, clientX - charX);
        const dx = Math.cos(angle) * force;
        const dy = Math.sin(angle) * force;
        
        xTo(-dx);
        yTo(-dy);
        rotTo(-dx * 0.5);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        rotTo(0);
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      tweens.push(xTo.tween, yTo.tween, rotTo.tween);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
        tweens.forEach(tween => tween.kill());
        if(container) container.innerHTML = text; 
    };
  }, [children]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default TextPressure; 