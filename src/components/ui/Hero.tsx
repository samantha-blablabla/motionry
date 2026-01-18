'use client';

import { motion } from 'framer-motion';
import { Sparkles, Github, Play } from 'lucide-react';

interface HeroProps {
    onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-surface">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient orbs */}
                <motion.div
                    className="absolute w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-accent/20 blur-[120px]"
                    style={{ top: '10%', left: '20%' }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-purple-500/15 blur-[100px]"
                    style={{ bottom: '10%', right: '15%' }}
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 lg:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent" />
                    <span className="text-xs lg:text-sm text-accent font-medium">Open Source Animation Library</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-text-primary mb-3 lg:mb-5"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                >
                    <span className="block">Micro</span>
                    <span className="block bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Animations
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-base lg:text-lg xl:text-xl text-text-secondary max-w-2xl mx-auto mb-6 lg:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    A curated collection of beautiful UI animations with AI-friendly prompts.
                    Copy the perfect animation for your next project in seconds.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <motion.button
                        onClick={onExplore}
                        className="group flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-base lg:text-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Play className="w-4 h-4 lg:w-5 lg:h-5" />
                        Browse Library
                        <motion.span
                            className="inline-block"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.button>

                    <motion.a
                        href="https://github.com/samantha-blablabla/motionry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 rounded-xl border border-surface-border hover:border-text-muted bg-surface-raised/50 hover:bg-surface-raised text-text-primary font-semibold text-base lg:text-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Github className="w-4 h-4 lg:w-5 lg:h-5" />
                        View on GitHub
                    </motion.a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="flex items-center justify-center gap-6 sm:gap-10 lg:gap-12 mt-8 lg:mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">10+</div>
                        <div className="text-xs lg:text-sm text-text-muted">Animations</div>
                    </div>
                    <div className="w-px h-8 lg:h-10 bg-surface-border" />
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">7</div>
                        <div className="text-xs lg:text-sm text-text-muted">Categories</div>
                    </div>
                    <div className="w-px h-8 lg:h-10 bg-surface-border" />
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">∞</div>
                        <div className="text-xs lg:text-sm text-text-muted">Possibilities</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

