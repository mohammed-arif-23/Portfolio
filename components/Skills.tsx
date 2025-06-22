'use client';

import { ScrollReveal, TextSplit, Float } from '@/components/reactbits';
import { forwardRef } from 'react';

// Official logo URLs for popular technologies
const techLogos = [
  { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PHP', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Express', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Bootstrap', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg' },
  { name: 'Material-UI', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-plain.svg' },
  { name: 'Keras', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg' },
  { name: 'TensorFlow', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Tailwind', url: 'https://www.svgrepo.com/show/374118/tailwind.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Redux', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C#', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'OpenCV', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
  { name: 'Kubernetes', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Prisma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
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
              Technologies I've Known
            </TextSplit>
          </ScrollReveal>
          
          <ScrollReveal duration={1.5} stagger={0.2} start="top 90%" delay={0.2}>
            <TextSplit 
              className="text-gray-400"
              animation="words"
              stagger={0.05}
              duration={0.8}
            >
              Ordered by proficiency
            </TextSplit>
          </ScrollReveal>
          </div>

        <ScrollReveal animation="scale" duration={1.5} stagger={0.2} start="top 90%">
          <Float y={10} duration={4}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 p-8 rounded-3xl glass-morphism-strong">
              {techLogos.map((tech, index) => (
                <ScrollReveal 
                  key={tech.name}
                  animation="scale" 
                  duration={1.5} 
                  delay={index * 0.05}
                  stagger={0.2}
                  start="top 90%"
                  className="flex items-center justify-center p-4 rounded-2xl glass-morphism hover:scale-110 transition-all duration-300 shadow-lg hover:bg-white/10"
                >
                  <img
                    src={tech.url}
                    alt={tech.name}
                    title={tech.name}
                    className="w-14 h-14 object-contain drop-shadow-xl"
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