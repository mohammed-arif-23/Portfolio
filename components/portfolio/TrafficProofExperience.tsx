'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TrafficProofExperience.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);
}

const PHASES = [
  ['Check in', 'Register number + date of birth'],
  ['Brace up', 'Peak traffic hits the system'],
  ['Show up', 'Results land across devices'],
  ['All good', 'Normal ops return in under 15 minutes'],
] as const;

interface ProofMetric {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

interface TrafficProofExperienceProps {
  readonly metrics: readonly ProofMetric[];
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export default function TrafficProofExperience({ metrics }: TrafficProofExperienceProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const saveData = Boolean((navigator as NavigatorWithConnection).connection?.saveData);
      const scenes = gsap.utils.toArray<HTMLElement>('[data-traffic-scene]', root);
      const phases = gsap.utils.toArray<HTMLElement>('[data-traffic-phase]', root);
      const figures = gsap.utils.toArray<HTMLElement>('[data-traffic-figure]', root);
      const route = root.querySelector<SVGPathElement>('[data-traffic-route]');
      const runner = root.querySelector<SVGCircleElement>('[data-traffic-runner]');
      const pulse = root.querySelector<SVGGElement>('[data-traffic-pulse]');
      const graphLine = root.querySelector<SVGPathElement>('[data-traffic-graph-line]');
      const graphFill = root.querySelector<SVGPathElement>('[data-traffic-graph-fill]');
      const pointerField = root.querySelector<SVGGElement>('[data-traffic-pointer]');
      const progress = root.querySelector<HTMLElement>('[data-traffic-progress]');

      if (
        scenes.length !== 4
        || !route
        || !runner
        || !pulse
        || !graphLine
        || !graphFill
        || !progress
      ) {
        return undefined;
      }

      if (reducedMotion || saveData) {
        root.dataset.motion = 'static';
        root.setAttribute('data-sc-verify-state', 'resolved');
        root.setAttribute('data-sc-verify-hold', 'true');
        return () => {
          delete root.dataset.motion;
          root.removeAttribute('data-sc-verify-state');
          root.removeAttribute('data-sc-verify-hold');
        };
      }

      root.dataset.motion = 'enhanced';

      const routeLength = route.getTotalLength();
      const graphLength = graphLine.getTotalLength();
      gsap.set(scenes, { autoAlpha: 0, yPercent: 10, clipPath: 'inset(0 0 12% 0)' });
      gsap.set(scenes[0], { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0 0 0% 0)' });
      gsap.set(phases, { autoAlpha: 0.14, y: 28 });
      gsap.set(figures, { autoAlpha: 0, y: 42, scale: 0.94 });
      gsap.set(route, { strokeDasharray: routeLength, strokeDashoffset: routeLength });
      gsap.set(graphLine, { strokeDasharray: graphLength, strokeDashoffset: graphLength });
      gsap.set(graphFill, { autoAlpha: 0, scaleY: 0.18, transformOrigin: 'center bottom' });
      gsap.set(pulse, { scale: 0.72, rotate: -18, transformOrigin: '800px 450px' });
      gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.62,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const scene = Math.min(3, Math.floor(self.progress * 4));
            root.setAttribute('data-sc-verify-state', `${scene}:${Math.round(self.progress * 32)}`);
            if (self.progress > 0.975) root.setAttribute('data-sc-verify-hold', 'true');
            else root.removeAttribute('data-sc-verify-hold');
          },
        },
      });

      const showScene = (nextIndex: number, at: number) => {
        const previous = scenes[nextIndex - 1];
        const next = scenes[nextIndex];

        timeline.to(previous, {
          autoAlpha: 0,
          yPercent: -8,
          clipPath: 'inset(10% 0 0 0)',
          duration: 0.28,
          ease: 'power3.in',
        }, at);
        timeline.to(next, {
          autoAlpha: 1,
          yPercent: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.46,
          ease: 'expo.out',
        }, at + 0.14);
      };

      timeline
        .to(route, { strokeDashoffset: 0, duration: 4.8 }, 0)
        .to(progress, { scaleX: 1, duration: 4.8 }, 0)
        .to(runner, {
          motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] },
          duration: 4.8,
        }, 0)
        .to(pulse, { scale: 1.06, rotate: 155, duration: 2.4, ease: 'power2.inOut' }, 0)
        .to(pulse, { scale: 0.84, rotate: 360, duration: 2.4, ease: 'power2.inOut' }, 2.4)
        .fromTo('[data-traffic-intro-number]', {
          yPercent: 18,
          scaleX: 0.86,
        }, {
          yPercent: 0,
          scaleX: 1,
          duration: 0.74,
          ease: 'expo.out',
        }, 0.04);

      showScene(1, 0.78);
      timeline.to(phases, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.16,
        duration: 0.42,
        ease: 'power3.out',
      }, 1.02);

      showScene(2, 1.96);
      timeline.to(figures, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.44,
        ease: 'expo.out',
      }, 2.18);

      showScene(3, 3.12);
      timeline
        .to(graphLine, { strokeDashoffset: 0, duration: 1.04, ease: 'power2.inOut' }, 3.34)
        .to(graphFill, { autoAlpha: 0.16, scaleY: 1, duration: 0.92, ease: 'power2.out' }, 3.46);

      let removePointer = () => {};
      if (pointerField && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const xTo = gsap.quickTo(pointerField, 'x', { duration: 0.75, ease: 'power3.out' });
        const yTo = gsap.quickTo(pointerField, 'y', { duration: 0.75, ease: 'power3.out' });
        const onPointerMove = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          xTo(((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 34);
          yTo(((event.clientY - bounds.top) / Math.max(window.innerHeight, 1) - 0.5) * 22);
        };
        const onPointerLeave = () => {
          xTo(0);
          yTo(0);
        };

        root.addEventListener('pointermove', onPointerMove, { passive: true });
        root.addEventListener('pointerleave', onPointerLeave, { passive: true });
        removePointer = () => {
          root.removeEventListener('pointermove', onPointerMove);
          root.removeEventListener('pointerleave', onPointerLeave);
        };
      }

      return () => {
        removePointer();
        timeline.kill();
        delete root.dataset.motion;
        root.removeAttribute('data-sc-verify-state');
        root.removeAttribute('data-sc-verify-hold');
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      className={styles.root}
      id="proof"
      ref={rootRef}
      aria-labelledby="traffic-proof-title"
      data-sc-act="pin"
    >
      <div className={styles.stage} data-sc-stage>
        <svg className={styles.network} viewBox="0 0 1600 900" aria-hidden="true">
          <g className={styles.pointerField} data-traffic-pointer>
            <g className={styles.pulse} data-traffic-pulse>
              <circle cx="800" cy="450" r="292" />
              <circle cx="800" cy="450" r="208" />
              <circle cx="800" cy="450" r="104" />
              <path d="M 508 450 H 1092 M 800 158 V 742" />
            </g>
            <path className={styles.routeGhost} d="M 78 700 C 218 700 235 206 448 206 S 668 708 842 650 S 1050 152 1250 226 S 1424 646 1530 556" />
            <path className={styles.routeLive} data-traffic-route d="M 78 700 C 218 700 235 206 448 206 S 668 708 842 650 S 1050 152 1250 226 S 1424 646 1530 556" />
            <g className={styles.nodes}>
              <circle cx="78" cy="700" r="14" />
              <circle cx="448" cy="206" r="14" />
              <circle cx="842" cy="650" r="14" />
              <circle cx="1250" cy="226" r="14" />
              <circle cx="1530" cy="556" r="14" />
            </g>
            <circle className={styles.runner} data-traffic-runner cx="78" cy="700" r="10" />
          </g>
        </svg>

        <article className={`${styles.scene} ${styles.intro}`} data-traffic-scene>
          <p className={styles.introLead}>When traffic pops off, the system better not fold.</p>
          <h2 id="traffic-proof-title" data-traffic-intro-number>142K</h2>
          <p className={styles.introCopy}>hits in roughly thirty minutes. Yeah, that got real fast.</p>
        </article>

        <article className={`${styles.scene} ${styles.phases}`} data-traffic-scene>
          <h3>One result run. Zero panic.</h3>
          <div className={styles.phaseList}>
            {PHASES.map(([title, copy]) => (
              <div data-traffic-phase key={title}>
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={`${styles.scene} ${styles.figures}`} data-traffic-scene>
          <h3>The numbers were loud. The system stayed chill.</h3>
          <div className={styles.figureField}>
            {metrics.slice(0, 5).map((metric) => (
              <div data-traffic-figure key={metric.id}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={`${styles.scene} ${styles.resolve}`} data-traffic-scene>
          <section className={styles.graph} aria-labelledby="traffic-shape-title">
            <header>
              <span>Traffic shape</span>
              <h3 id="traffic-shape-title">Spike. Serve. We&apos;re good.</h3>
            </header>
            <svg viewBox="0 0 640 320" role="img" aria-label="Traffic arrival, peak, and recovery curve">
              <path className={styles.graphGrid} d="M 32 270 H 608 M 32 194 H 608 M 32 118 H 608 M 32 42 H 608" />
              <path className={styles.graphFill} data-traffic-graph-fill d="M 32 270 C 116 270 151 264 185 252 C 221 238 224 89 274 72 C 336 52 405 74 438 92 C 475 113 480 194 523 224 C 553 245 583 251 608 252 L 608 270 Z" />
              <path className={styles.graphLine} data-traffic-graph-line d="M 32 270 C 116 270 151 264 185 252 C 221 238 224 89 274 72 C 336 52 405 74 438 92 C 475 113 480 194 523 224 C 553 245 583 251 608 252" />
              <circle cx="274" cy="72" r="9" />
            </svg>
            <div className={styles.graphLabels}>
              <span>Arrival</span>
              <span>Peak</span>
              <span>Recovery</span>
            </div>
          </section>
        </article>

        <footer className={styles.footer} aria-hidden="true">
          <span>Request</span>
          <i><b data-traffic-progress /></i>
          <span>Recovered</span>
        </footer>
      </div>
    </section>
  );
}
