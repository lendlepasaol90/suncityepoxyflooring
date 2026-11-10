import { site, services, areas } from '../site.mjs';
import { head, header, footer, leadForm, businessSchema, faqSchema } from '../layout.mjs';
import { img, bg, md, esc } from '../lib.mjs';

const faqs = [
  { q: 'Can a garage coating handle a golf cart and a car side by side?', a: 'Yes. Golf carts are light compared with a car, but their small tires turn tightly in the same spots every day. A full flake system with a polyaspartic topcoat handles that easily. If the cart charges in the garage, we also make sure the area around the charger is sealed so any battery drips stay on the surface.' },
  { q: 'How long will I be without my garage?', a: 'With our one-day polyaspartic systems, most two-car garages are finished in a single visit. You can walk on the floor the following morning, and cars and carts can usually return within a few days, depending on the weather. We confirm exact times before we leave.' },
  { q: 'Is there a strong smell?', a: 'Every coating has some odor while it is being applied. For attached garages and interior rooms we use lower-odor products where they suit the job, keep the space ventilated and close the door to the house. Most people find the smell has faded by the next day.' },
  { q: 'My home was built decades ago. Can the slab still be coated?', a: 'Almost always. Older slabs often have paint, sealers or decades of oil to deal with, and some lack a vapor barrier underneath. We grind off old finishes, test for moisture and choose a primer to suit what we find. Age alone is not a problem — preparation is what matters.' },
  { q: 'Will the floor be slippery?', a: 'Not if it is built correctly for the space. Flake floors have a natural texture, and we can add a fine grit to the topcoat for extra grip. For patios, pool decks and entries we always recommend a textured finish.' },
  { q: 'Do I need to be home during the work?', a: 'Someone needs to let us in on the first morning and see the finished floor at the end. Many customers go about their day in between. For garage work, you will want to park on the driveway or street until the floor is ready.' },
  { q: 'What does a coated patio feel like in summer?', a: 'Lighter colors stay noticeably cooler than dark ones, and a textured finish is comfortable underfoot. Nothing stays cool in full July sun, so we match the shade to how exposed your patio really is.' },
  { q: 'How do I clean the floor afterward?', a: 'A dust mop or soft broom handles most days. When it needs more than a sweep, a bucket of warm water, a splash of neutral cleaner and a soft mop will do. We leave simple written care instructions with every floor.' },
];

