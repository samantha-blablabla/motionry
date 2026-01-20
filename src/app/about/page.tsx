import Link from 'next/link';
import { ArrowLeft, Github, Twitter, Mail, Sparkles, Code2, Palette, Zap, Heart, Coffee } from 'lucide-react';

const techStack = [
    { name: 'Next.js 14', icon: '▲', description: 'React Framework' },
    { name: 'Framer Motion', icon: '🎬', description: 'Animation Library' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Styling' },
    { name: 'TypeScript', icon: '📘', description: 'Type Safety' },
];

const features = [
    { icon: 'sparkles', title: 'AI-Friendly Prompts', description: 'Copy prompts directly to your AI tool' },
    { icon: 'code', title: 'Production Ready', description: 'Framer Motion & CSS code snippets' },
    { icon: 'palette', title: 'Customizable', description: 'Adjust colors and parameters live' },
    { icon: 'zap', title: 'Performance First', description: 'Optimized for smooth 60fps animations' },
];

const iconComponents: Record<string, typeof Sparkles> = {
    sparkles: Sparkles,
    code: Code2,
    palette: Palette,
    zap: Zap,
};

export default function AboutPage() {
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

                    <a
                        href="https://github.com/yourusername/motionry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        <span className="hidden sm:inline">Star on GitHub</span>
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-16 md:py-24 px-4 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />

                <div className="max-w-4xl mx-auto text-center relative">
                    <div className="animate-fade-in">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                            About Motionry
                        </h1>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            A curated collection of micro-animations designed for developers and designers.
                            Copy AI-friendly prompts or production-ready code in seconds.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="p-6 md:p-8 rounded-2xl bg-surface-raised border border-surface-border">
                        <h2 className="text-2xl font-semibold text-text-primary mb-4 flex items-center gap-3">
                            <Heart className="w-6 h-6 text-red-500" />
                            Why I Built This
                        </h2>
                        <div className="space-y-4 text-text-secondary leading-relaxed">
                            <p>
                                As a developer, I spent countless hours searching for the perfect micro-animation
                                for my projects. I wanted something that felt natural, was easy to implement,
                                and worked well with modern AI coding assistants.
                            </p>
                            <p>
                                Motionry is my solution — a free, open-source library where you can browse,
                                customize, and copy animations with a single click. Whether you're describing
                                animations to an AI or writing code yourself, Motionry has you covered.
                            </p>
                            <p className="text-accent font-medium">
                                This is a passion project built with 💜 — completely free and open source.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold text-text-primary mb-8 text-center">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((feature, index) => {
                            const IconComponent = iconComponents[feature.icon] || Sparkles;
                            return (
                                <div
                                    key={feature.title}
                                    className="p-5 rounded-xl bg-surface-raised border border-surface-border hover:border-accent/50 transition-colors"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <IconComponent className="w-6 h-6 text-accent mb-3" />
                                    <h3 className="font-semibold text-text-primary mb-1">{feature.title}</h3>
                                    <p className="text-sm text-text-muted">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold text-text-primary mb-8 text-center">
                        Built With
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {techStack.map((tech, index) => (
                            <div
                                key={tech.name}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-raised border border-surface-border"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <span className="text-xl">{tech.icon}</span>
                                <div>
                                    <p className="font-medium text-text-primary text-sm">{tech.name}</p>
                                    <p className="text-xs text-text-muted">{tech.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg animate-bounce">
                                <Coffee className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-text-primary mb-2">
                            Support This Project
                        </h2>
                        <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                            If Motionry helps you, consider buying me a coffee!
                            Every $1-2 helps keep the animations flowing ☕
                        </p>
                        <a
                            href="https://buymeacoffee.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
                        >
                            <Coffee className="w-5 h-5" />
                            <span>Buy me a coffee</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-surface-border">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span>Motionry — Open Source</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-raised transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://twitter.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-raised transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="mailto:hello@motionry.dev"
                            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-raised transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
