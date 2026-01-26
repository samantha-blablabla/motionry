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
        <div className={cn("relative p-[3px] rounded-xl overflow-hidden", className)} style={{ padding: borderWidth }}>
            {/* Rotate gradient background - Sharper beam effect */}
            <motion.div
                className="absolute inset-[100%] w-[300%] h-[300%] left-[-100%] top-[-100%]"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0 300deg, ${colorFrom} 320deg, ${colorTo} 340deg, transparent 360deg)`,
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Static gradient for base glow */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `conic-gradient(from 180deg at 50% 50%, ${colorFrom}, ${colorTo}, ${colorFrom})`,
                }}
            />

            {/* Inner content container - covers the gradient except at edges */}
            <div className="relative z-10 bg-surface rounded-lg">
                {children || (
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-1">Border Beam</h3>
                        <p className="text-text-secondary text-sm">A glowing beam travels along the border.</p>
                    </div>
                )}
            </div>
        </div>
    );
}


