'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

let isRegistered = false;

export function registerGSAP(): void {
  if (isRegistered || typeof window === 'undefined') return;

  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    TextPlugin,
    DrawSVGPlugin,
    SplitText
  );

  // Global GSAP config
  gsap.config({
    nullTargetWarn: false,
    autoSleep: 60,
    force3D: 'auto',
  });

  // Default ease
  gsap.defaults({
    ease: 'var(--ease-brand)',
    duration: 0.28,
  });

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  });

  // Refresh on resize
  let resizeTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });

  isRegistered = true;
}

export function getGSAP() {
  if (!isRegistered) registerGSAP();
  return gsap;
}

export function getScrollTrigger() {
  if (!isRegistered) registerGSAP();
  return ScrollTrigger;
}

export { gsap, ScrollTrigger, ScrollToPlugin, TextPlugin, DrawSVGPlugin, SplitText };