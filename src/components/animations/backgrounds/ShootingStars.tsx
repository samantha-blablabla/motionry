'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ShootingStarsProps {
    className?: string;
    starColor?: string;
    trailColor?: string;
    minDelay?: number;
    maxDelay?: number;
    starWidth?: number;
    starHeight?: number;
    children?: React.ReactNode;
}

interface Star {
    x: number;
    y: number;
    speed: number;
    length: number;
    angle: number;
    opacity: number;
}

export function ShootingStars({
    className,
    starColor = '#9E00FF',
    trailColor = '#2EB9DF',
    minDelay = 400,
    maxDelay = 1500,
    starWidth = 10,
    starHeight = 1,
    children,
}: ShootingStarsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setParentSize({ width, height });
                canvas.width = width;
                canvas.height = height;
            }
        });

        resizeObserver.observe(parent);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const stars: Star[] = [];
        let lastStarTime = 0;

        const createStar = () => {
            const { width, height } = canvas;
            const x = Math.random() * width;
            const y = 0;
            const speed = Math.random() * 10 + 10;
            const angle = Math.PI / 4; // 45 degrees
            const length = Math.random() * 80 + 20;

            stars.push({ x, y: Math.random() * height * 0.5, speed, length, angle, opacity: 1 });
        };

        const draw = (timestamp: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create new star periodically
            if (timestamp - lastStarTime > Math.random() * (maxDelay - minDelay) + minDelay) {
                createStar();
                lastStarTime = timestamp;
            }

            // Update and draw stars
            for (let i = stars.length - 1; i >= 0; i--) {
                const star = stars[i];

                // Update position
                star.x -= star.speed * Math.cos(star.angle);
                star.y += star.speed * Math.sin(star.angle);

                // Draw trail (gradient)
                const gradient = ctx.createLinearGradient(
                    star.x,
                    star.y,
                    star.x + star.length * Math.cos(star.angle),
                    star.y - star.length * Math.sin(star.angle)
                );
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(1, starColor); // Use prop color

                ctx.strokeStyle = gradient;
                ctx.lineWidth = starHeight;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(
                    star.x + star.length * Math.cos(star.angle),
                    star.y - star.length * Math.sin(star.angle)
                );
                ctx.stroke();

                // Simulate dying out if out of bounds
                if (star.x < -100 || star.y > canvas.height + 100) {
                    stars.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => cancelAnimationFrame(animationFrameId);
    }, [parentSize, starColor, minDelay, maxDelay]);

    return (
        <div className={cn("relative w-full h-full bg-black overflow-hidden", className)}>
            {/* Helper stars static background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
            />

            {children && (
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            )}
        </div>
    );
}
