'use client';

import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/ui/Header';
import { AnimationGrid } from '@/components/ui/AnimationGrid';
import { AnimationModal } from '@/components/ui/AnimationModal';
import { MobileMenu } from '@/components/ui/MobileMenu';
import animationsData from '@/data/animations.json';
import type { Animation, AnimationsData } from '@/lib/types';

const data = animationsData as unknown as AnimationsData;

export default function LibraryPage() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate animation counts per category
    const animationCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        data.animations.forEach(a => {
            counts[a.category] = (counts[a.category] || 0) + 1;
        });
        return counts;
    }, []);

    // Filter animations based on category and search
    const filteredAnimations = useMemo(() => {
        let result = data.animations;

        // Filter by category
        if (activeCategory) {
            result = result.filter(a => a.category === activeCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(a =>
                a.name.toLowerCase().includes(query) ||
                a.description.toLowerCase().includes(query) ||
                a.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return result;
    }, [activeCategory, searchQuery]);

    const handleSelectAnimation = (animation: Animation) => {
        setSelectedAnimation(animation);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedAnimation(null), 300);
    };

    // Navigate to next/previous animation
    const handleNavigateAnimation = (direction: 'next' | 'prev') => {
        if (!selectedAnimation) return;

        const currentIndex = filteredAnimations.findIndex(a => a.id === selectedAnimation.id);
        if (currentIndex === -1) return;

        let newIndex: number;
        if (direction === 'next') {
            newIndex = currentIndex + 1 >= filteredAnimations.length ? 0 : currentIndex + 1;
        } else {
            newIndex = currentIndex - 1 < 0 ? filteredAnimations.length - 1 : currentIndex - 1;
        }

        setSelectedAnimation(filteredAnimations[newIndex]);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar - Desktop only */}
            <Sidebar
                categories={data.categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                animationCounts={animationCounts}
            />

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                categories={data.categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                animationCounts={animationCounts}
            />

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <Header
                    onSearch={setSearchQuery}
                    totalCount={data.animations.length}
                    filteredCount={filteredAnimations.length}
                    onMenuToggle={() => setIsMobileMenuOpen(true)}
                />

                <div className="flex-1 p-4 lg:p-6">
                    <AnimationGrid
                        animations={filteredAnimations}
                        onSelect={handleSelectAnimation}
                    />
                </div>
            </main>

            {/* Modal */}
            <AnimationModal
                animation={selectedAnimation}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onNext={() => handleNavigateAnimation('next')}
                onPrev={() => handleNavigateAnimation('prev')}
            />
        </div>
    );
}
