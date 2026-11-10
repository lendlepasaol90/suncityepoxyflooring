/**
 * Cloudflare Worker for suncityepoxyflooring.com
 * - Serves the static site from ./public (ASSETS binding)
 * - Handles lead form submissions at POST /api/lead
 *
 * Lead delivery (configure at least one in Cloudflare → Worker → Settings → Variables):
 *   LEAD_WEBHOOK_URL   any HTTPS endpoint that accepts JSON (Zapier, Make, n8n, Google Apps Script, CRM…)
 *   RESEND_API_KEY + LEAD_TO_EMAIL (+ optional LEAD_FROM_EMAIL)   email delivery through Resend
 * Every submission is also written to the Worker logs.
 */
const SITE = 'Sun City Epoxy Flooring';
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

const clean = (v, max = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

function validate(d) {
  const errors = {};
  if (clean(d.name).length < 2) errors.name = 'Please enter your name.';
  if (clean(d.phone).replace(/\D/g, '').length < 10) errors.phone = 'Please enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean(d.email))) errors.email = 'Please enter a valid email address.';
  if (!clean(d.project)) errors.project = 'Please choose a project type.';
  return errors;
}

async function deliver(lead, env) {
  const tasks = [];
  if (env.LEAD_WEBHOOK_URL) {
    tasks.push(fetch(env.LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(lead) }));
  }
  if (env.RESEND_API_KEY && env.LEAD_TO_EMAIL) {
    const text = Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join('\n');
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL || `${SITE} <leads@suncityepoxyflooring.com>`,
          to: env.LEAD_TO_EMAIL.split(',').map((s) => s.trim()),
          reply_to: lead.email,
          subject: `New estimate request: ${lead.project} — ${lead.name}`,
          text,
        }),
      })
    );
  }
  const results = await Promise.allSettled(tasks);
  return { configured: tasks.length > 0, failed: results.filter((r) => r.status === 'rejected' || (r.value && !r.value.ok)).length };
}

async function handleLead(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);
  const type = request.headers.get('content-type') || '';
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  let data = {};
  try {
    if (type.includes('application/json')) data = await request.json();
    else data = Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, error: 'Invalid submission.' }, 400);
  }
  // Honeypot: bots fill hidden fields. Pretend success.
  if (clean(data.company_website)) return wantsJson ? json({ ok: true }) : Response.redirect(new URL('/contact-us/?sent=1', request.url), 303);

  const errors = validate(data);
  if (Object.keys(errors).length) return json({ ok: false, error: 'Please check the highlighted fields.', fields: errors }, 422);

  const lead = {
    site: SITE,
    name: clean(data.name, 80),
    phone: clean(data.phone, 30),
    email: clean(data.email, 120),
    project: clean(data.project, 80),
    message: clean(data.message, 1500),
    page: clean(data.page, 120),
    submitted_at: new Date().toISOString(),
    ip_country: request.cf?.country || '',
  };
  console.log('LEAD', JSON.stringify(lead));
  const result = await deliver(lead, env);
  if (result.configured && result.failed) {
    return json({ ok: false, error: 'We could not send your request right now. Please call us.' }, 502);
  }
  return wantsJson ? json({ ok: true }) : Response.redirect(new URL('/contact-us/?sent=1', request.url), 303);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/api/lead') return handleLead(request, env);
    return env.ASSETS.fetch(request);
  },
};
