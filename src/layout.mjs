import { site, services, projectTypes, areas } from './site.mjs';
import { esc } from './lib.mjs';

const year = new Date().getFullYear();

export function leadForm({ id, layout = 'stack', title = '', note = '', details = false, cta = 'Request my free estimate' }) {
  const opts = projectTypes.map((t) => `<option>${esc(t)}</option>`).join('');
  return `<form class="qf qf--${layout}" id="${id}" action="/api/lead" method="post" novalidate data-lead-form>
  ${title ? `<h2 class="qf__title">${title}</h2>` : ''}${note ? `<p class="qf__note">${note}</p>` : ''}
  <div class="qf__grid">
    <p class="qf__field"><label for="${id}-name">Your name</label><input id="${id}-name" name="name" type="text" autocomplete="name" required maxlength="80"><small class="qf__err" aria-live="polite"></small></p>
    <p class="qf__field"><label for="${id}-phone">Phone number</label><input id="${id}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required><small class="qf__err" aria-live="polite"></small></p>
    <p class="qf__field"><label for="${id}-email">Email address</label><input id="${id}-email" name="email" type="email" autocomplete="email" required maxlength="120"><small class="qf__err" aria-live="polite"></small></p>
    <p class="qf__field"><label for="${id}-project">Type of project</label><select id="${id}-project" name="project" required><option value="">Select…</option>${opts}</select><small class="qf__err" aria-live="polite"></small></p>
    ${details ? `<p class="qf__field qf__field--full"><label for="${id}-msg">Anything we should know? <span>(optional)</span></label><textarea id="${id}-msg" name="message" rows="4" maxlength="1500"></textarea></p>` : ''}
    <p class="qf__trap" aria-hidden="true"><label for="${id}-site">Website</label><input id="${id}-site" name="company_website" tabindex="-1" autocomplete="off"></p>
    <p class="qf__actions"><button class="button button--sage" type="submit">${cta}</button></p>
  </div>
  <p class="qf__msg" role="status" aria-live="polite"></p>
</form>`;
}

