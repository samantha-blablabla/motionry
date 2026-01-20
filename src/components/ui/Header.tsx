'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearch: (query: string) => void;
  totalCount: number;
  filteredCount: number;
  onMenuToggle?: () => void;
  title?: string;
  description?: string;
}

export function Header({
  onSearch,
  totalCount,
  filteredCount,
  onMenuToggle,
  title = "Animation Library",
  description
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isSearchFocused) {
        inputRef.current?.blur();
        clearSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchFocused]);

  // Debounced search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search call (300ms)
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4 gap-3">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-3">
          {/* Hamburger button - mobile only */}
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-surface-raised transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-text-secondary" />
            </button>
          )}
          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold text-text-primary">
              {title}
            </h2>
            <p className="text-sm text-text-muted">
              {description || (filteredCount === totalCount
                ? `${totalCount} animations`
                : `${filteredCount} of ${totalCount} animations`
              )}
            </p>
          </div>
        </div>

        {/* Center: Search */}
        <motion.div
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors flex-1 sm:flex-none',
            isSearchFocused
              ? 'border-accent bg-surface-raised'
              : 'border-surface-border bg-surface hover:border-text-muted'
          )}
          animate={{ width: isSearchFocused ? 320 : 240 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ maxWidth: '100%' }}
        >
          <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search... (press /)"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none min-w-0"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-0.5 rounded hover:bg-surface-overlay transition-colors"
            >
              <X className="w-3.5 h-3.5 text-text-muted" />
            </button>
          )}
        </motion.div>

        {/* Right: Navigation + GitHub */}
        <div className="hidden sm:flex items-center gap-1">
          <a
            href="/about"
            className="px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
          >
            About
          </a>
          <a
            href="/blog"
            className="px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
          >
            Blog
          </a>
          <a
            href="https://github.com/samantha-blablabla/motionry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden md:inline">Star on GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
