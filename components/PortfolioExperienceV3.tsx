'use client';

import Image from 'next/image';
import { useRef } from 'react';
import anime from 'animejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
import ScrollLottie from '@/components/ScrollLottie';
import StrokeText from '@/components/ui/StrokeText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);
}

const STACK = [
  'NEXT.JS',
  'REACT',
  'NODE.JS',
  'MYSQL',
  'MONGODB',
  'PYTHON',
  'SEO / GEO',
  'AI WORKFLOWS',
];

const PROJECTS = [
  {
    number: '01',
    title: 'AVS Engineering College',
    shortTitle: 'Institutional systems that stayed standing.',
    description:
      'A public college ecosystem and secure semester-result portal engineered for real peak traffic, clear access and operational confidence.',
    image: '/images/project-thumb-avsengg.png',
    alt: 'AVS Engineering College website interface',
    href: 'https://www.avsenggcollege.ac.in/',
    facts: ['142K HITS', '3K CONCURRENT', '43 GB / 30 MIN'],
  },
  {
    number: '02',
    title: "Sakthi Kailash Women's College",
    shortTitle: 'Access that works beyond ideal conditions.',
    description:
      'A mobile-first institutional experience that makes academics, admissions and campus information easier to navigate across devices and connection speeds.',
    image: '/images/project-thumb-sswc.png',
    alt: "Sakthi Kailash Women's College website interface",
    href: 'https://www.sakthikailashcollege.org/',
    facts: ['40% FASTER LOADS', '60% MOBILE ENGAGEMENT', '30% UX LIFT'],
  },
  {
    number: '03',
    title: 'Pixels to Plates',
    shortTitle: 'From pixels to something useful.',
    description:
      'A computer-vision experiment that turns food imagery into recognisable, structured nutritional information.',
    image: '/images/project-thumb-pixels-to-plates.png',
    alt: 'Pixels to Plates computer vision project',
    href: 'https://pixelstoplates.streamlit.app/',
    facts: ['PYTHON', 'TENSORFLOW', 'OPENCV'],
  },
];

const DISCIPLINES = [
  {
    title: 'Product engineering',
    copy: 'Next.js, React, Node.js and full-stack systems built to survive the handoff from idea to production.',
  },
  {
    title: 'Production & data',
    copy: 'MySQL, MongoDB, validation, performance and deployment choices made for real operational pressure.',
  },
  {
    title: 'Search & growth',
    copy: 'SEO, GEO and discovery systems designed for search engines, maps and AI answer surfaces.',
  },
  {
    title: 'Visual communication',
    copy: 'Interface hierarchy, campaign systems and information design that help people trust what they see.',
  },
];

const RECOGNITION = [
  ['1ST PLACE', 'WEB DEVELOPMENT · KSR COLLEGE OF TECHNOLOGY', '2024'],
  ['1ST PLACE', 'CODE DEBUGGING · MAHENDRA INSTITUTIONS', '2024'],
  ['REACT.JS', 'INFOSYS SPRINGBOARD', '2024'],
  ['CUDA PYTHON', 'ADVI GROUP · NVIDIA BOARDS INTERNSHIP', '2025'],
];

const letterSpans = (text: string) =>
  Array.from(text).map((letter, index) => (
    <span className="v3-letter" key={`${letter}-${index}`}>
      {letter === ' ' ? '\u00A0' : letter}
    </span>
  ));

const wordSpans = (text: string) =>
  text.split(' ').map((word, index) => (
    <span className="v3-word" key={`${word}-${index}`}>
      {word}&nbsp;
    </span>
  ));

