'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as LucideImage, Building, Layout, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { SmartImage } from '@/components/ui/SmartImage';
import { LinkButton } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const works = [
  { id: 1, title: 'Mural Academia', category: 'murals', src: '/images/grafite-academia.webp' },
  { id: 2, title: 'Grafite Escrita', category: 'murals', src: '/images/grafite-escrita.webp' },
  { id: 3, title: 'Estúdio', category: 'studio', src: '/images/grafite-estudio.webp' },
  { id: 4, title: 'Parede Azul', category: 'murals', src: '/images/caligra-parede-azul.webp' },
  { id: 5, title: 'Parede Azul 2', category: 'murals', src: '/images/caligra-parede-azul2.webp' },
  { id: 6, title: 'Parede Branca', category: 'murals', src: '/images/caligra-parede-branca.webp' },
  { id: 7, title: 'Caligrafite Abstrato', category: 'calligraphy', src: '/images/caligrafite-abstrato.webp' },
  { id: 8, title: 'Caligrafite Cliente', category: 'calligraphy', src: '/images/caligrafite-cliente.webp' },
  { id: 9, title: 'Caligrafite Studio', category: 'studio', src: '/images/caligrafite-studio.webp' },
  { id: 10, title: 'Caligrafite Studio Tattoo', category: 'studio', src: '/images/caligrafite-studio-tattoo.webp' },
  { id: 11, title: 'Cliente Piolho Escada', category: 'calligraphy', src: '/images/cliente-piolho-caligra-escada.webp' },
  { id: 12, title: 'Quadro Parede Caligrafite', category: 'canvas', src: '/images/quadro-parede-caligrafite.webp' },
  { id: 13, title: 'Caligrafite Parede Azul', category: 'murals', src: '/images/caligra-parede-azul.webp' },
  { id: 14, title: 'Caligrafite Cliente Pronto', category: 'calligraphy', src: '/images/caligra-cliente-pronto.webp' },
  { id: 15, title: 'Caligrafia Grafite', category: 'calligraphy', src: '/images/caligra-grafite.webp' },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredWorks = activeCategory === 'all'
    ? works
    : works.filter((w) => w.category === activeCategory);

  const openModal = (work: typeof works[0]) => {
    setSelectedWork(work);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedWork(null);
  };

  // Masonry layout calculation
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const [colCount, setColCount] = useState(3);

  useEffect(() => {
    const calculateColumns = () => {
      const width = gridRef.current?.clientWidth || 1200;
      const cols = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
      setColCount(cols);
      setColumnHeights(new Array(cols).fill(0));
    };
    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, []);

  // Calculate positions for masonry
  const itemPositions = filteredWorks.map((work, i) => {
    const col = i % colCount;
    const row = Math.floor(i / colCount);
    const top = row * 320; // approximate height + gap
    const left = col * (100 / colCount);
    return { top: `${top}px`, left: `${left}%`, width: `${100 / colCount}%` };
  });

  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 bg-black border-b border-white/5 relative overflow-hidden isolation"
      aria-labelledby="portfolio-title"
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
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 mb-12 md:mb-16">
            <div>
              <h2 id="portfolio-title" className="text-street text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 leading-none">
                Portfolio
              </h2>
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest">
                Obras, murais, caligrafia e telas
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Categorias do portfólio">
              {PORTFOLIO_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'whitespace-nowrap px-4 md:px-5 py-2 md:py-3 text-xs sm:text-sm font-bold border transition-all duration-300 touch-target',
                      isActive
                        ? 'bg-orange-500 text-black border-orange-500 shadow-lg shadow-orange-500/30'
                        : 'bg-[#111111] border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20 hover:text-white'
                    )}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${cat.id}-panel`}
                  >
                    {cat.icon === 'building' && <Building className={`w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2 ${isActive ? 'text-black' : 'text-gray-400'}`} />}
                    {cat.icon === 'image' && <LucideImage className={`w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2 ${isActive ? 'text-black' : 'text-gray-400'}`} />}
                    {cat.icon === 'layout' && <Layout className={`w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2 ${isActive ? 'text-black' : 'text-gray-400'}`} />}
                    {cat.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            id={`${activeCategory}-panel`}
            role="tabpanel"
            aria-label={`${activeCategory === 'all' ? 'Todos os trabalhos' : PORTFOLIO_CATEGORIES.find(c => c.id === activeCategory)?.label} works`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
            ref={gridRef}
            style={{ height: `${Math.ceil(filteredWorks.length / colCount) * 320}px` }}
          >
            {filteredWorks.map((work, i) => {
              const col = i % colCount;
              const row = Math.floor(i / colCount);
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position: 'absolute',
                    top: `${row * 320}px`,
                    left: `${col * (100 / colCount)}%`,
                    width: `${100 / colCount}%`,
                    padding: '0 12px 24px',
                  }}
                >
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-[#111111] border border-white/10 cursor-pointer h-full"
                    onClick={() => openModal(work)}
                    onKeyDown={(e) => e.key === 'Enter' && openModal(work)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Ver ${work.title} em tamanho maior`}
                  >
<div className="relative aspect-[4/5] overflow-hidden h-full">
                       <SmartImage
                         src={work.src}
                         alt={work.title}
                         fill
                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                         unoptimized
                         className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115"
                       />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center gap-1 md:gap-2 mb-3">
                        <span className="w-3 md:w-4 h-3 md:h-4 text-orange-500" style={{ animation: 'pulse 2s infinite' }}>✦</span>
                        <span className="text-[10px] md:text-xs text-orange-400 font-bold uppercase tracking-wider">
                          {work.category}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm md:text-lg mb-6 leading-tight text-center">
                        {work.title}
                      </h3>
                      <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-orange-500 text-black flex items-center justify-center text-xs md:text-xl font-bold transform group-hover:rotate-12 transition-transform touch-target shadow-lg shadow-orange-500/30">
                        <span style={{ fontSize: '20px', lineHeight: 1 }}>+</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <ScrollReveal
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-xs sm:text-sm text-gray-500 font-mono tracking-widest">
            {filteredWorks.length} obras disponíveis
          </p>
        </ScrollReveal>
      </div>

      {/* Modal de obra */}
      {modalOpen && selectedWork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-spray"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors touch-target focus-ring"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
            <SmartImage
              src={selectedWork.src}
              alt={selectedWork.title}
              fill
              className="w-full h-auto object-cover"
              priority
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-transparent to-transparent">
              <h3 id="modal-title" className="text-xl md:text-2xl font-bold text-white mb-2">{selectedWork.title}</h3>
              <p className="text-gray-400 text-sm">{selectedWork.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}