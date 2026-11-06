export interface ImageManifest {
  id: string;
  src: string;
  alt: string;
  category: 'logo' | 'bio' | 'caminho-das-artes' | 'mural' | 'calligraphy' | 'canvas' | 'studio' | 'process' | 'tattoo';
  width?: number;
  height?: number;
  priority?: boolean;
  needsConversion?: boolean;
  blurhash?: string;
}

export const IMAGES_MANIFEST: ImageManifest[] = [
  // Logos
  { id: 'logo-trapp', src: '/images/logo-trapp.webp', alt: 'Logo Ruan Trapp', category: 'logo', priority: true },
  { id: 'logo-tipo2', src: '/images/logo-tipo2.webp', alt: 'Logo tipo 2 Ruan Trapp', category: 'logo' },
  { id: 'logo3', src: '/images/logo3.webp', alt: 'Logo 3 Ruan Trapp', category: 'logo' },
  { id: 'logo3-1', src: '/images/logo3-1.webp', alt: 'Logo 3.1 Ruan Trapp', category: 'logo' },
  { id: 'logo4', src: '/images/logo4.webp', alt: 'Logo 4 Ruan Trapp', category: 'logo' },

  // Bio / Retrato
  { id: 'bio-portrait', src: '/images/ruan-trapp3x4.webp', alt: 'Foto de Ruan Trapp - artista visual muralista tatuador', category: 'bio', priority: true },

  // Caminho das Artes
  { id: 'caminho-principal', src: '/images/caminho-das-artes-principal.webp', alt: 'Caminho das Artes - obra principal na galeria céu aberto de Jaraguá do Sul', category: 'caminho-das-artes' },
  { id: 'caminho-captacao', src: '/images/captacao-caminho-artes.webp', alt: 'Caminho das Artes - captura do processo de criação na rua', category: 'caminho-das-artes' },
  { id: 'caminho-ave', src: '/images/ave-caminho-artes.webp', alt: 'Caminho das Artes - detalhe de ave em caligrafia', category: 'caminho-das-artes' },
  { id: 'caminho-processo1', src: '/images/processo-caminho-artes.webp', alt: 'Caminho das Artes - processo 1', category: 'process' },
  { id: 'caminho-processo2', src: '/images/processo-caminho-das-artes.webp', alt: 'Caminho das Artes - processo 2', category: 'process' },
  { id: 'caminho-processo3', src: '/images/processo-caminho-das-artes3.webp', alt: 'Caminho das Artes - processo 3', category: 'process' },
  { id: 'caminho-processo4', src: '/images/processo2-caminho-artes.webp', alt: 'Caminho das Artes - processo 4', category: 'process' },

  // Murais / Grafite
  { id: 'mural-academia', src: '/images/grafite-academia.webp', alt: 'Mural grafite academia - letras grandes em estilo graffiti', category: 'mural' },
  { id: 'mural-escrita', src: '/images/grafite-escrita.webp', alt: 'Mural grafite escrita - lettering autoral', category: 'mural' },
  { id: 'mural-estudio', src: '/images/grafite-estudio.webp', alt: 'Mural grafite estúdio - intervenção em espaço interno', category: 'mural' },
  { id: 'mural-studio3', src: '/images/grafite-studio3.webp', alt: 'Mural grafite estúdio 3 - detalhe', category: 'mural' },
  { id: 'mural-parede-azul', src: '/images/caligra-parede-azul.webp', alt: 'Caligrafia em parede azul - calligraffiti', category: 'mural' },
  { id: 'mural-parede-azul2', src: '/images/caligra-parede-azul2.webp', alt: 'Caligrafia em parede azul 2 - detalhe', category: 'mural' },
  { id: 'mural-parede-branca', src: '/images/caligra-parede-branca.webp', alt: 'Caligrafia em parede branca - lettering', category: 'mural' },
  { id: 'mural-quadro-caligrafite', src: '/images/quadro-parede-caligrafite.webp', alt: 'Quadro parede caligrafite - obra em tela', category: 'canvas' },
  { id: 'mural-quadro-caligrafrite', src: '/images/quadro-parede-caligrafrite.webp', alt: 'Quadro parede caligrafrite - obra em tela', category: 'canvas' },

  // Caligrafia / Calligraffiti
  { id: 'calligra-grafite', src: '/images/caligra-grafite.webp', alt: 'Caligrafia grafite - fusão de caligrafia gótica e graffiti', category: 'calligraphy' },
  { id: 'calligra-cliente-pronto', src: '/images/caligra-cliente-pronto.webp', alt: 'Caligrafia cliente pronto - trabalho encomendado', category: 'calligraphy' },
  { id: 'calligra-abstrato', src: '/images/caligrafite-abstrato.webp', alt: 'Caligrafia abstrata - exploração formal', category: 'calligraphy' },
  { id: 'calligra-cliente', src: '/images/caligrafite-cliente.webp', alt: 'Caligrafia cliente - encomenda personalizada', category: 'calligraphy' },
  { id: 'calligra-studio', src: '/images/caligrafite-studio.webp', alt: 'Caligrafia estúdio - trabalho em ambiente controlado', category: 'studio' },
  { id: 'calligra-studio-tattoo', src: '/images/caligrafite-studio-tattoo.webp', alt: 'Caligrafia estúdio tattoo - design para tatuagem', category: 'tattoo' },
  { id: 'calligra-cliente-escada', src: '/images/cliente-piolho-caligra-escada.webp', alt: 'Caligrafia cliente piolho escada - lettering vertical', category: 'calligraphy' },

  // Telas
  { id: 'canvas-tela-caligra', src: '/images/processo-tela-caligra.webp', alt: 'Tela caligrafia processo - obra em andamento', category: 'canvas' },

  // Processo - Tucano Sinners
  { id: 'process-tucano1', src: '/images/tucano-sinners1.webp', alt: 'Processo tucano sinners 1 - esboço inicial', category: 'process', needsConversion: true },
  { id: 'process-tucano2', src: '/images/tucano-sinner2.webp', alt: 'Processo tucano sinners 2 - desenvolvimento', category: 'process', needsConversion: true },
  { id: 'process-tucano-sinners', src: '/images/processo-tucano-sinners.webp', alt: 'Processo tucano sinners - mural completo', category: 'process' },
  { id: 'process-tucano-sinners2', src: '/images/processo-tucano-sinners2.webp', alt: 'Processo tucano sinners 2 - detalhe', category: 'process' },
  { id: 'process-tucano-sinners3', src: '/images/processo-tucano-sinners3.webp', alt: 'Processo tucano sinners 3 - finalização', category: 'process' },

  // Processo - Outros
  { id: 'process-arte', src: '/images/processo-arte.webp', alt: 'Processo arte - rascunho inicial', category: 'process' },
  { id: 'process-caligra-tela', src: '/images/processo-caligra-tela.webp', alt: 'Processo caligrafia tela - desenvolvimento', category: 'process' },
  { id: 'process-grafite-academia', src: '/images/processo-grafite-academia.webp', alt: 'Processo grafite academia - traço', category: 'process' },
  { id: 'process-tela-caligra', src: '/images/processo-tela-caligra.webp', alt: 'Processo tela caligrafia - preenchimento', category: 'process' },

  // Estúdio / Tattoo
  { id: 'studio-tattoo', src: '/images/caligrafite-studio-tattoo.webp', alt: 'Estúdio tattoo - ambiente de trabalho', category: 'studio' },
];

export function getImageById(id: string): ImageManifest | undefined {
  return IMAGES_MANIFEST.find((img) => img.id === id);
}

export function getImagesByCategory(category: ImageManifest['category']): ImageManifest[] {
  return IMAGES_MANIFEST.filter((img) => img.category === category);
}

export function getImagesNeedingConversion(): ImageManifest[] {
  return IMAGES_MANIFEST.filter((img) => img.needsConversion);
}

export function getPriorityImages(): ImageManifest[] {
  return IMAGES_MANIFEST.filter((img) => img.priority);
}

export function getImageSrc(id: string): string {
  const img = getImageById(id);
  return img?.src || '/images/placeholder.webp';
}

export function getImageAlt(id: string): string {
  const img = getImageById(id);
  return img?.alt || 'Imagem do portfólio Ruan Trapp';
}