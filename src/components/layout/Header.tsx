'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { LinkButton } from '@/components/ui/Button';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[1600] transition-all duration-300 ease-out',
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-spray/10'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <LinkButton
              href="#hero"
              variant="ghost"
              size="sm"
              className="text-street text-lg md:text-xl focus-ring"
              aria-label="Ruan Trapp - Início"
            >
              <span className="graffiti-gradient">RUAN TRAPP</span>
            </LinkButton>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <LinkButton
                key={link.href}
                href={link.href}
                variant="ghost"
                size="sm"
                className="text-sm font-semibold text-gray-300 hover:text-white hover:text-orange-500 transition-colors duration-200 px-3 py-2 rounded-lg focus-ring"
              >
                {link.label}
              </LinkButton>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <LinkButton
              href={SOCIAL_LINKS.instagram.href}
              variant="outline"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.instagram.ariaLabel}
              className="gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </LinkButton>
            <LinkButton
              href={SOCIAL_LINKS.whatsapp.href}
              variant="primary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LINKS.whatsapp.ariaLabel}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </LinkButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors touch-target focus-ring"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" strokeWidth={2.5} />
            ) : (
              <Menu className="w-6 h-6 text-white" strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReduced ? 0.01 : 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
            >
              <div className="py-6 space-y-4">
                {NAV_LINKS.map((link) => (
                  <LinkButton
                    key={link.href}
                    href={link.href}
                    variant="ghost"
                    size="md"
                    className="w-full justify-start text-lg font-semibold text-gray-300 hover:text-orange-500 px-4 py-3 rounded-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </LinkButton>
                ))}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <LinkButton
                    href={SOCIAL_LINKS.instagram.href}
                    variant="outline"
                    size="md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full gap-3"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </LinkButton>
                  <LinkButton
                    href={SOCIAL_LINKS.whatsapp.href}
                    variant="primary"
                    size="md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </LinkButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}