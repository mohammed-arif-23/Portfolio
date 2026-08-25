'use client';

import { useEffect, useRef } from 'react';

import styles from './InteractionLayer.module.css';

type Point = {
  x: number;
  y: number;
};

type Spark = Point & {
  age: number;
  color: string;
  life: number;
  length: number;
  rotation: number;
  spin: number;
  velocityX: number;
  velocityY: number;
  width: number;
};

type MagneticSnapshot = {
  activeAttribute: string | null;
  translate: string;
};

const interactionMediaQuery =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const interactionAttribute = 'data-portfolio-interactions';
const cursorSelector = '[data-cursor]';
const magneticSelector = '[data-magnetic]';
const sparkSelector = '[data-spark]';
const lensSelector = '[data-lens]';

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const closestHTMLElement = (
  source: EventTarget | null,
  selector: string,
): HTMLElement | null => {
  if (!(source instanceof Element)) return null;
  return source.closest<HTMLElement>(selector);
};

const readNumber = (
  value: string | undefined,
  fallback: number,
  minimum: number,
  maximum: number,
) => {
  const parsed = Number.parseFloat(value ?? '');
  return Number.isFinite(parsed)
    ? clamp(parsed, minimum, maximum)
    : fallback;
};

export function InteractionLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorCoreRef = useRef<HTMLSpanElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    const cursorCore = cursorCoreRef.current;
    const cursorLabel = cursorLabelRef.current;

    if (!canvas || !cursor || !cursorCore || !cursorLabel) return undefined;

    const mediaQuery = window.matchMedia(interactionMediaQuery);
    let deactivate: (() => void) | undefined;

    const activate = () => {
      const context = canvas.getContext('2d');
      const touchedMagneticElements = new Map<
        HTMLElement,
        MagneticSnapshot
      >();
      const sparks: Spark[] = [];
      const pointerTarget: Point = { x: -100, y: -100 };
      const follower: Point = { x: -100, y: -100 };
      let activeCursorTarget: HTMLElement | null = null;
      let activeMagneticTarget: HTMLElement | null = null;
      let activeMagneticRect: DOMRect | null = null;
      let activeLensTarget: HTMLElement | null = null;
      let activeLensRect: DOMRect | null = null;
      let cursorAnimationFrame = 0;
      let cursorFrameTime = 0;
      let sparkAnimationFrame = 0;
      let sparkFrameTime = 0;
      let hasPointerPosition = false;
      let devicePixelRatio = 1;
      let sparkPalette = ['#e54832', '#0d0d0c', '#f3efe6'];

      document.documentElement.setAttribute(interactionAttribute, 'ready');

      const placeElement = (element: HTMLElement, point: Point) => {
        element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      };

      const setCursorVisible = (visible: boolean) => {
        cursor.dataset.visible = visible ? 'true' : 'false';
        cursorCore.dataset.visible = visible ? 'true' : 'false';
      };

      const stopCursorAnimation = () => {
        if (cursorAnimationFrame) {
          window.cancelAnimationFrame(cursorAnimationFrame);
          cursorAnimationFrame = 0;
        }
        cursorFrameTime = 0;
      };

      const animateCursor = (time: number) => {
        const elapsed = cursorFrameTime
          ? Math.min(time - cursorFrameTime, 34)
          : 16;
        cursorFrameTime = time;
        const smoothing = 1 - Math.pow(0.001, elapsed / 1000);

        follower.x += (pointerTarget.x - follower.x) * smoothing;
        follower.y += (pointerTarget.y - follower.y) * smoothing;
        placeElement(cursor, follower);

        const remainingX = pointerTarget.x - follower.x;
        const remainingY = pointerTarget.y - follower.y;
        if (Math.abs(remainingX) + Math.abs(remainingY) > 0.12) {
          cursorAnimationFrame = window.requestAnimationFrame(animateCursor);
        } else {
          follower.x = pointerTarget.x;
          follower.y = pointerTarget.y;
          placeElement(cursor, follower);
          cursorAnimationFrame = 0;
          cursorFrameTime = 0;
        }
      };

      const scheduleCursorAnimation = () => {
        if (!cursorAnimationFrame) {
          cursorAnimationFrame = window.requestAnimationFrame(animateCursor);
        }
      };

      const resizeCanvas = () => {
        devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
        const width = Math.round(window.innerWidth * devicePixelRatio);
        const height = Math.round(window.innerHeight * devicePixelRatio);

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        context?.setTransform(
          devicePixelRatio,
          0,
          0,
          devicePixelRatio,
          0,
          0,
        );

        const rootStyles = window.getComputedStyle(document.documentElement);
        sparkPalette = [
          rootStyles.getPropertyValue('--sotd-accent').trim() || '#e54832',
          rootStyles.getPropertyValue('--sotd-ink').trim() || '#0d0d0c',
          rootStyles.getPropertyValue('--sotd-paper').trim() || '#f3efe6',
        ];
      };

      const drawSparks = (time: number) => {
        if (!context) {
          sparkAnimationFrame = 0;
          return;
        }

        const elapsed = sparkFrameTime
          ? Math.min(time - sparkFrameTime, 34)
          : 16;
        sparkFrameTime = time;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.lineCap = 'square';

        for (let index = sparks.length - 1; index >= 0; index -= 1) {
          const spark = sparks[index];
          spark.age += elapsed;

          if (spark.age >= spark.life) {
            sparks.splice(index, 1);
            continue;
          }

          const progress = spark.age / spark.life;
          const friction = Math.pow(0.985, elapsed);
          spark.velocityX *= friction;
          spark.velocityY = spark.velocityY * friction + 0.00018 * elapsed;
          spark.x += spark.velocityX * elapsed;
          spark.y += spark.velocityY * elapsed;
          spark.rotation += spark.spin * elapsed;

          const fade = Math.pow(1 - progress, 1.7);
          const reveal = Math.min(progress * 7, 1);
          const visibleLength = spark.length * reveal;
          const directionX = Math.cos(spark.rotation);
          const directionY = Math.sin(spark.rotation);

          context.globalAlpha = fade;
          context.strokeStyle = spark.color;
          context.lineWidth = spark.width;
          context.beginPath();
          context.moveTo(
            spark.x - directionX * visibleLength * 0.5,
            spark.y - directionY * visibleLength * 0.5,
          );
          context.lineTo(
            spark.x + directionX * visibleLength * 0.5,
            spark.y + directionY * visibleLength * 0.5,
          );
          context.stroke();

          if (index % 3 === 0) {
            const size = Math.max(1.5, 3.5 * (1 - progress));
            context.fillStyle = spark.color;
            context.fillRect(
              spark.x - size * 0.5,
              spark.y - size * 0.5,
              size,
              size,
            );
          }
        }

        context.globalAlpha = 1;

        if (sparks.length > 0) {
          sparkAnimationFrame = window.requestAnimationFrame(drawSparks);
        } else {
          sparkAnimationFrame = 0;
          sparkFrameTime = 0;
          context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
      };

      const createSparks = (event: PointerEvent) => {
        if (
          event.button !== 0 ||
          !context ||
          !closestHTMLElement(event.target, sparkSelector)
        ) return;

        const count = 12;
        const phase = ((event.clientX + event.clientY) % 31) / 31;

        for (let index = 0; index < count; index += 1) {
          const angle =
            (Math.PI * 2 * index) / count + phase * 0.34;
          const velocity = 0.105 + (index % 4) * 0.018;

          sparks.push({
            age: 0,
            color: sparkPalette[index % sparkPalette.length],
            life: 340 + (index % 5) * 24,
            length: 8 + (index % 4) * 2.5,
            rotation: angle,
            spin: (index % 2 === 0 ? 1 : -1) * 0.0007,
            velocityX: Math.cos(angle) * velocity,
            velocityY: Math.sin(angle) * velocity,
            width: index % 3 === 0 ? 2 : 1.25,
            x: event.clientX,
            y: event.clientY,
          });
        }

        if (sparks.length > 84) {
          sparks.splice(0, sparks.length - 84);
        }

        if (!sparkAnimationFrame) {
          sparkFrameTime = 0;
          sparkAnimationFrame = window.requestAnimationFrame(drawSparks);
        }
      };

      const ensureMagneticSnapshot = (target: HTMLElement) => {
        if (!touchedMagneticElements.has(target)) {
          touchedMagneticElements.set(target, {
            activeAttribute: target.getAttribute('data-magnetic-active'),
            translate: target.style.translate,
          });
        }
      };

      const releaseMagneticTarget = (target: HTMLElement | null) => {
        if (!target) return;
        const snapshot = touchedMagneticElements.get(target);

        if (snapshot?.activeAttribute === null || !snapshot) {
          target.removeAttribute('data-magnetic-active');
        } else {
          target.setAttribute(
            'data-magnetic-active',
            snapshot.activeAttribute,
          );
        }
        target.style.translate = snapshot?.translate ?? '';
      };

      const setMagneticTarget = (target: HTMLElement | null) => {
        if (target === activeMagneticTarget) return;

        releaseMagneticTarget(activeMagneticTarget);
        activeMagneticTarget = target;
        activeMagneticRect = target?.getBoundingClientRect() ?? null;

        if (target) {
          ensureMagneticSnapshot(target);
          target.setAttribute('data-magnetic-active', 'true');
        }
      };

      const updateCursorTarget = (target: HTMLElement | null) => {
        if (target === activeCursorTarget) return;
        activeCursorTarget = target;

        if (!target) {
          cursor.dataset.active = 'false';
          cursor.removeAttribute('data-tone');
          cursorLabel.textContent = '';
          return;
        }

        const rawLabel = target.dataset.cursor?.trim();
        const fallbackLabel = target.getAttribute('aria-label')?.trim();
        cursorLabel.textContent = (rawLabel || fallbackLabel || 'View').slice(
          0,
          22,
        );
        cursor.dataset.active = 'true';

        const tone = target.dataset.cursorTone?.trim();
        if (tone) cursor.dataset.tone = tone;
        else cursor.removeAttribute('data-tone');
      };

      const setLensTarget = (target: HTMLElement | null) => {
        if (target === activeLensTarget) return;
        if (activeLensTarget) {
          activeLensTarget.removeAttribute('data-lens-active');
          activeLensTarget.style.removeProperty('--lens-x');
          activeLensTarget.style.removeProperty('--lens-y');
        }

        activeLensTarget = target;
        activeLensRect = target?.getBoundingClientRect() ?? null;
        if (target) target.setAttribute('data-lens-active', 'true');
      };

      const handlePointerMove = (event: PointerEvent) => {
        pointerTarget.x = event.clientX;
        pointerTarget.y = event.clientY;
        placeElement(cursorCore, pointerTarget);

        if (!hasPointerPosition) {
          follower.x = event.clientX;
          follower.y = event.clientY;
          placeElement(cursor, follower);
          hasPointerPosition = true;
        }

        setCursorVisible(true);
        scheduleCursorAnimation();

        if (activeMagneticTarget && activeMagneticRect) {
          const centerX =
            activeMagneticRect.left + activeMagneticRect.width * 0.5;
          const centerY =
            activeMagneticRect.top + activeMagneticRect.height * 0.5;
          const strength = readNumber(
            activeMagneticTarget.dataset.magneticStrength,
            0.16,
            0.04,
            0.42,
          );
          const maximum = readNumber(
            activeMagneticTarget.dataset.magneticMax,
            14,
            4,
            28,
          );
          const offsetX = clamp(
            (event.clientX - centerX) * strength,
            -maximum,
            maximum,
          );
          const offsetY = clamp(
            (event.clientY - centerY) * strength,
            -maximum,
            maximum,
          );

          activeMagneticTarget.style.translate = `${offsetX.toFixed(2)}px ${offsetY.toFixed(2)}px`;
        }

        if (activeLensTarget && activeLensRect) {
          const x = clamp(event.clientX - activeLensRect.left, 0, activeLensRect.width);
          const y = clamp(event.clientY - activeLensRect.top, 0, activeLensRect.height);
          activeLensTarget.style.setProperty('--lens-x', `${x.toFixed(1)}px`);
          activeLensTarget.style.setProperty('--lens-y', `${y.toFixed(1)}px`);
        }
      };

      const handlePointerOver = (event: PointerEvent) => {
        updateCursorTarget(closestHTMLElement(event.target, cursorSelector));
        setMagneticTarget(closestHTMLElement(event.target, magneticSelector));
        setLensTarget(closestHTMLElement(event.target, lensSelector));
      };

      const handlePointerOut = (event: PointerEvent) => {
        const nextCursorTarget = closestHTMLElement(
          event.relatedTarget,
          cursorSelector,
        );
        const nextMagneticTarget = closestHTMLElement(
          event.relatedTarget,
          magneticSelector,
        );
        const nextLensTarget = closestHTMLElement(event.relatedTarget, lensSelector);

        if (nextCursorTarget !== activeCursorTarget) {
          updateCursorTarget(nextCursorTarget);
        }
        if (nextMagneticTarget !== activeMagneticTarget) {
          setMagneticTarget(nextMagneticTarget);
        }
        if (nextLensTarget !== activeLensTarget) setLensTarget(nextLensTarget);
      };

      const handlePointerDown = (event: PointerEvent) => {
        cursor.dataset.pressed = 'true';
        createSparks(event);
      };

      const handlePointerUp = () => {
        cursor.dataset.pressed = 'false';
      };

      const handleWindowExit = () => {
        setCursorVisible(false);
        cursor.dataset.pressed = 'false';
        updateCursorTarget(null);
        setMagneticTarget(null);
        setLensTarget(null);
      };

      const releaseInteractionsOnScroll = () => {
        setMagneticTarget(null);
        setLensTarget(null);
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') return;
        handleWindowExit();
        sparks.splice(0, sparks.length);

        if (sparkAnimationFrame) {
          window.cancelAnimationFrame(sparkAnimationFrame);
          sparkAnimationFrame = 0;
          sparkFrameTime = 0;
        }
        context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
      };

      resizeCanvas();
      document.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
      document.addEventListener('pointerover', handlePointerOver, {
        passive: true,
      });
      document.addEventListener('pointerout', handlePointerOut, {
        passive: true,
      });
      document.addEventListener('pointerdown', handlePointerDown, {
        passive: true,
      });
      document.addEventListener('pointerup', handlePointerUp, {
        passive: true,
      });
      document.addEventListener('pointercancel', handlePointerUp, {
        passive: true,
      });
      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.documentElement.addEventListener(
        'pointerleave',
        handleWindowExit,
      );
      window.addEventListener('blur', handleWindowExit);
      window.addEventListener('resize', resizeCanvas, { passive: true });
      window.addEventListener('scroll', releaseInteractionsOnScroll, {
        passive: true,
      });

      return () => {
        stopCursorAnimation();
        if (sparkAnimationFrame) {
          window.cancelAnimationFrame(sparkAnimationFrame);
        }

        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerover', handlePointerOver);
        document.removeEventListener('pointerout', handlePointerOut);
        document.removeEventListener('pointerdown', handlePointerDown);
        document.removeEventListener('pointerup', handlePointerUp);
        document.removeEventListener('pointercancel', handlePointerUp);
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange,
        );
        document.documentElement.removeEventListener(
          'pointerleave',
          handleWindowExit,
        );
        window.removeEventListener('blur', handleWindowExit);
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('scroll', releaseInteractionsOnScroll);

        document.documentElement.removeAttribute(interactionAttribute);
        setCursorVisible(false);
        cursor.dataset.active = 'false';
        cursor.dataset.pressed = 'false';
        cursor.removeAttribute('data-tone');
        cursorLabel.textContent = '';
        context?.clearRect(0, 0, window.innerWidth, window.innerHeight);

        touchedMagneticElements.forEach((snapshot, element) => {
          element.style.translate = snapshot.translate;
          if (snapshot.activeAttribute === null) {
            element.removeAttribute('data-magnetic-active');
          } else {
            element.setAttribute(
              'data-magnetic-active',
              snapshot.activeAttribute,
            );
          }
        });
      };
    };

    const updateActivation = () => {
      deactivate?.();
      deactivate = undefined;
      if (mediaQuery.matches) deactivate = activate();
    };

    updateActivation();
    mediaQuery.addEventListener('change', updateActivation);

    return () => {
      mediaQuery.removeEventListener('change', updateActivation);
      deactivate?.();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.sparkCanvas}
        aria-hidden="true"
      />
      <div
        ref={cursorRef}
        className={styles.cursor}
        data-active="false"
        data-pressed="false"
        data-visible="false"
        aria-hidden="true"
      >
        <span className={styles.cursorRing} />
        <span ref={cursorLabelRef} className={styles.cursorLabel} />
      </div>
      <span
        ref={cursorCoreRef}
        className={styles.cursorCore}
        data-visible="false"
        aria-hidden="true"
      />
    </>
  );
}

export default InteractionLayer;
