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
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{
                        scale: [1, 4],
                        opacity: [0.8, 0],
                    }}
                    transition={{
                        duration: duration,
                        repeat: Infinity,
                        delay: i * (duration / ringCount),
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
}
