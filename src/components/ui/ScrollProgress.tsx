'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;
      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (progress === 0) return null;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-[1700] h-[3px] bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500',
        'origin-left transition-transform duration-70 ease-out'
      )}
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left center',
      }}
      aria-hidden="true"
    />
  );
}