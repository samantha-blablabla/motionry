'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface GridPatternProps {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    className?: string;
    size?: number;
    color?: string;
    children?: React.ReactNode;
    [key: string]: any;
}

export function GridPattern({
    width = 40,
    height = 40,
    x = 0,
    y = 0,
    className,
    size = 40,
    color = 'rgba(255,255,255,0.4)',
    children,
    ...props
}: GridPatternProps) {
    const id = useId();

    return (
        <div className={cn("w-full h-full relative bg-black overflow-hidden", className)}>
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
                    backgroundSize: `${size}px ${size}px`,
                }}
            />

            {/* Radial Gradient Fade - Made lighter for visibility */}
            <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_80%)]" />

            {/* Content */}
            {children && (
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            )}
        </div>
    );
}
