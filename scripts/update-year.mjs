import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const year = new Date().getFullYear();

const files = ['README.md', 'README.es.md'];
const pattern = /(<!-- year:start -->)([\s\S]*?)(<!-- year:end -->)/g;

for (const file of files) {
  const path = join(root, file);
  const text = readFileSync(path, 'utf8');
  const updated = text.replace(pattern, `$1${year}$3`);
  writeFileSync(path, updated);
}

console.log(`stamped year ${year}`);
