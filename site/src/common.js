const I18N = {
  es: {
    'nav.demo': 'Demo', 'nav.api': 'API', 'nav.help': 'Ayuda', 'nav.security': 'Seguridad', 'nav.cookies': 'Cookies',
    'back': 'Volver al inicio',
    'foot.help': 'Ayuda', 'foot.security': 'Seguridad', 'foot.cookies': 'Cookies',
    'ayuda.title': 'Ayuda',
    'ayuda.sub': 'Guia rapida de instalacion, uso y preguntas frecuentes.',
    'ayuda.body': `
      <h2>Instalacion</h2>
      <p>Elige el paquete de tu ecosistema:</p>
      <ul>
        <li><strong>npm:</strong> <span class="mono">npm install @coderesolutions/peru-spatial-utils</span></li>
        <li><strong>pub.dev:</strong> <span class="mono">peru_spatial_utils: ^0.1.0</span></li>
        <li><strong>Maven:</strong> <span class="mono">io.github.jafcn09:peru-spatial-utils:0.1.0</span></li>
      </ul>
      <h2>Uso basico</h2>
      <p>La API es la misma en todos los lenguajes. Un ejemplo en TypeScript:</p>
      <div class="codeblock"><pre>import { getDistrict, toUTM } from "@coderesolutions/peru-spatial-utils";

getDistrict("240203").name;   // "Canoas de Punta Sal"
toUTM(-3.683, -80.451);       // { zone: 17, easting: 560966, northing: 9592893 }</pre></div>
      <h2>Preguntas frecuentes</h2>
      <p><strong>De donde provienen los ubigeos?</strong><br>Usan los codigos y nombres oficiales del INEI: 25 departamentos, 196 provincias y 1893 distritos.</p>
      <p><strong>Que datum usan las coordenadas?</strong><br>WGS84, de forma explicita, para las zonas UTM 17S, 18S y 19S del Peru.</p>
      <p><strong>El analisis territorial es oficial?</strong><br>No. El riesgo y las recomendaciones son heuristicas de referencia y no reemplazan la opinion tecnica de las autoridades competentes.</p>
      <h2>Soporte</h2>
      <p>Reporta problemas o solicita funciones en <a href="https://github.com/jafcn09/peru-spatial-utils/issues" target="_blank" rel="noopener">GitHub Issues</a>.</p>`,
    'seg.title': 'Politica de seguridad',
    'seg.sub': 'Ultima actualizacion: junio de 2026.',
    'seg.body': `
      <h2>Versiones soportadas</h2>
      <p>Se atienden reportes de seguridad sobre la ultima version publicada (0.1.x) en npm, pub.dev y Maven Central.</p>
      <h2>Reportar una vulnerabilidad</h2>
      <p>Reportala de forma responsable:</p>
      <ul>
        <li>Crea un aviso privado en <a href="https://github.com/jafcn09/peru-spatial-utils/security/advisories/new" target="_blank" rel="noopener">GitHub Security Advisories</a>, o</li>
        <li>Escribe a <a href="mailto:jafetcanepamaceda05@gmail.com">jafetcanepamaceda05@gmail.com</a> con el detalle y los pasos para reproducir.</li>
      </ul>
      <p>Por favor no la publiques hasta que exista una correccion.</p>
      <h2>Que esperar</h2>
      <ul>
        <li>Confirmacion de recepcion en un plazo razonable.</li>
        <li>Evaluacion del impacto y, de proceder, una correccion en una version parche.</li>
        <li>Reconocimiento al reportante si asi lo desea.</li>
      </ul>
      <h2>Alcance</h2>
      <p>La libreria es codigo del lado del cliente, sin dependencias de red en tiempo de ejecucion y sin recoleccion de datos. Los datos de ubigeo son publicos (INEI). Las heuristicas territoriales son de referencia.</p>`,
    'cook.title': 'Politica de cookies',
    'cook.sub': 'Ultima actualizacion: junio de 2026.',
    'cook.body': `
      <h2>Resumen</h2>
      <p>Este sitio no usa cookies de rastreo, ni publicidad, ni analitica de terceros. La demostracion se ejecuta por completo en tu navegador.</p>
      <h2>Que almacenamos</h2>
      <ul>
        <li><strong>Preferencias:</strong> claves en el almacenamiento local (localStorage): <span class="mono">psu-cookie</span> (aviso de cookies), <span class="mono">psu-theme</span> (tema) y <span class="mono">psu-lang</span> (idioma).</li>
      </ul>
      <p>No se almacena ningun dato personal ni se comparte con terceros. Los codigos de ubigeo que escribes en la demo se procesan localmente.</p>
      <h2>Como gestionarlo</h2>
      <ul>
        <li>Puedes rechazar el aviso al cargar el sitio; igual funcionara todo.</li>
        <li>Borra el almacenamiento del sitio desde tu navegador para restablecer las preferencias.</li>
      </ul>
      <h2>Contacto</h2>
      <p>Dudas: <a href="mailto:jafetcanepamaceda05@gmail.com">jafetcanepamaceda05@gmail.com</a>.</p>`,
  },
  en: {
    'nav.demo': 'Demo', 'nav.api': 'API', 'nav.help': 'Help', 'nav.security': 'Security', 'nav.cookies': 'Cookies',
    'back': 'Back to home',
    'foot.help': 'Help', 'foot.security': 'Security', 'foot.cookies': 'Cookies',
    'ayuda.title': 'Help',
    'ayuda.sub': 'Quick guide to install, usage and frequently asked questions.',
    'ayuda.body': `
      <h2>Install</h2>
      <p>Pick the package for your ecosystem:</p>
      <ul>
        <li><strong>npm:</strong> <span class="mono">npm install @coderesolutions/peru-spatial-utils</span></li>
        <li><strong>pub.dev:</strong> <span class="mono">peru_spatial_utils: ^0.1.0</span></li>
        <li><strong>Maven:</strong> <span class="mono">io.github.jafcn09:peru-spatial-utils:0.1.0</span></li>
      </ul>
      <h2>Basic usage</h2>
      <p>The API is the same across languages. A TypeScript example:</p>
      <div class="codeblock"><pre>import { getDistrict, toUTM } from "@coderesolutions/peru-spatial-utils";

getDistrict("240203").name;   // "Canoas de Punta Sal"
toUTM(-3.683, -80.451);       // { zone: 17, easting: 560966, northing: 9592893 }</pre></div>
      <h2>Frequently asked questions</h2>
      <p><strong>Where do the ubigeos come from?</strong><br>They use the official INEI codes and names: 25 departments, 196 provinces and 1893 districts.</p>
      <p><strong>Which datum do coordinates use?</strong><br>WGS84, explicitly, for Peru UTM zones 17S, 18S and 19S.</p>
      <p><strong>Is the territorial analysis official?</strong><br>No. Risk and recommendations are reference heuristics and do not replace the technical opinion of the competent authorities.</p>
      <h2>Support</h2>
      <p>Report issues or request features on <a href="https://github.com/jafcn09/peru-spatial-utils/issues" target="_blank" rel="noopener">GitHub Issues</a>.</p>`,
    'seg.title': 'Security policy',
    'seg.sub': 'Last updated: June 2026.',
    'seg.body': `
      <h2>Supported versions</h2>
      <p>Security reports are handled for the latest published version (0.1.x) on npm, pub.dev and Maven Central.</p>
      <h2>Reporting a vulnerability</h2>
      <p>Please report it responsibly:</p>
      <ul>
        <li>Open a private advisory on <a href="https://github.com/jafcn09/peru-spatial-utils/security/advisories/new" target="_blank" rel="noopener">GitHub Security Advisories</a>, or</li>
        <li>Email <a href="mailto:jafetcanepamaceda05@gmail.com">jafetcanepamaceda05@gmail.com</a> with details and reproduction steps.</li>
      </ul>
      <p>Please do not disclose it publicly until a fix is available.</p>
      <h2>What to expect</h2>
      <ul>
        <li>Acknowledgement within a reasonable time.</li>
        <li>Impact assessment and, where applicable, a fix in a patch release.</li>
        <li>Credit to the reporter if desired.</li>
      </ul>
      <h2>Scope</h2>
      <p>The library is client-side code, with no runtime network dependencies and no data collection. Ubigeo data is public (INEI). Territorial heuristics are for reference only.</p>`,
    'cook.title': 'Cookie policy',
    'cook.sub': 'Last updated: June 2026.',
    'cook.body': `
      <h2>Summary</h2>
      <p>This site uses no tracking cookies, no advertising and no third-party analytics. The demo runs entirely in your browser.</p>
      <h2>What we store</h2>
      <ul>
        <li><strong>Preferences:</strong> keys in local storage: <span class="mono">psu-cookie</span> (cookie notice), <span class="mono">psu-theme</span> (theme) and <span class="mono">psu-lang</span> (language).</li>
      </ul>
      <p>No personal data is stored or shared with third parties. The ubigeo codes you type in the demo are processed locally.</p>
      <h2>How to manage it</h2>
      <ul>
        <li>You can reject the notice on load; everything still works.</li>
        <li>Clear the site storage from your browser settings to reset preferences.</li>
      </ul>
      <h2>Contact</h2>
      <p>Questions: <a href="mailto:jafetcanepamaceda05@gmail.com">jafetcanepamaceda05@gmail.com</a>.</p>`,
  },
};

let lang = (document.documentElement.getAttribute('lang') === 'en') ? 'en' : 'es';

function apply() {
  const d = I18N[lang];
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

function setupTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('psu-theme', next); } catch (e) {}
  });
}

function setupLang() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('psu-lang', lang); } catch (e) {}
    apply();
  });
}

apply();
setupTheme();
setupLang();
