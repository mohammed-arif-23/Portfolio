'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import styles from './CapabilityFlowStack.module.css';

export interface CapabilityFlowGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export interface CapabilityFlowStackProps {
  readonly groups: readonly CapabilityFlowGroup[];
  readonly label?: string;
}

const padIndex = (index: number) => String(index + 1).padStart(2, '0');

const categoryScale = (category: string) => {
  if (category.length > 24) return 'clamp(3.6rem, 7.2vw, 8rem)';
  if (category.length > 15) return 'clamp(4rem, 8.6vw, 9.5rem)';
  return 'clamp(4.8rem, 11.5vw, 12.5rem)';
};

export default function CapabilityFlowStack({
  groups,
  label = 'Technical capabilities',
}: CapabilityFlowStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [enteredPanels, setEnteredPanels] = useState<ReadonlySet<number>>(
    () => new Set(),
  );
  const reduceMotion = useReducedMotion();
  const instanceId = useId().replace(/:/g, '');
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const activeIndexRef = useRef(0);

  const activate = useCallback((index: number) => {
    if (!groups.length) return;
    const nextIndex = Math.min(Math.max(index, 0), groups.length - 1);
    if (nextIndex === activeIndexRef.current) return;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, [groups.length]);

  useEffect(() => {
    const nextIndex = Math.min(activeIndexRef.current, Math.max(0, groups.length - 1));
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    setExpandedIndex((current) => Math.min(current, Math.max(0, groups.length - 1)));
    panelRefs.current = panelRefs.current.slice(0, groups.length);
  }, [groups.length]);

  useEffect(() => {
    if (!groups.length || reduceMotion) return;

    const mobileQuery = window.matchMedia('(max-width: 900px)');
    let observer: IntersectionObserver | null = null;

    const connectObserver = () => {
      observer?.disconnect();
      observer = null;

      if (!mobileQuery.matches) return;

      observer = new IntersectionObserver((entries) => {
        const newlyEntered: number[] = [];

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const panelIndex = Number((entry.target as HTMLElement).dataset.flowPanel);
          if (Number.isFinite(panelIndex)) newlyEntered.push(panelIndex);
          observer?.unobserve(entry.target);
        });

        if (newlyEntered.length) {
          setEnteredPanels((current) => {
            const next = new Set(current);
            newlyEntered.forEach((index) => next.add(index));
            return next;
          });
        }
      }, {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.14,
      });

      panelRefs.current.forEach((panel) => {
        if (panel) observer?.observe(panel);
      });
    };

    connectObserver();
    mobileQuery.addEventListener('change', connectObserver);

    return () => {
      observer?.disconnect();
      mobileQuery.removeEventListener('change', connectObserver);
    };
  }, [groups.length, reduceMotion]);

  useEffect(() => {
    if (!groups.length) return;

    const desktopQuery = window.matchMedia('(min-width: 901px)');
    let observer: IntersectionObserver | null = null;

    const selectPanelAtViewportMiddle = () => {
      const activationLine = window.innerHeight * 0.52;
      let nextIndex = 0;

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        const bounds = panel.getBoundingClientRect();
        if (bounds.top <= activationLine && bounds.bottom > activationLine) {
          nextIndex = index;
        }
      });

      activate(nextIndex);
    };

    const connectObserver = () => {
      observer?.disconnect();
      observer = null;

      if (!desktopQuery.matches) return;

      observer = new IntersectionObserver(selectPanelAtViewportMiddle, {
        root: null,
        rootMargin: '-48% 0px -48% 0px',
        threshold: 0,
      });

      panelRefs.current.forEach((panel) => {
        if (panel) observer?.observe(panel);
      });

      selectPanelAtViewportMiddle();
    };

    connectObserver();
    desktopQuery.addEventListener('change', connectObserver);

    return () => {
      observer?.disconnect();
      desktopQuery.removeEventListener('change', connectObserver);
    };
  }, [activate, groups.length]);

  if (!groups.length) return null;

  return (
    <section className={styles.flowStack} aria-label={label}>
      {groups.map((group, index) => {
        const isActive = activeIndex === index;
        const isExpanded = expandedIndex === index;
        const hasEntered = reduceMotion || enteredPanels.has(index);
        const titleId = `${instanceId}-flow-title-${index}`;
        const themeClass = index % 3 === 0
          ? styles.inkPanel
          : index % 3 === 1
            ? styles.paperPanel
            : styles.accentPanel;
        const panelStyle = {
          '--flow-index': index,
          '--flow-top': `calc(var(--sotd-nav-height, 4rem) + ${index * 0.48}rem)`,
          '--flow-title-size': categoryScale(group.category),
          '--flow-duration': `${Math.max(18, group.items.length * 3.8)}s`,
        } as CSSProperties;

        return (
          <motion.article
            className={`${styles.panel} ${themeClass}`}
            data-active={isActive ? 'true' : 'false'}
            data-direction={index % 2 === 0 ? 'forward' : 'reverse'}
            data-entered={hasEntered ? 'true' : 'false'}
            data-expanded={isExpanded ? 'true' : 'false'}
            data-flow-panel={index}
            data-cursor="EXPLORE"
            id={`${instanceId}-flow-panel-${index}`}
            key={`${group.category}-${index}`}
            ref={(node) => {
              panelRefs.current[index] = node;
            }}
            style={panelStyle}
            tabIndex={0}
            aria-labelledby={titleId}
            aria-expanded={isExpanded}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest(`.${styles.rail}`)) return;
              activate(index);
              setExpandedIndex((current) => current === index ? -1 : index);
            }}
            onFocus={() => activate(index)}
            onMouseEnter={() => activate(index)}
            onPointerDown={() => activate(index)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return;
              event.preventDefault();
              activate(index);
              setExpandedIndex((current) => current === index ? -1 : index);
            }}
            animate={reduceMotion ? undefined : {
              x: isActive ? 0 : index < activeIndex ? -12 : 12,
              scale: isActive ? 1 : 0.988,
            }}
            transition={{ duration: reduceMotion ? 0.01 : 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className={styles.panelHeader}>
              <span>{padIndex(index)}</span>
              <i aria-hidden="true" />
              <span>{padIndex(groups.length)}</span>
              <span className={styles.mobileAction} aria-hidden="true">
                {isExpanded ? 'FOLD' : 'OPEN'}
                <b>{isExpanded ? '−' : '+'}</b>
              </span>
            </header>

            <motion.h3
              className={styles.title}
              id={titleId}
              animate={reduceMotion ? undefined : {
                x: isActive ? 0 : index % 2 === 0 ? -22 : 22,
                letterSpacing: isActive ? '-0.072em' : '-0.058em',
              }}
              transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {group.category}
            </motion.h3>

            <div className={styles.railReveal}>
              <div>
                <div className={styles.rail}>
                  <div className={styles.railTrack}>
                    <ul className={styles.railGroup} aria-label={`${group.category} skills`}>
                      {group.items.map((item, itemIndex) => (
                        <li
                          key={`${item}-${itemIndex}`}
                          style={{ '--skill-index': itemIndex } as CSSProperties}
                        >
                          <span aria-hidden="true">{padIndex(itemIndex)}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ul className={styles.railGroup} aria-hidden="true">
                      {group.items.map((item, itemIndex) => (
                        <li key={`${item}-duplicate-${itemIndex}`}>
                          <span>{padIndex(itemIndex)}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <footer className={styles.panelFooter}>
              <p>{group.items.join(' · ')}</p>
              <span aria-hidden="true">↘</span>
            </footer>
          </motion.article>
        );
      })}
    </section>
  );
}
