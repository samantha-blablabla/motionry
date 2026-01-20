'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Play } from 'lucide-react';
import { cn, copyToClipboard } from '@/lib/utils';
import { getAnimationComponent, hasAnimationComponent } from '@/registry';
import { useToast } from './Toast';
import type { Animation } from '@/lib/types';

interface AnimationCardProps {
  animation: Animation;
  onSelect: (animation: Animation) => void;
}

export function AnimationCard({ animation, onSelect }: AnimationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleQuickCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = animation.code.framerMotion || animation.code.css || '';
    await copyToClipboard(code);
    setCopied(true);
    showToast(`Copied "${animation.name}" code!`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get the actual animation component from registry
  const AnimationComponent = getAnimationComponent(animation.id);
  const hasComponent = hasAnimationComponent(animation.id);

  return (
    <motion.div
      className={cn(
        'group relative rounded-xl border border-surface-border bg-surface-raised cursor-pointer card-glow',
        'transition-all hover:border-accent/50'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(animation)}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Preview Area */}
      <motion.div
        className="aspect-[16/10] bg-surface flex items-center justify-center p-4 relative overflow-hidden rounded-t-xl"
        onClick={(e) => e.stopPropagation()}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Grid Dots Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {hasComponent && AnimationComponent ? (
          <div className={cn(
            "w-full h-full flex items-center justify-center origin-center transform-gpu relative z-[1]",
            animation.category === 'navigation' ? 'scale-[0.75]' :
              animation.category === 'cards' ? 'scale-[0.8]' : 'scale-[0.9]'
          )}>
            <AnimationComponent />
          </div>
        ) : (
          <FallbackPreview animation={animation} isPlaying={isHovered} />
        )}

        {/* Animated glow ring on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-t-xl"
          animate={{
            boxShadow: isHovered
              ? 'inset 0 0 30px rgba(99, 102, 241, 0.15)'
              : 'inset 0 0 0px rgba(99, 102, 241, 0)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Hover overlay with play indicator */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
        )} />

        {/* Play indicator */}
        <motion.div
          className={cn(
            'absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs',
            'bg-surface-overlay/80 backdrop-blur-sm'
          )}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.2 }}
        >
          <Play className="w-3 h-3 fill-current text-accent" />
          <span className="text-accent font-medium">Interactive</span>
        </motion.div>
      </motion.div>

      {/* Info Section - overflow-visible to allow tooltip to show */}
      <div className="p-4 border-t border-surface-border flex flex-col h-full bg-surface-raised/50 overflow-visible">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-text-primary truncate text-base">
              {animation.name}
            </h3>
            {/* Extended spacing between title and description */}
            <p className="text-sm text-text-muted mt-2 line-clamp-2 h-10 leading-5">
              {animation.description}
            </p>
          </div>

          {/* Quick Copy Button */}
          <motion.button
            onClick={handleQuickCopy}
            className={cn(
              'flex-shrink-0 p-2 rounded-lg transition-colors relative group/copy mt-0.5',
              'bg-surface hover:bg-accent/10 hover:text-accent border border-surface-border/50'
            )}
            whileTap={{ scale: 0.95 }}
          >
            {/* Custom Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-surface-overlay border border-surface-border rounded opacity-0 group-hover/copy:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
              {copied ? 'Copied!' : 'Copy code'}
            </span>
            <motion.div
              initial={false}
              animate={copied ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.2 }}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Tags with increased top spacing and consistent gap */}
        <div className="flex flex-wrap gap-2 mt-4">
          {animation.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-md bg-surface text-text-secondary border border-surface-border/50 font-medium"
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
