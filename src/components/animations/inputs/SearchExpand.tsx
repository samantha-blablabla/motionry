'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchExpandProps {
  expandWidth?: number;
  collapsedWidth?: number;
}

export function SearchExpand({ 
  expandWidth = 240, 
  collapsedWidth = 44 
}: SearchExpandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setValue('');
  };

  return (
    <motion.div
      className="flex items-center bg-surface-overlay border border-surface-border rounded-full overflow-hidden"
      animate={{ width: isOpen ? expandWidth : collapsedWidth }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Search Icon / Button */}
      <motion.button
        className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.9 }}
      >
        <Search className="w-4 h-4" />
      </motion.button>

      {/* Input Field */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex items-center flex-1 pr-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => !value && handleClose()}
              placeholder="Search..."
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
            />
            {value && (
              <button
                onClick={handleClose}
                className="p-1 hover:bg-surface rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-text-muted" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
