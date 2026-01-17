'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Zap, BarChart3, Settings, Globe, Users, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const responsibilities = [
  {
    icon: <Code size={20} />,
    text: "Working as a part-time developer supporting hospital web systems, automation, and internal tools."
  },
  {
    icon: <Database size={20} />,
    text: "Developing and maintaining applications using Next.js, Node.js, MongoDB with authentication, API routes, validation, and error handling."
  },
  {
    icon: <Zap size={20} />,
    text: "Creating automation workflows using Zapier and AI tools integrating WhatsApp, Telegram, Instagram comments, and internal processes."
  },
  {
    icon: <BarChart3 size={20} />,
    text: "Performed practical data analysis to identify inefficiencies and help reduce operational expenses."
  },
  {
    icon: <Settings size={20} />,
    text: "Modified and managed Zoho Creator applications used by hospital staff."
  },
  {
    icon: <Globe size={20} />,
    text: "Managed hospital website content, LinkedIn page, and basic posters using Canva and AI tools."
  },
  {
    icon: <Users size={20} />,
    text: "Worked directly with doctors, receptionists, and staff to gather requirements and simplify workflows."
  },
  {
    icon: <Wrench size={20} />,
    text: "Handled ongoing maintenance, bug fixes, updates, and hybrid on-site/remote support."
  }
];

const techStack = ["Next.js", "Node.js", "MongoDB", "Zapier", "Zoho Creator", "WhatsApp API", "Canva", "AI Tools"];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate responsibility cards on scroll
      gsap.fromTo('.responsibility-card',
        {
          y: 50,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.responsibility-grid',
            start: 'top 80%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 px-4 md:px-12 bg-[#080808] flex items-center justify-center overflow-hidden">

      <div className="max-w-5xl mx-auto w-full relative z-10">

        {/* Section Title */}
        <div className="mb-16 flex items-end gap-6 border-b border-white/10 pb-6">
          <span className="text-8xl md:text-9xl text-white/5 font-black leading-none absolute -top-12 -left-8 md:-left-16 pointer-events-none select-none">
            EXP
          </span>
          <h2 className="text-sm font-mono text-brand-accent tracking-[0.5em] uppercase relative z-10">
            Professional_History (1)
          </h2>
        </div>

        {/* Single Experience Card (Feature Layout) */}
        <div className="group relative w-full bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 hover:bg-white/[0.07] transition-colors duration-500">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                Digital Operations & Systems Manager – Hospital Administration
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-lg text-white/60">Hybrid</span>
                <span className="px-2 py-0.5 bg-brand-accent/20 text-brand-accent text-xs font-mono rounded uppercase tracking-wider">
                  Current
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="block font-mono text-xl text-white">2025 — Present</span>
            </div>
          </div>

          {/* Animated Responsibility Cards */}
          <div className="responsibility-grid grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {responsibilities.map((item, i) => (
              <div
                key={i}
                className="responsibility-card group/card relative p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.05] hover:border-brand-accent/30 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Gradient Accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-lg"></div>

                {/* Icon */}
                <div className="relative flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover/card:bg-brand-accent/20 group-hover/card:scale-110 transition-all duration-300">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <p className="text-sm text-white/60 leading-relaxed group-hover/card:text-white/80 transition-colors">
                    {item.text}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-brand-accent/0 via-brand-accent/20 to-brand-accent/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-sm rounded-lg -z-10"></div>
              </div>
            ))}
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/50 font-mono hover:text-white hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all duration-300">
                {tech}
              </span>
            ))}
          </div>

          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-accent/10 transition-colors duration-700"></div>

        </div>

      </div>

    </section >
  );
}
