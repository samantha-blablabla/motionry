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
import { SkeletonLoaderDemo } from '@/components/animations/loaders/SkeletonLoader';
import { AccordionCollapse } from '@/components/animations/navigation/AccordionCollapse';
import { RippleButton } from '@/components/animations/buttons/RippleButton';
import { CountUpDemo } from '@/components/animations/text/CountUp';
import { ParallaxCard } from '@/components/animations/cards/ParallaxCard';
// New animations - Batch 3
import { GradientText } from '@/components/animations/text/GradientText';
import { SpotlightCard } from '@/components/animations/cards/SpotlightCard';
import { BorderBeam } from '@/components/animations/cards/BorderBeam';
import { StaggeredMenu } from '@/components/animations/navigation/StaggeredMenu';
import { TextReveal } from '@/components/animations/text/TextReveal';
// Backgrounds
import { AuroraBackground } from '@/components/animations/backgrounds/AuroraBackground';
import { GridPattern } from '@/components/animations/backgrounds/GridPattern';
import { DotPattern } from '@/components/animations/backgrounds/DotPattern';

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
  'skeleton-loader': SkeletonLoaderDemo,
  'accordion-collapse': AccordionCollapse,
  'ripple-button': RippleButton,
  'count-up': CountUpDemo,
  'parallax-card': ParallaxCard,
  // New animations - Batch 3
  'gradient-text': GradientText,
  'spotlight-card': SpotlightCard,
  'border-beam': BorderBeam,
  'staggered-menu': StaggeredMenu,
  'text-reveal': TextReveal,
  // Backgrounds
  'aurora-background': AuroraBackground,
  'grid-pattern': GridPattern,
  'dot-pattern': DotPattern,
};

// Helper to get component by ID
export function getAnimationComponent(id: string): ComponentType<any> | null {
  return animationRegistry[id] || null;
}

// Check if animation has a registered component
export function hasAnimationComponent(id: string): boolean {
  return id in animationRegistry;
}
