'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface NameTagRevealProps {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  name?: string;
  tagBackground?: string;
  tagTextColor?: string;
}

export function NameTagReveal({
  direction = 'right',
  name = 'John Doe',
  tagBackground = '#1a1a1e',
  tagTextColor = '#ffffff'
}: NameTagRevealProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getNamePosition = () => {
    switch (direction) {
      case 'left':
        return { left: 'auto', right: '100%', top: '50%', translateY: '-50%', marginRight: 8 };
      case 'right':
        return { left: '100%', right: 'auto', top: '50%', translateY: '-50%', marginLeft: 8 };
      case 'top':
        return { left: '50%', bottom: '100%', translateX: '-50%', marginBottom: 8 };
      case 'bottom':
        return { left: '50%', top: '100%', translateX: '-50%', marginTop: 8 };
    }
  };

  const getAnimationProps = () => {
    switch (direction) {
      case 'left':
        return { initial: { width: 0, opacity: 0, x: 10 }, animate: { width: 'auto', opacity: 1, x: 0 } };
      case 'right':
        return { initial: { width: 0, opacity: 0, x: -10 }, animate: { width: 'auto', opacity: 1, x: 0 } };
      case 'top':
        return { initial: { height: 0, opacity: 0, y: 10 }, animate: { height: 'auto', opacity: 1, y: 0 } };
      case 'bottom':
        return { initial: { height: 0, opacity: 0, y: -10 }, animate: { height: 'auto', opacity: 1, y: 0 } };
    }
  };

  const position = getNamePosition();
  const animProps = getAnimationProps();

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar */}
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center cursor-pointer"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <User className="w-6 h-6 text-white" />
      </motion.div>

      {/* Name Tag */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          left: position.left,
          right: position.right,
          top: position.top,
          bottom: position.bottom,
          transform: `translateX(${position.translateX || 0}) translateY(${position.translateY || 0})`,
          marginLeft: position.marginLeft,
          marginRight: position.marginRight,
          marginTop: position.marginTop,
          marginBottom: position.marginBottom,
        }}
        initial={animProps.initial}
        animate={isHovered ? animProps.animate : animProps.initial}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="px-3 py-1.5 rounded-lg whitespace-nowrap" style={{ background: tagBackground, border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-sm font-medium" style={{ color: tagTextColor }}>{name}</span>
        </div>
      </motion.div>
    </div>
  );
}
