'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SmartImage } from './SmartImage';

interface CrossfadeGalleryProps {
  images: string[];
  altPrefix: string;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  aspectRatio?: string;
}

export function CrossfadeGallery({
  images,
  altPrefix,
  interval = 4000,
  showDots = true,
  showArrows = true,
  pauseOnHover = true,
  className,
  aspectRatio = '4/5',
}: CrossfadeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (prefersReduced || isHovered && pauseOnHover || images.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, interval, goToNext, images.length, prefersReduced, isHovered, pauseOnHover]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrev();
  };

  const currentImage = images[currentIndex] ?? images[0] ?? '';

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[#111111]',
        `aspect-${aspectRatio}`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Galeria de ${altPrefix}`}
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0"
        >
          <SmartImage
            src={currentImage}
            alt={`${altPrefix} - imagem ${currentIndex + 1} de ${images.length}`}
            fill
            priority={currentIndex === 0}
            sizes="100vw"
            unoptimized
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {mounted && showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full',
              'bg-white/10 backdrop-blur border border-white/20',
              'flex items-center justify-center text-white',
              'hover:bg-white/20 transition-colors touch-target',
              'focus-ring opacity-0 group-hover:opacity-100 transition-opacity',
              prefersReduced && 'opacity-0 pointer-events-none'
            )}
            aria-label="Imagem anterior"
            disabled={prefersReduced}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full',
              'bg-white/10 backdrop-blur border border-white/20',
              'flex items-center justify-center text-white',
              'hover:bg-white/20 transition-colors touch-target',
              'focus-ring opacity-0 group-hover:opacity-100 transition-opacity',
              prefersReduced && 'opacity-0 pointer-events-none'
            )}
            aria-label="Próxima imagem"
            disabled={prefersReduced}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {mounted && showDots && images.length > 1 && (
        <div
          className={cn(
            'absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2',
            prefersReduced && 'opacity-0 pointer-events-none'
          )}
          role="tablist"
          aria-label="Navegação da galeria"
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300 touch-target',
                'focus-ring',
                index === currentIndex
                  ? 'bg-orange-500 w-6 shadow-lg shadow-orange-500/50'
                  : 'bg-white/30 hover:bg-white/50'
              )}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-2 right-2 z-10 text-xs text-white/50 font-mono">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}