'use client';

import { motion } from 'framer-motion';

interface ShimmerStrokeProps {
  duration?: number;
  color?: string;
  children?: React.ReactNode;
}

export function ShimmerStroke({ 
  duration = 1.5, 
  color = '#ffffff',
  children = 'Hover me'
}: ShimmerStrokeProps) {
  return (
    <motion.button
      className="relative px-6 py-3 rounded-xl bg-surface-raised text-text-primary font-medium text-sm overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-[-2px] rounded-xl opacity-100"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}, transparent 30%)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Inner background to create border effect */}
      <div className="absolute inset-[2px] rounded-[10px] bg-surface-raised" />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
