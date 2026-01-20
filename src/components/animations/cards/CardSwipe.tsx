'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X, RotateCcw, ImageIcon } from 'lucide-react';

interface CardSwipeProps {
  threshold?: number;
  rotation?: number;
  cardBackground?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
}

export function CardSwipe({
  threshold = 100,
  rotation = 15,
  cardBackground = 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  titleColor = '#ffffff',
  subtitleColor = 'rgba(255,255,255,0.7)',
  accentColor = '#6366f1'
}: CardSwipeProps) {
  const [cards, setCards] = useState([
    { id: 1, title: 'Adventure', subtitle: 'Explore the world' },
    { id: 2, title: 'Music', subtitle: 'Feel the rhythm' },
    { id: 3, title: 'Nature', subtitle: 'Connect with earth' },
  ]);
  const [swipedCards, setSwipedCards] = useState<number[]>([]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-rotation, rotation]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  // Indicator opacities
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
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
      { id: 1, title: 'Adventure', subtitle: 'Explore the world' },
      { id: 2, title: 'Music', subtitle: 'Feel the rhythm' },
      { id: 3, title: 'Nature', subtitle: 'Connect with earth' },
    ]);
    setSwipedCards([]);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Card Stack - Horizontal orientation */}
      <div className="relative w-56 h-36">
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
                className="absolute inset-0 rounded-xl shadow-xl cursor-grab active:cursor-grabbing overflow-hidden"
                style={{
                  background: cardBackground,
                  x: isTop ? x : 0,
                  rotate: isTop ? rotate : 0,
                  opacity: isTop ? opacity : 1,
                  scale: 1 - (cards.length - 1 - index) * 0.05,
                  y: (cards.length - 1 - index) * 6,
                  zIndex: index,
                }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                whileDrag={{ cursor: 'grabbing' }}
              >
                {/* Horizontal Layout: Image left, Content right */}
                <div className="flex h-full">
                  {/* Image Placeholder */}
                  <div className="w-[35%] h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white/50" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 flex flex-col items-start justify-center p-3">
                    <h3 className="text-base font-bold mb-0.5" style={{ color: titleColor }}>
                      {card.title}
                    </h3>
                    <p className="text-xs" style={{ color: subtitleColor }}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Like/Nope Indicators */}
                {isTop && (
                  <>
                    <motion.div
                      className="absolute top-2 right-2 px-1.5 py-0.5 bg-green-500 rounded text-white text-[10px] font-bold"
                      style={{ opacity: likeOpacity }}
                    >
                      LIKE
                    </motion.div>
                    <motion.div
                      className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-500 rounded text-white text-[10px] font-bold"
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
          className="p-2 rounded-full text-text-muted border"
          style={{ borderColor: accentColor, backgroundColor: `${accentColor}10` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4" style={{ color: accentColor }} />
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

