'use client';

import { motion } from 'framer-motion';
import { 
  MousePointerClick, 
  TextCursor, 
  Loader, 
  LayoutGrid, 
  MessageSquare, 
  Bell, 
  Type, 
  Menu,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';

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

interface SidebarProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function Sidebar({ categories, activeCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-surface-border bg-surface p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="font-semibold text-text-primary">Motionry</h1>
          <p className="text-xs text-text-muted">Micro Animations</p>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="flex-1 space-y-1">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left',
            activeCategory === null
              ? 'bg-accent/10 text-accent'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
          )}
        >
          <LayoutGrid className="w-4 h-4" />
          All Animations
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
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left',
                activeCategory === category.id
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
              )}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-surface-border">
        <p className="text-xs text-text-muted">
          Open source • Made with 💜
        </p>
      </div>
    </aside>
  );
}
