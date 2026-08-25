'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import styles from './HashPrimeLaunchTheatre.module.css';

export interface HashPrimeArtifact {
  src: string;
  alt: string;
  label: string;
  caption: string;
  href: string;
}

interface HashPrimeLaunchTheatreProps {
  readonly artifacts: readonly HashPrimeArtifact[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HashPrimeLaunchTheatre({ artifacts }: HashPrimeLaunchTheatreProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = artifacts[activeIndex] ?? artifacts[0];

  if (!active) return null;

  return (
    <section className={styles.theatre} aria-label="Hash Prime project artifacts">
      <div className={styles.wordmark} aria-hidden="true">HASH<br />PRIME</div>

      <div className={styles.stage}>
        <div className={styles.mediaWrap}>
          <AnimatePresence initial={false} mode="wait">
            <motion.a
              className={styles.media}
              href={active.href}
              key={active.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open Hash Prime: ${active.label}`}
              data-cursor="OPEN LIVE"
              initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={reduceMotion ? undefined : { clipPath: 'inset(100% 0 0 0)' }}
              transition={reduceMotion ? { duration: 0.01 } : { duration: 0.82, ease: EASE }}
            >
              <Image src={active.src} alt={active.alt} fill sizes="(max-width: 820px) 100vw, 72vw" />
            </motion.a>
          </AnimatePresence>
        </div>

        <aside className={styles.catalog} aria-live="polite">
          <p className={styles.kicker}>Live visual system</p>
          <div className={styles.copy}>
            <motion.h3
              key={active.label}
              initial={reduceMotion ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={reduceMotion ? { duration: 0.01 } : { duration: 0.55, ease: EASE }}
            >
              {active.label}
            </motion.h3>
            <motion.p
              key={active.caption}
              initial={reduceMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={reduceMotion ? { duration: 0.01 } : { delay: 0.08, duration: 0.52, ease: EASE }}
            >
              {active.caption}
            </motion.p>
            <a href={active.href} target="_blank" rel="noreferrer" data-magnetic data-cursor="VISIT">
              Visit the live build <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <div className={styles.selector} role="tablist" aria-label="Choose a Hash Prime artifact">
            {artifacts.map((artifact, index) => (
              <button
                type="button"
                role="tab"
                key={artifact.src}
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                data-cursor="VIEW"
              >
                <span>{artifact.label}</span>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
