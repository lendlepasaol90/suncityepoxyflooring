import { site, services } from '../site.mjs';
import { head, header, footer, leadForm, businessSchema, serviceSchema, faqSchema, breadcrumbSchema, breadcrumbs } from '../layout.mjs';
import { img, bg, md, paras, esc } from '../lib.mjs';

// Content shape (src/content/services/*.mjs):
// { slug, title, description, kicker, h1, lead, heroImg, glance:[str],
//   sections:[{ h2, intro?:[p], paras?:[p], kind?:'cards'|'steps'|'options', items?:[{h,p}], list?:[str], img?, caption? }],
//   faqs:[{q,a}], related:[slug], closing:{h2,p} }

function section(s, i) {
  const body = `${s.paras ? paras(s.paras) : ''}${s.list ? `<ul class="bullets">${s.list.map((l) => `<li>${md(l)}</li>`).join('')}</ul>` : ''}`;
  let items = '';
  if (s.kind === 'cards') items = `<div class="cardset">${s.items.map((it) => `<div class="cardset__card reveal"><h3>${esc(it.h)}</h3><p>${md(it.p)}</p></div>`).join('')}</div>`;
  if (s.kind === 'steps') items = `<ol class="stepper">${s.items.map((it, n) => `<li class="reveal"><span>${n + 1}</span><div><h3>${esc(it.h)}</h3><p>${md(it.p)}</p></div></li>`).join('')}</ol>`;
  if (s.kind === 'options') items = `<dl class="optionlist">${s.items.map((it) => `<div class="reveal"><dt>${esc(it.h)}</dt><dd>${md(it.p)}</dd></div>`).join('')}</dl>`;
  const intro = s.intro ? paras(s.intro) : '';
  if (s.img) {
    return `<section class="sv-sec sv-sec--media${i % 2 ? ' sv-sec--flip' : ''}" id="${s.id || ''}">
      <div class="sv-sec__text"><h2 class="reveal">${esc(s.h2)}</h2><div class="copy reveal">${intro}${body}</div></div>
      <figure class="sv-sec__fig img-reveal">${img(s.img, { sizes: '(max-width: 900px) 94vw, 42vw' })}${s.caption ? `<figcaption>${esc(s.caption)}</figcaption>` : ''}</figure>
      ${items ? `<div class="sv-sec__items">${items}</div>` : ''}
    </section>`;
  }
  return `<section class="sv-sec" id="${s.id || ''}"><h2 class="reveal">${esc(s.h2)}</h2><div class="copy reveal">${intro}${body}</div>${items}</section>`;
}

export function renderService(c) {
  const svc = services.find((s) => s.slug === c.slug);
  const path = `/${c.slug}/`;
  const trail = [{ name: 'Home', url: '/' }, { name: svc.name, url: path }];
  const half = Math.ceil(c.sections.length / 2);
  const related = c.related.map((r) => services.find((s) => s.slug === r));
  const body = `
<main id="content" class="sv">
  <section class="sv-hero">
    <div class="sv-hero__media" style="--sv-img:url('${bg(c.heroImg, 1600)}')" role="img" aria-label="${esc(img(c.heroImg).match(/alt="([^"]*)"/)[1])}"></div>
    <div class="container sv-hero__inner">
      <div class="sv-hero__card reveal">
        ${breadcrumbs(trail)}
        <p class="kicker">${esc(c.kicker)}</p>
        <h1>${esc(c.h1)}</h1>
        <p class="sv-hero__lead">${md(c.lead)}</p>
        <div class="hero__buttons"><a class="button button--sage" href="#sv-estimate">Free estimate</a><a class="button button--outline" href="tel:${site.phone.tel}">${site.phone.display}</a></div>
      </div>
    </div>
  </section>

  <div class="container sv-body">
    <aside class="glance reveal" aria-label="At a glance">
      <p class="glance__title">At a glance</p>
      <ul>${c.glance.map((g) => `<li>${md(g)}</li>`).join('')}</ul>
    </aside>
    ${c.sections.slice(0, half).map(section).join('')}
  </div>

  <section class="sv-band" id="sv-estimate">
    <div class="container sv-band__inner">
      <div class="sv-band__copy reveal"><p class="kicker kicker--dark">Free in-home estimate</p><h2>Thinking about ${esc(svc.name.toLowerCase())}?</h2><p>We’ll visit, look at the concrete, bring samples and give you a written estimate — no pressure.</p></div>
      <div class="reveal">${leadForm({ id: 'svq', layout: 'compact', cta: 'Request my estimate' })}</div>
    </div>
  </section>

  <div class="container sv-body">
    ${c.sections.slice(half).map((s, i) => section(s, i + half)).join('')}
    <section class="sv-sec" id="faq">
      <h2 class="reveal">${esc(c.faqTitle || 'Questions we’re often asked')}</h2>
      <div class="faqs faqs--single">${c.faqs.map((f) => `<details class="faq reveal"><summary>${esc(f.q)}</summary><p>${md(f.a)}</p></details>`).join('')}</div>
    </section>
  </div>

  <section class="block block--tint">
    <div class="container">
      <header class="block__head reveal"><p class="kicker">Related services</p><h2>You may also be interested in</h2></header>
      <div class="related">${related.map((r) => `<a class="related__item reveal" href="/${r.slug}/"><span class="related__img">${img(r.img, { sizes: '(max-width: 760px) 94vw, 30vw', alt: '' })}</span><span class="related__name">${r.name}</span><span class="related__text">${esc(r.blurb)}</span></a>`).join('')}</div>
    </div>
  </section>

  <section class="panorama panorama--short" style="--pano:url('${bg(c.closingImg || 'golfPalms', 2200)}')">
    <div class="container panorama__inner">
      <h2 class="reveal">${esc(c.closing.h2)}</h2>
      <p class="reveal">${md(c.closing.p)}</p>
      <div class="panorama__buttons reveal"><a class="button button--light" href="/contact-us/">Request an estimate</a><a class="button button--ghost" href="tel:${site.phone.tel}">Call ${site.phone.display}</a></div>
    </div>
  </section>
</main>`;
  return head({
    title: c.title,
    description: c.description,
    path,
    image: `${(img(c.heroImg).match(/src="([^"]+)"/) || [])[1]}`,
    schema: [businessSchema(), serviceSchema(svc, c.description), faqSchema(c.faqs), breadcrumbSchema(trail)],
  }) + header(c.slug) + body + footer();
}
