import React from 'react';

export const TechIcons = {
    NextJS: () => (
        <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <mask id="mask0_1_2" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                <circle cx="90" cy="90" r="90" fill="white" />
            </mask>
            <g mask="url(#mask0_1_2)">
                <circle cx="90" cy="90" r="90" fill="black" />
                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
                <rect x="115" y="54" width="12" height="72" fill="white" />
            </g>
        </svg>
    ),
    React: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="12" cy="12" r="2" fill="#61DAFB" />
            <g stroke="#61DAFB" strokeWidth="1.5">
                <ellipse cx="12" cy="12" rx="10" ry="4" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
            </g>
        </svg>
    ),
    TypeScript: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M2 2H22V22H2V2Z" fill="#3178C6" />
            <path d="M11.8 16H10.4L10.4 14.6C10.4 14.6 10.4 13.4 12.05 13.4C13.7 13.4 13.7 14.6 13.7 14.6V16H15V14.6C15 14.6 15 12.4 12.05 12.4C9.1 12.4 9.1 14.6 9.1 14.6V16H9V17H11.8V16Z" fill="white" />
            <path d="M14 8H10V9H11.5V12H12.5V9H14V8Z" fill="white" />
        </svg>
    ),
    Tailwind: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12.0001 6C12.0001 6 12.0001 3 15.6001 3C19.2001 3 19.8001 5.4 21.0001 6.6C22.2001 7.8 23.4001 9 23.4001 9C23.4001 9 24.0001 12 20.4001 12C16.8001 12 16.2001 9.6 15.0001 8.4C13.8001 7.2 12.0001 6 12.0001 6ZM0.600098 12C0.600098 12 0.600098 9 4.2001 9C7.8001 9 8.4001 11.4 9.6001 12.6C10.8001 13.8 12.0001 15 12.0001 15C12.0001 15 12.6001 18 9.0001 18C5.4001 18 4.8001 15.6 3.6001 14.4C2.4001 13.2 0.600098 12 0.600098 12Z" fill="#38BDF8" />
        </svg>
    ),
    NodeJS: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#339933" />
            <path d="M12 11V20" stroke="white" strokeWidth="2" />
            <path d="M12 11L20 7" stroke="white" strokeWidth="2" />
            <path d="M12 11L4 7" stroke="white" strokeWidth="2" />
        </svg>
    ),
    MongoDB: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2L13 11C13 11 16 11 16 15C16 19 13 22 12 22C11 22 8 19 8 15C8 11 11 11 11 11L12 2Z" fill="#47A248" />
        </svg>
    ),
    PostgreSQL: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16.21 4.71 17.82 5.91L13 10.73V16H11V10.73L6.18 5.91C7.79 4.71 9.79 4 12 4Z" fill="#336791" />
        </svg>
    ),
    Prisma: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2L2 19H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M12 7L7 16H17L12 7Z" fill="currentColor" />
        </svg>
    ),
    GSAP: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="12" cy="12" r="10" stroke="#88CE02" strokeWidth="2" />
            <path d="M8 8L16 16M16 8L8 16" stroke="#88CE02" strokeWidth="2" />
        </svg>
    ),
    ThreeJS: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M12 12L21 7M12 12L3 7M12 12V22" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
    ),
    Framer: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M5 2H19V9H12V16H19V23H5V16H12V9H5V2Z" fill="#0055FF" />
        </svg>
    ),
    WebGL: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="#990000" strokeWidth="2" />
            <path d="M7 12H17M12 7V17" stroke="#990000" strokeWidth="2" />
        </svg>
    ),
    Git: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="2" y="2" width="20" height="20" rx="2" fill="#F05032" />
            <path d="M12 7V17M12 17L9 14M12 17L15 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Docker: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M22 11H2V11C2 17 6 21 12 21C18 21 22 17 22 11V11Z" fill="#2496ED" />
            <rect x="2" y="7" width="3" height="3" fill="#2496ED" />
            <rect x="6" y="7" width="3" height="3" fill="#2496ED" />
            <rect x="10" y="7" width="3" height="3" fill="#2496ED" />
            <rect x="6" y="3" width="3" height="3" fill="#2496ED" />
        </svg>
    ),
    Vercel: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2L22 19H2L12 2Z" fill="#FFFFFF" />
        </svg>
    ),
    Zapier: () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#FF4F00" />
            <path d="M16 6L7 13H11L8 18L17 11H13L16 6Z" fill="white" />
        </svg>
    )
};
