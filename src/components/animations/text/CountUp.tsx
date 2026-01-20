'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CountUpProps {
    end: number;
    start?: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    textColor?: string;
    className?: string;
}

export function CountUp({
    end,
    start = 0,
    duration = 2,
    suffix = '',
    prefix = '',
    decimals = 0,
    textColor = '#6366f1',
    className = '',
}: CountUpProps) {
    const [count, setCount] = useState(start);
    const [key, setKey] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    // Loop animation every (duration + pause) seconds
    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;
        let timeoutId: NodeJS.Timeout;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function (easeOutQuart)
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentValue = start + (end - start) * easeProgress;

            setCount(currentValue);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Pause then restart
                timeoutId = setTimeout(() => {
                    setCount(start);
                    startTime = null;
                    setKey(k => k + 1);
                }, 2000); // 2 second pause before restart
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeout(timeoutId);
        };
    }, [key, start, end, duration]);

    const formattedCount = count.toFixed(decimals);

    return (
        <motion.span
            ref={ref}
            className={`font-bold text-4xl tabular-nums ${className}`}
            style={{ color: textColor }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
        >
            {prefix}
            {formattedCount}
            {suffix}
        </motion.span>
    );
}

// Demo component showing multiple counters
export function CountUpDemo() {
    return (
        <div className="flex flex-wrap gap-8 justify-center items-center">
            <div className="text-center">
                <CountUp end={99} suffix="%" />
                <p className="text-sm text-gray-500 mt-1">Satisfaction</p>
            </div>
            <div className="text-center">
                <CountUp end={1500} prefix="+" />
                <p className="text-sm text-gray-500 mt-1">Users</p>
            </div>
            <div className="text-center">
                <CountUp end={4.9} decimals={1} />
                <p className="text-sm text-gray-500 mt-1">Rating</p>
            </div>
        </div>
    );
}
