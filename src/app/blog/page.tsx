'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Sample blog posts - in real app, this would come from CMS/markdown
const posts = [
    {
        id: 'getting-started',
        title: 'Getting Started with Motionry',
        excerpt: 'Learn how to quickly add micro-animations to your project using AI prompts or code snippets.',
        category: 'Tutorial',
        date: '2024-01-15',
        readTime: '3 min',
        featured: true,
    },
    {
        id: 'best-button-animations',
        title: '5 Best Button Animations for 2024',
        excerpt: 'Discover the most engaging button animations that will delight your users without overwhelming them.',
        category: 'Tips',
        date: '2024-01-12',
        readTime: '4 min',
        featured: false,
    },
    {
        id: 'framer-motion-basics',
        title: 'Framer Motion Basics for Beginners',
        excerpt: 'A quick introduction to Framer Motion and how to create smooth animations in React.',
        category: 'Tutorial',
        date: '2024-01-10',
        readTime: '5 min',
        featured: false,
    },
    {
        id: 'performance-tips',
        title: 'Animation Performance Tips',
        excerpt: 'How to keep your animations smooth at 60fps while maintaining great user experience.',
        category: 'Tips',
        date: '2024-01-08',
        readTime: '4 min',
        featured: false,
    },
];

const categories = ['All', 'Tutorial', 'Tips', 'Updates'];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-surface">
            {/* Navigation */}
            <nav className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/library"
                        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Library</span>
                    </Link>

                    <Link
                        href="/about"
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                        About
                    </Link>
                </div>
            </nav>

            {/* Header */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-text-primary mb-3">Blog</h1>
                        <p className="text-text-secondary">Tips, tutorials, and updates about micro-animations</p>
                    </motion.div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {categories.map((cat, index) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${cat === 'All'
                                        ? 'bg-accent text-white'
                                        : 'bg-surface-raised border border-surface-border text-text-secondary hover:text-text-primary hover:border-accent/50'
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {posts.filter(p => p.featured).map(post => (
                <section key={post.id} className="px-4 mb-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-purple-500/10 border border-accent/20"
                        >
                            <div className="flex items-center gap-2 text-accent text-sm mb-3">
                                <Sparkles className="w-4 h-4" />
                                <span className="font-medium">Featured</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                                {post.title}
                            </h2>
                            <p className="text-text-secondary mb-4 max-w-2xl">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                            <Link
                                href={`/blog/${post.id}`}
                                className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                            >
                                Read more
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.article>
                    </div>
                </section>
            ))}

            {/* Posts Grid */}
            <section className="py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {posts.filter(p => !p.featured).map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-5 rounded-xl bg-surface-raised border border-surface-border hover:border-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-0.5 rounded-full text-xs bg-surface text-text-secondary border border-surface-border">
                                        {post.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-text-muted mb-3 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-text-muted flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="text-sm text-accent hover:underline flex items-center gap-1"
                                    >
                                        Read
                                        <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coming Soon Banner */}
            <section className="py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="p-6 rounded-xl bg-surface-raised border border-dashed border-surface-border text-center">
                        <p className="text-text-muted">
                            More posts coming soon! Follow us for updates 🚀
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-surface-border">
                <div className="max-w-4xl mx-auto text-center text-sm text-text-muted">
                    <p>Motionry • Open Source • Made with 💜</p>
                </div>
            </footer>
        </div>
    );
}
