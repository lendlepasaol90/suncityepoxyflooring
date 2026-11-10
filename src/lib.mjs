// Small rendering helpers shared by the Kingman page templates.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const images = JSON.parse(fs.readFileSync(path.join(here, 'images.json'), 'utf8'));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline markup: **bold**, *em*, [label](/url)
export const md = (s = '') =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

export const paras = (list = [], cls = '') =>
  list.map((p) => `<p${cls ? ` class="${cls}"` : ''}>${md(p)}</p>`).join('\n');

export function img(key, { sizes = '100vw', cls = '', eager = false, alt, attrs = '' } = {}) {
  const im = images[key];
  if (!im) throw new Error(`Unknown image key: ${key}`);
  const srcset = im.widths.map((w) => `${im.base}-${w}.webp ${w}w`).join(', ');
  const mid = im.widths.find((w) => w >= 1200) || im.widths[im.widths.length - 1];
  return `<img src="${im.base}-${mid}.webp" srcset="${srcset}" sizes="${sizes}" width="${im.w}" height="${im.h}" alt="${esc(alt ?? im.alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${attrs ? ' ' + attrs : ''}>`;
}

// Background image URL at a given width (closest available)
export function bg(key, want = 1600) {
  const im = images[key];
  const w = im.widths.filter((x) => x <= want).pop() || im.widths[0];
  return `${im.base}-${w}.webp`;
}

export const words = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;
