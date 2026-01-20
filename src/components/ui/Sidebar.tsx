'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MousePointerClick,
  TextCursor,
  Loader,
  LayoutGrid,
  MessageSquare,
  Bell,
  Type,
  Menu,
  Sparkles,
  Compass,
  AppWindow
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MousePointerClick,
  TextCursor,
  Loader,
  LayoutGrid,
  AppWindow, // Cards
  MessageSquare,
  Bell,
  Type,
  Menu,
  Compass, // Navigation
};

interface SidebarProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  animationCounts?: Record<string, number>;
}

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

function SidebarItem({ icon: Icon, label, isActive, onClick, count }: SidebarItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        onClick={onClick}
        className={cn(
          'w-8 h-8 xl:w-12 xl:h-12 rounded-lg xl:rounded-xl flex items-center justify-center transition-all duration-300 relative',
          isActive
            ? 'bg-accent/15 text-accent'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={label}
      >
        <Icon className="w-4 h-4 xl:w-5 xl:h-5" />
      </motion.button>

      {/* Name Tag Reveal Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-[calc(100%+8px)] z-50 flex items-center whitespace-nowrap overflow-visible pointer-events-none"
            initial={{ width: 0, opacity: 0, x: -10 }}
            animate={{ width: 'auto', opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Tooltip Content - Solid Background, no blur */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-surface-border shadow-xl">
              <span className="text-sm font-medium text-text-primary">{label}</span>
              {count !== undefined && count > 0 && (
                <span className="text-[10px] text-text-muted bg-surface-raised px-1.5 py-0.5 rounded border border-surface-border">
                  {count}
                </span>
              )}
            </div>

            {/* Left triangle pointer to connect with icon */}
            <div
              className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-surface-border bg-surface"
              style={{ zIndex: -1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ categories, activeCategory, onCategoryChange, animationCounts = {} }: SidebarProps) {
  const totalAnimations = Object.values(animationCounts).reduce((a, b) => a + b, 0);

  return (
    <aside className="hidden lg:flex w-16 xl:w-20 h-screen sticky top-0 z-50 border-r border-surface-border bg-surface py-3 xl:py-6 flex-col items-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Logo */}
      <div className="mb-4 xl:mb-8 shrink-0">
        <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-lg xl:rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/20">
          <Sparkles className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5 xl:gap-4 w-full items-center min-h-min">
        {/* All Animations */}
        <SidebarItem
          icon={LayoutGrid}
          label="All Animations"
          isActive={activeCategory === null}
          onClick={() => onCategoryChange(null)}
          count={totalAnimations}
        />

        <div className="w-8 h-[1px] bg-surface-border/50 my-1.5 xl:my-2 shrink-0" />

        {/* Categories */}
        <div className="flex flex-col gap-1.5 xl:gap-3 w-full items-center pb-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || LayoutGrid;

            return (
              <SidebarItem
                key={category.id}
                icon={Icon}
                label={category.name}
                isActive={activeCategory === category.id}
                onClick={() => onCategoryChange(category.id)}
                count={animationCounts[category.id]}
              />
            );
          })}
        </div>
      </nav>

      {/* Footer / Settings or Info */}
      <div className="mt-auto pt-2 xl:pt-4 flex flex-col gap-1.5 xl:gap-2 items-center shrink-0">
        <div className="w-8 h-[1px] bg-surface-border/50 mb-1.5 xl:mb-2" />
        <SidebarItem
          icon={Menu}
          label="More info"
          isActive={false}
          onClick={() => { }}
        />
      </div>
    </aside>
  );
}
