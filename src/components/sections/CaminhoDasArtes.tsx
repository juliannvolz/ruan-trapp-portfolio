'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { LinkButton } from '@/components/ui/Button';
import { SOCIAL_LINKS } from '@/lib/constants';
import { CAMINHO_DAS_ARTES_IMAGES } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export function CaminhoDasArtes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  // Horizontal scroll progress
  const scrollXProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const trackWidth = track.scrollWidth;
    const viewportWidth = container.clientWidth;
    const maxScroll = trackWidth - viewportWidth;

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const x = -self.progress * maxScroll;
        gsap.set(track, { x });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={containerRef}
      id="caminho-das-artes"
      className={cn(
        'py-24 md:py-32 bg-[#0a0a0a] border-b border-white/5 relative overflow-hidden isolation',
        'wall-texture'
      )}
      aria-labelledby="caminho-title"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
              Projeto da Prefeitura de Jaraguá do Sul
            </div>
            <h2 id="caminho-title" className="text-street text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-none">
              Caminho das Artes
            </h2>
            <p className="text-base md:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Galeria céu aberto no centro da cidade. Um dos marcos mais importantes
              da carreira do Ruan, organizado pela prefeitura.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Scroll Section */}
        <div className="relative" style={{ overflow: 'hidden' }}>
          <motion.div
            ref={trackRef}
            className="flex gap-4 md:gap-6 pb-8 md:pb-16 will-change-transform"
            role="list"
            aria-label="Obras do Caminho das Artes"
            style={{ width: 'max-content' }}
          >
            {CAMINHO_DAS_ARTES_IMAGES.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="flex-shrink-0 w-full md:w-[400px] lg:w-[450px]"
                role="listitem"
              >
                <div className="group relative overflow-hidden rounded-2xl bg-black/30 border border-white/10">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={`/images/${proj.src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`}
                      alt={proj.alt}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 400px, 450px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                    <div className="flex items-center gap-1 md:gap-2 mb-2">
                      <span className="w-3 md:w-4 h-3 md:h-4 text-orange-500" style={{ animation: 'pulse 2s infinite' }}>✦</span>
                      <span className="text-[10px] md:text-xs text-orange-400 font-bold uppercase tracking-wider">
                        Caminho das Artes
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm md:text-lg leading-tight">{proj.title}</h3>
                    <p className="text-gray-300 text-[11px] md:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 leading-tight">
                      {proj.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Duplicate for seamless loop effect */}
            {CAMINHO_DAS_ARTES_IMAGES.map((proj, i) => (
              <motion.div
                key={`${proj.title}-dup`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="flex-shrink-0 w-full md:w-[400px] lg:w-[450px]"
                role="listitem"
                aria-hidden="true"
              >
                <div className="group relative overflow-hidden rounded-2xl bg-black/30 border border-white/10">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={`/images/${proj.src.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`}
                      alt={proj.alt}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 400px, 450px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                    <div className="flex items-center gap-1 md:gap-2 mb-2">
                      <span className="w-3 md:w-4 h-3 md:h-4 text-orange-500" style={{ animation: 'pulse 2s infinite' }}>✦</span>
                      <span className="text-[10px] md:text-xs text-orange-400 font-bold uppercase tracking-wider">
                        Caminho das Artes
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm md:text-lg leading-tight">{proj.title}</h3>
                    <p className="text-gray-300 text-[11px] md:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 leading-tight">
                      {proj.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <ScrollReveal
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 md:gap-8 px-4 md:px-6 py-6 md:py-8 bg-[#111111] rounded-2xl border border-white/10">
            <div className="space-y-2 md:space-y-3">
              <h3 className="text-lg md:text-2xl font-bold text-white leading-tight">
                Por que esse projeto importa
              </h3>
              <p className="text-base md:text-sm text-gray-300 leading-relaxed max-w-md">
                O Caminho das Artes transformou paredes da cidade em uma galeria a
                céu aberto, levando arte para onde as pessoas estão. Ruan participou
                ativamente desse movimento, deixando sua assinatura nas ruas de
                Jaraguá do Sul.
              </p>
            </div>
            <div className="flex gap-2 md:gap-4 w-full lg:w-auto justify-center lg:justify-end">
              <LinkButton
                href={SOCIAL_LINKS.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4"
              >
                <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="ml-2 text-sm md:text-base">Ver no Instagram</span>
              </LinkButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}