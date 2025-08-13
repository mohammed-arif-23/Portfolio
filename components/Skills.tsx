'use client';

import { ScrollReveal, TextSplit, Float } from '@/components/reactbits';
import { forwardRef } from 'react';

// Official logo URLs for popular technologies
const techLogos = [
  { name: 'Next.js', url: '/logos/Next.js' },
  { name: 'React', url: '/logos/React' },
  { name: 'JavaScript', url: '/logos/JavaScript' },
  { name: 'Node.js', url: '/logos/Node.js' },
  { name: 'MongoDB', url: '/logos/MongoDB' },
  { name: 'Express', url: '/logos/Express' },
  { name: 'PHP', url: '/logos/PHP' },
  { name: 'MySQL', url: '/logos/MySQL' },
  { name: 'Tailwind', url: '/logos/Tailwind' },
  { name: 'HTML5', url: '/logos/HTML5' },
  { name: 'CSS3', url: '/logos/CSS3' },
  { name: 'TypeScript', url: '/logos/TypeScript' },
  { name: 'Firebase', url: '/logos/Firebase' },
  { name: 'Docker', url: '/logos/Docker' },
  { name: 'Python', url: '/logos/Python' },
  { name: 'Django', url: '/logos/Django' },
  { name: 'Flask', url: '/logos/Flask' },
  { name: 'Keras', url: '/logos/Keras' },
  { name: 'TensorFlow', url: '/logos/TensorFlow' },
  { name: 'PyTorch', url: '/logos/PyTorch' },
  { name: 'Three.js', url: '/logos/Three.js' },
  { name: 'Git', url: '/logos/Git' },
  { name: 'Prisma', url: '/logos/Prisma' },
  { name: 'Bootstrap', url: '/logos/Bootstrap' },
  { name: 'Redux', url: '/logos/Redux' },
  { name: 'Supabase', url: '/logos/Supabase' },
  { name: 'OpenCV', url: '/logos/OpenCV' },
  { name: 'Java', url: '/logos/Java' },
  { name: 'C++', url: '/logos/C++' },
  { name: 'C#', url: '/logos/cS' },
];
const Skills = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal duration={1.5} stagger={0.2} start="top 90%">
            <TextSplit 
              className="text-5xl md:text-6xl font-bold mb-4 text-white"
              animation="words"
              stagger={0.1}
              duration={1}
            >
              Technologies I've Worked With
            </TextSplit>
          </ScrollReveal>
          
        
          </div>

        <ScrollReveal animation="scale" duration={1.5} stagger={0.2} start="top 90%">
          <Float y={10} duration={4}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 p-8 rounded-3xl glass-morphism-strong glass-dim">
              {techLogos.map((tech, index) => (
                <ScrollReveal 
                  key={tech.name}
                  animation="scale" 
                  duration={1.5} 
                  delay={index * 0.05}
                  stagger={0.2}
                  start="top 90%"
                  className="flex items-center justify-center p-4 rounded-2xl glass-morphism hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <img
                    src={'/images'+tech.url + '.svg'}
                    alt={tech.name}
                    title={tech.name}
                    className="w-14 h-14 object-contain drop-shadow-xl filter saturate-150"
                    loading="lazy"
                  />
                </ScrollReveal>
              ))}
            </div>
          </Float>
        </ScrollReveal>
      </div>
    </section>
  );
});
Skills.displayName = 'Skills';
export default Skills;