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
    color = '#6366f1',
    opacity = 0.3,
    children,
}: DotPatternProps) {
    return (
        <div className={cn('relative overflow-hidden bg-black', className)}>
            {/* Dot pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
                    backgroundSize: `${size}px ${size}px`,
                    opacity: opacity,
                }}
            />

            {/* Radial fade overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
                }}
            />

            {/* Content */}
            {children && (
                <div className="relative z-10">
                    {children}
                </div>
            )}

            {/* Default demo content */}
            {!children && (
                <div className="relative z-10 flex items-center justify-center min-h-[200px]">
                    <h2 className="text-2xl font-bold text-white">Dot Pattern</h2>
                </div>
            )}
        </div>
    );
}
