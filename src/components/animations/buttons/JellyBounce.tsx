'use client';

import { motion } from 'framer-motion';

interface JellyBounceProps {
  stiffness?: number;
  damping?: number;
  scale?: number;
  children?: React.ReactNode;
}

export function JellyBounce({ 
  stiffness = 400, 
  damping = 10, 
  scale = 1.05,
  children = 'Hover me'
}: JellyBounceProps) {
  return (
    <motion.button
      className="px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm"
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
