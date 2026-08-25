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

const STACK = ['Next.js', 'React', 'Node.js', 'MySQL', 'MongoDB', 'Python', 'SEO / GEO', 'AI workflows'];

const CASES = [
  {
    id: '01',
    eyebrow: 'Institutional systems',
    title: 'One ecosystem. Thousands arriving at once.',
    copy: 'College platforms and a secure semester-result portal built for real peak traffic—not a synthetic benchmark.',
    facts: ['3K concurrent users', '142K hits', '39K page views'],
    image: '/images/project-thumb-avsengg.png',
    alt: 'AVS Engineering College website',
    href: 'https://www.avsenggcollege.ac.in/',
  },
  {
    id: '02',
    eyebrow: 'Responsive institutional web',
    title: 'Access that works beyond ideal conditions.',
    copy: 'Mobile-first academic information, admissions pathways and content systems designed for clarity across devices and connection speeds.',
    facts: ['40% faster loads', '60% mobile engagement', '30% UX improvement'],
    image: '/images/project-thumb-sswc.png',
    alt: "Sakthi Kailash Women's College website",
    href: 'https://www.sakthikailashcollege.org/',
  },
  {
    id: '03',
    eyebrow: 'AI vision experiment',
    title: 'From pixels to something useful.',
    copy: 'A computer-vision workflow that turns food imagery into recognisable, structured nutritional information.',
    facts: ['Python', 'TensorFlow', 'OpenCV'],
    image: '/images/project-thumb-pixels-to-plates.png',
    alt: 'Pixels to Plates computer vision project',
    href: 'https://pixelstoplates.streamlit.app/',
  },
];

const DISCIPLINES = [
  ['Product engineering', 'Next.js, React, Node.js and full-stack systems built to ship.'],
  ['Production & data', 'MySQL, MongoDB, validation, performance and deployment under pressure.'],
  ['Search & growth', 'SEO, GEO and discovery systems across search, maps and AI surfaces.'],
  ['Visual communication', 'Interface hierarchy, campaign systems and high-trust information design.'],
];

const RECOGNITION = [
  ['1st place', 'Web Development · KSR College of Technology', '2024'],
  ['1st place', 'Code Debugging · Mahendra Institutions', '2024'],
  ['React.js', 'Infosys Springboard', '2024'],
  ['CUDA Python', 'ADVI Group · NVIDIA boards internship', '2025'],
];

const letters = (text: string) => Array.from(text).map((letter, index) => (
  <span className="v2-letter" key={`${letter}-${index}`}>{letter === ' ' ? '\u00A0' : letter}</span>
));

const revealWords = (text: string) => text.split(' ').map((word, index) => (
  <span className="v2-word" key={`${word}-${index}`}>{word}&nbsp;</span>
));

