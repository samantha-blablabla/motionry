'use client';

import { Suspense, useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/ui/Header';
import { AnimationGrid } from '@/components/ui/AnimationGrid';
import { AnimationModal } from '@/components/ui/AnimationModal';
import { LibraryHero } from '@/components/ui/LibraryHero';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { ToastProvider } from '@/components/ui/Toast';
import { CategoryTabs } from '@/components/ui/CategoryTabs';
import { AnimationRow } from '@/components/ui/AnimationRow';
import { FloatingDonateButton } from '@/components/ui/FloatingDonateButton';
import animationsData from '@/data/animations.json';
import type { Animation, AnimationsData } from '@/lib/types';

const data = animationsData as unknown as AnimationsData;

function LibraryContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize from URL params
    const [activeGroup, setActiveGroup] = useState<'home' | 'components' | 'design' | 'videos'>('home');
    const [activeCategory, setActiveCategory] = useState<string | null>(
        searchParams.get('category') || null
    );
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get('q') || ''
    );
    const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sync URL when filters change
    const updateURL = useCallback((category: string | null, query: string) => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (query.trim()) params.set('q', query);

        const newPath = params.toString() ? `/library?${params.toString()}` : '/library';
        router.replace(newPath, { scroll: false });
    }, [router]);

    // Update URL when category or search changes
    useEffect(() => {
        updateURL(activeCategory, searchQuery);
    }, [activeCategory, searchQuery, updateURL]);

    // Handle category change
    const handleCategoryChange = (categoryId: string | null) => {
        setActiveCategory(categoryId);
    };

    // Handle search change
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    // Calculate animation counts
    const groupCounts = useMemo(() => {
        return {
            components: data.animations.filter(a => data.categories.find(c => c.id === a.category)?.group !== 'design' && data.categories.find(c => c.id === a.category)?.group !== 'videos').length,
            design: data.animations.filter(a => data.categories.find(c => c.id === a.category)?.group === 'design').length,
            videos: data.animations.filter(a => data.categories.find(c => c.id === a.category)?.group === 'videos').length
        };
    }, []);

    // Calculate animation counts per category (for MobileMenu)
    const animationCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        data.animations.forEach(a => {
            counts[a.category] = (counts[a.category] || 0) + 1;
        });
        return counts;
    }, []);

    // Video specific state
    const [videoFilter, setVideoFilter] = useState<'all' | 'newest' | 'dark' | 'light'>('all');

    // Filter categories based on group
    const filteredCategories = useMemo(() => {
        if (activeGroup === 'home' || activeGroup === 'videos') return []; // No standard tabs for Home or Videos

        return data.categories.filter(c => {
            if (activeGroup === 'design') return c.group === 'design';
            return c.group !== 'design' && c.group !== 'videos'; // Default to components
        });
    }, [activeGroup]);

    // Filter animations based on category and search
    const filteredAnimations = useMemo(() => {
        let result = data.animations;

        // Filter by group
        if (activeGroup !== 'home') {
            result = result.filter(a => {
                const category = data.categories.find(c => c.id === a.category);
                if (activeGroup === 'design') return category?.group === 'design';
                if (activeGroup === 'videos') return category?.group === 'videos';
                return category?.group !== 'design' && category?.group !== 'videos';
            });

            // Video specific filtering
            if (activeGroup === 'videos') {
                if (videoFilter === 'newest') {
                    result = [...result].reverse();
                } else if (videoFilter === 'dark') {
                    result = result.filter(a => a.tags.some(t => ['dark', 'black', 'night', 'space'].includes(t.toLowerCase())));
                } else if (videoFilter === 'light') {
                    result = result.filter(a => a.tags.some(t => ['light', 'white', 'sky', 'cloud'].includes(t.toLowerCase())));
                }
            }
        }


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
    }, [activeCategory, searchQuery, activeGroup, videoFilter]);

    // Showcase Data Logic
    const showcaseSections = useMemo(() => {
        if (activeCategory || searchQuery || activeGroup === 'videos') return null; // Don't show showcase if filtered or in Videos mode

        const makeRow = (title: string, items: Animation[], href?: string, sub?: string) => ({
            title, subtitle: sub, animations: items, href
        });

        const allAnimations = data.animations;

        // Helper to get animations by ID
        const getByIds = (ids: string[]) => allAnimations.filter(a => ids.includes(a.id));
        // Helper to get by Group
        const getByGroup = (g: string) => allAnimations.filter(a => {
            const cat = data.categories.find(c => c.id === a.category);
            return g === 'design' ? cat?.group === 'design' : cat?.group !== 'design';
        });

        if (activeGroup === 'home') {
            // Mixed Showcase
            const featuredIds = ['magnetic-hover', 'cursor-flow', 'aurora-background', 'text-reveal', 'card-swipe', 'border-beam'];
            const featured = getByIds(featuredIds);
            const latest = [...allAnimations].reverse().slice(0, 10);
            const design = getByGroup('design').slice(0, 6);
            const components = getByGroup('components').filter(a => !featuredIds.includes(a.id)).slice(0, 6); // Trending proxy

            return [
                makeRow("Featured Collections", featured, "/library?group=components", "Hand-picked favorites for you"),
                makeRow("Latest Additions", latest, "/library", "Freshly baked components & assets"),
                makeRow("Design Sources", design, "/library?group=design", "High quality backgrounds & patterns"),
                makeRow("Trending Components", components, "/library?group=components", "Most popular interactive elements")
            ];
        }

        // Disable showcase for Components, Design, and Videos -> forcing Grid View (Subpage)
        // This matches user request to treat them as subpages with full grids
        // specific filtering is handled by filteredAnimations and AnimationGrid

        return null;
    }, [activeGroup, activeCategory, searchQuery]);

    // ... existing handlers ...

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
        <ToastProvider>
            <div className="flex min-h-screen">
                {/* Sidebar - Desktop only */}
                <Sidebar
                    activeGroup={activeGroup}
                    onGroupChange={(group) => {
                        setActiveGroup(group);
                        setActiveCategory(null); // Reset category when switching groups
                    }}
                    counts={groupCounts}
                />

                {/* Mobile Menu */}
                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    categories={data.categories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                    animationCounts={animationCounts}
                />

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0">
                    <Header
                        onSearch={handleSearchChange}
                        totalCount={data.animations.length}
                        filteredCount={filteredAnimations.length}
                        onMenuToggle={() => setIsMobileMenuOpen(true)}
                        title={
                            activeCategory
                                ? data.categories.find(c => c.id === activeCategory)?.name
                                : activeGroup === 'videos' ? "Video Backgrounds"
                                    : activeGroup === 'design' ? "Design Sources"
                                        : activeGroup === 'components' ? "Micro-Animations"
                                            : "Animation Library"
                        }
                        description={
                            activeCategory
                                ? data.categories.find(c => c.id === activeCategory)?.description
                                : activeGroup === 'videos' ? "Curated high-quality looping videos"
                                    : activeGroup === 'design' ? "High quality backgrounds, patterns & textures"
                                        : activeGroup === 'components' ? "Interactive elements and functional micro-interactions"
                                            : undefined
                        }
                    />

                    {/* Hero Section - Only show when no search/filter is active and on Home */}
                    {!searchQuery && !activeCategory && activeGroup === 'home' && <LibraryHero />}

                    <div className="flex-1 p-4 lg:p-6">
                        {filteredCategories.length > 0 && (
                            <div className="mb-6">
                                <CategoryTabs
                                    categories={filteredCategories}
                                    activeCategory={activeCategory}
                                    onCategoryChange={handleCategoryChange}
                                />
                            </div>
                        )}

                        {/* Video Custom Filters */}
                        {activeGroup === 'videos' && (
                            <div className="mb-8 flex gap-2">
                                {['all', 'newest', 'dark', 'light'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setVideoFilter(filter as any)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${videoFilter === filter
                                            ? 'bg-white text-black shadow-lg shadow-white/10'
                                            : 'bg-surface hover:bg-surface-raised text-text-muted hover:text-text-primary'
                                            }`}
                                    >
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Showcase View vs Grid View */}
                        {!activeCategory && !searchQuery && showcaseSections ? (
                            <div className="space-y-12 pb-10">
                                {showcaseSections.map((section, i) => (
                                    <AnimationRow
                                        key={i}
                                        {...section}
                                        onSelect={handleSelectAnimation}
                                        index={i}
                                    />
                                ))}
                            </div>
                        ) : (
                            <AnimationGrid
                                animations={filteredAnimations}
                                onSelect={handleSelectAnimation}
                            />
                        )}
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

                {/* Floating Donate Button - Temporarily hidden per user request */}
                {/* <FloatingDonateButton /> */}
            </div>
        </ToastProvider>
    );
}

// Loading fallback for Suspense
function LibraryLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <p className="text-text-muted text-sm">Loading library...</p>
            </div>
        </div>
    );
}

export default function LibraryPage() {
    return (
        <Suspense fallback={<LibraryLoading />}>
            <LibraryContent />
        </Suspense>
    );
}

