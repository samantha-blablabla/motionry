'use client';

import { motion } from 'framer-motion';

interface PulseRingProps {
    color?: string;
    size?: number;
    duration?: number;
    ringCount?: number;
}

export function PulseRing({
    color = '#6366f1',
    size = 80,
    duration = 2,
    ringCount = 3,
}: PulseRingProps) {
    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            {/* Center Dot */}
            <div
                className="absolute rounded-full z-10"
                style={{
                    width: size * 0.25,
                    height: size * 0.25,
                    background: color,
                }}
            />

            {/* Pulse Rings */}
            {Array.from({ length: ringCount }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: size * 0.25,
                        height: size * 0.25,
                        border: `2px solid ${color}`,
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                        scale: [0.5, 4],
                        opacity: [0, 0.6, 0], // Fade in and out smoothly
                    }}
                    transition={{
                        duration: 3, // Slower for elegance
                        repeat: Infinity,
                        delay: i * (3 / ringCount), // Evenly distributed
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}
