/* @ds-bundle: {"format":4,"namespace":"PhysicsCourseDesignSystem_5dfc85","components":[{"name":"DiagramPanel","sourcePath":"components/math/DiagramPanel.jsx"},{"name":"FormulaPill","sourcePath":"components/math/FormulaPill.jsx"},{"name":"Fraction","sourcePath":"components/math/Fraction.jsx"},{"name":"Qty","sourcePath":"components/math/Qty.jsx"},{"name":"Unit","sourcePath":"components/math/Qty.jsx"},{"name":"DefinitionList","sourcePath":"components/structure/DefinitionList.jsx"},{"name":"KickerBar","sourcePath":"components/structure/KickerBar.jsx"},{"name":"LessonCard","sourcePath":"components/structure/LessonCard.jsx"},{"name":"SectionHeading","sourcePath":"components/structure/SectionHeading.jsx"},{"name":"SubHeading","sourcePath":"components/structure/SectionHeading.jsx"},{"name":"WatchOut","sourcePath":"components/structure/WatchOut.jsx"},{"name":"WayCard","sourcePath":"components/structure/WayCard.jsx"},{"name":"HoneyHighlight","sourcePath":"components/voice/HoneyHighlight.jsx"},{"name":"TeacherAside","sourcePath":"components/voice/TeacherAside.jsx"},{"name":"TeacherBubble","sourcePath":"components/voice/TeacherBubble.jsx"}],"sourceHashes":{"components/math/DiagramPanel.jsx":"d344076c3bda","components/math/FormulaPill.jsx":"b98156dbc992","components/math/Fraction.jsx":"2d3f208ebfdb","components/math/Qty.jsx":"007a15f9c060","components/structure/DefinitionList.jsx":"fbcc41b6d3ac","components/structure/KickerBar.jsx":"31288d399b55","components/structure/LessonCard.jsx":"8020ea3d0f8c","components/structure/SectionHeading.jsx":"ad90e6b1dfd3","components/structure/WatchOut.jsx":"522c61908987","components/structure/WayCard.jsx":"074aea248796","components/voice/HoneyHighlight.jsx":"25eb15e623e9","components/voice/TeacherAside.jsx":"4c0b5c62f30b","components/voice/TeacherBubble.jsx":"2c0f711d231d","ui_kits/lesson/LessonScene.jsx":"6077c45382d4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PhysicsCourseDesignSystem_5dfc85 = window.PhysicsCourseDesignSystem_5dfc85 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/math/DiagramPanel.jsx
try { (() => {
/** Soft green panel that hosts an instructional SVG diagram. */
function DiagramPanel({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--diagram-bg)',
      borderRadius: 'var(--radius-panel)',
      padding: 'var(--pad-diagram)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { DiagramPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/math/DiagramPanel.jsx", error: String((e && e.message) || e) }); }

// components/math/FormulaPill.jsx
try { (() => {
/** Boxed result formula — ink-bordered pill, ink italic text, transparent fill. */
function FormulaPill({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      border: '1.5px solid var(--ink)',
      color: 'var(--ink)',
      background: 'transparent',
      borderRadius: 'var(--radius-panel)',
      padding: 'var(--pad-formula-pill)',
      fontSize: 22,
      fontStyle: 'italic',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { FormulaPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/math/FormulaPill.jsx", error: String((e && e.message) || e) }); }

// components/math/Fraction.jsx
try { (() => {
/** A stacked fraction with a 1.5px ink rule. Children are the num/den nodes (usually <Qty> spans). */
function Fraction({
  num,
  den,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      textAlign: 'center',
      lineHeight: 1.25,
      verticalAlign: 'middle',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, num), /*#__PURE__*/React.createElement("span", {
    style: {
      borderTop: '1.5px solid var(--ink)'
    }
  }, den));
}
Object.assign(__ds_scope, { Fraction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/math/Fraction.jsx", error: String((e && e.message) || e) }); }

// components/math/Qty.jsx
try { (() => {
const QTY_COLORS = {
  time: 'var(--qty-time)',
  position: 'var(--qty-position)',
  distance: 'var(--qty-position)',
  velocity: 'var(--qty-velocity)',
  speed: 'var(--qty-velocity)'
};

/** A quantity-colored symbol or number. ONLY inside formulas, calculations, diagrams — never prose. */
function Qty({
  kind,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: QTY_COLORS[kind] || 'var(--ink)',
      ...style
    }
  }, children);
}

/** An upright, muted unit like "m/s" trailing a formula value. */
function Unit({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontStyle: 'normal',
      color: 'var(--ink-muted)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Qty, Unit });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/math/Qty.jsx", error: String((e && e.message) || e) }); }

// components/structure/DefinitionList.jsx
try { (() => {
/** Term/definition grid — 130px Bricolage term column, serif definitions. items: [{term, def, note}] */
function DefinitionList({
  items,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '130px 1fr',
      rowGap: 20,
      columnGap: 24,
      fontSize: 18,
      lineHeight: 1.6,
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-structure)',
      fontWeight: 600,
      color: 'var(--ink)',
      paddingTop: 1
    }
  }, it.term), /*#__PURE__*/React.createElement("div", null, it.def, it.note && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 15.5,
      color: 'var(--ink)',
      marginTop: 4
    }
  }, it.note)))));
}
Object.assign(__ds_scope, { DefinitionList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/DefinitionList.jsx", error: String((e && e.message) || e) }); }

// components/structure/KickerBar.jsx
try { (() => {
/** Row above the lesson card: uppercase Bricolage kicker left, optional Caveat note right. */
function KickerBar({
  title,
  note,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      margin: '0 0 20px 4px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-structure)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 'var(--tracking-kicker)',
      textTransform: 'uppercase',
      color: 'var(--ink)'
    }
  }, title), note && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-hand)',
      fontWeight: 500,
      fontSize: 18,
      color: 'var(--teacher)',
      marginLeft: 'auto'
    }
  }, note));
}
Object.assign(__ds_scope, { KickerBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/KickerBar.jsx", error: String((e && e.message) || e) }); }

// components/structure/LessonCard.jsx
try { (() => {
/** The main lesson card on the paper page — border, 6px radius, soft warm shadow, generous padding. */
function LessonCard({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      padding: 'var(--pad-card)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { LessonCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/LessonCard.jsx", error: String((e && e.message) || e) }); }

// components/structure/SectionHeading.jsx
try { (() => {
/** Numbered beat header: 34px ink-circled number + Bricolage h2. */
function SectionHeading({
  number,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 22,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      border: '2px solid var(--ink)',
      color: 'var(--ink)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-structure)',
      fontWeight: 700,
      fontSize: 17,
      flex: 'none'
    }
  }, number), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-structure)',
      fontSize: 24,
      fontWeight: 600,
      margin: 0,
      color: 'var(--ink)'
    }
  }, children));
}

/** Sub-question heading inside a beat — Bricolage 19/600. */
function SubHeading({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-structure)',
      fontSize: 19,
      fontWeight: 600,
      margin: '0 0 18px',
      color: 'var(--ink)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { SectionHeading, SubHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/structure/WatchOut.jsx
try { (() => {
/** The misconception block — plum wash, "Watch out!" label, plum prose. The ONLY home of plum. */
function WatchOut({
  label = 'Watch out!',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--misconception-bg)',
      borderRadius: 'var(--radius-panel)',
      padding: 'var(--pad-watchout)',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-structure)',
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--misconception)',
      flex: 'none',
      paddingTop: 2
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.55,
      margin: 0,
      color: 'var(--misconception)'
    }
  }, children));
}
Object.assign(__ds_scope, { WatchOut });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/WatchOut.jsx", error: String((e && e.message) || e) }); }

// components/structure/WayCard.jsx
try { (() => {
/** Nested method panel ("Way 1 — just look") — uppercase label, serif prose, then math. */
function WayCard({
  label,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-inner)',
      borderRadius: 'var(--radius-panel)',
      padding: 'var(--pad-panel)',
      background: 'var(--card-inner)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-structure)',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--ink)',
      marginBottom: 10
    }
  }, label), children);
}
Object.assign(__ds_scope, { WayCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/structure/WayCard.jsx", error: String((e && e.message) || e) }); }

// components/voice/HoneyHighlight.jsx
try { (() => {
/** Honey marker wash behind ONE key phrase per teaching beat. Prose only — never near formulas/diagrams. */
function HoneyHighlight({
  children
}) {
  return /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 600,
      backgroundImage: 'var(--honey-wash)',
      backgroundSize: '100% 66%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 82%',
      borderRadius: '0.7em 0.4em 0.6em 0.5em',
      padding: '0 0.14em',
      WebkitBoxDecorationBreak: 'clone',
      boxDecorationBreak: 'clone'
    }
  }, children);
}
Object.assign(__ds_scope, { HoneyHighlight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/voice/HoneyHighlight.jsx", error: String((e && e.message) || e) }); }

// components/voice/TeacherAside.jsx
try { (() => {
/** A free-standing handwritten margin note / punchline line — larger Caveat, slate-blue, tilted. */
function TeacherAside({
  children,
  size = 'lg',
  style
}) {
  const sizes = {
    lg: 23,
    md: 21,
    sm: 18
  };
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-hand)',
      fontWeight: 500,
      fontSize: sizes[size] || sizes.lg,
      lineHeight: 1.3,
      color: 'var(--teacher)',
      margin: 0,
      transform: 'var(--tilt-aside)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { TeacherAside });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/voice/TeacherAside.jsx", error: String((e && e.message) || e) }); }

// components/voice/TeacherBubble.jsx
try { (() => {
/** The teacher's speech bubble — Caveat handwriting, slate-blue, tilted, tail corner bottom-left. */
function TeacherBubble({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-hand)',
      fontWeight: 500,
      fontSize: 21,
      lineHeight: 1.3,
      color: 'var(--teacher)',
      border: '1.5px solid var(--teacher-bubble-border)',
      borderRadius: 'var(--radius-bubble)',
      padding: 'var(--pad-bubble)',
      transform: 'var(--tilt-bubble)',
      background: 'var(--card-inner)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { TeacherBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/voice/TeacherBubble.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lesson/LessonScene.jsx
try { (() => {
function NumberLineDiagram() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 680 120",
    style: {
      width: '100%',
      display: 'block'
    },
    role: "img",
    "aria-label": "Body at positions 0, 5, 10, 15 meters at times 0 to 3 seconds"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "70",
    x2: "650",
    y2: "70",
    stroke: "#33291f",
    strokeWidth: "1.5",
    strokeDasharray: "5 5"
  }), /*#__PURE__*/React.createElement("g", {
    fontFamily: "Caveat, cursive",
    fontSize: "21",
    fill: "#4a7c59",
    textAnchor: "middle"
  }, /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "32"
  }, "t = 0 s"), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "32"
  }, "t = 1 s"), /*#__PURE__*/React.createElement("text", {
    x: "420",
    y: "32"
  }, "t = 2 s"), /*#__PURE__*/React.createElement("text", {
    x: "600",
    y: "32"
  }, "t = 3 s")), /*#__PURE__*/React.createElement("g", {
    fill: "#33291f"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "70",
    r: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "240",
    cy: "70",
    r: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "420",
    cy: "70",
    r: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "600",
    cy: "70",
    r: "9"
  })), /*#__PURE__*/React.createElement("g", {
    stroke: "#3d6bb3",
    strokeWidth: "1.3",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "72",
    y1: "98",
    x2: "228",
    y2: "98"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "252",
    y1: "98",
    x2: "408",
    y2: "98"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "432",
    y1: "98",
    x2: "588",
    y2: "98"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "72",
    y1: "93",
    x2: "72",
    y2: "103"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "228",
    y1: "93",
    x2: "228",
    y2: "103"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "252",
    y1: "93",
    x2: "252",
    y2: "103"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "408",
    y1: "93",
    x2: "408",
    y2: "103"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "432",
    y1: "93",
    x2: "432",
    y2: "103"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "588",
    y1: "93",
    x2: "588",
    y2: "103"
  })), /*#__PURE__*/React.createElement("g", {
    fontFamily: "Caveat, cursive",
    fontSize: "19",
    fill: "#3d6bb3",
    textAnchor: "middle"
  }, /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "117"
  }, "5 m"), /*#__PURE__*/React.createElement("text", {
    x: "330",
    y: "117"
  }, "5 m"), /*#__PURE__*/React.createElement("text", {
    x: "510",
    y: "117"
  }, "5 m")));
}
function LessonScene() {
  const {
    KickerBar,
    LessonCard,
    SectionHeading,
    SubHeading,
    DefinitionList,
    WayCard,
    WatchOut,
    HoneyHighlight,
    TeacherBubble,
    TeacherAside,
    Qty,
    Unit,
    Fraction,
    FormulaPill,
    DiagramPanel
  } = window.PhysicsCourseDesignSystem_5dfc85;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--page)',
      padding: 'var(--pad-page)',
      fontFamily: 'var(--font-body)',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max-width)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(KickerBar, {
    title: "Motion with constant speed",
    note: "color lives in the math \xB7 emphasis is a honey highlight"
  }), /*#__PURE__*/React.createElement(LessonCard, null, /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(DefinitionList, {
    items: [{
      term: 'Constant',
      def: /*#__PURE__*/React.createElement(React.Fragment, null, "means it is ", /*#__PURE__*/React.createElement(HoneyHighlight, null, "not changing with time"), ".")
    }, {
      term: 'Speed',
      def: /*#__PURE__*/React.createElement(React.Fragment, null, "means ", /*#__PURE__*/React.createElement("strong", {
        style: {
          fontWeight: 600
        }
      }, "how many meters you travel per second"), "."),
      note: /*#__PURE__*/React.createElement(React.Fragment, null, "scalar \u2014 ", /*#__PURE__*/React.createElement("em", null, "one"), " piece of information: how fast it goes.")
    }, {
      term: 'Velocity',
      def: /*#__PURE__*/React.createElement(React.Fragment, null, "means a vector with length equal to speed."),
      note: /*#__PURE__*/React.createElement(React.Fragment, null, "vector \u2014 ", /*#__PURE__*/React.createElement("em", null, "two"), " pieces of information: how fast, ", /*#__PURE__*/React.createElement("em", null, "and where"), ".")
    }]
  })), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(SectionHeading, {
    number: 1
  }, "Watching a body move"), /*#__PURE__*/React.createElement(TeacherBubble, {
    style: {
      marginBottom: 24
    }
  }, "I'm starting to look at a body from t\xA0=\xA00 \u2014 the moment I turn my stopwatch on."), /*#__PURE__*/React.createElement(DiagramPanel, {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(NumberLineDiagram, null)), /*#__PURE__*/React.createElement(TeacherAside, {
    style: {
      marginBottom: 34
    }
  }, "Pay attention \u2014 during equal time intervals we travel the ", /*#__PURE__*/React.createElement("u", null, "same distance"), "! That is motion with constant speed."), /*#__PURE__*/React.createElement(SubHeading, null, "How to find the speed?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(WayCard, {
    label: "Way 1 \u2014 just look"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16.5,
      lineHeight: 1.55,
      margin: 0
    }
  }, "For each interval of one second we travel 5\xA0m each time, so"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontStyle: 'italic',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Qty, {
    kind: "velocity"
  }, "v"), " = ", /*#__PURE__*/React.createElement(Qty, {
    kind: "velocity"
  }, "5"), " ", /*#__PURE__*/React.createElement(Unit, null, "m/s"))), /*#__PURE__*/React.createElement(WayCard, {
    label: "Way 2 \u2014 the formula"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16.5,
      lineHeight: 1.55,
      margin: 0
    }
  }, "Speed is distance traveled over time taken:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 21,
      fontStyle: 'italic',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Qty, {
    kind: "velocity"
  }, "v"), " ="), /*#__PURE__*/React.createElement(Fraction, {
    num: /*#__PURE__*/React.createElement(Qty, {
      kind: "position"
    }, "S"),
    den: /*#__PURE__*/React.createElement(Qty, {
      kind: "time"
    }, "t")
  }), /*#__PURE__*/React.createElement("span", null, "="), /*#__PURE__*/React.createElement(Fraction, {
    num: /*#__PURE__*/React.createElement(Qty, {
      kind: "position"
    }, "15 m"),
    den: /*#__PURE__*/React.createElement(Qty, {
      kind: "time"
    }, "3 s")
  }), /*#__PURE__*/React.createElement("span", null, "= ", /*#__PURE__*/React.createElement(Qty, {
    kind: "velocity"
  }, "5"), " ", /*#__PURE__*/React.createElement(Unit, null, "m/s"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "So, from this example we get:"), /*#__PURE__*/React.createElement(FormulaPill, null, "S = v \xB7 t"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15.5,
      color: 'var(--ink-muted)'
    }
  }, "where here ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'normal',
      fontWeight: 600
    }
  }, "S"), " means distance, and ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'normal',
      fontWeight: 600
    }
  }, "v"), " \u2014 speed.")), /*#__PURE__*/React.createElement(WatchOut, {
    style: {
      marginTop: 34
    }
  }, "Speed is never negative \u2014 it only says ", /*#__PURE__*/React.createElement("em", null, "how fast"), ". The minus sign you will soon meet belongs to ", /*#__PURE__*/React.createElement("strong", null, "velocity"), ", which also remembers ", /*#__PURE__*/React.createElement("em", null, "which way"), ". Same number, different question.")))));
}
window.LessonScene = LessonScene;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lesson/LessonScene.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DiagramPanel = __ds_scope.DiagramPanel;

__ds_ns.FormulaPill = __ds_scope.FormulaPill;

__ds_ns.Fraction = __ds_scope.Fraction;

__ds_ns.Qty = __ds_scope.Qty;

__ds_ns.Unit = __ds_scope.Unit;

__ds_ns.DefinitionList = __ds_scope.DefinitionList;

__ds_ns.KickerBar = __ds_scope.KickerBar;

__ds_ns.LessonCard = __ds_scope.LessonCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.SubHeading = __ds_scope.SubHeading;

__ds_ns.WatchOut = __ds_scope.WatchOut;

__ds_ns.WayCard = __ds_scope.WayCard;

__ds_ns.HoneyHighlight = __ds_scope.HoneyHighlight;

__ds_ns.TeacherAside = __ds_scope.TeacherAside;

__ds_ns.TeacherBubble = __ds_scope.TeacherBubble;

})();
