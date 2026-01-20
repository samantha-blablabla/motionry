'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ParallaxCardProps {
    children?: React.ReactNode;
    intensity?: number;
    glareEnabled?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    className?: string;
}

export function ParallaxCard({
    children,
    intensity = 15,
    glareEnabled = true,
    backgroundColor = '#1f2937',
    borderColor = 'rgba(255, 255, 255, 0.1)',
    className = '',
}: ParallaxCardProps) {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
        const rotateYValue = (mouseX / (rect.width / 2)) * intensity;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);

        // Glare position
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlarePosition({ x: glareX, y: glareY });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative overflow-hidden rounded-xl p-6 cursor-pointer ${className}`}
            style={{
                backgroundColor,
                border: `1px solid ${borderColor}`,
                transformStyle: 'preserve-3d',
            }}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Content */}
            <div style={{ transform: 'translateZ(30px)' }}>
                {children || (
                    <div className="text-center">
                        <div className="text-4xl mb-3">🎨</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Parallax Card</h3>
                        <p className="text-gray-400 text-sm">
                            Move your mouse over this card to see the 3D tilt effect
                        </p>
                    </div>
                )}
            </div>

            {/* Glare Effect */}
            {glareEnabled && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                    }}
                    animate={{
                        opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </motion.div>
    );
}
