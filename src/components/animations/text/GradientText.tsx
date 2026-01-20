'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientTextProps {
    text?: string;
    colors?: string[];
    color1?: string;
    color2?: string;
    color3?: string;
    color4?: string;
    color5?: string;
    duration?: number;
    className?: string;
    children?: React.ReactNode;
}

export function GradientText({
    text = "Gradient Text",
    colors = ["#40ffaa", "#4079ff", "#40ffaa"], // Default fallback
    color1, color2, color3, color4, color5,
    duration = 8,
    className,
    children
}: GradientTextProps) {
    // Merge explicit color props if they exist, otherwise use array
    // If color1/2/etc are provided by UI controls, construct array from them
    const activeColors = (color1 && color2)
        ? [color1, color2, color3, color4, color5].filter(Boolean) as string[]
        : colors;

    // Ensure we have enough colors for a smooth loop (duplicate first at end if needed)
    if (activeColors.length > 0 && activeColors[0] !== activeColors[activeColors.length - 1]) {
        activeColors.push(activeColors[0]);
    }

    const gradient = `linear-gradient(to right, ${activeColors.join(', ')})`;

    return (
        <motion.span
            className={cn("inline-block text-transparent bg-clip-text font-bold text-3xl md:text-5xl pb-1", className)}
            style={{
                backgroundImage: gradient,
                backgroundSize: "200% auto",
            }}
            animate={{
                backgroundPosition: ["0% center", "-200% center"]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
            }}
        >
            {text || children}
        </motion.span>
    );
}
