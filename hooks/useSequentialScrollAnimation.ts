import { useEffect } from 'react';

const animationInClasses = [
  'animate-fade-in-up',
  'animate-fade-in-left',
  'animate-fade-in-right',
];

export function useSequentialScrollAnimation(selector = '.animate-on-scroll') {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const i = elements.indexOf(el);
          const animIn = animationInClasses[i % animationInClasses.length];
          if (entry.isIntersecting) {
            el.classList.remove(...animationInClasses);
            el.classList.add(animIn);
            el.classList.add('opacity-100');
          }
        });
      },
      {
        threshold: 0.01,
      }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
} 