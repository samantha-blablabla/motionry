'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
    text?: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function TextReveal({
    text = "Reveal your text smoothly.",
    className,
    delay = 0,
    duration = 0.5,
}: TextRevealProps) {
    return (
        <div className={cn("overflow-hidden inline-block", className)}>
            <motion.div
                className="text-2xl font-bold text-text-primary"
                initial={{ y: "100%" }}
                animate={{ y: ["100%", "0%", "0%", "-100%"] }}
                transition={{
                    duration: duration * 4,
                    delay: delay,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1,
                    times: [0, 0.25, 0.75, 1]
                }}
            >
                {text}
            </motion.div>
        </div>
    );
}

// Advanced version: Word by word
export function TextRevealByWord({
    text = "Reveal your text word by word.",
    className,
    delay = 0.1,
}: TextRevealProps) {
    const words = text.split(" ");

    return (
        <div className={cn("flex flex-wrap gap-x-1.5", className)}>
            {words.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: i * delay,
                            ease: [0.33, 1, 0.68, 1],
                            repeat: Infinity,
                            repeatDelay: 2,
                            repeatType: "reverse"
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    )
}
