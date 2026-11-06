'use client';

import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type LenisOptions = ConstructorParameters<typeof Lenis>[0];
type LenisScrollToOptions = Parameters<Lenis['scrollTo']>[1];

let lenisInstance: Lenis | null = null;

export function createLenis(options?: Partial<LenisOptions>): Lenis {
  if (lenisInstance) {
    lenisInstance.destroy();
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2.5,
    infinite: false,
    lerp: prefersReduced ? 1 : 0.08,
    ...options,
  });

  // Bridge Lenis with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function scrollTo(target: HTMLElement | string, options?: LenisScrollToOptions): void {
  lenisInstance?.scrollTo(target, options);
}