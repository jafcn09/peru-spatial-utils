import * as PSU from '../../packages/typescript/dist/src/index.js';

const icons = {
  district: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  province: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></svg>',
  region: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></svg>',
  ubigeo: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>',
  crs: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="4"/></svg>',
  area: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7v7H3zM14 14h7v7h-7z"/><path d="M10 6h4a4 4 0 0 1 4 4v4"/></svg>',
  distance: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><path d="M7 17 17 7"/></svg>',
  bbox: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"/></svg>',
  territory: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4-8 4-8-4 8-4Z"/><path d="M4 11l8 4 8-4M4 15l8 4 8-4"/></svg>',
  chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
};

const FEATURES = [
  { id: 'ubigeo', icon: icons.ubigeo },
  { id: 'crs', icon: icons.crs },
  { id: 'area', icon: icons.area },
  { id: 'distance', icon: icons.distance },
  { id: 'bbox', icon: icons.bbox },
  { id: 'territorial', icon: icons.territory },
];

const API = [
  { id: 'getRegion', sig: 'getRegion(code)', tag: 'ubigeo', ex: 'getRegion("24").name  ->  "Tumbes"' },
  { id: 'getProvince', sig: 'getProvince(code)', tag: 'ubigeo', ex: 'getProvince("2402").name  ->  "Contralmirante Villar"' },
  { id: 'getDistrict', sig: 'getDistrict(code)', tag: 'ubigeo', ex: 'getDistrict("240203").name  ->  "Canoas de Punta Sal"' },
  { id: 'isValidUbigeo', sig: 'isValidUbigeo(code)', tag: 'ubigeo', ex: 'isValidUbigeo("240203")  ->  true' },
  { id: 'toUTM', sig: 'toUTM(lat, lng)', tag: 'crs', ex: 'toUTM(-3.683, -80.451)  ->  { zone: 17, easting: 560966, northing: 9592893 }' },
  { id: 'toWGS84', sig: 'toWGS84(easting, northing, zone)', tag: 'crs', ex: 'toWGS84(560966, 9592893, 17)  ->  { lat: -3.683, lng: -80.451 }' },
  { id: 'formatArea', sig: 'formatArea(m2)', tag: 'area', ex: 'formatArea(467443.66)  ->  "467,443.66 m² (46.74 ha)"' },
  { id: 'distance', sig: 'distance(a, b)', tag: 'distance', ex: 'distance([-80.451,-3.683], [-80.320,-3.561])  ->  19.8839' },
  { id: 'boundingBox', sig: 'boundingBox(geojson)', tag: 'bbox', ex: 'boundingBox(geojson)  ->  { minX, minY, maxX, maxY }' },
  { id: 'calculateTerritorialRisk', sig: 'calculateTerritorialRisk(intersections)', tag: 'territorial', ex: 'calculateTerritorialRisk(items)  ->  { risk: "MEDIO", score: 54 }' },
];

