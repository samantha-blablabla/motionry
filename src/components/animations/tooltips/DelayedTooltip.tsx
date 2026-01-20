'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface DelayedTooltipProps {
  delay?: number;
  offset?: number;
  content?: string;
  backgroundColor?: string;
  textColor?: string;
  triggerBackground?: string;
  iconColor?: string;
}

export function DelayedTooltip({
  delay = 500,
  offset = 8,
  content = 'This is a helpful tooltip!',
  backgroundColor = '#1a1a1e',
  textColor = '#ffffff',
  triggerBackground = '#1a1a1e',
  iconColor = '#6366f1'
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
        className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-help"
        style={{ background: triggerBackground, border: '1px solid rgba(255,255,255,0.1)' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
      >
        <Info className="w-4 h-4" style={{ color: iconColor }} />
        <span className="text-sm" style={{ color: textColor }}>Hover me</span>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10"
            style={{ background: backgroundColor, border: '1px solid rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0, y: offset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: offset }}
            transition={{ duration: 0.15 }}
          >
            <span className="text-sm" style={{ color: textColor }}>{content}</span>
            {/* Arrow */}
            <div
              className="absolute left-1/2 top-full -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-inherit border-r border-b"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                backgroundColor: backgroundColor,
                transform: 'translate(-50%, -50%) rotate(45deg)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
