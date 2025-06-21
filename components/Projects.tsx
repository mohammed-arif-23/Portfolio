'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Zap, Eye, Code, Sparkles } from 'lucide-react';
import { useSequentialScrollAnimation } from '../hooks/useSequentialScrollAnimation';


const projects = [
  {
    title: 'AVS Engineering College 🏫✨',
    description: '🚀 Developed a full-stack college website with robust REST APIs for seamless frontend & backend integration. ⚡ Improved UI responsiveness and implemented new SEO-friendly designs to boost user experience and search engine visibility. 🔍📈',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'UI/UX Design', 'SEO' , 'PHP', 'MySQL', 'Bootstrap','AJAX'],
    liveUrl: 'https://www.avsenggcollege.ac.in/',
    githubUrl: 0,
  },
  {
    title: 'AVS College of Arts and Science 🎨📚',
    description: '💡 Specialized in frontend web development, significantly reducing load times by optimizing HTML, CSS, and JavaScript code. 📱 Applied responsive design for seamless mobile experiences and enhanced interactivity using AJAX for dynamic content loading. ⚡',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'AJAX', 'Responsive Design', 'PHP', 'MySQL', 'Bootstrap'],
    liveUrl: 'https://www.avscollegeomalur.edu.in/',
    githubUrl: 0,
  },
  {
    title: "Sakthi Kailash Women's College 👩‍🎓🌐",
    description: '🛠️ Developed and deployed full-stack web solutions using PHP, MySQL, and JavaScript. 🔗 Built robust RESTful APIs for frontend-backend integration and optimized database queries for better performance. 🤝 Collaborated with UI/UX teams to design responsive layouts for an improved user experience.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'RESTful APIs', 'HTML', 'CSS', 'Bootstrap'],
    liveUrl: 'https://www.sakthikailashcollege.org/',
    githubUrl: 0,
  },


  {
    title: 'Pixels to Plates 🍲🤖',
    description: '📸 Revolutionary image recognition platform that analyzes food images using advanced machine learning. 🧠 Built with Django and Keras, featuring real-time image processing, nutritional analysis, recipe suggestions, and personalized meal planning with dietary restrictions support. 🥗',
    technologies: ['Django', 'Keras', 'Python', 'TensorFlow', 'OpenCV', 'PostgreSQL', 'Flask' , 'DenseNet'],
    liveUrl: '#',
    githubUrl: 0,
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

export default function Projects() {
  const [particles, setParticles] = useState<
    { left: string; top: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
    }));
    setParticles(generated);
  }, []);

  useSequentialScrollAnimation();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Innovative solutions that demonstrate expertise in cutting-edge development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card animate-on-scroll opacity-0 liquid-glass-card rounded-3xl hover-lift-3d flex flex-col justify-between"
            >
              <div className="p-2 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                {/* Technologies */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 card-3d"
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
                    className="liquid-glass-btn flex items-center justify-center space-x-2 group"
                  >
                    <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>View Live</span>
                  </a>
                  )}
                    {project.githubUrl && project.githubUrl !== 0 && project.githubUrl !== '#' && (
                  <a
                    href={String(project.githubUrl)}
                    className="liquid-glass-btn flex items-center justify-center space-x-2 group"
                  >
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Source Code</span>
                  </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}