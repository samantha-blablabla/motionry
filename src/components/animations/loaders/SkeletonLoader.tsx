'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    baseColor?: string;
    shimmerColor?: string;
    className?: string;
}

export function SkeletonLoader({
    width = '100%',
    height = '20px',
    borderRadius = '4px',
    baseColor = 'rgba(255, 255, 255, 0.1)',
    shimmerColor = 'rgba(255, 255, 255, 0.2)',
    className = '',
}: SkeletonLoaderProps) {
    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: baseColor,
            }}
        >
            <motion.div
                className="absolute inset-0"
                style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
                }}
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    );
}

// Demo component showing multiple skeleton elements
export function SkeletonLoaderDemo() {
    return (
        <div className="flex flex-col gap-3 p-4 w-full max-w-sm">
            {/* Avatar + Text Row */}
            <div className="flex items-center gap-3">
                <SkeletonLoader width="48px" height="48px" borderRadius="50%" />
                <div className="flex-1 flex flex-col gap-2">
                    <SkeletonLoader width="60%" height="14px" />
                    <SkeletonLoader width="40%" height="12px" />
                </div>
            </div>
            {/* Content Lines */}
            <SkeletonLoader width="100%" height="16px" />
            <SkeletonLoader width="90%" height="16px" />
            <SkeletonLoader width="75%" height="16px" />
        </div>
    );
}
