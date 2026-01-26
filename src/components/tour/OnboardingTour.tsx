'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Copy, Search, Sliders } from 'lucide-react';

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
}

const tourSteps: TourStep[] = [
    {
        icon: Sparkles,
        title: "Welcome to Motionry! 👋",
        description: "Your premium library of micro-animations and design resources. Let's get you started.",
        emoji: "🚀",
    },
    {
        icon: Search,
        title: "1. Filter by Category",
        description: "Use the sidebar to explore different sections: Micro-Animations, Backgrounds, and Video Assets.",
        emoji: "📂",
    },
    {
        icon: Copy,
        title: "2. One-Click Copy",
        description: "Every card has a copy button in the top-right corner. One click copy the code for your project.",
        emoji: "⚡",
        tip: "Supports both React/Framer Motion and standard CSS.",
    },
    {
        icon: Sliders,
        title: "3. Customize Details",
        description: "Click on any animation card to enter Detail View, where you can customize parameters and preview changes.",
        emoji: "🎨",
    },
    {
        icon: Search,
        title: "Pro Tip: Quick Search",
        description: "Press '/' at any time to focus the search bar and find animations by name or tag.",
        emoji: "⌨️",
    }
];

export function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = tourSteps.length;
    const step = tourSteps[currentStep];

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
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleSkip}
                    />

                    {/* Centered Modal */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            className="w-full max-w-lg bg-surface-raised border border-surface-border rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleSkip}
                                className="absolute top-4 right-4 p-2 rounded-lg bg-surface hover:bg-surface-overlay transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-text-muted" />
                            </button>

                            {/* Progress Bar */}
                            <div className="h-1 bg-surface-border w-full">
                                <motion.div
                                    className="h-full bg-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-4xl shadow-inner shrink-0 border border-accent/20">
                                                {step.emoji}
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1 uppercase tracking-wider">
                                                    Step {currentStep + 1} of {totalSteps}
                                                </div>
                                                <h2 className="text-xl font-bold text-text-primary">
                                                    {step.title}
                                                </h2>
                                            </div>
                                        </div>

                                        <p className="text-base text-text-secondary leading-relaxed">
                                            {step.description}
                                        </p>

                                        {step.tip && (
                                            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-surface-border">
                                                <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                                <p className="text-sm text-text-secondary">
                                                    <span className="font-semibold text-text-primary">Tip:</span> {step.tip}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-5 bg-surface border-t border-surface-border flex justify-between items-center">
                                <button
                                    onClick={handleFinish}
                                    className="text-sm text-text-muted hover:text-text-primary px-2 transition-colors"
                                >
                                    Skip Tour
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentStep === 0}
                                        className="px-4 py-2 rounded-lg text-sm font-medium border border-surface-border hover:bg-surface-active disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-bold shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        {currentStep === totalSteps - 1 ? "Let's Start" : 'Next'}
                                        {currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
