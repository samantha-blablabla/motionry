'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    showRadialGradient?: boolean;
    color1?: string;
    color2?: string;
    color3?: string;
    speed?: number;
    blur?: number;
}

export function AuroraBackground({
    className,
    children,
    showRadialGradient = true,
    color1 = '#2a8af6',
    color2 = '#a853ba',
    color3 = '#e92a67',
    speed = 20,
    blur = 80,
}: AuroraBackgroundProps) {
    return (
        <div
            className={cn(
                'relative flex flex-col items-center justify-center bg-black transition-bg overflow-hidden w-full h-full',
                className
            )}
        >
            <div className="absolute inset-0 overflow-hidden">
                {/* Simple Gradient Overlay Fallback if complex CSS fails or customization needed */}
                <motion.div
                    className="absolute -inset-[10%] opacity-40"
                    style={{
                        backgroundImage: `conic-gradient(from 180deg at 50% 50%, ${color1} 0deg, ${color2} 180deg, ${color3} 360deg)`,
                        filter: `blur(${blur}px)`
                    }}
                    animate={{
                        transform: ['rotate(0deg)', 'rotate(360deg)'],
                    }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                <motion.div
                    className="absolute -inset-[10%] opacity-40"
                    style={{
                        backgroundImage: `conic-gradient(from 0deg at 50% 50%, ${color1} 0deg, ${color2} 180deg, ${color3} 360deg)`,
                        mixBlendMode: 'overlay',
                        filter: `blur(${blur}px)`
                    }}
                    animate={{
                        transform: ['rotate(360deg)', 'rotate(0deg)'],
                    }}
                    transition={{
                        duration: speed * 1.25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {showRadialGradient && (
                <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            )}

            {children && (
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            )}
        </div>
    );
}
