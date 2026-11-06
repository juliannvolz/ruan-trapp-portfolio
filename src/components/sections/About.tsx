'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Award, Clock, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal, TextReveal } from '@/components/ui/ScrollReveal';

export function About() {
  const { scrollYProgress } = useScroll();

  const imageRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const stats = [
    { label: 'ANOS DE TRAJETÓRIA', value: '2018 → 2024', icon: Clock },
    { label: 'CIDADE', value: 'JARAGUÁ DO SUL, SC', icon: MapPin },
    { label: 'ATUAÇÃO PROFISSIONAL', value: 'DESDE 2024', icon: Award },
    { label: 'ESTILOS', value: 'GRAFFITI • CALIGRAFIA • CALLIGRAFFITI', icon: Palette },
  ];

  return (
    <section
      id="about"
      className={cn(
        'py-24 md:py-32 bg-black border-b border-white/5 relative overflow-hidden isolation',
        'wall-texture'
      )}
      aria-labelledby="about-title"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image with deep parallax */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{
                rotate: imageRotate,
                scale: imageScale,
                y: imageY,
              }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
              <ScrollReveal
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-spray/20 aspect-square"
              >
                <motion.img
                  src="/images/ruan-trapp3x4.webp"
                  alt="Ruan Trapp - artista visual muralista tatuador"
                  initial={{ transform: 'scale(1.15)' }}
                  whileInView={{ transform: 'scale(1)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="100vw"
                />
                <div className="absolute -bottom-8 -left-8 bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-md">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg shadow-orange-500/30">
                      2024
                    </div>
                    <div>
                      <span className="block text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-semibold">
                        Profissional desde
                      </span>
                      <span className="block text-sm md:text-base font-bold text-white leading-tight">
                        Muralista
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>
          </div>

          {/* Text content with parallax and split-text reveal */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 space-y-8"
          >
            <ScrollReveal
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-2 md:gap-3 mb-4"
            >
              <div className="w-1 h-6 bg-orange-500 rounded-full" />
              <h2 id="about-title" className="text-street text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                Quem sou
              </h2>
            </ScrollReveal>

            <ScrollReveal
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-6"
            >
              <TextReveal
                as="p"
                className="text-base md:text-lg md:text-xl text-gray-300 leading-relaxed"
                stagger={0.03}
              >
                Ruan Trapp é artista visual, muralista e tatuador de{' '}
                <span className="text-white font-bold">Jaraguá do Sul (SC)</span>.
                Sua trajetória no graffiti começou na adolescência, em{' '}
                <span className="text-white font-bold">2018</span>, através da cultura Hip Hop e da
                pesquisa sobre letras, caligrafia gótica e calligraffiti.
              </TextReveal>

              <TextReveal
                as="p"
                className="text-base md:text-lg md:text-xl text-gray-300 leading-relaxed"
                stagger={0.03}
              >
                Desde <span className="text-white font-bold">2024</span> atua profissionalmente como
                muralista, desenvolvendo obras para espaços públicos e privados.
                Também participou de projetos artísticos voltados à comunidade e
                ministrou oficinas de graffiti em iniciativas culturais da cidade.
              </TextReveal>

              <TextReveal
                as="p"
                className="text-base md:text-lg md:text-xl text-gray-300 leading-relaxed"
                stagger={0.03}
              >
                Atualmente trabalha com murais, letreiros e telas, explorando a
                relação entre arte urbana, tipografia e identidade visual.
              </TextReveal>
            </ScrollReveal>

            <ScrollReveal
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 md:pt-6 border-t border-white/10">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, transform: 'translateY(24px) scale(0.97)' }}
                      whileInView={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                      className="p-3 md:p-4 bg-[#111111] rounded-xl border border-white/5"
                    >
                      <div className="flex items-center gap-1 md:gap-2 mb-2">
                        <Icon className="w-4 h-4 text-orange-500" />
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-semibold leading-tight">
                        {stat.label}
                      </p>
                      <p className="text-sm md:text-base font-bold text-white leading-tight">
                        {stat.value}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}