'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Heart, X } from 'lucide-react';

interface FloatingDonateButtonProps {
    position?: 'bottom-right' | 'bottom-left';
}

export function FloatingDonateButton({ position = 'bottom-right' }: FloatingDonateButtonProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const positionClasses = position === 'bottom-right'
        ? 'right-4 md:right-6 bottom-4 md:bottom-6'
        : 'left-4 md:left-6 bottom-4 md:bottom-6';

    return (
        <div className={`fixed ${positionClasses} z-40`}>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-16 right-0 w-64 p-4 bg-surface-raised border border-surface-border rounded-xl shadow-xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="absolute top-2 right-2 p-1 rounded-lg hover:bg-surface transition-colors"
                        >
                            <X className="w-4 h-4 text-text-muted" />
                        </button>

                        {/* Content */}
                        <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <motion.div
                                    animate={{
                                        y: [0, -4, 0],
                                        rotate: [0, -5, 5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                                >
                                    <Coffee className="w-6 h-6 text-white" />
                                </motion.div>
                            </div>

                            <h4 className="font-semibold text-text-primary mb-1">
                                Support this project
                            </h4>
                            <p className="text-sm text-text-muted mb-3">
                                Buy me a coffee to keep the animations flowing! ☕
                            </p>

                            <a
                                href="https://buymeacoffee.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Coffee className="w-4 h-4" />
                                <span>Buy me a coffee</span>
                            </a>

                            <p className="text-xs text-text-muted mt-2">
                                $1-2 helps a lot! 💜
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group"
                whileTap={{ scale: 0.95 }}
            >
                {/* Animated glow ring */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-lg"
                    animate={{
                        opacity: isHovered ? 0.6 : 0.3,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Button body */}
                <motion.div
                    className="relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg text-white font-medium"
                    animate={{
                        y: [0, -2, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Animated coffee cup with steam */}
                    <div className="relative">
                        <Coffee className="w-5 h-5" />
                        {/* Steam particles */}
                        <motion.div
                            className="absolute -top-1 left-1/2 w-1 h-1 bg-white/60 rounded-full"
                            animate={{
                                y: [-2, -8],
                                opacity: [0.8, 0],
                                x: [0, 2]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: 0
                            }}
                        />
                        <motion.div
                            className="absolute -top-1 left-1/2 w-0.5 h-0.5 bg-white/40 rounded-full"
                            animate={{
                                y: [-2, -6],
                                opacity: [0.6, 0],
                                x: [0, -1]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: 0.3
                            }}
                        />
                    </div>

                    {/* Text - hide on very small screens */}
                    <span className="hidden sm:inline text-sm">Buy me a coffee</span>

                    {/* Heart pulse */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    >
                        <Heart className="w-4 h-4 fill-white/80" />
                    </motion.div>
                </motion.div>
            </motion.button>
        </div>
    );
}
