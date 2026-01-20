'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Sparkles, Code2, ChevronLeft, ChevronRight, Sun, Moon, Settings } from 'lucide-react';
import { cn, copyToClipboard } from '@/lib/utils';
import { getAnimationComponent } from '@/registry';
import { ColorPicker } from './ColorPicker';
import { useToast } from './Toast';
import type { Animation, ConfigValues } from '@/lib/types';

interface AnimationModalProps {
  animation: Animation | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

type RightTab = 'custom' | 'code';
type CodeTab = 'beginner' | 'pro';

export function AnimationModal({ animation, isOpen, onClose, onNext, onPrev }: AnimationModalProps) {
  const [rightTab, setRightTab] = useState<RightTab>('custom');
  const [codeTab, setCodeTab] = useState<CodeTab>('beginner');
  const [configValues, setConfigValues] = useState<ConfigValues>({});
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<'dark' | 'light'>('dark');
  const [proMode, setProMode] = useState<'framer' | 'css'>('framer');
  const { showToast } = useToast();

  // Initialize config values when animation changes
  useEffect(() => {
    if (animation) {
      const defaults: ConfigValues = {};
      Object.entries(animation.config).forEach(([key, config]) => {
        defaults[key] = config.default;
      });
      setConfigValues(defaults);

      // Auto-select available code mode
      if (animation.code.framerMotion) setProMode('framer');
      else if (animation.code.css) setProMode('css');
    }
  }, [animation]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Generate customized prompt
  const getCustomizedPrompt = () => {
    if (!animation) return '';
    let prompt = animation.prompts.beginner;

    const colorConfigs = Object.entries(animation.config)
      .filter(([, config]) => config.type === 'color');

    if (colorConfigs.length > 0) {
      const colorInfo = colorConfigs
        .map(([key, config]) => `- ${config.label}: ${configValues[key] || config.default}`)
        .join('\n');
      prompt += `\n\nCustom colors:\n${colorInfo}`;
    }

    const numericConfigs = Object.entries(animation.config)
      .filter(([, config]) => typeof config.default === 'number');

    if (numericConfigs.length > 0) {
      const configInfo = numericConfigs
        .map(([key, config]) => `- ${config.label}: ${configValues[key] || config.default}`)
        .join('\n');
      prompt += `\n\nConfiguration:\n${configInfo}`;
    }

    return prompt;
  };

  // Generate customized code
  const getCustomizedCode = () => {
    if (!animation) return '';

    // Get base code based on selected mode
    let code = '';
    if (proMode === 'framer') {
      code = animation.code.framerMotion || '// No Framer Motion code available';
    } else {
      code = animation.code.css || '// No CSS code available';
    }

    Object.entries(configValues).forEach(([key, value]) => {
      const config = animation.config[key];
      if (config && typeof value === 'string' && config.type === 'color') {
        code = `// Custom color: ${config.label} = ${value}\n${code}`;
      }
    });

    return code;
  };

  const handleCopy = async () => {
    if (!animation) return;
    const content = codeTab === 'beginner' ? getCustomizedPrompt() : getCustomizedCode();
    await copyToClipboard(content);
    setCopied(true);
    showToast(codeTab === 'beginner' ? 'Prompt copied!' : 'Code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const updateConfig = (key: string, value: number | string | boolean) => {
    setConfigValues(prev => ({ ...prev, [key]: value }));
  };

  if (!animation) return null;

  // Separate configs by type
  const numericConfigs = Object.entries(animation.config).filter(([, c]) => typeof c.default === 'number');
  const colorConfigs = Object.entries(animation.config).filter(([, c]) => c.type === 'color');

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

          {/* Navigation Buttons */}
          {onPrev && (
            <motion.button
              onClick={onPrev}
              className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface-overlay/90 border border-surface-border backdrop-blur-sm text-text-primary hover:bg-surface-raised hover:text-accent transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous animation"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          )}

          {onNext && (
            <motion.button
              onClick={onNext}
              className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface-overlay/90 border border-surface-border backdrop-blur-sm text-text-primary hover:bg-surface-raised hover:text-accent transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next animation"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          )}

          {/* Modal */}
          <motion.div
            className="fixed inset-2 sm:inset-3 md:inset-4 lg:inset-[4%] xl:inset-[8%] border border-surface-border rounded-2xl z-50 flex flex-col shadow-2xl bg-surface"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-surface-border bg-surface-raised rounded-t-2xl relative">
              {/* Mobile Drag Handle */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-surface-border rounded-full md:hidden" />

              <div className="flex-1 min-w-0 pt-2 md:pt-0">
                <h2 className="text-lg md:text-xl font-semibold text-text-primary truncate">{animation.name}</h2>
                <p className="text-xs md:text-sm text-text-muted mt-0.5 truncate">{animation.description}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 rounded-lg hover:bg-surface transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content: 2-Column Layout */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-surface-raised rounded-b-2xl">

              {/* LEFT: Preview (Fixed) - Needs rounded bottom-left if on desktop */}
              <div className="md:w-[60%] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-surface-border min-h-[200px] md:min-h-0 overflow-hidden md:rounded-bl-2xl">
                {/* Background with Grid Dots */}
                <div className={cn(
                  'absolute inset-0 transition-colors duration-300 pointer-events-none',
                  previewMode === 'dark' ? 'bg-[#0a0a0b]' : 'bg-white'
                )} />
                {/* Grid Dots Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: previewMode === 'dark'
                      ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
                      : 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Preview Mode Toggle */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => setPreviewMode(prev => prev === 'dark' ? 'light' : 'dark')}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors backdrop-blur-md',
                      previewMode === 'dark'
                        ? 'bg-[#1a1a1f] text-white hover:bg-[#252529] border border-white/10'
                        : 'bg-white text-gray-800 hover:bg-gray-100 border border-black/10 shadow-sm'
                    )}
                  >
                    {previewMode === 'dark' ? (
                      <><Moon className="w-3.5 h-3.5" /> Dark</>
                    ) : (
                      <><Sun className="w-3.5 h-3.5" /> Light</>
                    )}
                  </button>
                </div>

                {/* Animation Preview */}
                <div className="relative z-[1]">
                  <ModalPreview animation={animation} config={configValues} />
                </div>
              </div>

              {/* RIGHT: Tabs (Custom + Prompt/Code) */}
              <div className="md:w-[40%] flex flex-col min-h-0 flex-1">
                {/* Tabs Header */}
                <div className="flex border-b border-surface-border">
                  <button
                    onClick={() => setRightTab('custom')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                      rightTab === 'custom'
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Settings className="w-4 h-4" />
                    Custom
                  </button>
                  <button
                    onClick={() => setRightTab('code')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                      rightTab === 'code'
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Code2 className="w-4 h-4" />
                    Prompt/Code
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  <AnimatePresence mode="wait">
                    {/* Custom Tab */}
                    {rightTab === 'custom' && (
                      <motion.div
                        key="custom"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex-1 overflow-auto p-4"
                      >


                        {/* Animation Settings */}
                        {numericConfigs.length > 0 && (
                          <div className="mb-5">
                            <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">Animation</h4>
                            <div className="space-y-4">
                              {numericConfigs.map(([key, config]) => (
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

                        {/* Colors */}
                        {colorConfigs.length > 0 && (
                          <div>
                            <h4 className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">Colors</h4>
                            <div className="space-y-3">
                              {colorConfigs.map(([key, config]) => (
                                <ColorPicker
                                  key={key}
                                  label={config.label}
                                  value={configValues[key] as string || config.default as string}
                                  onChange={(value) => updateConfig(key, value)}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Empty State */}
                        {numericConfigs.length === 0 && colorConfigs.length === 0 && (
                          <div className="flex items-center justify-center h-full text-text-muted text-sm">
                            No customization options for this animation
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Prompt/Code Tab */}
                    {rightTab === 'code' && (
                      <motion.div
                        key="code"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex-1 flex flex-col overflow-hidden"
                      >
                        {/* Sub-tabs: Beginner / Pro */}
                        <div className="flex gap-1 p-2 border-b border-surface-border">
                          <button
                            onClick={() => setCodeTab('beginner')}
                            className={cn(
                              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                              codeTab === 'beginner'
                                ? 'bg-accent text-white'
                                : 'text-text-muted hover:text-text-primary hover:bg-surface-overlay'
                            )}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Beginner
                          </button>
                          <button
                            onClick={() => setCodeTab('pro')}
                            className={cn(
                              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                              codeTab === 'pro'
                                ? 'bg-accent text-white'
                                : 'text-text-muted hover:text-text-primary hover:bg-surface-overlay'
                            )}
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            Pro
                          </button>
                        </div>

                        {/* Code Content */}
                        <div className="flex-1 overflow-auto p-4">
                          {codeTab === 'beginner' ? (
                            <div className="p-4 bg-surface rounded-lg border border-surface-border">
                              <p className="text-text-primary leading-relaxed whitespace-pre-wrap text-sm">
                                {getCustomizedPrompt()}
                              </p>
                            </div>
                          ) : (
                            <div>
                              {animation.code.framerMotion && animation.code.css && (
                                <div className="flex items-center gap-2 mb-3 bg-surface-overlay p-1 rounded-lg w-fit">
                                  <button
                                    onClick={() => setProMode('framer')}
                                    className={cn(
                                      "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                      proMode === 'framer'
                                        ? "bg-surface text-text-primary shadow-sm"
                                        : "text-text-muted hover:text-text-primary"
                                    )}
                                  >
                                    Framer Motion
                                  </button>
                                  <button
                                    onClick={() => setProMode('css')}
                                    className={cn(
                                      "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                      proMode === 'css'
                                        ? "bg-surface text-text-primary shadow-sm"
                                        : "text-text-muted hover:text-text-primary"
                                    )}
                                  >
                                    CSS
                                  </button>
                                </div>
                              )}

                              <div className="flex items-center gap-2 mb-2">
                                <span className={cn(
                                  "px-2 py-0.5 text-xs font-medium rounded",
                                  (proMode === 'framer' && animation.code.framerMotion)
                                    ? "bg-purple-500/20 text-purple-400"
                                    : "bg-blue-500/20 text-blue-400"
                                )}>
                                  {proMode === 'framer' && animation.code.framerMotion
                                    ? 'Framer Motion'
                                    : (proMode === 'css' && animation.code.css
                                      ? 'CSS'
                                      : 'No code available')}
                                </span>
                              </div>
                              <pre className="p-4 bg-surface rounded-lg border border-surface-border overflow-x-auto text-xs">
                                <code className="text-text-primary font-mono whitespace-pre">
                                  {getCustomizedCode()}
                                </code>
                              </pre>
                            </div>
                          )}
                        </div>

                        {/* Copy Button */}
                        <div className="p-3 border-t border-surface-border">
                          <motion.button
                            onClick={handleCopy}
                            className={cn(
                              'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm',
                              'bg-accent hover:bg-accent-hover text-white transition-colors'
                            )}
                            whileTap={{ scale: 0.98 }}
                          >
                            {copied ? (
                              <><Check className="w-4 h-4" /> Copied!</>
                            ) : (
                              <><Copy className="w-4 h-4" /> Copy {codeTab === 'beginner' ? 'Prompt' : 'Code'}</>
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
        <span className="text-text-primary font-mono text-xs bg-surface px-1.5 py-0.5 rounded">{value}</span>
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
                   [&::-webkit-slider-thumb]:w-3.5
                   [&::-webkit-slider-thumb]:h-3.5
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-accent
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:transition-transform
                   [&::-webkit-slider-thumb]:hover:scale-110"
      />
    </div>
  );
}

// Modal Preview
function ModalPreview({ animation, config }: { animation: Animation; config: ConfigValues }) {
  const AnimationComponent = getAnimationComponent(animation.id);

  if (AnimationComponent) {
    return <AnimationComponent {...config} />;
  }

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
