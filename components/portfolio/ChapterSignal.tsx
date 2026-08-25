'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const CHAPTERS = [
  { id: 'top', index: '00', label: 'Opening' },
  { id: 'impact', index: '01', label: 'Reality check' },
  { id: 'work', index: '02', label: 'Public systems' },
  { id: 'proof', index: '03', label: 'Peak proof' },
  { id: 'health', index: '04', label: 'Healthcare' },
  { id: 'hash', index: '05', label: 'Product build' },
  { id: 'systems', index: '06', label: 'Operating system' },
  { id: 'capabilities', index: '07', label: 'Capability stack' },
  { id: 'about', index: '08', label: 'Profile' },
  { id: 'contact', index: '09', label: 'Contact' },
] as const;

export default function ChapterSignal() {
  const [activeId, setActiveId] = useState<(typeof CHAPTERS)[number]['id']>('top');
  const signalRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLElement>(null);

  const activeChapter = CHAPTERS.find((chapter) => chapter.id === activeId) ?? CHAPTERS[0];
  const activeIndex = CHAPTERS.findIndex((chapter) => chapter.id === activeChapter.id);
  const nextChapter = activeIndex >= 0 && activeIndex < CHAPTERS.length - 1
    ? CHAPTERS[activeIndex + 1]
    : null;

  useEffect(() => {
    const sections = CHAPTERS
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id as (typeof CHAPTERS)[number]['id']);
      },
      { rootMargin: '-24% 0px -58% 0px', threshold: [0, 0.08, 0.2] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!signalRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    anime.remove(signalRef.current.querySelectorAll('[data-chapter-animate]'));
    anime({
      targets: signalRef.current.querySelectorAll('[data-chapter-animate]'),
      translateY: [10, 0],
      opacity: [0, 1],
      delay: anime.stagger(45),
      duration: 420,
      easing: 'easeOutExpo',
    });
  }, [activeId]);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      if (!progressRef.current) return;

      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
      progressRef.current.style.transform = `scaleX(${progress})`;
    };

    const requestUpdate = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <aside className="sotd-chapter-signal" ref={signalRef} data-active={activeId} aria-hidden="true">
      <span className="sotd-chapter-signal__eyebrow">Field index</span>
      <span className="sotd-chapter-signal__number" data-chapter-animate>{activeChapter.index}</span>
      <strong data-chapter-animate>{activeChapter.label}</strong>
      <span className="sotd-chapter-signal__rail"><i ref={progressRef} /></span>
      {nextChapter ? (
        <span className="sotd-chapter-signal__next" data-chapter-animate>
          <i>Next</i>
          <b>{nextChapter.index} / {nextChapter.label}</b>
        </span>
      ) : null}
    </aside>
  );
}
