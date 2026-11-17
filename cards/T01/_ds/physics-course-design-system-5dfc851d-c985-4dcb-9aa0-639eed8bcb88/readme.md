# Physics Course — Design System (v0.1)

A universal physics study course for international exams (IB, A-Level, IGCSE, EGE). Warm paper aesthetic, personal-teacher voice, explanations through simple life examples. **Not a dry textbook** — every lesson reads like a good teacher at a whiteboard: structured headings, calm serif prose, and handwritten asides in the margins.

**Source of truth:** `uploads/Scene 9 - Color Variants.dc.html` — "Scene 9 — Variant C" (motion with constant speed). Every token, component, and layout rule here is extracted from that scene. No Figma, codebase, or logo was provided.

## The one governing idea: five strict color lanes

Each color appears in ONE place only. A color outside its lane is an error.

1. **Quantity colors** — time = green `--qty-time`, position/distance = blue `--qty-position`, velocity = orange `--qty-velocity`. ONLY inside diagrams, formulas, and worked calculations. **Never in running prose.**
2. **Misconception plum** `--misconception` on `--misconception-bg` — ONLY in the "Watch out!" block.
3. **Honey highlight** `--honey-wash` — a soft translucent warm marker wash behind key phrases in prose. Soft uneven edges. Rationed to **one phrase per teaching beat**. Never inside or beside a formula or diagram.
4. **Teacher slate-blue** `--teacher` `#5a6f9e` — ONLY in Caveat handwritten text (speech bubbles, margin asides, diagram annotations).
5. **Everything else is ink** `--ink` `#33291f`.

Role colors must never collide with quantity colors. Lanes must not leak.

## CONTENT FUNDAMENTALS

**Voice:** a personal teacher speaking to one student. Two registers:
- *Printed voice* (Source Serif 4, ink): calm, precise, plain-English definitions. "Speed is distance traveled over time taken." Short sentences. Sentence case everywhere; UPPERCASE only for structural labels (kickers, panel labels).
- *Handwritten voice* (Caveat, slate-blue): first person, present tense, direct address, mid-thought energy. "I'm starting to look at a body from t = 0 — the moment I turn my stopwatch on." "Pay attention — during equal time intervals we travel the <u>same distance</u>!" Exclamation marks live here, not in prose.

**Style specifics:**
- Explanations through simple life examples (stopwatch, walking, everyday objects) before formalism.
- Em/en dashes used conversationally: "scalar — *one* piece of information: how fast it goes."
- "I" = the teacher; "we"/"you" = teacher + student working together.
- Emphasis ladder: `<strong>` (weight 600) for key terms → honey highlight for the ONE crucial phrase per beat → `<u>` only inside Caveat handwriting.
- Small clarifying notes (15.5px) trail definitions and formulas: "where here *S* means distance, and *v* — speed."
- No emoji, ever. No icons. "Watch out!" is written text, not a ⚠️.
- Structural labels are short and stepwise: "Way 1 — just look", "Way 2 — the formula", "Watch out!".

## VISUAL FOUNDATIONS

- **Colors:** paper page `#efe8d8`; lesson card `#f9f4e9`; nested panels `#fbf8f0`; ink `#33291f`; muted ink `#6b5d43` (units, footnotes); borders `#e3d9c2` (card) / `#ddd2b8` (panels). Lane colors above. Diagram panels sit on soft green `#eaf1ea`.
- **Type:** Bricolage Grotesque for structure (kicker 12px/700/0.14em caps; h2 24px/600; h3 19px/600; panel labels 13px/600/0.1em caps). Source Serif 4 for body (18px/1.6 lead, 16.5px/1.55 panel prose, 15.5px notes) and for formulas (italic 21–22px; upright 16px muted units). Caveat 500 for handwriting (23px asides, 21px bubbles/diagram labels, 18px margin captions).
- **Formulas:** italic serif variables, each painted its quantity color; numbers inherit the color of their quantity; units upright, 16px, muted ink. Fractions are stacked flex columns with a 1.5px ink rule. A boxed result formula (`S = v · t`) is an ink-bordered pill — ink text, transparent fill, radius 10px.
- **Cards & panels:** main card = 1px `#e3d9c2` border, 6px radius, shadow `0 2px 24px rgba(90,70,40,0.10)`, generous padding 56/72/60. Nested panels = 1px `#ddd2b8`, 10px radius, `#fbf8f0` fill, no shadow. Watch-out block = plum wash `#e9dbe3`, 10px radius, no border.
- **Handwritten geometry:** Caveat elements sit slightly off-axis — bubbles `rotate(-0.5deg)`, asides `rotate(-0.4deg)`. Speech bubble radius `16px 16px 16px 3px` (tail corner), 1.5px `#b9c5dd` border, panel fill.
- **Honey wash spec:** background-image gradient at ~0.4–0.5 alpha of `rgb(224,188,120)` with transparent ramps at both ends (uneven marker edges), `background-size:100% 66%`, positioned at `0 82%`, irregular border-radius `0.7em 0.4em 0.6em 0.5em`, `box-decoration-break:clone`.
- **Diagrams:** hand-styled SVG on the soft green panel — 1.5px dashed ink baselines, solid ink dots (r=9), thin (1.3px) colored measurement lines with end ticks, Caveat labels in quantity colors.
- **Layout:** single 960px column, centered; page padding 56/24/100. Beats separated by ~56px; numbered section headers (34px ink-bordered circle + h2). Two-up grids (`1fr 1fr`, 20px gap) for parallel methods. Definition lists = `130px 1fr` grid.
- **Animation & interaction:** none in source. Default to static; if needed, use gentle opacity fades only. No hover effects, no gradients (other than the honey wash), no blur, no transparency tricks, no imagery/photography.

## ICONOGRAPHY

- **No logo exists.** No mark was provided; render "Physics Course" in Bricolage Grotesque 700 caps where a mark would go. Never invent one.
- **No icon set.** The system uses zero icons — no icon font, no SVG glyphs, no emoji, no unicode dingbats. Alerts are worded labels ("Watch out!"). Numbered circles (plain type in an ink-bordered circle) are the only badge-like element.
- **The only graphics are instructional diagrams**: inline SVGs drawn per-lesson in the diagram style above. These are content, not iconography — always ink structure + quantity-colored measurements + Caveat annotations.

## Index

- `styles.css` — global entry; imports everything under `tokens/`.
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — all custom properties (lanes documented inline).
- `guidelines/` — foundation specimen cards (Colors / Type / Spacing / Brand groups in the Design System tab).
- `components/voice/` — HoneyHighlight, TeacherBubble, TeacherAside (the teacher's registers).
- `components/math/` — Qty, Fraction, FormulaPill, DiagramPanel (quantity-color lane).
- `components/structure/` — LessonCard, KickerBar, SectionHeading, DefinitionList, WayCard, WatchOut.
- `ui_kits/lesson/` — full recreation of Scene 9 Variant C (`index.html`).
- `templates/lesson-scene/` — LessonScene starting template for new lessons.
- `SKILL.md` — agent-facing usage skill.

## Intentional additions

None. All components are extracted directly from Scene 9 — Variant C.
