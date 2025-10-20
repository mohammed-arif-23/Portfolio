'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: 'Current',
    title: 'Full Stack Web Developer',
    company: 'AVS and Sakthi Kailash Educational Institutions',
    location: 'Salem',
    achievements: [
      'Developed and deployed web-based solutions utilizing PHP, MySQL, and JavaScript',
      'Built RESTful APIs to integrate frontend functionality with backend logic',
      'Optimized database queries, enhancing overall system performance by 40%',
      'Reduced load times by 60% through optimizing SSR and caching strategies',
      'Applied responsive design techniques for seamless mobile device experience',
      'Enhanced interactivity using AJAX for dynamic content loading',
      'Implemented modern CSS animations and transitions',
      'Developed custom CMS solutions for content management',
      'Collaborated with UI/UX team to design responsive layouts that improved user experience',
    ],
    skills: ['PHP', 'MySQL', 'JavaScript', 'RESTful APIs', 'Performance Optimization', 'HTML5', 'CSS3', 'AJAX', 'Responsive Design', 'SEO'],
    links: [
      { label: 'AVS Engineering College', url: '#' },
      { label: 'Shri Sakthikailassh Women\'s College', url: '#' },
      { label: 'AVS Arts and Science Omalur', url: '#' },
    ],
  },
];

