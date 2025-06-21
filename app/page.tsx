'use client';

import { useEffect, useRef, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Background from '@/components/Background';
import SEO from '@/components/SEO';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Custom Cursor
    const cursor = cursorRef.current;
    const cursorFollower = cursorFollowerRef.current;
  
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }

      if (cursorFollower) {
        cursorFollower.style.left = `${x - 20}px`;
        cursorFollower.style.top = `${y - 20}px`;
      }

 

      // Parallax Effect
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-layer');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.transform = 'scale(1.5)';
      if (cursorFollower) cursorFollower.style.transform = 'scale(1.2)';
      
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.transform = 'scale(1)';
      if (cursorFollower) cursorFollower.style.transform = 'scale(1)';

    };
    window.addEventListener('mousemove', handleMouseMove);
    const interactiveElements = document.querySelectorAll('a, button, .hover-lift-3d, .card-3d');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Parallax on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-layer');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
      // Page progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Simulate loading spinner for demo (replace with router events if using Next.js routing)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO />
      {/* Shared animated background for all sections, fixed and non-scrolling */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none " style={{filter:"blur(3px)"}}>
        <Background />
      </div>
      {/* Top Page Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-[9999] h-1.5">
        <div
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg transition-all duration-200"
          style={{ width: `${progress}%`, height: '50%' }}
        />
      </div>

      {/* Global Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-lg">
          <div className="w-20 h-20 flex items-center justify-center">
            <div className="loader-glass"></div>
          </div>
        </div>
      )}
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorFollowerRef} className="custom-cursor-follower"></div>
   

      <div ref={containerRef} className="relative z-10 overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}