export default function PortfolioExperienceV2() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set('.v2-curtain', { display: 'none' });
      gsap.set('[data-v2-reveal], .v2-letter, .v2-portrait-inner', { clearProps: 'all' });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro
      .to('.v2-curtain-fill', { scaleX: 1, duration: 0.55, ease: 'expo.inOut' })
      .to('.v2-curtain', { yPercent: -100, duration: 0.72, ease: 'expo.inOut' })
      .from('.v2-nav', { y: -90, opacity: 0, duration: 0.7 }, '-=.35')
      .from('.v2-letter', { yPercent: 115, rotate: 2, stagger: 0.018, duration: 0.85 }, '-=.5')
      .from('.v2-portrait-shell', { clipPath: 'inset(100% 0 0)', duration: 1, ease: 'expo.inOut' }, '-=.8')
      .from('.v2-hero-copy > *', { opacity: 0, y: 24, stagger: 0.08, duration: 0.6 }, '-=.45');

    anime({
      targets: '.v2-hero-index i',
      scaleY: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(55, { start: 1100 }),
      duration: 600,
      easing: 'easeOutExpo',
    });

    gsap.to('.v2-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.15 },
    });

    gsap.timeline({
      scrollTrigger: { trigger: '.v2-hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
    })
      .to('.v2-hero-name', { yPercent: 13, opacity: 0.24, ease: 'none' }, 0)
      .to('.v2-portrait-inner', { yPercent: 12, scale: 1.04, ease: 'none' }, 0)
      .to('.v2-hero-copy', { yPercent: -18, opacity: 0, ease: 'none' }, 0);

    gsap.utils.toArray<HTMLElement>('[data-v2-reveal]').forEach((element) => {
      gsap.from(element, {
        y: 70,
        opacity: 0,
        duration: 0.95,
        ease: 'power4.out',
        scrollTrigger: { trigger: element, start: 'top 90%', once: true, fastScrollEnd: true },
      });
    });

    gsap.utils.toArray<HTMLElement>('.v2-parallax').forEach((frame) => {
      const media = frame.querySelector('img');
      if (!media) return;
      gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.75 } })
        .fromTo(media, { yPercent: -7, scale: 1.12 }, { yPercent: 7, scale: 1.03, ease: 'none' }, 0);
    });

    const route = document.querySelector<SVGPathElement>('#v2-route-path');
    const traveler = document.querySelector<SVGGElement>('#v2-route-traveler');
    if (route && traveler) {
      gsap.set(route, { drawSVG: '0%' });
      gsap.timeline({
        scrollTrigger: {
          trigger: '.v2-route-stage',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.55,
          fastScrollEnd: true,
        },
      })
        .to(route, { drawSVG: '100%', ease: 'none' }, 0)
        .to(traveler, { motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], autoRotate: true }, ease: 'none' }, 0)
        .fromTo('.v2-route-glow', { opacity: 0.15 }, { opacity: 0.9, ease: 'none' }, 0);
    }

    const stackCards = gsap.utils.toArray<HTMLElement>('.v2-stack-card');
    stackCards.forEach((card, index) => {
      if (index === stackCards.length - 1) return;
      gsap.to(card, {
        scale: 0.94 - index * 0.012,
        y: -18,
        opacity: 0.42,
        ease: 'none',
        scrollTrigger: {
          trigger: stackCards[index + 1],
          start: 'top 78%',
          end: 'top 17%',
          scrub: 0.55,
          fastScrollEnd: true,
        },
      });
    });

    gsap.to('.v2-word', {
      opacity: 1,
      stagger: 0.035,
      ease: 'none',
      scrollTrigger: { trigger: '.v2-manifesto-copy', start: 'top 76%', end: 'bottom 58%', scrub: 0.7 },
    });

    const media = gsap.matchMedia();
    media.add('(min-width: 769px)', () => {
      gsap.to('.v2-process-track', {
        xPercent: -42,
        ease: 'none',
        scrollTrigger: {
          trigger: '.v2-process',
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });
    });
    media.add('(max-width: 768px)', () => {
      gsap.set('.v2-process-track', { clearProps: 'transform' });
    });

    return () => {
      anime.remove('.v2-hero-index i');
      media.revert();
    };
  }, { scope: rootRef });

  return (
    <main ref={rootRef} className="v2-site" id="main-content">
      <a href="#main-content" className="v2-skip">Skip to content</a>
      <div className="v2-curtain" aria-hidden="true"><span className="v2-curtain-fill" /><p>FORM / FUNCTION / FEEL</p></div>
      <div className="v2-progress" aria-hidden="true" />

      <nav className="v2-nav" aria-label="Primary navigation">
        <a href="#top" className="v2-brand" aria-label="T Mohammed Arif, back to top">MA<sup>®</sup></a>
        <div className="v2-nav-links"><a href="#work">Work</a><a href="#route">Journey</a><a href="#about">About</a></div>
        <a href="mailto:mohammedarif2303@gmail.com" className="v2-nav-cta">Talk <span>↗</span></a>
      </nav>

      <section className="v2-hero" id="top">
        <div className="v2-hero-grid">
          <div className="v2-hero-name" aria-label="T Mohammed Arif">
            <span className="v2-name-top">{letters('T MOHAMMED')}</span>
            <span className="v2-name-bottom">{letters('ARIF')}</span>
          </div>

          <div className="v2-portrait-shell">
            <div className="v2-portrait-inner"><Image src="/images/profile.png" alt="T Mohammed Arif" fill priority sizes="(max-width: 768px) 82vw, 34vw" /></div>
            <div className="v2-portrait-meta"><span>SALEM, INDIA</span><span>11.6643° N</span></div>
          </div>

          <div className="v2-hero-copy">
            <p>Full-stack developer and technical product builder making complex systems feel clear, fast and human.</p>
            <a href="#work" className="v2-primary">See the work <span>↓</span></a>
          </div>
          <div className="v2-hero-index" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
        </div>
      </section>

      <div className="v2-marquee" aria-label="Technology stack">
        <div>{[...STACK, ...STACK].map((item, index) => <span key={`${item}-${index}`}>{item}<i>·</i></span>)}</div>
      </div>

      <section className="v2-evidence">
        <div className="v2-section-intro" data-v2-reveal><h2>Built under<br /><em>real pressure.</em></h2><p>Proof before polish. These systems were shaped by peak traffic, clinical teams and operational constraints.</p></div>

        <div className="v2-bento">
          <article className="v2-bento-feature v2-double-bezel" data-v2-reveal>
            <div className="v2-bento-core v2-parallax">
              <Image src="/images/project-thumb-avsengg.png" alt="AVS Engineering College website interface" fill sizes="(max-width: 768px) 100vw, 58vw" />
              <div className="v2-bento-caption"><span>Institutional ecosystem</span><strong>Web platforms that stayed standing.</strong></div>
            </div>
          </article>
          <article className="v2-bento-metrics v2-double-bezel" data-v2-reveal>
            <div className="v2-bento-core"><span>Peak event / ~30 minutes</span><strong>142K</strong><p>hits · 39K page views · 43 GB bandwidth</p><i>03K concurrent</i></div>
          </article>
          <article className="v2-bento-health v2-double-bezel" data-v2-reveal>
            <div className="v2-bento-core"><span>Valli Super Specialty Hospital</span><h3>Clinical operations meet digital clarity.</h3><p>Internal workflows, technical support, patient communication, SEO, GEO and maps readiness.</p></div>
          </article>
          <article className="v2-bento-prime v2-double-bezel" data-v2-reveal>
            <div className="v2-bento-core"><span>Hash Prime / 2026</span><div className="v2-prime-mark">H<span>P</span></div><h3>Brand, product and secure CMS.</h3></div>
          </article>
          <article className="v2-bento-automation v2-double-bezel" data-v2-reveal>
            <div className="v2-bento-core"><span>Automation</span><h3>Repetitive work, reduced.</h3><ul><li>CSV email workflows</li><li>Image text extraction</li><li>Print enhancement</li></ul></div>
          </article>
        </div>
      </section>

      <section className="v2-route-stage" id="route">
        <div className="v2-route-sticky">
          <div className="v2-route-heading"><p>Every project changed the route.</p><h2>From first build<br />to <em>real systems.</em></h2></div>
          <ScrollLottie src="/animations/signal-orbit.json" className="v2-route-lottie" />
          <svg className="v2-route-svg" viewBox="0 0 1400 760" role="img" aria-label="Animated path through key career milestones">
            <path className="v2-route-ghost" d="M 40 620 C 260 610 210 230 470 250 C 720 270 610 590 870 540 C 1100 495 1020 155 1360 120" />
            <path id="v2-route-path" className="v2-route-glow" d="M 40 620 C 260 610 210 230 470 250 C 720 270 610 590 870 540 C 1100 495 1020 155 1360 120" />
            <g id="v2-route-traveler"><circle r="13" /><circle r="4" /></g>
          </svg>
          <div className="v2-route-stop stop-a"><span>2023</span><strong>Started building</strong><p>B.Tech IT and practical web work.</p></div>
          <div className="v2-route-stop stop-b"><span>2024</span><strong>Shipped institutional platforms</strong><p>Real organisations, public traffic.</p></div>
          <div className="v2-route-stop stop-c"><span>2025</span><strong>Entered healthcare operations</strong><p>Systems where reliability is felt.</p></div>
          <div className="v2-route-stop stop-d"><span>2026</span><strong>Building end to end</strong><p>Product, brand, growth and automation.</p></div>
        </div>
      </section>

      <section className="v2-work" id="work">
        <header className="v2-work-header" data-v2-reveal><h2>Selected work</h2><p>Scroll through three systems that show the range—from infrastructure to interface.</p></header>
        <div className="v2-stack">
          {CASES.map((project, index) => (
            <article className="v2-stack-card v2-double-bezel" style={{ '--stack': index } as React.CSSProperties} key={project.id}>
              <div className="v2-stack-core">
                <div className="v2-case-media v2-parallax"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 768px) 100vw, 58vw" /></div>
                <div className="v2-case-copy">
                  <div className="v2-case-top"><span>{project.eyebrow}</span><i>{project.id} / 03</i></div>
                  <h3>{project.title}</h3><p>{project.copy}</p>
                  <div className="v2-case-facts">{project.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
                  <a href={project.href} target="_blank" rel="noreferrer" className="v2-case-link">Visit project <span>↗</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="v2-manifesto">
        <p className="v2-manifesto-copy">
          {revealWords('I build')}
          <span className="v2-inline-image v2-parallax"><Image src="/images/project-thumb-avsomalur.png" alt="AVS College Omalur website" fill sizes="12vw" /></span>
          {revealWords('systems that stay useful')}
          <span className="v2-inline-image v2-parallax"><Image src="/images/project-thumb-pixels-to-plates.png" alt="Pixels to Plates project" fill sizes="12vw" /></span>
          {revealWords('when pressure arrives.')}
        </p>
      </section>

      <section className="v2-process">
        <div className="v2-process-track">
          <div className="v2-process-lead"><span>How I work</span><h2>One builder.<br />Whole system.</h2></div>
          {DISCIPLINES.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><i>↗</i></article>)}
        </div>
      </section>

      <section className="v2-about" id="about">
        <div className="v2-about-copy" data-v2-reveal><h2>Builder by instinct.<br /><em>Operator by experience.</em></h2><p>I&apos;m a B.Tech IT student who learned in production—moving between engineering, healthcare operations, search visibility, automation and visual communication.</p></div>
        <div className="v2-about-grid">
          <div className="v2-education" data-v2-reveal><span>Currently</span><h3>B.Tech · Information Technology</h3><p>AVS Engineering College · 2023—2027</p><strong>8.55 CGPA</strong></div>
          <div className="v2-recognition">
            {RECOGNITION.map(([rank, title, year]) => <div data-v2-reveal key={title}><strong>{rank}</strong><p>{title}</p><span>{year}</span></div>)}
          </div>
        </div>
      </section>

      <section className="v2-contact">
        <p data-v2-reveal>Have a difficult system worth making better?</p>
        <div className="v2-contact-stroke"><StrokeText text="LET'S BUILD" strokeColor="#c9f39a" fillColor="#f4f1e8" strokeWidth={1.1} drawDuration={1.1} fillDelay={0.05} stagger={0.035} trigger="scroll" fillMode="wipe" fontSize={132} fontWeight={800} letterSpacing={-5} /></div>
        <a href="mailto:mohammedarif2303@gmail.com?subject=Let%27s%20build%20something" className="v2-contact-cta">Start a conversation <span>↗</span></a>
        <footer><span>© 2026 T MOHAMMED ARIF</span><div><a href="https://linkedin.com/in/mohammedarif2303" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/mohammed-arif-23" target="_blank" rel="noreferrer">GitHub</a><a href="/t-mohammed-arif.pdf" target="_blank">Résumé</a></div><a href="#top">Top ↑</a></footer>
      </section>
    </main>
  );
}
