'use client';

import { motion } from 'framer-motion';

interface JellyBounceProps {
  stiffness?: number;
  damping?: number;
  scale?: number;
  backgroundColor?: string;
  textColor?: string;
  children?: React.ReactNode;
}

export function JellyBounce({
  stiffness = 400,
  damping = 10,
  scale = 1.05,
  backgroundColor = '#6366f1',
  textColor = '#ffffff',
  children = 'Hover me'
}: JellyBounceProps) {
  return (
    <motion.button
      className="px-6 py-3 rounded-xl font-medium text-sm"
      style={{ backgroundColor, color: textColor }}
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness,
        damping
      }}
    >
      {children}
    </motion.button>
  );
}
