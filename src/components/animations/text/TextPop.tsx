'use client';

import { motion } from 'framer-motion';

interface TextPopProps {
  lift?: number;
  stagger?: number;
  text?: string;
}

export function TextPop({ 
  lift = -8, 
  stagger = 30,
  text = 'Hover me!'
}: TextPopProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="text-2xl font-bold text-text-primary inline-block cursor-default"
          whileHover={{ y: lift, color: '#6366f1' }}
          transition={{ 
            type: 'spring', 
            stiffness: 500, 
            damping: 15,
            delay: 0 // Remove stagger on individual hover for better UX
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

// Alternative: Wave effect on container hover
export function TextPopWave({ 
  lift = -8, 
  stagger = 30,
  text = 'Hover me!'
}: TextPopProps) {
  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: stagger / 1000,
      }
    }
  };

  const letterVariants = {
    initial: { y: 0 },
    hover: { 
      y: lift,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15,
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-wrap justify-center cursor-pointer"
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="text-2xl font-bold text-text-primary inline-block"
          variants={letterVariants}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
