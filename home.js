// ============================================================
//  KEDR — home: the student's own cedar + the forester's welcome.
//  Progress lives in this browser only (no accounts yet).
// ============================================================
(function(){
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs, parent, text) => { const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; if (parent) parent.appendChild(e); return e; };
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
};

/* ---------- the forester's words (Pavel's story, v2 · 28 Oct) ---------- */
//  dog: Archik's pose on that panel ('stand' | 'look' | 'sit' | 'lie' | 'jump')
//  shovel: true → the shovel stands in the ground on that panel · rabbits: true → two rabbits run off
const WELCOME = [
  { dog: 'jump', pose: 'wave',  text: "Hello, my dear friend. You came here for the loveliest reason: curiosity about how this world works. (Or maybe a physics exam is stepping on your toes. That's fine too.)" },
  { dog: 'sit', pose: 'think', text: "Don't take me for a teacher or a tutor. I'm not one. Think of me as a friendly neighbour, or an older brother who can give you some advice." },
  { dog: 'look', pose: 'point', text: "I know a bit of physics and maths, and a few tips on how to start and what to watch out for. I live up in the Russian mountains, with my lovely dog, Archik." },
  { dog: 'lie', pose: 'think', text: "Do you trust me, kid? I've walked this road myself. The hardest part is that you don't see progress quickly. It comes after months, sometimes years." },
  { dog: 'sit', pose: 'think', text: "But when it comes, it puts a smile on your face. It means you were patient enough to see it. Oh, so many got scared and left before that moment. So patience is our key." },
  { dog: 'look', pose: 'wave',  text: "Whenever you feel your patience getting weak, or even lost, come to me and we'll find it again. Keys are my thing." },
  { dog: 'stand', dogFlip: true, pose: 'point', rabbits: true, text: "In Russia we say: chase two rabbits, and you'll catch neither. Meaning: focus on one thing." },
  { dog: 'beg', pose: 'offer', shovel: true, text: "We'll do the opposite. Alongside your learning, I'll ask you to do one more thing." },
  { dog: 'stand', pose: 'offer', shovel: true, text: "Here's a seedling of the most majestic tree there is, if you ask me: a cedar. You, me and Archik will plant it together, and you'll look after it." },
];

/* ---------- what the forester says later, as the student moves on ----------
   Each speech plays once, on the home screen, the first time its condition holds.
   when(n) gets the number of solved problems. Add new speeches to the end. */
const SPEECHES = [
  { id: 'how-to-grow', when: n => true,
    text: "Here's how we look after it. Read a theory card, solve a problem, tick it. Every problem you truly solve helps your cedar grow." },
];

/* ---------- growth stages ---------- */
//  share = part of all kinematics problems SOLVED (0 … 1); "first" = at least one solved
const STAGES = [
  { share: 0,    name: 'Just planted',  note: 'a tiny sprout in fresh soil' },
  { share: 'first', name: 'Seedling',   note: 'your first problem solved — it has started' },
  { share: .15,  name: 'Sapling',       note: 'first real branches' },
  { share: .35,  name: 'Young cedar',   note: 'taller than Archik now' },
  { share: .65,  name: 'Tall cedar',    note: 'the first cones are coming' },
  { share: 1,    name: 'Kinematics cedar', note: 'every kinematics problem solved — full grown' },
];

