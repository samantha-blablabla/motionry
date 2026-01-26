'use client';

import { useState, useRef, useEffect } from 'react'; // Added useEffect and useRef
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
// ... imports
import {
  Sparkles,
  LayoutGrid,
  Layers,
  Video,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

function SidebarItem({ icon: Icon, label, isActive, onClick, count }: SidebarItemProps) {
  // ... item implementation (unchanged logic, just context)
  // I will not repeat the whole SidebarItem function to save tokens if logic is same,
  // but the tool requires Context. I will assume SidebarItem is stable.
  // Actually I need to replace the imports and the Sidebar component.
  // Let's replace the interfaces and the Sidebar component.
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 8
      });
      setIsHovered(true);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        className={cn(
          'w-10 h-10 xl:w-12 xl:h-12 rounded-lg xl:rounded-xl flex items-center justify-center transition-all duration-300 relative',
          isActive
            ? 'text-accent'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={label}
      >
        <Icon className="w-5 h-5 xl:w-6 xl:h-6" />

        {isActive && (
          <motion.div
            layoutId="sidebar-active-glow"
            className="absolute inset-0 rounded-lg xl:rounded-xl bg-accent/15 -z-10"
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>

      {mounted && createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="fixed z-[9999] flex items-center whitespace-nowrap pointer-events-none"
              style={{
                top: coords.top,
                left: coords.left,
                transform: 'translateY(-50%)'
              }}
              initial={{ opacity: 0, x: -10, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: -10, y: "-50%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-surface-border shadow-xl">
                <span className="text-sm font-medium text-text-primary">{label}</span>
                {count !== undefined && count > 0 && (
                  <span className="text-[10px] text-text-muted bg-surface-raised px-1.5 py-0.5 rounded border border-surface-border">
                    {count}
                  </span>
                )}
              </div>
              <div
                className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-surface-border bg-surface"
                style={{ zIndex: -1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

interface SidebarProps {
  activeGroup: 'home' | 'components' | 'design' | 'videos';
  onGroupChange: (group: 'home' | 'components' | 'design' | 'videos') => void;
  counts?: { components: number; design: number; videos: number };
}

export function Sidebar({ activeGroup, onGroupChange, counts }: SidebarProps) {

  return (
    <aside
      className="hidden lg:flex w-16 xl:w-20 h-screen sticky top-0 z-50 border-r border-surface-border bg-surface py-6 flex-col items-center"
      data-tour="sidebar"
    >
      {/* 1. Home / Logo */}
      <motion.button
        onClick={() => onGroupChange('home')}
        className={cn(
          "w-10 h-10 xl:w-12 xl:h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group mb-8",
          activeGroup === 'home'
            ? "bg-accent text-white shadow-lg shadow-accent/25 ring-2 ring-accent/20"
            : "bg-surface-raised hover:bg-surface-raised/80 text-text-secondary hover:text-text-primary"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className={cn(
          "w-5 h-5 xl:w-6 xl:h-6 transition-transform",
          activeGroup === 'home' ? "fill-white/20" : "fill-transparent"
        )} />

        {/* Active Glow */}
        {activeGroup === 'home' && (
          <motion.div
            layoutId="sidebar-active-glow"
            className="absolute inset-0 rounded-xl bg-accent blur-md opacity-40 -z-10"
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>

      {/* Navigation Icons Group */}
      <nav className="flex flex-col gap-6 w-full items-center">
        {/* 2. Micro-animations */}
        <SidebarItem
          icon={LayoutGrid}
          label="Micro-animations"
          isActive={activeGroup === 'components'}
          onClick={() => onGroupChange('components')}
          count={counts?.components}
        />

        {/* 3. Design Sources */}
        <SidebarItem
          icon={Layers}
          label="Design Sources"
          isActive={activeGroup === 'design'}
          onClick={() => onGroupChange('design')}
          count={counts?.design}
        />

        {/* 4. Video Assets */}
        <SidebarItem
          icon={Video}
          label="Video Assets"
          isActive={activeGroup === 'videos'}
          onClick={() => onGroupChange('videos')}
          count={counts?.videos}
        />
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col items-center">
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
