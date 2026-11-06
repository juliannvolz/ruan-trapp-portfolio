import fs from 'fs';
import path from 'path';
import https from 'https';

const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

const FONTS = [
  {
    name: 'ArchivoBlack-VF.woff2',
    url: 'https://fonts.gstatic.com/s/archivoblack/v12/V8mCoQVQ3YlQJ29BJq7-9SRBGfC07kM.woff2',
  },
  {
    name: 'SpaceGrotesk-VF.woff2',
    url: 'https://fonts.gstatic.com/s/spacegrotesk/v19/VdGPAYm1i0E4he5vfUztLAQ.woff2',
  },
  {
    name: 'JetBrainsMono-VF.woff2',
    url: 'https://fonts.gstatic.com/s/jetbrainsmono/v23/tDbY2o-flEEny0FZhsf21G2QK5Y.woff2',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔤 Baixando fontes variáveis...\n');

  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
  }

  for (const font of FONTS) {
    const dest = path.join(FONTS_DIR, font.name);
    if (fs.existsSync(dest)) {
      console.log(`⏭️  Já existe: ${font.name}`);
      continue;
    }
    try {
      console.log(`⬇️  Baixando: ${font.name}`);
      await downloadFile(font.url, dest);
      console.log(`✅ Baixado: ${font.name}`);
    } catch (error) {
      console.error(`❌ Erro ao baixar ${font.name}:`, error);
    }
  }

  console.log('\n✅ Download de fontes concluído!');
}

main().catch(console.error);