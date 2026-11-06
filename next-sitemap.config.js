/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://ruantrapp.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://ruantrapp.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async () => [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/#about', changefreq: 'monthly', priority: 0.8 },
    { loc: '/#caminho-das-artes', changefreq: 'monthly', priority: 0.8 },
    { loc: '/#portfolio', changefreq: 'weekly', priority: 0.9 },
    { loc: '/#processo', changefreq: 'monthly', priority: 0.7 },
    { loc: '/#services', changefreq: 'monthly', priority: 0.8 },
    { loc: '/#contact', changefreq: 'monthly', priority: 0.7 },
  ],
};

export default config;