'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Copy, Search, Sliders, MousePointer2 } from 'lucide-react';

interface OnboardingTourProps {
    isOpen: boolean;
    onClose: () => void;
}

interface TourStep {
    icon: any;
    title: string;
    description: string;
    emoji: string;
    tip?: string;
    targetSelector?: string; // CSS selector for element to highlight
    position?: 'top' | 'bottom' | 'left' | 'right'; // Modal position relative to target
    pointerPosition?: { x: number; y: number }; // Animated pointer position (% of target element)
}

const tourSteps: TourStep[] = [
    {
        icon: Sparkles,
        title: "Welcome to Motionry! ✨",
        description: "Your premium library of micro-animations and design resources. Let's show you around in just 30 seconds!",
        emoji: "👋",
    },
    {
        icon: Search,
        title: "Browse & Discover",
        description: "Explore 40+ animations organized by category. Click on the sidebar items to switch between different sections.",
        emoji: "🔍",
        tip: "Try clicking 'Micro-Animations' to see all interactive components!",
        targetSelector: '[data-tour="sidebar"]',
        position: 'right',
    },
    {
        icon: Copy,
        title: "Copy Code Instantly",
        description: "Found something you like? Every card has a copy button in the top-right. Just one click to grab the code!",
        emoji: "⚡",
        tip: "Look for the copy icon - it's always ready!",
        targetSelector: '[data-tour="animation-card"]',
        position: 'bottom',
        pointerPosition: { x: 88, y: 22 }, // Point to top-right copy button
    },
    {
        icon: Sliders,
        title: "Customize & Experiment",
        description: "Click any card to open the customization modal. Adjust parameters in real-time and see instant previews!",
        emoji: "🎨",
        tip: "Changes are previewed instantly - try it out!",
        targetSelector: '[data-tour="animation-card"]',
        position: 'top',
    },
    {
        icon: Search,
        title: "Search & Filter",
        description: "Use the search bar to find animations by name, description, or tags. Try searching 'hover' or 'loading'!",
        emoji: "🎯",
        tip: "Pro tip: Search works across all animations",
        targetSelector: '[data-tour="search-bar"]',
        position: 'bottom',
    }
];