export function head({ title, description, path, schema = [], image = site.ogImage }) {
  const url = site.domain + path;
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#eef0e6">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.domain}${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${site.domain}${image}">
<meta name="geo.region" content="US-AZ">
<meta name="geo.placename" content="Sun City">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Figtree:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/site.css?v=1">
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>`;
}

export function header(active = '') {
  const cur = (k) => (active === k ? ' aria-current="page"' : '');
  const mega = services
    .map((s) => `<li><a href="/${s.slug}/"${cur(s.slug)}><strong>${s.name}</strong><span>${esc(s.blurb)}</span></a></li>`)
    .join('');
  return `<body>
<a class="skiplink" href="#content">Skip to main content</a>
<header class="masthead" data-header>
  <div class="utility">
    <div class="container utility__row">
      <p>Free in-home estimates · Serving Sun City &amp; the West Valley</p>
      <a href="tel:${site.phone.tel}" class="utility__phone">Call ${site.phone.display}</a>
    </div>
  </div>
  <div class="container masthead__row">
    <a class="brand" href="/" aria-label="${esc(site.name)} — home">
      <span class="brand__logo" aria-hidden="true">LOGO</span>
      <span class="brand__name">Sun City<b>Epoxy Flooring</b></span>
    </a>
    <nav class="menu" aria-label="Main menu">
      <ul class="menu__list">
        <li><a href="/"${cur('home')}>Home</a></li>
        <li class="menu__has-mega">
          <button type="button" class="menu__trigger" aria-expanded="false" aria-controls="mega" data-mega>Services <i aria-hidden="true"></i></button>
          <div class="mega" id="mega"><ul class="mega__grid">${mega}</ul></div>
        </li>
        <li><a href="/about-us/"${cur('about')}>About Us</a></li>
        <li><a href="/service-areas/"${cur('areas')}>Service Areas</a></li>
        <li><a href="/contact-us/"${cur('contact')}>Contact</a></li>
      </ul>
    </nav>
    <button type="button" class="button button--sage masthead__quote" aria-expanded="false" aria-controls="header-estimate" data-estimate-toggle>Free Estimate</button>
    <button type="button" class="burger" aria-expanded="false" aria-controls="drawer" data-burger><span></span><span class="visually-hidden">Open menu</span></button>
  </div>
  <div class="estimate-panel" id="header-estimate" data-estimate-panel>
    <div class="container estimate-panel__inner">
      <div class="estimate-panel__intro">
        <p class="kicker">No-obligation estimate</p>
        <p class="estimate-panel__head">Tell us a little about your floor.</p>
        <p>We’ll call to set up a visit at a time that suits you — usually within one business day.</p>
      </div>
      ${leadForm({ id: 'hq', layout: 'row', cta: 'Send request' })}
      <button type="button" class="estimate-panel__close" aria-label="Close estimate form" data-estimate-close>×</button>
    </div>
  </div>
  <div class="drawer" id="drawer" data-drawer hidden>
    <ul>
      <li><a href="/">Home</a></li>
      ${services.map((s) => `<li><a href="/${s.slug}/">${s.name}</a></li>`).join('')}
      <li><a href="/about-us/">About Us</a></li>
      <li><a href="/service-areas/">Service Areas</a></li>
      <li><a href="/contact-us/">Contact</a></li>
    </ul>
    <a class="button button--sage" href="tel:${site.phone.tel}">Call ${site.phone.display}</a>
  </div>
</header>`;
}

export function footer() {
  const map = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=12&output=embed`;
  return `<footer class="footer">
  <div class="container footer__cta">
    <p class="footer__cta-text">Questions about a floor? We’re happy to talk it through.</p>
    <a class="button button--light" href="tel:${site.phone.tel}">${site.phone.display}</a>
  </div>
  <div class="container footer__main">
    <div class="footer__map">
      <iframe title="Google map of Sun City, Arizona" src="${map}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
    <div class="footer__cols">
      <div>
        <a class="brand brand--footer" href="/"><span class="brand__logo" aria-hidden="true">LOGO</span><span class="brand__name">Sun City<b>Epoxy Flooring</b></span></a>
        <p>Garage, patio and interior floor coatings for Sun City, Sun City West and nearby West Valley communities.</p>
        <p class="footer__hours">${site.hours}</p>
      </div>
      <nav aria-label="Footer services"><h2>Services</h2><ul>${services.map((s) => `<li><a href="/${s.slug}/">${s.name}</a></li>`).join('')}</ul></nav>
      <nav aria-label="Footer company"><h2>Company</h2><ul><li><a href="/about-us/">About Us</a></li><li><a href="/service-areas/">Service Areas</a></li><li><a href="/contact-us/">Contact</a></li><li><a href="/privacy-policy/">Privacy Policy</a></li></ul>
        <h2>Communities</h2><p class="footer__areas">${areas.map((a) => a.name).join(', ')}</p></nav>
    </div>
  </div>
  <div class="container footer__legal"><p>© ${year} ${esc(site.name)}</p><p><a href="/sitemap.xml">Sitemap</a> · <a href="/privacy-policy/">Privacy</a></p></div>
</footer>
<a class="mobile-call" href="tel:${site.phone.tel}">Call for a free estimate</a>
<script src="/assets/js/site.js?v=1" defer></script>
</body>
</html>`;
}

export const bizId = `${site.domain}/#business`;
export function businessSchema() {
  const s = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': bizId,
    name: site.name,
    url: `${site.domain}/`,
    image: site.domain + site.ogImage,
    description: 'Garage, patio, residential and commercial epoxy floor coatings serving Sun City, Arizona and nearby West Valley communities.',
    address: { '@type': 'PostalAddress', addressLocality: 'Sun City', addressRegion: 'AZ', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: areas.map((a) => ({ '@type': 'Place', name: `${a.name.replace(' (west)', '')}, AZ` })),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Floor coating services', itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${site.domain}/${s.slug}/` } })) },
  };
  if (!site.phone.placeholder) s.telephone = site.phone.tel;
  return s;
}
export const serviceSchema = (svc, description) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: svc.name,
  serviceType: svc.name,
  description,
  url: `${site.domain}/${svc.slug}/`,
  provider: { '@id': bizId },
  areaServed: [{ '@type': 'Place', name: 'Sun City, AZ' }, { '@type': 'Place', name: 'Sun City West, AZ' }],
});
export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '') } })),
});
export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: site.domain + it.url })),
});
export const breadcrumbs = (items) =>
  `<nav class="trail" aria-label="Breadcrumb"><ol>${items.map((it, i) => (i < items.length - 1 ? `<li><a href="${it.url}">${esc(it.name)}</a></li>` : `<li aria-current="page">${esc(it.name)}</li>`)).join('')}</ol></nav>`;
