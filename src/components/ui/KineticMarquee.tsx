'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface KineticMarqueeProps {
  content?: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  paused?: boolean;
  className?: string;
  reverse?: boolean;
}

export function KineticMarquee({
  content,
  speed = 0.5,
  direction = 'left',
  paused = false,
  className,
  reverse = false,
}: KineticMarqueeProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const velocityRef = useRef(speed);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    velocityRef.current = speed * (reverse ? -1 : 1) * (direction === 'right' ? -1 : 1);
  }, [speed, direction, reverse]);

  useEffect(() => {
    if (prefersReduced || paused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      if (!trackRef.current) return;
      
      positionRef.current += velocityRef.current;
      
      const trackWidth = trackRef.current.scrollWidth / 2;
      if (Math.abs(positionRef.current) >= trackWidth) {
        positionRef.current = 0;
      }
      
      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReduced, paused]);

  const defaultContent = (
    <>
      <span className="text-street text-3xl md:text-5xl font-black tracking-tighter text-white">
        RUAN TRAPP
      </span>
      <span className="w-16 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mx-8" />
      <span className="text-street text-3xl md:text-5xl font-black tracking-tighter text-white">
        ARTISTA VISUAL
      </span>
      <span className="w-16 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mx-8" />
      <span className="text-street text-3xl md:text-5xl font-black tracking-tighter text-orange-500">
        MURALISTA
      </span>
      <span className="w-16 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mx-8" />
      <span className="text-street text-3xl md:text-5xl font-black tracking-tighter text-white">
        TATUADOR
      </span>
      <span className="w-16 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mx-8" />
      <span className="text-street text-3xl md:text-5xl font-black tracking-tighter text-white">
        JARAGUÁ DO SUL
      </span>
    </>
  );

  return (
    <div
      className={cn(
        'overflow-hidden bg-black/50 border-y border-white/10 py-6',
        className
      )}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap gap-8 md:gap-16 will-change-transform"
        style={{ transform: `translateX(${positionRef.current}px)` }}
      >
        {content || defaultContent}
        {content || defaultContent}
      </div>
    </div>
  );
}