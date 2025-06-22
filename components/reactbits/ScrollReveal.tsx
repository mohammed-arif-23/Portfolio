'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate';
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  triggerOnce?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fadeUp',
  duration = 1,
  delay = 0,
  ease = 'power2.out',
  stagger = 0,
  triggerOnce = true,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const getAnimationVars = () => {
      switch (animation) {
        case 'fadeUp':
          return { y: 50, opacity: 0 };
        case 'fadeDown':
          return { y: -50, opacity: 0 };
        case 'fadeLeft':
          return { x: 50, opacity: 0 };
        case 'fadeRight':
          return { x: -50, opacity: 0 };
        case 'scale':
          return { scale: 0.8, opacity: 0 };
        case 'rotate':
          return { rotation: 45, opacity: 0 };
        default:
          return { y: 50, opacity: 0 };
      }
    };

    const getAnimationTo = () => {
      switch (animation) {
        case 'fadeUp':
        case 'fadeDown':
          return { y: 0, opacity: 1 };
        case 'fadeLeft':
        case 'fadeRight':
          return { x: 0, opacity: 1 };
        case 'scale':
          return { scale: 1, opacity: 1 };
        case 'rotate':
          return { rotation: 0, opacity: 1 };
        default:
          return { y: 0, opacity: 1 };
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        toggleActions: triggerOnce ? 'play none none reverse' : 'play none none reverse',
        onEnter: () => {
          if (!scrub) {
            gsap.to(element, {
              ...getAnimationTo(),
              duration,
              delay,
              ease,
              stagger
            });
          }
        },
        onLeave: () => {
          if (!triggerOnce && !scrub) {
            gsap.to(element, {
              ...getAnimationVars(),
              duration: duration * 0.5,
              ease: 'power2.in'
            });
          }
        },
        onEnterBack: () => {
          if (!triggerOnce && !scrub) {
            gsap.to(element, {
              ...getAnimationTo(),
              duration,
              ease
            });
          }
        },
        onLeaveBack: () => {
          if (!triggerOnce && !scrub) {
            gsap.to(element, {
              ...getAnimationVars(),
              duration: duration * 0.5,
              ease: 'power2.in'
            });
          }
        }
      }
    });

    if (scrub) {
      tl.fromTo(element, getAnimationVars(), {
        ...getAnimationTo(),
        duration,
        ease
      });
    } else {
      gsap.set(element, getAnimationVars());
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, duration, delay, ease, stagger, triggerOnce, start, end, scrub]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
} 