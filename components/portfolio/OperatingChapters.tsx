'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import styles from './OperatingChapters.module.css';

type ChapterId = 'campaign' | 'automate' | 'operate';

interface ChapterDefinition {
  id: ChapterId;
  number: string;
  verb: string;
  eyebrow: string;
  title: string;
  description: string;
  proof: readonly string[];
}

const CHAPTERS: readonly ChapterDefinition[] = [
  {
    id: 'campaign',
    number: '01',
    verb: 'Campaign',
    eyebrow: 'Communication system / one vibe, every surface',
    title: 'Healthcare Conference Digital Systems',
    description:
      'Planned and designed event branding, registration creatives, session layouts, pamphlets, and Meta ads. One visual language everywhere, so no random-asset chaos, fr.',
    proof: ['Event identity', 'Registration', 'Session overview', 'Print', 'Meta ads'],
  },
  {
    id: 'automate',
    number: '02',
    verb: 'Automate',
    eyebrow: 'Workflow leverage / boring admin gets cooked',
    title: 'Automation & Internal Tools',
    description:
      'Built local tools for CSV-driven bulk email, image text extraction, and print-focused image enhancement. Repetitive admin loops? Yeah, nah.',
    proof: ['CSV email workflow', 'Image text extraction', 'Print enhancement'],
  },
  {
    id: 'operate',
    number: '03',
    verb: 'Operate',
    eyebrow: 'One connected practice / zero silo theatre',
    title: 'Production, Growth & Design Systems',
    description:
      'Frontend, backend, deployment, discovery, automation, and visual hierarchy work as one practice—not isolated services pretending to be a strategy. Full route, no cap.',
    proof: ['Production systems', 'Search & AI discovery', 'Visual systems'],
  },
] as const;

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

const copyGroup = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.11,
    },
  },
};

const copyReveal = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.76, ease: REVEAL_EASE },
  },
};

const proofReveal = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.58, ease: REVEAL_EASE },
  },
};

function CampaignComposition() {
  return (
    <div className={`${styles.composition} ${styles.campaignComposition}`} aria-hidden="true">
      <div className={styles.compositionTopline}>
        <span>Medical event visual system</span>
        <span>05 touchpoints / one voice</span>
      </div>

      <div className={styles.campaignField}>
        <span className={styles.campaignGhost}>SIGNAL</span>
        <div className={`${styles.campaignPlane} ${styles.campaignPlanePrimary}`}>
          <small>Signal / 01</small>
          <strong>ONE EVENT.<br />ONE SIGNAL.</strong>
          <i />
        </div>
        <div className={`${styles.campaignPlane} ${styles.campaignPlaneSession}`}>
          <small>Programme / 02</small>
          <strong>Session<br />overview</strong>
          <span>Easy to scan. Hard to miss. Period.</span>
        </div>
        <div className={`${styles.campaignPlane} ${styles.campaignPlaneRegister}`}>
          <small>Entry / 03</small>
          <strong>REGISTER</strong>
          <b>↗</b>
        </div>
        <div className={styles.campaignAxis}>
          <span>Print</span>
          <i />
          <span>Social</span>
          <i />
          <span>Digital</span>
        </div>
      </div>

      <div className={styles.compositionCaption}>
        <span>How it moves</span>
        <p>One brand language becomes registration, programme, print, and campaign assets without losing the plot.</p>
      </div>
    </div>
  );
}

