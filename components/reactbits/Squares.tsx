'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SquaresProps {
  className?: string;
  count?: number;
  speed?: number;
  squareSize?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  borderColor?: string;
  hoverFillColor?: string;
  opacity?: number;
}

export default function Squares({
  className = '',
  count = 30,
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#ffffff',
  hoverFillColor = '#222222',
  opacity = 0.1,
}: SquaresProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const squares: HTMLDivElement[] = [];
    
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    }
    animationRef.current?.kill();

    for (let i = 0; i < count; i++) {
      const square = document.createElement('div');
      square.style.position = 'absolute';
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      square.style.border = `1px solid ${borderColor}`;
      square.style.opacity = opacity.toString();
      square.style.pointerEvents = 'auto';
      square.style.cursor = 'pointer';
      square.style.backgroundColor = 'transparent';
      square.style.transition = 'background-color 0.3s ease';

      gsap.set(square, {
        x: Math.random() * width,
        y: Math.random() * height,
        rotation: Math.random() * 360,
      });

      container.appendChild(square);
      squares.push(square);

      square.addEventListener('mouseenter', () => {
        gsap.to(square, { backgroundColor: hoverFillColor, duration: 0.3 });
      });
      square.addEventListener('mouseleave', () => {
        gsap.to(square, { backgroundColor: 'transparent', duration: 0.3 });
      });
    }

    const tl = gsap.timeline({ repeat: -1 });
    animationRef.current = tl;

    let moveX = 0;
    let moveY = 0;
    const distance = 2000;
    const duration = distance / (100 * speed);

    switch (direction) {
      case 'up':
        moveY = -distance;
        break;
      case 'down':
        moveY = distance;
        break;
      case 'left':
        moveX = -distance;
        break;
      case 'right':
        moveX = distance;
        break;
      case 'diagonal':
        moveX = distance;
        moveY = distance;
        break;
    }

    squares.forEach(square => {
      tl.to(square, {
        x: `+=${moveX}`,
        y: `+=${moveY}`,
        rotation: `+=${Math.random() * 720 - 360}`,
        duration: duration,
        ease: 'none',
        modifiers: {
          x: gsap.utils.wrap(0 - squareSize, width + squareSize),
          y: gsap.utils.wrap(0 - squareSize, height + squareSize)
        }
      }, 0);
    });

    return () => {
      animationRef.current?.kill();
      squares.forEach(square => {
         if (square.parentNode) {
          square.parentNode.removeChild(square);
        }
      });
    };
  }, [count, speed, squareSize, direction, borderColor, hoverFillColor, opacity]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={{ zIndex: -1 }}
    />
  );
} 