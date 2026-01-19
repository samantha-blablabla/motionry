'use client';

import { motion } from 'framer-motion';
import {
    Sparkles,
    Square,
    Code2,
    Palette,
    MousePointer2,
    Zap,
    Layers,
    Box
} from 'lucide-react';

const floatingIcons = [
    { Icon: Sparkles, x: '10%', y: '20%', delay: 0, scale: 0.8 },
    { Icon: Square, x: '85%', y: '15%', delay: 1, scale: 1 },
    { Icon: Code2, x: '15%', y: '70%', delay: 2, scale: 0.9 },
    { Icon: Palette, x: '80%', y: '65%', delay: 0.5, scale: 1.1 },
    { Icon: MousePointer2, x: '5%', y: '45%', delay: 1.5, scale: 0.7 },
    { Icon: Zap, x: '90%', y: '40%', delay: 2.5, scale: 0.8 },
    { Icon: Layers, x: '25%', y: '10%', delay: 3, scale: 0.6 },
    { Icon: Box, x: '70%', y: '80%', delay: 1.2, scale: 0.9 },
];

export function LibraryHero() {
    return (
        <section className="relative w-full py-12 lg:py-16 overflow-hidden bg-surface-raised/30 border-b border-surface-border">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-30" />

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
                {floatingIcons.map(({ Icon, x, y, delay, scale }, index) => (
                    <motion.div
                        key={index}
                        className="absolute text-text-muted/10 dark:text-text-muted/20"
                        style={{ left: x, top: y }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: [scale, scale * 1.1, scale],
                            y: [0, -15, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 4 + (index % 3),
                            repeat: Infinity,
                            delay: delay,
                            ease: "easeInOut"
                        }}
                    >
                        <Icon size={32 * scale} strokeWidth={1.5} />
                    </motion.div>
                ))}
            </div>

            {/* Content - Title Only */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
                        Discover community-made{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500">
                            animations & components
                        </span>
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}
