'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project data with Unsplash image URLs
const projects = [
  {
    title: 'CinemaHub - Movie Booking Platform',
    description: 'A full-stack, real-time movie ticket booking application. Features include a rich movie catalog, interactive seat selection, instant booking confirmations, and a responsive UI. Built with Next.js, React, and Firebase, it also integrates real email notifications.',
    technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'Framer Motion', 'Nodemailer'],
    liveUrl: 'http://cinemahub-arif.vercel.app/',
    githubUrl: 'https://github.com/mohammed-arif-23/cinemahub',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'V8 Engine Digital Twin Simulator',
    description: 'A full-stack, real-time digital twin simulator of a V8 engine-powered car. This project features physics-based engine dynamics, an interactive 3D visualization using Three.js, a live telemetry dashboard, and a RESTful backend with persistent state management.',
    technologies: ['Next.js', 'Three.js', 'React Three Fiber', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: 'https://github.com/mohammed-arif-23/digital-twin',
    imageUrl: 'https://images.unsplash.com/photo-1649406458887-2b6561c36a4d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1242',
  },
  {
    title: 'Pixels to Plates',
    description: 'A revolutionary image recognition platform that analyzes food images using advanced machine learning. Built with Django and Keras, it features real-time image processing, nutritional analysis, recipe suggestions, and personalized meal planning with dietary restrictions support.',
    technologies: ['Django', 'Keras', 'Python', 'TensorFlow', 'Flask', 'DenseNet'],
    liveUrl: '#',
    githubUrl: 'https://github.com/mohammed-arif-23/pixelstoplates',
    imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'This Portfolio Website',
    description: 'A modern, interactive portfolio built with Next.js, React, and Tailwind CSS. It features animated backgrounds, 3D effects, sequential scroll animations, and a responsive design. It showcases projects, skills, and experience with a focus on performance and user experience.',
    technologies: ['Next.js','Three.js', 'React', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'Lucide Icons', 'React.Bits', 'GSAP', 'Nodemailer'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'AI Movie Recommender',
    description: 'A Streamlit application that recommends movies based on genre similarity and release year. It uses cosine similarity on the MovieLens dataset to find relevant films, which are then displayed in an organized grid. The app is built with Streamlit, Pandas, and Scikit-learn.',
    technologies: ['Streamlit', 'Pandas', 'NumPy', 'Scikit-learn', 'Python','Machine Learning'],
    liveUrl: 'https://arif-nm-movieapi.streamlit.app/',
    githubUrl: 'https://github.com/mohammed-arif-23/nm-movieapi',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Multi-Digit Handwritten Number Predictor',
    description: 'A deep learning-based web application for recognizing multi-digit handwritten numbers. It uses a CNN model trained on the MNIST dataset, with a Flask backend for inference and an interactive web canvas for user input. The project provides real-time predictions for drawn digits.',
    technologies: ['PyTorch', 'Flask', 'Python', 'CNN', 'HTML', 'CSS', 'JavaScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/mohammed-arif-23/multi-digit-handwritten-number-predictor',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  },
];

export default function FluidProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      const projectCards = section.querySelectorAll('.project-card');
      
      // Set initial states with blur for all elements
      projectCards.forEach((card) => {
        const title = card.querySelector('.project-title');
        const description = card.querySelector('.project-description');
        const techTags = card.querySelectorAll('.tech-tag');
        const buttons = card.querySelectorAll('.project-button');
        const image = card.querySelector('.project-image');
        
        const allElements = [title, description, image, ...Array.from(techTags || []), ...Array.from(buttons || [])].filter(Boolean);
        
        if (allElements.length > 0) {
          gsap.set(allElements, {
            opacity: 0,
            filter: 'blur(10px)',
          });
        }
      });
      
      projectCards.forEach((card, index) => {
        const title = card.querySelector('.project-title');
        const description = card.querySelector('.project-description');
        const techTags = card.querySelectorAll('.tech-tag');
        const buttons = card.querySelectorAll('.project-button');
        const image = card.querySelector('.project-image');

        // Create a timeline for each project card
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
            onEnter: () => setCurrentProject(index),
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

        // Animate image
        if (image) {
          tl.fromTo(
            image,
            { opacity: 0, scale: 0.9, y: 30, filter: 'blur(15px)' },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              filter: 'blur(0px)',
              duration: 0.8, 
              ease: 'power2.out'
            },
            0.3
          );
        }
      });
      
      // Refresh ScrollTrigger to ensure all triggers are properly set up
      ScrollTrigger.refresh();
    }, section);

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#201d1d] py-10">
  
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="project-card relative py-20 lg:py-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div className={`space-y-8 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="space-y-4">
                  <h2 className="project-title text-[#fbfbf2] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
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

              {/* Project Image with Animation */}
              <div className={`relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="rounded-3xl shadow-2xl overflow-hidden project-image">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}