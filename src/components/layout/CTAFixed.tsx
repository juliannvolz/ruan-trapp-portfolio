'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS } from '@/lib/constants';

export function CTAFixed() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (direction === 'down' && currentScrollY > lastScrollY + 50) {
        setIsVisible(false);
      } else if (direction === 'up') {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(SOCIAL_LINKS.whatsapp.href, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(SOCIAL_LINKS.instagram.href, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
        scale: isVisible ? 1 : 0.9,
      }}
      transition={{
        duration: prefersReduced ? 0.01 : 0.4,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="fixed bottom-6 right-6 z-[1500] flex flex-col-reverse items-end gap-3"
      role="region"
      aria-label="Ações rápidas"
    >
      {/* WhatsApp Button */}
      <motion.button
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'w-14 h-14 md:w-16 md:h-16 rounded-full',
          'bg-green-500 text-black font-bold',
          'flex items-center justify-center gap-2',
          'shadow-lg shadow-green-500/30',
          'hover:bg-green-400 active:bg-green-600',
          'transition-all duration-200 ease-out',
          'touch-target focus-ring',
          'group'
        )}
        aria-label={SOCIAL_LINKS.whatsapp.ariaLabel}
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        <span className="text-sm md:text-base hidden lg:inline">WhatsApp</span>
      </motion.button>

      {/* Instagram Button */}
      <motion.button
        onClick={handleInstagramClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'w-14 h-14 md:w-16 md:h-16 rounded-full',
          'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500',
          'text-white font-bold',
          'flex items-center justify-center gap-2',
          'shadow-lg shadow-purple-500/30',
          'hover:from-purple-500 hover:via-pink-400 hover:to-orange-400',
          'transition-all duration-200 ease-out',
          'touch-target focus-ring',
          'group'
        )}
        aria-label={SOCIAL_LINKS.instagram.ariaLabel}
      >
        <Instagram className="w-6 h-6 md:w-7 md:h-7" />
        <span className="text-sm md:text-base hidden lg:inline">Instagram</span>
      </motion.button>
    </motion.div>
  );
}