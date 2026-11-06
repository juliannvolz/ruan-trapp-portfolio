'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image as LucideImage, Play, RefreshCw } from 'lucide-react';
import { CrossfadeGallery } from '@/components/ui/CrossfadeGallery';
import { cn } from '@/lib/utils';
import { PROCESS_STEPS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export function Processo() {
  const { scrollYProgress } = useScroll();
  const timelineRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const containerY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Initialize DrawSVG for timeline
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = String(pathLength);
    path.style.strokeDashoffset = String(pathLength);

    const st = ScrollTrigger.create({
      trigger: '#processo',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      onUpdate: (self) => {
        const drawLength = pathLength * self.progress;
        path.style.strokeDashoffset = String(pathLength - drawLength);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="processo"
      className="py-24 md:py-32 bg-[#0a0a0a] border-b border-white/5 relative overflow-hidden isolation"
      aria-labelledby="processo-title"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* SVG Timeline Path */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 pointer-events-none">
        <svg ref={timelineRef} className="w-full h-full" viewBox="0 0 2 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6b00" />
              <stop offset="50%" stopColor="#ff0066" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d="M1,10 C1,200 1,400 1,500 C1,600 1,800 1,990"
            stroke="url(#timeline-gradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4">
              <RefreshCw className="w-3 md:w-4 h-3 md:h-4" style={{ animation: 'spin 10s linear infinite' }} />
              Do rascunho ao acabamento
            </div>
            <h2 id="processo-title" className="text-street text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-none">
              Processo Criativo
            </h2>
            <p className="text-base md:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Cada etapa da criação de uma obra de rua, capturada passo a passo.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          style={{ y: containerY }}
          className="space-y-16 md:space-y-24"
        >
          {PROCESS_STEPS.map((step, i) => (
            <ScrollReveal
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative">
                {i > 0 && (
                  <motion.div
                    className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformOrigin: 'top center' }}
                  />
                )}

                <div className="flex-1 relative">
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-[#111111] border border-white/10 shadow-xl shadow-spray/20"
                  >
                    <div className="relative h-full">
                      <CrossfadeGallery images={step.images as unknown as string[]} altPrefix={step.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-orange-500 text-black text-[10px] md:text-xs font-bold rounded uppercase tracking-wider shadow-lg shadow-orange-500/30">
                          Etapa {step.id} de 4
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <button className="w-10 h-10 rounded-full bg-[#111111] backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors touch-target shadow-lg focus-ring">
                          <Play className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="flex-1 space-y-4 md:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg shadow-orange-500/30">
                        {step.id}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{step.title}</h3>
                    </div>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="text-base md:text-lg text-gray-300 leading-relaxed"
                  >
                    {step.longDesc}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-400 font-mono border-l-2 border-orange-500 pl-3 md:pl-4"
                  >
                    <LucideImage className="w-3 md:w-4 h-3 md:h-4" />
                    <span className="leading-tight">{step.images.length} fotos do making-of</span>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}