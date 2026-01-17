"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MatrixImageProps {
    src: string;
    alt: string;
    className?: string;
    externalTrigger?: boolean;
}

const MATRIX_CHARS = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01";

export function MatrixCascadeImage({ src, alt, className = "", externalTrigger = false }: MatrixImageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    // Trigger animation when external trigger or internal hover
    const shouldAnimate = isHovering || externalTrigger;

    useEffect(() => {
        if (!shouldAnimate || !canvasRef.current || !imgRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = imgRef.current;

        if (!ctx) return;

        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;

        const columns = Math.floor(canvas.width / 10);
        const drops: number[] = Array(columns).fill(0);
        let frame = 0;
        const maxFrames = 60;

        const drawMatrix = () => {
            frame++;

            // Fade effect
            ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#ccff00";
            ctx.font = "12px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
                const x = i * 10;
                const y = drops[i] * 10;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            if (frame < maxFrames) {
                requestAnimationFrame(drawMatrix);
            } else {
                // Fade out matrix and reveal image
                setAnimationComplete(true);
            }
        };

        drawMatrix();
    }, [shouldAnimate]);

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setAnimationComplete(false);
            }}
        >
            {/* Original Image */}
            <motion.img
                ref={imgRef}
                src={src}
                alt={alt}
                className="w-full h-full object-contain brightness-125 contrast-125"
                animate={{
                    opacity: animationComplete ? 1 : shouldAnimate ? 0 : 1,
                    filter: animationComplete
                        ? "grayscale(0%) brightness(100%) contrast(100%)"
                        : "grayscale(10%) brightness(105%) contrast(105%)",
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Matrix Canvas Overlay */}
            {shouldAnimate && (
                <motion.canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animationComplete ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </div>
    );
}
