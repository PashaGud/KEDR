/* KEDR — "Spotted a mistake?" feedback pin (18.11.2026).
   A round button sits in the bottom-right corner. Drag it onto the place that looks wrong (or just click it),
   write a comment, press Send. The comment goes to Pavel's Google Form → Google Sheet; the student never sees the form.
   Fields: comment (typed), place (filled automatically: page, problem number, part, nearby text, position),
   technical (URL, time, device), name (optional). */
(function () {
  var FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSf0Q6cCYABAvUj7cU88NKzo0RGgcTfSi2syiMwGhJ71KQ8Brg/formResponse';
  var F = { comment: 'entry.797529445', place: 'entry.1713236543', tech: 'entry.2090406889', name: 'entry.1296679076' };
  var QKEY = 'kedr-feedback-queue';

  var css = document.createElement('style');
  css.textContent =
    '.fb-btn{position:fixed;right:22px;bottom:22px;z-index:9000;width:52px;height:52px;border-radius:50%;background:#5a3d2b;color:#fdf6e8;' +
    'display:flex;align-items:center;justify-content:center;font-size:22px;cursor:grab;box-shadow:0 4px 14px rgba(51,41,31,.28);touch-action:none;user-select:none;-webkit-user-select:none;border:3px solid #fdf6e8;transition:transform .15s}' +
    '.fb-btn:hover{transform:scale(1.07)}.fb-btn.drag{cursor:grabbing;transform:scale(1.15);opacity:.92}' +
    '.fb-tip{position:fixed;right:84px;bottom:34px;z-index:9000;background:#33291f;color:#fdf6e8;font:600 12.5px/1.3 system-ui,sans-serif;padding:6px 10px;border-radius:8px;pointer-events:none;opacity:0;transition:opacity .2s;white-space:nowrap}' +
    '.fb-btn:hover + .fb-tip{opacity:1}' +
    '.fb-pin{position:absolute;z-index:8999;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:#c15b38;border:3px solid #fdf6e8;box-shadow:0 0 0 2px #c15b38,0 3px 8px rgba(0,0,0,.25);pointer-events:none}' +
    '.fb-box{position:fixed;z-index:9001;width:300px;max-width:calc(100vw - 24px);background:#fffaf0;border:1.5px solid #d8cdb4;border-radius:14px;box-shadow:0 10px 30px rgba(51,41,31,.25);padding:14px;font:14px/1.4 system-ui,sans-serif;color:#33291f}' +
    '.fb-box h4{margin:0 0 4px;font-size:15px}.fb-box .fb-where{font-size:12px;color:#8a7d66;margin:0 0 8px;max-height:3.6em;overflow:hidden}' +
    '.fb-box textarea{width:100%;box-sizing:border-box;height:90px;border:1px solid #d8cdb4;border-radius:8px;padding:8px;font:14px/1.4 system-ui,sans-serif;resize:vertical;background:#fff}' +
    '.fb-box input{width:100%;box-sizing:border-box;margin-top:6px;border:1px solid #d8cdb4;border-radius:8px;padding:7px 8px;font:13px system-ui,sans-serif;background:#fff}' +
    '.fb-row{display:flex;gap:8px;justify-content:flex-end;margin-top:10px}' +
    '.fb-row button{border:0;border-radius:999px;padding:7px 14px;font:600 13px system-ui,sans-serif;cursor:pointer}' +
    '.fb-send{background:#5a3d2b;color:#fdf6e8}.fb-send:disabled{opacity:.5;cursor:default}.fb-cancel{background:#efe8d8;color:#33291f}' +
    '.fb-ok{font-weight:600;color:#4a7c59;margin-top:8px}';
  document.head.appendChild(css);

  var btn = document.createElement('div');
  btn.className = 'fb-btn'; btn.innerHTML = '💬'; btn.setAttribute('role', 'button');
  btn.setAttribute('aria-label', 'Spotted a mistake? Drag me onto it, or click to write');
  var tip = document.createElement('div'); tip.className = 'fb-tip'; tip.textContent = 'Spotted a mistake? Drag me onto it';
  document.body.appendChild(btn); document.body.appendChild(tip);

  var pin = null, box = null;
  function frames() { return Array.prototype.slice.call(document.querySelectorAll('iframe')); }
  function txt(s, n) { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n) + '…' : s; }

  /* what is under the point (x, y in viewport coords), looking inside same-site iframes (theory cards) */
  function describe(x, y) {
    var doc = document, el = document.elementFromPoint(x, y), inFrame = null, ox = 0, oy = 0;
    if (el && el.tagName === 'IFRAME') {
      try { var r = el.getBoundingClientRect(); inFrame = el; ox = r.left; oy = r.top; doc = el.contentDocument; el = doc.elementFromPoint(x - ox, y - oy); } catch (e) { }
    }
    var info = {};
    var num = document.querySelector('.pp-num'); if (num && !inFrame) info.problem = num.textContent.trim();
    var uid = document.querySelector('.pp-uid'); if (uid && !inFrame) info.id = uid.textContent.trim();
    if (inFrame) info.theory = inFrame.getAttribute('title') || inFrame.getAttribute('src');
    if (el) {
      var block = el.closest && el.closest('#xSt,#xSol,#xAns,#xSketch,.pp-what,.pp-block');
      if (block) info.block = block.id === 'xSt' ? 'statement' : block.id === 'xSol' ? 'solution' : block.id === 'xAns' ? 'answer' : block.id === 'xSketch' ? 'sketch' : block.classList.contains('pp-what') ? 'what if' : 'block';
      var li = el.closest && el.closest('li'); if (li) { var b = li.querySelector('b'); if (b && /^\(/.test(b.textContent)) info.part = b.textContent.trim(); }
      var fig = el.closest && el.closest('figure,svg,img'); if (fig) info.figure = (fig.querySelector && fig.querySelector('img') ? fig.querySelector('img').getAttribute('src') : (fig.getAttribute('src') || 'picture'));
      // nearest heading above (theory sections)
      var hs = doc.querySelectorAll('h1,h2,h3'), best = null, ey = el.getBoundingClientRect().top;
      for (var i = 0; i < hs.length; i++) { if (hs[i].getBoundingClientRect().top <= ey + 2) best = hs[i]; }
      if (best) info.section = txt(best.textContent, 80);
      var t = el; while (t && txt(t.innerText || t.textContent, 400).length < 25 && t.parentElement) t = t.parentElement;
      info.text = txt(t && (t.innerText || t.textContent), 220);
    }
    info.page = location.hash || '#home';
    var sx = inFrame ? (doc.defaultView.scrollX || 0) : window.scrollX, sy = inFrame ? (doc.defaultView.scrollY || 0) : window.scrollY;
    info.pos = 'x ' + Math.round(x - ox + sx) + ', y ' + Math.round(y - oy + sy) + (inFrame ? ' (inside the theory card)' : '');
    return info;
  }
  function placeText(i) {
    var a = [];
    if (i.problem) a.push('Problem ' + i.problem + (i.id ? ' (' + i.id + ')' : ''));
    if (i.theory) a.push('Theory: ' + i.theory);
    if (i.block) a.push('Block: ' + i.block);
    if (i.part) a.push('Part ' + i.part);
    if (i.section) a.push('Section: ' + i.section);
    if (i.figure) a.push('Figure: ' + i.figure);
    if (i.text) a.push('Near: "' + i.text + '"');
    a.push('Page ' + i.page + ', position ' + i.pos);
    return a.join('\n');
  }
  function techText() {
    return [location.href, new Date().toISOString(), navigator.userAgent,
      'screen ' + screen.width + '×' + screen.height + ', window ' + innerWidth + '×' + innerHeight].join('\n');
  }

  /* queue: kept in the browser until sent (Google does not tell the page whether a send arrived) */
  function load() { try { return JSON.parse(localStorage.getItem(QKEY) || '[]'); } catch (e) { return []; } }
  function save(q) { try { localStorage.setItem(QKEY, JSON.stringify(q)); } catch (e) { } }
  function post(item) {
    var body = new URLSearchParams(); body.append(F.comment, item.comment); body.append(F.place, item.place); body.append(F.tech, item.tech); if (item.name) body.append(F.name, item.name);
    return fetch(FORM, { method: 'POST', mode: 'no-cors', body: body });
  }
  function flush() {
    var q = load(); if (!q.length || !navigator.onLine) return;
    q.forEach(function (item) { post(item).then(function () { save(load().filter(function (x) { return x.t !== item.t; })); }).catch(function () { }); });
  }
  addEventListener('online', flush); setTimeout(flush, 3000);

  function close() { if (box) box.remove(); if (pin) pin.remove(); box = pin = null; }
  function open(x, y, info) {
    close();
    if (x != null) { pin = document.createElement('div'); pin.className = 'fb-pin'; pin.style.left = (x + scrollX) + 'px'; pin.style.top = (y + scrollY) + 'px'; document.body.appendChild(pin); }
    box = document.createElement('div'); box.className = 'fb-box';
    var where = [info.problem && ('Problem ' + info.problem), info.part && ('part ' + info.part), info.theory, info.section, info.block].filter(Boolean).join(' · ') || 'this page';
    box.innerHTML = '<h4>What is wrong here?</h4><div class="fb-where"></div>' +
      '<textarea placeholder="A mistake, something unclear, a typo… Write it in any language."></textarea>' +
      '<input placeholder="Your name (optional)">' +
      '<div class="fb-row"><button class="fb-cancel">Cancel</button><button class="fb-send">Send</button></div>';
    box.querySelector('.fb-where').textContent = 'Place: ' + where + (info.text ? ' — "' + txt(info.text, 70) + '"' : '');
    document.body.appendChild(box);
    var bw = box.offsetWidth, bh = box.offsetHeight, px = x == null ? innerWidth - bw - 24 : Math.min(Math.max(12, x + 14), innerWidth - bw - 12), py = x == null ? innerHeight - bh - 90 : Math.min(Math.max(12, y + 14), innerHeight - bh - 12);
    box.style.left = px + 'px'; box.style.top = py + 'px';
    var ta = box.querySelector('textarea'), nm = box.querySelector('input'), send = box.querySelector('.fb-send');
    try { nm.value = localStorage.getItem('kedr-feedback-name') || ''; } catch (e) { }
    ta.focus();
    box.querySelector('.fb-cancel').onclick = close;
    send.onclick = function () {
      var c = ta.value.trim(); if (!c) { ta.focus(); return; }
      var item = { t: Date.now(), comment: c, place: placeText(info), tech: techText(), name: nm.value.trim() };
      try { localStorage.setItem('kedr-feedback-name', item.name); } catch (e) { }
      var q = load(); q.push(item); save(q);
      send.disabled = true; send.textContent = 'Sending…';
      post(item).then(function () { save(load().filter(function (x) { return x.t !== item.t; })); }).catch(function () { });
      box.querySelector('.fb-row').outerHTML = '<div class="fb-ok">Thank you! Pavel will see it and fix it.</div>';
      setTimeout(close, 1800);
    };
  }

  /* drag the button (mouse or finger); a short tap opens the box for the whole page */
  var start = null, moved = false;
  btn.addEventListener('pointerdown', function (e) {
    start = { x: e.clientX, y: e.clientY }; moved = false; btn.setPointerCapture(e.pointerId);
    frames().forEach(function (f) { f.style.pointerEvents = 'none'; });
  });
  btn.addEventListener('pointermove', function (e) {
    if (!start) return;
    if (!moved && Math.abs(e.clientX - start.x) + Math.abs(e.clientY - start.y) < 6) return;
    moved = true; btn.classList.add('drag');
    btn.style.left = (e.clientX - 26) + 'px'; btn.style.top = (e.clientY - 26) + 'px'; btn.style.right = 'auto'; btn.style.bottom = 'auto';
  });
  btn.addEventListener('pointerup', function (e) {
    if (!start) return; start = null;
    btn.classList.remove('drag'); btn.style.left = btn.style.top = ''; btn.style.right = btn.style.bottom = '';
    frames().forEach(function (f) { f.style.pointerEvents = ''; });
    btn.style.visibility = 'hidden';
    var info = moved ? describe(e.clientX, e.clientY) : describe(innerWidth / 2, 80);
    btn.style.visibility = '';
    if (moved) open(e.clientX, e.clientY, info); else { info.text = ''; info.pos = 'whole page'; open(null, null, info); }
  });
  addEventListener('hashchange', close);
})();
