import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import heicConvert from 'heic-convert';

const SOURCE_DIR = path.join(process.cwd(), '..', 'ruantrappportfolio', 'IMAGENS-SITE');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images');

const HEIC_FILES = [
  'tucano-sinners1.HEIC',
  'tucano-sinner2.HEIC',
];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function convertHeicToJpg(inputPath, outputPath) {
  try {
    const inputBuffer = fs.readFileSync(inputPath);
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.9,
    });
    fs.writeFileSync(outputPath, outputBuffer);
    console.log(`✅ Convertido via heic-convert: ${path.basename(inputPath)}`);
  } catch (e) {
    try {
      execSync(`magick "${inputPath}" -quality 90 "${outputPath}"`, { stdio: 'ignore' });
      console.log(`✅ Convertido via ImageMagick: ${path.basename(inputPath)}`);
    } catch (e2) {
      try {
        execSync(`sips -s format jpeg -s formatOptions 90 "${inputPath}" --out "${outputPath}"`, { stdio: 'ignore' });
        console.log(`✅ Convertido via sips: ${path.basename(inputPath)}`);
      } catch (e3) {
        throw new Error(`Falha ao converter ${inputPath}: ${e3}`);
      }
    }
  }
}

async function main() {
  console.log('🔄 Convertendo arquivos HEIC...\n');

  await ensureDir(OUTPUT_DIR);

  for (const file of HEIC_FILES) {
    const inputPath = path.join(SOURCE_DIR, file);
    const outputName = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const outputPath = path.join(OUTPUT_DIR, `${outputName}.jpg`);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Arquivo não encontrado: ${file}`);
      continue;
    }

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Já convertido: ${file}`);
      continue;
    }

    try {
      console.log(`⚙️  Convertendo: ${file}`);
      await convertHeicToJpg(inputPath, outputPath);
    } catch (error) {
      console.error(`❌ Erro ao converter ${file}:`, error);
    }
  }

  console.log('\n✅ Conversão HEIC concluída!');
}

main().catch(console.error);