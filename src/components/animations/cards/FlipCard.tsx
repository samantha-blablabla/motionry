'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
    frontContent?: React.ReactNode;
    backContent?: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    trigger?: 'hover' | 'click';
    frontBackground?: string;
    backBackground?: string;
    textColor?: string;
}

export function FlipCard({
    frontContent = 'Front',
    backContent = 'Back',
    direction = 'horizontal',
    trigger = 'hover',
    frontBackground = 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    backBackground = 'linear-gradient(135deg, #ec4899, #f43f5e)',
    textColor = '#ffffff',
}: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const rotateAxis = direction === 'horizontal' ? 'rotateY' : 'rotateX';

    const handleInteraction = () => {
        if (trigger === 'click') {
            setIsFlipped(!isFlipped);
        }
    };

    const hoverProps = trigger === 'hover' ? {
        onMouseEnter: () => setIsFlipped(true),
        onMouseLeave: () => setIsFlipped(false),
    } : {};

    return (
        <div
            className="relative cursor-pointer"
            style={{
                width: 240,
                height: 140,
                perspective: 1000,
            }}
            onClick={handleInteraction}
            {...hoverProps}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    [rotateAxis]: isFlipped ? 180 : 0,
                }}
                transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-xl flex items-center justify-center font-semibold text-sm backface-hidden"
                    style={{
                        background: frontBackground,
                        color: textColor,
                        backfaceVisibility: 'hidden',
                    }}
                >
                    {frontContent}
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-xl flex items-center justify-center font-semibold text-sm"
                    style={{
                        background: backBackground,
                        color: textColor,
                        backfaceVisibility: 'hidden',
                        transform: `${rotateAxis}(180deg)`,
                    }}
                >
                    {backContent}
                </div>
            </motion.div>
        </div>
    );
}
