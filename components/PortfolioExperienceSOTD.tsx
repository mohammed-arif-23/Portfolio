'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import anime from 'animejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import HashPrimeLaunchTheatre from '@/components/portfolio/HashPrimeLaunchTheatre';
import { InteractionLayer } from '@/components/portfolio/InteractionLayer';
import CapabilityFlowStack from '@/components/portfolio/CapabilityFlowStack';
import OperatingChapters from '@/components/portfolio/OperatingChapters';
import PostHeroImpact from '@/components/portfolio/PostHeroImpact';
import AboutMotionSystem from '@/components/portfolio/AboutMotionSystem';
import TrafficProofExperience from '@/components/portfolio/TrafficProofExperience';
import ScrollLottie from '@/components/ScrollLottie';
import { portfolioContent } from '@/lib/portfolio-content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
}

const CAPABILITY_LEDGER = [
  'Next.js',
  'React',
  'Node.js',
  'PHP',
  'MySQL',
  'MongoDB',
  'AJAX',
  'Python automation',
  'SEO / GEO',
  'Domain / SSL',
];

const HASH_OWNERSHIP = [
  ['Brand', 'A visual language that does not lose the plot on smaller screens.'],
  ['Build', 'The landing experience and frontend, actually wired up.'],
  ['CMS', 'Content flows that keep the team out of update chaos.'],
  ['Deploy', 'Domain, SSL, hosting, launch. The boring-important bits too.'],
] as const;

const OPERATING_STRENGTHS = [
  ['Own the messy bit', 'Turn academic, healthcare, and event briefs into systems people can actually use.'],
  ['Talk across rooms', 'Keep technical, medical, admin, and design people on the same page—rare flex.'],
  ['Make it make sense', 'Join responsive frontend, data, discovery, and hierarchy before the handoff gets weird.'],
  ['Use AI, still review', 'Move faster with structured AI workflows, then check the final work with human eyes.'],
] as const;

const HEALTH_STAGES = [
  ['Find it', 'Patient-facing info that gets to the point instead of sending people in circles.'],
  ['Get found', 'SEO, GEO / AI-search visibility, plus Google Business Profile readiness.'],
  ['Keep it live', 'Secure data workflows, fast troubleshooting, and team support when stuff gets real.'],
] as const;

function splitLetters(text: string, className: string) {
  return Array.from(text).map((letter, index) => (
    <span className={className} key={`${letter}-${index}`}>
      {letter === ' ' ? '\u00a0' : letter}
    </span>
  ));
}

function KineticLine({ children }: { children: ReactNode }) {
  return (
    <span className="sotd-kinetic-line">
      <span className="sotd-kinetic-line__inner" data-sc-cue>{children}</span>{' '}
    </span>
  );
}

