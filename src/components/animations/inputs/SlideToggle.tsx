'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SlideToggleProps {
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: 'sm' | 'md' | 'lg';
    onColor?: string;
    offColor?: string;
    knobColor?: string;
}

const sizes = {
    sm: { width: 40, height: 24, knob: 18 },
    md: { width: 52, height: 28, knob: 22 },
    lg: { width: 64, height: 36, knob: 28 },
};

export function SlideToggle({
    defaultChecked = false,
    onChange,
    size = 'md',
    onColor = '#6366f1',
    offColor = '#3f3f46',
    knobColor = '#ffffff',
}: SlideToggleProps) {
    const [isOn, setIsOn] = useState(defaultChecked);
    const { width, height, knob } = sizes[size];
    const padding = (height - knob) / 2;

    const handleToggle = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        onChange?.(newValue);
    };

    return (
        <motion.button
            className="relative rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
            style={{
                width,
                height,
                background: isOn ? onColor : offColor,
            }}
            onClick={handleToggle}
            animate={{
                background: isOn ? onColor : offColor,
            }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.95 }}
            aria-checked={isOn}
            role="switch"
        >
            {/* Knob */}
            <motion.div
                className="absolute rounded-full shadow-md"
                style={{
                    width: knob,
                    height: knob,
                    top: padding,
                    background: knobColor,
                }}
                initial={false}
                animate={{
                    left: isOn ? width - knob - padding : padding,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            />

            {/* Highlight effect */}
            <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isOn ? 0.1 : 0,
                    background: 'white',
                }}
            />
        </motion.button>
    );
}
