'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { AnimationCard } from './AnimationCard';
import type { Animation } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AnimationRowProps {
    title: string;
    subtitle?: string;
    animations: Animation[];
    href?: string;
    onSelect: (animation: Animation) => void;
    className?: string;
    index?: number;
}

export function AnimationRow({
    title,
    subtitle,
    animations,
    href,
    onSelect,
    className,
    index = 0
}: AnimationRowProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 640; // Approx 2 cards
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (animations.length === 0) return null;

    return (
        <motion.div
            className={cn("space-y-4", className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-text-muted mt-1">{subtitle}</p>
                    )}
                </div>

                {href && (
                    <>
                        {/* Desktop: Explore More Text */}
                        <Link
                            href={href}
                            className="hidden lg:flex group items-center gap-1 text-sm font-medium text-text-muted hover:text-accent transition-colors pb-1"
                        >
                            Explore more
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        {/* Mobile: Compact arrow */}
                        <Link
                            href={href}
                            className="lg:hidden flex items-center gap-1 text-xs font-medium text-text-muted hover:text-accent transition-colors pb-1"
                        >
                            More
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </>
                )}
            </div>

            {/* Scrolling Row - Fixed Alignment: Removed bleed (-mx, px) */}
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {animations.map((animation, i) => (
                    <div
                        key={animation.id}
                        className="min-w-[320px] max-w-[320px] snap-start"
                    >
                        <AnimationCard
                            animation={animation}
                            onSelect={onSelect}
                        />
                    </div>
                ))}

                {/* Explore Card (End of list) - Mobile Only */}
                {href && (
                    <div className="min-w-[160px] snap-start flex items-center justify-center lg:hidden">
                        <Link
                            href={href}
                            className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-surface-border bg-surface-raised/50 hover:bg-surface-raised hover:border-accent/50 transition-all text-center"
                        >
                            <div className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-accent" />
                            </div>
                            <span className="text-sm font-medium text-text-muted group-hover:text-text-primary">View All</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Desktop Navigation Arrows (Bottom Right) */}
            <div className="hidden lg:flex justify-end gap-2">
                <button
                    onClick={() => scroll('left')}
                    className="p-2 rounded-full border border-surface-border bg-surface hover:bg-surface-raised text-text-secondary hover:text-text-primary transition-colors"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="p-2 rounded-full border border-surface-border bg-surface hover:bg-surface-raised text-text-secondary hover:text-text-primary transition-colors"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
}
