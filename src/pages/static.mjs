import { site, services, areas } from '../site.mjs';
import { head, header, footer, leadForm, businessSchema, breadcrumbs, breadcrumbSchema } from '../layout.mjs';
import { img, bg, esc } from '../lib.mjs';

const intro = ({ kicker, h1, lead, image, trail }) => `<section class="page-top">
  <div class="container page-top__grid">
    <div>
      ${breadcrumbs(trail)}
      <p class="kicker reveal">${kicker}</p>
      <h1 class="reveal">${h1}</h1>
      <p class="page-top__lead reveal">${lead}</p>
    </div>
    <figure class="page-top__img img-reveal">${img(image, { sizes: '(max-width: 900px) 94vw, 40vw', eager: true })}</figure>
  </div>
</section>`;

export function renderAbout() {
  const trail = [{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about-us/' }];
  const body = `<main id="content">
  ${intro({ kicker: 'About us', h1: 'Floor coatings with patience, care and clear answers.', lead: 'We’re a West Valley floor coating team that focuses on garages, patios and interior floors for homes in and around Sun City.', image: 'crewPour', trail })}
  <section class="block">
    <div class="container about">
      <div class="copy">
        <h2 class="reveal">Our approach</h2>
        <p class="reveal">We believe a good floor starts long before the first coat goes down. It starts with listening — understanding how you use the space, what bothers you about the current floor and what you’d like it to become. Then it’s a matter of looking honestly at the concrete, choosing the right materials and doing the preparation properly.</p>
        <p class="reveal">That approach suits the homes in this area. Many slabs here have decades of history, and a quick paint job simply won’t last on them. We take the time to grind away old finishes, repair the cracks that years of desert summers create, and test for moisture before recommending a system. It’s not the fastest way to quote a floor, but it’s the way to build one that lasts.</p>
        <h2 class="reveal">What we promise every customer</h2>
        <ul class="bullets reveal">
          <li>An in-person estimate with real samples — never a guess over the phone.</li>
          <li>A written estimate listing preparation, repairs and every coat.</li>
          <li>Straightforward advice, including when a simpler option will serve you just as well.</li>
          <li>Careful protection of your home, lower-odor products where possible, and a tidy workspace.</li>
          <li>Clear timing for when you can walk, park and move items back in.</li>
        </ul>
        <h2 class="reveal">Who we work with</h2>
        <p class="reveal">Most of our customers are homeowners who want a garage, golf cart bay, patio or laundry room that looks good and asks little of them. We also work with local businesses, clubhouses and facility managers who need clean, safe and durable floors. Whatever the project, the standard of care is the same.</p>
        <p class="reveal">If you’re still exploring, our service pages explain how each coating system works and where it fits best. We’re always glad to answer questions, even if you’re not ready to schedule.</p>
      </div>
      <aside class="about__aside reveal">
        <h2>Our services</h2>
        <ul>${services.map((s) => `<li><a href="/${s.slug}/">${s.name}</a></li>`).join('')}</ul>
        <a class="button button--sage" href="/contact-us/">Request an estimate</a>
      </aside>
    </div>
  </section>
</main>`;
  return head({ title: 'About Us | Sun City Epoxy Flooring', description: 'Learn how Sun City Epoxy Flooring approaches garage, patio and interior floor coatings — careful preparation, honest advice and respect for your home.', path: '/about-us/', schema: [businessSchema(), breadcrumbSchema(trail)] }) + header('about') + body + footer();
}

const areaText = {
  'Sun City': 'Sun City is where most of our work happens. We coat garages, golf cart bays, patios, Arizona rooms and laundry rooms throughout the community, on both sides of Grand Avenue. Many homes here were built from the 1960s onward, and we’re experienced with the older slabs, painted floors and settled cracks that come with that history.',
  'Sun City West': 'In Sun City West, extended garages with room for a golf cart are common, as are covered patios that see daily use for much of the year. Flake floors with polyaspartic topcoats and light, textured patio coatings are our most requested projects here.',
  Youngtown: 'Youngtown sits right on Sun City’s eastern edge. We coat garages and patios in its established neighborhoods and help small businesses along the main corridors with commercial floors.',
  Peoria: 'Peoria neighborhoods near Sun City range from older homes to newer subdivisions. Newer slabs are often in good shape and coat quickly; older ones may need a little more preparation.',
  Surprise: 'In Surprise, including Sun City Grand and the communities along Bell Road, we coat garages, cart bays, patios and entries. Larger garages and three-car layouts are common here.',
  'El Mirage': 'Just west of Sun City, El Mirage includes both homes and light-industrial properties. We handle garage coatings as well as shop and warehouse floors.',
  'Glendale (west)': 'We serve west Glendale neighborhoods for garage and patio projects and take on commercial floors in nearby retail and office spaces.',
  'Arrowhead area': 'Around Arrowhead and the Loop 101 corridor, we coat residential garages and patios and help retail, medical and service businesses with commercial flooring.',
};

export function renderAreas() {
  const trail = [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/service-areas/' }];
  const body = `<main id="content">
  ${intro({ kicker: 'Service areas', h1: 'Proudly serving Sun City and the West Valley.', lead: 'We focus on Sun City and nearby communities so we can offer prompt estimates, convenient scheduling and attentive service.', image: 'roofsAerial', trail })}
  <section class="block">
    <div class="container">
      <div class="arealist">${areas.map((a) => `<article class="arealist__item reveal"><h2>${a.name}</h2><p>${esc(areaText[a.name])}</p></article>`).join('')}</div>
      <div class="copy narrow reveal" style="margin-top:56px">
        <h2>Not on the list?</h2>
        <p>If your home or business is nearby but not listed, please get in touch. We regularly help customers just beyond these communities, especially for garage and commercial projects. Every service we offer — from <a href="/garage-floor-coatings/">garage coatings</a> and <a href="/patio-concrete-coatings/">patio coatings</a> to <a href="/commercial-epoxy-flooring/">commercial floors</a> — is available throughout our service area.</p>
      </div>
    </div>
  </section>
</main>`;
  return head({ title: 'Service Areas | Sun City Epoxy Flooring', description: 'Epoxy and concrete coatings in Sun City, Sun City West, Youngtown, Peoria, Surprise, El Mirage, west Glendale and the Arrowhead area.', path: '/service-areas/', schema: [businessSchema(), breadcrumbSchema(trail)] }) + header('areas') + body + footer();
}

export function renderContact() {
  const trail = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact-us/' }];
  const body = `<main id="content">
  <section class="page-top page-top--contact">
    <div class="container">
      ${breadcrumbs(trail)}
      <p class="kicker reveal">Contact</p>
      <h1 class="reveal">Let’s talk about your floor.</h1>
      <p class="page-top__lead reveal">Fill out the form or give us a call. We’ll get back to you within one business day to arrange a convenient time to visit.</p>
    </div>
  </section>
  <section class="block">
    <div class="container contact">
      <div class="reveal">${leadForm({ id: 'contact', title: 'Request a free estimate', note: 'All fields are required except the message.', details: true, cta: 'Send my request' })}</div>
      <div class="contact__side">
        <div class="infobox reveal"><h2>Call us</h2><p class="infobox__big"><a href="tel:${site.phone.tel}">${site.phone.display}</a></p><p>${site.hours}</p></div>
        <div class="infobox reveal"><h2>How it works</h2><ol><li>We call to confirm details and schedule a visit.</li><li>We meet at your home, look at the floor and show samples.</li><li>You receive a written estimate with no obligation.</li><li>If you’d like to go ahead, we schedule at your convenience.</li></ol></div>
        <div class="infobox reveal"><h2>Where we work</h2><p>Sun City, Sun City West, Youngtown, Peoria, Surprise, El Mirage and nearby West Valley communities. <a href="/service-areas/">See service areas</a>.</p></div>
      </div>
    </div>
  </section>
</main>`;
  return head({ title: 'Contact Us | Free Estimates | Sun City Epoxy Flooring', description: 'Request a free, no-obligation estimate for garage, patio, interior or commercial floor coatings in Sun City, AZ. We respond within one business day.', path: '/contact-us/', schema: [businessSchema(), breadcrumbSchema(trail)] }) + header('contact') + body + footer();
}

export function renderPrivacy() {
  const trail = [{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy/' }];
  const body = `<main id="content"><section class="block"><div class="container copy narrow">
  ${breadcrumbs(trail)}
  <h1>Privacy Policy</h1>
  <p>${esc(site.name)} respects your privacy. This page explains what information we collect through this website and how we use it.</p>
  <h2>What we collect</h2>
  <p>Submitting the estimate form sends us the details you type in — your name, phone, email, project type and optional note — plus the address of the page you were on.</p>
  <h2>How we use it</h2>
  <p>Those details are used solely to reply to you, arrange a visit and keep in touch about the work. We never sell or rent your information.</p>
  <h2>Third-party services</h2>
  <p>Our website uses Google Maps and Google Fonts, which may collect usage information under Google’s privacy policy. Form submissions are processed by our website host.</p>
  <h2>Questions</h2>
  <p>If you’d like to review or delete what we hold, phone ${site.phone.display} or visit our <a href="/contact-us/">contact page</a>.</p>
  </div></section></main>`;
  return head({ title: 'Privacy Policy | Sun City Epoxy Flooring', description: 'How Sun City Epoxy Flooring collects and uses information submitted through its website.', path: '/privacy-policy/' }) + header('') + body + footer();
}

export function render404() {
  const body = `<main id="content"><section class="block"><div class="container copy narrow notfound">
  <p class="kicker">Page not found</p>
  <h1>Looks like this page wandered off the fairway.</h1>
  <p>We couldn’t find the page you were looking for. These links may help:</p>
  <p><a class="button button--sage" href="/">Home</a> <a class="button button--outline" href="/contact-us/">Request an estimate</a></p>
  </div></section></main>`;
  return head({ title: 'Page Not Found | Sun City Epoxy Flooring', description: 'The page you requested could not be found.', path: '/404.html' }).replace('index,follow', 'noindex') + header('') + body + footer();
}
