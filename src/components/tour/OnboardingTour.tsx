'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Copy, Search, Sliders } from 'lucide-react';

interface OnboardingTourProps {
    isOpen: boolean;
    onClose: () => void;
}

const tourSteps = [
    {
        icon: Sparkles,
        title: "Welcome to Motionry! ✨",
        description: "Your premium library of micro-animations and design resources. Let's show you around in just 30 seconds!",
        emoji: "👋",
    },
    {
        icon: Search,
        title: "Browse & Discover",
        description: "Explore 40+ animations organized by category. Use the sidebar to switch between Micro-Animations, Design Sources, and Video Backgrounds.",
        emoji: "🔍",
        tip: "Click on any card to see it in action!"
    },
    {
        icon: Copy,
        title: "Copy Code Instantly",
        description: "Found something you like? Click the copy button on any card to grab the code. We support both Framer Motion and pure CSS implementations.",
        emoji: "⚡",
        tip: "Look for implementation badges to know what's available"
    },
    {
        icon: Sliders,
        title: "Customize & Experiment",
        description: "Open any animation modal to adjust parameters in real-time. Tweak colors, timing, and behavior to match your design perfectly.",
        emoji: "🎨",
        tip: "Changes are previewed instantly!"
    },
    {
        icon: Search,
        title: "Search & Filter",
        description: "Use the search bar to find animations by name, description, or tags. Filter by category to narrow down your options.",
        emoji: "🎯",
        tip: "Pro tip: Search by use-case like 'hover', 'loading', or 'interactive'"
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

                    {/* Tour Modal */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                        <motion.div
                            className="relative w-full max-w-2xl bg-surface-raised border border-surface-border rounded-2xl shadow-2xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
                            <div className="absolute top-0 left-0 right-0 h-1 bg-surface-border">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-accent to-purple-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-12">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Icon */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                                                <span className="text-3xl">{step.emoji}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 text-sm text-text-muted mb-1">
                                                    <span>Step {currentStep + 1} of {totalSteps}</span>
                                                </div>
                                                <h2 className="text-2xl font-bold text-text-primary">
                                                    {step.title}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-lg text-text-secondary leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Tip */}
                                        {step.tip && (
                                            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                                                <div className="flex items-start gap-3">
                                                    <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                    <p className="text-sm text-text-primary">
                                                        <span className="font-semibold">Tip:</span> {step.tip}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Footer Navigation */}
                            <div className="px-8 py-6 bg-surface border-t border-surface-border flex items-center justify-between">
                                {/* Previous Button */}
                                <button
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-raised"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>

                                {/* Dots Indicator */}
                                <div className="flex items-center gap-2">
                                    {tourSteps.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentStep(idx)}
                                            className={`w-2 h-2 rounded-full transition-all ${idx === currentStep
                                                    ? 'bg-accent w-6'
                                                    : idx < currentStep
                                                        ? 'bg-accent/50'
                                                        : 'bg-surface-border'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Next/Finish Button */}
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium transition-all"
                                >
                                    {currentStep === totalSteps - 1 ? "Let's Go!" : 'Next'}
                                    {currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
