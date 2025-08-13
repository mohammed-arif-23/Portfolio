'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import BlurText from './BlurText';

interface IntroOverlayProps {
  onFinish: () => void;
}

export default function IntroOverlay({ onFinish }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const messages = [
    'Hello',
    'Welcome to my Portfolio',
  ];

  useEffect(() => {
    // Wait for page to fully load
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === 'complete') {
      // Page already loaded
      setIsLoaded(true);
    } else {
      // Wait for page to load
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // Don't start animation until page is loaded

    const timeline = gsap.timeline();

    // Initial card entrance
    timeline.fromTo(cardRef.current, 
      { 
        scale: 0.8, 
        opacity: 0, 
        y: 50,
        filter: 'blur(20px)'
      },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out'
      }
    );

    // Show first message
    timeline.to({}, { duration: 0.5 })
      .call(() => setCurrentMessage(0));

    // Message transitions
    messages.forEach((_, index) => {
      if (index === 0) return; // Skip first message as it's already shown
      
      timeline.to({}, { duration: 1.5 }) // Show current message
        .to(cardRef.current, {
          filter: 'blur(10px)',
          opacity: 0.7,
          duration: 0.4,
          ease: 'power2.inOut'
        })
        .call(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentMessage(index);
            setIsTransitioning(false);
          }, 200);
        })
        .to(cardRef.current, {
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
    });

    // Final exit
    timeline.to({}, { duration: 2.5 }) // Show last message
      .to(cardRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 1,
        ease: 'power2.in'
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      .call(onFinish);

  }, [onFinish, messages.length, isLoaded]);

  const handleAnimationComplete = () => {
    console.log('Message animation completed!');
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black pointer-events-none touch-none select-none"
    >
      {/* Show card only after page is loaded */}
      {isLoaded && (
        <div
          ref={cardRef}
          className="bg-black backdrop-blur-xl rounded-3xl p-16 max-w-lg mx-4 text-center relative overflow-hidden"
        >
          {/* Card content */}
          <div className="relative z-10 min-h-[180px] flex items-center justify-center">
            {!isTransitioning && (
              currentMessage == 0 ? (
                <BlurText
                key={currentMessage}
                text={messages[currentMessage]}
                delay={300}
                animateBy="letters"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-4xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg"
              />
              ) : (
                <BlurText
                 key={currentMessage}
                 text={messages[currentMessage]}
                 delay={150}
                 animateBy="words"
                 direction="bottom"
                 onAnimationComplete={handleAnimationComplete}
                 className="text-3xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg"
               />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}


