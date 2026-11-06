export const SITE_CONFIG = {
  name: 'Ruan Trapp',
  title: 'Artista Visual, Muralista & Tatuador',
  description: 'Graffiti, caligrafia gótica e calligraffiti de Jaraguá do Sul (SC). Murais, telas e letreiros com a força da arte de rua.',
  url: 'https://ruantrapp.com',
  ogImage: '/og-image.jpg',
  location: 'Jaraguá do Sul, SC',
  yearStarted: 2018,
  yearPro: 2024,
};

export const NAV_LINKS = [
  { href: '#hero', label: 'Início' },
  { href: '#about', label: 'Quem Sou' },
  { href: '#caminho-das-artes', label: 'Caminho das Artes' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#processo', label: 'Processo' },
  { href: '#services', label: 'Serviços' },
  { href: '#contact', label: 'Contato' },
];

export const SOCIAL_LINKS = {
  whatsapp: {
    href: 'https://wa.me/554792242056',
    label: 'WhatsApp',
    ariaLabel: 'Falar no WhatsApp',
  },
  instagram: {
    href: 'https://www.instagram.com/ruantrapp/',
    label: 'Instagram',
    ariaLabel: 'Ver no Instagram',
  },
  email: {
    href: 'mailto:ruantrapp@email.com',
    label: 'Email',
    ariaLabel: 'Enviar email',
  },
};

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'TODOS', icon: 'layout' },
  { id: 'murals', label: 'MURAIS', icon: 'building' },
  { id: 'calligraphy', label: 'CALIGRAFIA', icon: 'image' },
  { id: 'canvas', label: 'TELAS', icon: 'image' },
  { id: 'studio', label: 'ESTÚDIO / TATTOO', icon: 'image' },
] as const;

export type Service = typeof SERVICES[number];

export const SERVICES = [
  {
    id: 'murals',
    title: 'Murais Exteriores',
    shortTitle: 'Murais',
    icon: 'spray-can',
    description: 'Paredes que falam. Murais de grande escala para espaços públicos e privados, transformando arquitetura em arte.',
    cta: 'Solicitar orçamento',
  },
  {
    id: 'lettering',
    title: 'Letreiros & Logos',
    shortTitle: 'Letreiros',
    icon: 'brush',
    description: 'Identidade na rua. Letreiros autorais, logos com personalidade e identidade visual para marcas que querem ser vistas.',
    cta: 'Ver exemplos',
  },
  {
    id: 'canvas',
    title: 'Telas & Quadros',
    shortTitle: 'Telas',
    icon: 'palette',
    description: 'Arte pra levar. Telas e obras emolduradas para colecionadores e amantes da arte de rua.',
    cta: 'Ver obras disponíveis',
  },
  {
    id: 'tattoo',
    title: 'Tatuagem',
    shortTitle: 'Tattoo',
    icon: 'needle',
    description: 'Pele vira muro. Tatuagens autorais com estética de graffiti e caligrafia gótica.',
    cta: 'Agendar consulta',
  },
  {
    id: 'workshops',
    title: 'Oficinas & Workshops',
    shortTitle: 'Oficinas',
    icon: 'graduation-cap',
    description: 'Ensinar a pintar. Oficinas de graffiti, caligrafia e calligraffiti para escolas, centros culturais e empresas.',
    cta: 'Contratar oficina',
  },
] as const;

export const PROCESS_STEPS = [
  {
    id: 1,
    title: 'RASCUNHO',
    shortDesc: 'Esboço inicial da letra ou figura na parede, definindo a composição e o traço base.',
    longDesc: 'Tudo começa no papel ou direto no muro. O rascunho define a estrutura, a composição e o ritmo da obra. É onde a ideia ganha forma.',
    images: [
      'processo-arte.jpg',
      'processo-caligra-tela.jpg',
    ],
  },
  {
    id: 2,
    title: 'TRAÇO',
    shortDesc: 'Definição das linhas e contornos da obra, dando estrutura ao desenho.',
    longDesc: 'O traço é a assinatura. Com spray ou pincel, as linhas ganham peso, direção e personalidade. É a estrutura que sustenta tudo.',
    images: [
      'processo-grafite-academia.jpg',
      'processo-tela-caligra.jpg',
    ],
  },
  {
    id: 3,
    title: 'PREENCHIMENTO',
    shortDesc: 'Aplicação de cores e spray na superfície, trazendo vida à obra.',
    longDesc: 'Cor, volume, luz. Camadas de spray constroem profundidade. Gradientes, sombras, brilhos — a obra respira.',
    images: [
      'processo-tucano-sinners.jpg',
      'processo-tucano-sinners2.jpg',
      'processo-tucano-sinners3.jpg',
    ],
  },
  {
    id: 4,
    title: 'ACABAMENTO',
    shortDesc: 'Detalhes finais, sombras, highlights e assinatura da obra.',
    longDesc: 'O toque final. Highlights que saltam, sombras que dão volume, a tag que assina. A obra está viva.',
    images: [
      'processo-caminho-artes.jpg',
      'processo-caminho-das-artes.jpg',
      'processo-caminho-das-artes3.jpg',
      'processo2-caminho-artes.jpg',
    ],
  },
] as const;

export const CAMINHO_DAS_ARTES_IMAGES = [
  {
    src: 'caminho-das-artes-principal.jpg',
    alt: 'Caminho das Artes - obra principal na galeria céu aberto',
    title: 'Obra Principal',
    desc: 'Mural criado para a galeria céu aberto do centro de Jaraguá do Sul',
  },
  {
    src: 'captacao-caminho-artes.jpg',
    alt: 'Captura do Caminho das Artes em andamento',
    title: 'Captura',
    desc: 'Registro do processo de criação na rua',
  },
  {
    src: 'ave-caminho-artes.jpg',
    alt: 'Detalhe da ave no Caminho das Artes',
    title: 'Ave',
    desc: 'Detalhe de caligrafia na intervenção urbana',
  },
  {
    src: 'processo-caminho-das-artes.jpg',
    alt: 'Processo de criação do Caminho das Artes',
    title: 'Processo',
    desc: 'Bastidores da intervenção',
  },
  {
    src: 'processo-caminho-das-artes3.jpg',
    alt: 'Etapa 3 do Caminho das Artes',
    title: 'Etapa 3',
    desc: 'Acabamento da obra na parede',
  },
  {
    src: 'processo2-caminho-artes.jpg',
    alt: 'Continuação do making-of do Caminho das Artes',
    title: 'Processo 2',
    desc: 'Continuação do making-of',
  },
] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DEFAULTS = {
  duration: {
    instant: 0,
    fast: 120,
    normal: 280,
    slow: 450,
    cinematic: 800,
    cinematicLong: 1200,
  },
  ease: {
    brand: 'var(--ease-brand)',
    spring: 'var(--ease-spring)',
    inOut: 'var(--ease-in-out)',
    out: 'var(--ease-out)',
    drawer: 'var(--ease-drawer)',
  },
  stagger: {
    base: 0.03,
    tight: 0.015,
    loose: 0.06,
  },
} as const;