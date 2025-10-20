'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CinemaHub',
    category: 'Movie Booking Platform',
    description: 'A full-stack, real-time movie ticket booking application with interactive seat selection and instant confirmations.',
    technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'Framer Motion', 'Nodemailer'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 2,
    title: 'V8 Engine Digital Twin',
    category: 'Simulator',
    description: 'Real-time digital twin simulator of a V8 engine-powered car with physics-based dynamics and 3D visualization.',
    technologies: ['Next.js', 'Three.js', 'React Three Fiber', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    sourceUrl: '#',
  },
  {
    id: 3,
    title: 'Pixels to Plates',
    category: 'AI/ML Platform',
    description: 'Revolutionary image recognition platform that analyzes food images using advanced machine learning.',
    technologies: ['Django', 'Keras', 'Python', 'TensorFlow', 'Flask', 'DenseNet'],
    sourceUrl: '#',
  },
  {
    id: 4,
    title: 'AI Movie Recommender',
    category: 'Machine Learning',
    description: 'Streamlit application that recommends movies based on genre similarity using cosine similarity.',
    technologies: ['Streamlit', 'Pandas', 'NumPy', 'Scikit-learn', 'Python', 'Machine Learning'],
    liveUrl: '#',
    sourceUrl: '#',
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const tracker = trackerRef.current;
    
    if (!section || !pinContainer || !tracker) return;

    const images = pinContainer.querySelectorAll('.project-image');
    const titles = pinContainer.querySelectorAll('.project-title');
    const circle = tracker.querySelector('.progress-circle path:last-child') as SVGPathElement;

    if (!circle) return;

    const circleLength = circle.getTotalLength();
    circle.style.strokeDasharray = `${circleLength}`;
    circle.style.strokeDashoffset = `${circleLength}`;

    // Horizontal scroll pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate images with clip-path
    images.forEach((img, index) => {
      if (index === 0) {
        tl.fromTo(
          img,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' },
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', duration: 1 },
          index * 1
        );
      } else {
        tl.fromTo(
          img,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', duration: 1 },
          index * 1
        );
      }
    });

    // Animate titles
    titles.forEach((title, index) => {
      tl.fromTo(
        title,
        { y: '100%' },
        { y: index === titles.length - 1 ? '0%' : '-100%', duration: 0.5 },
        index * 1 + 0.5
      );
    });

    // Progress circle
    tl.to(
      circle,
      {
        strokeDashoffset: 0,
        ease: 'none',
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-brand-dark">
      <div ref={pinContainerRef} className="relative w-full h-screen overflow-hidden">
        {/* Images Stack */}
        <div className="absolute inset-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-image absolute inset-0"
              style={{
                clipPath: index === 0 ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${
                    index % 2 === 0 ? '#667eea, #764ba2' : '#f093fb, #f5576c'
                  })`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Info Overlay */}
        <div ref={trackerRef} className="absolute bottom-20 left-20 z-10 flex items-end gap-8">
          {/* Progress Circle */}
          <div className="progress-circle relative w-32 h-32">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 50,5 A 45,45 0 1,1 49.999,5"
                stroke="#23abff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-brand-light body-20">/ {projects.length}</span>
            </div>
          </div>

          {/* Titles Carousel */}
          <div className="overflow-hidden h-16">
            {projects.map((project) => (
              <h2
                key={project.id}
                className="project-title heading-48 text-brand-light whitespace-nowrap"
              >
                {project.title}
              </h2>
            ))}
          </div>
        </div>

        {/* Featured Work Label */}
        <div className="absolute top-20 left-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brand-ac-2" />
            <p className="body-20 text-brand-light">Featured Work</p>
          </div>
        </div>
      </div>
    </section>
  );
}
