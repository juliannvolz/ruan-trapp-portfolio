import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.join(process.cwd(), '..', 'ruantrappportfolio', 'IMAGENS-SITE');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images');

const SIZES = [
  { width: 640, suffix: 'w640' },
  { width: 750, suffix: 'w750' },
  { width: 1080, suffix: 'w1080' },
  { width: 1200, suffix: 'w1200' },
  { width: 1920, suffix: 'w1920' },
  { width: 2048, suffix: 'w2048' },
];

const QUALITY = {
  webp: 85,
  avif: 50,
};

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function generateBlurhash(imagePath) {
  const buffer = await sharp(imagePath)
    .resize(20, 20, { fit: 'inside' })
    .blur(10)
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

async function optimizeImage(inputPath, outputName) {
  await ensureDir(OUTPUT_DIR);

  const inputBuffer = fs.readFileSync(inputPath);
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  const blurhash = await generateBlurhash(inputPath);

  for (const size of SIZES) {
    if (metadata.width && metadata.width <= size.width) continue;

    await image
      .clone()
      .resize({ width: size.width, withoutEnlargement: true })
      .webp({ quality: QUALITY.webp })
      .toFile(path.join(OUTPUT_DIR, `${outputName}-${size.suffix}.webp`));

    await image
      .clone()
      .resize({ width: size.width, withoutEnlargement: true })
      .avif({ quality: QUALITY.avif })
      .toFile(path.join(OUTPUT_DIR, `${outputName}-${size.suffix}.avif`));
  }

  const maxWidth = Math.min(metadata.width || 1920, 1920);
  await image
    .clone()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY.webp })
    .toFile(path.join(OUTPUT_DIR, `${outputName}.webp`));

  await image
    .clone()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .avif({ quality: QUALITY.avif })
    .toFile(path.join(OUTPUT_DIR, `${outputName}.avif`));

  return {
    width: metadata.width,
    height: metadata.height,
    blurhash,
  };
}

async function main() {
  console.log('🚀 Iniciando otimização de imagens...\n');

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Diretório de origem não encontrado: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`📁 Encontrados ${files.length} arquivos para processar\n`);

  const results = [];

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const outputName = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    try {
      console.log(`⚙️  Processando: ${file}`);
      const result = await optimizeImage(inputPath, outputName);
      results.push({ file, outputName, ...result });
      console.log(`✅ Concluído: ${outputName}.webp + ${SIZES.length} tamanhos responsivos`);
    } catch (error) {
      console.error(`❌ Erro ao processar ${file}:`, error);
    }
  }

  const manifest = results.map(r => ({
    id: r.outputName,
    src: `/images/${r.outputName}.webp`,
    srcSet: SIZES
      .filter(s => r.width && r.width > s.width)
      .map(s => `/images/${r.outputName}-${s.suffix}.webp ${s.width}w`)
      .join(', '),
    width: r.width,
    height: r.height,
    blurhash: r.blurhash,
  }));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`\n🎉 Otimização concluída! ${results.length} imagens processadas.`);
  console.log(`📄 Manifest salvo em: ${path.join(OUTPUT_DIR, 'manifest.json')}`);
}

main().catch(console.error);