'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, User, Settings, Mail, Bell, Shield } from 'lucide-react';
import { useState } from 'react';

interface StaggeredMenuProps {
    items?: { label: string; icon: any }[];
    staggerDelay?: number;
    className?: string;
}

const defaultItems = [
    { label: 'Dashboard', icon: Home },
    { label: 'Profile', icon: User },
    { label: 'Messages', icon: Mail },
    { label: 'Notifications', icon: Bell },
    { label: 'Settings', icon: Settings },
    { label: 'Security', icon: Shield },
];

export function StaggeredMenu({
    items = defaultItems,
    staggerDelay = 0.1,
    className
}: StaggeredMenuProps) {
    const [isOpen, setIsOpen] = useState(true); // Always open for demo, or could toggle

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className={cn("p-4 w-64 bg-surface rounded-xl border border-surface-border", className)}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Menu</h3>
                <button onClick={() => setIsOpen(!isOpen)} className="text-xs text-accent hover:underline">
                    {isOpen ? 'Replay' : 'Show'}
                </button>
            </div>

            {/* Key forces re-render for replay */}
            {isOpen && (
                <motion.ul
                    key={JSON.stringify(isOpen)}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-1"
                >
                    {items.map((item, index) => (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 4 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
                        >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
}
