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
  const [floatingElements, setFloatingElements] = useState<any[]>([]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Remove custom cursor effect
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

    // Parallax with rAF to avoid work on every scroll event
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateParallax = () => {
      const scrolled = lastScrollY;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (el as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true } as any);
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll as any);
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
      <Aurora />
      <div ref={containerRef} className="relative">
        <Hero startAnimation={true} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}