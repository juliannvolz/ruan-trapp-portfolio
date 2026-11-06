'use client';

import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { createLenis } from '@/lib/lenis';
import { registerGSAP } from '@/lib/gsap';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { CaminhoDasArtes } from '@/components/sections/CaminhoDasArtes';
import { Portfolio } from '@/components/sections/Portfolio';
import { Processo } from '@/components/sections/Processo';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CTAFixed } from '@/components/layout/CTAFixed';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export default function Home() {
  useEffect(() => {
    // Register GSAP plugins
    registerGSAP();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = createLenis();
    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Anchor links via Lenis
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -56 });
      }
    };
    document.addEventListener('click', onClick, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <CTAFixed />
      <ScrollProgress />
      <Header />
      <main className="relative overflow-hidden isolation">
        <Hero key="hero" />
        <About key="about" />
        <CaminhoDasArtes key="caminho-das-artes" />
        <Portfolio key="portfolio" />
        <Processo key="processo" />
        <Services key="services" />
        <Contact key="contact" />
      </main>
      <Footer />
    </MotionConfig>
  );
}