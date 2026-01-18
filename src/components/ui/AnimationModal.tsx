'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Sparkles, Code2 } from 'lucide-react';
import { cn, copyToClipboard } from '@/lib/utils';
import { getAnimationComponent } from '@/registry';
import type { Animation, ConfigValues } from '@/lib/types';

interface AnimationModalProps {
  animation: Animation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnimationModal({ animation, isOpen, onClose }: AnimationModalProps) {
  const [activeTab, setActiveTab] = useState<'beginner' | 'pro'>('beginner');
  const [configValues, setConfigValues] = useState<ConfigValues>({});
  const [copied, setCopied] = useState(false);

  // Initialize config values when animation changes
  useEffect(() => {
    if (animation) {
      const defaults: ConfigValues = {};
      Object.entries(animation.config).forEach(([key, config]) => {
        defaults[key] = config.default;
      });
      setConfigValues(defaults);
    }
  }, [animation]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleCopy = async () => {
    if (!animation) return;
    const content = activeTab === 'beginner' 
      ? animation.prompts.beginner 
      : (animation.code.framerMotion || animation.code.css || animation.prompts.pro);
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateConfig = (key: string, value: number | string | boolean) => {
    setConfigValues(prev => ({ ...prev, [key]: value }));
  };

  if (!animation) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-[10%] bg-surface-raised border border-surface-border rounded-2xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">{animation.name}</h2>
                <p className="text-sm text-text-muted mt-0.5">{animation.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left: Preview & Configurator */}
              <div className="w-1/2 border-r border-surface-border flex flex-col">
                {/* Preview Area */}
                <div className="flex-1 flex items-center justify-center p-8 bg-surface">
                  <ModalPreview animation={animation} config={configValues} />
                </div>

                {/* Configurator */}
                {Object.keys(animation.config).length > 0 && (
                  <div className="p-4 border-t border-surface-border bg-surface-raised">
                    <h3 className="text-sm font-medium text-text-secondary mb-3">
                      Customize
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(animation.config).map(([key, config]) => (
                        <ConfigSlider
                          key={key}
                          label={config.label}
                          value={configValues[key] as number}
                          min={config.min || 0}
                          max={config.max || 100}
                          step={config.step || 1}
                          onChange={(value) => updateConfig(key, value)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Prompts/Code */}
              <div className="w-1/2 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-surface-border">
                  <button
                    onClick={() => setActiveTab('beginner')}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                      activeTab === 'beginner'
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Sparkles className="w-4 h-4" />
                    Beginner Prompt
                  </button>
                  <button
                    onClick={() => setActiveTab('pro')}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                      activeTab === 'pro'
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Code2 className="w-4 h-4" />
                    Pro Code
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4">
                  {activeTab === 'beginner' ? (
                    <div className="prose prose-invert max-w-none">
                      <div className="p-4 bg-surface rounded-lg border border-surface-border">
                        <p className="text-text-primary leading-relaxed">
                          {animation.prompts.beginner}
                        </p>
                      </div>
                      <p className="text-sm text-text-muted mt-4">
                        💡 Copy this prompt and paste it to Claude or any AI assistant to recreate this animation.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <pre className="p-4 bg-surface rounded-lg border border-surface-border overflow-x-auto">
                        <code className="text-sm text-text-primary font-mono">
                          {animation.code.framerMotion || animation.code.css || animation.prompts.pro}
                        </code>
                      </pre>
                      <p className="text-sm text-text-muted mt-4">
                        📋 Production-ready code with Framer Motion. Adjust the config values above to customize.
                      </p>
                    </div>
                  )}
                </div>

                {/* Copy Button */}
                <div className="p-4 border-t border-surface-border">
                  <motion.button
                    onClick={handleCopy}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium',
                      'bg-accent hover:bg-accent-hover text-white transition-colors'
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy {activeTab === 'beginner' ? 'Prompt' : 'Code'}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Config Slider Component
function ConfigSlider({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  onChange 
}: { 
  label: string; 
  value: number; 
  min: number; 
  max: number; 
  step: number; 
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-muted">{label}</span>
        <span className="text-text-primary font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-surface rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-3
                   [&::-webkit-slider-thumb]:h-3
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-accent
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:transition-transform
                   [&::-webkit-slider-thumb]:hover:scale-125"
      />
    </div>
  );
}

// Modal Preview - larger version using registry components
function ModalPreview({ animation, config }: { animation: Animation; config: ConfigValues }) {
  const AnimationComponent = getAnimationComponent(animation.id);
  
  if (AnimationComponent) {
    // Pass config values as props to the component
    return <AnimationComponent {...config} />;
  }

  // Fallback preview
  return (
    <motion.div
      className="px-8 py-4 rounded-xl bg-accent text-white font-medium"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
    >
      Preview
    </motion.div>
  );
}
