'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download} from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    { left: string; top: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const floating = document.querySelectorAll('.floating-element');
      floating.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = (e.clientX * speed);
        const y = (e.clientY * speed);
        (element as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Generate random positions and delays for particles on the client only
    const generated = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
    }));
    setParticles(generated);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div ref={heroRef} className="relative z-10 text-center px-4 max-w-5xl">

        <div className="mb-8 mt-12  flex justify-center opacity-0 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <img src="/images/profile.jpg" alt="Profile" className="w-72 h-72 rounded-full border-4 shadow-lg border-blue-400" />
        </div>

        <div className="relative transform-3d">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent opacity-0 animate-fade-in-up">
            T Mohammed Arif
          </h1>
          <div className="text-2xl md:text-3xl text-gray-300 mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Full Stack Web Developer
          </div>
       
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Crafting immersive digital experiences with cutting-edge technologies. 
            Specialized in creating scalable web applications that push the boundaries of modern web development.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover-lift-3d overflow-hidden">
            <span className="relative z-10 flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <a href='https://wa.me/+917904645033'>
              <span>Get In Touch</span>
              </a>
              
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button  className="group relative px-8 py-4 glass-morphism rounded-full text-white font-medium hover-lift-3d border border-white/20 hover:border-white/40">
           <a href='My_Resume.pdf'>
            <span className="flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </span>
           </a>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <a 
            href="mailto:mohammedarif2303@gmail.com" 
            className="group relative p-4 glass-morphism rounded-full hover-lift-3d animate-pulse-glow"
          >
            <Mail className="w-6 h-6 text-white group-hover:text-blue-300 transition-colors" />
          </a>
          <a 
            href="https://github.com/mohammed-arif-23/" 
            className="group relative p-4 glass-morphism rounded-full hover-lift-3d animate-pulse-glow"
            style={{ animationDelay: '0.5s' }}
          >
            <Github className="w-6 h-6 text-white group-hover:text-blue-300 transition-colors" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mohammed-arif-0ab6402a1" 
            className="group relative p-4 glass-morphism rounded-full hover-lift-3d animate-pulse-glow"
            style={{ animationDelay: '1s' }}
          >
            <Linkedin className="w-6 h-6 text-white group-hover:text-blue-300 transition-colors" />
          </a>
        </div>

        
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute top-1/4 left-10 floating-element">
        <div className="w-6 h-6 bg-blue-400/60 rounded-lg rotate-45 animate-spin-slow"></div>
      </div>
      <div className="absolute top-1/3 right-20 floating-element">
        <div className="w-8 h-8 bg-purple-400/60 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 floating-element">
        <div className="w-5 h-5 bg-pink-400/60 rounded-full animate-bounce"></div>
      </div>
      <div className="absolute top-2/3 right-1/3 floating-element">
        <div className="w-4 h-4 bg-cyan-400/60 rounded-lg animate-pulse"></div>
      </div>
    </section>
  );
}