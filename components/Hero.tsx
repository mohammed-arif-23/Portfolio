'use client';

import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { gsap } from 'gsap';
import { TextType, TextPressure } from '@/components/reactbits';

const subtitles = [
  'Full Stack Developer',
  'Creative Coder',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Tech Innovator'
];

export default function Hero({ startAnimation }: { startAnimation: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial animation state
    gsap.set('.hero-anim', { opacity: 0, filter: 'blur(10px)' });
  }, []);

  useEffect(() => {
    if (startAnimation) {
      // Main hero animation
      gsap.to('.hero-anim', {
        duration: 2,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power3.out',
        stagger: 0.2,
      });
    }
  }, [startAnimation]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={heroRef} className="relative z-10 text-center px-4 max-w-5xl">
        <div className="mb-8 mt-12 flex justify-center hero-anim">
          <img
            src="/images/profile.jpg"
            alt="Profile"
            className="w-72 h-72 rounded-full border-4 shadow-lg border-white/20 glass-morphism"
          />
        </div>

        <div className="relative">
          <TextPressure className="text-6xl md:text-8xl font-bold mb-6 text-white hero-anim">
            I'm Mohammed Arif
          </TextPressure>
          <div className="text-2xl md:text-3xl text-gray-300 mb-4 hero-anim h-12">
            <TextType 
              strings={subtitles}
              wrapperClassName="text-2xl md:text-3xl text-gray-300"
              cursorClassName="text-2xl md:text-3xl text-gray-300"
            />
          </div>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed hero-anim">
            Specialized in creating scalable web applications that push the boundaries of modern web
            development.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10 hero-anim">
          <button className="group relative px-8 py-4 bg-white text-black rounded-full font-medium hover-lift-3d overflow-hidden transition-all duration-300 hover:bg-gray-100">
            <span className="relative z-10 flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <a href="https://wa.me/+917904645033">
                <span>Get In Touch</span>
              </a>
            </span>
          </button>
          <button className="group relative px-8 py-4 glass-morphism rounded-full text-white font-medium hover-lift-3d border border-white/20 hover:border-white/40 transition-all duration-300">
            <a href="My_Resume.pdf">
              <span className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </span>
            </a>
          </button>
        </div>

        <div className="flex justify-center space-x-6 mb-1 hero-anim">
          <a
            href="mailto:mohammedarif2303@gmail.com"
            className="group relative p-4 glass-morphism rounded-full hover-lift-3d transition-all duration-300 hover:bg-white/10"
          >
            <Mail className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors" />
          </a>
          <a
            href="https://github.com/mohammed-arif-23/"
            className="group relative p-4 glass-morphism rounded-full hover-lift-3d transition-all duration-300 hover:bg-white/10"
          >
            <Github className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-arif-0ab6402a1"
            className="group relative p-4 glass-morphism rounded-full hover-lift-3d transition-all duration-300 hover:bg-white/10"
          >
            <Linkedin className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}