import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const rawDir = join(root, 'data', 'ubigeo', '_raw');
const outDir = join(root, 'data', 'ubigeo');

const MINOR = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'e', 'en']);

function titleCase(value) {
  const words = value.trim().toLowerCase().split(/\s+/);
  return words
    .map((word, index) => {
      if (index > 0 && MINOR.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const source = text.replace(/\r/g, '');
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  const header = rows[0];
  return rows.slice(1).map((cells) => {
    const record = {};
    header.forEach((key, index) => {
      record[key] = cells[index];
    });
    return record;
  });
}

function round(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round(Number(value) * factor) / factor;
}

function build(file, codeLength, nameField) {
  const records = parseCsv(readFileSync(join(rawDir, file), 'utf8'));
  return records.map((record) => ({
    code: record.inei.slice(0, codeLength),
    name: titleCase(record[nameField]),
    capital: titleCase(record.capital),
    lat: round(record.latitude, 5),
    lng: round(record.longitude, 5),
  }));
}

const departments = build('ubigeo_departamento.csv', 2, 'departamento');
const provinces = build('ubigeo_provincia.csv', 4, 'provincia');
const districts = build('ubigeo_distrito.csv', 6, 'distrito');

writeFileSync(join(outDir, 'departments.json'), JSON.stringify(departments));
writeFileSync(join(outDir, 'provinces.json'), JSON.stringify(provinces));
writeFileSync(join(outDir, 'districts.json'), JSON.stringify(districts));

console.log(`departments ${departments.length}`);
console.log(`provinces   ${provinces.length}`);
console.log(`districts   ${districts.length}`);
