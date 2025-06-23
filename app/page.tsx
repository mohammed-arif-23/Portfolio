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
import Loader from '@/components/Loader';
import Welcome from '@/components/Welcome';
import Aurora from '@/components/Aurora';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [floatingElements, setFloatingElements] = useState<any[]>([]);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

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

    // Horizontal scroll animation
    const pinTrigger = containerRef.current;
    const track = horizontalTrackRef.current;
    if (pinTrigger && track) {
      const swipeDistance = window.innerWidth;
      const isMobile = window.innerWidth < 768;
      const pauseDistance = isMobile ? 400 : 0;
      const tl = gsap.timeline();
      tl.to(track, { x: -swipeDistance, ease: 'none', duration: 1 });
      if (isMobile && pauseDistance > 0) {
        tl.to(track, { x: -swipeDistance, ease: 'none', duration: pauseDistance / swipeDistance });
      }
      const st = ScrollTrigger.create({
        trigger: pinTrigger,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${swipeDistance + pauseDistance}`,
        animation: tl,
        invalidateOnRefresh: true,
        onLeave: () => {
          ScrollTrigger.refresh();
        },
      });
      return () => st.kill();
    }

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

    // Page progress bar
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      setProgress(scrollPercent);

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
      <Loader />
      <SEO />
  
      {/* Floating Elements */}
      

      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5} 
      />
      
      {/* Top Page Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-[9999] h-1.5">
        <div
          className="bg-white rounded-full shadow-lg transition-all duration-200"
          style={{ width: `${progress}%`, height: '50%' }}
        />
      </div>
      
      <div ref={containerRef} className="relative">
        <div ref={horizontalTrackRef} className="flex overflow-hidden" style={{ width: '200vw', height: '100vh' }}>
          <Welcome />
          <div className="w-screen h-screen">
        <Hero startAnimation={true} />
          </div>
        </div>
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