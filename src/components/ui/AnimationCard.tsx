'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Play } from 'lucide-react';
import { cn, copyToClipboard } from '@/lib/utils';
import { getAnimationComponent, hasAnimationComponent } from '@/registry';
import type { Animation } from '@/lib/types';

interface AnimationCardProps {
  animation: Animation;
  onSelect: (animation: Animation) => void;
}

export function AnimationCard({ animation, onSelect }: AnimationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleQuickCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = animation.code.framerMotion || animation.code.css || '';
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get the actual animation component from registry
  const AnimationComponent = getAnimationComponent(animation.id);
  const hasComponent = hasAnimationComponent(animation.id);

  return (
    <motion.div
      className={cn(
        'group relative rounded-xl border border-surface-border bg-surface-raised overflow-hidden cursor-pointer',
        'transition-colors hover:border-accent/30'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(animation)}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Preview Area */}
      <div className="aspect-[4/3] bg-surface flex items-center justify-center p-6 relative overflow-hidden">
        {hasComponent && AnimationComponent ? (
          <AnimationComponent />
        ) : (
          <FallbackPreview animation={animation} isPlaying={isHovered} />
        )}
        
        {/* Hover overlay with play indicator */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
        )} />
        
        {/* Play indicator */}
        <div className={cn(
          'absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs',
          'bg-surface-overlay/80 backdrop-blur-sm transition-opacity',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}>
          <Play className="w-3 h-3 fill-current" />
          <span>Interactive</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 border-t border-surface-border">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-text-primary truncate">
              {animation.name}
            </h3>
            <p className="text-sm text-text-muted mt-0.5 line-clamp-2">
              {animation.description}
            </p>
          </div>
          
          {/* Quick Copy Button */}
          <motion.button
            onClick={handleQuickCopy}
            className={cn(
              'flex-shrink-0 p-2 rounded-lg transition-colors',
              'bg-surface hover:bg-accent/10 hover:text-accent'
            )}
            whileTap={{ scale: 0.95 }}
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {animation.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-surface text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Fallback preview for animations without registered components
function FallbackPreview({ animation, isPlaying }: { animation: Animation; isPlaying: boolean }) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium text-sm";
  
  switch (animation.category) {
    case 'buttons':
      return (
        <motion.button
          className={cn(baseClasses, 'bg-accent text-white')}
          animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0, repeatDelay: 1 }}
        >
          Hover me
        </motion.button>
      );
    
    case 'loaders':
      return (
        <div className="w-full max-w-[200px] h-2 bg-surface-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            animate={isPlaying ? { width: ['0%', '100%'] } : { width: '60%' }}
            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
          />
        </div>
      );
    
    default:
      return (
        <motion.div
          className="w-16 h-16 bg-accent/20 rounded-xl border border-accent/30"
          animate={isPlaying ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0, repeatDelay: 1 }}
        />
      );
  }
}
