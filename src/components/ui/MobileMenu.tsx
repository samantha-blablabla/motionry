'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutGrid, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';
import {
    MousePointerClick,
    TextCursor,
    Loader,
    MessageSquare,
    Bell,
    Type,
    Menu,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    MousePointerClick,
    TextCursor,
    Loader,
    LayoutGrid,
    MessageSquare,
    Bell,
    Type,
    Menu,
};

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    activeCategory: string | null;
    onCategoryChange: (categoryId: string | null) => void;
    animationCounts?: Record<string, number>;
}

export function MobileMenu({
    isOpen,
    onClose,
    categories,
    activeCategory,
    onCategoryChange,
    animationCounts = {},
}: MobileMenuProps) {
    const handleCategoryClick = (categoryId: string | null) => {
        onCategoryChange(categoryId);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.aside
                        className="fixed top-0 left-0 h-full w-72 bg-surface border-r border-surface-border z-50 lg:hidden flex flex-col"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-surface-border">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <h1 className="font-semibold text-text-primary">Motionry</h1>
                                    <p className="text-xs text-text-muted">Micro Animations</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-surface-raised transition-colors"
                            >
                                <X className="w-5 h-5 text-text-secondary" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                            <button
                                onClick={() => handleCategoryClick(null)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all text-left',
                                    activeCategory === null
                                        ? 'bg-accent/10 text-accent'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                                )}
                            >
                                <LayoutGrid className="w-5 h-5" />
                                <span className="flex-1">All Animations</span>
                                <span className="text-xs text-text-muted bg-surface px-2 py-0.5 rounded">
                                    {Object.values(animationCounts).reduce((a, b) => a + b, 0)}
                                </span>
                            </button>

                            <div className="pt-4 pb-2">
                                <span className="px-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                                    Categories
                                </span>
                            </div>

                            {categories.map((category) => {
                                const Icon = iconMap[category.icon] || LayoutGrid;

                                return (
                                    <motion.button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors text-left',
                                            activeCategory === category.id
                                                ? 'bg-accent/10 text-accent'
                                                : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                                        )}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="flex-1">{category.name}</span>
                                        {animationCounts[category.id] && (
                                            <span className="text-xs text-text-muted bg-surface px-2 py-0.5 rounded">
                                                {animationCounts[category.id]}
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </nav>

                        {/* Footer */}
                        <div className="p-4 border-t border-surface-border">
                            <p className="text-xs text-text-muted text-center">
                                Open source • Made with 💜
                            </p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