function ScrubCopy({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const words = children.trim().split(/\s+/);

  return (
    <p className={`${className ?? ''} sotd-reading`} data-sotd-reading data-sc-cue aria-label={children}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="sotd-reading__word" aria-hidden="true">{word}</span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </p>
  );
}

function PortfolioLoader() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const countRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let disposed = false;
    const progress = { value: 0 };
    const updateDisplay = () => {
      const value = Math.round(progress.value);
      if (countRef.current) countRef.current.textContent = String(value);
      if (statusRef.current) statusRef.current.textContent = value < 96 ? 'Loading' : 'Ready';
      if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`;
    };

    const countAnimation = anime({
      targets: progress,
      value: 95,
      round: 1,
      duration: 1650,
      easing: 'easeInOutQuart',
      update: updateDisplay,
    });

    const heroImage = new window.Image();
    heroImage.src = '/images/arif-transparent.webp';
    const imageReady = heroImage.decode?.().catch(() => undefined) ?? Promise.resolve();
    const fontsReady = document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve();
    const minimumDisplay = new Promise<void>((resolve) => window.setTimeout(resolve, 1650));
    const maximumDisplay = new Promise<void>((resolve) => window.setTimeout(resolve, 2200));

    Promise.race([Promise.all([imageReady, fontsReady, minimumDisplay]), maximumDisplay]).then(() => {
      if (disposed) return;
      countAnimation.pause();
      anime({
        targets: progress,
        value: 100,
        round: 1,
        duration: 320,
        easing: 'easeInOutExpo',
        update: updateDisplay,
        complete: () => {
          if (disposed) return;
          setClosing(true);
          window.setTimeout(() => {
            if (!disposed) {
              setVisible(false);
              document.documentElement.classList.add('sc-ready');
              window.dispatchEvent(new Event('portfolio:loader-complete'));
            }
          }, 1320);
        },
      });
    });

    return () => {
      disposed = true;
      countAnimation.pause();
      anime.remove(progress);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`sotd-loader${closing ? ' sotd-loader--closing' : ''}`} role="status" aria-label="Loading portfolio">
      <span className="sotd-sr-only">Loading portfolio</span>
      <div className="sotd-loader__accent-curtain" aria-hidden="true" />
      <div className="sotd-loader__paper">
        <span className="sotd-loader__mark" aria-hidden="true">ARIF</span>
        <div className="sotd-loader__count" aria-hidden="true">
          <b ref={countRef}>0</b>
          <i>%</i>
        </div>
        <div className="sotd-loader__transmission">
          <strong ref={statusRef} aria-hidden="true">Loading</strong>
          <span className="sotd-loader__meter" aria-hidden="true"><i ref={barRef} /></span>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioExperienceSOTD() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeHealthStage, setActiveHealthStage] = useState(0);
  const {
    contact,
    institutionalProject,
    institutionalScreens,
    proofMetrics,
    valliExperience,
    hashPrimeProject,
    skills,
    education,
    awardsAndCredentials,
  } = portfolioContent;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-sotd-reveal]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    const show = (element: HTMLElement) => {
      element.dataset.sotdRevealState = 'shown';
    };

    if (reducedMotion || saveData || !('IntersectionObserver' in window)) {
      revealTargets.forEach(show);
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.06,
    });

    revealTargets.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.94 && bounds.bottom > 0) show(element);
      else observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const hashSlides = useMemo(
    () => [
      {
        src: '/images/case-hashprime-home.jpg',
        alt: 'Hash Prime public homepage',
        label: 'Homepage system',
        caption: 'The public front door: brand hierarchy, clear paths, and responsive structure.',
        href: 'https://www.hashprime.in/',
      },
      {
        src: '/images/case-hashprime-business.jpg',
        alt: 'Hash Prime multi-business public website page',
        label: 'Public business experience',
        caption: 'Verified live capture of the responsive multi-business experience.',
        href: 'https://www.hashprime.in/hash-prime-groups',
      },
      {
        src: '/images/case-hashprime-features.jpg',
        alt: 'Hash Prime public features page',
        label: 'Public feature system',
        caption: 'Verified live capture showing the project feature hierarchy.',
        href: 'https://www.hashprime.in/features',
      },
      {
        src: '/images/case-hashprime-portal.jpg',
        alt: 'Hash Prime public portal page',
        label: 'Portal experience',
        caption: 'A live public page from the same system, shaped to keep the route clear.',
        href: 'https://www.hashprime.in/',
      },
    ],
    [],
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
      if (reducedMotion) {
        gsap.set('.sotd-hero__letter, .sotd-contact__email-char', {
          opacity: 1,
          visibility: 'visible',
          transform: 'none',
        });
        return undefined;
      }

      if (saveData) {
        gsap.set('.sotd-kinetic-line__inner', {
          opacity: 1,
          visibility: 'visible',
          transform: 'none',
        });
        return undefined;
      }

      root.dataset.readingMotion = 'ready';

      if (coarsePointer) {
        const mobileHeadings = gsap.utils.toArray<HTMLElement>('[data-sotd-kinetic]');
        gsap.utils.toArray<HTMLElement>('[data-sotd-reading]', root).forEach((block) => {
          const words = block.querySelectorAll<HTMLElement>('.sotd-reading__word');
          gsap.set(words, { y: 9, autoAlpha: 0.14 });
          gsap.to(words, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.035,
            ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 88%', once: true },
          });
        });

        mobileHeadings.forEach((heading) => {
          const lines = heading.querySelectorAll<HTMLElement>('.sotd-kinetic-line__inner');
          gsap.set(lines, { yPercent: 108, rotate: 1.25 });
          gsap.to(lines, {
            yPercent: 0,
            rotate: 0,
            stagger: 0.085,
            duration: 0.78,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 92%',
              once: true,
            },
          });
        });

        const mobileIntro = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true })
          .from('.sotd-hero__letter', { yPercent: 112, rotate: 1.5, stagger: 0.018, duration: 0.76 })
          .from('.sotd-hero__portrait-shell', { yPercent: 12, scale: 0.94, autoAlpha: 0, duration: 0.82 }, '-=.56')
          .from('.sotd-hero__intro > *, .sotd-hero__actions > *', {
            y: 18,
            autoAlpha: 0,
            stagger: 0.055,
            duration: 0.54,
          }, '-=.48');
        const playMobileIntro = () => mobileIntro.play(0);
        window.addEventListener('portfolio:loader-complete', playMobileIntro, { once: true });
        if (document.documentElement.classList.contains('sc-ready')) playMobileIntro();

        gsap.timeline({
          scrollTrigger: {
            trigger: '.sotd-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.72,
          },
        })
          .to('.sotd-hero__portrait-shell', { yPercent: 8, scale: 0.97, ease: 'none' }, 0)
          .to('.sotd-hero__intro', { yPercent: -12, autoAlpha: 0.28, ease: 'none' }, 0)
          .to('.sotd-hero__registration', { scale: 0.95, autoAlpha: 0.35, ease: 'none' }, 0);

        const mobileLedger = gsap.to('.sotd-ledger__track', {
          xPercent: -50,
          duration: 34,
          repeat: -1,
          ease: 'none',
          paused: true,
        });
        ScrollTrigger.create({
          trigger: '.sotd-ledger',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => mobileLedger.play(),
          onEnterBack: () => mobileLedger.play(),
          onLeave: () => mobileLedger.pause(),
          onLeaveBack: () => mobileLedger.pause(),
        });

        gsap.from('.sotd-contact__email-char', {
          yPercent: 105,
          rotate: 1.5,
          stagger: 0.011,
          duration: 0.72,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.sotd-contact', start: 'top 84%', once: true },
        });
        return () => {
          window.removeEventListener('portfolio:loader-complete', playMobileIntro);
          mobileIntro.kill();
          delete root.dataset.readingMotion;
        };
      }

      const kineticHeadings = gsap.utils.toArray<HTMLElement>('[data-sotd-kinetic]');
      kineticHeadings.forEach((heading) => {
        ScrollTrigger.create({
          trigger: heading,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            const lines = heading.querySelectorAll<HTMLElement>('.sotd-kinetic-line__inner');
            const scene = heading.closest<HTMLElement>('section[id]')?.id ?? '';

            if (!lines.length) {
              anime({
                targets: heading,
                translateY: [24, 0],
                skewY: [2, 0],
                scaleX: [0.96, 1],
                opacity: [0, 1],
                duration: 900,
                easing: 'easeOutExpo',
              });
              return;
            }

            lines.forEach((line, index) => {
              const direction = index % 2 === 0 ? -1 : 1;
              const motion = {
                translateX: ['0%', '0%'],
                translateY: ['112%', '0%'],
                skewX: [0, 0],
                skewY: [5, 0],
                rotateZ: [direction * 1.2, 0],
                scaleX: [0.96, 1],
              };

              if (scene === 'work') {
                motion.translateX = [`${direction * 18}%`, '0%'];
                motion.translateY = ['42%', '0%'];
                motion.skewX = [direction * 7, 0];
                motion.skewY = [0, 0];
              } else if (scene === 'proof') {
                motion.translateY = ['128%', '0%'];
                motion.scaleX = [0.76, 1];
                motion.rotateZ = [direction * 2.4, 0];
              } else if (scene === 'health') {
                motion.translateX = ['-13%', '0%'];
                motion.translateY = ['0%', '0%'];
                motion.skewX = [-10, 0];
                motion.skewY = [0, 0];
              } else if (scene === 'hash') {
                motion.translateX = [`${direction * 24}%`, '0%'];
                motion.translateY = ['0%', '0%'];
                motion.scaleX = [0.7, 1];
                motion.skewY = [0, 0];
              } else if (scene === 'capabilities') {
                motion.translateY = ['136%', '0%'];
                motion.rotateZ = [direction * 3.2, 0];
                motion.scaleX = [0.86, 1];
              } else if (scene === 'about') {
                motion.translateX = [`${direction * 12}%`, '0%'];
                motion.translateY = ['84%', '0%'];
                motion.skewY = [direction * 6, 0];
              } else if (scene === 'contact') {
                motion.translateX = [`${direction * 16}%`, '0%'];
                motion.translateY = ['118%', '0%'];
                motion.skewY = [direction * 8, 0];
              }

              anime({
                targets: line,
                ...motion,
                delay: index * (scene === 'about' ? 118 : 86),
                duration: scene === 'proof' ? 1120 : 980,
                easing: scene === 'health' ? 'easeOutQuint' : 'easeOutExpo',
              });
            });
          },
        });
      });

      const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true });
      intro
        .from('.sotd-hero__letter', { yPercent: 112, rotate: 1.8, stagger: 0.014, duration: 0.9 })
        .from('.sotd-hero__registration i', { scale: 0, rotate: 135, stagger: 0.055, duration: 0.6 }, '-=.82')
        .from('.sotd-hero__field', { scale: 0.72, rotate: -20, autoAlpha: 0, duration: 1.05 }, '-=.76')
        .from('.sotd-hero__portrait-field', { scaleX: 0, transformOrigin: 'right center', duration: 0.8 }, '-=.72')
        .from('.sotd-hero__portrait-shell', { clipPath: 'inset(100% 0 0 0)', duration: 1.05, ease: 'expo.inOut' }, '-=.86')
        .from('.sotd-hero__intro > *, .sotd-hero__actions > *', { y: 24, autoAlpha: 0, stagger: 0.07, duration: 0.62 }, '-=.48')
        .fromTo('#sotd-hero-route', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.15, ease: 'power2.inOut' }, '-=.7');
      const playIntro = () => intro.play(0);
      window.addEventListener('portfolio:loader-complete', playIntro, { once: true });
      if (document.documentElement.classList.contains('sc-ready')) playIntro();

      const ledgerLoop = gsap.to('.sotd-ledger__track', {
        xPercent: -50,
        duration: 30,
        repeat: -1,
        ease: 'none',
        paused: true,
      });

      ScrollTrigger.create({
        trigger: '.sotd-ledger',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => ledgerLoop.play(),
        onEnterBack: () => ledgerLoop.play(),
        onLeave: () => ledgerLoop.pause(),
        onLeaveBack: () => ledgerLoop.pause(),
      });

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocityBoost = gsap.utils.clamp(0.85, 3.4, Math.abs(self.getVelocity()) / 850 + 0.85);
          ledgerLoop.timeScale(velocityBoost);
          gsap.to(ledgerLoop, { timeScale: 1, duration: 0.8, ease: 'power3.out', overwrite: true });
        },
      });

      const openingBridge = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.sotd-opening-sequence',
          start: 'top top',
          endTrigger: '[data-post-hero-impact]',
          end: 'top top',
          scrub: 0.62,
          invalidateOnRefresh: true,
        },
      });

      openingBridge
        .addLabel('hero-hold', 0)
        .to('.sotd-hero__name', { yPercent: 14, autoAlpha: 0.11, duration: 1 }, 'hero-hold')
        .to('.sotd-hero__name > span:first-child', { xPercent: -16, duration: 1 }, 'hero-hold')
        .to('.sotd-hero__portrait-shell', {
          xPercent: -32,
          yPercent: 22,
          scale: 0.78,
          rotate: -3.4,
          autoAlpha: 0,
          duration: 0.78,
        }, 'hero-hold+=0.08')
        .to('.sotd-hero__portrait', { yPercent: 8, scale: 1.06, rotate: 0.8, duration: 0.78 }, 'hero-hold+=0.08')
        .to('.sotd-hero__registration', { yPercent: -13, scale: 0.9, autoAlpha: 0, duration: 0.72 }, 'hero-hold+=0.04')
        .to('.sotd-hero__field', { xPercent: 25, yPercent: -17, scale: 1.26, rotate: 28, autoAlpha: 0, duration: 0.72 }, 'hero-hold+=0.04')
        .to('.sotd-hero__intro', { yPercent: -24, autoAlpha: 0, duration: 0.54 }, 'hero-hold')
        .to('.sotd-hero__actions', { yPercent: 45, autoAlpha: 0, duration: 0.5 }, 'hero-hold+=0.14')
        .to('.sotd-hero__route', { scaleX: 0.58, autoAlpha: 0, transformOrigin: 'right center', duration: 0.74 }, 'hero-hold+=0.12')
        .addLabel('handoff', 0.31)
        .fromTo(
          '[data-impact-stage]',
          { scale: 0.92, yPercent: 9, rotate: 0.45, transformOrigin: 'center top' },
          { scale: 1, yPercent: 0, rotate: 0, duration: 0.69, immediateRender: false },
          'handoff',
        );

      const heroPath = root.querySelector<SVGPathElement>('#sotd-hero-route');
      const heroRunner = root.querySelector<SVGCircleElement>('.sotd-hero__route-runner');
      if (heroPath && heroRunner) {
        gsap.to(heroRunner, {
          motionPath: { path: heroPath, align: heroPath, alignOrigin: [0.5, 0.5] },
          ease: 'none',
          scrollTrigger: { trigger: '.sotd-hero', start: 'top top', end: 'bottom top', scrub: 0.4 },
        });
      }

      gsap.utils.toArray<HTMLElement>('[data-sotd-reading]', root).forEach((block) => {
        const words = block.querySelectorAll<HTMLElement>('.sotd-reading__word');
        gsap.set(words, { y: 10, autoAlpha: 0.14 });
        gsap.to(words, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.075,
          duration: 0.42,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top 84%',
            end: 'bottom 48%',
            scrub: 0.35,
          },
        });
      });

      const media = gsap.matchMedia();
      media.add('(min-width: 981px)', () => {
        gsap.utils.toArray<HTMLElement>('.sotd-work-slice').forEach((slice, index) => {
          const mediaFrame = slice.querySelector('.sotd-work-slice__media');
          const copy = slice.querySelector('.sotd-work-slice__copy');
          gsap.fromTo(
            mediaFrame,
            { scale: 0.92, clipPath: 'inset(12% 8% 12% 8%)', rotate: index % 2 === 0 ? -0.8 : 0.8 },
            {
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              rotate: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: slice,
                start: 'top 92%',
                end: 'top 26%',
                scrub: 0.55,
              },
            },
          );

          if (copy) {
            gsap.fromTo(copy, {
              xPercent: index % 2 === 0 ? 13 : -13,
              yPercent: 8,
            }, {
              xPercent: 0,
              yPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: slice,
                start: 'top 86%',
                end: 'top 35%',
                scrub: 0.48,
              },
            });
          }

        });

        const hashCarousel = root.querySelector<HTMLElement>('.sotd-hash__carousel');
        if (hashCarousel) {
          gsap.fromTo(hashCarousel, {
            scale: 0.96,
            clipPath: 'inset(8% 5% 8% 5%)',
          }, {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: hashCarousel,
              start: 'top 90%',
              end: 'top 35%',
              scrub: 0.5,
            },
          });
        }
      });

      media.add('(max-width: 980px)', () => {
        gsap.utils.toArray<HTMLElement>('.sotd-work-slice').forEach((slice) => {
          gsap.fromTo(
            slice.querySelector('.sotd-work-slice__media'),
            { scale: 0.95, y: 32 },
            {
              scale: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: slice,
                start: 'top 92%',
                end: 'top 58%',
                scrub: 0.35,
              },
            },
          );
        });
      });

      const workReceipt = root.querySelector<HTMLElement>('.sotd-work-receipt');
      if (workReceipt) {
        const receiptMetrics = gsap.utils.toArray<HTMLElement>('[data-receipt-metric]', workReceipt);
        const receiptLead = workReceipt.querySelector<HTMLElement>('[data-receipt-lead]');
        const receiptCopy = workReceipt.querySelector<HTMLElement>('[data-receipt-copy]');
        const receiptSweep = workReceipt.querySelector<HTMLElement>('[data-receipt-sweep]');
        const receiptMeta = [receiptLead, receiptCopy].filter((element): element is HTMLElement => Boolean(element));

        gsap.timeline({
          scrollTrigger: {
            trigger: workReceipt,
            start: 'top 94%',
            end: 'top 34%',
            scrub: 0.5,
          },
        })
          .fromTo(workReceipt, {
            clipPath: 'inset(0 0 100% 0)',
          }, {
            clipPath: 'inset(0 0 0% 0)',
            ease: 'expo.inOut',
            duration: 0.72,
          }, 0)
          .fromTo(receiptSweep, {
            scaleX: 0,
          }, {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'power3.inOut',
            duration: 0.68,
          }, 0.08)
          .fromTo(receiptMetrics, {
            yPercent: (index) => index % 2 === 0 ? 42 : -42,
            rotate: (index) => index % 2 === 0 ? -1.2 : 1.2,
          }, {
            yPercent: 0,
            rotate: 0,
            stagger: 0.08,
            ease: 'expo.out',
            duration: 0.62,
          }, 0.16)
          .fromTo(receiptMeta, {
            x: -28,
          }, {
            x: 0,
            stagger: 0.12,
            ease: 'power3.out',
            duration: 0.5,
          }, 0.2);
      }

      const healthMedia = root.querySelector<HTMLElement>('.sotd-health__media');
      const healthScanner = root.querySelector<HTMLElement>('.sotd-health__scanner');
      if (healthMedia && healthScanner) {
        gsap.fromTo(healthScanner, { y: 0 }, {
          y: () => Math.max(0, healthMedia.clientHeight - 2),
          ease: 'none',
          scrollTrigger: { trigger: healthMedia, start: 'top 88%', end: 'bottom 28%', scrub: 0.5, invalidateOnRefresh: true },
        });
      }

      gsap.fromTo('.sotd-contact__route path', { drawSVG: '0%' }, {
        drawSVG: '100%',
        ease: 'none',
        scrollTrigger: { trigger: '.sotd-contact', start: 'top 78%', end: 'top 22%', scrub: 0.4 },
      });

      gsap.fromTo('.sotd-contact__light', { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.15,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: '.sotd-contact', start: 'top 82%', once: true },
      });

      gsap.fromTo('.sotd-contact__email-char', {
        yPercent: 110,
        rotate: 2,
      }, {
        yPercent: 0,
        rotate: 0,
        stagger: 0.014,
        duration: 0.8,
        ease: 'expo.out',
        immediateRender: false,
        clearProps: 'transform',
        scrollTrigger: { trigger: '.sotd-contact', start: 'top 72%', once: true },
      });

      let active = true;
      document.fonts.ready.then(() => {
        if (active) ScrollTrigger.refresh();
      }).catch(() => undefined);

      return () => {
        active = false;
        window.removeEventListener('portfolio:loader-complete', playIntro);
        intro.kill();
        media.revert();
        anime.remove(kineticHeadings);
        delete root.dataset.readingMotion;
      };
    },
    { scope: rootRef },
  );

  return (
    <main className="sotd-site" id="main-content" ref={rootRef} tabIndex={-1}>
      <PortfolioLoader />
      <InteractionLayer />
      <a className="sotd-skip" href="#work">Skip to featured work</a>
      <PortfolioNav />

      <div className="sotd-opening-sequence">
        <section className="sotd-hero" id="top" aria-labelledby="sotd-hero-title" data-sc-act="flow">
        <div className="sotd-hero__registration" aria-hidden="true">
          <i /><i /><i /><i />
        </div>

        <div className="sotd-hero__field" aria-hidden="true">
          <svg viewBox="0 0 760 760" focusable="false">
            <circle cx="380" cy="380" r="314" />
            <circle cx="380" cy="380" r="220" />
            <path d="M 66 380 H 694 M 380 66 V 694" />
            <path d="M 145 145 L 615 615 M 615 145 L 145 615" />
            <rect x="357" y="357" width="46" height="46" />
          </svg>
          <span>BUILD<br />WITH<br />INTENT</span>
        </div>

        <div className="sotd-hero__intro">
          <span>Full-stack / no hand-offs</span>
          <p>Public systems. Healthcare ops. Product ownership. The whole stack, actually handled—fr.</p>
        </div>

        <h1 className="sotd-hero__name w-full max-w-[1560px]" id="sotd-hero-title" aria-label={contact.name}>
          <span>{splitLetters('T Mohammed', 'sotd-hero__letter')}</span>
          <span>{splitLetters('ARIF', 'sotd-hero__letter')}</span>
        </h1>

        <div className="sotd-hero__portrait-shell" data-cursor="PORTRAIT">
          <div className="sotd-hero__portrait-field" aria-hidden="true" />
          <div className="sotd-hero__portrait">
            <Image
              src="/images/arif-transparent.webp"
              alt="T Mohammed Arif"
              fill
              priority
              sizes="(max-width: 768px) 72vw, 36vw"
            />
          </div>
          <div className="sotd-hero__portrait-meta">
            <span>Salem, Tamil Nadu</span>
            <span>Open for serious builds. No cap.</span>
          </div>
        </div>

        <div className="sotd-hero__actions">
          <a className="sotd-button sotd-button--dark" href="#work" data-magnetic data-spark data-cursor="EXPLORE">
            <span>See what shipped</span> <ArrowDownRight aria-hidden="true" />
          </a>
          <a className="sotd-button sotd-button--line" href="/t-mohammed-arif.pdf" target="_blank" rel="noreferrer" data-magnetic data-spark data-cursor="OPEN">
            <span>Open résumé</span> <FileText aria-hidden="true" />
          </a>
        </div>

        <svg className="sotd-hero__route" viewBox="0 0 1440 170" aria-hidden="true">
          <path id="sotd-hero-route" d="M 25 112 H 308 C 355 112 356 53 406 53 H 670 C 713 53 724 132 775 132 H 1128 C 1180 132 1186 78 1238 78 H 1408" />
          <circle className="sotd-hero__route-runner" cx="0" cy="0" r="6" />
          <circle cx="25" cy="112" r="5" />
          <circle cx="1408" cy="78" r="8" />
        </svg>
        </section>

        <PostHeroImpact />
      </div>

      <section className="sotd-ledger" aria-label="Technical capability ledger" data-sc-act="flow">
        <p className="sotd-sr-only">Capabilities: {CAPABILITY_LEDGER.join(', ')}</p>
        <div className="sotd-ledger__track" aria-hidden="true">
          {[...CAPABILITY_LEDGER, ...CAPABILITY_LEDGER].map((item, index) => (
            <span key={`${item}-${index}`}>{item}<i /></span>
          ))}
        </div>
      </section>

      <section className="sotd-institutional" id="work" aria-labelledby="institutional-title" tabIndex={-1} data-sc-act="flow">
        <header className="sotd-work-masthead">
          <div className="sotd-work-masthead__meta">
            <span>Public web / no copy-paste energy</span>
            <strong>03 / LIVE BUILDS</strong>
          </div>
          <h2 id="institutional-title" data-sotd-kinetic><KineticLine>Made for</KineticLine><KineticLine><em>real-world pull.</em></KineticLine></h2>
          <ScrubCopy>Three public sites built to stay clear when actual people need to find an answer, not admire a layout.</ScrubCopy>
        </header>

        <div className="sotd-work-stack" aria-label="Institutional project screenshots">
          {institutionalScreens.map((screen, index) => (
            <article
              className="sotd-work-slice"
              data-work-slice
              data-layout={index === 0 ? 'lead' : index === 1 ? 'offset' : 'panorama'}
              key={screen.institution}
            >
              <span className="sotd-work-slice__ghost" aria-hidden="true">0{index + 1}</span>
              <a
                className="sotd-work-slice__media"
                href={screen.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open the live ${screen.institution} website`}
                data-cursor="VIEW LIVE"
                data-lens
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes="(max-width: 980px) 100vw, 64vw"
                />
              </a>
              <div className="sotd-work-slice__copy">
                <span>{String(index + 1).padStart(2, '0')} / {String(institutionalScreens.length).padStart(2, '0')} — public platform</span>
                <h3>{screen.institution}</h3>
                <p>Live capture, real public work. No mockup theatre.</p>
                <dl>
                  <div><dt>Role</dt><dd>{institutionalProject.role}</dd></div>
                  <div><dt>Stack</dt><dd>{institutionalProject.technologies.join(' · ')}</dd></div>
                </dl>
                <a href={screen.href} target="_blank" rel="noreferrer" aria-label={`Visit ${screen.institution}`} data-magnetic data-cursor="OPEN">
                  Open the live site <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <footer className="sotd-work-receipt">
          <span data-receipt-lead>What actually moved</span>
          <strong aria-label="40% faster loads, 60% more mobile engagement, 30% stronger user experience">
            <span data-receipt-metric><b>40%</b><small>faster loads</small></span>
            <span data-receipt-metric><b>60%</b><small>more mobile engagement</small></span>
            <span data-receipt-metric><b>30%</b><small>stronger UX</small></span>
          </strong>
          <p data-receipt-copy>One person owning the build, the responsive logic, and the live hand-off. That is the receipt.</p>
          <i className="sotd-work-receipt__sweep" data-receipt-sweep aria-hidden="true" />
        </footer>
      </section>

      <section className="sotd-impact-intro" aria-labelledby="impact-intro-title" data-sotd-reveal>
        <h2 id="impact-intro-title">The Impact I Bring in.</h2>
      </section>

      <TrafficProofExperience metrics={proofMetrics.slice(0, 5)} />

      <section className="sotd-health" id="health" aria-labelledby="health-title" data-sc-act="flow">
        <header className="sotd-health__heading">
          <div>
            <span>Healthcare web / clear beats clever</span>
            <p>{valliExperience.period}</p>
          </div>
          <div className="sotd-health__title-wrap">
            <h2 id="health-title" data-sotd-kinetic><KineticLine>Care starts before</KineticLine><KineticLine>the appointment.</KineticLine></h2>
            <p className="sotd-health__manifesto sotd-section-summary" data-sc-cue>Clear patient information, faster discovery, and a site the team can keep current.</p>
          </div>
        </header>

        <div className="sotd-health__layout">
          <figure className="sotd-health__media" data-sotd-reveal data-cursor="LIVE" data-lens>
            <Image
              src={valliExperience.visual.src ?? '/images/case-valli-home.jpg'}
              alt={valliExperience.visual.alt}
              fill
              sizes="(max-width: 980px) 100vw, 62vw"
            />
            <span className="sotd-health__scanner" aria-hidden="true" />
            <figcaption>
              <span>Live public site / no mockup cosplay, fr</span>
              <a href="https://www.vallihospital.in/" target="_blank" rel="noreferrer" data-magnetic data-cursor="LIVE">
                Peep it live <ArrowUpRight aria-hidden="true" />
              </a>
            </figcaption>
          </figure>

          <aside className="sotd-health__responsibility" data-sotd-reveal>
            <span>What I keep on</span>
            <h3>{valliExperience.role}</h3>
            <p>Keep the patient-facing experience clear, current, and ready when somebody needs it. Simple, but not small.</p>
            <ul>
              {valliExperience.highlights.slice(1, 5).map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </aside>
        </div>

        <div className="sotd-health__system-map" data-sotd-reveal data-active-stage={activeHealthStage}>
          <ScrollLottie src="/animations/signal-orbit.json" className="sotd-health__lottie" parentTrigger=".sotd-health" />
          <div className="sotd-health__journey-readout" aria-live="polite">
            <span>Patient path / 0{activeHealthStage + 1}</span>
            <strong>{HEALTH_STAGES[activeHealthStage][0]}</strong>
          </div>
          {HEALTH_STAGES.map(([title, copy], index) => (
            <article data-active={activeHealthStage === index ? 'true' : 'false'} key={title}>
              <button
                type="button"
                aria-pressed={activeHealthStage === index}
                onClick={() => setActiveHealthStage(index)}
                onFocus={() => setActiveHealthStage(index)}
                onMouseEnter={() => setActiveHealthStage(index)}
              >
                <span>{title}</span>
                <p>{copy}</p>
                <i aria-hidden="true">0{index + 1}</i>
              </button>
            </article>
          ))}
          <svg viewBox="0 0 1000 110" aria-hidden="true">
            <path d="M 30 55 H 250 C 300 55 300 18 350 18 H 642 C 690 18 690 90 742 90 H 970" />
            <circle cx="30" cy="55" r="5" />
            <circle cx="970" cy="90" r="8" />
          </svg>
        </div>
      </section>

      <section className="sotd-hash" id="hash" aria-labelledby="hash-title" data-sc-act="flow">
        <header className="sotd-hash__heading">
          <div>
            <span>{hashPrimeProject.role}</span>
            <p>{hashPrimeProject.period}</p>
          </div>
          <h2 id="hash-title" data-sotd-kinetic><KineticLine>Hash Prime.</KineticLine><KineticLine>Brand to live build.</KineticLine></h2>
          <p className="sotd-section-summary" data-sc-cue>Brand, frontend, CMS, and launch handled as one connected product build.</p>
        </header>

        <div className="sotd-hash__carousel">
          <HashPrimeLaunchTheatre artifacts={hashSlides} />
        </div>

        <div className="sotd-hash__ownership" data-sotd-reveal>
          {HASH_OWNERSHIP.map(([title, copy]) => (
            <article key={title}>
              <span>{title}</span>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="sotd-hash__deployment" data-sotd-reveal>
          <p>Private CMS stays private, obviously. What you see here is verified public work; what you do not is not being role-played.</p>
          <ol>
            <li><span>Domain</span><i /></li>
            <li><span>SSL</span><i /></li>
            <li><span>Encrypted hosting</span></li>
          </ol>
          <a href="https://www.hashprime.in/" target="_blank" rel="noreferrer" data-magnetic data-cursor="VISIT">
            Peep the live build <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <OperatingChapters />

      <section className="sotd-capabilities" id="capabilities" aria-labelledby="capabilities-title" data-sc-act="flow">
        <header className="sotd-capabilities__heading">
          <span>Capability stack / six modes / zero “not my job” replies</span>
          <h2 id="capabilities-title" data-sotd-kinetic><KineticLine>One builder.</KineticLine><KineticLine><em>Six modes.</em></KineticLine></h2>
          <ScrubCopy>Different surfaces, same brain. If it touches the build, I can get in there and make it make sense.</ScrubCopy>
        </header>

        <div className="sotd-capability-stack">
          <CapabilityFlowStack groups={skills} />
        </div>
      </section>

      <section className="sotd-about" id="about" aria-labelledby="about-title" data-sc-act="flow">
        <header className="sotd-about__heading">
          <span>How I operate / quick lore drop</span>
          <h2 id="about-title" data-sotd-kinetic><KineticLine>Build it sharp.</KineticLine><KineticLine>Keep it running.</KineticLine></h2>
        </header>

        <AboutMotionSystem
          items={OPERATING_STRENGTHS.map(([title, copy]) => ({ title, copy }))}
        />

        <div className="sotd-about__records">
          <section className="sotd-about__education" aria-labelledby="education-title" data-sotd-reveal>
            <h3 id="education-title">Education / the origin story</h3>
            {education.map((entry) => (
              <article key={entry.institution}>
                <div><strong>{entry.qualification}</strong><span>{entry.institution}</span></div>
                <p>{entry.result}</p>
                <time>{entry.period}</time>
              </article>
            ))}
          </section>

          <section className="sotd-about__credentials" aria-labelledby="credentials-title" data-sotd-reveal>
            <h3 id="credentials-title">Credentials / more receipts</h3>
            {awardsAndCredentials.map((credential) => (
              <article key={`${credential.title}-${credential.issuer}`}>
                <span>{credential.type}</span>
                <div><strong>{credential.title}</strong><p>{credential.issuer}{credential.detail ? ` · ${credential.detail}` : ''}</p></div>
                <time>{credential.year}</time>
              </article>
            ))}
          </section>
        </div>
      </section>

      <section className="sotd-contact" id="contact" aria-labelledby="contact-title" data-sc-act="flow">
        <div className="sotd-contact__light">
          <span>{contact.name}</span>
          <h2 id="contact-title" data-sotd-kinetic><KineticLine>Make the</KineticLine><KineticLine>difficult</KineticLine></h2>
        </div>
        <div className="sotd-contact__dark">
          <ScrubCopy>Complex brief? Bet. Let’s make the final thing feel ridiculously obvious—fr.</ScrubCopy>
          <h2 data-sotd-kinetic><KineticLine>system</KineticLine><KineticLine>clear.</KineticLine></h2>
        </div>

        <svg className="sotd-contact__route" viewBox="0 0 1440 120" aria-hidden="true">
          <path d="M 26 73 H 805 C 860 73 865 25 918 25 H 1312" />
          <circle cx="1312" cy="25" r="11" />
        </svg>

        <a className="sotd-contact__email" href={`mailto:${contact.email}`} aria-label={`Email ${contact.name} at ${contact.email}`} data-cursor="EMAIL" data-magnetic data-spark>
          <span className="sotd-contact__email-layer sotd-contact__email-layer--dark">
            {splitLetters(contact.email, 'sotd-contact__email-char')}
          </span>
          <span className="sotd-contact__email-layer sotd-contact__email-layer--light" aria-hidden="true">
            {splitLetters(contact.email, 'sotd-contact__email-char')}
          </span>
          <Mail aria-hidden="true" />
        </a>

        <footer className="sotd-contact__footer">
          <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" data-magnetic data-cursor="LINKEDIN"><Linkedin aria-hidden="true" /> LinkedIn</a>
          <a href={contact.githubUrl} target="_blank" rel="noreferrer" data-magnetic data-cursor="GITHUB"><Github aria-hidden="true" /> GitHub</a>
          <a href="/t-mohammed-arif.pdf" target="_blank" rel="noreferrer" data-magnetic data-cursor="RESUME"><FileText aria-hidden="true" /> Résumé</a>
          <span><MapPin aria-hidden="true" /> {contact.location}</span>
          <a href="#top" data-magnetic data-cursor="TOP">Run it back <ArrowUpRight aria-hidden="true" /></a>
        </footer>
      </section>
    </main>
  );
}
