'use client';

import { flushSync } from 'react-dom';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutMotionSystem.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip, ScrollTrigger, useGSAP);
}

export interface AboutMotionItem {
  readonly title: string;
  readonly copy: string;
}

export interface AboutMotionSystemProps {
  readonly items: readonly AboutMotionItem[];
}

const MANIFESTO = [
  'From',
  'public systems',
  'to',
  'healthcare ops',
  'to',
  'product launch,',
  'I stay for the full send. No half-built vibes.',
] as const;

export default function AboutMotionSystem({ items }: AboutMotionSystemProps) {
  const rootRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { contextSafe } = useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
      const words = gsap.utils.toArray<HTMLElement>('[data-about-word]', root);
      const panels = gsap.utils.toArray<HTMLElement>('[data-about-panel]', root);

      if (reduceMotion || saveData) {
        gsap.set([...words, ...panels], { clearProps: 'all', autoAlpha: 1 });
        return undefined;
      }

      if (coarsePointer) {
        root.dataset.coarse = 'true';
        gsap.set(words, { autoAlpha: 0.12, yPercent: 30 });
        gsap.set(panels, {
          autoAlpha: 0,
          xPercent: (index) => index % 2 === 0 ? -7 : 7,
        });

        gsap.to(words, {
          autoAlpha: 1,
          yPercent: 0,
          stagger: 0.075,
          duration: 0.58,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.querySelector('[data-about-manifesto]'),
            start: 'top 88%',
            once: true,
          },
        });
        gsap.to(panels, {
          autoAlpha: 1,
          xPercent: 0,
          stagger: 0.08,
          duration: 0.68,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 90%',
            once: true,
          },
        });

        return () => {
          delete root.dataset.coarse;
        };
      }

      gsap.set(words, { autoAlpha: 0.14, yPercent: 24 });

      const manifesto = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector('[data-about-manifesto]'),
          start: 'top 82%',
          end: 'bottom 42%',
          scrub: 0.42,
        },
      });

      manifesto
        .to(words, {
          autoAlpha: 1,
          yPercent: 0,
          stagger: 0.085,
          duration: 0.34,
          ease: 'none',
        }, 0);

      gsap.fromTo(
        panels,
        { clipPath: 'inset(0 100% 0 0)', xPercent: 10 },
        {
          clipPath: 'inset(0 0% 0 0)',
          xPercent: 0,
          stagger: 0.085,
          duration: 0.95,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      );

      return () => {
        delete root.dataset.coarse;
      };
    },
    { scope: rootRef },
  );

  const activate = contextSafe((nextIndex: number) => {
    if (nextIndex === activeIndex || !accordionRef.current) return;
    const staticInteraction = window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches;
    if (staticInteraction) {
      setActiveIndex(nextIndex);
      return;
    }

    const panels = Array.from(accordionRef.current.querySelectorAll<HTMLElement>('[data-about-panel]'));
    const state = Flip.getState(panels, { props: 'flex-grow,color,backgroundColor' });

    flushSync(() => setActiveIndex(nextIndex));

    Flip.from(state, {
      duration: 0.82,
      ease: 'expo.out',
      absolute: false,
      nested: true,
      prune: true,
    });
  });

  return (
    <section className={styles.root} ref={rootRef} aria-label="How I take a product from brief to live" data-sc-act="flow">
      <p className={styles.manifesto} data-about-manifesto>
        {MANIFESTO.map((token, index) => (
          <span key={`${token}-${index}`}>
            <span className={styles.word} data-about-word>{token}</span>
            {index < MANIFESTO.length - 1 ? ' ' : null}
          </span>
        ))}
      </p>

      <div className={styles.accordion} ref={accordionRef}>
        {items.map((item, index) => {
          const active = index === activeIndex;
          const panelId = `about-motion-panel-${index}`;

          return (
            <article
              className={styles.panel}
              data-about-panel
              data-active={active ? 'true' : 'false'}
              key={item.title}
              onMouseEnter={() => activate(index)}
            >
              <button
                type="button"
                aria-expanded={active}
                aria-controls={panelId}
                data-cursor={active ? 'READ' : 'OPEN'}
                onClick={() => activate(index)}
                onFocus={() => activate(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <i aria-hidden="true">↘</i>
              </button>

              <div className={styles.panelCopy} id={panelId} aria-hidden={!active}>
                <p>{item.copy}</p>
                <span>{active ? 'That is my lane' : 'Tap in'}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
