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
    action?: () => void; // Function to simulate interaction
}

export function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const [isDemonstrating, setIsDemonstrating] = useState(false);

    // Define steps inside to access actions
    const tourSteps: TourStep[] = [
        {
            icon: Sparkles,
            title: "Welcome to Motionry! 👋",
            description: "Let's learn how to use this library in 3 simple steps.",
            emoji: "🚀",
        },
        {
            icon: Search,
            title: "1. Filter by Category",
            description: "Start by selecting a category on the left. You can switch between Micro-Animations, Backgrounds, and Video Assets.",
            emoji: "📂",
            targetSelector: '[data-tour="sidebar"]', // Whole sidebar
            position: 'right',
            pointerPosition: { x: 50, y: 30 },
        },
        {
            icon: Copy,
            title: "2. One-Click Copy",
            description: "See that button? Clicking it instantly copies the code (React/Framer Motion) to your clipboard.",
            emoji: "⚡",
            tip: "We'll show you exactly where to click!",
            targetSelector: '[data-tour="animation-card"]', // First card
            position: 'bottom',
            pointerPosition: { x: 88, y: 22 }, // Point to copy button
            action: () => {
                // Simulate hover to show button
                const card = document.querySelector('[data-tour="animation-card"]');
                if (card) {
                    card.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                }
            }
        },
        {
            icon: Sliders,
            title: "3. Customize Details",
            description: "Click anywhere else on the card to open the Detail View. There you can tweak settings and see the full code.",
            emoji: "🎨",
            targetSelector: '[data-tour="animation-card"]',
            position: 'top',
            pointerPosition: { x: 50, y: 50 },
        },
        {
            icon: Search,
            title: "Pro Tip: Quick Search",
            description: "Press '/' anytime to jump to search. Find animations by name, tag, or use-case.",
            emoji: "⌨️",
            targetSelector: '[data-tour="search-bar"]',
            position: 'bottom',
        }
    ];

    const totalSteps = tourSteps.length;
    const step = tourSteps[currentStep];

    // Update Target & Scroll
    useEffect(() => {
        if (!isOpen) return;

        const updatePosition = () => {
            if (step.targetSelector) {
                const element = document.querySelector(step.targetSelector);
                if (element) {
                    // Smooth scroll to target
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Wait for scroll to finish before updating rect
                    setTimeout(() => {
                        setTargetRect(element.getBoundingClientRect());

                        // Trigger action simulation
                        if (step.action) {
                            setIsDemonstrating(true);
                            step.action();
                            setTimeout(() => setIsDemonstrating(false), 2000);
                        }
                    }, 600); // Wait 600ms for smooth scroll
                }
            } else {
                setTargetRect(null);
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [currentStep, isOpen, step]);

    // Modal Positioning Logic
    const getModalStyle = (): React.CSSProperties => {
        if (!targetRect || !step.position) {
            return {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '32rem',
            };
        }

        const padding = 24;
        const modalWidth = 400;
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
                top = Math.min(targetRect.bottom + padding, window.innerHeight - 250);
                left = Math.max(padding, Math.min(targetRect.left + targetRect.width / 2, window.innerWidth - modalWidth / 2 - padding));
                return { position: 'fixed', top, left, transform: 'translateX(-50%)', maxWidth: '28rem' };
            case 'top':
                top = Math.max(padding, targetRect.top - padding - 250);
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
                    {/* Spotlight Overlay */}
                    <div className="fixed inset-0 z-[100] pointer-events-none">
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
                                    fill="rgba(0, 0, 0, 0.7)"
                                    mask="url(#spotlight-mask)"
                                    className="backdrop-blur-[2px] transition-all duration-500 ease-out"
                                />
                            </svg>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            />
                        )}

                        {/* Target Highlight Ring */}
                        {targetRect && (
                            <motion.div
                                layoutId="highlight-ring"
                                className="absolute rounded-xl border-2 border-accent/50 box-border"
                                style={{
                                    top: targetRect.top - 12,
                                    left: targetRect.left - 12,
                                    width: targetRect.width + 24,
                                    height: targetRect.height + 24,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {/* Ping effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl border border-accent"
                                    animate={{ scale: [1, 1.1], opacity: [1, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </motion.div>
                        )}

                        {/* Animated Pointer Hand */}
                        {targetRect && step.pointerPosition && (
                            <motion.div
                                className="absolute z-50 text-accent filter drop-shadow-lg"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    top: targetRect.top + (targetRect.height * step.pointerPosition.y / 100),
                                    left: targetRect.left + (targetRect.width * step.pointerPosition.x / 100),
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            >
                                <MousePointer2
                                    className="w-12 h-12 fill-accent/20"
                                    style={{ transform: 'rotate(-25deg)' }}
                                />

                                {/* Click Ripple Effect */}
                                {isDemonstrating && (
                                    <motion.div
                                        className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 border-accent bg-accent/20"
                                        initial={{ scale: 0.5, opacity: 1 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* Interaction Blocker */}
                    <div className="fixed inset-0 z-[101]" onClick={handleSkip} />

                    {/* Tour Modal Card */}
                    <motion.div
                        className="fixed z-[102] w-full bg-surface/95 backdrop-blur-md border border-surface-border rounded-2xl shadow-2xl overflow-hidden"
                        style={getModalStyle()}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        key={currentStep} // Re-animate on step change
                        transition={{ type: "spring", duration: 0.5 }}
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
                        <div className="h-1 bg-surface-border w-full">
                            <motion.div
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-3xl shadow-inner shrink-0 leading-none pt-1">
                                    {step.emoji}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text-primary mb-2">{step.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                                    {step.tip && (
                                        <div className="mt-3 flex items-center gap-2 text-xs text-accent bg-accent/5 px-2 py-1 rounded border border-accent/10 w-fit">
                                            <Sparkles className="w-3 h-3" />
                                            {step.tip}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-surface-raised/50 border-t border-surface-border flex justify-between items-center">
                            <button
                                onClick={handleFinish}
                                className="text-xs text-text-muted hover:text-text-primary font-medium px-2 py-1"
                            >
                                Skip
                            </button>

                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className="p-2 rounded-lg hover:bg-surface-active disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-text-primary" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-bold shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                                >
                                    {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
