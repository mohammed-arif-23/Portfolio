'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const cursor = cursorRef.current;
    if (!cursor || isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    // Set initial position to current mouse position
    const setInitialPosition = (e: MouseEvent) => {
      gsap.set(cursor, {
        left: e.clientX,
        top: e.clientY,
      });
      window.removeEventListener('mousemove', setInitialPosition);
    };

    window.addEventListener('mousemove', setInitialPosition);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const text = target.getAttribute('data-cursor-text');
      
      if (text) {
        setCursorText(text);
        setIsHovering(true);
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorText('');
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setCursorText('');
      setIsHovering(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-text]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Detect background color changes
    const detectBackground = () => {
      const elements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      for (const el of elements) {
        const bgColor = window.getComputedStyle(el).backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          // Check if background is dark
          const rgb = bgColor.match(/\d+/g);
          if (rgb) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            setIsDarkBackground(brightness < 128);
          }
          break;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      detectBackground();
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''} ${isDarkBackground ? 'dark-bg' : 'light-bg'}`}
      style={{ 
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      {cursorText && <span className="custom-cursor-text">{cursorText}</span>}
    </div>
  );
}
