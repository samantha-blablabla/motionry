'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface HelpButtonProps {
    onClick: () => void;
}

export function HelpButton({ onClick }: HelpButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-purple-600 text-white shadow-lg shadow-accent/30 flex items-center justify-center group hover:shadow-xl hover:shadow-accent/40 transition-shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 1
            }}
        >
            {/* Pulse animation */}
            <motion.div
                className="absolute inset-0 rounded-full bg-accent"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            <HelpCircle className="w-6 h-6 relative z-10" />

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 right-0 px-3 py-1.5 bg-surface-overlay border border-surface-border rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                Need help? Take the tour!
            </div>
        </motion.button>
    );
}
