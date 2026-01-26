'use client';

import { motion } from 'framer-motion';
import { AnimationCard } from './AnimationCard';
import type { Animation } from '@/lib/types';

interface AnimationGridProps {
  animations: Animation[];
  onSelect: (animation: Animation) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

export function AnimationGrid({ animations, onSelect }: AnimationGridProps) {
  if (animations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-overlay flex items-center justify-center mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-1">No animations found</h3>
        <p className="text-text-muted">Try selecting a different category</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {animations.map((animation) => (
        <motion.div key={animation.id} variants={itemVariants}>
          <AnimationCard animation={animation} onSelect={onSelect} />
        </motion.div>
      ))}
    </motion.div>
  );
}
