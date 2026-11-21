/* Kedr — вход и облачный прогресс (Firebase). 22.11.2026
   Пока в FIREBASE_CONFIG стоит заглушка, файл ничего не делает: сайт работает как раньше. */
(function () {
  const FIREBASE_CONFIG = {
    apiKey:"AIzaSyDGqiZJC3tl0zFpvGCL7XfQMd_3btpPZZE",
    authDomain: "cedar-phy.firebaseapp.com",
    projectId:"cedar-phy",
    appId:"1:554571166525:web:d902825ed39c5b2a344b54"
  };
  const REQUIRE_LOGIN = true;              // false — вход по желанию
  const SYNC_KEYS = ['kedr-seen','kedr-solved','kedr-rating','kedr-planted','kedr-welcomed','kedr-last-stage','kedr-heard','kedr-unit','kedr-last'];
  const LOG_KEYS = { 'kedr-seen': 'open', 'kedr-solved': 'solved', 'kedr-rating': 'rating' };

  if (!window.firebase || !FIREBASE_CONFIG.apiKey) return;
  firebase.initializeApp(FIREBASE_CONFIG);
  const auth = firebase.auth(), db = firebase.firestore();
  const FV = firebase.firestore.FieldValue;
  const rawSet = Storage.prototype.setItem, rawGet = Storage.prototype.getItem;
  const J = s => { try { return JSON.parse(s); } catch (e) { return s; } };
  let uid = null, pushTimer = null;

  // ---------- экран входа ----------
  const css = document.createElement('style');
  css.textContent = `
  html.kedr-locked body > *:not(#kedr-login){visibility:hidden}
  #kedr-login{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#f7f5ef;font-family:inherit}
  #kedr-login .box{width:min(360px,90vw);background:#fff;border-radius:14px;padding:28px;box-shadow:0 6px 30px #0002}
  #kedr-login h2{margin:0 0 6px;font-size:22px} #kedr-login p{margin:0 0 16px;color:#555;font-size:14px}
  #kedr-login input{width:100%;box-sizing:border-box;padding:10px;margin:0 0 8px;border:1px solid #ccc;border-radius:8px;font-size:15px}
  #kedr-login button{width:100%;padding:11px;border:0;border-radius:8px;font-size:15px;cursor:pointer;margin-top:4px}
  #kedr-login .g{background:#1f6f4a;color:#fff} #kedr-login .e{background:#e8e4d8}
  #kedr-login .sw{background:none;color:#1f6f4a;font-size:13px} #kedr-login .err{color:#b00;font-size:13px;min-height:16px}
  #kedr-login .or{text-align:center;color:#999;font-size:12px;margin:12px 0}
  #kedr-chip{position:fixed;top:8px;right:10px;z-index:9999;font-size:12px;background:#fffd;border:1px solid #ddd;border-radius:14px;padding:3px 10px}
  #kedr-chip a{color:#1f6f4a;cursor:pointer;margin-left:6px}
  #kedr-chip.inbar{position:static;white-space:nowrap;max-width:220px;overflow:hidden;text-overflow:ellipsis;background:none;border:0;padding:0;font-size:13px;color:#666}`;
  document.head.appendChild(css);
  if (REQUIRE_LOGIN) document.documentElement.classList.add('kedr-locked');

  function showLogin() {
    if (document.getElementById('kedr-login')) return;
    const d = document.createElement('div'); d.id = 'kedr-login';
    d.innerHTML = `<div class="box"><h2>Kedr Physics</h2><p>Войдите, чтобы прогресс сохранялся на любом устройстве.</p>
      <button class="g" id="kl-g">Войти через Google</button>
      <div class="or">или по почте</div>
      <input id="kl-name" placeholder="Имя и фамилия" style="display:none">
      <input id="kl-mail" type="email" placeholder="Почта">
      <input id="kl-pass" type="password" placeholder="Пароль (от 6 символов)">
      <div class="err" id="kl-err"></div>
      <button class="e" id="kl-go">Войти</button>
      <button class="sw" id="kl-sw">Нет аккаунта? Зарегистрироваться</button></div>`;
    const mount = () => document.body.appendChild(d);
    document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);
    let reg = false; const $ = id => d.querySelector('#' + id);
    const err = e => { $('kl-err').textContent = ({'auth/invalid-credential':'Неверная почта или пароль','auth/email-already-in-use':'Эта почта уже зарегистрирована — войдите','auth/weak-password':'Пароль короче 6 символов','auth/invalid-email':'Неверная почта'})[e.code] || e.message; };
    $('kl-g').onclick = () => { const g = new firebase.auth.GoogleAuthProvider(); auth.signInWithPopup(g).catch(e => (/popup-blocked|operation-not-supported/.test(e.code) ? auth.signInWithRedirect(g) : err(e))); };
    $('kl-sw').onclick = () => { reg = !reg; $('kl-name').style.display = reg ? '' : 'none'; $('kl-go').textContent = reg ? 'Зарегистрироваться' : 'Войти'; $('kl-sw').textContent = reg ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'; };
    $('kl-go').onclick = async () => {
      const m = $('kl-mail').value.trim(), p = $('kl-pass').value, n = $('kl-name').value.trim();
      try {
        if (reg) { if (!n) return $('kl-err').textContent = 'Напишите имя';
          const c = await auth.createUserWithEmailAndPassword(m, p); await c.user.updateProfile({ displayName: n });
          await db.doc('users/' + c.user.uid).set({ name: n }, { merge: true }); }
        else await auth.signInWithEmailAndPassword(m, p);
      } catch (e) { err(e); }
    };
  }
  function unlock(user) {
    document.documentElement.classList.remove('kedr-locked');
    const l = document.getElementById('kedr-login'); if (l) l.remove();
    const chip = () => { if (document.getElementById('kedr-chip')) return; const c = document.createElement('div'); c.id = 'kedr-chip';
      c.innerHTML = `${(user.displayName || user.email || '').replace(/</g,'')} <a>выйти</a>`;
      c.querySelector('a').onclick = () => auth.signOut().then(() => location.reload());
      const bar = document.querySelector('header.bar'), at = bar && bar.querySelector('.spacer');
      if (at) { c.classList.add('inbar'); at.after(c); } else document.body.appendChild(c); };
    document.body ? chip() : document.addEventListener('DOMContentLoaded', chip);
  }

  // ---------- синхронизация ----------
  function localProgress() { const o = {}; SYNC_KEYS.forEach(k => { const v = rawGet.call(localStorage, k); if (v != null) o[k] = v; }); return o; }
  function merge(k, a, b) { // a — облако, b — устройство (строки)
    if (a == null) return b; if (b == null) return a;
    const A = J(a), B = J(b);
    if (A && B && typeof A === 'object' && typeof B === 'object' && !Array.isArray(A)) {
      const r = Object.assign({}, A, B);
      if (k === 'kedr-rating') Object.keys(A).forEach(i => { if ((A[i] || 0) > (B[i] || 0)) r[i] = A[i]; });
      return JSON.stringify(r);
    }
    return b;
  }
  function push() {
    if (!uid) return; clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
      const p = localProgress(), solved = J(p['kedr-solved'] || '{}') || {}, seen = J(p['kedr-seen'] || '{}') || {};
      db.doc('users/' + uid).set({ progress: p, nSolved: Object.keys(solved).length, nSeen: Object.keys(seen).length,
        lastActive: FV.serverTimestamp() }, { merge: true }).catch(() => {});
    }, 1500);
  }
  Storage.prototype.setItem = function (k, v) {
    if (this === localStorage && uid && LOG_KEYS[k]) {
      const was = J(rawGet.call(this, k) || '{}') || {}, now = J(v) || {};
      Object.keys(now).forEach(id => { if (was[id] !== now[id])
        db.collection('users/' + uid + '/events').add({ t: FV.serverTimestamp(), type: LOG_KEYS[k], id, v: now[id], page: location.hash }).catch(() => {}); });
    }
    rawSet.call(this, k, v);
    if (this === localStorage && SYNC_KEYS.includes(k)) push();
  };
  const rawRemove = Storage.prototype.removeItem;
  Storage.prototype.removeItem = function (k) { rawRemove.call(this, k); if (this === localStorage && SYNC_KEYS.includes(k)) push(); };

  auth.onAuthStateChanged(async user => {
    if (!user) { uid = null; if (REQUIRE_LOGIN) showLogin(); return; }
    const ref = db.doc('users/' + user.uid);
    try {
      const snap = await ref.get(), data = snap.exists ? snap.data() : {};
      // другой ученик на этом устройстве — его прогресс не смешиваем
      const owner = rawGet.call(localStorage, 'kedr-owner');
      if (owner && owner !== user.uid) SYNC_KEYS.forEach(k => rawRemove.call(localStorage, k));
      rawSet.call(localStorage, 'kedr-owner', user.uid);
      const cloud = data.progress || {}, local = localProgress(); let changed = false;
      SYNC_KEYS.forEach(k => { const m = merge(k, cloud[k], local[k]); if (m != null && m !== local[k]) { rawSet.call(localStorage, k, m); changed = true; } });
      const first = !sessionStorage.getItem('kedr-visit');
      await ref.set({ name: data.name || user.displayName || '', email: user.email || '',
        createdAt: data.createdAt || FV.serverTimestamp(), lastSeen: FV.serverTimestamp(),
        visits: FV.increment(first ? 1 : 0), device: navigator.userAgent.slice(0, 120) }, { merge: true });
      sessionStorage.setItem('kedr-visit', '1');
      uid = user.uid; push();
      if (changed && !sessionStorage.getItem('kedr-synced')) { sessionStorage.setItem('kedr-synced', '1'); location.reload(); return; }
    } catch (e) { console.warn('Kedr sync', e); uid = user.uid; }
    unlock(user);
  });
})();
