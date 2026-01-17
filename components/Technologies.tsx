'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data derived strictly from public/images/logos
const TECH_ITEMS = [
    { name: "Next.js", src: "/images/logos/Next.js.svg" },
    { name: "React", src: "/images/logos/React.svg" },
    { name: "TypeScript", src: "/images/logos/TypeScript.svg" },
    { name: "Tailwind", src: "/images/logos/Tailwind.svg" },
    { name: "Node.js", src: "/images/logos/Node.js.svg" },
    { name: "MongoDB", src: "/images/logos/MongoDB.svg" },
    { name: "Three.js", src: "/images/logos/Three.js.svg" },
    { name: "Prisma", src: "/images/logos/Prisma.svg" },
    { name: "Python", src: "/images/logos/Python.svg" },
    { name: "Supabase", src: "/images/logos/Supabase.svg" },
    { name: "Redux", src: "/images/logos/Redux.svg" },
    { name: "MySQL", src: "/images/logos/MySQL.svg" },
    { name: "OpenCV", src: "/images/logos/OpenCV.svg" },
    { name: "PyTorch", src: "/images/logos/PyTorch.svg" },
    { name: "TensorFlow", src: "/images/logos/TensorFlow.svg" },
    { name: "PHP", src: "/images/logos/PHP.svg" },
];

