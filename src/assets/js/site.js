/* Sun City Epoxy Flooring — interactions */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Sticky header state */
  var head = $('[data-header]');
  var scrolled = function () { head && head.classList.toggle('is-scrolled', window.scrollY > 30); };
  window.addEventListener('scroll', scrolled, { passive: true }); scrolled();

  /* Services mega menu */
  var megaBtn = $('[data-mega]');
  if (megaBtn) {
    var item = megaBtn.parentElement;
    var setMega = function (open) { item.classList.toggle('is-open', open); megaBtn.setAttribute('aria-expanded', String(open)); };
    megaBtn.addEventListener('click', function (e) { e.stopPropagation(); setMega(!item.classList.contains('is-open')); });
    item.addEventListener('mouseenter', function () { if (window.matchMedia('(hover: hover)').matches) setMega(true); });
    item.addEventListener('mouseleave', function () { if (window.matchMedia('(hover: hover)').matches) setMega(false); });
    document.addEventListener('click', function (e) { if (!item.contains(e.target)) setMega(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && item.classList.contains('is-open')) { setMega(false); megaBtn.focus(); } });
  }

  /* Header estimate panel */
  var estBtn = $('[data-estimate-toggle]'), estPanel = $('[data-estimate-panel]');
  var setEst = function (open) {
    if (!estPanel) return;
    estPanel.classList.toggle('is-open', open);
    $$('[data-estimate-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', String(open)); });
    if (open) setTimeout(function () { var f = $('input', estPanel); f && f.focus({ preventScroll: true }); }, 350);
  };
  if (estBtn && estPanel) {
    estBtn.addEventListener('click', function () { setEst(!estPanel.classList.contains('is-open')); });
    $('[data-estimate-close]').addEventListener('click', function () { setEst(false); estBtn.focus(); });
  }

  /* Mobile drawer */
  var burger = $('[data-burger]'), drawer = $('[data-drawer]');
  if (burger && drawer) burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open)); drawer.hidden = !open;
    if (open) setEst(false);
  });
  /* Mobile: show the estimate form from the drawer area as well */
  if (drawer && estPanel) {
    var li = document.createElement('li');
    li.innerHTML = '<a href="#header-estimate">Free estimate form</a>';
    li.firstChild.addEventListener('click', function (e) { e.preventDefault(); burger.click(); setEst(true); window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); });
    $('ul', drawer).appendChild(li);
  }

  /* Lead forms */
  var tests = {
    name: function (v) { return v.trim().length > 1 ? '' : 'Please tell us your name.'; },
    phone: function (v) { return v.replace(/\D/g, '').length >= 10 ? '' : 'Please enter a 10-digit phone number.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; },
    project: function (v) { return v ? '' : 'Please choose the type of project.'; }
  };
  var validate = function (el) {
    var t = tests[el.name]; if (!t) return true;
    var msg = t(el.value || ''), wrap = el.closest('.qf__field'), out = wrap && $('.qf__err', wrap);
    if (wrap) wrap.classList.toggle('has-error', !!msg);
    if (out) out.textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
    return !msg;
  };
  $$('[data-lead-form]').forEach(function (form) {
    var msg = $('.qf__msg', form);
    $$('input, select', form).forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value) validate(el); });
      el.addEventListener('change', function () { if (el.closest('.has-error')) validate(el); });
      el.addEventListener('input', function () { if (el.closest('.has-error')) validate(el); });
    });
    var tel = $('input[type=tel]', form);
    tel && tel.addEventListener('input', function () {
      var d = tel.value.replace(/\D/g, ''); if (d.length === 11 && d[0] === '1') d = d.slice(1); d = d.slice(0, 10);
      if (d.length >= 7) tel.value = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = $$('input[name], select[name]', form).filter(function (el) { return !validate(el); });
      if (bad.length) { msg.className = 'qf__msg is-err'; msg.textContent = 'A few details need your attention.'; bad[0].focus(); return; }
      var payload = {}; new FormData(form).forEach(function (v, k) { payload[k] = v; }); payload.page = location.pathname;
      form.classList.add('is-busy'); msg.className = 'qf__msg'; msg.textContent = 'Sending your request…';
      fetch(form.getAttribute('action'), { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.ok, j: j }; }, function () { return { ok: false, j: {} }; }); })
        .then(function (res) {
          form.classList.remove('is-busy');
          if (res.ok) { form.classList.add('is-done'); msg.className = 'qf__msg is-ok'; msg.textContent = 'Thank you, ' + payload.name.split(' ')[0] + '. We’ve received your request and will call you within one business day.'; }
          else { msg.className = 'qf__msg is-err'; msg.textContent = res.j.error || 'Sorry — something went wrong. Please try again or give us a call.'; }
        })
        .catch(function () { form.classList.remove('is-busy'); msg.className = 'qf__msg is-err'; msg.textContent = 'We couldn’t send your request. Please check your connection or call us.'; });
    });
  });

  /* Tabs */
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role=tab]', wrap);
    var select = function (tab) {
      tabs.forEach(function (t) { var on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; $('#' + t.getAttribute('aria-controls')).hidden = !on; });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!n) return;
        var next = tabs[(i + n + tabs.length) % tabs.length]; select(next); next.focus();
      });
    });
  });

  /* Gallery carousel buttons */
  var gal = $('[data-gallery]');
  if (gal) {
    var step = function (dir) { var card = $('.gallery__item', gal); gal.scrollBy({ left: dir * (card ? card.offsetWidth + 20 : 400), behavior: reduced ? 'auto' : 'smooth' }); };
    var p = $('[data-gal-prev]'), n = $('[data-gal-next]');
    p && p.addEventListener('click', function () { step(-1); });
    n && n.addEventListener('click', function () { step(1); });
  }

  /* Reveal animations */
  var targets = $$('.reveal, .img-reveal');
  if (reduced || !('IntersectionObserver' in window)) targets.forEach(function (t) { t.classList.add('is-in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) {
      var group = t.parentElement ? $$(':scope > .reveal', t.parentElement) : [];
      var i = group.indexOf(t); if (i > 0) t.style.setProperty('--delay', Math.min(i * 0.07, 0.35) + 's');
      io.observe(t);
    });
  }

  /* Counters */
  if (!reduced && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; co.unobserve(e.target);
        var el = e.target, to = +el.dataset.count, start = null;
        if (!to) return;
        var tick = function (ts) { start = start || ts; var k = Math.min((ts - start) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
        el.textContent = '0'; requestAnimationFrame(tick);
      });
    }, { threshold: 0.7 });
    $$('[data-count]').forEach(function (c) { co.observe(c); });
  }

  /* Parallax on panorama banners */
  var panos = $$('.panorama');
  if (!reduced && panos.length) {
    var busy = false;
    var move = function () {
      panos.forEach(function (el) {
        var r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        el.style.setProperty('--shift', ((r.top + r.height / 2 - innerHeight / 2) * -0.15).toFixed(1) + 'px');
      });
      busy = false;
    };
    window.addEventListener('scroll', function () { if (!busy) { busy = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }
})();
