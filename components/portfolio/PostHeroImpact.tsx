'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PostHeroImpact.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export default function PostHeroImpact() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const saveData = Boolean((navigator as NavigatorWithConnection).connection?.saveData);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (saveData || reducedMotion) {
        root.dataset.motion = 'static';
        root.dataset.impactReady = 'true';
        root.setAttribute('data-sc-verify-state', 'resolved');
        root.setAttribute('data-sc-verify-hold', 'true');
        return () => {
          delete root.dataset.motion;
          delete root.dataset.impactReady;
          root.removeAttribute('data-sc-verify-state');
          root.removeAttribute('data-sc-verify-hold');
        };
      }

      root.dataset.motion = 'enhanced';

      const beats = gsap.utils.toArray<HTMLElement>('[data-impact-beat]', root);
      const path = root.querySelector<SVGPathElement>('[data-impact-path]');
      const runner = root.querySelector<SVGCircleElement>('[data-impact-runner]');
      const orbit = root.querySelector<SVGGElement>('[data-impact-orbit]');
      const geometry = root.querySelector<SVGGElement>('[data-impact-geometry]');
      const six = root.querySelector<SVGTextElement>('[data-impact-six]');
      const seven = root.querySelector<SVGTextElement>('[data-impact-seven]');
      const progressLine = root.querySelector<HTMLElement>('[data-impact-progress]');
      if (!path || !runner || !orbit || !geometry || !six || !seven || !progressLine || beats.length < 4) {
        return () => {
          delete root.dataset.motion;
        };
      }

      const pathLength = path.getTotalLength();
      const joinSixX = -114;
      const joinSevenX = 125;

      gsap.set(beats, { autoAlpha: 0, yPercent: 18, clipPath: 'inset(0 0 100% 0)' });
      gsap.set(beats[0], { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0 0 0% 0)' });
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      gsap.set(runner, { autoAlpha: 1 });
      gsap.set(six, { x: -260, y: 62, rotate: -17, svgOrigin: '800 600' });
      gsap.set(seven, { x: 280, y: -44, rotate: 19, svgOrigin: '800 600' });
      gsap.set(geometry, { rotate: -36, scale: 0.78, svgOrigin: '800 450' });
      gsap.set(progressLine, { scaleX: 0, transformOrigin: 'left center' });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.58,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const scene = Math.min(3, Math.floor(self.progress * 4));
            const routeState = Math.round(self.progress * 24);
            root.setAttribute('data-sc-verify-state', `${scene}:${routeState}`);
            if (self.progress > 0.975) root.setAttribute('data-sc-verify-hold', 'true');
            else root.removeAttribute('data-sc-verify-hold');
          },
        },
      });

      const showBeat = (index: number, at: number) => {
        const previous = beats[index - 1];
        const next = beats[index];

        if (previous) {
          timeline.to(previous, {
            autoAlpha: 0,
            yPercent: -16,
            clipPath: 'inset(100% 0 0 0)',
            duration: 0.34,
            ease: 'power3.in',
          }, at);
        }

        if (next) {
          timeline.to(next, {
            autoAlpha: 1,
            yPercent: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.48,
            ease: 'expo.out',
          }, at + 0.18);
        }
      };

      timeline
        .to(path, { strokeDashoffset: 0, duration: 4 }, 0)
        .to(progressLine, { scaleX: 1, duration: 4 }, 0)
        .to(runner, {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 },
          duration: 4,
        }, 0)
        .to(geometry, { rotate: 0, scale: 1, duration: 1.05, ease: 'power2.out' }, 0)
        .to(six, { x: joinSixX - 72, y: 0, rotate: -4, duration: 0.68, ease: 'power3.inOut' }, 0.34)
        .to(seven, { x: joinSevenX + 72, y: 0, rotate: 4, duration: 0.68, ease: 'power3.inOut' }, 0.34);

      showBeat(1, 0.78);

      timeline
        .to(six, { x: joinSixX, rotate: 0, duration: 0.6, ease: 'back.out(1.35)' }, 1.08)
        .to(seven, { x: joinSevenX, rotate: 0, duration: 0.6, ease: 'back.out(1.35)' }, 1.08)
        .to(geometry, { rotate: 128, scale: 1.08, duration: 0.72, ease: 'power2.inOut' }, 1.28);

      showBeat(2, 1.78);

      timeline
        .to(geometry, { rotate: 244, scale: 0.88, duration: 0.74, ease: 'power2.inOut' }, 2.04)
        .to(six, { x: -150, y: 90, rotate: -12, duration: 0.68, ease: 'expo.inOut' }, 2.12)
        .to(seven, { x: 170, y: -72, rotate: 11, duration: 0.68, ease: 'expo.inOut' }, 2.12);

      showBeat(3, 2.74);

      timeline
        .to(geometry, { rotate: 360, scale: 0.64, xPercent: 34, yPercent: -24, duration: 1.05, ease: 'expo.inOut' }, 2.82)
        .to([six, seven], { fillOpacity: 0.08, strokeOpacity: 0.46, duration: 0.62 }, 2.96);

      root.dataset.impactReady = 'true';

      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
      let removePointer = () => {};

      if (finePointer.matches && orbit) {
        const xTo = gsap.quickTo(orbit, 'x', { duration: 0.65, ease: 'power3.out' });
        const yTo = gsap.quickTo(orbit, 'y', { duration: 0.65, ease: 'power3.out' });
        const onPointerMove = (event: PointerEvent) => {
          const rect = root.getBoundingClientRect();
          xTo(((event.clientX - rect.left) / rect.width - 0.5) * 38);
          yTo(((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 24);
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
        delete root.dataset.impactReady;
        root.removeAttribute('data-sc-verify-state');
        root.removeAttribute('data-sc-verify-hold');
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      className={styles.root}
      id="impact"
      ref={rootRef}
      data-post-hero-impact
      data-sc-act="pin"
      aria-labelledby="post-hero-impact-title"
    >
      <h2 className={styles.srOnly} id="post-hero-impact-title">
        One builder takes a chaotic brief all the way to launch
      </h2>

      <div className={styles.sticky} data-sc-stage>
        <div className={styles.meta} aria-hidden="true">
          <span>One builder. Full plot.</span>
          <span>67 energy</span>
        </div>

        <svg className={styles.route} viewBox="0 0 1600 900" role="img" aria-label="A route joining a chaotic brief to a live build">
          <path className={styles.routeGhost} d="M 70 710 C 270 710 235 180 475 180 S 685 735 900 650 S 1115 120 1535 230" />
          <path className={styles.routeLive} data-impact-path d="M 70 710 C 270 710 235 180 475 180 S 685 735 900 650 S 1115 120 1535 230" />

          <g className={styles.orbit} data-impact-orbit>
            <g className={styles.orbitGeometry} data-impact-geometry>
              <circle cx="800" cy="450" r="282" />
              <circle cx="800" cy="450" r="204" />
              <path d="M 518 450 H 1082 M 800 168 V 732" />
            </g>
            <g className={styles.digits}>
              <text data-impact-six x="800" y="600">6</text>
              <text data-impact-seven x="800" y="600">7</text>
            </g>
          </g>

          <g className={styles.nodes} aria-hidden="true">
            <circle cx="70" cy="710" r="15" />
            <circle cx="475" cy="180" r="15" />
            <circle cx="900" cy="650" r="15" />
            <circle cx="1535" cy="230" r="15" />
          </g>

          <circle className={styles.runner} data-impact-runner cx="70" cy="710" r="9" />
        </svg>

        <div className={styles.beats} aria-live="off">
          <article className={`${styles.beat} ${styles.beatStart}`} data-impact-beat>
            <span>Brief dropped</span>
            <h3>Bruh. That has lore.</h3>
            <p>Cool. I love a plot-heavy build.</p>
          </article>

          <article className={`${styles.beat} ${styles.beatSixtySeven}`} data-impact-beat>
            <span>The build arc</span>
            <h3><b>6</b> tabs. <b>7</b> plot twists.</h3>
            <p>67 energy. Still locked in.</p>
          </article>

          <article className={`${styles.beat} ${styles.beatShip}`} data-impact-beat>
            <span>No group-project energy</span>
            <h3>I ship the whole plot.</h3>
            <p>Front. Back. Deploy. No side quests.</p>
          </article>

          <article className={`${styles.beat} ${styles.beatLive}`} data-impact-beat>
            <span>Final episode</span>
            <h3>It&apos;s live. Fr.</h3>
            <p>The build survived the lore. So did I.</p>
          </article>
        </div>

        <footer className={styles.footer}>
          <span>Chaos in. Product out.</span>
          <i aria-hidden="true"><b data-impact-progress /></i>
          <span>Very demure. Very deployed.</span>
        </footer>
      </div>
    </section>
  );
}
