'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg bg-surface-raised border border-surface-border hover:border-text-muted transition-colors"
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
                {theme === 'dark' ? (
                    <Moon className="w-4 h-4 text-text-secondary" />
                ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                )}
            </motion.div>
        </motion.button>
    );
}
