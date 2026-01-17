"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
}

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________01010101";
const BINARY_CHARS = "01";

export function GlitchMorphText({ text, className = "" }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [stage, setStage] = useState<"binary" | "glitch" | "final">("binary");

    useEffect(() => {
        let frame = 0;
        const totalFrames = 120; // Total animation duration in frames
        const delayFrames = 90; // Delay to sync with terminal (1.5 seconds at 60fps)

        const animate = () => {
            frame++;

            // Delay before starting animation
            if (frame < delayFrames) {
                setDisplayText("");
                requestAnimationFrame(animate);
                return;
            }

            const adjustedFrame = frame - delayFrames;

            // Stage 1: Binary (frames 0-30)
            if (adjustedFrame < 30) {
                setStage("binary");
                setDisplayText(
                    text
                        .split("")
                        .map(() => BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)])
                        .join("")
                );
            }
            // Stage 2: Glitch corruption (frames 30-80)
            else if (adjustedFrame < 80) {
                setStage("glitch");
                const progress = (adjustedFrame - 30) / 50;
                setDisplayText(
                    text
                        .split("")
                        .map((char, i) => {
                            if (Math.random() > progress) {
                                return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                            }
                            return char;
                        })
                        .join("")
                );
            }
            // Stage 3: Final reveal (frames 80-120)
            else if (adjustedFrame < totalFrames) {
                setStage("final");
                setDisplayText(text);
            } else {
                return;
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [text]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayText.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    animate={{
                        x: stage === "glitch" ? [0, -2, 2, -1, 1, 0] : 0,
                        textShadow:
                            stage === "glitch"
                                ? [
                                    "2px 0 #ff0000, -2px 0 #00ff00",
                                    "-2px 0 #ff0000, 2px 0 #00ff00",
                                    "0 0 transparent",
                                ]
                                : "0 0 transparent",
                    }}
                    transition={{
                        duration: 0.1,
                        repeat: stage === "glitch" ? Infinity : 0,
                        repeatType: "mirror",
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