export default function PortfolioExperienceV3() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        gsap.set('.v3-curtain', { display: 'none' });
        gsap.set('.v3-letter, [data-v3-reveal], .v3-word, .v3-route-stop', {
          clearProps: 'all',
          opacity: 1,
          visibility: 'visible',
        });
        return;
      }

      const loaderNumber = root.querySelector<HTMLElement>('.v3-loader-count b');
      const loaderState = { value: 0 };
      const loaderAnimation = anime({
        targets: loaderState,
        value: 100,
        round: 1,
        duration: 980,
        easing: 'easeInOutQuart',
        update: () => {
          if (loaderNumber) loaderNumber.textContent = String(Math.round(loaderState.value));
        },
      });

      anime({
        targets: '.v3-intro-line',
        scaleX: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(70, { start: 120 }),
        duration: 720,
        easing: 'easeOutExpo',
      });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .to('.v3-curtain-panel', {
          yPercent: -102,
          duration: 0.95,
          stagger: 0.075,
          ease: 'expo.inOut',
          delay: 0.96,
        })
        .set('.v3-curtain', { display: 'none' })
        .from('.v3-nav', { y: -64, opacity: 0, duration: 0.7 }, '-=.45')
        .from(
          '.v3-letter',
          { yPercent: 118, rotate: 2, stagger: 0.016, duration: 0.88, ease: 'expo.out' },
          '-=.52',
        )
        .from(
          '.v3-portrait-frame',
          { clipPath: 'inset(100% 0 0 0)', duration: 1.05, ease: 'expo.inOut' },
          '-=.84',
        )
        .from(
          '.v3-hero-copy > *, .v3-hero-kicker > *',
          { y: 22, opacity: 0, stagger: 0.07, duration: 0.62 },
          '-=.48',
        );

      gsap.to('.v3-scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.12,
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.v3-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        })
        .to('.v3-hero-title', { yPercent: 9, opacity: 0.22, ease: 'none' }, 0)
        .to('.v3-portrait-image', { yPercent: 11, scale: 1.045, ease: 'none' }, 0)
        .to('.v3-hero-copy', { yPercent: -20, opacity: 0, ease: 'none' }, 0)
        .to('.v3-hero-accent', { scaleY: 0.72, ease: 'none' }, 0);

      ScrollTrigger.batch('[data-v3-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 64, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power4.out', overwrite: true },
          ),
      });

      gsap.utils.toArray<HTMLElement>('[data-v3-count]').forEach((element) => {
        const target = Number(element.dataset.v3Count ?? 0);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power3.out',
          snap: { value: 1 },
          onUpdate: () => {
            element.textContent = Math.round(counter.value).toString();
          },
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.v3-parallax').forEach((frame) => {
        const image = frame.querySelector('img');
        if (!image) return;
        gsap.fromTo(
          image,
          { yPercent: -7, scale: 1.11 },
          {
            yPercent: 7,
            scale: 1.035,
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65,
            },
          },
        );
      });

      const routePath = document.querySelector<SVGPathElement>('#v3-route-path');
      const routeTraveler = document.querySelector<SVGGElement>('#v3-route-traveler');
      const routeStops = gsap.utils.toArray<HTMLElement>('.v3-route-stop');

      if (routePath && routeTraveler) {
        gsap.set(routePath, { drawSVG: '0%' });
        gsap.set(routeStops, { autoAlpha: 0, y: 24 });

        const routeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.v3-route-stage',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.55,
            fastScrollEnd: true,
          },
        });

        routeTimeline
          .to(routePath, { drawSVG: '100%', ease: 'none', duration: 1 }, 0)
          .to(
            routeTraveler,
            {
              motionPath: {
                path: routePath,
                align: routePath,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              duration: 1,
              ease: 'none',
            },
            0,
          )
          .to(routeStops[0], { autoAlpha: 1, y: 0, duration: 0.1 }, 0.05)
          .to(routeStops[1], { autoAlpha: 1, y: 0, duration: 0.1 }, 0.29)
          .to(routeStops[2], { autoAlpha: 1, y: 0, duration: 0.1 }, 0.54)
          .to(routeStops[3], { autoAlpha: 1, y: 0, duration: 0.1 }, 0.78)
          .fromTo('.v3-route-orbit', { opacity: 0.15, rotate: -14 }, { opacity: 0.82, rotate: 10, duration: 1 }, 0);
      }

      gsap.utils.toArray<HTMLElement>('.v3-project').forEach((project, index, projects) => {
        const frame = project.querySelector('[data-project-frame]');
        if (frame) {
          gsap.fromTo(
            frame,
            { scale: 0.84, opacity: 0.28 },
            {
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: project,
                start: 'top 92%',
                end: 'top 36%',
                scrub: 0.55,
              },
            },
          );
        }

        if (index < projects.length - 1) {
          gsap.to(project, {
            scale: 0.94 - index * 0.008,
            opacity: 0.24,
            ease: 'none',
            scrollTrigger: {
              trigger: projects[index + 1],
              start: 'top 78%',
              end: 'top 18%',
              scrub: 0.55,
              fastScrollEnd: true,
            },
          });
        }
      });

      gsap.to('.v3-word', {
        opacity: 1,
        stagger: 0.045,
        ease: 'none',
        scrollTrigger: {
          trigger: '.v3-manifesto-copy',
          start: 'top 78%',
          end: 'bottom 52%',
          scrub: 0.65,
        },
      });

      const media = gsap.matchMedia();
      media.add('(min-width: 769px)', () => {
        gsap.fromTo(
          '.v3-work-title',
          { yPercent: 12 },
          {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: '.v3-work',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65,
            },
          },
        );
      });

      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);

      return () => {
        loaderAnimation.pause();
        anime.remove(loaderState);
        anime.remove('.v3-intro-line');
        media.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <main ref={rootRef} className="v3-site" id="main-content">
      <a className="v3-skip" href="#main-content">
        Skip to content
      </a>

      <div className="v3-curtain" aria-hidden="true">
        <div className="v3-curtain-panel v3-curtain-panel-a">
          <span className="v3-loader-count"><b>0</b><sup>%</sup></span>
        </div>
        <div className="v3-curtain-panel v3-curtain-panel-b">
          <div className="v3-intro-lines">
            {Array.from({ length: 7 }, (_, index) => (
              <i className="v3-intro-line" key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="v3-scroll-progress" aria-hidden="true" />

      <nav className="v3-nav" aria-label="Primary navigation">
        <a className="v3-brand" href="#top" aria-label="T Mohammed Arif, back to top">
          TMA
        </a>
        <div className="v3-nav-rule" aria-hidden="true" />
        <div className="v3-nav-links">
          <a href="#work">Work</a>
          <a href="#journey">Journey</a>
          <a href="#about">About</a>
        </div>
        <a className="v3-nav-contact" href="mailto:mohammedarif2303@gmail.com">
          Let&apos;s talk <span>↗</span>
        </a>
      </nav>

      <section className="v3-hero" id="top">
        <div className="v3-hero-kicker">
          <span>Full-stack developer</span>
          <span>Technical product builder</span>
        </div>

        <h1 className="v3-hero-title max-w-[1500px]" aria-label="T Mohammed Arif">
          <span>{letterSpans('T MOHAMMED')}</span>
          <span>{letterSpans('ARIF')}</span>
        </h1>

        <div className="v3-portrait-frame">
          <div className="v3-hero-accent" aria-hidden="true" />
          <div className="v3-portrait-image">
            <Image
              src="/images/profile.png"
              alt="T Mohammed Arif"
              fill
              priority
              sizes="(max-width: 768px) 58vw, 32vw"
            />
          </div>
          <div className="v3-portrait-coordinate">
            <span>SALEM, INDIA</span>
            <span>11.6643° N</span>
          </div>
        </div>

        <div className="v3-hero-copy">
          <p>I build systems that hold up—clear interfaces, reliable engineering and useful automation.</p>
          <a className="v3-hero-cta" href="#work">
            <span aria-hidden="true">↘</span>
            <b>See selected work</b>
          </a>
        </div>

        <div className="v3-hero-index" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
      </section>

      <div className="v3-marquee" aria-label="Technology stack">
        <div>
          {[...STACK, ...STACK].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}<i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <section className="v3-proof">
        <header className="v3-proof-heading" data-v3-reveal>
          <h2>
            Built under real <em>pressure.</em>
          </h2>
          <p>Not synthetic benchmarks. Real people arriving at once, real teams depending on the outcome.</p>
        </header>

        <div className="v3-proof-grid">
          <article className="v3-proof-media v3-parallax" data-v3-reveal>
            <Image
              src="/images/project-thumb-avsengg.png"
              alt="AVS Engineering College production website"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            <div>
              <strong>Production is where design earns trust.</strong>
              <span>AVS institutional ecosystem</span>
            </div>
          </article>

          <article className="v3-proof-stat v3-proof-stat-a" data-v3-reveal>
            <span className="v3-stat-number"><b data-v3-count="142">0</b><sup>K</sup></span>
            <p>Hits during a peak result event</p>
          </article>
          <article className="v3-proof-stat v3-proof-stat-b" data-v3-reveal>
            <span className="v3-stat-number"><b data-v3-count="39">0</b><sup>K</sup></span>
            <p>Page views in roughly thirty minutes</p>
          </article>
          <article className="v3-proof-stat v3-proof-stat-c" data-v3-reveal>
            <span className="v3-stat-number"><b data-v3-count="3">0</b><sup>K</sup></span>
            <p>Concurrent users served</p>
          </article>
        </div>
      </section>

      <section className="v3-route-stage" id="journey">
        <div className="v3-route-sticky">
          <header className="v3-route-heading">
            <h2>
              Every build
              <br />
              changed the <em>route.</em>
            </h2>
            <p>Scroll to trace the work from first build to whole-system ownership.</p>
          </header>

          <ScrollLottie src="/animations/signal-orbit.json" className="v3-route-orbit" />

          <svg className="v3-route-svg" viewBox="0 0 1440 720" role="img" aria-label="Career path from 2023 to 2026">
            <path
              className="v3-route-ghost"
              d="M 70 625 C 225 540 285 650 395 520 C 530 360 625 500 755 390 C 875 288 942 360 1065 245 C 1180 137 1275 217 1385 82"
            />
            <path
              id="v3-route-path"
              className="v3-route-path"
              d="M 70 625 C 225 540 285 650 395 520 C 530 360 625 500 755 390 C 875 288 942 360 1065 245 C 1180 137 1275 217 1385 82"
            />
            <g id="v3-route-traveler">
              <circle className="v3-traveler-ring" r="16" />
              <circle className="v3-traveler-core" r="6" />
            </g>
          </svg>

          <article className="v3-route-stop v3-stop-a">
            <span>2023</span>
            <strong>Started building</strong>
            <p>B.Tech IT and practical web work.</p>
          </article>
          <article className="v3-route-stop v3-stop-b">
            <span>2024</span>
            <strong>Shipped institutional platforms</strong>
            <p>Real organisations and public traffic.</p>
          </article>
          <article className="v3-route-stop v3-stop-c">
            <span>2025</span>
            <strong>Entered healthcare operations</strong>
            <p>Systems where reliability is felt.</p>
          </article>
          <article className="v3-route-stop v3-stop-d">
            <span>2026</span>
            <strong>Building end to end</strong>
            <p>Product, brand, growth and automation.</p>
          </article>
        </div>
      </section>

      <section className="v3-work" id="work">
        <header className="v3-work-heading">
          <h2 className="v3-work-title">
            Selected
            <br />
            <em>work.</em>
          </h2>
          <p>Three systems. Different constraints. The same standard: make it useful, legible and resilient.</p>
        </header>

        <div className="v3-project-stack">
          {PROJECTS.map((project, index) => (
            <article
              className="v3-project"
              style={{ '--project-index': index } as React.CSSProperties}
              key={project.number}
            >
              <div className="v3-project-frame" data-project-frame>
                <a className="v3-project-media" href={project.href} target="_blank" rel="noreferrer">
                  <Image
                    className="v3-project-image"
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 64vw"
                  />
                </a>
                <span className="v3-project-number" aria-hidden="true">{project.number}</span>
              </div>

              <div className="v3-project-copy">
                <div>
                  <span>{project.title}</span>
                  <h3>{project.shortTitle}</h3>
                </div>
                <p>{project.description}</p>
                <div className="v3-project-facts">
                  {project.facts.map((fact) => <span key={fact}>{fact}</span>)}
                </div>
                <a className="v3-project-link" href={project.href} target="_blank" rel="noreferrer">
                  Visit project <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="v3-manifesto">
        <p className="v3-manifesto-copy">
          {wordSpans('I build')}
          <span className="v3-inline-image v3-parallax">
            <Image src="/images/project-thumb-avsomalur.png" alt="AVS College Omalur website" fill sizes="14vw" />
          </span>
          {wordSpans('systems that stay useful')}
          <span className="v3-inline-image v3-parallax">
            <Image src="/images/project-thumb-pixels-to-plates.png" alt="Pixels to Plates project" fill sizes="14vw" />
          </span>
          {wordSpans('when pressure arrives.')}
        </p>
      </section>

      <section className="v3-disciplines">
        <header data-v3-reveal>
          <span>Whole-system ownership</span>
          <h2>One builder.<br /><em>Four modes.</em></h2>
        </header>

        <div className="v3-accordion" data-v3-reveal>
          {DISCIPLINES.map((discipline, index) => (
            <article tabIndex={0} key={discipline.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{discipline.title}</h3>
              <p>{discipline.copy}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <div className="v3-recognition-rail" aria-label="Recognition and certifications">
        <div>
          {[...RECOGNITION, ...RECOGNITION].map(([rank, title, year], index) => (
            <span key={`${title}-${index}`} aria-hidden={index >= RECOGNITION.length ? true : undefined}>
              <strong>{rank}</strong>
              <b>{title}</b>
              <i>{year}</i>
            </span>
          ))}
        </div>
      </div>

      <section className="v3-about" id="about">
        <header data-v3-reveal>
          <h2>
            Builder by instinct.
            <br />
            Operator by <em>experience.</em>
          </h2>
        </header>

        <div className="v3-about-layout">
          <div className="v3-about-note" data-v3-reveal>
            <p>I learned in production—moving between engineering, healthcare operations, search visibility, automation and visual communication.</p>
            <span>— T Mohammed Arif</span>
          </div>

          <article className="v3-education" data-v3-reveal>
            <span>Currently</span>
            <h3>B.Tech<br />Information Technology</h3>
            <p>AVS Engineering College · 2023—2027</p>
            <strong>8.55 CGPA</strong>
          </article>

          <div className="v3-recognition-list">
            {RECOGNITION.map(([rank, title, year]) => (
              <article data-v3-reveal tabIndex={0} key={title}>
                <span>{rank}</span>
                <p>{title}</p>
                <i>{year}</i>
                <b aria-hidden="true">+</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-contact">
        <p data-v3-reveal>Have a difficult system worth making clearer, faster and more useful?</p>

        <div className="v3-contact-stroke">
          <StrokeText
            text="LET'S BUILD"
            strokeColor="#c7d52b"
            fillColor="#f3efe6"
            strokeWidth={1.05}
            drawDuration={1.05}
            fillDelay={0.02}
            stagger={0.028}
            trigger="scroll"
            fillMode="wipe"
            fontSize={150}
            fontWeight={900}
            letterSpacing={-7}
          />
        </div>

        <a
          className="v3-contact-cta"
          href="mailto:mohammedarif2303@gmail.com?subject=Let%27s%20build%20something"
        >
          <span aria-hidden="true">→</span>
          Start a conversation
        </a>

        <footer>
          <span>T MOHAMMED ARIF · 2026</span>
          <div>
            <a href="https://linkedin.com/in/mohammedarif2303" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/mohammed-arif-23" target="_blank" rel="noreferrer">GitHub</a>
            <a href="/t-mohammed-arif.pdf" target="_blank">Résumé</a>
          </div>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>
    </main>
  );
}
