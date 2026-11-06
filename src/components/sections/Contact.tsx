'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, MessageCircle, Instagram, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants';
import { LinkButton } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden isolation"
      aria-labelledby="contact-title"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-3 md:w-4 h-3 md:h-4" style={{ animation: 'pulse 2s infinite' }}>✦</span>
              Vamos conversar
            </div>
            <h2 id="contact-title" className="text-street text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-none">
              Entre em contato
            </h2>
            <p className="text-base md:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Tem um muro pedindo arte? Quer uma tatuagem única? Precisa de um letreiro que pare o trânsito?
              Manda mensagem e a gente resolve.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {/* WhatsApp */}
          <ScrollReveal
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <a
              href={SOCIAL_LINKS.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group relative p-6 md:p-8 bg-[#111111] rounded-2xl border border-white/10',
                'hover:border-green-500/30 transition-all duration-500',
                'flex flex-col items-center text-center'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur" />
              
              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
                  <MessageCircle className="w-8 h-8" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-[10px] md:text-xs text-green-400 font-bold uppercase tracking-wider block mb-1">
                    WhatsApp
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Fala direto comigo</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">Respondo rápido. Manda a ideia, referência, medidas do muro — a gente alinha tudo por lá.</p>
                <LinkButton
                  href={SOCIAL_LINKS.whatsapp.href}
                  variant="primary"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto mt-2"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-green-500 text-xs font-bold">+</span>
                    <span>Abrir WhatsApp</span>
                  </span>
                </LinkButton>
              </div>
            </a>
          </ScrollReveal>

          {/* Instagram */}
          <ScrollReveal
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <a
              href={SOCIAL_LINKS.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group relative p-6 md:p-8 bg-[#111111] rounded-2xl border border-white/10',
                'hover:border-pink-500/30 transition-all duration-500',
                'flex flex-col items-center text-center'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur" />
              
              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:from-purple-600 group-hover:to-pink-500 group-hover:text-white transition-all duration-300">
                  <Instagram className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] md:text-xs text-pink-400 font-bold uppercase tracking-wider block mb-1">
                    Instagram
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">@ruantrapp</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">Todo o portfólio atualizado, bastidores, reels de processo e referências. Segue lá pra não perder nada.</p>
                <LinkButton
                  href={SOCIAL_LINKS.instagram.href}
                  variant="outline"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto mt-2"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Instagram className="w-4 h-4" />
                    <span>Ver no Instagram</span>
                  </span>
                </LinkButton>
              </div>
            </a>
          </ScrollReveal>

          {/* Email */}
          <ScrollReveal
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <a
              href={SOCIAL_LINKS.email.href}
              className={cn(
                'group relative p-6 md:p-8 bg-[#111111] rounded-2xl border border-white/10',
                'hover:border-orange-500/30 transition-all duration-500',
                'flex flex-col items-center text-center'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur" />
              
              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                  <Mail className="w-8 h-8" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-[10px] md:text-xs text-orange-400 font-bold uppercase tracking-wider block mb-1">
                    Email
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Projetos formais</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">Para briefings detalhados, contratos, orçamentos formais e documentação. ruantrapp@email.com</p>
                <LinkButton
                  href={SOCIAL_LINKS.email.href}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto mt-2"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Enviar email</span>
                  </span>
                </LinkButton>
              </div>
            </a>
          </ScrollReveal>
        </div>

        {/* Info adicional */}
        <ScrollReveal
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="p-6 bg-[#111111] rounded-2xl border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500">
                <MapPin className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Localização</h3>
              <p className="text-gray-400">{SITE_CONFIG.location}</p>
              <p className="text-gray-500 text-sm mt-1">Atendo projetos em todo Brasil</p>
            </div>
            <div className="p-6 bg-[#111111] rounded-2xl border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500">
                <Clock className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Disponibilidade</h3>
              <p className="text-gray-400">Segunda a sábado</p>
              <p className="text-gray-500 text-sm mt-1">9h às 18h (flexível para projetos)</p>
            </div>
            <div className="p-6 bg-[#111111] rounded-2xl border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500">
                <span className="text-2xl font-bold">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Prazo médio</h3>
              <p className="text-gray-400">Mural: 3-10 dias</p>
              <p className="text-gray-500 text-sm mt-1">Tattoo: agendar com 2 semanas</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}