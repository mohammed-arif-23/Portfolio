'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { name: 'Next.js', url: '/logos/Next.js', shadow: 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]' },
  { name: 'React', url: '/logos/React', shadow: 'drop-shadow-[0_4px_8px_rgba(97,218,251,0.6)]' },
  { name: 'JavaScript', url: '/logos/JavaScript', shadow: 'drop-shadow-[0_4px_8px_rgba(247,223,30,0.6)]' },
  { name: 'Node.js', url: '/logos/Node.js', shadow: 'drop-shadow-[0_4px_8px_rgba(104,160,99,0.6)]' },
  { name: 'GSAP', url: '/logos/gsap-black', shadow: 'drop-shadow-[0_4px_8px_rgba(255,255,255,0.6)]' },
  { name: 'Go', url: '/logos/Go-Logo_Aqua', shadow: 'drop-shadow-[0_4px_8px_rgba(255,255,255,0.6)]' },
  { name: 'MongoDB', url: '/logos/MongoDB', shadow: 'drop-shadow-[0_4px_8px_rgba(71,162,72,0.6)]' },
  { name: 'Express', url: '/logos/Express', shadow: 'drop-shadow-[0_4px_8px_rgba(68,68,68,0.8)]' },
  { name: 'PHP', url: '/logos/PHP', shadow: 'drop-shadow-[0_4px_8px_rgba(119,123,180,0.6)]' },
  { name: 'MySQL', url: '/logos/MySQL', shadow: 'drop-shadow-[0_4px_8px_rgba(0,117,143,0.6)]' },
  { name: 'Tailwind', url: '/logos/Tailwind', shadow: 'drop-shadow-[0_4px_8px_rgba(56,178,172,0.6)]' },
  { name: 'HTML5', url: '/logos/HTML5', shadow: 'drop-shadow-[0_4px_8px_rgba(227,79,38,0.6)]' },
  { name: 'CSS3', url: '/logos/CSS3', shadow: 'drop-shadow-[0_4px_8px_rgba(21,114,182,0.6)]' },
  { name: 'TypeScript', url: '/logos/TypeScript', shadow: 'drop-shadow-[0_4px_8px_rgba(49,120,198,0.6)]' },
  { name: 'Firebase', url: '/logos/Firebase', shadow: 'drop-shadow-[0_4px_8px_rgba(255,202,40,0.6)]' },
  { name: 'Docker', url: '/logos/Docker', shadow: 'drop-shadow-[0_4px_8px_rgba(33,150,243,0.6)]' },
  { name: 'Python', url: '/logos/Python', shadow: 'drop-shadow-[0_4px_8px_rgba(55,118,171,0.6)]' },
  { name: 'Django', url: '/logos/Django', shadow: 'drop-shadow-[0_4px_8px_rgba(9,46,32,0.8)]' },
  { name: 'Flask', url: '/logos/Flask', shadow: 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]' },
  { name: 'Keras', url: '/logos/Keras', shadow: 'drop-shadow-[0_4px_8px_rgba(211,53,39,0.6)]' },
  { name: 'TensorFlow', url: '/logos/TensorFlow', shadow: 'drop-shadow-[0_4px_8px_rgba(255,109,56,0.6)]' },
  { name: 'PyTorch', url: '/logos/PyTorch', shadow: 'drop-shadow-[0_4px_8px_rgba(238,76,44,0.6)]' },
  { name: 'Three.js', url: '/logos/Three.js', shadow: 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]' },
  { name: 'Git', url: '/logos/Git', shadow: 'drop-shadow-[0_4px_8px_rgba(240,80,50,0.6)]' },
  { name: 'Prisma', url: '/logos/Prisma', shadow: 'drop-shadow-[0_4px_8px_rgba(91,108,219,0.6)]' },
  { name: 'Bootstrap', url: '/logos/Bootstrap', shadow: 'drop-shadow-[0_4px_8px_rgba(86,61,124,0.6)]' },
  { name: 'Redux', url: '/logos/Redux', shadow: 'drop-shadow-[0_4px_8px_rgba(118,74,188,0.6)]' },
  { name: 'Supabase', url: '/logos/Supabase', shadow: 'drop-shadow-[0_4px_8px_rgba(62,207,142,0.6)]' },
  { name: 'OpenCV', url: '/logos/OpenCV', shadow: 'drop-shadow-[0_4px_8px_rgba(95,207,30,0.6)]' },
  { name: 'Java', url: '/logos/Java', shadow: 'drop-shadow-[0_4px_8px_rgba(237,100,52,0.6)]' },
  { name: 'C++', url: '/logos/C++', shadow: 'drop-shadow-[0_4px_8px_rgba(0,89,156,0.6)]' },
  { name: 'C#', url: '/logos/cS', shadow: 'drop-shadow-[0_4px_8px_rgba(147,61,179,0.6)]' },
 ];

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.tech-item');
      
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 pb-20 px-4 md:px-8 lg:px-20 bg-brand-light">
      <div className="layout-grid">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <div className="flex flex-col items-center justify-center gap-3 mb-16">
            <p className="heading-64 text-center text-brand-dark font-semibold">Technologies I've Worked with</p>
            <p>Ordered by Proficiency</p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8">
            {techLogos.map((tech, index) => (
              <div
                key={index}
                className="tech-item group relative px-4 py-4 bg-brand-dark/10 rounded-2xl hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-brand-dark/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <img 
                    src={'/images' + tech.url + '.svg'} 
                    alt={tech.name}
                    className={`w-14 h-14 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-all duration-300 ${tech.shadow}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}