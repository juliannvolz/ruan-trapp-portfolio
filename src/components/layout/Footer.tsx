'use client';

import { Instagram, MessageCircle, MapPin, Mail } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer
      className="relative border-t border-white/10 bg-black overflow-hidden"
      role="contentinfo"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div className="space-y-6">
            <LinkButton
              href="#hero"
              variant="ghost"
              size="lg"
              className="text-street text-3xl md:text-4xl focus-ring"
              aria-label="Ruan Trapp - Início"
            >
              <span className="graffiti-gradient">RUAN TRAPP</span>
            </LinkButton>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xs">
              Artista visual, muralista e tatuador de Jaraguá do Sul (SC).
              Graffiti, caligrafia gótica e calligraffiti com a força da arte de rua.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.instagram.ariaLabel}
                className={cn(
                  'w-10 h-10 rounded-full bg-white/5 border border-white/10',
                  'flex items-center justify-center text-white',
                  'hover:bg-white/10 hover:border-white/20 transition-all',
                  'touch-target focus-ring'
                )}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.whatsapp.ariaLabel}
                className={cn(
                  'w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30',
                  'flex items-center justify-center text-green-400',
                  'hover:bg-green-500/30 hover:border-green-500 transition-all',
                  'touch-target focus-ring'
                )}
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-street text-lg md:text-xl tracking-tight">
              Contato
            </h3>
            <div className="space-y-4">
              <a
                href={SOCIAL_LINKS.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-3 text-gray-300 hover:text-orange-500',
                  'transition-colors group'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30',
                  'flex items-center justify-center text-green-400',
                  'group-hover:bg-green-500/30 group-hover:border-green-500 transition-all'
                )}>
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">WhatsApp</span>
                  <span className="text-sm font-medium text-white">+55 47 9224-2056</span>
                </div>
              </a>
              <a
                href={SOCIAL_LINKS.email.href}
                className={cn(
                  'flex items-center gap-3 text-gray-300 hover:text-orange-500',
                  'transition-colors group'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full bg-white/5 border border-white/10',
                  'flex items-center justify-center text-white',
                  'group-hover:bg-white/10 group-hover:border-white/20 transition-all'
                )}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Email</span>
                  <span className="text-sm font-medium text-white">ruantrapp@email.com</span>
                </div>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <div className={cn(
                  'w-10 h-10 rounded-full bg-white/5 border border-white/10',
                  'flex items-center justify-center text-white'
                )}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Localização</span>
                  <span className="text-sm font-medium text-white">{SITE_CONFIG.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-street text-lg md:text-xl tracking-tight">
              Navegação
            </h3>
            <nav aria-label="Links rápidos">
              <ul className="space-y-3" role="list">
                {[
                  { href: '#about', label: 'Quem Sou' },
                  { href: '#caminho-das-artes', label: 'Caminho das Artes' },
                  { href: '#portfolio', label: 'Portfólio' },
                  { href: '#processo', label: 'Processo Criativo' },
                  { href: '#services', label: 'Serviços' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'text-gray-400 hover:text-orange-500 transition-colors',
                        'font-medium text-base'
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ruan Trapp. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm font-mono tracking-widest">
            Feito com spray e código
          </p>
        </div>
      </div>
    </footer>
  );
}