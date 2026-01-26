'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
    targetSelector?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    pointerPosition?: { x: number; y: number };
    action?: () => void;
}

export function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const [isDemonstrating, setIsDemonstrating] = useState(false);
    const [isStepVisible, setIsStepVisible] = useState(true); // Control visibility for transitions

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
            targetSelector: '[data-tour="sidebar"]',
            position: 'right',
            pointerPosition: { x: 50, y: 30 },
        },
        {
            icon: Copy,
            title: "2. One-Click Copy",
            description: "See that button? Clicking it instantly copies the code (React/Framer Motion) to your clipboard.",
            emoji: "⚡",
            tip: "We'll show you exactly where to click!",
            targetSelector: '[data-tour="animation-card"]',
            position: 'bottom',
            pointerPosition: { x: 88, y: 22 },
            action: () => {
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

    // Helper to check if element is in viewport
    const isInViewport = (rect: DOMRect) => {
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Update Target & Scroll with FADE transition
    useEffect(() => {
        if (!isOpen) return;

        let timeoutId: NodeJS.Timeout;

        const updatePosition = () => {
            // 1. Hide current step UI
            setIsStepVisible(false);
            setTargetRect(null); // Clear rect immediately to prevent jumping spotlight

            // 2. Wait for fade out, then scroll and find new target
            timeoutId = setTimeout(() => {
                if (step.targetSelector) {
                    const element = document.querySelector(step.targetSelector);
                    if (element) {
                        const rect = element.getBoundingClientRect();

                        // Only scroll if NOT FULLY in viewport
                        if (!isInViewport(rect)) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }

                        // 3. Wait for scroll to settle/finish
                        setTimeout(() => {
                            const newRect = element.getBoundingClientRect();
                            setTargetRect(newRect);
                            setIsStepVisible(true); // Show UI again

                            // Trigger action
                            if (step.action) {
                                setIsDemonstrating(true);
                                step.action();
                                setTimeout(() => setIsDemonstrating(false), 2000);
                            }
                        }, 500); // 500ms scroll buffer
                    }
                } else {
                    // No target (Welcome step), just show UI
                    setTargetRect(null);
                    setIsStepVisible(true);
                }
            }, 300); // 300ms fade out duration
        };

        updatePosition();

        return () => clearTimeout(timeoutId);
    }, [currentStep, isOpen, step]);

    // Window resize handler
    useEffect(() => {
        const handleResize = () => {
            if (step.targetSelector) {
                const element = document.querySelector(step.targetSelector);
                if (element) setTargetRect(element.getBoundingClientRect());
            }
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        }
    }, [step]);


    const getModalStyle = (): React.CSSProperties => {
        if (!targetRect || !step.position) {
            return {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '32rem',
                margin: 0
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
            setIsStepVisible(true);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Spotlight Overlay */}
                    <motion.div
                        className="fixed inset-0 z-[100] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isStepVisible && targetRect ? (
                            <svg className="absolute inset-0 w-full h-full transition-all duration-300">
                                <defs>
                                    <mask id="spotlight-mask">
                                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                        <motion.rect
                                            initial={{ x: targetRect.left - 8, y: targetRect.top - 8, width: targetRect.width + 16, height: targetRect.height + 16 }}
                                            animate={{
                                                x: targetRect.left - 8,
                                                y: targetRect.top - 8,
                                                width: targetRect.width + 16,
                                                height: targetRect.height + 16
                                            }}
                                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
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
                                    className="backdrop-blur-[2px]"
                                />
                            </svg>
                        ) : (
                            <motion.div
                                key="overlay-bg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
                            />
                        )}

                        {/* Target Highlight Ring */}
                        {isStepVisible && targetRect && (
                            <motion.div
                                layoutId="highlight-ring"
                                className="absolute rounded-xl border-2 border-accent/50 box-border"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    top: targetRect.top - 12,
                                    left: targetRect.left - 12,
                                    width: targetRect.width + 24,
                                    height: targetRect.height + 24,
                                }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <div className="absolute inset-0 rounded-xl border border-accent animate-ping opacity-20" />
                            </motion.div>
                        )}

                        {/* Animated Pointer Hand */}
                        {isStepVisible && targetRect && step.pointerPosition && (
                            <motion.div
                                className="absolute z-50 text-accent filter drop-shadow-lg"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    top: targetRect.top + (targetRect.height * step.pointerPosition.y / 100),
                                    left: targetRect.left + (targetRect.width * step.pointerPosition.x / 100),
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
                            >
                                <MousePointer2
                                    className="w-12 h-12 fill-accent/20"
                                    style={{ transform: 'rotate(-25deg)' }}
                                />

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
                    </motion.div>

                    {/* Interaction Blocker */}
                    <div className="fixed inset-0 z-[101]" onClick={handleSkip} />

                    {/* Tour Modal Card */}
                    <AnimatePresence mode="wait">
                        {isStepVisible && (
                            <motion.div
                                key={currentStep}
                                className="fixed z-[102] w-full bg-surface/95 backdrop-blur-md border border-surface-border rounded-2xl shadow-2xl overflow-hidden"
                                style={getModalStyle()}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ type: "spring", duration: 0.4 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={handleSkip}
                                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface hover:bg-surface-overlay transition-colors z-10"
                                >
                                    <X className="w-4 h-4 text-text-muted" />
                                </button>

                                <div className="h-1 bg-surface-border w-full">
                                    <motion.div
                                        className="h-full bg-accent"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                        transition={{ duration: 0.5 }}
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
                                    <div className="flex gap-1">
                                        {tourSteps.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentStep ? 'bg-accent' : 'bg-surface-border'}`}
                                            />
                                        ))}
                                    </div>

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
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
}
