'use client';

import { useState, useRef, useEffect } from 'react';
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

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (color: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">{label}</span>
                <span className="text-text-primary font-mono text-xs">{value.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
                {/* Color swatch button */}
                <button
                    onClick={() => inputRef.current?.click()}
                    className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-surface-border hover:border-text-muted transition-colors"
                    style={{ backgroundColor: value }}
                >
                    <input
                        ref={inputRef}
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </button>

                {/* Hex input */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        const hex = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
                            onChange(hex);
                        }
                    }}
                    className="flex-1 px-2 py-1.5 text-xs font-mono bg-surface border border-surface-border rounded-lg text-text-primary focus:border-accent outline-none"
                    placeholder="#000000"
                />
            </div>
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