export function renderHome() {
  const [first, ...rest] = services;
  const bento = `<a class="bento__card bento__card--lead reveal" href="/${first.slug}/">
      ${img(first.img, { sizes: '(max-width: 760px) 94vw, 50vw', alt: '' })}
      <span class="bento__body"><span class="bento__name">${first.name}</span><span class="bento__text">${esc(first.blurb)}</span><span class="bento__go">Explore garage coatings</span></span>
    </a>` +
    rest.map((s) => `<a class="bento__card reveal" href="/${s.slug}/">
      <span class="bento__thumb">${img(s.img, { sizes: '(max-width: 760px) 94vw, 25vw', alt: '' })}</span>
      <span class="bento__body"><span class="bento__name">${s.name}</span><span class="bento__text">${esc(s.blurb)}</span></span>
    </a>`).join('');

  const body = `
<main id="content">
  <!-- HERO -->
  <section class="hero" style="--hero-wash:url('${bg('roofsAerial', 1600)}')">
    <div class="container hero__text">
      <p class="kicker reveal">Epoxy &amp; concrete coatings · Sun City, Arizona</p>
      <h1 class="reveal">Garage and patio floors that are easy to live with.</h1>
      <p class="hero__lead reveal">We coat garages, golf cart bays, patios and interior rooms across Sun City and the West Valley — with careful prep, low-odor options and finishes chosen for comfort and sure footing.</p>
      <div class="hero__buttons reveal">
        <a class="button button--sage" href="#estimate">Schedule a free estimate</a>
        <a class="button button--outline" href="#services">See our services</a>
      </div>
    </div>
    <div class="container hero__picture">
      <figure class="hero__frame img-reveal">${img('heroGolf', { sizes: '(max-width: 1200px) 96vw, 1180px', eager: true })}</figure>
      <ul class="hero__chips">
        <li class="reveal"><b>Low-odor</b> product options for attached garages</li>
        <li class="reveal"><b>Textured</b> finishes for safer footing</li>
        <li class="reveal"><b>1-day</b> installs available for most garages</li>
      </ul>
    </div>
  </section>

  <!-- INTRO -->
  <section class="block">
    <div class="container intro">
      <div class="intro__head">
        <p class="kicker reveal">Local floor coating specialists</p>
        <h2 class="reveal">Floors chosen for how you actually use the space.</h2>
      </div>
      <div class="intro__copy reveal">
        <p>Sun City homes have a rhythm of their own. The garage holds the car, the golf cart and often a workbench or a freezer. The patio is where morning coffee happens from October through April. The laundry room and the Arizona room see steady, everyday use. Each of those spaces deserves a floor that looks tidy, cleans quickly and does not ask for much attention.</p>
        <p>That is what a well-installed coating does. We start by grinding the concrete to remove old paint, sealers and the dusty top layer, repair cracks and pitted spots, and test for moisture. From there we tailor the layers to each space — speckled flake in the garage, a light, grippy finish outdoors, a soft satin color inside the house. The result is a sealed surface that wipes clean, resists stains and holds up to daily traffic for years.</p>
        <p>We keep the process calm and predictable. You get a clear written estimate, a realistic schedule, and a crew that protects your home and tidies up at the end of each day.</p>
      </div>
      <dl class="intro__stats">
        <div class="reveal"><dt><span data-count="9">9</span></dt><dd>coating systems for garages, homes, patios and businesses</dd></div>
        <div class="reveal"><dt><span data-count="24">24</span><small>hr</small></dt><dd>typical walk-on time for fast-cure garage floors</dd></div>
        <div class="reveal"><dt><span data-count="0">0</span></dt><dd>acid etching — every slab is mechanically ground</dd></div>
      </dl>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="block block--tint" id="services">
    <div class="container">
      <header class="block__head reveal">
        <p class="kicker">Our services</p>
        <h2>Coatings for every slab around the house — and beyond.</h2>
        <p>From a single-car garage to a clubhouse kitchen, each project starts with the same careful preparation.</p>
      </header>
      <div class="bento">${bento}</div>
    </div>
  </section>

  <!-- GOLF CART GARAGE FEATURE -->
  <section class="spotlight">
    <figure class="spotlight__img img-reveal">${img('golfCart', { sizes: '100vw' })}</figure>
    <div class="container spotlight__wrap">
      <div class="spotlight__card reveal">
        <p class="kicker">Garage epoxy flooring</p>
        <h2>A garage floor that keeps up with the car, the cart and the workbench.</h2>
        <p>Many garages around here do double duty. One bay holds the car; the other is home to a golf cart, a charger, a second freezer and a row of storage cabinets. Bare concrete in that setup gets scuffed by cart tires, stained by drips and dusty no matter how often it is swept.</p>
        <p>A full-broadcast flake floor sealed with a polyaspartic topcoat solves most of that. The speckle camouflages dust, the surface offers steady footing, and the clear top layer shrugs off warm tires and stays color-true even where the late-day sun pours in. We can also coat the short stem walls so the whole space looks finished.</p>
        <a class="textlink" href="/garage-floor-coatings/">More on garage floor coatings</a>
      </div>
    </div>
  </section>

  <!-- OUTDOOR LIVING -->
  <section class="block">
    <div class="container outdoor">
      <div class="outdoor__images">
        <figure class="outdoor__a img-reveal">${img('firePatio', { sizes: '(max-width: 900px) 94vw, 30vw' })}</figure>
        <figure class="outdoor__b img-reveal">${img('poolside', { sizes: '(max-width: 900px) 60vw, 22vw' })}</figure>
      </div>
      <div class="outdoor__copy">
        <p class="kicker reveal">Patios, pool decks &amp; walkways</p>
        <h2 class="reveal">Make the patio the most comfortable room of the house.</h2>
        <div class="reveal">
          <p>In the cooler months, the patio becomes an extra living room. But sun-faded, cracked or stained concrete can make it feel neglected. A coating gives the slab a fresh, even finish in a color that complements your stucco and furniture, and it seals out grill grease, leaf stains and hard-water marks from the sprinklers.</p>
          <p>Outdoors we choose UV-stable materials that won’t yellow, and we build texture into the top layer so the surface grips when it is wet from pool splash or a monsoon shower. Lighter shades stay more comfortable underfoot in the heat. We also pay attention to the joints and edges, so the coating looks clean where it meets the house, the lawn or the pool coping.</p>
        </div>
        <a class="textlink reveal" href="/patio-concrete-coatings/">Patio &amp; concrete coatings</a>
      </div>
    </div>
  </section>

  <!-- FINISH TABS -->
  <section class="block block--tint">
    <div class="container">
      <header class="block__head block__head--center reveal">
        <p class="kicker">Residential, decorative &amp; metallic</p>
        <h2>Three looks, endless combinations.</h2>
        <p>Most interior and garage floors start with one of these finishes. Choose a style below to see how it works.</p>
      </header>
      <div class="tabs" data-tabs>
        <div class="tabs__list" role="tablist" aria-label="Finish styles">
          <button role="tab" id="t-flake" aria-controls="p-flake" aria-selected="true">Decorative flake</button>
          <button role="tab" id="t-solid" aria-controls="p-solid" aria-selected="false" tabindex="-1">Solid &amp; satin</button>
          <button role="tab" id="t-metal" aria-controls="p-metal" aria-selected="false" tabindex="-1">Metallic</button>
        </div>
        <div class="tabs__panel" role="tabpanel" id="p-flake" aria-labelledby="t-flake">
          <figure>${img('flakeGrey', { sizes: '(max-width: 900px) 94vw, 46vw' })}</figure>
          <div><h3>Decorative flake flooring</h3><p>Colored vinyl flakes are scattered into the base coat and sealed under a clear topcoat. The speckled finish hides dust and small marks remarkably well, and the subtle texture adds grip. Blends range from quiet grays and taupes to warmer mixes that echo desert landscaping. It is our most popular finish for garages and works beautifully in laundry rooms and workshops too.</p><a class="textlink" href="/decorative-flake-flooring/">Flake colors and options</a></div>
        </div>
        <div class="tabs__panel" role="tabpanel" id="p-solid" aria-labelledby="t-solid" hidden>
          <figure>${img('laundry', { sizes: '(max-width: 900px) 94vw, 46vw' })}</figure>
          <div><h3>Residential epoxy flooring</h3><p>A single, seamless color with a satin or gloss sheen gives interior rooms a clean, finished look with no grout lines to scrub. It suits laundry rooms, mudrooms, craft rooms and Arizona rooms where you want a durable floor that looks calm rather than busy. A whisper of grit can be mixed in for traction, and a short coved edge along the walls makes mopping corners effortless.</p><a class="textlink" href="/residential-epoxy-flooring/">Interior floor coatings</a></div>
        </div>
        <div class="tabs__panel" role="tabpanel" id="p-metal" aria-labelledby="t-metal" hidden>
          <figure>${img('metalSilver', { sizes: '(max-width: 900px) 94vw, 46vw' })}</figure>
          <div><h3>Metallic epoxy flooring</h3><p>Pearlescent pigments are worked by hand into the wet resin, creating soft, flowing patterns that resemble marble or polished stone. Every floor is one of a kind. They make a beautiful statement in a den, foyer, bar nook or craft room, and a satin top layer keeps reflections gentle.</p><a class="textlink" href="/metallic-epoxy-flooring/">Metallic finishes</a></div>
        </div>
      </div>
    </div>
  </section>

  <!-- WHY CHOOSE -->
  <section class="block pillars">
    <div class="container">
      <header class="block__head reveal">
        <p class="kicker">Why choose us</p>
        <h2>Thoughtful work from the first visit to the final walkthrough.</h2>
      </header>
      <div class="pillars__grid">
        <article class="pillar reveal"><span class="pillar__icon pillar__icon--a" aria-hidden="true"></span><h3>Unhurried estimates</h3><p>We visit in person, look at the concrete closely, show you real samples and answer every question. You’ll receive a written estimate that spells out each step and each coat.</p></article>
        <article class="pillar reveal"><span class="pillar__icon pillar__icon--b" aria-hidden="true"></span><h3>Real surface preparation</h3><p>Diamond grinding with vacuum dust collection — never a quick acid wash. Proper prep is what keeps a coating bonded for the long haul.</p></article>
        <article class="pillar reveal"><span class="pillar__icon pillar__icon--c" aria-hidden="true"></span><h3>Respect for your home</h3><p>We protect walls, doors and landscaping, keep dust contained, ventilate during application, and leave the space tidy at the end of every day.</p></article>
        <article class="pillar reveal"><span class="pillar__icon pillar__icon--d" aria-hidden="true"></span><h3>Clear communication</h3><p>You’ll know when we’ll arrive, how long each stage takes, and exactly when you can walk, park and move things back in.</p></article>
      </div>
    </div>
  </section>

  <!-- FULL-WIDTH BANNER -->
  <section class="panorama" style="--pano:url('${bg('golfPalms', 2200)}')">
    <div class="container panorama__inner">
      <p class="kicker kicker--light reveal">Free, no-pressure estimates</p>
      <h2 class="reveal">A floor you’ll enjoy every time the garage door opens.</h2>
      <p class="reveal">Let us take a look. We’ll measure, test the slab and walk you through your options in plain language.</p>
      <div class="panorama__buttons reveal"><a class="button button--light" href="#estimate">Request an estimate</a><a class="button button--ghost" href="tel:${site.phone.tel}">Call ${site.phone.display}</a></div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="block" id="process">
    <div class="container">
      <header class="block__head block__head--center reveal">
        <p class="kicker">Installation process</p>
        <h2>What to expect, step by step.</h2>
        <p>Most garages take one to two days. Larger or more involved projects take a little longer.</p>
      </header>
      <ol class="zigzag">
        <li class="zig reveal"><figure>${img('cactiWall', { sizes: '(max-width: 760px) 94vw, 30vw' })}</figure><div><span class="zig__n">Step 1</span><h3>A visit and a written plan</h3><p>We look at the floor together, check for moisture and old coatings, measure, and show you color samples in your own light. Afterward you receive a written estimate listing the prep work, any repairs and each coat.</p></div></li>
        <li class="zig reveal"><figure>${img('crewPrimer', { sizes: '(max-width: 760px) 94vw, 30vw' })}</figure><div><span class="zig__n">Step 2</span><h3>Grinding and repairs</h3><p>On installation day we protect the surrounding area and grind the concrete with vacuum-equipped equipment. Cracks, chips and low spots are filled and smoothed so they disappear under the finish.</p></div></li>
        <li class="zig reveal"><figure>${img('crewSpikes', { sizes: '(max-width: 760px) 94vw, 30vw' })}</figure><div><span class="zig__n">Step 3</span><h3>Base coat and color</h3><p>A base coat is applied to bond with the concrete. For flake floors, the flakes are broadcast by hand while the base is wet; for solid or metallic floors, the color layer is built and finished.</p></div></li>
        <li class="zig reveal"><figure>${img('crewPour', { sizes: '(max-width: 760px) 94vw, 30vw' })}</figure><div><span class="zig__n">Step 4</span><h3>Protective topcoat</h3><p>After any loose flake is scraped and vacuumed away, a clear topcoat seals the floor. If you’d like extra grip, a fine texture is added at this stage.</p></div></li>
        <li class="zig reveal"><figure>${img('flakeGarage', { sizes: '(max-width: 760px) 94vw, 30vw' })}</figure><div><span class="zig__n">Step 5</span><h3>Walkthrough and care tips</h3><p>We walk the finished floor with you, confirm when you can walk, park and move items back, and leave written care instructions.</p></div></li>
      </ol>
    </div>
  </section>

  <!-- BENEFITS -->
  <section class="block block--tint">
    <div class="container benefits">
      <div class="benefits__lead">
        <p class="kicker reveal">Benefits of professional epoxy flooring</p>
        <h2 class="reveal">Less upkeep, more peace of mind.</h2>
        <p class="reveal">A professionally installed coating changes the day-to-day experience of a space. Here is what our customers tend to appreciate most.</p>
        <figure class="benefits__img img-reveal">${img('garageStorage', { sizes: '(max-width: 900px) 94vw, 36vw' })}</figure>
      </div>
      <ul class="ticks">
        <li class="reveal"><strong>Sweeps clean in minutes.</strong> Dust, leaves and grass clippings sit on top of a sealed floor instead of working into the concrete.</li>
        <li class="reveal"><strong>Resists stains.</strong> Oil, fertilizer, coffee and grill drips wipe up rather than leaving permanent marks.</li>
        <li class="reveal"><strong>Better footing.</strong> Textured flake and grit additives help prevent slips — especially at entries and on wet patios.</li>
        <li class="reveal"><strong>A brighter garage.</strong> Light, reflective floors make it easier to see what you’re doing at the workbench or in the evening.</li>
        <li class="reveal"><strong>No more concrete dust.</strong> Sealing the slab stops the fine gray powder that settles on everything stored nearby.</li>
        <li class="reveal"><strong>Long-lasting.</strong> A properly bonded system holds up for many years, and the topcoat can be refreshed rather than replaced.</li>
        <li class="reveal"><strong>A finished look.</strong> A coated garage or patio makes the whole home feel cared for — a nice touch if you ever decide to sell.</li>
      </ul>
    </div>
  </section>

  <!-- COMMERCIAL & INDUSTRIAL -->
  <section class="block">
    <div class="container">
      <header class="block__head reveal">
        <p class="kicker">Commercial &amp; industrial flooring</p>
        <h2>Floors for the businesses and facilities that serve the community.</h2>
      </header>
      <div class="duo">
        <article class="duo__item reveal">
          <figure>${img('clinic', { sizes: '(max-width: 760px) 94vw, 46vw' })}</figure>
          <h3>Commercial epoxy flooring</h3>
          <p>Medical and dental offices, salons, restaurants, clubhouse kitchens and retail shops all need floors that are hygienic, slip-resistant and quick to clean. Seamless coatings with optional cove bases leave no grout for grime to collect in, and we schedule work for evenings or weekends so you can stay open.</p>
          <a class="textlink" href="/commercial-epoxy-flooring/">Commercial flooring</a>
        </article>
        <article class="duo__item reveal">
          <figure>${img('warehouseModern', { sizes: '(max-width: 760px) 94vw, 46vw' })}</figure>
          <h3>Warehouse &amp; industrial coatings</h3>
          <p>Storage buildings, maintenance shops and distribution spaces along the Grand Avenue corridor and Loop 101 need floors that resist forklift wear, stop dusting and hold clear safety striping. We plan the work in phases around your operations and build heavier systems where the traffic demands it.</p>
          <a class="textlink" href="/warehouse-floor-coatings/">Warehouse coatings</a>
        </article>
      </div>
    </div>
  </section>

  <!-- LOCAL CONSIDERATIONS -->
  <section class="block block--sage">
    <div class="container local">
      <div class="local__intro">
        <p class="kicker kicker--dark reveal">Local flooring considerations</p>
        <h2 class="reveal">A few things we keep in mind in Sun City.</h2>
        <figure class="local__img img-reveal">${img('homesHills', { sizes: '(max-width: 900px) 94vw, 40vw' })}</figure>
      </div>
      <div class="local__list">
        <article class="reveal"><h3>Established concrete</h3><p>Much of Sun City was built from the 1960s onward, so many garage slabs have decades of history: old paint, worn sealers, settled cracks and oil soaked deep into the surface. These floors coat beautifully, but they need thorough grinding and a primer chosen for the conditions. We test before quoting so there are no surprises.</p></article>
        <article class="reveal"><h3>Serious summer heat</h3><p>Low-desert summers regularly push well past 100 degrees, and a closed garage gets hotter still. Heat speeds up how quickly coatings set, so in summer we start early, mix in smaller batches and select products formulated for warm slabs. Topcoats are UV-stable so colors stay true near the door.</p></article>
        <article class="reveal"><h3>Golf carts and charging</h3><p>Carts turn sharply on the same patch of floor every day, and chargers can drip. We build extra durability into that bay and make sure the topcoat is resistant to the chemicals involved.</p></article>
        <article class="reveal"><h3>Dust storms and monsoon rain</h3><p>Summer storms push fine dust under garage doors and drop sudden rain on patios. Sealed, textured surfaces sweep and rinse clean, and keep their grip when wet.</p></article>
        <article class="reveal"><h3>Keeping disruption low</h3><p>We know your home is where you spend your day. Fast-cure systems, lower-odor products and tidy work habits keep the inconvenience to a minimum.</p></article>
      </div>
    </div>
  </section>

  <!-- GALLERY CAROUSEL -->
  <section class="block" id="gallery">
    <div class="container">
      <div class="gallery__head">
        <header class="reveal"><p class="kicker">Project gallery</p><h2>Ideas for your own floor.</h2></header>
        <div class="gallery__nav"><button type="button" aria-label="Previous images" data-gal-prev>‹</button><button type="button" aria-label="Next images" data-gal-next>›</button></div>
      </div>
    </div>
    <div class="gallery" data-gallery tabindex="0" aria-label="Project gallery, scroll horizontally">
      ${[
        ['flakeGarage', 'Gray flake garage floor'],
        ['patioGray', 'Coated patio with seating'],
        ['kitchenMarble', 'Marble-look interior floor'],
        ['garageGym', 'Garage home gym'],
        ['poolDeck', 'Light, textured pool deck'],
        ['mudroom', 'Mudroom with durable flooring'],
        ['metalSilver', 'Silver metallic finish'],
        ['restKitchen', 'Commercial kitchen floor'],
      ].map(([k, c]) => `<figure class="gallery__item">${img(k, { sizes: '(max-width: 760px) 80vw, 30vw' })}<figcaption>${c}</figcaption></figure>`).join('')}
    </div>
  </section>

  <!-- SERVICE AREAS -->
  <section class="block block--tint">
    <div class="container areas">
      <div>
        <p class="kicker reveal">Service areas</p>
        <h2 class="reveal">Serving Sun City and neighboring West Valley communities.</h2>
        <p class="reveal">We’re focused on Sun City and the communities around it, which means shorter drive times and easier scheduling for you. If you’re just outside the list below, please ask — we can often help.</p>
        <a class="textlink reveal" href="/service-areas/">All service areas</a>
      </div>
      <ul class="areas__list">${areas.map((a) => `<li class="reveal"><span>${a.name}</span><small>${esc(a.note)}</small></li>`).join('')}</ul>
    </div>
  </section>

  <!-- FAQ -->
  <section class="block" id="faq">
    <div class="container">
      <header class="block__head block__head--center reveal"><p class="kicker">Frequently asked questions</p><h2>Answers before you ask.</h2></header>
      <div class="faqs">${faqs.map((f) => `<details class="faq reveal"><summary>${esc(f.q)}</summary><p>${md(f.a)}</p></details>`).join('')}</div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="block block--sage" id="estimate">
    <div class="container finale">
      <div class="finale__copy">
        <p class="kicker kicker--dark reveal">Get started</p>
        <h2 class="reveal">Let’s plan your new floor.</h2>
        <p class="reveal">Share a few details and we’ll call to arrange a convenient time to visit. There’s no cost and no obligation — just straightforward advice and a written estimate.</p>
        <p class="finale__phone reveal">Rather talk now? <a href="tel:${site.phone.tel}">${site.phone.display}</a></p>
      </div>
      <div class="finale__form reveal">${leadForm({ id: 'est', title: 'Request your free estimate', details: true })}</div>
    </div>
  </section>
</main>`;

  return head({
    title: 'Sun City Epoxy Flooring | Garage & Patio Coatings, Sun City AZ',
    description: 'Garage floor coatings, golf cart bays, patios and interior epoxy floors in Sun City, AZ. Careful prep, low-odor options and slip-resistant finishes. Free estimates.',
    path: '/',
    schema: [businessSchema(), faqSchema(faqs), { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${site.domain}/` }],
  }) + header('home') + body + footer();
}
