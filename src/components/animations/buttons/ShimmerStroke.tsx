'use client';

import { motion } from 'framer-motion';

interface ShimmerStrokeProps {
  duration?: number;
  glowColor?: string;
  backgroundColor?: string;
  textColor?: string;
  children?: React.ReactNode;
}

export function ShimmerStroke({
  duration = 1.5,
  glowColor = '#ffffff',
  backgroundColor = '#1a1a1e',
  textColor = '#ffffff',
  children = 'Hover me'
}: ShimmerStrokeProps) {
  return (
    <motion.button
      className="relative px-6 py-3 rounded-xl font-medium text-sm overflow-hidden group"
      style={{ backgroundColor, color: textColor }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-[-2px] rounded-xl opacity-100"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${glowColor}, transparent 30%)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner background to create border effect */}
      <div
        className="absolute inset-[2px] rounded-[10px]"
        style={{ backgroundColor }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
