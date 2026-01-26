'use client';

import { motion } from 'framer-motion';
import { useId, useEffect, useState, useRef } from 'react';

interface DotMatrixWaveProps {
    color?: string;
    spacing?: number;
    speed?: number;
}

export const DotMatrixWave = ({
    color = '#6366f1',
    spacing = 30,
    speed = 2,
}: DotMatrixWaveProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dots, setDots] = useState<number[]>([]);
    const [cols, setCols] = useState(0);

    useEffect(() => {
        const updateGrid = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();

            const numCols = Math.floor(width / spacing);
            const numRows = Math.floor(height / spacing);
            const totalDots = numCols * numRows;

            setCols(numCols);
            setDots(Array.from({ length: totalDots }, (_, i) => i));
        };

        updateGrid();
        window.addEventListener('resize', updateGrid);
        return () => window.removeEventListener('resize', updateGrid);
    }, [spacing]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden bg-black"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${spacing}px, 1fr))`,
                gap: 0,
            }}
        >
            {dots.map((i) => {
                // Calculate grid position for wave effect
                const row = Math.floor(i / cols);
                const col = i % cols;

                return (
                    <div key={i} className="flex items-center justify-center w-full h-full">
                        <motion.div
                            className="rounded-full"
                            style={{
                                width: 4,
                                height: 4,
                                background: color
                            }}
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.2, 1, 0.2]
                            }}
                            transition={{
                                duration: speed,
                                repeat: Infinity,
                                // Create diagonal wave effect: delay based on x + y
                                delay: (col + row) * 0.1,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};
