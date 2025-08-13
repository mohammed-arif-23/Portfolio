'use client';

import { ExternalLink, Github, Zap, Eye, Code, Sparkles } from 'lucide-react';
import { ScrollReveal, TextSplit, Float } from '@/components/reactbits';
import { forwardRef } from 'react';
import FadeSlideIn from './reactbits/FadeSlideIn';

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

const Projects = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal duration={1.5} stagger={0.2} start="top 90%">
            <TextSplit 
              className="text-5xl md:text-6xl font-bold mb-4 text-white"
              animation="words"
              stagger={0.1}
              duration={1}
            >
              Featured Projects
            </TextSplit>
          </ScrollReveal>
          
          <ScrollReveal duration={1.5} stagger={0.2} start="top 90%" delay={0.2}>
            <TextSplit 
              className="text-xl text-gray-400 max-w-4xl mx-auto"
              animation="words"
              stagger={0.05}
              duration={0.8}
            >
              My recent projects showcase my skills in full-stack development, AI, and web technologies. Each project is a testament to my ability to create innovative solutions that solve real-world problems.
                          </TextSplit>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
          {projects.map((project, index) => (
            <FadeSlideIn key={index} x={index % 2 === 0 ? -48 : 48} duration={900} delay={index * 120}>
              <ScrollReveal animation="scale" duration={1.5} delay={index * 0.1} stagger={0.2} start="top 90%" className="h-full">
                <Float y={0} duration={4} delay={index * 0.2} className="h-full">
                  <div className="glass-morphism-strong glass-dim rounded-3xl hover-lift-3d h-full flex flex-col justify-between transition-all duration-300">
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-center space-x-3 mb-4">
                        <Code className="w-6 h-6 text-white" />
                        <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <TextSplit 
                        className="text-lg text-gray-300 mb-6 leading-relaxed"
                        animation="words"
                        stagger={0.02}
                        duration={0.8}
                      >
                        {project.description}
                      </TextSplit>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-white/10 text-white rounded-full text-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-auto">
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            className="glass-morphism glass-dim btn-glass flex items-center justify-center space-x-2 group px-6 py-3 rounded-full transition-all duration-300"
                          >
                            <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>View Live</span>
                          </a>
                        )}
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <a
                            href={String(project.githubUrl)}
                            className="glass-morphism glass-dim btn-glass flex items-center justify-center space-x-2 group px-6 py-3 rounded-full transition-all duration-300"
                          >
                            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Float>
              </ScrollReveal>
            </FadeSlideIn>
          ))}
        </div>
      </div>
    </section>
  );
});
Projects.displayName = 'Projects';

export default Projects;
