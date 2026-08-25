'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

interface ScrollLottieProps {
  src: string;
  className?: string;
  parentTrigger?: string;
}

function getReducedMotionPreference() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ScrollLottie({ src, className = '', parentTrigger }: ScrollLottieProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(getReducedMotionPreference);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reducedMotion) return;

    let disposed = false;
    let trigger: ScrollTrigger | undefined;
    let frameTween: gsap.core.Tween | undefined;
    let animation: import('lottie-web').AnimationItem | undefined;
    let removeDomLoadedListener: (() => void) | undefined;
    let lastFrame = -1;
    const abortController = new AbortController();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animation || disposed) return;
        observer.disconnect();

        Promise.all([
          import('lottie-web'),
          fetch(src, { signal: abortController.signal }).then((response) => {
            if (!response.ok) {
              throw new Error(`Unable to load Lottie animation (${response.status})`);
            }
            return response.json();
          }),
        ])
          .then(([module, data]) => {
            if (disposed) return;
            animation = module.default.loadAnimation({
              container: host,
              renderer: 'svg',
              autoplay: false,
              loop: false,
              animationData: data,
              rendererSettings: { progressiveLoad: true, preserveAspectRatio: 'xMidYMid meet' },
            });

            const handleDomLoaded = () => {
              if (!animation || disposed) return;

              let scrollTarget: Element = host;
              if (parentTrigger) {
                try {
                  scrollTarget = host.closest(parentTrigger) ?? document.querySelector(parentTrigger) ?? host;
                } catch {
                  scrollTarget = host;
                }
              }

              const playhead = { frame: 0 };
              const finalFrame = Math.max(0, animation.totalFrames - 1);
              animation.goToAndStop(0, true);

              frameTween = gsap.to(playhead, {
                frame: finalFrame,
                ease: 'none',
                onUpdate: () => {
                  if (!animation) return;
                  const frame = Math.round(playhead.frame);
                  if (frame === lastFrame) return;
                  lastFrame = frame;
                  animation.goToAndStop(frame, true);
                },
                scrollTrigger: {
                  trigger: scrollTarget,
                  start: parentTrigger ? 'top top' : 'top 88%',
                  end: parentTrigger ? 'bottom bottom' : 'bottom 12%',
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                },
              });

              trigger = frameTween.scrollTrigger;
              ScrollTrigger.refresh();
            };

            animation.addEventListener('DOMLoaded', handleDomLoaded);
            removeDomLoadedListener = () => animation?.removeEventListener('DOMLoaded', handleDomLoaded);
          })
          .catch((error: unknown) => {
            if (disposed || (error instanceof DOMException && error.name === 'AbortError')) return;
            host.dataset.lottieState = 'error';
          });
      },
      { rootMargin: '240px' },
    );

    observer.observe(host);
    return () => {
      disposed = true;
      abortController.abort();
      observer.disconnect();
      removeDomLoadedListener?.();
      trigger?.kill();
      frameTween?.kill();
      animation?.destroy();
    };
  }, [parentTrigger, reducedMotion, src]);

  return <div ref={hostRef} className={`scroll-lottie ${className}`} aria-hidden="true" />;
}
