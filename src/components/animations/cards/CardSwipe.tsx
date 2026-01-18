'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X, RotateCcw } from 'lucide-react';

interface CardSwipeProps {
  threshold?: number;
  rotation?: number;
  cardColor?: string;
  borderColor?: string;
}

export function CardSwipe({
  threshold = 100,
  rotation = 15,
  cardColor = 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  borderColor = '#6366f1'
}: CardSwipeProps) {
  const [cards, setCards] = useState([
    { id: 1, title: 'Card 1', color: 'from-violet-500 to-purple-500' },
    { id: 2, title: 'Card 2', color: 'from-blue-500 to-cyan-500' },
    { id: 3, title: 'Card 3', color: 'from-orange-500 to-red-500' },
  ]);
  const [swipedCards, setSwipedCards] = useState<number[]>([]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-rotation, rotation]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  // Indicator colors
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      handleSwipe(direction);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (cards.length === 0) return;

    const currentCard = cards[cards.length - 1];
    setSwipedCards(prev => [...prev, currentCard.id]);
    setCards(prev => prev.slice(0, -1));
  };

  const handleReset = () => {
    setCards([
      { id: 1, title: 'Card 1', color: 'from-violet-500 to-purple-500' },
      { id: 2, title: 'Card 2', color: 'from-blue-500 to-cyan-500' },
      { id: 3, title: 'Card 3', color: 'from-orange-500 to-red-500' },
    ]);
    setSwipedCards([]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card Stack */}
      <div className="relative w-48 h-64">
        {cards.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
            No more cards
          </div>
        ) : (
          cards.map((card, index) => {
            const isTop = index === cards.length - 1;

            return (
              <motion.div
                key={card.id}
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} shadow-lg cursor-grab active:cursor-grabbing`}
                style={{
                  x: isTop ? x : 0,
                  rotate: isTop ? rotate : 0,
                  opacity: isTop ? opacity : 1,
                  scale: 1 - (cards.length - 1 - index) * 0.05,
                  y: (cards.length - 1 - index) * 8,
                  zIndex: index,
                }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                whileDrag={{ cursor: 'grabbing' }}
              >
                {/* Card Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-lg font-bold">{card.title}</span>
                  <span className="text-sm opacity-80">Swipe me!</span>
                </div>

                {/* Like/Nope Indicators */}
                {isTop && (
                  <>
                    <motion.div
                      className="absolute top-4 right-4 px-2 py-1 bg-green-500 rounded text-white text-xs font-bold"
                      style={{ opacity: likeOpacity }}
                    >
                      LIKE
                    </motion.div>
                    <motion.div
                      className="absolute top-4 left-4 px-2 py-1 bg-red-500 rounded text-white text-xs font-bold"
                      style={{ opacity: nopeOpacity }}
                    >
                      NOPE
                    </motion.div>
                  </>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <motion.button
          className="p-3 rounded-full bg-red-500/10 text-red-500 border border-red-500/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('left')}
          disabled={cards.length === 0}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <motion.button
          className="p-2 rounded-full bg-surface-overlay text-text-muted border border-surface-border"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>

        <motion.button
          className="p-3 rounded-full bg-green-500/10 text-green-500 border border-green-500/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('right')}
          disabled={cards.length === 0}
        >
          <Heart className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
