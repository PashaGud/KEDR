/* KEDR — режим IB / ЕГЭ (24.11.2026).
   ЕГЭ = тот же сайт, интерфейс по-русски. Переводит тексты интерфейса на лету
   (MutationObserver). Содержимое задач и теории пока на английском — переводится отдельно.
   Новая строка интерфейса → добавить в RU ниже. Режим хранится в localStorage 'kedr-mode'. */
(function(){
const MODE = (()=>{ try { return localStorage.getItem('kedr-mode') || 'ib'; } catch(e){ return 'ib'; } })();
window.KEDR_MODE = MODE;
const RU = {
 'Kinematics':'Кинематика','Forces & momentum':'Силы и импульс','Energy':'Энергия','Thermodynamics':'Термодинамика',
 'Waves':'Волны','Fields':'Поля','Quantum & nuclear':'Квантовая и ядерная',
 'Physics Course':'Курс физики','Kedr Physics':'Кедр · физика','Kedr':'Кедр',
 'Your cedar':'Твой кедр','My cedar':'Мой кедр','Map':'Карта','The map':'Карта','← Prev':'← Назад','Next →':'Дальше →','next →':'дальше →','← previous':'← назад',
 'your cedar grows — have trust':'твой кедр растёт — верь в себя','every physicist starts with a seedling':'каждый физик начинает с саженца',
 'your cedar':'твой кедр','a spot for your cedar':'место для твоего кедра','need a hint? ask the forester':'нужна подсказка? спроси лесника',
 'All solved — open the map':'Всё решено — открыть карту','Got it':'Понятно',
 'Just planted':'Только посажен','a tiny sprout in fresh soil':'крошечный росток в свежей земле','Seedling':'Саженец',
 'your first problem solved — it has started':'первая задача решена — началось','Sapling':'Деревце','first real branches':'первые настоящие ветки',
 'Young cedar':'Молодой кедр','taller than Archik now':'уже выше Арчика','Tall cedar':'Высокий кедр','the first cones are coming':'скоро первые шишки',
 'Kinematics cedar':'Кедр кинематики','every kinematics problem solved — full grown':'все задачи по кинематике решены — вырос',
 'Answer':'Ответ','Final answer':'Итоговый ответ','Builds on':'Опирается на','Leads to':'Ведёт к','builds on':'опирается на','leads to':'ведёт к',
 'HL only':'только HL','Highlight what matters':'Выдели главное','How I would sketch it':'Как бы я это нарисовал','Show my sketch':'Показать мой рисунок',
 'Maths card':'Карточка по математике','Maths help':'Помощь по математике','Meaning of the answer':'Смысл ответа','Next theory':'Следующая теория',
 'No problems linked yet — they are on the way.':'Задач пока нет — они в пути.','Practise this card':'Потренируйся по карточке',
 'Show answer':'Показать ответ','Show solution':'Показать решение','Solution':'Решение','Solved it — and you understand why?':'Решил — и понимаешь почему?',
 'Solved ✓':'Решено ✓','Theory card':'Карточка теории','Theory cards':'Карточки теории','Theory you need':'Нужная теория',
 'Think first — then show':'Сначала подумай — потом открой','Think further':'Подумай дальше','What if…?':'А что если…?','Whole-card challenges':'Задачи на всю карточку',
 'YOUR TURN':'ТВОЯ ОЧЕРЕДЬ','back to your cedar':'назад к твоему кедру','give it a try before you look':'попробуй сам, прежде чем смотреть',
 'maths toolkit — use it with any card':'математический набор — к любой карточке','no problems yet':'задач пока нет','opened, not solved yet':'открыта, пока не решена',
 'problem card':'карточка задачи','problem, text only (draft)':'задача, только текст (черновик)','problems coming soon':'задачи скоро будут',
 'school booklet':'школьный буклет','similar problem ↻':'похожая задача ↻','solved':'решено','undo':'отменить','✓ I solved it':'✓ Я решил',
 'tick it: your cedar grows only from solved problems':'отметь: кедр растёт только от решённых задач','— your cedar grew a little.':'— твой кедр немного подрос.',
 '• • dots = difficulty':'• • точки = сложность','Draft · text only — card not styled yet':'Черновик · только текст — карточка ещё не свёрстана',
 'start on the left — every card leads somewhere ·':'начни слева — каждая карточка куда-то ведёт ·','✓ opened':'✓ открыта','stuck on the maths? start here':'застрял на математике? начни здесь',
 'Hover a problem to see what it builds on and where it leads. Click anything to open it.':'Наведи на задачу — увидишь, на что она опирается и куда ведёт. Нажми, чтобы открыть.',
 'Physics Course · Kinematics':'Курс физики · Кинематика','HL':'HL',
 'Spotted a mistake? Drag me onto it':'Нашёл ошибку? Перетащи меня на неё','Spotted a mistake? Drag me onto it, or click to write':'Нашёл ошибку? Перетащи меня на неё или нажми, чтобы написать',
 'Cancel':'Отмена','Send':'Отправить','Thank you! Pavel will see it and fix it.':'Спасибо! Павел увидит и исправит.','What is wrong here?':'Что здесь не так?',
 'A mistake, something unclear, a typo… Write it in any language.':'Ошибка, непонятное место, опечатка… Пиши на любом языке.','Your name (optional)':'Твоё имя (необязательно)','Sending…':'Отправляю…','Place: ':'Место: ',
 'Hide':'Скрыть',
 'Skip':'Пропустить','Back':'Назад','Next':'Дальше','Plant it':'Посадить','Back to my cedar':'К моему кедру',
 'so-so':'так себе','Hide answer':'Скрыть ответ','Hide solution':'Скрыть решение','Hide highlights':'Убрать выделение','Hide my sketch':'Скрыть мой рисунок',
 'How well did you understand it?':'Насколько хорошо ты понял?','not at all':'совсем не понял','poorly':'плохо','well':'хорошо','perfectly':'отлично',
 'Compare it with yours: is the start and the end there? what is given, what is asked? and what did you draw that isn’t needed?':'Сравни со своим: есть ли начало и конец? что дано, что нужно найти? и что ты нарисовал лишнего?',


 "Hello, my dear friend. You came here for the loveliest reason: curiosity about how this world works. (Or maybe a physics exam is stepping on your toes. That's fine too.)":"Привет, дружище! Ты пришёл сюда по самой лучшей причине — тебе интересно, как устроен мир. (Ну, или на пятки наступает экзамен по физике. Это тоже нормально.)",
 "Don't take me for a teacher or a tutor. I'm not one. Think of me as a friendly neighbour, or an older brother who can give you some advice.":"Только не принимай меня за учителя или репетитора — я не из них. Считай меня соседом или старшим братом, который может что-то подсказать.",
 "I know a bit of physics and maths, and a few tips on how to start and what to watch out for. I live up in the Russian mountains, with my lovely dog, Archik.":"Я немного разбираюсь в физике и математике и знаю, с чего начать и где обычно спотыкаются. Живу в горах, на Алтае, с моим псом Арчиком.",
 "Do you trust me, kid? I've walked this road myself. The hardest part is that you don't see progress quickly. It comes after months, sometimes years.":"Веришь мне? Я сам прошёл эту дорогу. Самое трудное в ней — результат виден не сразу. Он приходит через месяцы, а иногда и через годы.",
 "But when it comes, it puts a smile on your face. It means you were patient enough to see it. Oh, so many got scared and left before that moment. So patience is our key.":"Зато когда приходит — ты улыбаешься. Значит, тебе хватило терпения. А сколько людей испугались и сошли с дороги раньше… Так что терпение — наш главный ключ.",
 "Whenever you feel your patience getting weak, or even lost, come to me and we'll find it again. Keys are my thing.":"Если почувствуешь, что терпение кончается или совсем пропало, — приходи. Найдём. Ключи — это по моей части.",
 "In Russia we say: chase two rabbits, and you'll catch neither. Meaning: focus on one thing.":"У нас говорят: за двумя зайцами погонишься — ни одного не поймаешь. То есть занимайся чем-то одним.",
 "We'll do the opposite. Alongside your learning, I'll ask you to do one more thing.":"А мы сделаем наоборот. Кроме учёбы, я попрошу тебя ещё об одном деле.",
 "Here's a seedling of the most majestic tree there is, if you ask me: a cedar. You, me and Archik will plant it together, and you'll look after it.":"Вот саженец самого красивого дерева на свете — по-моему, конечно. Это кедр. Мы с тобой и Арчиком посадим его вместе, а ухаживать за ним будешь ты.",
 "Here's how we look after it. Read a theory card, solve a problem, tick it. Every problem you truly solve helps your cedar grow.":"Ухаживать за ним просто: прочитай карточку теории, реши задачу и отметь её. Каждая задача, которую ты решил по-настоящему, помогает кедру расти."
};
const UNIT = '(Kinematics|Forces & momentum|Energy|Thermodynamics|Waves|Fields|Quantum & nuclear)';
const u = x => RU[x] || x;
const RULES = [
 [/^(\d+) of (\d+) problems solved$/, (m,a,b)=>`решено ${a} из ${b} задач`],
 [/^(\d+) problems?( · .*)?$/, (m,a,r)=>`задач: ${a}` + (r? r.replace(' · after ',' · после ').replace(' · start here',' · начни здесь'):'')],
 [new RegExp('^Map: '+UNIT+'$'), (m,a)=>'Карта: '+u(a)],
 [new RegExp('^Start → '+UNIT+'$'), (m,a)=>'Начать → '+u(a)],
 [new RegExp('^Next unit → '+UNIT+'$'), (m,a)=>'Следующий раздел → '+u(a)],
 [/^Problem (.+)$/, (m,a)=>'Задача '+a],
 [/^Back to (.+)$/, (m,a)=>'Вернуться к '+a.replace(/^theory /,'теории ')],
 [/^Next → (.+)$/, (m,a)=>'Дальше → '+a.replace(/^theory /,'теория ')],
 [new RegExp('^'+UNIT+' · soon$'), (m,a)=>u(a)+' · скоро'],
 [/^Your cedar grew! Now: $/, ()=>'Твой кедр подрос! Теперь: '],
 [/^each ring — one unit: (.+) inside → (.+) outside$/, (m,a,b)=>`каждое кольцо — один раздел: ${u(a)} внутри → ${u(b)} снаружи`],
];
function tr(s){
  const t = s.trim(); if (!t) return null;
  let r = RU[t]; if (r == null) for (const [re,f] of RULES){ const m = t.match(re); if (m){ r = f(...m); break; } }
  return r == null ? null : s.replace(t, r);
}
const SKIP = new Set(['SCRIPT','STYLE','TEXTAREA','INPUT']);
function walk(n){
  if (n.nodeType === 3){ const r = tr(n.nodeValue); if (r != null && r !== n.nodeValue) n.nodeValue = r; return; }
  if (n.nodeType !== 1 || SKIP.has(n.nodeName) || (n.closest && n.closest('.kedr-mode'))) return;
  for (const a of ['title','aria-label','placeholder']) if (n.hasAttribute && n.hasAttribute(a)){ const r = tr(n.getAttribute(a)); if (r != null) n.setAttribute(a, r); }
  for (const c of n.childNodes) walk(c);
}
function toggle(){
  if (document.querySelector('.kedr-mode')) return;
  const bar = document.querySelector('header.bar'); if (!bar) return;
  const css = document.createElement('style'); css.textContent = `.kedr-mode{display:inline-flex;border:1.5px solid currentColor;border-radius:999px;overflow:hidden;margin-right:12px;font:600 13px 'Bricolage Grotesque',system-ui,sans-serif;vertical-align:middle;flex:none}
.kedr-mode button{all:unset;cursor:pointer;padding:3px 10px;opacity:.6}.kedr-mode button.on{background:#33291f;color:#f4ecdc;opacity:1}`;
  document.head.appendChild(css);
  const d = document.createElement('div'); d.className = 'kedr-mode'; d.title = 'IB — English · ЕГЭ — по-русски';
  d.innerHTML = `<button data-m="ib" class="${MODE==='ib'?'on':''}">IB</button><button data-m="ege" class="${MODE==='ege'?'on':''}">ЕГЭ</button>`;
  d.onclick = e => { const m = e.target.dataset && e.target.dataset.m; if (!m || m === MODE) return; try { localStorage.setItem('kedr-mode', m); } catch(_){} location.reload(); };
  bar.insertBefore(d, bar.firstChild);
}
function start(){
  toggle();
  if (MODE !== 'ege') return;
  document.documentElement.lang = 'ru';
  walk(document.body);
  new MutationObserver(ms => { for (const m of ms){ if (m.type === 'characterData') walk(m.target); else m.addedNodes.forEach(walk); } })
    .observe(document.body, { childList: true, subtree: true, characterData: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
