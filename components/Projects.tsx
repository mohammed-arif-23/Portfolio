'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: "01",
        title: "AVSEC",
        category: "College Website",
        year: "2024",
        img: "/images/project-thumb-avsengg.png",
        description: "Official website of AVS Engineering College featuring high-performance architecture and modern design in Tamil Nadu Zone",
        stack: ["PHP", "MySQL", "Vanilla HTML and CSS"],
        link: "https://www.avsenggcollege.ac.in/",
        githubUrl: "#",
        color: "#0a0a0a"
    },
    {
        id: "02",
        title: "SSWC",
        category: "College Website",
        year: "2024",
        img: "/images/project-thumb-sswc.png",
        description: "Modern website for Sakthi Kailash Women's College showcasing courses, departments, admissions, and campus information with mobile-first design.",
        stack: ["PHP", "MySQL", "Vanilla HTML and CSS"],
        link: "https://www.sakthikailashcollege.org/",
        githubUrl: "#",
        color: "#050505"
    },
    {
        id: "03",
        title: "AVS Omalur",
        category: "College Website",
        year: "2024",
        img: "/images/project-thumb-avsomalur.png",
        description: "Production-ready college website for AVS Arts and Science College, Omalur featuring academic programs, events, notices, and user-friendly navigation for students and faculty.",
        stack: ["PHP", "MySQL", "Vanilla HTML and CSS"],
        link: "https://www.avscollegeomalur.edu.in/",
        githubUrl: "#",
        color: "#000000"
    },
    {
        id: "04",
        title: "CinemaHub",
        category: "Movie Booking Platform",
        year: "2024",
        img: "images/project-thumb-1.png",
        description: "Real-time movie ticket booking platform with interactive seat selection and automated email notifications.",
        stack: ["Next.js", "React", "Node.js", "Express"],
        link: "http://cinemahub-arif.vercel.app/",
        githubUrl: "https://github.com/mohammed-arif-23/cinemahub",
        color: "#080808"
    },
    {
        id: "05",
        title: "Pixels to Plates",
        category: "AI Food Analysis",
        year: "2023",
        img: "/images/project-thumb-pixels-to-plates.png",
        description: "Machine learning platform for food recognition and nutritional analysis using computer vision.",
        stack: ["Python", "TensorFlow", "OpenCV", "Keras"],
        link: "https://pixelstoplates.streamlit.app/",
        githubUrl: "https://github.com/mohammed-arif-23/pixelstoplates",
        color: "#0a0a0a"
    },
    {
        id: "06",
        title: "Movie AI",
        category: "Recommender System",
        year: "2023",
        img: "/images/project-thumb-3.png",
        description: "Content-based movie recommendation engine using cosine similarity algorithms.",
        stack: ["Python", "Streamlit", "Pandas"],
        link: "https://arif-nm-movieapi.streamlit.app/",
        githubUrl: "https://github.com/mohammed-arif-23/nm-movieapi",
        color: "#050505"
    }
];

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Mobile & Desktop Scroll Animations
            const projects = document.querySelectorAll('.project-card');

            projects.forEach((project) => {
                const imageContainer = project.querySelector('.project-image-container');
                const image = project.querySelector('.project-image-container img');
                const id = project.querySelector('.project-id');
                const title = project.querySelector('.project-title');
                const desc = project.querySelector('.project-desc');
                const tags = project.querySelector('.project-tags');
                const links = project.querySelector('.project-links');

                // Image Reveal Animation (Mobile & Desktop Right Image)
                const rightImage = project.querySelector('.project-right-image img');
                const rightImageContainer = project.querySelector('.project-right-image');

                /* Shared Reveal Logic */
                if (imageContainer && image) {
                    ScrollTrigger.create({
                        trigger: project,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        onEnter: () => {
                            gsap.to(imageContainer, { clipPath: 'inset(0 0 0 0)', duration: 1.5, ease: 'power4.inOut' });
                            gsap.fromTo(image,
                                { scale: 1.3, filter: 'blur(10px)' },
                                { scale: 1.1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.out' }
                            );
                        },
                        onLeaveBack: () => {
                            gsap.to(imageContainer, { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power4.inOut' });
                        }
                    });
                }

                if (rightImage && rightImageContainer) {
                    ScrollTrigger.create({
                        trigger: project,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        onEnter: () => {
                            gsap.fromTo(rightImage,
                                { scale: 1.2, filter: 'blur(15px)', opacity: 0 },
                                { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.5, ease: 'power2.out' }
                            );
                        }
                    });
                }

                // MEGA Content Stagger Reveal
                gsap.fromTo([id, title, desc, tags, links],
                    {
                        y: 120, // Pushed 49% further (was 80)
                        opacity: 0,
                        rotateX: 25, // Pushed further
                        skewY: 5, // Pushed further
                        transformOrigin: 'left center'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        skewY: 0,
                        duration: 1.5, // Slower, more epic
                        stagger: 0.2, // Pushed further
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: project,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                // MEGA Parallax Effect for Image - Pushed to MAX
                gsap.to(image, {
                    yPercent: 40, // Doubled for Mega impact
                    scale: 1.35,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: project,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2
                    }
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-black pt-2 pb-2 px-4 md:px-0 flex flex-col items-center">

            <div className="w-full max-w-[90vw] md:max-w-7xl mx-auto mb-20 px-4 md:px-0">
                <h2 className="text-sm font-mono text-brand-accent tracking-[0.5em] uppercase opacity-70 mb-4">
                    Selected_Works
                </h2>
                <p className="text-white/40 text-sm max-w-md">
                    Immersive digital experiences crafted with precision and passion.
                </p>
            </div>

            <div className="w-full flex flex-col gap-0 md:gap-0">
                {PROJECTS.map((project, index) => (
                    <div
                        key={project.id}
                        className="project-card group sticky top-0 w-full min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden"
                        style={{
                            backgroundColor: project.color,
                            zIndex: index + 1
                        }}
                        onMouseEnter={(e) => {
                            const target = e.currentTarget;
                            // Add a class to permanently hide the right image after first hover
                            target.classList.add('has-interacted');
                        }}
                    >
                        {/* Background Image (Wipes in on Scroll/Hover) */}
                        <div
                            className="project-image-container absolute inset-0 z-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none will-change-[clip-path]"
                            style={{ clipPath: 'inset(0 100% 0 0)' }}
                        >
                            <div className="absolute inset-0 bg-black/60 md:bg-black/50 z-10"></div>
                            <img
                                src={project.img}
                                alt=""
                                className="w-full h-full object-cover filter blur-2xl opacity-60 scale-110"
                            />
                        </div>

                        {/* Interactive Clear Image (Desktop Hover) with Blur Transition */}
                        <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none transition-[width] duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] w-0 group-hover:w-full">
                            <div className="absolute inset-0 bg-black/20 z-10 mix-blend-multiply"></div>
                            <img
                                src={project.img}
                                alt=""
                                className="w-screen h-screen object-cover max-w-none filter blur-xl group-hover:blur-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
                            />
                        </div>

                        <div className="relative z-10 w-full h-full max-w-[95vw] md:max-w-[90vw] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-24 md:py-0 border-t border-white/5 md:border-none">

                            {/* Left: Content */}
                            <div className="project-content flex flex-col justify-center items-center md:items-start order-2 md:order-1 px-4 md:px-0 text-white transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] md:group-hover:translate-x-8 mix-blend-difference text-center md:text-left">
                                <span className="project-id font-mono text-brand-accent text-xs md:text-base mb-6 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10 backdrop-blur-md group-hover:border-brand-accent/50 transition-colors duration-500">
                                    {project.id} — {project.category}
                                </span>
                                <h3 className="project-title text-5xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">
                                    {project.title}
                                </h3>
                                <p className="project-desc text-white/80 md:text-white/60 text-base md:text-xl font-light mb-10 max-w-sm md:max-w-md leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                                    {project.description}
                                </p>

                                <div className="project-tags flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-12">
                                    {project.stack.map((tech) => (
                                        <span key={tech} className="px-3 py-1 md:px-4 md:py-1.5 border border-white/10 rounded-full text-[10px] md:text-xs text-white/60 md:text-white/40 font-mono uppercase hover:bg-white/10 hover:text-white transition-colors duration-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-links flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
                                    {project.link !== "#" && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn relative w-full sm:w-fit pl-6 pr-12 py-4 rounded-full bg-white md:bg-transparent border border-white/20 overflow-hidden flex items-center justify-center sm:justify-start gap-4 transition-all duration-500 hover:border-white hover:pl-8 hover:pr-14 active:scale-95 active:brightness-125"
                                        >
                                            <div className="absolute inset-0 bg-white translate-y-0 md:translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"></div>
                                            <span className="relative z-10 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-black md:text-white group-hover/btn:text-black transition-colors duration-500">
                                                View Live
                                            </span>
                                            <ArrowUpRight size={16} className="relative z-10 text-black md:text-white group-hover/btn:text-black transition-colors duration-500 group-hover/btn:rotate-45 transform ease-out" />
                                        </a>
                                    )}
                                    {project.githubUrl !== "#" && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn relative w-full sm:w-fit px-8 py-4 rounded-full bg-transparent border border-white/20 overflow-hidden flex items-center justify-center gap-4 transition-all duration-500 hover:border-white hover:bg-white active:scale-95 active:brightness-125"
                                        >
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"></div>
                                            <span className="relative z-10 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white group-hover/btn:text-black transition-colors duration-500">
                                                GitHub
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right: Image (Desktop only - Fades out on hover, Stays out after interaction) */}
                            <div className="project-right-image hidden md:block relative w-full h-[30vh] md:h-[70vh] order-1 md:order-2 overflow-hidden rounded transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] origin-right group-[.has-interacted]:opacity-0">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="relative w-full h-full object-contain md:object-cover transition-all duration-1000"
                                    loading="eager"
                                />
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* End Spacer */}
            <div className="w-full h-[8vh] flex items-center justify-center">
                <p className="text-white/20 font-mono text-xs">MORE IN ARCHIVE</p>
            </div>

        </section>
    );
}
