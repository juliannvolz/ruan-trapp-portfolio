'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SprayParticleSystem } from '@/components/ui/SprayParticleSystem';
import { SprayWriteSignature } from '@/components/ui/SprayWriteSignature';
import { LinkButton } from '@/components/ui/Button';
import { SOCIAL_LINKS } from '@/lib/constants';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const [signatureDone, setSignatureDone] = useState(false);

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const particlesY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          heroRef.current.style.setProperty('--hero-scroll', String(Math.max(0, Math.min(1, -rect.top / window.innerHeight))));
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={cn(
        'relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black isolation',
        'wall-texture'
      )}
      style={{ '--hero-scroll': '0' } as React.CSSProperties}
      aria-label="Hero - Ruan Trapp"
    >
      <SprayParticleSystem 
        particleCount={200} 
        accentColor="#ff6b00" 
        density="medium" 
        colorScheme="fire" 
        className="pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${particlesY}px)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" style={{ transform: `translateY(${gradientY}px)` }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-3" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-[100%]">
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(16px) scale(0.96)' }}
          animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10',
            'backdrop-blur-sm mb-8'
          )}
          style={{ opacity: badgeOpacity }}
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true" />
          <span className="text-orange-400 font-mono text-xs font-bold tracking-widest uppercase">
            Artista Visual • Muralista • Tatuador
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: titleOpacity, transform: `scale(${titleScale})` } as unknown as React.CSSProperties}
        >
          <SprayWriteSignature
            text="RUAN TRAPP"
            onComplete={() => setSignatureDone(true)}
            className={cn(
              'text-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter',
              'text-white leading-none drop-shadow-lg sm:leading-tight'
            )}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, transform: 'translateY(24px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.7, delay: signatureDone ? 0.2 : 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 md:mt-8 text-base md:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed px-4"
          style={{ opacity: subtitleOpacity }}
        >
          Graffiti, caligrafia gótica e calligraffiti de Jaraguá do Sul (SC).
          Murais, telas e letreiros com a força da arte de rua.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, transform: 'translateY(24px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.7, delay: signatureDone ? 0.4 : 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 touch-target"
          style={{ opacity: ctaOpacity }}
        >
          <LinkButton
            href={SOCIAL_LINKS.whatsapp.href}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'w-full sm:w-auto px-8 md:px-10 py-5',
              'group relative overflow-hidden border border-white/20',
              'text-center sm:text-left touch-target focus-ring'
            )}
            aria-label={SOCIAL_LINKS.whatsapp.ariaLabel}
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors duration-300" />
            <span className="relative z-10 flex items-center justify-center sm:justify-start gap-3">
              <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-green-500 text-xs font-bold">+</span>
              <span className="text-sm sm:text-base">WhatsApp</span>
            </span>
          </LinkButton>
          <LinkButton
            href={SOCIAL_LINKS.instagram.href}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'w-full sm:w-auto px-8 md:px-10 py-5',
              'group relative overflow-hidden border border-white/20',
              'text-center sm:text-left touch-target focus-ring'
            )}
            aria-label={SOCIAL_LINKS.instagram.ariaLabel}
          >
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
            <span className="relative z-10 flex items-center justify-center sm:justify-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.071 3.252.148 4.77 1.691 4.919 4.919.059 1.265.071 1.645.071 4.85s-.012 3.584-.071 4.85c-.148 3.228-1.691 4.746-4.919 4.919-1.266.059-1.645.071-4.85.071s-3.584-.012-4.85-.071-4.77-1.691-4.919-4.919c-.059-1.265-.071-1.645-.071-4.85s.012-3.584.071-4.85c.148-3.228 1.691-4.746 4.919-4.919 1.266-.059 1.645-.99 2.014-2.25.257-.92.45-3.103.45-6.562 0-3.459-.192-5.642-.45-6.562-.272-.97-1.024-1.832-2.014-2.25-1-.42-4.589.548-5.635-1.595-.97-.97-2.014-4.658-1.595-5.635.418-.99.99-1.742 2.25-2.014.92-.257 3.103-.45 6.562-.45zm0 2.162c-3.459 0-5.642.192-6.562.45-.97.272-1.832 1.024-2.25 2.014-.42 1 .548 4.589 1.595 5.635.97.97 4.658 2.014 5.635 1.595.99-.418 1.742-.99 2.014-2.25.257-.92.45-3.103.45-6.562 0-3.459-.192-5.642-.45-6.562-.272-.97-1.024-1.832-2.014-2.25-1-.42-4.589.548-5.635-1.595-.97-.97-2.014-4.658-1.595-5.635.418-.99.99-1.742 2.25-2.014.92-.257 3.103-.45 6.562-.45z" />
                </svg>
              </span>
              <span className="text-sm sm:text-base">Instagram</span>
            </span>
          </LinkButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: signatureDone ? 0.8 : 2.2 }}
          className="mt-16 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 font-mono tracking-widest"
        >
          <span className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" aria-hidden="true" />
          <span>Role para explorar</span>
          <svg className="w-3.5 h-3.5 animate-[bounce_2s_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}