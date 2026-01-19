'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressFillProps {
  duration?: number;
  shimmer?: boolean;
  fillColor?: string;
  trackColor?: string;
}

export function ProgressFill({
  duration = 2,
  shimmer = true,
  fillColor = '#6366f1',
  trackColor = '#2a2a2e'
}: ProgressFillProps) {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setProgress(0);
    setIsAnimating(true);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnimating(false);
          return 100;
        }
        return prev + 2;
      });
    }, duration * 10);
  };

  const resetAnimation = () => {
    setProgress(0);
    setIsAnimating(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[240px]">
      {/* Progress Bar */}
      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{ background: trackColor }}
      >
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: fillColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 15
          }}
        >
          {/* Shimmer overlay */}
          {shimmer && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: 'linear',
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Progress Text */}
      <span className="text-sm text-text-muted font-mono">{progress}%</span>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <motion.button
          className="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startAnimation}
          disabled={isAnimating}
        >
          {isAnimating ? 'Loading...' : 'Start'}
        </motion.button>
        <motion.button
          className="px-3 py-1.5 rounded-lg bg-surface-overlay text-text-secondary text-xs font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetAnimation}
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
}
