import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const LOGO_SOURCE = path.join(IMAGES_DIR, 'logo-trapp.png');

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function generateFavicons() {
  console.log('🎨 Gerando favicons a partir de logo-trapp...');
  
  // Use the highest quality source (logo-trapp.jpg)
  const sourcePath = path.join(IMAGES_DIR, 'logo-trapp.jpg');
  
  if (!fs.existsSync(sourcePath)) {
    console.error('❌ logo-trapp.jpg não encontrado');
    return;
  }

  const baseImage = sharp(sourcePath);

  // 1. favicon.ico (multi-res: 16x16, 32x32)
  await baseImage
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));
  console.log('✅ favicon-32x32.png');

  await baseImage
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-16x16.png'));
  console.log('✅ favicon-16x16.png');

  // 2. apple-touch-icon.png (180x180)
  await baseImage
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png');

  // 3. android-chrome-192x192.png
  await baseImage
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'));
  console.log('✅ android-chrome-192x192.png');

  // 4. android-chrome-512x512.png
  await baseImage
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'));
  console.log('✅ android-chrome-512x512.png');

  // 5. favicon.ico (use 32x32 PNG renamed - browsers accept PNG as .ico)
  await sharp(sourcePath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
  console.log('✅ favicon.ico');
}

async function generateOGImage() {
  console.log('\n🖼️  Gerando og-image.jpg (1200x630)...');
  
  const width = 1200;
  const height = 630;
  
  // Create SVG with logo + text + gradient background
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#030303"/>
          <stop offset="50%" stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#030303"/>
        </linearGradient>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ff6b00"/>
          <stop offset="50%" stop-color="#ff0066"/>
          <stop offset="100%" stop-color="#00d4ff"/>
        </linearGradient>
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff6b00" stop-opacity="0.15"/>
          <stop offset="70%" stop-color="#ff6b00" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#030303" stop-opacity="0"/>
        </radialGradient>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
        </filter>
      </defs>
      
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      <ellipse cx="600" cy="315" rx="400" ry="200" fill="url(#glowGradient)"/>
      <rect width="${width}" height="${height}" fill="url(#noise)" opacity="0.03"/>
      
      <g transform="translate(600, 220)">
        <circle r="80" fill="url(#brandGradient)" opacity="0.2"/>
        <circle r="70" fill="#030303"/>
        <circle r="60" fill="url(#brandGradient)"/>
        <text x="0" y="20" text-anchor="middle" font-family="Archivo Black, Arial Black, sans-serif" font-size="56" font-weight="700" fill="#030303">RT</text>
      </g>
      
      <text x="600" y="380" text-anchor="middle" font-family="Archivo Black, Arial Black, sans-serif" font-size="48" font-weight="700" fill="white" letter-spacing="-1">Ruan Trapp</text>
      <text x="600" y="440" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="22" font-weight="500" fill="url(#brandGradient)" letter-spacing="0.5">Artista Visual, Muralista e Tatuador</text>
      <text x="600" y="485" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="16" font-weight="400" fill="#a1a1aa" letter-spacing="2">Jaragua do Sul - SC</text>
      <rect x="500" y="520" width="200" height="3" rx="1.5" fill="url(#brandGradient)" opacity="0.6"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));
  
  console.log('✅ og-image.jpg (1200x630)');
}

async function generateManifest() {
  console.log('\n📱 Gerando site.webmanifest...');
  
  const manifest = {
    name: 'Ruan Trapp - Artista Visual, Muralista & Tatuador',
    short_name: 'Ruan Trapp',
    description: 'Graffiti, caligrafia gotica e calligraffiti de Jaragua do Sul (SC). Murais, telas e letreiros com a forca da arte de rua.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030303',
    theme_color: '#030303',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: ['art', 'design', 'photography'],
    screenshots: [],
    prefer_related_applications: false
  };
  
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2),
    { encoding: 'utf8' }
  );
  console.log('✅ site.webmanifest');
}

async function main() {
  console.log('🚀 Iniciando geração de assets de produção...\n');
  
  await ensureDir(PUBLIC_DIR);
  
  await generateFavicons();
  await generateOGImage();
  await generateManifest();
  
  console.log('\n✨ Todos os assets gerados com sucesso!');
  console.log('\n📋 Checklist:');
  console.log('  - favicon.ico (32x32 multi-res)');
  console.log('  - favicon-16x16.png');
  console.log('  - favicon-32x32.png');
  console.log('  - apple-touch-icon.png (180x180)');
  console.log('  - android-chrome-192x192.png');
  console.log('  - android-chrome-512x512.png');
  console.log('  - og-image.jpg (1200x630)');
  console.log('  - site.webmanifest');
}

main().catch(console.error);