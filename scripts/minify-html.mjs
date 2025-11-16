import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcPath = join(__dirname, '..', 'src', 'index.html');
const destPath = join(__dirname, '..', 'index.html');

const rawHtml = readFileSync(srcPath, 'utf8');
const withoutComments = rawHtml.replace(/<!--[^]*?-->/g, '');
const minified = withoutComments
  .replace(/\s{2,}/g, ' ')
  .replace(/>\s+</g, '><')
  .replace(/\n/g, '')
  .trim();

writeFileSync(destPath, minified);
console.log(`Arquivo minificado gerado em ${destPath}`);
