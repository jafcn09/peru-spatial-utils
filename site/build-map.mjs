import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const src = join(homedir(), 'Documents/platform-geoespacial/front/src/assets/geo/peru-departamentos.geojson');
const geo = JSON.parse(readFileSync(src, 'utf8'));

const W = 560;
const MIN_STEP = 0.55;

let minLon = Infinity;
let maxLon = -Infinity;
let minLat = Infinity;
let maxLat = -Infinity;

function eachRing(feature, fn) {
  const g = feature.geometry;
  if (g.type === 'Polygon') g.coordinates.forEach(fn);
  else if (g.type === 'MultiPolygon') g.coordinates.forEach((poly) => poly.forEach(fn));
}

geo.features.forEach((f) => eachRing(f, (ring) => ring.forEach(([lon, lat]) => {
  if (lon < minLon) minLon = lon;
  if (lon > maxLon) maxLon = lon;
  if (lat < minLat) minLat = lat;
  if (lat > maxLat) maxLat = lat;
})));

const midLat = (minLat + maxLat) / 2;
const kx = Math.cos((midLat * Math.PI) / 180);
const spanX = (maxLon - minLon) * kx;
const spanY = maxLat - minLat;
const scale = W / spanX;
const H = Math.round(spanY * scale);

const px = (lon) => Math.round((lon - minLon) * kx * scale * 10) / 10;
const py = (lat) => Math.round((maxLat - lat) * scale * 10) / 10;

function ringPath(ring) {
  const pts = [];
  let last = null;
  for (let i = 0; i < ring.length; i += 1) {
    const x = px(ring[i][0]);
    const y = py(ring[i][1]);
    const isLast = i === ring.length - 1;
    if (!last || isLast || Math.hypot(x - last[0], y - last[1]) >= MIN_STEP) {
      pts.push([x, y]);
      last = [x, y];
    }
  }
  if (pts.length < 3) return '';
  return 'M' + pts.map((p) => `${p[0]} ${p[1]}`).join('L') + 'Z';
}

const MINOR = new Set(['de', 'del', 'la', 'las', 'los', 'y']);
function titleCase(value) {
  return value.trim().toLowerCase().split(/\s+/)
    .map((w, i) => (i > 0 && MINOR.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

const r3 = (n) => Math.round(n * 1000) / 1000;

const depts = geo.features
  .map((f) => {
    let d = '';
    let bx0 = Infinity;
    let by0 = Infinity;
    let bx1 = -Infinity;
    let by1 = -Infinity;
    eachRing(f, (ring) => {
      d += ringPath(ring);
      ring.forEach(([lon, lat]) => {
        if (lon < bx0) bx0 = lon;
        if (lon > bx1) bx1 = lon;
        if (lat < by0) by0 = lat;
        if (lat > by1) by1 = lat;
      });
    });
    return {
      code: f.properties.CCDD,
      name: titleCase(f.properties.NOMBDEP),
      d,
      bbox: [r3(bx0), r3(by0), r3(bx1), r3(by1)],
    };
  })
  .filter((x) => x.d)
  .sort((a, b) => a.code.localeCompare(b.code));

const out = `export const PERU_MAP = ${JSON.stringify({ viewBox: `0 0 ${W} ${H}`, depts })};\n`;
writeFileSync(join(homedir(), 'Documents/peru-spatial-utils/site/src/peru-map-data.js'), out);
console.log(`viewBox 0 0 ${W} ${H}, depts ${depts.length}, bytes ${out.length}`);
