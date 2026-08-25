'use client';

import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type PanInfo,
  type Variants,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react';

import styles from './ProjectArtifactCarousel.module.css';

export interface ProjectArtifactSlide {
  src: string;
  alt: string;
  label: string;
  caption: string;
  href?: string;
}

export interface ProjectArtifactCarouselProps {
  slides: ProjectArtifactSlide[];
  theme?: 'light' | 'dark';
}

const EASE = [0.16, 1, 0.3, 1] as const;

const mediaVariants: Variants = {
  enter: (direction: number) => ({
    clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    opacity: 0.72,
    scale: 1.045,
    x: direction * 34,
  }),
  center: {
    clipPath: 'inset(0 0% 0 0%)',
    opacity: 1,
    scale: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    clipPath: direction > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
    opacity: 0.46,
    scale: 0.985,
    x: direction * -24,
  }),
};

const copyVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 32 : -32,
  }),
  center: {
    opacity: 1,
    transition: { delayChildren: 0.09, staggerChildren: 0.045 },
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    transition: { staggerChildren: 0.025, staggerDirection: -1 },
    y: direction > 0 ? -26 : 26,
  }),
};

const wordVariants: Variants = {
  enter: (direction: number) => ({
    rotateX: direction > 0 ? 72 : -72,
    y: direction > 0 ? '112%' : '-112%',
  }),
  center: {
    rotateX: 0,
    transition: { duration: 0.66, ease: EASE },
    y: '0%',
  },
  exit: (direction: number) => ({
    rotateX: direction > 0 ? -52 : 52,
    transition: { duration: 0.34, ease: EASE },
    y: direction > 0 ? '-112%' : '112%',
  }),
};

const padIndex = (value: number) => String(value).padStart(2, '0');

