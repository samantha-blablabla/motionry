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
};

// Helper to get component by ID
export function getAnimationComponent(id: string): ComponentType<any> | null {
  return animationRegistry[id] || null;
}

// Check if animation has a registered component
export function hasAnimationComponent(id: string): boolean {
  return id in animationRegistry;
}