const I18N = {
  es: {
    'nav.skip': 'Saltar al contenido', 'nav.demo': 'Demo', 'nav.install': 'Instalacion', 'nav.api': 'API', 'nav.help': 'Ayuda',
    'hero.eyebrow': 'Open source · MIT',
    'hero.title': 'Construye aplicaciones geoespaciales para Perú desde cualquier lenguaje.',
    'hero.lead': 'Ubigeos INEI, conversión UTM/WGS84, coordenadas, áreas, distancias y análisis territorial.'
+ ' Ligera, sin dependencias y disponible para TypeScript, Python, Dart, Go, Java, Rust y C.',
    'hero.try': 'Probar la demo', 'hero.install': 'Comenzar', 'badge.langs': 'Multilenguaje',
    'demo.eyebrow': 'Ejemplo en tiempo real', 'demo.title': 'Escribe un ubigeo y obtén el territorio',
    'demo.sub': 'La consulta corre en tu navegador con la libreria real, sin enviar nada a un servidor.',
    'demo.label': 'Codigo de ubigeo (INEI)', 'demo.hint': '2 digitos = departamento, 4 = provincia, 6 = distrito.',
    'demo.hintLen': 'Ingresa 2, 4 o 6 digitos.', 'demo.hintNotFound': 'Ese ubigeo no existe en el dataset INEI.',
    'demo.waiting': 'Esperando un codigo valido...', 'demo.none': 'Sin coincidencias.',
    'res.district': 'Distrito', 'res.province': 'Provincia', 'res.department': 'Departamento', 'res.coords': 'Coordenadas',
    'install.eyebrow': 'Instalacion', 'install.title': 'Un paquete por ecosistema', 'install.sub': 'Misma API, mismos resultados. Elige tu lenguaje y copia.',
    'copy': 'Copiar', 'copied': 'Copiado',
    'features.eyebrow': 'Modulos', 'features.title': 'Todo lo esencial para geodatos del Peru',
    'api.eyebrow': 'Documentacion de la API', 'api.title': 'Funciones y firmas', 'api.sub': 'Nombres en camelCase; cada lenguaje adapta su convencion idiomatica.',
    'footer.tagline': 'Utilidades geoespaciales del Peru, open source bajo licencia MIT.',
    'footer.packages': 'Paquetes', 'footer.resources': 'Recursos', 'footer.legal': 'Legal', 'footer.docs': 'Documentacion',
    'footer.help': 'Ayuda', 'footer.security': 'Politica de seguridad', 'footer.cookies': 'Cookies', 'footer.dataset': 'Datos de ubigeo: INEI',
    'cookie.text': 'Usamos almacenamiento local solo para recordar tu preferencia de cookies. No hay rastreo ni anuncios. <a href="cookies.html" style="color:var(--accent-strong);font-weight:600">Mas informacion</a>.',
    'cookie.reject': 'Rechazar', 'cookie.accept': 'Aceptar',
    features: {
      ubigeo: { title: 'Ubigeos', text: 'getRegion, getProvince, getDistrict, isValidUbigeo y busqueda sobre el dataset INEI completo: 25 departamentos, 196 provincias y 1893 distritos.' },
      crs: { title: 'Coordenadas', text: 'toUTM y toWGS84 con datum WGS84 explicito para las zonas UTM 17S, 18S y 19S del Peru.' },
      area: { title: 'Areas', text: 'toHectares, toKm2 y formatArea para presentar superficies con separador de miles y unidades legibles.' },
      distance: { title: 'Distancia', text: 'distance entre dos puntos [lng, lat] usando la formula haversine, en kilometros.' },
      bbox: { title: 'Bounding box', text: 'boundingBox sobre cualquier geometria GeoJSON: recorre todas las coordenadas.' },
      territorial: { title: 'Territorial', text: 'recommendationFor, classifyHazard y calculateTerritorialRisk: heuristicas documentadas, solo de referencia.' },
    },
    api: {
      getRegion: 'Devuelve el departamento para un codigo de 2 digitos.',
      getProvince: 'Devuelve la provincia para un codigo de 4 digitos.',
      getDistrict: 'Devuelve el distrito para un codigo de 6 digitos.',
      isValidUbigeo: 'Indica si el codigo (2, 4 o 6 digitos) existe en su nivel.',
      toUTM: 'Convierte WGS84 a UTM (zona 17S, 18S o 19S) sobre el datum WGS84.',
      toWGS84: 'Convierte UTM de vuelta a coordenadas geograficas WGS84.',
      formatArea: 'Formatea una superficie en metros cuadrados a una cadena legible.',
      distance: 'Distancia haversine en kilometros entre dos puntos [lng, lat].',
      boundingBox: 'Caja envolvente de una geometria GeoJSON.',
      calculateTerritorialRisk: 'Heuristica de riesgo a partir de intersecciones; solo referencia.',
    },
  },
  en: {
    'nav.skip': 'Skip to content', 'nav.demo': 'Demo', 'nav.install': 'Install', 'nav.api': 'API', 'nav.help': 'Help',
    'hero.eyebrow': 'Open source · MIT',
    'hero.title': 'Peru spatial data, in any language',
    'hero.lead': 'INEI ubigeos, UTM/WGS84 conversion, area, distance, bounding box and territorial analysis. Lightweight, dependency-free and verified against the same vectors in TypeScript, Python, Dart, Go, Java, Rust and C.',
    'hero.try': 'Try the demo', 'hero.install': 'How to install', 'badge.langs': '7 languages',
    'demo.eyebrow': 'Live example', 'demo.title': 'Type a ubigeo and get the territory',
    'demo.sub': 'The lookup runs in your browser with the real library, nothing is sent to a server.',
    'demo.label': 'Ubigeo code (INEI)', 'demo.hint': '2 digits = department, 4 = province, 6 = district.',
    'demo.hintLen': 'Enter 2, 4 or 6 digits.', 'demo.hintNotFound': 'That ubigeo does not exist in the INEI dataset.',
    'demo.waiting': 'Waiting for a valid code...', 'demo.none': 'No matches.',
    'res.district': 'District', 'res.province': 'Province', 'res.department': 'Department', 'res.coords': 'Coordinates',
    'install.eyebrow': 'Install', 'install.title': 'One package per ecosystem', 'install.sub': 'Same API, same results. Pick your language and copy.',
    'copy': 'Copy', 'copied': 'Copied',
    'features.eyebrow': 'Modules', 'features.title': 'Everything you need for Peru geodata',
    'api.eyebrow': 'API documentation', 'api.title': 'Functions and signatures', 'api.sub': 'camelCase names; each language adapts its idiomatic convention.',
    'footer.tagline': 'Geospatial utilities for Peru, open source under the MIT license.',
    'footer.packages': 'Packages', 'footer.resources': 'Resources', 'footer.legal': 'Legal', 'footer.docs': 'Documentation',
    'footer.help': 'Help', 'footer.security': 'Security policy', 'footer.cookies': 'Cookies', 'footer.dataset': 'Ubigeo data: INEI',
    'cookie.text': 'We use local storage only to remember your cookie choice. No tracking, no ads. <a href="cookies.html" style="color:var(--accent-strong);font-weight:600">Learn more</a>.',
    'cookie.reject': 'Reject', 'cookie.accept': 'Accept',
    features: {
      ubigeo: { title: 'Ubigeos', text: 'getRegion, getProvince, getDistrict, isValidUbigeo and search over the full INEI dataset: 25 departments, 196 provinces and 1893 districts.' },
      crs: { title: 'Coordinates', text: 'toUTM and toWGS84 with an explicit WGS84 datum for Peru UTM zones 17S, 18S and 19S.' },
      area: { title: 'Areas', text: 'toHectares, toKm2 and formatArea to present surfaces with thousands separators and readable units.' },
      distance: { title: 'Distance', text: 'distance between two [lng, lat] points using the haversine formula, in kilometers.' },
      bbox: { title: 'Bounding box', text: 'boundingBox over any GeoJSON geometry: it scans every coordinate.' },
      territorial: { title: 'Territorial', text: 'recommendationFor, classifyHazard and calculateTerritorialRisk: documented heuristics, guidance only.' },
    },
    api: {
      getRegion: 'Returns the department for a 2-digit code.',
      getProvince: 'Returns the province for a 4-digit code.',
      getDistrict: 'Returns the district for a 6-digit code.',
      isValidUbigeo: 'Tells whether the code (2, 4 or 6 digits) exists at its level.',
      toUTM: 'Converts WGS84 to UTM (zone 17S, 18S or 19S) on the WGS84 datum.',
      toWGS84: 'Converts UTM back to WGS84 geographic coordinates.',
      formatArea: 'Formats a surface in square meters into a readable string.',
      distance: 'Haversine distance in kilometers between two [lng, lat] points.',
      boundingBox: 'Bounding box of a GeoJSON geometry.',
      calculateTerritorialRisk: 'Risk heuristic from intersections; guidance only.',
    },
  },
};

