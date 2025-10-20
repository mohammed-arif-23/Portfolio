'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector('.about-title');
      const heading = sectionRef.current?.querySelector('.about-heading');
      const words = sectionRef.current?.querySelectorAll('.word');
      const statCards = sectionRef.current?.querySelectorAll('.stat-card');
      const infoCards = sectionRef.current?.querySelectorAll('.info-card');

      // Set initial states with blur for all elements
      const allElements = [title, heading, ...Array.from(words || []), ...Array.from(statCards || []), ...Array.from(infoCards || [])].filter(Boolean);
      
     

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 40%',
          toggleActions: 'play none none none',
        },
      });

      // Animate title
      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0
        );
      }

      // Animate heading
      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.2
        );
      }

      // Animate words with stagger
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0.3 },
          {
            opacity: 1,
            stagger: 0.02,
            duration: 0.5,
            ease: 'power2.out'
          },
          0.4
        );
      }

      // Animate stat cards
      if (statCards) {
        tl.fromTo(
          statCards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.1
          },
          0.6
        );
      }

      // Animate info cards
      if (infoCards) {
        tl.fromTo(
          infoCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1
          },
          0.8
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = `I'm a passionate Full Stack Developer skilled in Next.js, MERN Stack, PHP, MySQL, JavaScript, and AI/ML, delivering responsive, user-centric web applications. I specialize in RESTful API development, performance optimization, and dynamic UI/UX design, ensuring seamless, high-quality digital experiences. With expertise in Docker, Tailwind CSS, and machine learning frameworks like PyTorch and Keras, I create innovative, efficient solutions, leveraging strong problem-solving and collaborative skills to drive impactful web development outcomes.`;
  const text2 = `Proven expertise in web development, problem-solving, and the application of AI/ML techniques to deliver impactful results.`
  const words = text.split(' ');
  const words2 = text2.split(' ');

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-20 bg-brand-light">
      <div className="layout-grid">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <div className="flex items-center justify-center gap-3 mb-16">
            <p className="about-title heading-96 text-center text-brand-dark font-semibold">About Me</p>
          </div>

          <h2 className="about-heading heading-64 text-brand-dark mb-16 font-bold">
            Full Stack Excellence
          </h2>

          <div className="heading-26 text-brand-dark leading-relaxed mb-10">
            {words.map((word, index) => (
              <span key={index} className="word inline-block mr-2">
                {word}
              </span>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-8">
            <div className="stat-card group relative p-8 bg-brand-light rounded-3xl border border-brand-accent/30 hover:border-brand-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-brand-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h3 className="heading-48 text-brand-dark font-bold mb-2">10+</h3>
                <p className="body-16 text-brand-dark/70 font-medium">Projects Completed</p>
              </div>
            </div>
            <div className="stat-card group relative p-8 bg-brand-light rounded-3xl border border-brand-accent/30 hover:border-brand-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-brand-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h3 className="heading-48 text-brand-dark font-bold mb-2">20+</h3>
                <p className="body-16 text-brand-dark/70 font-medium">Technologies Mastered</p>
              </div>
            </div>
            <div className="stat-card group relative p-8 bg-brand-light rounded-3xl border border-brand-accent/30 hover:border-brand-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-brand-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h3 className="heading-48 text-brand-dark font-bold mb-2">3</h3>
                <p className="body-16 text-brand-dark/70 font-medium">Awards Won</p>
              </div>
            </div>
            <div className="stat-card group relative p-8 bg-brand-light rounded-3xl border border-brand-accent/30 hover:border-brand-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-brand-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h3 className="heading-48 text-brand-dark font-bold mb-2">2023</h3>
                <p className="body-16 text-brand-dark/70 font-medium">B.Tech IT Started</p>
              </div>
            </div>
          </div>

          {/* Recognition */}
          <div className="mt-12 p-4 bg-brand-light rounded-3xl transition-all duration-300">
          <div className="heading-26 text-brand-dark leading-relaxed mt-2 mb-2 font-bold">
            {words2.map((word, index) => (
              <span key={index} className="word inline-block mr-2">
                {word}
              </span>
            ))}
          </div>
          
          </div>
        </div>
      </div>
    </section>
  );
}
