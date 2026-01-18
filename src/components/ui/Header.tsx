'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearch: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function Header({ onSearch, totalCount, filteredCount }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-surface-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Title & Count */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Animation Library
          </h2>
          <p className="text-sm text-text-muted">
            {filteredCount === totalCount 
              ? `${totalCount} animations`
              : `${filteredCount} of ${totalCount} animations`
            }
          </p>
        </div>

        {/* Center: Search */}
        <motion.div
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors',
            isSearchFocused 
              ? 'border-accent bg-surface-raised' 
              : 'border-surface-border bg-surface hover:border-text-muted'
          )}
          animate={{ width: isSearchFocused ? 320 : 240 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="Search animations..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
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

        {/* Right: GitHub Link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
}
