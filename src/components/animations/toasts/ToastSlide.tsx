'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
}

interface ToastSlideProps {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  stagger?: number;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export function ToastSlide({
  direction = 'right',
  stagger = 100,
  backgroundColor = '#1a1a1e',
  textColor = '#ffffff',
  accentColor = '#22c55e'
}: ToastSlideProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextId, setNextId] = useState(1);

  const addToast = () => {
    const newToast = { id: nextId, message: `Action completed #${nextId}` };
    setToasts(prev => [...prev, newToast]);
    setNextId(prev => prev + 1);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auto remove after 3 seconds
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: '-100%', opacity: 0 };
      case 'right': return { x: '100%', opacity: 0 };
      case 'top': return { y: '-100%', opacity: 0 };
      case 'bottom': return { y: '100%', opacity: 0 };
    }
  };

  const getExitPosition = () => {
    switch (direction) {
      case 'left': return { x: '-100%', opacity: 0 };
      case 'right': return { x: '100%', opacity: 0 };
      case 'top': return { y: '-100%', opacity: 0 };
      case 'bottom': return { y: '100%', opacity: 0 };
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Trigger Button */}
      <motion.button
        className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addToast}
      >
        Show Toast
      </motion.button>

      {/* Toast Container */}
      <div className="relative h-32 w-full flex flex-col items-end justify-start gap-2 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast, index) => (
            <motion.div
              key={toast.id}
              layout
              initial={getInitialPosition()}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={getExitPosition()}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
                delay: index * (stagger / 1000)
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg"
              style={{ backgroundColor, border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <CheckCircle className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-sm whitespace-nowrap" style={{ color: textColor }}>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 p-0.5 hover:bg-surface rounded"
              >
                <X className="w-3 h-3 text-text-muted" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