function AutomationComposition() {
  return (
    <div className={`${styles.composition} ${styles.automationComposition}`} aria-hidden="true">
      <div className={styles.compositionTopline}>
        <span>Input → clean output</span>
        <span>Local tools / no cloud circus, fr</span>
      </div>

      <div className={styles.automationField}>
        <div className={styles.automationInputs}>
          <span>CSV<small>Rows / recipients</small></span>
          <span>IMAGE<small>Text / content</small></span>
          <span>PRINT<small>Source / asset</small></span>
        </div>

        <svg className={styles.automationRoute} viewBox="0 0 760 390" role="presentation">
          <path className={styles.automationRouteGhost} d="M 20 54 H 184 C 244 54 214 196 286 196 H 466 C 540 196 508 334 580 334 H 740" />
          <path className={styles.automationRouteLive} d="M 20 54 H 184 C 244 54 214 196 286 196 H 466 C 540 196 508 334 580 334 H 740" />
          <circle className={styles.automationNode} cx="20" cy="54" r="8" />
          <circle className={styles.automationNode} cx="286" cy="196" r="8" />
          <circle className={styles.automationNode} cx="580" cy="334" r="8" />
          <circle className={styles.automationNode} cx="740" cy="334" r="8" />
          <circle className={`${styles.automationPacket} ${styles.automationPacketLead}`} r="7" />
          <circle className={`${styles.automationPacket} ${styles.automationPacketTrail}`} r="4" />
        </svg>

        <div className={styles.automationProcessor}>
          <span>Parse</span>
          <span>Extract</span>
          <span>Enhance</span>
          <span>Review</span>
        </div>

        <div className={styles.automationOutputs}>
          <span>EMAIL FLOW</span>
          <span>TEXT OUTPUT</span>
          <span>PRINT ASSET</span>
        </div>

        <div className={styles.automationCounter}>
          <small>Repeat work, deleted</small>
          <strong>∞ → 1</strong>
        </div>
      </div>

      <div className={styles.compositionCaption}>
        <span>How the loop works</span>
        <p>Structured inputs go through purpose-built tools, then come back checked and ready to use. No copy-paste marathon.</p>
      </div>
    </div>
  );
}

function OperateComposition() {
  return (
    <div className={`${styles.composition} ${styles.operateComposition}`} aria-hidden="true">
      <div className={styles.compositionTopline}>
        <span>Build → get found → make sense</span>
        <span>One operating rhythm</span>
      </div>

      <div className={styles.operateField}>
        <div className={styles.operateWordmark}>
          <span>SHIP</span>
          <span>FIND</span>
          <span>FEEL</span>
        </div>

        <div className={styles.operateLanes}>
          <div className={styles.operateLane}>
            <small>01 / Production</small>
            <strong>BUILD</strong>
            <ul>
              <li>Frontend + backend</li>
              <li>Domain + SSL</li>
              <li>Performance</li>
            </ul>
          </div>
          <div className={styles.operateLane}>
            <small>02 / Growth</small>
            <strong>DISCOVER</strong>
            <ul>
              <li>SEO + GEO</li>
              <li>Maps readiness</li>
              <li>Traffic signals</li>
            </ul>
          </div>
          <div className={styles.operateLane}>
            <small>03 / Design</small>
            <strong>CLARIFY</strong>
            <ul>
              <li>Visual hierarchy</li>
              <li>Information systems</li>
              <li>Production assets</li>
            </ul>
          </div>
        </div>

        <div className={styles.operateSequence}>
          <i />
          <i />
          <i />
        </div>

        <svg className={styles.operateLoop} viewBox="0 0 900 420" role="presentation">
          <path d="M 42 210 C 42 54 244 54 300 210 C 354 366 550 366 600 210 C 652 54 858 54 858 210 C 858 366 652 366 600 210 C 550 54 354 54 300 210 C 244 366 42 366 42 210 Z" />
        </svg>
      </div>

      <div className={styles.compositionCaption}>
        <span>How it stays connected</span>
        <p>Build, discovery, and visual decisions keep feeding each other. That is how the work stays useful after launch.</p>
      </div>
    </div>
  );
}

const COMPOSITIONS: Record<ChapterId, ReactNode> = {
  campaign: <CampaignComposition />,
  automate: <AutomationComposition />,
  operate: <OperateComposition />,
};

