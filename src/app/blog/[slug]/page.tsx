import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Linkedin } from 'lucide-react';

// Blog posts data (in real app, this would come from CMS or MDX files)
const posts: Record<string, {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    content: string;
}> = {
    'getting-started': {
        title: 'Getting Started with Motionry',
        excerpt: 'Learn how to quickly add micro-animations to your project using AI prompts or code snippets.',
        category: 'Tutorial',
        date: '2024-01-15',
        readTime: '3 min',
        content: `
## Introduction

Motionry makes it incredibly easy to add beautiful micro-animations to your project. Whether you prefer using AI assistants or writing code directly, we've got you covered.

## Using AI Prompts

The fastest way to use Motionry is with AI prompts. Simply:

1. Browse our animation library
2. Click on any animation card
3. Copy the AI prompt from the modal
4. Paste it into your favorite AI tool (ChatGPT, Claude, etc.)

The AI will generate the exact code you need, customized for your project.

## Using Code Snippets

If you prefer hands-on coding:

1. Open any animation in the modal
2. Switch to the "Framer Motion" or "CSS" tab
3. Copy the production-ready code
4. Paste it into your component

## Customization

Every animation in Motionry is fully customizable:

- **Colors**: Use the color picker to match your brand
- **Duration**: Adjust timing to your preference
- **Easing**: Choose from various easing functions

## Next Steps

Explore the library and find the perfect animation for your next project!
    `,
    },
    'best-button-animations': {
        title: '5 Best Button Animations for 2024',
        excerpt: 'Discover the most engaging button animations that will delight your users without overwhelming them.',
        category: 'Tips',
        date: '2024-01-12',
        readTime: '4 min',
        content: `
## Why Button Animations Matter

Buttons are the primary interaction points in any interface. A well-crafted button animation can:

- **Build trust** through responsive feedback
- **Guide attention** to important actions
- **Delight users** with subtle polish

## Top 5 Button Animations

### 1. Magnetic Hover

The magnetic hover effect subtly pulls the button toward the cursor, creating an engaging, almost physical connection.

**Best for**: Hero sections, CTAs, and premium interfaces.

### 2. Ripple Effect

Inspired by Material Design, the ripple provides clear visual feedback exactly where the user clicks.

**Best for**: Form submissions, navigation, and mobile-first designs.

### 3. Jelly Bounce

A playful spring animation that gives buttons a satisfying, organic feel.

**Best for**: Gaming apps, creative portfolios, and fun brands.

### 4. Shimmer Stroke

A subtle gradient shimmer that sweeps across the button border, adding elegance without distraction.

**Best for**: Luxury brands, SaaS products, and dark themes.

### 5. Scale Tap

Simple but effective—a slight scale reduction on press provides instant feedback.

**Best for**: Universal use, especially on touch devices.

## Implementation Tips

- Keep animations under 300ms for snappy feedback
- Use \`transform\` and \`opacity\` for best performance
- Test on mobile devices for touch responsiveness
    `,
    },
    'framer-motion-basics': {
        title: 'Framer Motion Basics for Beginners',
        excerpt: 'A quick introduction to Framer Motion and how to create smooth animations in React.',
        category: 'Tutorial',
        date: '2024-01-10',
        readTime: '5 min',
        content: `
## What is Framer Motion?

Framer Motion is a production-ready animation library for React. It makes complex animations simple with a declarative API.

## Installation

\`\`\`bash
npm install framer-motion
\`\`\`

## Basic Usage

Import \`motion\` and wrap your element:

\`\`\`jsx
import { motion } from 'framer-motion';

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello, World!
    </motion.div>
  );
}
\`\`\`

## Key Concepts

### 1. initial, animate, exit

These props define the animation states:

- \`initial\`: Starting state
- \`animate\`: Target state
- \`exit\`: State when component unmounts

### 2. Transitions

Control timing with the \`transition\` prop:

\`\`\`jsx
transition={{
  duration: 0.3,
  ease: "easeInOut",
  type: "spring",
  stiffness: 100,
}}
\`\`\`

### 3. Gestures

Add interactive animations:

\`\`\`jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
\`\`\`

## Next Steps

Explore our library to see Framer Motion in action!
    `,
    },
    'performance-tips': {
        title: 'Animation Performance Tips',
        excerpt: 'How to keep your animations smooth at 60fps while maintaining great user experience.',
        category: 'Tips',
        date: '2024-01-08',
        readTime: '4 min',
        content: `
## Why Performance Matters

Janky animations frustrate users and hurt perceived quality. Here's how to keep everything smooth.

## Golden Rules

### 1. Animate Transform and Opacity Only

These properties are GPU-accelerated:

- ✅ \`transform: translateX/Y/Z, scale, rotate\`
- ✅ \`opacity\`
- ❌ \`width, height, top, left, margin, padding\`

### 2. Use will-change Sparingly

\`\`\`css
.animated-element {
  will-change: transform;
}
\`\`\`

Only apply to elements that will animate. Remove after animation completes.

### 3. Reduce Layout Thrashing

Batch DOM reads and writes:

\`\`\`js
// Bad
element.style.width = '100px';
const height = element.offsetHeight;
element.style.height = height + 'px';

// Good
const height = element.offsetHeight;
element.style.width = '100px';
element.style.height = height + 'px';
\`\`\`

### 4. Use RequestAnimationFrame

For JavaScript animations:

\`\`\`js
function animate() {
  // Update animation
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
\`\`\`

### 5. Hardware Acceleration

Force GPU rendering:

\`\`\`css
.accelerated {
  transform: translateZ(0);
  /* or */
  backface-visibility: hidden;
}
\`\`\`

## Debugging Tools

- Chrome DevTools → Performance tab
- Chrome DevTools → Layers panel
- Firefox → Performance Monitor

## Conclusion

Smooth animations are achievable with these best practices. Test on real devices for the best results!
    `,
    },
};

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = posts[params.slug];

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Motionry Team'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
    };
}

