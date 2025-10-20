'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
   title: 'CinemaHub - Movie Booking Platform',
   description: 'A full-stack, real-time movie ticket booking application. Features include a rich movie catalog, interactive seat selection, instant booking confirmations, and a responsive UI. Built with Next.js, React, and Firebase, it also integrates real email notifications.',
   technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'Framer Motion', 'Nodemailer'],
   liveUrl: 'http://cinemahub-arif.vercel.app/',
   githubUrl: 'https://github.com/mohammed-arif-23/cinemahub',
 },
 {
   title: 'V8 Engine Digital Twin Simulator',
   description: 'A full-stack, real-time digital twin simulator of a V8 engine-powered car. This project features physics-based engine dynamics, an interactive 3D visualization using Three.js, a live telemetry dashboard, and a RESTful backend with persistent state management.',
   technologies: ['Next.js', 'Three.js', 'React Three Fiber', 'MongoDB', 'Node.js', 'Tailwind CSS'],
   liveUrl: '#',
   githubUrl: 'https://github.com/mohammed-arif-23/digital-twin',
 },
 {
   title: 'Pixels to Plates',
   description: 'A revolutionary image recognition platform that analyzes food images using advanced machine learning. Built with Django and Keras, it features real-time image processing, nutritional analysis, recipe suggestions, and personalized meal planning with dietary restrictions support.',
   technologies: ['Django', 'Keras', 'Python', 'TensorFlow', 'Flask', 'DenseNet'],
   liveUrl: '#',
   githubUrl: 'https://github.com/mohammed-arif-23/pixelstoplates',
 },
 {
   title: 'This Portfolio Website',
   description: 'A modern, interactive portfolio built with Next.js, React, and Tailwind CSS. It features animated backgrounds, 3D effects, sequential scroll animations, and a responsive design. It showcases projects, skills, and experience with a focus on performance and user experience.',
   technologies: ['Next.js','Three.js', 'React', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'Lucide Icons', 'React.Bits', 'GSAP', 'Nodemailer'],
   liveUrl: '#',
   githubUrl: '#',
 },

 {
   title: 'AI Movie Recommender',
   description: 'A Streamlit application that recommends movies based on genre similarity and release year. It uses cosine similarity on the MovieLens dataset to find relevant films, which are then displayed in an organized grid. The app is built with Streamlit, Pandas, and Scikit-learn.',
   technologies: ['Streamlit', 'Pandas', 'NumPy', 'Scikit-learn', 'Python','Machine Learning'],
   liveUrl: 'https://arif-nm-movieapi.streamlit.app/',
   githubUrl: 'https://github.com/mohammed-arif-23/nm-movieapi',
 },
 {
   title: 'Multi-Digit Handwritten Number Predictor',
   description: 'A deep learning-based web application for recognizing multi-digit handwritten numbers. It uses a CNN model trained on the MNIST dataset, with a Flask backend for inference and an interactive web canvas for user input. The project provides real-time predictions for drawn digits.',
   technologies: ['PyTorch', 'Flask', 'Python', 'CNN', 'HTML', 'CSS', 'JavaScript'],
   liveUrl: '#',
   githubUrl: 'https://github.com/mohammed-arif-23/multi-digit-handwritten-number-predictor',
 },
];
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    
    if (!section || !pinContainer) return;

    let ctx = gsap.context(() => {
      const slides = pinContainer.querySelectorAll('.project-slide');
      
      // Set initial states with blur for all elements
      slides.forEach((slide) => {
        const title = slide.querySelector('.project-title');
        const description = slide.querySelector('.project-description');
        const techTags = slide.querySelectorAll('.tech-tag');
        const buttons = slide.querySelectorAll('.project-button');
        const visualElement = slide.querySelector('.project-visual');
        
        const allElements = [title, description, visualElement, ...Array.from(techTags || []), ...Array.from(buttons || [])].filter(Boolean);
        
        if (allElements.length > 0) {
          gsap.set(allElements, {
            opacity: 0,
            filter: 'blur(10px)',
          });
        }
      });
      
      slides.forEach((slide, index) => {
        const title = slide.querySelector('.project-title');
        const description = slide.querySelector('.project-description');
        const techTags = slide.querySelectorAll('.tech-tag');
        const buttons = slide.querySelectorAll('.project-button');
        const visualElement = slide.querySelector('.project-visual');

        // Create a timeline for each slide
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: 'top 80%',
            end: 'bottom 40%',
            toggleActions: 'play none none none',
            onEnter: () => setCurrentProject(index),
            onEnterBack: () => setCurrentProject(index),
          },
        });

        // Animate title
        if (title) {
          tl.fromTo(
            title,
            { opacity: 0, y: 50, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
            0
          );
        }

        // Animate description
        if (description) {
          tl.fromTo(
            description,
            { opacity: 0, y: 30, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
            0.2
          );
        }

        // Animate tech tags with stagger
        if (techTags.length > 0) {
          tl.fromTo(
            techTags,
            { opacity: 0, scale: 0.8, y: 20, filter: 'blur(10px)' },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              filter: 'blur(0px)',
              duration: 0.4, 
              ease: 'back.out(1.7)',
              stagger: 0.05
            },
            0.4
          );
        }

        // Animate buttons
        if (buttons.length > 0) {
          tl.fromTo(
            buttons,
            { opacity: 0, x: -20, filter: 'blur(10px)' },
            { 
              opacity: 1, 
              x: 0, 
              filter: 'blur(0px)',
              duration: 0.5, 
              ease: 'power2.out',
              stagger: 0.1
            },
            0.6
          );
        }

        // Animate visual element
        if (visualElement) {
          tl.fromTo(
            visualElement,
            { opacity: 0, scale: 0.9, rotate: -5, filter: 'blur(10px)' },
            { 
              opacity: 1, 
              scale: 1, 
              rotate: 0, 
              filter: 'blur(0px)',
              duration: 0.8, 
              ease: 'power2.out'
            },
            0.3
          );
        }
      });
    }, section);

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#201d1d] py-5">
      <div ref={pinContainerRef} className="relative w-full">
   
        {/* Project Slides */}
        <div className="relative">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-slide relative flex items-center justify-center py-12 md:py-20 lg:min-h-screen"
            >
              <div className="w-full flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-20">
                <div className="max-w-6xl w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Column - Project Info */}
                    <div className="space-y-6 lg:space-y-8">
                      <div className="space-y-4">
                        <h2 className="project-title text-[#fbfbf2] text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-tight">
                          {project.title}
                        </h2>
                      </div>
                      
                      <p className="project-description text-[#fbfbf2]/80 text-base sm:text-lg md:text-xl leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="tech-tag px-4 py-2 bg-[#cfd2cd]/10 border border-[#cfd2cd]/30 text-[#fbfbf2] text-sm font-semibold rounded-full hover:bg-[#cfd2cd]/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-button group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fbfbf2] text-[#201d1d] text-lg font-bold rounded-full hover:bg-[#cfd2cd] transition-all duration-300 hover:scale-105"
                          >
                            View Live
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-button group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#fbfbf2] text-[#fbfbf2] text-lg font-bold rounded-full hover:bg-[#fbfbf2] hover:text-[#201d1d] transition-all duration-300 hover:scale-105"
                          >
                            Source Code
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Visual Element */}
                    <div className="project-visual relative hidden lg:block">
                      <div className="aspect-square bg-gradient-to-br from-[#cfd2cd]/20 to-[#fbfbf2]/10 rounded-3xl border border-[#cfd2cd]/30 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-24 h-24 mx-auto bg-[#fbfbf2]/10 rounded-2xl flex items-center justify-center">
                            <span className="text-4xl font-bold text-[#fbfbf2]">{String(index + 1).padStart(2, '0')}</span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-[#fbfbf2] text-2xl font-bold">{project.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}