let lang = (document.documentElement.getAttribute('lang') === 'en') ? 'en' : 'es';
const dict = () => I18N[lang];

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function applyStatic() {
  const d = dict();
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (d[key] != null) node.textContent = d[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((node) => {
    const key = node.getAttribute('data-i18n-html');
    if (d[key] != null) node.innerHTML = d[key];
  });
  document.documentElement.setAttribute('lang', lang);
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
}

function renderFeatures() {
  const host = document.getElementById('features');
  if (!host) return;
  host.innerHTML = '';
  const d = dict();
  FEATURES.forEach((f, i) => {
    host.appendChild(el(`<article class="feature reveal is-visible" data-delay="${i % 3}">
      <div class="feature-icon">${f.icon}</div>
      <h3>${d.features[f.id].title}</h3>
      <p>${d.features[f.id].text}</p>
    </article>`));
  });
}

function renderApi() {
  const host = document.getElementById('apiList');
  if (!host) return;
  host.innerHTML = '';
  const d = dict();
  API.forEach((a, i) => {
    host.appendChild(el(`<details class="api-item reveal is-visible" data-delay="${i % 3}">
      <summary class="api-summary">
        <span class="mono">${a.sig}</span>
        <span style="display:flex;align-items:center;gap:12px">
          <span class="api-tag">${a.tag}</span>
          <span class="chev">${icons.chev}</span>
        </span>
      </summary>
      <div class="api-body">
        <p>${d.api[a.id]}</p>
        <div class="codeblock"><pre>${a.ex}</pre></div>
      </div>
    </details>`));
  });
}

function resultRow(iconKey, key, value) {
  return `<div class="result-row">
    <span class="result-icon">${icons[iconKey]}</span>
    <span><span class="result-key">${key}</span><br><span class="result-val">${value}</span></span>
  </div>`;
}

function renderResult(raw) {
  const list = document.getElementById('result');
  const extra = document.getElementById('resultExtra');
  const hint = document.getElementById('ubigeoHint');
  const d = dict();
  const code = (raw || '').replace(/\D/g, '');
  list.innerHTML = '';
  extra.innerHTML = '';

  if (code.length !== 2 && code.length !== 4 && code.length !== 6) {
    hint.textContent = d['demo.hintLen'];
    hint.removeAttribute('data-state');
    list.innerHTML = `<p class="result-empty">${d['demo.waiting']}</p>`;
    return;
  }
  if (!PSU.isValidUbigeo(code)) {
    hint.textContent = d['demo.hintNotFound'];
    hint.setAttribute('data-state', 'error');
    list.innerHTML = `<p class="result-empty">${d['demo.none']}</p>`;
    return;
  }

  hint.textContent = d['demo.hint'];
  hint.removeAttribute('data-state');

  const region = PSU.getRegion(code.slice(0, 2));
  const province = code.length >= 4 ? PSU.getProvince(code.slice(0, 4)) : null;
  const district = code.length === 6 ? PSU.getDistrict(code) : null;

  let html = '';
  if (district) html += resultRow('district', d['res.district'], district.name);
  if (province) html += resultRow('province', d['res.province'], province.name);
  if (region) html += resultRow('region', d['res.department'], region.name);
  list.innerHTML = html;
  list.querySelectorAll('.result-row').forEach((r, i) => setTimeout(() => r.classList.add('show'), i * 90));

  const target = district || province || region;
  if (target && typeof target.lat === 'number' && typeof target.lng === 'number') {
    const utm = PSU.toUTM(target.lat, target.lng);
    extra.innerHTML = `
      <div class="stat"><span class="result-key">${d['res.coords']}</span><span class="stat-val">${target.lat.toFixed(4)}, ${target.lng.toFixed(4)}</span></div>
      <div class="stat"><span class="result-key">UTM ${utm.zone}${utm.hemisphere}</span><span class="stat-val">${utm.easting}E ${utm.northing}N</span></div>`;
  }
}

function setupDemo() {
  const input = document.getElementById('ubigeo');
  if (!input) return;
  const run = () => renderResult(input.value);
  input.addEventListener('input', run);
  document.querySelectorAll('.chip').forEach((chip) => chip.addEventListener('click', () => {
    input.value = chip.dataset.code;
    run();
    input.focus();
  }));
  return run;
}

function setupTabs() {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      panel.classList.toggle('active', active);
      if (active) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });
  }));
}

