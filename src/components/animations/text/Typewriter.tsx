'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterProps {
    text?: string;
    speed?: number;
    loop?: boolean;
    deleteSpeed?: number;
    pauseTime?: number;
    textColor?: string;
    cursorColor?: string;
}

export function Typewriter({
    text = 'Hello, World!',
    speed = 100,
    loop = true,
    deleteSpeed = 50,
    pauseTime = 2000,
    textColor = '#ffffff',
    cursorColor = '#6366f1',
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isTyping) {
            if (displayText.length < text.length) {
                timeout = setTimeout(() => {
                    setDisplayText(text.slice(0, displayText.length + 1));
                }, speed);
            } else {
                // Finished typing
                if (loop) {
                    timeout = setTimeout(() => {
                        setIsTyping(false);
                    }, pauseTime);
                }
            }
        } else {
            // Deleting
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, deleteSpeed);
            } else {
                // Finished deleting
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isTyping, text, speed, deleteSpeed, pauseTime, loop]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-lg flex items-center">
            <span style={{ color: textColor }}>{displayText}</span>
            <motion.span
                className="inline-block w-[2px] h-[1.2em] ml-0.5"
                style={{ background: cursorColor }}
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0.1 }}
            />
        </div>
    );
}
