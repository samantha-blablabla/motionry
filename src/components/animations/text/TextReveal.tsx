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
    // Split text into words for word-by-word reveal, or simple block reveal
    // For this component, let's do simple block reveal for elegance

    return (
        <div className={cn("overflow-hidden", className)}>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                    duration: duration,
                    delay: delay,
                    ease: [0.33, 1, 0.68, 1],
                    repeat: Infinity,
                    repeatDelay: 2,
                    repeatType: "reverse"
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
