import type { Metadata, Viewport } from 'next';
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ruan Trapp — Artista Visual, Muralista & Tatuador',
  description: 'Graffiti, caligrafia gótica e calligraffiti de Jaraguá do Sul (SC). Murais, telas e letreiros com a força da arte de rua.',
  keywords: ['Ruan Trapp', 'graffiti', 'caligrafia', 'calligraffiti', 'muralista', 'tatuador', 'Jaraguá do Sul', 'arte urbana', 'street art'],
  authors: [{ name: 'Ruan Trapp' }],
  creator: 'Ruan Trapp',
  publisher: 'Ruan Trapp',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ruantrapp.com',
    title: 'Ruan Trapp — Artista Visual, Muralista & Tatuador',
    description: 'Graffiti, caligrafia gótica e calligraffiti de Jaraguá do Sul (SC). Murais, telas e letreiros com a força da arte de rua.',
    siteName: 'Ruan Trapp Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ruan Trapp - Artista Visual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruan Trapp — Artista Visual',
    description: 'Graffiti, caligrafia gótica e calligraffiti de Jaraguá do Sul (SC).',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

// Variable Fonts via next/font/google (self-hosted in production, optimized)
const arquivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = [
    arquivoBlack.variable,
    spaceGrotesk.variable,
    jetbrainsMono.variable,
  ].join(' ');

  return (
    <html lang="pt-BR" className={`${fontVars} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ruan Trapp',
              jobTitle: ['Artista Visual', 'Muralista', 'Tatuador'],
              url: 'https://ruantrapp.com',
              sameAs: [
                'https://www.instagram.com/ruantrapp/',
                'https://wa.me/554792242056',
              ],
              knowsAbout: ['Graffiti', 'Caligrafia Gótica', 'Calligraffiti', 'Arte Urbana', 'Muralismo'],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Jaraguá do Sul',
                addressRegion: 'SC',
                addressCountry: 'BR',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}