export function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const totalSteps = tourSteps.length;
    const step = tourSteps[currentStep];

    // Calculate target element position
    useEffect(() => {
        if (!isOpen || !step.targetSelector) {
            setTargetRect(null);
            return;
        }

        const updateTargetRect = () => {
            const element = document.querySelector(step.targetSelector!);
            if (element) {
                const rect = element.getBoundingClientRect();
                setTargetRect(rect);
            }
        };

        // Initial update with delay to ensure DOM is ready
        setTimeout(updateTargetRect, 100);

        window.addEventListener('resize', updateTargetRect);
        window.addEventListener('scroll', updateTargetRect);

        return () => {
            window.removeEventListener('resize', updateTargetRect);
            window.removeEventListener('scroll', updateTargetRect);
        };
    }, [isOpen, step.targetSelector, currentStep]);

    // Calculate modal position based on target and position preference
    const getModalStyle = (): React.CSSProperties => {
        if (!targetRect || !step.position) {
            // Center modal if no target
            return {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '32rem',
            };
        }

        const padding = 24;
        const modalWidth = 400; // Approximate
        let top = 0;
        let left = 0;

        switch (step.position) {
            case 'right':
                top = Math.max(padding, Math.min(targetRect.top + targetRect.height / 2, window.innerHeight - 300));
                left = Math.min(targetRect.right + padding, window.innerWidth - modalWidth - padding);
                return { position: 'fixed', top, left, transform: 'translateY(-50%)', maxWidth: '28rem' };

            case 'left':
                top = Math.max(padding, Math.min(targetRect.top + targetRect.height / 2, window.innerHeight - 300));
                left = Math.max(padding, targetRect.left - modalWidth - padding);
                return { position: 'fixed', top, left, transform: 'translateY(-50%)', maxWidth: '28rem' };

            case 'bottom':
                top = Math.min(targetRect.bottom + padding, window.innerHeight - 400);
                left = Math.max(padding, Math.min(targetRect.left + targetRect.width / 2, window.innerWidth - modalWidth / 2 - padding));
                return { position: 'fixed', top, left, transform: 'translateX(-50%)', maxWidth: '28rem' };

            case 'top':
                top = Math.max(padding, targetRect.top - padding - 300);
                left = Math.max(padding, Math.min(targetRect.left + targetRect.width / 2, window.innerWidth - modalWidth / 2 - padding));
                return { position: 'fixed', top, left, transform: 'translateX(-50%)', maxWidth: '28rem' };
        }
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinish();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinish = () => {
        localStorage.setItem('motionry_tour_completed', 'true');
        onClose();
    };

    const handleSkip = () => {
        localStorage.setItem('motionry_tour_completed', 'true');
        onClose();
    };

    // Reset to first step when opened
    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Custom Spotlight System */}
                    <div className="fixed inset-0 z-[100] pointer-events-none">
                        {/* Dark overlay with spotlight cutout */}
                        {targetRect ? (
                            <svg className="absolute inset-0 w-full h-full">
                                <defs>
                                    <mask id="spotlight-mask">
                                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                        <rect
                                            x={targetRect.left - 8}
                                            y={targetRect.top - 8}
                                            width={targetRect.width + 16}
                                            height={targetRect.height + 16}
                                            rx="12"
                                            fill="black"
                                        />
                                    </mask>
                                </defs>
                                <rect
                                    x="0"
                                    y="0"
                                    width="100%"
                                    height="100%"
                                    fill="rgba(0, 0, 0, 0.75)"
                                    mask="url(#spotlight-mask)"
                                    className="backdrop-blur-sm"
                                />
                            </svg>
                        ) : (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        )}

                        {/* Pulsing highlight border */}
                        {targetRect && (
                            <>
                                <motion.div
                                    className="absolute rounded-xl border-2 border-accent pointer-events-none"
                                    style={{
                                        top: targetRect.top - 8,
                                        left: targetRect.left - 8,
                                        width: targetRect.width + 16,
                                        height: targetRect.height + 16,
                                    }}
                                    animate={{
                                        scale: [1, 1.02, 1],
                                        opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />

                                {/* Glow effect */}
                                <motion.div
                                    className="absolute rounded-xl pointer-events-none"
                                    style={{
                                        top: targetRect.top - 8,
                                        left: targetRect.left - 8,
                                        width: targetRect.width + 16,
                                        height: targetRect.height + 16,
                                        boxShadow: '0 0 40px 10px rgba(99, 102, 241, 0.3)',
                                    }}
                                    animate={{
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </>
                        )}

                        {/* Animated Pointer */}
                        {targetRect && step.pointerPosition && (
                            <motion.div
                                className="absolute pointer-events-none z-10"
                                style={{
                                    top: targetRect.top + (targetRect.height * step.pointerPosition.y / 100),
                                    left: targetRect.left + (targetRect.width * step.pointerPosition.x / 100),
                                }}
                                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -12, 0],
                                    rotate: -45,
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{
                                    y: {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                            >
                                <div className="relative">
                                    <MousePointer2 className="w-10 h-10 text-accent drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" fill="currentColor" />
                                    {/* Ripple effect */}
                                    <motion.div
                                        className="absolute inset-0 border-2 border-accent rounded-full"
                                        animate={{
                                            scale: [1, 2],
                                            opacity: [0.8, 0],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: 'easeOut',
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Clickable backdrop to close */}
                    <div
                        className="fixed inset-0 z-[101]"
                        onClick={handleSkip}
                    />

                    {/* Tour Modal */}
                    <motion.div
                        ref={modalRef}
                        className="z-[102] w-full bg-surface-raised border border-surface-border rounded-2xl shadow-2xl overflow-hidden"
                        style={getModalStyle()}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleSkip}
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface hover:bg-surface-overlay transition-colors z-10"
                        >
                            <X className="w-4 h-4 text-text-muted" />
                        </button>

                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-surface-border">
                            <motion.div
                                className="h-full bg-gradient-to-r from-accent to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6 pt-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl">{step.emoji}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-text-muted mb-0.5">
                                                Step {currentStep + 1} of {totalSteps}
                                            </div>
                                            <h2 className="text-xl font-bold text-text-primary">
                                                {step.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Tip */}
                                    {step.tip && (
                                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                                            <div className="flex items-start gap-2">
                                                <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                                <p className="text-xs text-text-primary">
                                                    <span className="font-semibold">Tip:</span> {step.tip}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer Navigation */}
                        <div className="px-6 py-4 bg-surface border-t border-surface-border flex items-center justify-between">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 0}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-raised"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </button>

                            {/* Dots Indicator */}
                            <div className="flex items-center gap-1.5">
                                {tourSteps.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentStep(idx)}
                                        className={`h-1.5 rounded-full transition-all ${idx === currentStep
                                                ? 'bg-accent w-6'
                                                : idx < currentStep
                                                    ? 'bg-accent/50 w-1.5'
                                                    : 'bg-surface-border w-1.5'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Next/Finish Button */}
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent hover:bg-accent/90 text-white text-sm font-medium transition-all"
                            >
                                {currentStep === totalSteps - 1 ? "Got it!" : 'Next'}
                                {currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
