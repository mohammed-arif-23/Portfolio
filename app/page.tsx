'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { Squares } from '@/components/reactbits';
import SEO from '@/components/SEO';
import IntroOverlay from '@/components/IntroOverlay';
import Aurora from '@/components/Aurora';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [floatingElements, setFloatingElements] = useState<any[]>([]);
  const [showIntro, setShowIntro] = useState(true);

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
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.transform = 'scale(1.5)';
    };
    const handleMouseLeave = () => {
      if (cursor) cursor.style.transform = 'scale(1)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    const interactiveElements = document.querySelectorAll('a, button, .hover-lift-3d, .card-3d');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    // Generate floating elements
    const elements = Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 30 + 10}px`,
      speed: Math.random() * 0.3 + 0.1,
      shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-lg',
    }));
    setFloatingElements(elements);

    // GSAP ScrollTrigger setup
    gsap.set('.scroll-reveal', { opacity: 0, y: 50 });

    ScrollTrigger.batch('.scroll-reveal', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        });
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          y: -50,
          duration: 0.3,
          ease: 'power2.in'
        });
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        });
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          y: 50,
          duration: 0.3,
          ease: 'power2.in'
        });
      },
      start: 'top 80%',
      end: 'bottom 20%'
    });

    const handleScroll = () => {
      const scrolled = window.scrollY;
      // Parallax for floating elements
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {showIntro && (
        <IntroOverlay
          onFinish={() => {
            setShowIntro(false);
          }}
        />
      )}
      <SEO />
  
      {/* Floating Elements */}
      

      <Aurora
       
      />
      
      <div ref={containerRef} className="relative">
        <Hero startAnimation={true} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>

      {/* --- Custom Cursor: Always at the very end of the React tree --- */}
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorFollowerRef} className="custom-cursor-follower"></div>
    </>
  );
}