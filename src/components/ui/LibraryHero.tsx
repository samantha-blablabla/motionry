'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Tech stack with proper icons - white color, thicker stroke
const techStacks = [
    {
        name: 'React',
        icon: (
            <svg viewBox="-11.5 -10.232 23 20.463" className="w-6 h-6" fill="currentColor">
                <circle r="2.05" />
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
            </svg>
        ),
    },
    {
        name: 'Next.js',
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0Zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054Z" />
            </svg>
        ),
    },
    {
        name: 'Framer Motion',
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
            </svg>
        ),
    },
    {
        name: 'Tailwind CSS',
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            </svg>
        ),
    },
    {
        name: 'TypeScript',
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125Zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201Zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375Z" />
            </svg>
        ),
    },
];

// Star particle positions (relative to icon box)
const starPositions = [
    { x: -18, y: -16, delay: 0 },
    { x: 18, y: -14, delay: 0.03 },
    { x: -16, y: 12, delay: 0.06 },
    { x: 20, y: 14, delay: 0.09 },
];

function TechIcon({ tech, index }: { tech: typeof techStacks[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(true);
        }, 150); // 150ms delay to prevent accidental triggers
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
        >
            {/* Star particles on hover */}
            <AnimatePresence>
                {isHovered && starPositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute pointer-events-none text-accent z-10"
                        style={{ left: '50%', top: '50%' }}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                        animate={{
                            x: pos.x,
                            y: pos.y,
                            scale: 1,
                            opacity: [0, 1, 0],
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: pos.delay,
                            ease: 'easeOut'
                        }}
                    >
                        <Sparkles className="w-2.5 h-2.5" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Icon container with CSS transition for smoothness */}
            <div
                className={`
                    flex items-center h-11 rounded-xl border backdrop-blur-sm cursor-pointer
                    transition-all duration-300 ease-out overflow-hidden
                    ${isHovered
                        ? 'bg-accent/15 border-accent/40 px-3 gap-2'
                        : 'bg-white/5 border-white/10 w-11 justify-center'
                    }
                `}
            >
                <span className="text-white flex-shrink-0">
                    {tech.icon}
                </span>

                {/* Text label - uses CSS for smooth transition */}
                <span
                    className={`
                        text-xs font-medium text-white whitespace-nowrap
                        transition-all duration-200 ease-out
                        ${isHovered ? 'opacity-100 max-w-[100px]' : 'opacity-0 max-w-0'}
                    `}
                >
                    {tech.name}
                </span>
            </div>
        </motion.div>
    );
}

export function LibraryHero() {
    return (
        <section className="relative w-full py-10 lg:py-14 overflow-hidden bg-surface-raised/30 border-b border-surface-border">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-30" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
                        Discover community-made{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500">
                            animations & components
                        </span>
                    </h1>

                    {/* Tech Stack Icons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        {techStacks.map((tech, index) => (
                            <TechIcon key={tech.name} tech={tech} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