function EditorialChapter({
  chapter,
  active,
}: {
  chapter: ChapterDefinition;
  active: boolean;
}) {
  const chapterRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(chapterRef, {
    amount: 0.12,
    margin: '-6% 0px -6% 0px',
  });
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ['start end', 'end start'],
  });
  const compositionY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [34, 0, -34],
  );
  const numeralX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [-20, 0, 24],
  );

  return (
    <article
      className={styles.chapter}
      data-operating-chapter={chapter.id}
      data-chapter-number={chapter.number}
      data-active={active ? 'true' : 'false'}
      data-in-view={inView ? 'true' : 'false'}
      id={`systems-${chapter.id}`}
      ref={chapterRef}
      aria-labelledby={`systems-${chapter.id}-title`}
    >
      <motion.div
        animate={reduceMotion || inView ? 'visible' : 'hidden'}
        className={styles.chapterCopy}
        initial={reduceMotion ? false : 'hidden'}
        variants={copyGroup}
      >
        <motion.div className={styles.chapterMeta} variants={copyReveal}>
          <motion.span style={{ x: numeralX }}>{chapter.number}</motion.span>
          <p>{chapter.eyebrow}</p>
        </motion.div>

        <motion.div
          className={styles.chapterTitleBlock}
          variants={copyReveal}
        >
          <span>{chapter.verb}</span>
          <h3 id={`systems-${chapter.id}-title`}>{chapter.title}</h3>
        </motion.div>

        <motion.div className={styles.chapterStatement} variants={copyReveal}>
          <p>{chapter.description}</p>
          <motion.ol aria-label={`${chapter.verb} scope`} variants={copyGroup}>
            {chapter.proof.map((item, index) => (
              <motion.li key={item} tabIndex={0} variants={proofReveal}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item}
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </motion.div>

      <motion.div
        animate={reduceMotion || inView ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : { clipPath: 'inset(7% 0% 7% 0%)', opacity: 0.44 }}
        className={styles.chapterComposition}
        initial={reduceMotion ? false : { clipPath: 'inset(7% 0% 7% 0%)', opacity: 0.44 }}
        style={{ y: compositionY }}
        transition={{ duration: 0.9, ease: REVEAL_EASE }}
      >
        {COMPOSITIONS[chapter.id]}
      </motion.div>
    </article>
  );
}

export default function OperatingChapters() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState<ChapterId>('campaign');
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start 72%', 'end 28%'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 95,
    damping: reduceMotion ? 1000 : 24,
    mass: 0.2,
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute('data-operating-chapter') as ChapterId | null;
        if (id) setActiveChapter(id);
      },
      {
        rootMargin: '-30% 0px -42% 0px',
        threshold: [0, 0.2, 0.45, 0.7],
      },
    );

    root.querySelectorAll<HTMLElement>('[data-operating-chapter]').forEach((chapter) => {
      observer.observe(chapter);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.root} id="systems" ref={rootRef} aria-labelledby="systems-title" data-sc-act="flow">
      <motion.header
        className={styles.intro}
        initial={reduceMotion ? false : 'hidden'}
        variants={copyGroup}
        viewport={{ once: true, amount: 0.24 }}
        whileInView={reduceMotion ? undefined : 'visible'}
      >
        <motion.span className={styles.kicker} variants={copyReveal}>Visible systems / useful leverage / built different, fr</motion.span>
        <h2 id="systems-title">
          <span className={styles.introLineMask}>
            <motion.span variants={copyReveal}>From brief</motion.span>
          </span>
          <span className={styles.introLineMask}>
            <motion.em variants={copyReveal}>to live.</motion.em>
          </span>
        </h2>
        <motion.p variants={copyReveal}>
          Shape the communication, delete the repetition, and keep the thing alive.
          Three chapters. Zero handoff limbo.
        </motion.p>
        <motion.a className={styles.introJump} href="#systems-campaign" variants={copyReveal}>
          <span>Start chapter 01</span>
          <i aria-hidden="true">↓</i>
        </motion.a>
      </motion.header>

      <div className={styles.scrolly}>
        <aside className={styles.rail} aria-label="Operating chapters">
          <div className={styles.railHeader}>
            <span>Field index</span>
            <strong>{CHAPTERS.find((chapter) => chapter.id === activeChapter)?.number}</strong>
          </div>

          <div className={styles.railProgress} aria-hidden="true">
            <motion.i style={{ scaleY: progress }} />
          </div>

          <ol>
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#systems-${chapter.id}`}
                  aria-current={activeChapter === chapter.id ? 'step' : undefined}
                >
                  <span>{chapter.number}</span>
                  <strong>{chapter.verb}</strong>
                </a>
              </li>
            ))}
          </ol>

          <p className={styles.railNote}>Scroll it. The system moves with you.</p>
        </aside>

        <div className={styles.chapters}>
          {CHAPTERS.map((chapter) => (
            <EditorialChapter
              active={activeChapter === chapter.id}
              chapter={chapter}
              key={chapter.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
