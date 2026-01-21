'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
    className?: string;
    color1?: string;
    color2?: string;
    color3?: string;
    speed?: number;
    blur?: number;
    children?: React.ReactNode;
}

export function AuroraBackground({
    className,
    color1 = '#6366f1',
    color2 = '#8b5cf6',
    color3 = '#06b6d4',
    speed = 8,
    blur = 100,
    children,
}: AuroraBackgroundProps) {
    return (
        <div className={cn('relative overflow-hidden bg-black', className)}>
            {/* Aurora blobs */}
            <div
                className="absolute inset-0"
                style={{ filter: `blur(${blur}px)` }}
            >
                <motion.div
                    className="absolute w-[60%] h-[60%] rounded-full opacity-50"
                    style={{
                        background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
                        left: '10%',
                        top: '20%',
                    }}
                    animate={{
                        x: [0, 100, 50, 0],
                        y: [0, 50, 100, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute w-[50%] h-[50%] rounded-full opacity-40"
                    style={{
                        background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
                        right: '10%',
                        top: '10%',
                    }}
                    animate={{
                        x: [0, -80, -40, 0],
                        y: [0, 80, 40, 0],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: speed * 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute w-[40%] h-[40%] rounded-full opacity-30"
                    style={{
                        background: `radial-gradient(circle, ${color3} 0%, transparent 70%)`,
                        left: '30%',
                        bottom: '10%',
                    }}
                    animate={{
                        x: [0, 60, -30, 0],
                        y: [0, -60, -30, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{
                        duration: speed * 0.9,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            {/* Content */}
            {children && (
                <div className="relative z-10">
                    {children}
                </div>
            )}

            {/* Default demo content */}
            {!children && (
                <div className="relative z-10 flex items-center justify-center min-h-[200px]">
                    <h2 className="text-2xl font-bold text-white">Aurora Background</h2>
                </div>
            )}
        </div>
    );
}
