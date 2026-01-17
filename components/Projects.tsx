'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

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

    return (
        <section ref={containerRef} className="relative w-full bg-[#080808] pt-2 pb-2 px-4 md:px-0 flex flex-col items-center">

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
                        className="group sticky top-0 w-full min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden"
                        style={{
                            backgroundColor: project.color,
                            zIndex: index + 1
                        }}
                    >
                        {/* Fullscreen Hover Image (Performance Optimized: Clip-Path wipe) */}
                        <div
                            className="absolute blur-sm inset-0 z-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none will-change-[clip-path]"
                            style={{ clipPath: 'inset(0 100% 0 0)' }} // Start hidden (wiped right)
                        >
                            <div className="absolute inset-0 bg-black/40 z-10"></div>
                            <img
                                src={project.img}
                                alt=""
                                className="w-full h-full object-cover scale-100 transition-transform duration-[1.5s] ease-out"
                            />
                        </div>

                        <div className="absolute blur-sm inset-0 z-0 overflow-hidden pointer-events-none transition-[width] duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] w-0 group-hover:w-full">
                            <div className="absolute inset-0 bg-black/20 z-10 mix-blend-multiply"></div>
                            <img
                                src={project.img}
                                alt=""
                                className="w-screen h-screen object-cover max-w-none"
                            />
                        </div>


                        <div className="relative z-10 w-full h-full max-w-[95vw] md:max-w-[90vw] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-24 md:py-0 border-t border-white/10 md:border-none">

                            {/* Left: Content */}
                            <div className="flex flex-col justify-center items-center md:items-start order-2 md:order-1 px-4 md:px-0 text-white transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] md:group-hover:translate-x-8 mix-blend-difference text-center md:text-left">
                                <span className="font-mono text-brand-accent text-xs md:text-base mb-6 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10 backdrop-blur-md group-hover:border-brand-accent/50 transition-colors duration-500">
                                    {project.id} — {project.category}
                                </span>
                                <h3 className="text-4xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">
                                    {project.title}
                                </h3>
                                <p className="text-white/60 text-base md:text-xl font-light mb-10 max-w-sm md:max-w-md leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-12">
                                    {project.stack.map((tech) => (
                                        <span key={tech} className="px-3 py-1 md:px-4 md:py-1.5 border border-white/10 rounded-full text-[10px] md:text-xs text-white/40 font-mono uppercase hover:bg-white/10 hover:text-white transition-colors duration-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
                                    {project.link !== "#" && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn relative w-full sm:w-fit pl-6 pr-12 py-4 rounded-full bg-transparent border border-white/20 overflow-hidden flex items-center justify-center sm:justify-start gap-4 transition-all duration-500 hover:border-white hover:pl-8 hover:pr-14"
                                        >
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"></div>
                                            <span className="relative z-10 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white group-hover/btn:text-black transition-colors duration-500">
                                                View Live
                                            </span>
                                            <ArrowUpRight size={16} className="relative z-10 text-white group-hover/btn:text-black transition-colors duration-500 group-hover/btn:rotate-45 transform ease-out" />
                                        </a>
                                    )}
                                    {project.githubUrl !== "#" && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn relative w-full sm:w-fit px-8 py-4 rounded-full bg-transparent border border-white/20 overflow-hidden flex items-center justify-center gap-4 transition-all duration-500 hover:border-white hover:bg-white"
                                        >
                                            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"></div>
                                            <span className="relative z-10 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white group-hover/btn:text-black transition-colors duration-500">
                                                GitHub
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right: Image (Fades out) */}
                            <div className="relative w-full h-[30vh] md:h-[70vh] order-1 md:order-2 overflow-hidden rounded transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] md:group-hover:scale-95 md:group-hover:opacity-0 md:group-hover:blur-md origin-right">
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