/* ---------- drawing helpers ---------- */
function clump(g, cx, cy, w, h){
  const grp = el('g', {}, g); const n = Math.max(3, Math.round(w / 16));
  [['#2c4334', 6, 0], ['#3f5e47', 0, -2], ['#5b7d5c', -6, -4]].forEach(([c, dy], li) => {
    for (let i = 0; i < n; i++){
      const t = i / (n - 1), arch = Math.sin(Math.PI * t), x = cx - w/2 + t*w + (rnd() - .5) * 6;
      const r = (h * .35 + arch * h * .35) * (1 - li * .18) * (.8 + rnd() * .3);
      if (li === 2 && rnd() < .45) continue;
      el('circle', { cx: x, cy: cy - arch * h * .35 + dy + (rnd() - .5) * 4, r }, grp).setAttribute('fill', c);
    }
  });
  for (let i = 0; i < n * 4; i++){
    const t = rnd(), x = cx - w/2 + t*w, y = cy - Math.sin(Math.PI*t) * h * .5 + (rnd() - .3) * h * .5, a = -Math.PI/2 + (rnd() - .5) * 2.2, L = 5 + rnd() * 7;
    el('line', { x1: x, y1: y, x2: x + Math.cos(a)*L, y2: y + Math.sin(a)*L, stroke: rnd() < .5 ? '#6f9070' : '#22362a', 'stroke-width': 1.2, 'stroke-linecap': 'round' }, grp);
  }
}
function cone(g, x, y){
  const c = el('g', { transform: `translate(${x} ${y}) rotate(${(rnd()-.5)*30})` }, g);
  el('ellipse', { cx: 0, cy: 0, rx: 5, ry: 8, fill: '#8a5a32' }, c);
  el('path', { d: 'M-4 -2 Q0 1 4 -2 M-4 3 Q0 6 4 3', stroke: '#5b3a20', 'stroke-width': .9, fill: 'none' }, c);
}
// a cedar of a given stage, standing at (x, y)
function cedar(g, x, y, stage, seen){
  seed = 31;
  const grp = el('g', { class: 'cedar' }, g);
  el('ellipse', { cx: x, cy: y + 4, rx: 34 + stage * 10, ry: 7, fill: '#4f6a45', opacity: .55 }, grp);
  if (stage === 0){
    el('path', { d: `M${x-18} ${y+2} Q${x} ${y-12} ${x+18} ${y+2} Z`, fill: '#6a4c38' }, grp);
    el('line', { x1: x, y1: y-6, x2: x, y2: y-26, stroke: '#5b4030', 'stroke-width': 2.2 }, grp);
    for (let i = 0; i < 7; i++){ const a = -Math.PI/2 + (i-3) * .32; el('line', { x1: x, y1: y-24, x2: x + Math.cos(a)*12, y2: y-24 + Math.sin(a)*12, stroke: '#4f7a52', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, grp); }
    return grp;
  }
  const H = [0, 70, 150, 250, 350, 420][stage], tiers = [0, 2, 4, 6, 8, 9][stage], W = [0, 60, 120, 190, 260, 300][stage];
  el('path', { d: `M${x - 3 - stage*2} ${y} C ${x-2} ${y-H*.5}, ${x-1} ${y-H*.8}, ${x} ${y-H} L ${x+1} ${y-H} C ${x+2} ${y-H*.8}, ${x+3} ${y-H*.5}, ${x + 3 + stage*2} ${y} Z`, fill: '#5b4030' }, grp);
  for (let i = 0; i < tiers; i++){
    const t = i / Math.max(1, tiers - 1), ty = y - H * (.25 + .7 * t), w = W * (1 - .7 * t), side = i % 2 ? 1 : -1;
    clump(grp, x + side * w * .12, ty, w, 26 + (1 - t) * 30 * (stage / 5));
  }
  if (stage >= 4){ const n = Math.min(14, Math.max(3, Math.round(seen / 4))); for (let i = 0; i < n; i++){ const t = rnd(); cone(grp, x + (rnd() - .5) * W * (1 - .6*t) * .7, y - H * (.3 + .55 * t) + 18); } }
  return grp;
}

/* ---------- the forester (placeholder drawing) ---------- */
function forester(g, x, y, pose, s){
  const f = el('g', { transform: `translate(${x} ${y}) scale(${s || 1})` }, g);
  // stump
  el('path', { d: 'M-46 0 L-42 -52 L42 -52 L46 0 Z', fill: '#7a5a43' }, f);
  el('ellipse', { cx: 0, cy: -52, rx: 42, ry: 11, fill: '#c9a77d' }, f);
  [26, 17, 8].forEach(r => el('ellipse', { cx: 0, cy: -52, rx: r, ry: r * .26, fill: 'none', stroke: '#a3805b', 'stroke-width': 1 }, f));
  // cane
  el('path', { d: 'M58 0 L46 -118 Q44 -132 56 -132', fill: 'none', stroke: '#4a3424', 'stroke-width': 4.5, 'stroke-linecap': 'round' }, f);
  // legs + boots
  el('path', { d: 'M-18 -58 L-30 -8 M14 -58 L22 -8', stroke: '#3b3f35', 'stroke-width': 15, 'stroke-linecap': 'round' }, f);
  el('ellipse', { cx: -34, cy: -3, rx: 14, ry: 7, fill: '#2a2018' }, f); el('ellipse', { cx: 26, cy: -3, rx: 14, ry: 7, fill: '#2a2018' }, f);
  // body (jacket)
  el('path', { d: 'M-30 -60 Q-34 -128 0 -136 Q34 -128 30 -60 Z', fill: '#4f6a45' }, f);
  el('path', { d: 'M0 -134 L0 -62', stroke: '#3c5235', 'stroke-width': 2 }, f);
  el('rect', { x: -24, y: -104, width: 14, height: 10, rx: 2, fill: '#3c5235' }, f);
  // arms
  const armR = { wave: 'M22 -124 Q48 -150 54 -180', offer: 'M22 -122 Q56 -110 76 -112', think: 'M22 -122 Q34 -100 14 -150', point: 'M22 -124 Q60 -140 86 -150' }[pose] || 'M22 -122 Q40 -96 46 -86';
  el('path', { d: 'M-22 -122 Q-40 -96 -30 -78', stroke: '#4f6a45', 'stroke-width': 13, fill: 'none', 'stroke-linecap': 'round' }, f);
  el('path', { d: armR, stroke: '#4f6a45', 'stroke-width': 13, fill: 'none', 'stroke-linecap': 'round' }, f);
  const hand = { wave: [54, -182], offer: [78, -112], think: [14, -152], point: [88, -151] }[pose] || [46, -84];
  el('circle', { cx: hand[0], cy: hand[1], r: 7, fill: '#e2b48c' }, f);
  // head, beard, hat
  el('circle', { cx: 0, cy: -158, r: 20, fill: '#e2b48c' }, f);
  el('path', { d: 'M-17 -154 Q-16 -128 0 -126 Q16 -128 17 -154 Q8 -146 0 -147 Q-8 -146 -17 -154 Z', fill: '#7b5a3e' }, f);
  el('circle', { cx: -7, cy: -162, r: 2, fill: '#2a2018' }, f); el('circle', { cx: 7, cy: -162, r: 2, fill: '#2a2018' }, f);
  el('ellipse', { cx: 0, cy: -174, rx: 36, ry: 7, fill: '#5b4030' }, f);
  el('path', { d: 'M-20 -175 Q-18 -200 0 -200 Q18 -200 20 -175 Z', fill: '#6a4c38' }, f);
  el('rect', { x: -20, y: -182, width: 40, height: 5, fill: '#3b2a1e' }, f);
  // what's in the hand
  if (pose === 'offer'){
    const sx = hand[0] + 4, sy = hand[1] - 4;
    el('ellipse', { cx: sx, cy: sy + 6, rx: 11, ry: 9, fill: '#a9876a' }, f);
    el('line', { x1: sx, y1: sy, x2: sx, y2: sy - 30, stroke: '#5b4030', 'stroke-width': 2 }, f);
    for (let i = 0; i < 7; i++){ const a = -Math.PI/2 + (i-3) * .33; el('line', { x1: sx, y1: sy - 28, x2: sx + Math.cos(a)*13, y2: sy - 28 + Math.sin(a)*13, stroke: '#4f7a52', 'stroke-width': 1.8, 'stroke-linecap': 'round' }, f); }
  }
  return f;
}
// Archik — soft-coated wheaten terrier, drawn from Pavel's photos (draft_claude/Archik/)
//  pale wavy wheat coat · greyish beard round a black nose · small fold-over ears · fringe over
//  dark eyes · tail up · long legs · brown leather collar · tongue often out. Faces left.
//  pose: 'stand' | 'look' (head up at the forester) | 'sit' | 'lie' | 'jump' | 'beg' (up on hind legs); flip: face right
const AC = { coat: '#e8d6b0', shade: '#cdb586', tip: '#b8996a', beard: '#c4b392', beardD: '#8f8270', ink: '#1f1a16', tongue: '#d9706a', collar: '#6b4a2e' };
function archikHead(d, tf){
  const h = el('g', { transform: tf || '' }, d), C = AC;
  const fur = (dd, fill) => el('path', { d: dd, fill }, h);
  el('path', { d: 'M-21 -58 Q-10 -54 1 -59', stroke: C.collar, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round' }, h);
  el('circle', { cx: -12, cy: -54, r: 2.2, fill: '#c9a24a' }, h);
  fur('M-28 -74 Q-28 -92 -12 -92 Q2 -92 2 -76 Q2 -64 -10 -62 Q-22 -62 -28 -74 Z', C.coat);
  fur('M-26 -78 Q-40 -80 -42 -70 Q-43 -60 -38 -55 Q-34 -51 -30 -54 Q-26 -50 -22 -54 Q-18 -54 -16 -60 Q-14 -70 -26 -78 Z', C.beard);
  el('path', { d: 'M-38 -58 l-1 4 M-33 -55 l0 4 M-27 -55 l1 4', stroke: C.beardD, 'stroke-width': 1.4, 'stroke-linecap': 'round' }, h);
  el('ellipse', { cx: -37, cy: -71, rx: 8, ry: 7, fill: '#a39479', opacity: .8 }, h);
  fur('M-31 -56 Q-30 -48 -26 -49 Q-23 -51 -25 -56 Z', C.tongue);
  el('ellipse', { cx: -40, cy: -73, rx: 5, ry: 4, fill: C.ink }, h);
  el('circle', { cx: -41.5, cy: -74.5, r: 1.2, fill: '#6b625a' }, h);
  el('circle', { cx: -20, cy: -80, r: 2.8, fill: C.ink }, h);
  el('circle', { cx: -20.8, cy: -80.8, r: .9, fill: '#fff' }, h);
  fur('M-28 -84 Q-24 -90 -16 -88 Q-12 -86 -14 -82 Q-18 -86 -22 -83 Q-25 -82 -28 -84 Z', C.shade);
  fur('M-8 -90 Q0 -97 6 -88 Q4 -80 -2 -78 Q-4 -84 -8 -90 Z', C.tip);
  return h;
}
function archik(g, x, y, s, pose, flip){
  pose = pose || 'stand';
  const k = s || 1, outer = el('g', { transform: `translate(${x} ${y}) scale(${flip ? -k : k} ${k})` }, g);
  const d = el('g', { class: 'archik ' + pose }, outer), C = AC;
  const fur = (dd, fill) => el('path', { d: dd, fill }, d);
  const curls = pts => pts.forEach(([cx, cy]) => el('path', { d: `M${cx - 3} ${cy} q3 -4 6 0`, stroke: C.shade, 'stroke-width': 1.6, fill: 'none', 'stroke-linecap': 'round' }, d));
  const leg = (x1, y1, x2, y2, c, w) => el('path', { d: `M${x1} ${y1} L${x2} ${y2}`, stroke: c, 'stroke-width': w || 11, 'stroke-linecap': 'round' }, d);
  const paw = lx => fur(`M${lx - 9} 0 Q${lx - 9} -8 ${lx - 1} -8 Q${lx + 7} -8 ${lx + 6} 0 Z`, C.coat);

  if (pose === 'beg'){   // up on the hind legs, front paws reaching out to play
    el('path', { d: 'M44 -30 Q64 -32 66 -52', stroke: C.coat, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round', class: 'wag' }, d);
    leg(28, -36, 26, -5, C.shade, 10); paw(27);
    const gb = el('g', { transform: 'rotate(62 36 -40)' }, d);
    const gfur = (dd, fill) => el('path', { d: dd, fill }, gb);
    const gleg = (x1, y1, x2, y2, c) => el('path', { d: `M${x1} ${y1} L${x2} ${y2}`, stroke: c, 'stroke-width': 10, 'stroke-linecap': 'round' }, gb);
    gleg(0, -36, -32, -32, C.shade);
    gfur('M-10 -52 Q14 -60 40 -54 Q50 -46 46 -30 L42 -26 Q38 -22 34 -26 Q30 -21 26 -25 Q22 -20 18 -24 Q14 -19 10 -23 Q6 -18 2 -23 Q-2 -18 -6 -24 Q-14 -28 -14 -38 Z', C.coat);
    gleg(4, -40, -36, -50, C.coat);
    el('circle', { cx: -37, cy: -50, r: 6, fill: C.coat }, gb); el('circle', { cx: -33, cy: -32, r: 5.5, fill: C.shade }, gb);
    [[16,-50],[28,-46],[36,-38],[24,-34]].forEach(([cx, cy]) => el('path', { d: `M${cx - 3} ${cy} q3 -4 6 0`, stroke: C.shade, 'stroke-width': 1.6, fill: 'none', 'stroke-linecap': 'round' }, gb));
    gfur('M-22 -40 Q-26 -60 -16 -68 L0 -64 Q4 -50 -4 -38 Q-14 -32 -22 -40 Z', C.coat);
    archikHead(gb, 'rotate(-48 -10 -60)');
    leg(40, -34, 41, -5); paw(41);
  } else if (pose === 'sit'){
    el('path', { d: 'M44 -6 Q62 -6 64 -20', stroke: C.coat, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round', class: 'wag' }, d);
    fur('M4 -2 Q2 -40 18 -50 Q40 -52 44 -26 Q48 -4 36 -2 Z', C.coat);            // haunch + back
    leg(-4, -40, -6, -5, C.shade, 10); leg(8, -40, 8, -5, C.coat); paw(-5); paw(9);
    fur('M-20 -50 Q-24 -70 -12 -76 L4 -72 Q12 -54 6 -40 Q-8 -34 -20 -50 Z', C.coat); // chest
    curls([[24, -36], [34, -24], [16, -22], [-6, -56]]);
    archikHead(d, 'translate(6 -14)');
  } else if (pose === 'lie'){
    el('path', { d: 'M44 -10 Q62 -8 70 -4', stroke: C.coat, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round' }, d);
    fur('M-12 -6 Q-10 -30 16 -32 Q44 -32 48 -14 Q50 0 36 0 L-10 0 Z', C.coat);     // body flat on the ground
    leg(-8, -4, -36, -3, C.coat, 9); leg(-4, -8, -32, -9, C.shade, 8);              // front paws stretched out
    fur('M34 0 Q30 -14 42 -16 Q50 -10 46 0 Z', C.shade);                            // hind leg tucked
    curls([[6, -22], [20, -26], [32, -20], [14, -12]]);
    archikHead(d, 'translate(-4 40) rotate(-6 -12 -70)');
  } else {
    const look = pose === 'look';
    el('path', { d: 'M40 -46 Q54 -64 46 -84', stroke: C.coat, 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round', class: 'wag' }, d);
    el('path', { d: 'M46 -84 q3 -4 -1 -7', stroke: C.tip, 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', class: 'wag' }, d);
    if (pose === 'jump'){ leg(30, -34, 44, -14, C.shade, 10); leg(-2, -34, -18, -20, C.shade, 10); }
    else { leg(30, -34, 32, -6, C.shade, 10); leg(-2, -34, 0, -6, C.shade, 10); }
    fur('M-10 -52 Q14 -60 40 -54 Q50 -46 46 -30 L42 -26 Q38 -22 34 -26 Q30 -21 26 -25 Q22 -20 18 -24 Q14 -19 10 -23 Q6 -18 2 -23 Q-2 -18 -6 -24 Q-14 -28 -14 -38 Z', C.coat);
    if (pose === 'jump'){ leg(40, -32, 54, -12); leg(8, -32, -10, -16); }
    else { [40, 8].forEach(lx => { leg(lx, -32, lx - 1, -5); paw(lx); }); }
    curls([[4,-46],[16,-50],[28,-46],[36,-38],[12,-36],[24,-34],[-4,-40],[38,-16],[6,-14]].filter(([, cy]) => pose !== 'jump' || cy < -20));
    fur('M-22 -40 Q-26 -60 -16 -68 L0 -64 Q4 -50 -4 -38 Q-14 -32 -22 -40 Z', C.coat);
    archikHead(d, look ? 'rotate(16 -10 -60)' : '');
  }
  return outer;
}
// two little rabbits for "chase two rabbits" — run in opposite directions
function rabbit(g, x, y, s, flip){
  const r = el('g', { transform: `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`, class: 'hop' }, g);
  el('ellipse', { cx: 0, cy: -12, rx: 14, ry: 10, fill: '#a99a86' }, r);
  el('circle', { cx: 14, cy: -2 - 18, r: 7, fill: '#a99a86' }, r);
  el('path', { d: 'M14 -26 Q12 -42 18 -44 Q20 -36 18 -26 Z M18 -26 Q22 -40 27 -40 Q26 -32 21 -25 Z', fill: '#a99a86' }, r);
  el('circle', { cx: 17, cy: -21, r: 1.4, fill: '#1f1a16' }, r);
  el('circle', { cx: -14, cy: -14, r: 4.5, fill: '#f4efe6' }, r);
  el('path', { d: 'M-8 -4 L-16 0 M8 -4 L14 0', stroke: '#8f816e', 'stroke-width': 4, 'stroke-linecap': 'round' }, r);
  return r;
}

/* ---------- the Altai snow leopard (irbis) — always far away, never close ---------- */
//  drawn facing right, feet at (0,0); legs stride while it walks
function snowLeopard(g){
  const L = el('g', { class: 'irbis' }, g), fur = '#dcd8cd', sh = '#c4bfb2', sp = '#6e6a62';
  el('path', { d: 'M-22 -15 Q-46 -14 -50 -30 Q-52 -40 -44 -40', stroke: fur, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }, L);
  el('path', { d: 'M-46 -40 l3 0', stroke: sp, 'stroke-width': 7, 'stroke-linecap': 'round' }, L);
  [[-12, sh, 'b'], [16, sh, 'a']].forEach(([lx, c, k]) => el('path', { d: `M${lx} -12 L${lx} -1`, stroke: c, 'stroke-width': 5, 'stroke-linecap': 'round', class: 'stride ' + k }, L));
  el('ellipse', { cx: 0, cy: -16, rx: 25, ry: 8.5, fill: fur }, L);
  [[-8, fur, 'a'], [20, fur, 'b']].forEach(([lx, c, k]) => el('path', { d: `M${lx} -12 L${lx} -1`, stroke: c, 'stroke-width': 5, 'stroke-linecap': 'round', class: 'stride ' + k }, L));
  el('circle', { cx: 27, cy: -21, r: 7, fill: fur }, L);
  el('path', { d: 'M23 -27 l1 -4 l3 3 Z M28 -28 l2 -4 l2 4 Z', fill: sh }, L);
  el('circle', { cx: 31, cy: -22, r: 1.1, fill: '#2a2018' }, L);
  [[-14,-18],[-4,-21],[6,-17],[14,-20],[-8,-12],[2,-12],[12,-13],[-18,-13],[-34,-17],[-45,-27]].forEach(([cx, cy]) =>
    el('circle', { cx, cy, r: 1.7, fill: 'none', stroke: sp, 'stroke-width': 1 }, L));
  return L;
}
// walk back and forth between two points (turning round at each end)
function irbisWalk(parent, x1, y1, x2, y2, s, dur){
  const g = el('g', { opacity: .85 }, parent);
  const turn = el('g', {}, g); const body = el('g', { transform: `scale(${s})` }, turn); snowLeopard(body);
  const am = el('animateMotion', { dur: dur + 's', repeatCount: 'indefinite', path: `M${x1} ${y1} L${x2} ${y2}`, keyPoints: '0;1;0', keyTimes: '0;.5;1', calcMode: 'linear', rotate: 'auto' }, g);
  el('animateTransform', { attributeName: 'transform', type: 'scale', values: '1 1;-1 1', keyTimes: '0;.5', calcMode: 'discrete', dur: dur + 's', repeatCount: 'indefinite' }, turn);
  return g;
}
// spots on the far ridge of the home landscape, picked at random each visit
const IRBIS_HOME = [[150, 440, 300, 500], [300, 500, 430, 430], [430, 430, 600, 520], [600, 520, 760, 450], [760, 450, 900, 510]];
const IRBIS_HOME_PHONE = [[760, 450, 900, 510], [900, 510, 1050, 440], [600, 520, 760, 450]];

/* ---------- landscape ---------- */
function landscape(svg){
  svg.innerHTML = `<defs>
    <linearGradient id="h-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e1cf"/><stop offset=".6" stop-color="#f4ead6"/><stop offset="1" stop-color="#efe3c8"/></linearGradient>
    <linearGradient id="h-mist" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f4ecdc" stop-opacity="0"/><stop offset=".5" stop-color="#f4ecdc" stop-opacity=".95"/><stop offset="1" stop-color="#f4ecdc" stop-opacity="0"/></linearGradient></defs>
  <rect width="1400" height="860" fill="url(#h-sky)"/>
  <circle cx="1160" cy="150" r="54" fill="#f2d9a3" opacity=".8"/>
  <path d="M0 470 L120 360 L210 410 L330 280 L450 390 L560 300 L700 420 L820 330 L960 410 L1080 300 L1200 380 L1300 320 L1400 380 L1400 860 L0 860Z" fill="#b9c2c7"/>
  <path d="M330 280 L365 312 L345 318 L380 340 L330 330Z M1080 300 L1110 330 L1092 334 L1120 352 L1078 344Z M560 300 L588 326 L570 330 Z" fill="#f4f1ea" opacity=".9"/>
  <path d="M0 540 L150 440 L300 500 L430 430 L600 520 L760 450 L900 510 L1050 440 L1220 520 L1400 460 L1400 860 L0 860Z" fill="#8fa09c"/>
  <rect class="mist" x="-100" y="430" width="1700" height="120" fill="url(#h-mist)"/>
  <path d="M0 860 L0 700 C 260 680, 520 640, 760 580 C 900 545, 1000 520, 1080 520 C 1200 520, 1320 545, 1400 560 L1400 860Z" fill="#6f8a63"/>
  <path d="M0 860 L0 770 C 300 735, 600 715, 900 690 C 1100 670, 1300 662, 1400 668 L1400 860Z" fill="#5e7853"/>`;
}

/* ---------- home page ---------- */
window.KedrHome = function(ctx){
  const { K, order, seenMap, solvedMap } = ctx;
  const root = document.getElementById('home');
  const probs = K.problems.map(p => p.id), total = probs.length;
  const solvedCount = () => probs.filter(id => solvedMap()[id]).length;
  const stageOf = n => STAGES.reduce((s, st, i) => (st.share === 'first' ? n >= 1 : n >= Math.ceil(st.share * total)) ? i : s, 0);
  const nextUp = () => order.find(id => /^(P|B4-P)\d/.test(id) ? !solvedMap()[id] : !seenMap()[id]);

  function render(animatePlant){
    const planted = store.get('kedr-planted', false);
    const n = solvedCount(), st = stageOf(n), S = STAGES[st];
    const last = store.get('kedr-last-stage', st);
    const heard = store.get('kedr-heard', {});
    const speech = planted && !animatePlant ? SPEECHES.find(sp => !heard[sp.id] && sp.when(n)) : null;
    root.innerHTML = `
      <svg id="homeSvg" viewBox="0 0 1400 860" preserveAspectRatio="xMidYMid slice"></svg>
      <div class="home-title">
        <div class="kicker">Physics Course</div>
        <h1>Kedr</h1>
        <div class="hand">${planted ? 'your cedar grows — have trust' : 'every physicist starts with a seedling'}</div>
      </div>
      ${planted ? `
      <div class="ycard">
        <div class="kicker">Your cedar</div>
        <div class="stage">${S.name}</div>
        <div class="hand" style="font-size:20px;margin:-2px 0 10px">${S.note}</div>
        <div class="bar2"><i style="width:${Math.round(100*n/total)}%"></i></div>
        <div class="small">${n} of ${total} kinematics problems solved</div>
        <svg class="rings" viewBox="-60 -60 120 120" id="ringsSvg"></svg>
        <div class="small" style="text-align:center;margin-top:-4px">each ring — the solved problems of one theory card (T01 inside → T05 outside)</div>
        <a class="cta" href="#${nextUp() || 'map'}">Continue → ${nextUp() || 'the map'}</a>
        <a class="cta ghost" href="#map">Open the kinematics map</a>
      </div>` : ''}
      ${speech ? `<div class="say"><div class="hand">${speech.text}</div><button class="next">Got it</button></div>` : ''}
      ${st > last ? `<div class="toast">Your cedar grew! Now: <b>${S.name}</b></div>` : ''}`;
    store.set('kedr-last-stage', st);
    const sayBtn = root.querySelector('.say .next'); if (sayBtn) sayBtn.onclick = () => { heard[speech.id] = true; store.set('kedr-heard', heard); root.querySelector('.say').remove(); };
    const svg = document.getElementById('homeSvg'); landscape(svg);
    if (innerWidth < 760) svg.setAttribute('viewBox', '600 130 560 560');
    { const spots = innerWidth < 760 ? IRBIS_HOME_PHONE : IRBIS_HOME, sp = spots[Math.floor(Math.random() * spots.length)];
      const ig = document.createElementNS(NS, 'g'); svg.insertBefore(ig, svg.querySelector('.mist').nextSibling); irbisWalk(ig, ...sp, 1, 46); }
    // trail with sections
    const trail = el('path', { d: 'M150 840 C 300 820, 360 790, 470 770 S 600 730, 650 700 S 760 630, 800 605 S 830 585, 845 578', fill: 'none', stroke: '#efe3c8', 'stroke-width': 5, 'stroke-dasharray': '2 12', 'stroke-linecap': 'round' }, svg);
    const L = trail.getTotalLength();
    const units = [{ n: 'Kinematics', ready: true, unit: 'Kinematics' }, { n: 'Forces & momentum' }, { n: 'Energy' }, { n: 'Thermodynamics', ready: true, unit: 'Thermodynamics' }, { n: 'Waves' }, { n: 'Fields' }, { n: 'Quantum & nuclear' }];
    units.forEach((u, i) => {
      const p = trail.getPointAtLength(L * (.15 + i * .12)), s = el('g', { transform: `translate(${p.x} ${p.y})`, opacity: u.ready ? 1 : .55, class: u.ready ? 'hot' : '' }, svg);
      el('line', { x1: 0, y1: 0, x2: 0, y2: -42, stroke: '#33291f', 'stroke-width': 2 }, s);
      el('path', { d: 'M0 -42 L24 -35 L0 -28 Z', fill: u.ready ? '#d9a032' : '#cdbf9f' }, s);
      if (u.ready) el('circle', { cx: 0, cy: 0, r: 15, fill: '#f2c94c', opacity: .5, class: 'glow' }, s);
      el('circle', { cx: 0, cy: 0, r: 5, fill: u.ready ? '#33291f' : '#9a8c70' }, s);
      el('text', { x: 10, y: -50, 'font-family': 'Bricolage Grotesque', 'font-weight': 600, 'font-size': u.ready ? 18 : 14, fill: u.ready ? '#33291f' : '#f4ecdc', stroke: u.ready ? '#f4ecdc' : '#3f5440', 'stroke-width': u.ready ? 4 : 3, 'paint-order': 'stroke' }, s, u.n + (u.ready ? '' : ' · soon'));
      if (u.ready) s.addEventListener('click', () => { window._kedrUnit = u.unit; try { localStorage.setItem('kedr-unit', u.unit); } catch(e) {} location.hash = '#map'; });
    });
    // the student's cedar on the hilltop
    if (planted){
      const tree = cedar(svg, 880, 572, st, n);
      if (animatePlant){ tree.style.transformOrigin = '880px 572px'; tree.style.transform = 'scale(.05)'; requestAnimationFrame(() => requestAnimationFrame(() => { tree.style.transition = 'transform 1.6s cubic-bezier(.2,1.4,.4,1)'; tree.style.transform = 'scale(1)'; })); setTimeout(() => render(false), 1900); }
      el('text', { x: 880, y: 608, 'text-anchor': 'middle', 'font-family': 'Caveat', 'font-size': 24, fill: '#f9f4e9' }, svg, 'your cedar');
    } else {
      el('path', { d: 'M862 574 Q880 564 898 574', stroke: '#6a4c38', 'stroke-width': 4, fill: 'none' }, svg);
      el('text', { x: 880, y: 606, 'text-anchor': 'middle', 'font-family': 'Caveat', 'font-size': 24, fill: '#f9f4e9' }, svg, 'a spot for your cedar');
    }
    // forester at the start of the trail
    const fg = el('g', { class: 'hot' }, svg);
    forester(fg, 90, 735, planted ? 'wave' : 'offer', .72); archik(fg, 175, 770, .62);
    el('text', { x: 40, y: 575, 'font-family': 'Caveat', 'font-size': 22, fill: '#f9f4e9' }, fg, planted ? 'need a hint? ask the forester' : '');
    fg.addEventListener('click', () => welcome());
    // rings
    const rs = document.getElementById('ringsSvg');
    if (rs){
      const sol = solvedMap();
      el('circle', { r: 56, fill: '#6a4c38' }, rs); el('circle', { r: 52, fill: '#e8d3ae' }, rs);
      el('circle', { r: 9, fill: '#8a6a4e' }, rs);
      K.theory.filter(t => !t.unit || t.unit === 'Kinematics').forEach((t, i) => {
        const ids = K.problems.filter(p => (p.anchors[0] || '').split('#')[0] === t.id).map(p => p.id);
        const f = ids.length ? ids.filter(id => sol[id]).length / ids.length : 0;
        const r = 14 + i * 8;
        el('circle', { r, fill: 'none', stroke: '#c9ad82', 'stroke-width': 6 }, rs);
        if (f > 0){ const c = 2 * Math.PI * r; el('circle', { r, fill: 'none', stroke: '#d9a032', 'stroke-width': 6, 'stroke-dasharray': `${c*f} ${c}`, transform: 'rotate(-90)' }, rs); }
        el('title', {}, rs, t.id);
      });
    }
    if (!planted && !store.get('kedr-welcomed', false)) welcome();
  }

  /* ---------- the comic welcome ---------- */
  function welcome(){
    let i = 0;
    const ov = document.createElement('div'); ov.className = 'comic'; document.body.appendChild(ov);
    const draw = () => {
      const w = WELCOME[i], last = i === WELCOME.length - 1;
      ov.innerHTML = `<div class="panel">
        <svg viewBox="0 0 900 460" class="scene"></svg>
        <div class="bubble">${w.text}</div>
        <div class="row">
          <span class="dots">${WELCOME.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</span>
          <button class="skip">Skip</button>
          ${i ? '<button class="back">Back</button>' : ''}
          <button class="next">${last ? (store.get('kedr-planted', false) ? 'Back to my cedar' : 'Plant it') : 'Next'}</button>
        </div></div>`;
      const sc = ov.querySelector('.scene');
      sc.innerHTML = `<rect width="900" height="460" fill="#efe3c8"/>
        <path d="M0 300 L120 230 L230 270 L360 190 L480 260 L620 200 L760 270 L900 220 L900 460 L0 460Z" fill="#b9c2c7"/>
        <path d="M0 460 L0 380 C 250 350, 600 340, 900 360 L900 460Z" fill="#6f8a63"/>`;
      // the snow leopard wanders far behind, in a different spot on each panel
      const IR = [[760, 860], null, [640, 720], [820, 880], null, [700, 800], null, [840, 880], [640, 700]][i];
      if (IR) irbisWalk(sc, IR[0], 352, IR[1], 352, .55, 22);
      // the forester's own grown cedar behind him (left, clear of the speech bubble)
      const bg = el('g', { opacity: .9 }, sc); cedar(bg, 120, 372, 3, 0);
      forester(sc, 300, 410, w.pose, 1.15);
      archik(sc, w.dog === 'lie' ? 470 : w.dog === 'beg' ? 420 : 460, 412, 1.05, w.dog, w.dogFlip);
      if (w.rabbits){ rabbit(sc, 620, 420, 1.1, false); rabbit(sc, 860, 404, .9, true); }
      if (w.shovel){ // shovel stuck in the ground
        el('line', { x1: 560, y1: 412, x2: 590, y2: 300, stroke: '#6a4c38', 'stroke-width': 5, 'stroke-linecap': 'round' }, sc);
        el('path', { d: 'M548 410 L575 418 L580 444 L556 452 Z', fill: '#8a8f94', transform: 'rotate(-12 565 430)' }, sc);
      }
      ov.querySelector('.skip').onclick = () => close(true);
      const b = ov.querySelector('.back'); if (b) b.onclick = () => { i--; draw(); };
      ov.querySelector('.next').onclick = () => { if (last) close(true); else { i++; draw(); } };
    };
    const close = plant => {
      store.set('kedr-welcomed', true);
      const first = !store.get('kedr-planted', false);
      if (plant) store.set('kedr-planted', true);
      ov.remove(); render(plant && first);
    };
    draw();
  }

  return { render, welcome };
};
})();