export async function generateStaticParams() {
    return Object.keys(posts).map((slug) => ({ slug }));
}

// Custom Markdown Parser Component
function MarkdownRenderer({ content }: { content: string }) {
    const lines = content.split(/\r?\n/);
    const elements = [];
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Code Blocks
        if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) {
            elements.push(
                <div key={i} className="bg-surface-raised border border-surface-border p-3 rounded-lg font-mono text-sm text-accent my-2 overflow-x-auto">
                    {line}
                </div>
            );
            continue;
        }

        // Headers
        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={i} className="text-2xl md:text-3xl font-bold text-text-primary mt-10 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-accent rounded-full mb-1"></span>
                    {parseInline(line.replace('## ', ''))}
                </h2>
            );
            continue;
        }
        if (line.startsWith('### ')) {
            elements.push(
                <h3 key={i} className="text-xl font-semibold text-text-primary mt-8 mb-4">
                    {parseInline(line.replace('### ', ''))}
                </h3>
            );
            continue;
        }

        // Lists
        if (line.trim().startsWith('- ')) {
            elements.push(
                <li key={i} className="ml-6 list-disc text-text-secondary pl-2 mb-2 marker:text-accent">
                    {parseInline(line.replace('- ', ''))}
                </li>
            );
            continue;
        }

        // Empty lines (spacing)
        if (!line.trim()) {
            elements.push(<div key={i} className="h-4" />);
            continue;
        }

        // Paragraphs
        elements.push(
            <p key={i} className="text-text-secondary leading-7 mb-4 text-base md:text-lg">
                {parseInline(line)}
            </p>
        );
    }

    return <div className="space-y-1">{elements}</div>;
}

// Helper for BOLD and INLINE CODE parsing
function parseInline(text: string) {
    // Regex matches: **bold** OR `code`
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index} className="text-text-primary font-semibold">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={index} className="bg-surface-raised px-1.5 py-0.5 rounded text-accent font-mono text-sm border border-surface-border">
                    {part.slice(1, -1)}
                </code>
            );
        }
        return part;
    });
}

export default function BlogPostPage({ params }: Props) {
    const post = posts[params.slug];

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-surface">
            {/* Navigation */}
            <nav className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/blog"
                        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Blog</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-raised transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Article */}
            <article className="py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-text-secondary mb-8 leading-relaxed border-l-4 border-surface-border pl-4 dark:border-surface-raised">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-text-muted pb-8 border-b border-surface-border">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-accent" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-accent" />
                                {post.readTime} read
                            </span>
                        </div>
                    </header>

                    {/* Content using Custom Markdown Renderer */}
                    <div className="max-w-none">
                        <MarkdownRenderer content={post.content} />
                    </div>

                    {/* Share */}
                    <div className="mt-16 pt-8 border-t border-surface-border">
                        <p className="text-sm text-text-muted mb-4 font-medium uppercase tracking-wider">Share this article</p>
                        <div className="flex items-center gap-3">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://motionry.vercel.app/blog/${params.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-raised border border-surface-border text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                                <span className="text-sm">Twitter</span>
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://motionry.vercel.app/blog/${params.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-raised border border-surface-border text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span className="text-sm">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-surface-border mt-12 bg-surface-raised/30">
                <div className="max-w-3xl mx-auto text-center text-sm text-text-muted">
                    <p>Motionry • Open Source • Made with 💜</p>
                </div>
            </footer>
        </div>
    );
}
