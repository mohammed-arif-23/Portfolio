'use client';

import { ExternalLink, Github, Zap, Eye, Code, Sparkles } from 'lucide-react';
import { ScrollReveal, TextSplit, Float } from '@/components/reactbits';
import { forwardRef } from 'react';
import FadeSlideIn from './reactbits/FadeSlideIn';

const projects = [
  {
    title: 'AVS Engineering College 🏫✨',
    description: '🚀 Developed a full-stack college website with robust REST APIs for seamless frontend & backend integration. ⚡ Improved UI responsiveness and implemented new SEO-friendly designs to boost user experience and search engine visibility. 🔍📈',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'UI/UX Design', 'SEO' , 'PHP', 'MySQL', 'Bootstrap','AJAX'],
    liveUrl: 'https://www.avsenggcollege.ac.in/',
    githubUrl: '#',
  },
  {
    title: 'AVS College of Arts and Science 🎨📚',
    description: '💡 Specialized in frontend web development, significantly reducing load times by optimizing HTML, CSS, and JavaScript code. 📱 Applied responsive design for seamless mobile experiences and enhanced interactivity using AJAX for dynamic content loading. ⚡',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'AJAX', 'Responsive Design', 'PHP', 'MySQL', 'Bootstrap'],
    liveUrl: 'https://www.avscollegeomalur.edu.in/',
    githubUrl: '#',
  },
  {
    title: "Sakthi Kailash Women's College 👩‍🎓🌐",
    description: '🛠️ Developed and deployed full-stack web solutions using PHP, MySQL, and JavaScript. 🔗 Built robust RESTful APIs for frontend-backend integration and optimized database queries for better performance. 🤝 Collaborated with UI/UX teams to design responsive layouts for an improved user experience.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'RESTful APIs', 'HTML', 'CSS', 'Bootstrap'],
    liveUrl: 'https://www.sakthikailashcollege.org/',
    githubUrl: '#',
  },
  {
    title: 'Pixels to Plates 🍲🤖',
    description: '📸 Revolutionary image recognition platform that analyzes food images using advanced machine learning. 🧠 Built with Django and Keras, featuring real-time image processing, nutritional analysis, recipe suggestions, and personalized meal planning with dietary restrictions support. 🥗',
    technologies: ['Django', 'Keras', 'Python', 'TensorFlow', 'OpenCV', 'PostgreSQL', 'Flask' , 'DenseNet'],
    liveUrl: '#',
    githubUrl: 'https://github.com/mohammed-arif-23/pixelstoplates',
  },
  {
    title: 'This Portfolio Website 🌐✨',
    description: '🎨 A modern, interactive portfolio built with Next.js, React, and Tailwind CSS. 🌈 Features animated backgrounds, 3D effects, sequential scroll animations, and a responsive design. 🚀 Showcases projects, skills, and experience with a focus on performance and user experience.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'Lucide Icons', 'Shadcn UI','Radix UI'],
    liveUrl: '/',
    githubUrl: 'https://github.com/mohammed-arif-23/portfolio',
  },
  {
    title: 'E-commerce Platform 🛒💳',
    description: '🛍️ A comprehensive online store featuring Next.js, React, Firebase, and Tailwind CSS. 🔄 Includes Google OAuth integration for secure login, real-time cart synchronization across devices, user authentication, shopping cart persistence, order tracking, and a modern responsive design with smooth animations. 📦📊',
    technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS' , 'OAuth','Node.js'],
    liveUrl: 'https://e-comm-store-arif.vercel.app/',
    githubUrl: 'https://github.com/mohammed-arif-23/shopping'
  }
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
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              animation="words"
              stagger={0.05}
              duration={0.8}
            >
              Innovative solutions that demonstrate expertise in cutting-edge development
            </TextSplit>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
          {projects.map((project, index) => (
            <FadeSlideIn key={index} x={index % 2 === 0 ? -48 : 48} duration={900} delay={index * 120}>
              <ScrollReveal animation="scale" duration={1.5} delay={index * 0.1} stagger={0.2} start="top 90%" className="h-full">
                <Float y={0} duration={4} delay={index * 0.2} className="h-full">
                  <div className="glass-morphism-strong rounded-3xl hover-lift-3d h-full flex flex-col justify-between transition-all duration-300">
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-center space-x-3 mb-4">
                        <Code className="w-6 h-6 text-white" />
                        <h3 className="text-3xl font-bold text-white group-hover:text-gray-300 transition-colors">
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
                            className="glass-morphism flex items-center justify-center space-x-2 group px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/10"
                          >
                            <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>View Live</span>
                          </a>
                        )}
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <a
                            href={String(project.githubUrl)}
                            className="glass-morphism flex items-center justify-center space-x-2 group px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/10"
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