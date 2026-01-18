'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface DelayedTooltipProps {
  delay?: number;
  offset?: number;
  content?: string;
}

export function DelayedTooltip({ 
  delay = 500, 
  offset = 8,
  content = 'This is a helpful tooltip!'
}: DelayedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div className="relative inline-flex">
      {/* Trigger */}
      <motion.div
        className="flex items-center gap-2 px-4 py-2 bg-surface-overlay border border-surface-border rounded-lg cursor-help"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
      >
        <Info className="w-4 h-4 text-accent" />
        <span className="text-sm text-text-primary">Hover me</span>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 px-3 py-2 bg-surface-overlay border border-surface-border rounded-lg shadow-lg whitespace-nowrap z-10"
            initial={{ opacity: 0, y: offset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: offset }}
            transition={{ duration: 0.15 }}
          >
            <span className="text-sm text-text-primary">{content}</span>
            {/* Arrow */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-px">
              <div className="border-8 border-transparent border-t-surface-border" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-surface-overlay" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
