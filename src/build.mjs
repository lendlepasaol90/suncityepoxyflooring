// Static site build: node src/build.mjs  →  writes HTML into ./public
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { site, services } from './site.mjs';
import { words } from './lib.mjs';
import { renderHome } from './pages/home.mjs';
import { renderService } from './pages/service.mjs';
import { renderAbout, renderAreas, renderContact, renderPrivacy, render404 } from './pages/static.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public');
const pages = [];

function write(route, html) {
  const file = route === '/' ? path.join(out, 'index.html') : route.endsWith('.html') ? path.join(out, route) : path.join(out, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  const main = (html.match(/<main[\s\S]*<\/main>/) || [''])[0];
  pages.push({ route, words: words(main) });
}

write('/', renderHome());
for (const s of services) {
  const mod = await import(pathToFileURL(path.join(root, 'src/content/services', `${s.slug}.mjs`)).href);
  write(`/${s.slug}/`, renderService(mod.default));
}
write('/about-us/', renderAbout());
write('/service-areas/', renderAreas());
write('/contact-us/', renderContact());
write('/privacy-policy/', renderPrivacy());
write('404.html', render404());

// Copy static assets
fs.cpSync(path.join(root, 'src/assets'), path.join(out, 'assets'), { recursive: true });
fs.copyFileSync(path.join(root, 'src/_headers'), path.join(out, '_headers'));

// sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => !p.route.endsWith('.html'));
fs.writeFileSync(
  path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((p) => `  <url><loc>${site.domain}${p.route}</loc><lastmod>${today}</lastmod><priority>${p.route === '/' ? '1.0' : p.route.includes('privacy') ? '0.3' : '0.8'}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.domain}/sitemap.xml\n`);

console.table(pages);
