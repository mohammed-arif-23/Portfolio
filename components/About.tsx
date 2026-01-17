'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Trophy, Briefcase, Network, ArrowUpRight } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Resume Data - Cleaned up
  const resumeData = {
    bio: "Full Stack Developer with hands-on experience building, deploying, and maintaining real-world web applications for educational institutions and healthcare operations. Skilled in Next.js-based systems, backend APIs, authentication, automation workflows, and practical problem-solving through software. Comfortable owning projects end-to-end and working directly with non-technical stakeholders.",

  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Bio Text - Word by Word Reveal
      const bioText = document.querySelector('.about-bio');
      if (bioText) {
        const words = bioText.textContent?.split(' ') || [];
        bioText.innerHTML = words.map(word => `<span class="inline-block opacity-0">${word}&nbsp;</span>`).join('');

        gsap.to('.about-bio span', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioText,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse'
          }
        });
      }

      // Stats Cards - Enhanced Entrance
      gsap.fromTo('.about-card',
        {
          y: 100,
          opacity: 0,
          rotateX: -15,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-cards-grid',
            start: 'top 80%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

      // CV Button - Delayed Bounce
      gsap.fromTo('.about-cv',
        {
          y: 80,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.about-cv',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen text-[#ededed] pt-8 pb-8 md:pt-12 md:pb-12 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-8 lg:gap-24">

      {/* LEFT: Sticky Title - Only sticky on desktop */}
      <div className="w-full lg:w-1/3 relative z-10 lg:h-[150vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-8 lg:py-0">
          <div className="overflow-hidden flex flex-col">
            <h2 className="text-[15vw] md:text-[12vw] lg:text-[7vw] font-bold leading-none tracking-tighter text-[#333]">
              ABOUT
            </h2>
            <h2 className="text-[15vw] md:text-[12vw] lg:text-[7vw] font-bold leading-none tracking-tighter text-[#ccff00] ml-8 md:ml-12 lg:ml-24 -mt-2 lg:-mt-4 relative z-20">
              ME.
            </h2>
          </div>
          <div className="mt-6 lg:mt-8 hidden md:block w-12 h-[2px] bg-[#333]"></div>
        </div>
      </div>

      {/* RIGHT: Scrollable Content */}
      <div ref={contentRef} className="w-full lg:w-2/3 flex flex-col justify-center py-0 lg:py-32">

        {/* Bio */}
        <div className="mb-12 md:mb-16 lg:mb-24">
          <p className="about-bio text-lg md:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed md:leading-snug text-[#ededed]/90">
            {resumeData.bio}
          </p>
        </div>

        {/* CV Button - Full width on mobile */}
        <div className="about-cards-grid w-full">
          <MagneticWrapper>
            <a href="t-mohammed-arif.pdf" className="about-cv group relative p-6 md:p-8 bg-[#ccff00] text-[#050505] rounded-sm overflow-hidden min-h-[160px] md:min-h-[180px] flex flex-col justify-between items-start hover:scale-[1.02] transition-transform duration-300">
              <div className="w-full flex justify-between items-start">
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">Curriculum Vitae</span>
                <ArrowUpRight size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mt-auto leading-none">DOWNLOAD<br />RESUME</h3>
            </a>
          </MagneticWrapper>
        </div>

      </div>
    </section>
  );
}
