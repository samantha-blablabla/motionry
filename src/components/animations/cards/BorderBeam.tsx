'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BorderBeamProps {
    children?: React.ReactNode;
    className?: string;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
}

export function BorderBeam({
    children,
    className,
    duration = 4,
    borderWidth = 3,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
}: BorderBeamProps) {
    return (
        <div className={cn("relative rounded-xl", className)}>
            {/* Animated gradient border */}
            <div
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{ padding: borderWidth }}
            >
                <motion.div
                    className="absolute inset-[-50%] w-[200%] h-[200%]"
                    style={{
                        background: `conic-gradient(from 0deg at 50% 50%, ${colorFrom}, ${colorTo}, ${colorFrom})`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Inner content container */}
            <div className="relative z-10 bg-surface rounded-xl">
                {children || (
                    <div className="p-8">
                        <h3 className="text-xl font-semibold text-text-primary mb-2">Border Beam</h3>
                        <p className="text-text-secondary">A glowing beam travels along the border.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

