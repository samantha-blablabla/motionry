'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingLabelProps {
    label?: string;
    placeholder?: string;
    type?: string;
    activeColor?: string;
    inactiveColor?: string;
    backgroundColor?: string;
    textColor?: string;
}

export function FloatingLabel({
    label = 'Email',
    placeholder = '',
    type = 'text',
    activeColor = '#6366f1',
    inactiveColor = '#6b7280',
    backgroundColor = '#1c1c1f',
    textColor = '#ffffff',
}: FloatingLabelProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    const isActive = isFocused || value.length > 0;

    return (
        <div className="relative w-64">
            <motion.label
                className="absolute left-3 pointer-events-none origin-left font-medium"
                initial={false}
                animate={{
                    y: isActive ? -24 : 12,
                    scale: isActive ? 0.85 : 1,
                    color: isFocused ? activeColor : inactiveColor,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                }}
            >
                {label}
            </motion.label>

            <motion.input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isActive ? placeholder : ''}
                className="w-full px-3 py-3 rounded-lg border-2 outline-none transition-colors"
                style={{
                    background: backgroundColor,
                    color: textColor,
                    borderColor: isFocused ? activeColor : '#2a2a2e',
                }}
                animate={{
                    borderColor: isFocused ? activeColor : '#2a2a2e',
                }}
            />

            {/* Focus ring indicator */}
            <motion.div
                className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2"
                style={{ background: activeColor }}
                initial={{ width: 0 }}
                animate={{ width: isFocused ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
}
