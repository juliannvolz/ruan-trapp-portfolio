'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SprayCan, Brush, Palette, Syringe, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SERVICES, type Service } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { LinkButton } from '@/components/ui/Button';
import { SOCIAL_LINKS } from '@/lib/constants';

const serviceIcons = {
  'spray-can': SprayCan,
  brush: Brush,
  palette: Palette,
  needle: Syringe,
  'graduation-cap': GraduationCap,
};

export function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-black border-b border-white/5 relative overflow-hidden isolation"
      aria-labelledby="services-title"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

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
              O que eu faço
            </div>
            <h2 id="services-title" className="text-street text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-none">
              Serviços
            </h2>
            <p className="text-base md:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Da parede à pele, da ideia à execução. Cada projeto carrega a mesma dedicação.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {SERVICES.map((service, i) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
            return (
              <ScrollReveal
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              >
                <MagneticCard service={service} Icon={Icon} />
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="text-center">
            <p className="text-gray-400 text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
              Não encontrou o que procura? Cada projeto é único — vamos conversar sobre o seu.
            </p>
            <LinkButton
              href={SOCIAL_LINKS.whatsapp.href}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-3"
            >
              <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-green-500 text-xs font-bold">+</span>
              <span>Falar no WhatsApp</span>
            </LinkButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

interface MagneticCardProps {
  service: Service;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function MagneticCard({ service, Icon }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardRect, setCardRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updateRect = () => {
      const rect = card.getBoundingClientRect();
      setCardRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRect.width) return;
    const x = e.clientX - cardRect.x - cardRect.width / 2;
    const y = e.clientY - cardRect.y - cardRect.height / 2;
    const maxRotate = 8;
    const rotateX = (y / (cardRect.height / 2)) * maxRotate;
    const rotateY = (x / (cardRect.width / 2)) * maxRotate;
    setMousePos({ x: rotateY, y: -rotateX });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveCard = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveCard}
      whileHover={{ y: -8, boxShadow: '0 30px 40px -10px rgba(255, 107, 0, 0.2), 0 0 60px rgba(255, 107, 0, 0.15)' }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative p-6 md:p-8 bg-[#111111] rounded-2xl border border-white/10 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur"
      />

      <div className="relative space-y-4 md:space-y-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300"
        >
          <Icon className="w-6 h-6" strokeWidth={2} />
        </motion.div>

        <div>
          <span className="text-[10px] md:text-xs text-orange-400 font-bold uppercase tracking-wider block mb-1">
            Serviço
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{service.title}</h3>
        </div>

        <p className="text-gray-300 leading-relaxed">{service.description}</p>

        <LinkButton
          href={SOCIAL_LINKS.whatsapp.href}
          variant="outline"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto mt-4"
        >
          <span className="flex items-center justify-center gap-2">
            {service.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </span>
        </LinkButton>
      </div>
    </motion.div>
  );
}