'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
    id: string;
    title: string;
    content: string;
}

interface AccordionCollapseProps {
    items?: AccordionItem[];
    allowMultiple?: boolean;
    accentColor?: string;
    className?: string;
}

const defaultItems: AccordionItem[] = [
    {
        id: '1',
        title: 'What is Framer Motion?',
        content: 'Framer Motion is a production-ready motion library for React that makes creating animations simple and powerful.',
    },
    {
        id: '2',
        title: 'How do I install it?',
        content: 'You can install Framer Motion using npm or yarn: npm install framer-motion',
    },
    {
        id: '3',
        title: 'Is it performant?',
        content: 'Yes! Framer Motion uses hardware acceleration and optimizes animations for 60fps performance.',
    },
];

export function AccordionCollapse({
    items = defaultItems,
    allowMultiple = false,
    accentColor = '#6366f1',
    className = '',
}: AccordionCollapseProps) {
    const [openItems, setOpenItems] = useState<string[]>(['1']); // Auto-open first item

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems((prev) =>
                prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
            );
        } else {
            setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
        }
    };

    const isOpen = (id: string) => openItems.includes(id);

    return (
        <div className={`w-full max-w-md ${className}`}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="border-b border-gray-200 dark:border-gray-700"
                >
                    <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                        <span
                            className="font-medium"
                            style={{ color: isOpen(item.id) ? accentColor : undefined }}
                        >
                            {item.title}
                        </span>
                        <motion.div
                            animate={{ rotate: isOpen(item.id) ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <ChevronDown
                                className="w-5 h-5"
                                style={{ color: isOpen(item.id) ? accentColor : '#9ca3af' }}
                            />
                        </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                        {isOpen(item.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="px-2 pb-4 text-gray-600 dark:text-gray-400 text-sm">
                                    {item.content}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
