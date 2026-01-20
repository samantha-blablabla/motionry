'use client';

import { ComponentType } from 'react';

// Import all animation components
import { JellyBounce } from '@/components/animations/buttons/JellyBounce';
import { ShimmerStroke } from '@/components/animations/buttons/ShimmerStroke';
import { MagneticHover } from '@/components/animations/buttons/MagneticHover';
import { ToastSlide } from '@/components/animations/toasts/ToastSlide';
import { SearchExpand } from '@/components/animations/inputs/SearchExpand';
import { ProgressFill } from '@/components/animations/loaders/ProgressFill';
import { DelayedTooltip } from '@/components/animations/tooltips/DelayedTooltip';
import { CardSwipe } from '@/components/animations/cards/CardSwipe';
import { TextPop } from '@/components/animations/text/TextPop';
import { NameTagReveal } from '@/components/animations/tooltips/NameTagReveal';
// New animations - Batch 1
import { PulseRing } from '@/components/animations/loaders/PulseRing';
import { FlipCard } from '@/components/animations/cards/FlipCard';
import { Typewriter } from '@/components/animations/text/Typewriter';
import { FloatingLabel } from '@/components/animations/inputs/FloatingLabel';
import { SlideToggle } from '@/components/animations/inputs/SlideToggle';
// New animations - Batch 2
import { SkeletonLoader } from '@/components/animations/loaders/SkeletonLoader';
import { AccordionCollapse } from '@/components/animations/navigation/AccordionCollapse';
import { RippleButton } from '@/components/animations/buttons/RippleButton';
import { CountUp } from '@/components/animations/text/CountUp';
import { ParallaxCard } from '@/components/animations/cards/ParallaxCard';

// Registry type
type AnimationRegistry = {
  [key: string]: ComponentType<any>;
};

// Map animation IDs to their components
export const animationRegistry: AnimationRegistry = {
  'jelly-bounce': JellyBounce,
  'shimmer-stroke': ShimmerStroke,
  'magnetic-hover': MagneticHover,
  'toast-slide': ToastSlide,
  'search-expand': SearchExpand,
  'progress-fill': ProgressFill,
  'tooltip-delayed': DelayedTooltip,
  'card-swipe': CardSwipe,
  'text-pop': TextPop,
  'name-tag-reveal': NameTagReveal,
  // New animations - Batch 1
  'pulse-ring': PulseRing,
  'flip-card': FlipCard,
  'typewriter': Typewriter,
  'floating-label': FloatingLabel,
  'slide-toggle': SlideToggle,
  // New animations - Batch 2
  'skeleton-loader': SkeletonLoader,
  'accordion-collapse': AccordionCollapse,
  'ripple-button': RippleButton,
  'count-up': CountUp,
  'parallax-card': ParallaxCard,
};

// Helper to get component by ID
export function getAnimationComponent(id: string): ComponentType<any> | null {
  return animationRegistry[id] || null;
}

// Check if animation has a registered component
export function hasAnimationComponent(id: string): boolean {
  return id in animationRegistry;
}