const awards = [
  {
    year: '2024',
    title: 'Competition on Web Development',
    description: '1st place at national level technical symposium by KSR College of Technology',
  },
  {
    year: '2024',
    title: 'Competition on Code Debugging',
    description: '1st place at national-level technical symposium by Mahendra Institutions of Technology',
  },
  {
    year: '2023',
    title: 'Hackathon Team Leader',
    description: 'Led a team of six in the Smart India Hackathon',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const experienceCards = sectionRef.current?.querySelectorAll('.experience-card');
      const awardCards = sectionRef.current?.querySelectorAll('.award-card');
      
      // Animate experience cards with individual elements
      if (experienceCards) {
        // Set initial states with blur for all elements
        experienceCards.forEach((card) => {
          const title = card.querySelector('.exp-title');
          const company = card.querySelector('.exp-company');
          const achievementItems = card.querySelectorAll('.achievement-item');
          const skillTags = card.querySelectorAll('.skill-tag');
          const linkButtons = card.querySelectorAll('.link-button');
          
          const allElements = [title, company, ...Array.from(achievementItems || []), ...Array.from(skillTags || []), ...Array.from(linkButtons || [])].filter(Boolean);
          
          if (allElements.length > 0) {
            gsap.set(allElements, {
              opacity: 0,
              filter: 'blur(10px)',
            });
          }
        });
        
        experienceCards.forEach((card) => {
          const title = card.querySelector('.exp-title');
          const company = card.querySelector('.exp-company');
          const achievementItems = card.querySelectorAll('.achievement-item');
          const skillTags = card.querySelectorAll('.skill-tag');
          const linkButtons = card.querySelectorAll('.link-button');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 30%',
              toggleActions: 'play none none none',
            },
          });

          // Animate title
          if (title) {
            tl.fromTo(
              title,
              { opacity: 0, y: 40, filter: 'blur(10px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
              0
            );
          }

          // Animate company
          if (company) {
            tl.fromTo(
              company,
              { opacity: 0, y: 20, filter: 'blur(10px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
              0.1
            );
          }

          // Animate achievement items with stagger
          if (achievementItems.length > 0) {
            tl.fromTo(
              achievementItems,
              { opacity: 0, x: -20, filter: 'blur(10px)' },
              { 
                opacity: 1, 
                x: 0, 
                filter: 'blur(0px)',
                duration: 0.5, 
                ease: 'power2.out',
                stagger: 0.08
              },
              0.3
            );
          }

          // Animate skill tags with stagger
          if (skillTags.length > 0) {
            tl.fromTo(
              skillTags,
              { opacity: 0, scale: 0.8, y: 15, filter: 'blur(10px)' },
              { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                filter: 'blur(0px)',
                duration: 0.4, 
                ease: 'back.out(1.7)',
                stagger: 0.04
              },
              0.5
            );
          }

          // Animate link buttons
          if (linkButtons.length > 0) {
            tl.fromTo(
              linkButtons,
              { opacity: 0, y: 20, filter: 'blur(10px)' },
              { 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)',
                duration: 0.5, 
                ease: 'power2.out',
                stagger: 0.1
              },
              0.7
            );
          }
        });
      }

      // Animate award cards
      if (awardCards) {
        // Set initial states with blur for all elements
        awardCards.forEach((card) => {
          const year = card.querySelector('.award-year');
          const title = card.querySelector('.award-title');
          const description = card.querySelector('.award-description');
          
          const allElements = [year, title, description].filter(Boolean);
          
          gsap.set(allElements, {
            opacity: 0,
            filter: 'blur(10px)',
          });
        });
        
        awardCards.forEach((card) => {
          const year = card.querySelector('.award-year');
          const title = card.querySelector('.award-title');
          const description = card.querySelector('.award-description');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 40%',
              toggleActions: 'play none none none',
            },
          });

          if (year) {
            tl.fromTo(
              year,
              { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
              { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'back.out(1.7)' },
              0
            );
          }

          if (title) {
            tl.fromTo(
              title,
              { opacity: 0, y: 20, filter: 'blur(10px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
              0.2
            );
          }

          if (description) {
            tl.fromTo(
              description,
              { opacity: 0, y: 15, filter: 'blur(10px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
              0.4
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 px-4 md:px-8 lg:px-20 bg-[#201d1d]">
      <div className="layout-grid">
        <div className="col-span-12">
          <div className="flex items-center justify-center gap-3 mb-16">
            <p className="heading-96 text-center text-[#fbfbf2] font-semibold">Experience</p>
          </div>

          <h2 className="text-2xl text-[#fbfbf2] mb-10 font-bold text-center">
            Building innovative solutions and winning competitions through dedication and expertise.
          </h2>
          <p className="body-20 text-[#fbfbf2]/80 mb-2 max-w-3xl mx-auto text-center">Professional Journey</p>

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card mb-16 p-6 md:p-12 bg-[#201d1d] rounded-3xl hover:shadow-3xl transition-all duration-300">
              <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <div className="mb-6">
              
                  <h3 className="exp-title text-[#fbfbf2] text-4xl md:text-4xl font-bold mb-6">{exp.title}</h3>
                  <p className="exp-company text-[#cfd2cd] text-md font-semibold mb-2">{exp.company}</p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-[#fbfbf2] text-2xl font-bold mb-8">Key Achievements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="achievement-item flex items-start gap-4 p-2 rounded-2xl hover:bg-[#fbfbf2]/10 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#cfd2cd] mt-2 flex-shrink-0" />
                        <p className="text-[#fbfbf2]/90 text-base leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-[#fbfbf2] text-2xl font-bold mb-8">Technologies & Skills</h4>
                  <div className="flex flex-wrap items-start justify-start gap-3">
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag px-6 py-3 bg-[#cfd2cd]/10 border border-[#cfd2cd]/30 text-[#fbfbf2] text-xs font-bold rounded-full hover:bg-[#cfd2cd]/20 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {exp.links.length > 0 && (
                  <div className="pt-8 border-t border-[#cfd2cd]/20">
                    <h4 className="text-[#fbfbf2] text-xl font-bold mb-6">Live Projects</h4>
                    <div className="flex flex-wrap justify-start gap-4 lg:gap-2">
                      {exp.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-button group inline-flex lg:w-auto w-full justify-center items-center gap-2 px-8 py-4 bg-[#fbfbf2] text-[#201d1d] text-sm font-bold rounded-full hover:bg-[#cfd2cd] transition-all duration-300 hover:scale-105"
                        >
                          {link.label}
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Awards Section */}
          <div className="mt-6">
            <h3 className="heading-48 text-[#fbfbf2] mb-8 font-bold">Awards & Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <div key={index} className="award-card p-4 md:p-8 border-1 border-[#cfd2cd]/30 rounded-3xl bg-[#2a2626] hover:bg-[#fbfbf2]/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="award-year inline-block px-5 py-2.5 bg-[#cfd2cd] text-[#201d1d] body-14 font-bold rounded-full mb-6">
                    {award.year}
                  </span>
                  <h4 className="award-title heading-26 text-[#fbfbf2] mb-4 font-bold">{award.title}</h4>
                  <p className="award-description body-18 text-[#fbfbf2]/90 leading-relaxed">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
