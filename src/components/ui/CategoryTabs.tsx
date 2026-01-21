'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';

interface CategoryTabsProps {
    categories: Category[];
    activeCategory: string | null;
    onCategoryChange: (categoryId: string | null) => void;
    className?: string;
}

export function CategoryTabs({
    categories,
    activeCategory,
    onCategoryChange,
    className
}: CategoryTabsProps) {
    // Sort categories: "All" first (manually handled), then A-Z
    const sortedCategories = [...categories].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const tabs = [
        { id: null, name: 'All' },
        ...sortedCategories
    ];

    return (
        <div className={cn("w-full overflow-x-auto pb-4 no-scrollbar", className)}>
            <div className="flex items-center gap-2">
                {tabs.map((tab) => {
                    const isActive = activeCategory === tab.id;

                    return (
                        <button
                            key={tab.id || 'all'}
                            onClick={() => onCategoryChange(tab.id as string | null)}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                                isActive
                                    ? "text-white"
                                    : "text-text-muted hover:text-text-primary hover:bg-surface-raised"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-accent rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    style={{ zIndex: -1 }}
                                />
                            )}
                            {tab.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
