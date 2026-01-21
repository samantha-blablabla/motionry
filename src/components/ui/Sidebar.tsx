'use client';

import { useState, useRef, useEffect } from 'react'; // Added useEffect and useRef
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
// ... imports
import {
  Sparkles,
  LayoutGrid,
  Layers,
  Menu, // Added Menu
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
  activeGroup: 'components' | 'design';
  onGroupChange: (group: 'components' | 'design') => void;
  counts?: { components: number; design: number };
}

export function Sidebar({ activeGroup, onGroupChange, counts }: SidebarProps) {

  return (
    <aside className="hidden lg:flex w-16 xl:w-20 h-screen sticky top-0 z-50 border-r border-surface-border bg-surface py-3 xl:py-6 flex-col items-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Logo */}
      <div className="mb-4 xl:mb-8 shrink-0">
        <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-lg xl:rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/20">
          <Sparkles className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 flex flex-col gap-1.5 xl:gap-4 w-full items-center min-h-min">
        {/* Group 1: Micro-animations (Components) */}
        <SidebarItem
          icon={LayoutGrid}
          label="Micro-animations"
          isActive={activeGroup === 'components'}
          onClick={() => onGroupChange('components')}
          count={counts?.components}
        />

        <div className="w-8 h-[1px] bg-surface-border/50 my-1.5 xl:my-2 shrink-0" />

        {/* Group 2: Design Sources */}
        <SidebarItem
          icon={Layers}
          label="Design Sources"
          isActive={activeGroup === 'design'}
          onClick={() => onGroupChange('design')}
          count={counts?.design}
        />
      </nav>

      {/* Footer / Settings */}
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
