'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Instagram, Mail, MapPin, Briefcase, Download } from 'lucide-react';
import TextType from '@/components/TextType';
import { RippleButton, MorphButton } from '@/components/MicroInteractions';

gsap.registerPlugin(ScrollTrigger);

// MIUX-style text split function
function splitTextIntoSpans(element: HTMLElement) {
  const text = element.textContent || '';
  element.innerHTML = '';
  
  text.split('').forEach((char, index) => {
    const span = document.createElement('div');
    span.style.position = 'relative';
    span.style.display = 'inline-block';
    span.textContent = char === ' ' ? '\u00A0' : char;
    element.appendChild(span);
  });
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states with blur for all elements
      const allElements = [
        greetingRef.current,
        titleRef.current,
        typewriterRef.current,
        descRef.current,
        buttonsRef.current,
        socialRef.current,
        imageRef.current
      ].filter(Boolean);

      gsap.set(allElements, {
        opacity: 0,
        filter: 'blur(10px)',
        y: 30,
        scale: 0.95
      });

      // Animate greeting first
      if (greetingRef.current) {
        gsap.to(greetingRef.current, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out'
        });
      }

      // MIUX-style title animation with text split and blur
      const titleElement = titleRef.current;
      if (titleElement) {
        // First animate the title container
        gsap.to(titleElement, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.out'
        });

        splitTextIntoSpans(titleElement);
        const chars = titleElement.querySelectorAll('div');
        
        gsap.set(chars, { 
          opacity: 0, 
          y: '100%', 
          rotateX: 90,
          transformOrigin: '50% 100%'
        });
        
        gsap.to(chars, {
          opacity: 1,
          y: '0%',
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          delay: 0.6,
          ease: 'power3.out'
        });
      }

      // Animate typewriter section
      if (typewriterRef.current) {
        gsap.to(typewriterRef.current, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.8,
          ease: 'power3.out'
        });
      }

      // Animate description with blur
      if (descRef.current) {
        gsap.to(descRef.current, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 1.1,
          ease: 'power3.out'
        });
      }

      // Animate buttons
      if (buttonsRef.current) {
        gsap.to(buttonsRef.current, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 1.4,
          ease: 'power3.out'
        });
      }

      // Animate social links
      if (socialRef.current) {
        gsap.to(socialRef.current, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 1.7,
          ease: 'power3.out'
        });
      }

      // Animate image with clip-path reveal, blur and parallax
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { 
            opacity: 0, 
            scale: 0.9,
            filter: 'blur(15px)',
            clipPath: 'inset(100% 0% 0% 0%)'
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out',
          }
        );

        // Add parallax effect to image
        gsap.to(imageRef.current, {
          y: '-20%',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mohammed-arif-0ab6402a1',
      color: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/mohammed-arif-23/',
      color: 'hover:text-gray-800'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:mohammedarif2303@gmail.com',
      color: 'hover:text-red-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/mohammedarif__',
      color: 'hover:text-pink-600'
    },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 pb-8 md:py-18 overflow-hidden" aria-label="Hero">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      
      {/* Noise Texture Overlay - Above gradient, below content */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.65] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url(https://www.richardsancho.com/img/noise.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 gap-2  md:gap-10 items-center">
          {/* Image - First on mobile, Left on desktop */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <div
              ref={imageRef}
              className="relative aspect-square lg:aspect-[3/4] rounded-3xl overflow-hidden max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0"
            >
              <img
                src="/images/profile.png"
                alt="Mohammed Arif"
                className="w-full h-full  shadow-3xl object-cover"
              />
           
            </div>
          </div>

          {/* Content - Second on mobile, Right on desktop */}
          <div className="lg:col-span-7 order-2 lg:order-2">
            <p ref={greetingRef} className="body-18 text-brand-dark/70 mb-2 font-medium">Hello, I'm</p>
            <h1
              ref={titleRef}
              className="heading-64 text-brand-dark mb-4 font-cookie leading-tight"
            >
              Mohammed Arif .T
            </h1>
            
            {/* Typing subtitle */}
            <div ref={typewriterRef} className="mb-6 h-12">
              <TextType
                text={[
                  'Full Stack Developer',
                  'Web Development Enthusiast',
                  'UI/UX Advocate',
                  'Problem‑Solving Coder',
                  'AI & ML Architect',
                  'Responsive Design Specialist',
                ]}
                className="text-2xl md:text-3xl text-brand-dark font-semibold"
                cursorClassName="text-2xl md:text-3xl text-black"
                typingSpeed={45}
                deletingSpeed={28}
                pauseDuration={1400}
              />
            </div>

            <div ref={descRef} className="space-y-4 mb-8">
              <p className="body-20 text-brand-dark leading-relaxed">
                Passionate Full Stack Developer specializing in Next.js, MERN Stack, and AI/ML. 
                I craft responsive, innovative web applications with a strong focus on performance, 
                user experience, and cutting-edge technologies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex gap-3 md:gap-4 flex-wrap mb-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-neutral-900 bg-neutral-900 text-white hover:bg-transparent hover:text-neutral-900 transition-all font-semibold"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </a>
              <a
                href="/My_Resume.pdf"
                download
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-brand-dark text-brand-dark bg-transparent overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
              >
                <div className="absolute inset-0 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <Download className="w-5 h-5 relative z-10 group-hover:translate-y-1 group-hover:text-brand-light transition-all duration-300" />
                <span className="relative z-10 group-hover:text-brand-light transition-colors duration-300">
                  <span className="inline-block group-hover:animate-pulse">Download</span> CV
                </span>
                <div className="absolute inset-0 rounded-full bg-brand-accent/20 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
              </a>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-brand-dark/60 uppercase tracking-wider">Connect With Me</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-4 rounded-full border-2 border-brand-dark/20 text-brand-dark bg-brand-light hover:border-brand-dark overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                      aria-label={social.name}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-brand-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Icon className="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-accent/20 to-brand-dark/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10"></div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