function setupCopy() {
  document.querySelectorAll('.copy-btn').forEach((btn) => btn.addEventListener('click', async () => {
    const code = btn.parentElement.querySelector('pre').textContent;
    try {
      await navigator.clipboard.writeText(code);
      btn.textContent = dict()['copied'];
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = dict()['copy']; btn.classList.remove('copied'); }, 1800);
    } catch (e) {
      btn.textContent = '!';
    }
  }));
}

function setupNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((i) => i.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((i) => obs.observe(i));
}

function setupTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('psu-theme', next); } catch (e) {}
  });
}

function setupCookies() {
  const banner = document.getElementById('cookie');
  if (!banner) return;
  let stored = null;
  try { stored = localStorage.getItem('psu-cookie'); } catch (e) { stored = 'skip'; }
  if (!stored) setTimeout(() => banner.classList.add('show'), 900);
  const close = (value) => {
    try { localStorage.setItem('psu-cookie', value); } catch (e) {}
    banner.classList.remove('show');
  };
  document.getElementById('cookieAccept').addEventListener('click', () => close('accepted'));
  document.getElementById('cookieReject').addEventListener('click', () => close('rejected'));
}

function setupLang(runDemo) {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('psu-lang', lang); } catch (e) {}
    applyStatic();
    renderFeatures();
    renderApi();
    if (runDemo) runDemo();
  });
}

function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
}

applyStatic();
renderFeatures();
renderApi();
const runDemo = setupDemo();
setupTabs();
setupCopy();
setupNav();
setupReveal();
setupTheme();
setupLang(runDemo);
setupCookies();
setYear();
