'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Mail, X } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import styles from './PortfolioNav.module.css';

const CHAPTERS = [
  { id: 'top', index: '01', label: 'Opening', preview: 'HELLO', note: 'First contact. Zero filler.', shape: 'orbit' },
  { id: 'work', index: '02', label: 'Work', preview: 'BUILD', note: 'Public systems. Actually shipped.', shape: 'frame' },
  { id: 'proof', index: '03', label: 'Proof', preview: 'PROOF', note: 'Receipts, not vibes.', shape: 'diamond' },
  { id: 'health', index: '04', label: 'Healthcare', preview: 'CARE', note: 'Care meets code.', shape: 'cross' },
  { id: 'hash', index: '05', label: 'Product', preview: 'SHIP', note: 'Brand, frontend, CMS, live.', shape: 'split' },
  { id: 'systems', index: '06', label: 'Systems', preview: 'OPERATE', note: 'Campaign. Automate. Operate.', shape: 'route' },
  { id: 'capabilities', index: '07', label: 'Capabilities', preview: 'STACK', note: 'Six modes. One builder.', shape: 'stack' },
  { id: 'about', index: '08', label: 'About', preview: 'LORE', note: 'The builder behind the builds.', shape: 'portrait' },
  { id: 'contact', index: '09', label: 'Contact', preview: 'TALK', note: 'Say less. Let’s build.', shape: 'arrow' },
] as const;

type ChapterId = (typeof CHAPTERS)[number]['id'];

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<ChapterId>('top');
  const [hoveredId, setHoveredId] = useState<ChapterId | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const activeChapter = useMemo(
    () => CHAPTERS.find((chapter) => chapter.id === activeId) ?? CHAPTERS[0],
    [activeId],
  );
  const previewChapter = useMemo(
    () => CHAPTERS.find((chapter) => chapter.id === (hoveredId ?? activeId)) ?? CHAPTERS[0],
    [activeId, hoveredId],
  );

  const closeMenu = useCallback(() => {
    setOpen(false);
    setHoveredId(null);
  }, []);

  useEffect(() => {
    const sections = CHAPTERS
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id as ChapterId);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.08, 0.2] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';

    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !overlayRef.current) return;

      const overlayControls = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      const focusable = [menuButtonRef.current, ...overlayControls].filter(
        (element): element is HTMLElement => Boolean(element),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;

      const focusTarget = previousFocusRef.current?.isConnected
        ? previousFocusRef.current
        : menuButtonRef.current;
      focusTarget?.focus({ preventScroll: true });
    };
  }, [closeMenu, open]);

  const navigateTo = useCallback((event: MouseEvent<HTMLAnchorElement>, id: ChapterId) => {
    event.preventDefault();
    closeMenu();

    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }, reduceMotion ? 0 : 70);
  }, [closeMenu, reduceMotion]);

  const curtainEase = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      <header
        className={styles.bar}
        data-menu-open={open ? 'true' : 'false'}
        data-scrolled={activeId === 'top' || open ? 'false' : 'true'}
      >
        <a
          className={styles.brand}
          href="#top"
          aria-hidden={open ? true : undefined}
          tabIndex={open ? -1 : undefined}
          onClick={(event) => navigateTo(event, 'top')}
        >
          <span className={styles.brandMark} aria-hidden="true">MA</span>
          <span className={styles.brandName}>T Mohammed Arif</span>
        </a>

        <div className={styles.current} aria-hidden={open ? true : undefined} aria-live={open ? undefined : 'polite'}>
          <span>{activeChapter.index}</span>
          <i aria-hidden="true" />
          <strong>{activeChapter.label}</strong>
        </div>

        <button
          className={styles.menuControl}
          type="button"
          ref={menuButtonRef}
          aria-expanded={open}
          aria-controls="portfolio-menu"
          aria-label={open ? 'Close portfolio menu' : 'Open portfolio menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? 'Close' : 'Index'}</span>
          {open ? <X aria-hidden="true" /> : <i className={styles.menuGlyph} aria-hidden="true"><b /><b /><b /></i>}
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className={styles.overlay}
            id="portfolio-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio navigation"
            initial="initial"
            animate="open"
            exit="exit"
          >
            <motion.div
              className={`${styles.curtain} ${styles.curtainInk}`}
              data-menu-curtain="ink"
              variants={{
                initial: { y: '100%' },
                open: { y: '0%', transition: { duration: reduceMotion ? 0.01 : 0.72, delay: reduceMotion ? 0 : 0.1, ease: curtainEase } },
                exit: { y: '-100%', transition: { duration: reduceMotion ? 0.01 : 0.68, ease: curtainEase } },
              }}
            />
            <motion.div
              className={`${styles.curtain} ${styles.curtainAccent}`}
              data-menu-curtain="accent"
              variants={{
                initial: { y: '100%' },
                open: { y: '0%', transition: { duration: reduceMotion ? 0.01 : 0.66, ease: curtainEase } },
                exit: { y: '-100%', transition: { duration: reduceMotion ? 0.01 : 0.72, delay: reduceMotion ? 0 : 0.22, ease: curtainEase } },
              }}
            />

            <motion.div
              className={styles.menuLayout}
              variants={{
                initial: { opacity: 0, y: 24 },
                open: { opacity: 1, y: 0, transition: { delay: reduceMotion ? 0 : 0.42, duration: reduceMotion ? 0.01 : 0.42, ease: curtainEase } },
                exit: { opacity: 0, y: -18, transition: { duration: reduceMotion ? 0.01 : 0.2, ease: curtainEase } },
              }}
            >
              <nav className={styles.linkPane} aria-label="Portfolio chapters">
                <div className={styles.menuIntro}>
                  <span>Index</span>
                  <p>01—09</p>
                </div>

                <ol className={styles.chapterGrid}>
                  {CHAPTERS.map((chapter, index) => (
                    <motion.li
                      key={chapter.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduceMotion ? 0 : 0.22 + index * 0.035, duration: reduceMotion ? 0.01 : 0.55, ease: curtainEase }}
                      data-active={activeId === chapter.id ? 'true' : 'false'}
                      onMouseEnter={() => setHoveredId(chapter.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(chapter.id)}
                    >
                      <a
                        href={`#${chapter.id}`}
                        ref={index === 0 ? firstLinkRef : undefined}
                        aria-current={activeId === chapter.id ? 'location' : undefined}
                        onClick={(event) => navigateTo(event, chapter.id)}
                      >
                        <span>{chapter.index}</span>
                        <strong>{chapter.label}</strong>
                        <ArrowDownRight aria-hidden="true" />
                      </a>
                    </motion.li>
                  ))}
                </ol>
              </nav>

              <aside className={styles.previewPane} aria-hidden="true">
                <span className={styles.previewIndex}>{previewChapter.index}</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    className={styles.previewWord}
                    key={previewChapter.id}
                    initial={reduceMotion ? false : { y: '34%', opacity: 0, rotate: 2 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={reduceMotion ? undefined : { y: '-24%', opacity: 0, rotate: -2 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.48, ease: curtainEase }}
                  >
                    {previewChapter.preview}
                  </motion.div>
                </AnimatePresence>
                <div className={styles.previewGeometry} data-shape={previewChapter.shape}>
                  <i /><i /><i />
                </div>
                <p>{previewChapter.note}</p>
                <span className={styles.previewHint}>{previewChapter.label}</span>
              </aside>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
