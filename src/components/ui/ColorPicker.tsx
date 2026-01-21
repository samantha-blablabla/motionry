'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Preset color themes
const COLOR_PRESETS = [
    { name: 'Purple', colors: { primary: '#6366f1', secondary: '#818cf8' } },
    { name: 'Blue', colors: { primary: '#3b82f6', secondary: '#60a5fa' } },
    { name: 'Green', colors: { primary: '#22c55e', secondary: '#4ade80' } },
    { name: 'Red', colors: { primary: '#ef4444', secondary: '#f87171' } },
    { name: 'Orange', colors: { primary: '#f97316', secondary: '#fb923c' } },
    { name: 'Pink', colors: { primary: '#ec4899', secondary: '#f472b6' } },
    { name: 'Cyan', colors: { primary: '#06b6d4', secondary: '#22d3ee' } },
    { name: 'Yellow', colors: { primary: '#eab308', secondary: '#facc15' } },
];

import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (color: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
    const [mode, setMode] = useState<'solid' | 'gradient'>('solid');
    const [gradientColors, setGradientColors] = useState({ start: '#6366f1', end: '#a5b4fc' });

    // Parse initial value to determine mode and colors
    useEffect(() => {
        if (value.includes('gradient')) {
            setMode('gradient');
            const match = value.match(/linear-gradient\(\d+deg,\s*(.+?),\s*(.+?)\)/);
            if (match) {
                setGradientColors({ start: match[1], end: match[2] });
            }
        } else {
            setMode('solid');
        }
    }, [value]);

    const handleGradientChange = (type: 'start' | 'end', color: string) => {
        const newColors = { ...gradientColors, [type]: color };
        setGradientColors(newColors);
        onChange(`linear-gradient(135deg, ${newColors.start}, ${newColors.end})`);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">{label}</span>
            </div>

            <ColorSwatch
                color={value}
                onChange={onChange}
            />
        </div>
    );
}

function ColorSwatch({ color, onChange }: { color: string, onChange: (c: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Default to showing below, check if space is limited (simple check)
            const spaceBelow = window.innerHeight - rect.bottom;
            const showAbove = spaceBelow < 300; // If less than 300px below, show above

            // For position: fixed, we use rect properties directly (viewport relative)
            // DO NOT add window.scrollY/scrollX
            setCoords({
                top: showAbove ? rect.top - 10 : rect.bottom + 10,
                left: rect.left
            });
            return showAbove;
        }
        return false;
    };

    // Toggle logic
    const togglePicker = () => {
        if (!isOpen) {
            updatePosition();
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    // Handle resize/scroll - update position continuously if open
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('scroll', updatePosition, true); // true for capture to catch all scrolls
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isOpen]);

    // Close on click outside (modified for Portal)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                // Check if click target is inside the popover
                // Since we render into body, we can check by closest selector
                const target = event.target as HTMLElement;
                if (!target.closest('.color-picker-popover')) {
                    setIsOpen(false);
                }
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Ensure we only render portal on client
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="relative w-full">
            <div className="flex items-center gap-2">
                <button
                    ref={buttonRef}
                    onClick={togglePicker}
                    className="w-8 h-8 rounded-lg border border-surface-border flex-shrink-0 cursor-pointer hover:border-text-muted transition-colors relative overflow-hidden"
                    style={{ backgroundColor: color }}
                >
                    {/* Checkerboard background for transparency (optional, but good for UX) */}
                    <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMCAwSDRWMHoiIGZpbGw9IiNlZWVlZWUiLz48cGF0aCBkPSJNNA0oejR2NGgtNHoiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=')] opacity-20" />
                </button>
                <input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs font-mono bg-surface border border-surface-border rounded-lg text-text-primary focus:border-accent outline-none"
                    placeholder="#000000"
                />
            </div>

            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            style={{
                                position: 'fixed',
                                top: coords.top,
                                left: coords.left,
                                // Prevent going off-screen to the left/right if needed
                                maxWidth: '100vw'
                            }}
                            className={cn(
                                "z-[9999] origin-top-left color-picker-popover", // Ensure extremely high Z-Index
                                "pointer-events-auto", // Ensure clicks work
                                coords.top < (buttonRef.current?.getBoundingClientRect().top || 0) ? "-translate-y-full origin-bottom-left" : ""
                            )}
                        >
                            <div className="p-3 bg-surface-raised border border-surface-border rounded-xl shadow-2xl backdrop-blur-sm mt-0">
                                <HexColorPicker color={color} onChange={onChange} />
                                {/* Preset Colors */}
                                <div className="mt-3 flex flex-wrap gap-1.5 w-[200px]">
                                    {['#6366f1', '#3b82f6', '#22c55e', '#ef4444', '#f97316', '#ec4899', '#06b6d4', '#eab308', '#ffffff', '#000000'].map((preset) => (
                                        <button
                                            key={preset}
                                            className="w-5 h-5 rounded-md border border-surface-border/50 hover:scale-110 transition-transform"
                                            style={{ backgroundColor: preset }}
                                            onClick={() => onChange(preset)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}

interface PresetSelectorProps {
    onSelect: (colors: Record<string, string>) => void;
}

export function PresetSelector({ onSelect }: PresetSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

    const handleSelect = (preset: typeof COLOR_PRESETS[0]) => {
        setSelectedPreset(preset.name);
        onSelect(preset.colors);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                    'bg-surface-overlay border border-surface-border hover:border-text-muted',
                    isOpen && 'border-accent'
                )}
            >
                <Palette className="w-3.5 h-3.5" />
                {selectedPreset || 'Presets'}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="absolute top-full left-0 mt-2 z-20 p-2 bg-surface-raised border border-surface-border rounded-lg shadow-xl min-w-[160px]"
                        >
                            <div className="grid grid-cols-2 gap-1">
                                {COLOR_PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => handleSelect(preset)}
                                        className={cn(
                                            'flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors',
                                            'hover:bg-surface-overlay',
                                            selectedPreset === preset.name && 'bg-surface-overlay'
                                        )}
                                    >
                                        <div
                                            className="w-4 h-4 rounded-full border border-surface-border"
                                            style={{ background: `linear-gradient(135deg, ${preset.colors.primary}, ${preset.colors.secondary})` }}
                                        />
                                        <span className="text-text-secondary">{preset.name}</span>
                                        {selectedPreset === preset.name && (
                                            <Check className="w-3 h-3 text-accent ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export { COLOR_PRESETS };