export default function Technologies() {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Refs for physics state to avoid re-renders during animation loop
    const nodesRef = useRef<any[]>([]);
    const dragRef = useRef<{ active: boolean; index: number; startX: number; startY: number }>({
        active: false, index: -1, startX: 0, startY: 0
    });
    const mouseRef = useRef({ x: -1000, y: -1000 });

    // Initialize
    useEffect(() => {
        if (!containerRef.current) return;
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;

        const mobile = width < 768;
        setIsMobile(mobile);

        // Create physics nodes
        nodesRef.current = TECH_ITEMS.map((item) => ({
            ...item,
            x: Math.random() * (width - 100) + 50,
            y: Math.random() * (height - 100) + 50,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: mobile ? 30 : 60, // Physical radius (visual is 112px => 56px radius, adding buffer)
            mass: 1
        }));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.offsetWidth;
                canvas.height = containerRef.current.offsetHeight;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const onMouseDown = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            // Check click on nodes
            nodesRef.current.forEach((node, i) => {
                const dx = mx - node.x;
                const dy = my - node.y;
                if (dx * dx + dy * dy < node.radius * node.radius) {
                    dragRef.current = { active: true, index: i, startX: mx, startY: my };
                    node.vx = 0;
                    node.vy = 0;
                }
            });
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

            if (dragRef.current.active && dragRef.current.index !== -1) {
                const node = nodesRef.current[dragRef.current.index];
                // Smoothly pull towards mouse (springy feel)
                const targetX = mouseRef.current.x;
                const targetY = mouseRef.current.y;
                node.vx = (targetX - node.x) * 0.2;
                node.vy = (targetY - node.y) * 0.2;
            }
        };

        const onMouseUp = () => {
            dragRef.current = { active: false, index: -1, startX: 0, startY: 0 };
        };

        // Attach listeners to container for better DX (instead of window or canvas)
        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            // Add minimal touch support too
            container.addEventListener('touchstart', (e) => onMouseDown({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY } as any));
            window.addEventListener('touchmove', (e) => onMouseMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY } as any));
            window.addEventListener('touchend', onMouseUp);
        }

        const updatePhysics = () => {
            const width = canvas.width;
            const height = canvas.height;
            const nodes = nodesRef.current;

            // 1. Move & Wall Bounce
            nodes.forEach((node, i) => {
                // Drag override
                if (dragRef.current.active && dragRef.current.index === i) {
                    node.x += node.vx;
                    node.y += node.vy;
                    return; // Skip normal physics for dragged node
                }

                node.x += node.vx;
                node.y += node.vy;

                // Boundaries
                const r = node.radius;
                const bounce = -0.7; // Lose energy on wall hit
                if (node.x < r) { node.x = r; node.vx *= bounce; }
                if (node.x > width - r) { node.x = width - r; node.vx *= bounce; }
                if (node.y < r) { node.y = r; node.vy *= bounce; }
                if (node.y > height - r) { node.y = height - r; node.vy *= bounce; }

                // Friction
                node.vx *= 0.99;
                node.vy *= 0.99;
            });

            // 2. Resolve Collisions (Iterative for stability)
            for (let k = 0; k < 4; k++) { // 4 iterations
                for (let i = 0; i < nodes.length; i++) {
                    for (let j = i + 1; j < nodes.length; j++) {
                        const n1 = nodes[i];
                        const n2 = nodes[j];

                        const dx = n2.x - n1.x;
                        const dy = n2.y - n1.y;
                        const distSq = dx * dx + dy * dy;
                        const minDist = n1.radius + n2.radius + 10; // Extra padding

                        if (distSq < minDist * minDist && distSq > 0) {
                            const dist = Math.sqrt(distSq);
                            const overlap = minDist - dist;
                            const nx = dx / dist;
                            const ny = dy / dist;

                            // Separate positions
                            const moveX = nx * overlap * 0.5;
                            const moveY = ny * overlap * 0.5;

                            if (!dragRef.current.active || dragRef.current.index !== i) {
                                n1.x -= moveX;
                                n1.y -= moveY;
                            }
                            if (!dragRef.current.active || dragRef.current.index !== j) {
                                n2.x += moveX;
                                n2.y += moveY;
                            }

                            // Bounce (Exchange velocity)
                            // This is a simplified impulse response
                            const sepVel = (n2.vx - n1.vx) * nx + (n2.vy - n1.vy) * ny;
                            if (sepVel < 0) { // Only if moving towards each other
                                const bounce = 0.8; // Bounciness 0-1
                                const impulse = -(1 + bounce) * sepVel * 0.5; // Equal mass

                                if (!dragRef.current.active || dragRef.current.index !== i) {
                                    n1.vx -= impulse * nx;
                                    n1.vy -= impulse * ny;
                                }
                                if (!dragRef.current.active || dragRef.current.index !== j) {
                                    n2.vx += impulse * nx;
                                    n2.vy += impulse * ny;
                                }
                            }
                        }
                    }
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const nodes = nodesRef.current;

            // Draw Lines
            ctx.lineWidth = 2;
            nodes.forEach((n1, i) => {
                nodes.forEach((n2, j) => {
                    if (j <= i) return; // avoid duplicates
                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 300) {
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 300) * 0.05})`;
                        ctx.stroke();
                    }
                });
            });

            // Update DOM elements using direct transform for performance
            nodes.forEach((node, i) => {
                const el = document.getElementById(`node-icon-${i}`);
                if (el) {
                    // Offset is roughly radius (approx) to center the square div
                    // Mobile: w-12 is 48px, half is 24
                    // Desktop: w-28 is 112px, half is 56
                    const offset = node.radius < 40 ? 24 : 56;
                    el.style.transform = `translate(${node.x - offset}px, ${node.y - offset}px) scale(${dragRef.current.index === i ? 1.1 : 1})`;
                    el.style.zIndex = dragRef.current.index === i ? "100" : "20";
                }
            });
        };

        const loop = () => {
            updatePhysics();
            draw();
            animationId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            if (container) {
                container.removeEventListener('mousedown', onMouseDown);
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                container.removeEventListener('touchstart', (e) => onMouseDown({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY } as any));
                window.removeEventListener('touchmove', (e) => onMouseMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY } as any));
                window.removeEventListener('touchend', onMouseUp);
            }
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-[50vh] md:min-h-[60vh] py-8 md:py-12 mt-2 md:mt-4 bg-[#050505] overflow-hidden select-none active:cursor-grabbing">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none"></div>

            {/* Centered Title */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
                <h2 className="text-[7vw] md:text-[5vw] lg:text-[3vw] font-bold text-[#ededed] opacity-10 tracking-tighter text-center leading-tight md:leading-none">
                    Technologies<br />I've worked with
                </h2>
            </div>

            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

            {/* Nodes */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {TECH_ITEMS.map((item, i) => (
                    <div
                        key={i}
                        id={`node-icon-${i}`}
                        className={`absolute top-0 left-0 p-2 md:p-3 lg:p-5 bg-[#111] border border-white/10 rounded-full shadow-2xl flex items-center justify-center will-change-transform ${isMobile ? 'w-12 h-12' : 'w-28 h-28'}`}
                    >
                        <img src={item.src} alt={item.name} className="w-full h-full object-contain pointer-events-none drop-shadow-md select-none" draggable={false} />
                    </div>
                ))}
            </div>

        </section>
    );
}
