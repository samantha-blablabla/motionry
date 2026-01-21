'use client';

import { cn } from '@/lib/utils';

interface DotPatternProps {
    className?: string;
    size?: number;
    dotSize?: number;
    color?: string;
    opacity?: number;
    children?: React.ReactNode;
}

export function DotPattern({
    className,
    size = 24,
    dotSize = 2,
    color = '#818cf8',
    opacity = 0.5,
    children,
}: DotPatternProps) {
    return (
        <div className={cn('relative w-full h-full overflow-hidden bg-black', className)}>
            {/* Dot pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
                    backgroundSize: `${size}px ${size}px`,
                    opacity: opacity,
                }}
            />

            {/* Radial fade overlay - Reduced intensity for visibility */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
                }}
            />

            {/* Content */}
            {children && (
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            )}
        </div>
    );
}
