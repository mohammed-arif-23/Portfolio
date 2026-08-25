'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/mohammed-arif-23' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/t-mohammed-arif' },
  { label: 'Email', href: 'mailto:mohammedarif1118@gmail.com' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-headline', {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.3,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      });
      gsap.from('.contact-form', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:mohammedarif1118@gmail.com?subject=From Portfolio&body=${encodeURIComponent(`Email: ${email}\n\n${message}`)}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0C4137 0%, #071e19 100%)' }}
    >
      {/* Emerald glow */}
      <div
        className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,214,160,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Main contact block */}
      <div className="relative z-10 px-6 md:px-12 xl:px-20 pt-24 md:pt-36 pb-16">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-[#06D6A0] text-xs font-mono tracking-[0.3em] uppercase">07 / Contact</span>
          <div className="h-px flex-1 max-w-16 bg-[rgba(6,214,160,0.3)]" />
        </div>

        {/* Giant CTA headline */}
        <div className="mb-16 md:mb-20 max-w-[1400px]">
          {["Let's build", "something", "great."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className={`contact-headline block font-black uppercase ${i === 2 ? 'text-[#06D6A0]' : 'text-[#E6FBF6]'}`}
                style={{
                  fontFamily: '"Climate Crisis", sans-serif',
                  fontVariationSettings: '"YEAR" 2024',
                  fontSize: 'clamp(3.5rem, 10vw, 140px)',
                  lineHeight: 0.87,
                  letterSpacing: '-0.03em',
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Content row: form + links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <form
            className="contact-form lg:col-span-7 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[rgba(230,251,246,0.4)] text-xs font-mono tracking-widest uppercase">
                  Your email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-[rgba(230,251,246,0.04)] border border-[rgba(230,251,246,0.10)] rounded-xl px-4 py-4 text-[#E6FBF6] text-sm font-mono placeholder:text-[rgba(230,251,246,0.25)] focus:outline-none focus:border-[rgba(6,214,160,0.5)] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[rgba(230,251,246,0.4)] text-xs font-mono tracking-widest uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Let's work together"
                  className="bg-[rgba(230,251,246,0.04)] border border-[rgba(230,251,246,0.10)] rounded-xl px-4 py-4 text-[#E6FBF6] text-sm font-mono placeholder:text-[rgba(230,251,246,0.25)] focus:outline-none focus:border-[rgba(6,214,160,0.5)] transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[rgba(230,251,246,0.4)] text-xs font-mono tracking-widest uppercase">
                Tell me about your project
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you building? What kind of help do you need?"
                className="bg-[rgba(230,251,246,0.04)] border border-[rgba(230,251,246,0.10)] rounded-xl px-4 py-4 text-[#E6FBF6] text-sm font-mono placeholder:text-[rgba(230,251,246,0.25)] focus:outline-none focus:border-[rgba(6,214,160,0.5)] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="self-start mt-2 group flex items-center gap-4 px-8 py-4 bg-[#06D6A0] text-[#071e19] font-semibold text-sm font-mono tracking-widest uppercase rounded-full hover:bg-[#E6FBF6] transition-colors duration-300"
            >
              {sent ? 'Sent! ✓' : 'Send Message'}
              {!sent && (
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
              )}
            </button>
          </form>

          {/* Right: availability + links */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12">
            {/* Availability */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#06D6A0] animate-pulse" />
                <span className="text-[#06D6A0] text-xs font-mono tracking-widest uppercase">Open to work</span>
              </div>
              <p className="text-[rgba(230,251,246,0.5)] text-sm leading-relaxed font-light max-w-xs">
                Available for full-time roles, freelance projects, and interesting collaborations. Based in Salem, India — open to remote globally.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-[rgba(230,251,246,0.3)] text-xs font-mono tracking-widest uppercase mb-6">Find me online</p>
              <div className="flex flex-col gap-3">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 border-b border-[rgba(230,251,246,0.08)] hover:border-[rgba(6,214,160,0.3)] transition-colors duration-300"
                  >
                    <span className="text-[#E6FBF6] font-semibold group-hover:text-[#06D6A0] transition-colors duration-300">
                      {link.label}
                    </span>
                    <span className="text-[rgba(230,251,246,0.3)] group-hover:text-[#06D6A0] translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 border-t border-[rgba(230,251,246,0.07)] px-6 md:px-12 xl:px-20 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-[rgba(230,251,246,0.3)]">
          <span>© 2026 T Mohammed Arif. All rights reserved.</span>
          <span className="text-[rgba(6,214,160,0.4)]">Built with Next.js · Deployed on Vercel</span>
        </div>
      </div>
    </section>
  );
}