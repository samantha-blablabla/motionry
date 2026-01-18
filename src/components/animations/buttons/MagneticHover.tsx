'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticHoverProps {
  strength?: number;
  smoothing?: number;
  backgroundColor?: string;
  textColor?: string;
  children?: React.ReactNode;
}

export function MagneticHover({
  strength = 0.3,
  smoothing = 150,
  backgroundColor = '#6366f1',
  textColor = '#ffffff',
  children = 'Hover me'
}: MagneticHoverProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: smoothing, damping: 15 });
  const springY = useSpring(y, { stiffness: smoothing, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className="px-6 py-3 rounded-xl font-medium text-sm"
      style={{ x: springX, y: springY, backgroundColor, color: textColor }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
