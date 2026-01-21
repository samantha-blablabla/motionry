'use client';

import { cn } from '@/lib/utils';

interface GridPatternProps {
    className?: string;
    size?: number;
    color?: string;
    opacity?: number;
    children?: React.ReactNode;
}

export function GridPattern({
    className,
    size = 40,
    color = '#6366f1',
    opacity = 0.15,
    children,
}: GridPatternProps) {
    return (
        <div className={cn('relative overflow-hidden bg-black', className)}>
            {/* Grid pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(${color} 1px, transparent 1px),
                        linear-gradient(90deg, ${color} 1px, transparent 1px)
                    `,
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
                    <h2 className="text-2xl font-bold text-white">Grid Pattern</h2>
                </div>
            )}
        </div>
    );
}
