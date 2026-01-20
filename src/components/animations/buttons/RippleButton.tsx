'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    rippleColor?: string;
    backgroundColor?: string;
    textColor?: string;
    className?: string;
}

interface Ripple {
    id: number;
    x: number;
    y: number;
    size: number;
}

export function RippleButton({
    children = 'Click Me',
    onClick,
    rippleColor = 'rgba(255, 255, 255, 0.5)',
    backgroundColor = '#6366f1',
    textColor = '#ffffff',
    className = '',
}: RippleButtonProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleIdRef = useRef(0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;

        const newRipple: Ripple = {
            id: rippleIdRef.current++,
            x,
            y,
            size,
        };

        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        onClick?.();
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-shadow hover:shadow-lg ${className}`}
            style={{
                backgroundColor,
                color: textColor,
            }}
        >
            <span className="relative z-10">{children}</span>
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: ripple.x - ripple.size / 2,
                            top: ripple.y - ripple.size / 2,
                            width: ripple.size,
                            height: ripple.size,
                            backgroundColor: rippleColor,
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 1, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                ))}
            </AnimatePresence>
        </button>
    );
}