export default function ProjectArtifactCarousel({
  slides,
  theme = 'light',
}: ProjectArtifactCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = Boolean(useReducedMotion());
  const carouselId = useId().replace(/:/g, '');
  const slideId = `sotd-carousel-slide-${carouselId}`;
  const hasMultipleSlides = slides.length > 1;
  const activeSlide = slides[activeIndex];
  const draggedRef = useRef(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const lensVisible = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { damping: 30, mass: 0.22, stiffness: 260 });
  const smoothPointerY = useSpring(pointerY, { damping: 30, mass: 0.22, stiffness: 260 });
  const smoothTiltX = useSpring(tiltX, { damping: 24, mass: 0.32, stiffness: 185 });
  const smoothTiltY = useSpring(tiltY, { damping: 24, mass: 0.32, stiffness: 185 });
  const smoothLensVisible = useSpring(lensVisible, { damping: 28, mass: 0.18, stiffness: 300 });
  const lensClip = useMotionTemplate`circle(5.35rem at ${smoothPointerX}px ${smoothPointerY}px)`;
  const lensOrigin = useMotionTemplate`${smoothPointerX}px ${smoothPointerY}px`;

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(0, slides.length - 1)));
  }, [slides.length]);

  const resetPointerEffect = () => {
    lensVisible.set(0);
    tiltX.set(0);
    tiltY.set(0);
  };

  const selectSlide = (index: number, nextDirection: number) => {
    if (!slides.length) return;
    resetPointerEffect();
    setDirection(nextDirection);
    setActiveIndex((index + slides.length) % slides.length);
  };

  const showPrevious = () => selectSlide(activeIndex - 1, -1);
  const showNext = () => selectSlide(activeIndex + 1, 1);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width);
    const y = Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height);
    pointerX.set(x);
    pointerY.set(y);
    tiltX.set((0.5 - y / bounds.height) * 2.2);
    tiltY.set((x / bounds.width - 0.5) * 2.8);
    lensVisible.set(1);
  };

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const intent = Math.abs(info.offset.x) > 64 || Math.abs(info.velocity.x) > 620;
    if (!intent) return;
    if (info.offset.x < 0 || info.velocity.x < -620) showNext();
    else showPrevious();
  };

  const preventDraggedLink = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!draggedRef.current) return;
    event.preventDefault();
    draggedRef.current = false;
  };

  const mediaTransition = reduceMotion ? { duration: 0.01 } : { duration: 0.82, ease: EASE };
  const copyTransition = reduceMotion ? { duration: 0.01 } : { duration: 0.58, ease: EASE };
  const progress = slides.length ? (activeIndex + 1) / slides.length : 0;

  return (
    <section
      className={`${styles.carousel} ${theme === 'dark' ? styles.dark : styles.light}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project artifacts"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {activeSlide ? (
        <motion.figure
          className={styles.slide}
          id={slideId}
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${slides.length}: ${activeSlide.label}`}
          drag={hasMultipleSlides && !reduceMotion ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          dragSnapToOrigin
          dragTransition={{ bounceDamping: 28, bounceStiffness: 380 }}
          onPointerDown={() => { draggedRef.current = false; }}
          onDragStart={() => { draggedRef.current = true; resetPointerEffect(); }}
          onDragEnd={handleDragEnd}
        >
          <div
            className={styles.mediaStage}
            onPointerEnter={handlePointerMove}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointerEffect}
          >
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={`${activeSlide.src}-${activeIndex}`}
                className={styles.mediaPanel}
                custom={direction}
                variants={mediaVariants}
                initial={reduceMotion ? { opacity: 0 } : 'enter'}
                animate="center"
                exit={reduceMotion ? { opacity: 0 } : 'exit'}
                transition={mediaTransition}
              >
                <motion.div
                  className={styles.mediaPlane}
                  style={{
                    rotateX: reduceMotion ? 0 : smoothTiltX,
                    rotateY: reduceMotion ? 0 : smoothTiltY,
                    transformPerspective: 1200,
                  }}
                >
                  {activeSlide.href ? (
                    <a
                      className={styles.mediaLink}
                      href={activeSlide.href}
                      aria-label={`Open ${activeSlide.label}`}
                      onClick={preventDraggedLink}
                      data-cursor="OPEN LIVE"
                    >
                      <Image className={styles.image} src={activeSlide.src} alt={activeSlide.alt} fill draggable={false} sizes="(max-width: 820px) 100vw, 76vw" />
                    </a>
                  ) : (
                    <div className={styles.mediaStatic}>
                      <Image className={styles.image} src={activeSlide.src} alt={activeSlide.alt} fill draggable={false} sizes="(max-width: 820px) 100vw, 76vw" />
                    </div>
                  )}

                  {!reduceMotion ? (
                    <>
                      <motion.div className={styles.lensCrop} style={{ clipPath: lensClip, opacity: smoothLensVisible }} aria-hidden="true">
                        <motion.div className={styles.lensImage} style={{ scale: 1.085, transformOrigin: lensOrigin }}>
                          <Image className={styles.image} src={activeSlide.src} alt="" fill draggable={false} sizes="(max-width: 820px) 100vw, 76vw" />
                        </motion.div>
                      </motion.div>
                      <motion.span className={styles.lensRing} style={{ opacity: smoothLensVisible, x: smoothPointerX, y: smoothPointerY }} aria-hidden="true" />
                      <motion.span
                        key={`blade-${activeIndex}`}
                        className={styles.transitionBlade}
                        initial={{ opacity: 0, x: direction > 0 ? '62vw' : '-62vw' }}
                        animate={{ opacity: [0, 1, 1, 0], x: direction > 0 ? '-62vw' : '62vw' }}
                        transition={{ duration: 0.86, ease: EASE, times: [0, 0.12, 0.72, 1] }}
                        aria-hidden="true"
                      />
                    </>
                  ) : null}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <figcaption className={styles.caption}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={`${activeSlide.label}-${activeIndex}`}
                className={styles.captionContent}
                custom={direction}
                variants={copyVariants}
                initial={reduceMotion ? { opacity: 0 } : 'enter'}
                animate="center"
                exit={reduceMotion ? { opacity: 0 } : 'exit'}
                transition={copyTransition}
              >
                <div className={styles.index} aria-hidden="true">
                  <span>{padIndex(activeIndex + 1)}</span>
                  <i />
                  <small>{padIndex(slides.length)}</small>
                </div>
                <div className={styles.copy}>
                  <h3 className={styles.label} aria-label={activeSlide.label}>
                    {activeSlide.label.split(/\s+/).map((word, index) => (
                      <span className={styles.wordMask} key={`${word}-${index}`} aria-hidden="true">
                        <motion.span custom={direction} variants={wordVariants}>{word}</motion.span>
                      </span>
                    ))}
                  </h3>
                  <motion.p variants={wordVariants} custom={direction} className={styles.description}>{activeSlide.caption}</motion.p>
                  {activeSlide.href ? (
                    <motion.a className={styles.liveLink} href={activeSlide.href} onClick={preventDraggedLink} variants={wordVariants} custom={direction} data-cursor="OPEN LIVE">
                      <span>Open live</span>
                      <ExternalLink aria-hidden="true" strokeWidth={1.8} />
                    </motion.a>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </figcaption>
        </motion.figure>
      ) : (
        <p className={styles.empty}>No project artifacts available.</p>
      )}

      <div className={styles.controls}>
        <motion.button
          className={`${styles.button} ${styles.previous}`}
          type="button"
          aria-label="Show previous project artifact"
          aria-controls={activeSlide ? slideId : undefined}
          disabled={!hasMultipleSlides}
          onClick={showPrevious}
          initial="rest"
          animate="rest"
          whileHover={reduceMotion ? undefined : 'hover'}
          whileFocus={reduceMotion ? undefined : 'hover'}
          whileTap={reduceMotion ? undefined : 'tap'}
          data-magnetic
          data-spark
          data-cursor="PREV"
        >
          <motion.span variants={{ rest: { scaleX: 1, x: 0 }, hover: { scaleX: 1.14, transition: { damping: 16, stiffness: 350, type: 'spring' }, x: -7 }, tap: { scaleX: 0.72, x: -2 } }}>
            <ArrowLeft aria-hidden="true" strokeWidth={1.65} />
          </motion.span>
        </motion.button>

        <div className={styles.progressGroup}>
          <p className={styles.status} aria-live="polite" aria-atomic="true">
            {activeSlide ? `${activeSlide.label}. Slide ${activeIndex + 1} of ${slides.length}.` : 'No slides'}
          </p>
          {hasMultipleSlides ? (
            <div className={styles.slideTabs} role="tablist" aria-label="Choose project artifact">
              {slides.map((slide, index) => (
                <button
                  aria-controls={slideId}
                  aria-selected={activeIndex === index}
                  className={styles.slideTab}
                  data-cursor={`VIEW ${padIndex(index + 1)}`}
                  key={slide.src}
                  onClick={() => selectSlide(index, index >= activeIndex ? 1 : -1)}
                  role="tab"
                  tabIndex={activeIndex === index ? 0 : -1}
                  type="button"
                >
                  <span>{padIndex(index + 1)}</span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>
          ) : null}
          <div className={styles.progress} aria-hidden="true">
            <motion.span
              initial={false}
              animate={{ scaleX: progress }}
              transition={reduceMotion ? { duration: 0.01 } : { damping: 26, mass: 0.48, stiffness: 170, type: 'spring' }}
            />
          </div>
        </div>

        <motion.button
          className={`${styles.button} ${styles.next}`}
          type="button"
          aria-label="Show next project artifact"
          aria-controls={activeSlide ? slideId : undefined}
          disabled={!hasMultipleSlides}
          onClick={showNext}
          initial="rest"
          animate="rest"
          whileHover={reduceMotion ? undefined : 'hover'}
          whileFocus={reduceMotion ? undefined : 'hover'}
          whileTap={reduceMotion ? undefined : 'tap'}
          data-magnetic
          data-spark
          data-cursor="NEXT"
        >
          <motion.span variants={{ rest: { scaleX: 1, x: 0 }, hover: { scaleX: 1.14, transition: { damping: 16, stiffness: 350, type: 'spring' }, x: 7 }, tap: { scaleX: 0.72, x: 2 } }}>
            <ArrowRight aria-hidden="true" strokeWidth={1.65} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
