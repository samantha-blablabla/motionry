'use client';

import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/ui/Header';
import { AnimationGrid } from '@/components/ui/AnimationGrid';
import { AnimationModal } from '@/components/ui/AnimationModal';
import animationsData from '@/data/animations.json';
import type { Animation, AnimationsData } from '@/lib/types';

const data = animationsData as AnimationsData;

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // Delay clearing animation to allow exit animation
    setTimeout(() => setSelectedAnimation(null), 300);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        categories={data.categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Header
          onSearch={setSearchQuery}
          totalCount={data.animations.length}
          filteredCount={filteredAnimations.length}
        />

        <div className="flex-1 p-6">
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
      />
    </div>
  );
}
