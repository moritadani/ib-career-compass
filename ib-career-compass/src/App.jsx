import { useState, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────── */
const IB_GROUPS = [
  {
    label: "Group 1 — Studies in language & literature",
    items: [
      "Language A: Literature (literary analysis, writing, world literature)",
      "Language A: Language & Literature (media, rhetoric, non-literary texts)",
    ],
  },
  {
    label: "Group 2 — Language acquisition",
    items: [
      "Language B (modern foreign languages — French, Spanish, Mandarin, Arabic, etc.)",
      "Language ab initio (beginners' foreign language learning)",
      "Classical languages (Latin, Classical Greek)",
    ],
  },
  {
    label: "Group 3 — Individuals & societies",
    items: [
      "History (global and regional historical analysis, source evaluation)",
      "Geography (physical, human and environmental geography, fieldwork)",
      "Economics (microeconomics, macroeconomics, international and development economics)",
      "Business Management (strategy, finance, marketing, operations, HRM)",
      "Psychology (human behaviour, research methods, abnormal and social psychology)",
      "Philosophy (ethics, epistemology, logic, metaphysics, TOK connections)",
      "Global Politics (power, sovereignty, human rights, global development)",
      "Social and Cultural Anthropology (culture, society, ethnographic fieldwork)",
      "Environmental Systems and Societies — ESS (interdisciplinary science and social science)",
    ],
  },
  {
    label: "Group 4 — Sciences",
    items: [
      "Biology (cells, genetics, ecology, evolution, human physiology)",
      "Chemistry (atomic structure, bonding, organic chemistry, reactions)",
      "Physics (mechanics, electricity, waves, modern and quantum physics)",
      "Computer Science (algorithms, programming, data structures, systems architecture, AI/ML basics)",
      "Design Technology (engineering design, innovation, product development, CAD)",
      "Sports, Exercise and Health Science — SEHS (physiology, psychology of sport, nutrition)",
    ],
  },
  {
    label: "Group 5 — Mathematics",
    items: [
      "Mathematics: Analysis and Approaches (pure mathematics, calculus, proof, abstract thinking)",
      "Mathematics: Applications and Interpretation (statistics, mathematical modelling, technology-integrated maths)",
    ],
  },
  {
    label: "Group 6 — The arts",
    items: [
      "Visual Arts (studio practice, art history, critique, exhibition curation)",
      "Music (composition, performance, music history and analysis)",
      "Theatre (performance, directing, design, theatre theory)",
      "Film (cinematography, narrative structure, film history, production)",
      "Dance (choreography, performance, dance theory and history)",
    ],
  },
];

const SKILLS = [
  "Problem solving and logical reasoning",
  "Creative and lateral thinking",
  "Leadership and motivating others",
  "Communication and public speaking",
  "Writing and storytelling",
  "Empathy and active listening",
  "Hands-on building and making things",
  "Analytical and data-driven thinking",
  "Visual and spatial reasoning",
  "Organising, planning and project management",
  "Research, investigation and synthesis of information",
  "Working well with diverse people and teams",
  "Ethical reasoning and moral judgment",
  "Adapting quickly to new information and situations",
];

const INTERESTS = [
  "Technology, AI and coding",
  "Health, medicine and life sciences",
  "Climate, environment and sustainability",
  "Social justice, equity and helping others",
  "Business, startups and entrepreneurship",
  "Creative arts, design and media",
  "Sports, fitness and human performance",
  "Science, research and discovery",
  "Travel, global cultures and international affairs",
  "Law, justice and policy",
  "Finance, economics and investment",
  "Education, mentoring and knowledge-sharing",
  "Gaming, interactive media and virtual worlds",
  "Food, hospitality and experiential industries",
  "Mental health, wellbeing and human psychology",
  "Space, astronomy and deep science",
];

const VALUES = [
  "Working independently with autonomy",
  "Collaborating in teams",
  "Helping and serving others directly",
  "High earning potential",
  "Work-life balance and flexibility",
  "Making a measurable social or environmental impact",
  "Prestige, influence and recognition",
  "Creative freedom and self-expression",
  "Long-term job security and stability",
  "Constant learning, growth and intellectual challenge",
  "Variety, travel and new experiences",
  "Building and leading my own venture",
];

const ABROAD_LABELS = ["Prefer home country", "Lean toward home", "Neutral", "Open to abroad", "Strongly want abroad"];
const SCORE_LABELS  = ["Below 24 pts", "24–27 pts", "28–32 pts", "33–37 pts", "38–45 pts"];

/* ─── STYLES ────────────────────────────────────────────── */
const S = {
  root: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#f4f3f8",
    minHeight: "100vh",
    padding: "2rem 1rem 4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    borderRadius: 28,
    border: "1px solid rgba(10,10,15,0.08)",
    boxShadow: "0 12px 40px rgba(10,10,15,0.14)",
    width: "100%",
    maxWidth: 740,
    overflow: "hidden",
  },
  hero: {
    padding: "2.5rem 2.5rem 2rem",
    background: "#0a0a0f",
    position: "relative",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute", inset: 0, pointerEvents: "none",
    background: "radial-gradient(circle at 70% 50%, rgba(91,77,232,0.28) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(14,164,122,0.14) 0%, transparent 50%)",
  },
  heroTag: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 100, padding: "5px 14px", fontSize: 11, fontWeight: 500,
    color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase",
    marginBottom: "1rem", position: "relative", zIndex: 1,
  },
  dot: {
    width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
  },
  heroH1: {
    fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)",
    fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em",
    marginBottom: "0.75rem", position: "relative", zIndex: 1,
  },
  heroAccent: {
    background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  },
  heroP: {
    fontSize: 14, color: "rgba(255,255,255,0.58)", maxWidth: 460, lineHeight: 1.7,
    fontWeight: 300, position: "relative", zIndex: 1,
  },
  progressWrap: {
    padding: "1.25rem 2.5rem 0", background: "#fff",
  },
  progressMeta: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  progressName: { fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color: "#5b4de8", textTransform: "uppercase", letterSpacing: "0.08em" },
  progressCount: { fontSize: 12, color: "#a0a0b8", fontWeight: 300 },
  progressTrack: { height: 3, background: "#eceaf4", borderRadius: 100, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#5b4de8,#8b7ef5)", borderRadius: 100, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" },
  body: { padding: "1.75rem 2.5rem 2.5rem" },
  h2: { fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#0a0a0f", marginBottom: 4, letterSpacing: "-0.02em" },
  sub: { fontSize: 14, color: "#6b6b80", marginBottom: "1.5rem", fontWeight: 300, lineHeight: 1.65 },
  groupLabel: {
    fontSize: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", color: "#a0a0b8", marginTop: "1.1rem", marginBottom: 8,
    display: "flex", alignItems: "center", gap: 8,
  },
  groupLine: { flex: 1, height: 1, background: "rgba(10,10,15,0.08)" },
  tags: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 },
  tag: (sel) => ({
    display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px",
    borderRadius: 100, border: sel ? "1px solid #5b4de8" : "1px solid rgba(10,10,15,0.16)",
    background: sel ? "#5b4de8" : "#fff", fontSize: 13,
    color: sel ? "#fff" : "#2d2d3a", cursor: "pointer",
    transition: "all 0.15s", userSelect: "none", fontWeight: sel ? 500 : 400,
  }),
  chk: (sel) => ({ fontSize: 11, opacity: sel ? 1 : 0, transition: "opacity 0.15s" }),
  aiFutureBanner: {
    display: "flex", alignItems: "flex-start", gap: 12,
    background: "linear-gradient(135deg,#ede9ff,#e0f2fe)",
    border: "1px solid rgba(91,77,232,0.2)", borderRadius: 12,
    padding: "12px 16px", marginBottom: "1.5rem", fontSize: 13, color: "#3730a3",
    lineHeight: 1.65, fontWeight: 300,
  },
  fieldLabel: { display: "block", fontSize: 13, fontWeight: 500, color: "#2d2d3a", marginBottom: 6 },
  fieldNote: { fontSize: 12, color: "#a0a0b8", fontWeight: 300, marginLeft: 4 },
  textarea: {
    width: "100%", padding: "11px 15px", borderRadius: 12,
    border: "1px solid rgba(10,10,15,0.16)", background: "#f4f3f8", color: "#0a0a0f",
    fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.6,
    resize: "vertical", outline: "none",
  },
  sliderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sliderLabel: { fontSize: 13, fontWeight: 500, color: "#2d2d3a" },
  sliderPill: {
    fontSize: 12, fontWeight: 500, color: "#5b4de8", background: "#ede9ff",
    padding: "3px 10px", borderRadius: 100,
  },
  btnRow: {
    display: "flex", gap: 10, justifyContent: "flex-end",
    paddingTop: "1.5rem", borderTop: "1px solid rgba(10,10,15,0.08)", marginTop: "1.5rem",
  },
  btn: {
    padding: "10px 22px", borderRadius: 12, border: "1px solid rgba(10,10,15,0.16)",
    background: "#fff", color: "#2d2d3a", fontSize: 14, fontWeight: 500, cursor: "pointer",
    transition: "all 0.15s",
  },
  btnPrimary: {
    padding: "10px 22px", borderRadius: 12, border: "1px solid #5b4de8",
    background: "#5b4de8", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer",
  },
  btnGenerate: {
    padding: "11px 26px", borderRadius: 12, border: "none",
    background: "#0a0a0f", color: "#fff",
    fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer",
    display: "flex", alignItems: "center", gap: 8,
  },
  loader: { textAlign: "center", padding: "3.5rem 1rem" },
  loaderTitle: { fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#0a0a0f", marginBottom: 6, marginTop: "1rem" },
  loaderSub: { fontSize: 13, color: "#6b6b80", fontWeight: 300 },
  errBox: {
    background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 12,
    padding: "12px 16px", fontSize: 13, color: "#dc2626", marginBottom: "1rem",
  },
  resultsBanner: {
    background: "linear-gradient(135deg,#0a0a0f,#1a1830)",
    borderRadius: 20, padding: "1.25rem 1.5rem", marginBottom: "1.75rem",
    position: "relative", overflow: "hidden",
  },
  resultsBannerGlow: {
    position: "absolute", inset: 0, pointerEvents: "none",
    background: "radial-gradient(circle at 80% 50%, rgba(91,77,232,0.22) 0%, transparent 60%)",
  },
  resultsBannerP: { fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontWeight: 300, position: "relative", zIndex: 1 },
  sectionTitle: {
    fontFamily: "'Syne',sans-serif", fontSize: "0.95rem", fontWeight: 700,
    color: "#0a0a0f", marginBottom: "1rem", letterSpacing: "-0.01em",
    display: "flex", alignItems: "center", gap: 8,
  },
  sectionBar: { width: 3, height: 18, background: "#5b4de8", borderRadius: 2, flexShrink: 0 },
  careerCard: {
    border: "1px solid rgba(10,10,15,0.08)", borderRadius: 20,
    padding: "1.1rem 1.4rem", background: "#fff", marginBottom: 10,
    borderLeft: "3px solid #5b4de8",
  },
  careerHead: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 },
  careerName: { fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#0a0a0f", letterSpacing: "-0.01em" },
  careerField: { fontSize: 12, color: "#6b6b80", fontWeight: 300, marginTop: 2 },
  careerBody: { fontSize: 13, color: "#6b6b80", lineHeight: 1.65, fontWeight: 300 },
  uniCard: { border: "1px solid rgba(10,10,15,0.08)", borderRadius: 20, padding: "1.1rem 1.4rem", background: "#fff", marginBottom: 10 },
  uniHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 },
  uniName: { fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#0a0a0f", letterSpacing: "-0.01em" },
  uniLoc: { fontSize: 12, color: "#6b6b80", fontWeight: 300, marginTop: 2 },
  uniMeta: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "10px 0" },
  metaItem: { fontSize: 12, color: "#6b6b80", fontWeight: 300 },
  metaStrong: { display: "block", fontWeight: 600, color: "#2d2d3a", fontSize: 13 },
  uniTips: { fontSize: 12, color: "#6b6b80", lineHeight: 1.65, fontWeight: 300, paddingTop: 10, borderTop: "1px solid rgba(10,10,15,0.08)" },
  actionItem: { display: "flex", gap: 13, alignItems: "flex-start", background: "#f4f3f8", borderRadius: 12, padding: "11px 15px", marginBottom: 8 },
  actionNum: {
    minWidth: 26, height: 26, borderRadius: "50%", background: "#5b4de8", color: "#fff",
    fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
  },
  actionText: { fontSize: 13, color: "#2d2d3a", lineHeight: 1.6, fontWeight: 300 },
  resetRow: { textAlign: "center", paddingTop: "1.25rem", borderTop: "1px solid rgba(10,10,15,0.08)", marginTop: "1.5rem" },
  legend: { display: "flex", flexWrap: "wrap", gap: 12, marginBottom: "1rem" },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#6b6b80" },
  legendDot: (bg) => ({ width: 8, height: 8, borderRadius: "50%", background: bg }),
  badgeRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 },
};

function pill(text, type) {
  const styles = {
    green:  { background: "#d1fae5", color: "#065f46" },
    amber:  { background: "#fef3c7", color: "#92400e" },
    blue:   { background: "#dbeafe", color: "#1e3a8a" },
    purple: { background: "#ede9ff", color: "#4a3dd1" },
  };
  return (
    <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 100, ...styles[type] }}>
      {text}
    </span>
  );
}

function AiBadge({ label }) {
  if (label === "AI-Augmented") return <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Syne',sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 100, background: "#e0f7f1", color: "#0f6e56", whiteSpace: "nowrap", flexShrink: 0 }}>⚡ AI-Augmented</span>;
  if (label === "AI-Evolving") return <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Syne',sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 100, background: "#fef3c7", color: "#92400e", whiteSpace: "nowrap", flexShrink: 0 }}>↗ AI-Evolving</span>;
  return <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Syne',sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 100, background: "#ede9ff", color: "#4a3dd1", whiteSpace: "nowrap", flexShrink: 0 }}>♡ Human-Essential</span>;
}

function CompBadge({ level }) {
  if (level === "High") return <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 100, background: "#fee2e2", color: "#dc2626", flexShrink: 0 }}>Highly competitive</span>;
  if (level === "Moderate") return <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 100, background: "#fef3c7", color: "#d97706", flexShrink: 0 }}>Moderately competitive</span>;
  return <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "'Syne',sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 100, background: "#e0f7f1", color: "#0ea47a", flexShrink: 0 }}>Accessible</span>;
}

function TagCloud({ items, selected, onToggle }) {
  return (
    <div style={S.tags}>
      {items.map(v => {
        const sel = selected.includes(v);
        return (
          <div key={v} style={S.tag(sel)} onClick={() => onToggle(v)}>
            <span style={S.chk(sel)}>✓</span>
            {v.length > 55 ? v.slice(0, v.indexOf("(") > 0 ? v.indexOf("(") - 1 : 55) + "…" : v}
          </div>
        );
      })}
    </div>
  );
}

function Slider({ value, onChange, labels }) {
  return (
    <input
      type="range" min={0} max={labels.length - 1} step={1} value={value}
      onChange={e => onChange(parseInt(e.target.value))}
      style={{ width: "100%", accentColor: "#5b4de8" }}
    />
  );
}

const STEP_NAMES = ["", "IB Subjects", "Skills", "Interests", "Values & Context"];

const PROFILE = (sel, abroad, score, dream, careersInMind) => `## Student Profile
- IB subject strengths: ${sel.academics.join("; ") || "Not specified"}
- Natural skills: ${sel.skills.join(", ") || "Not specified"}
- Passions & interests: ${sel.interests.join(", ") || "Not specified"}
- Work values: ${sel.values.join(", ") || "Not specified"}
- IB predicted score: ${score}
- Study abroad preference: ${abroad}
${dream ? "- Dream future: " + dream : ""}
${careersInMind ? "- Already considering: " + careersInMind : ""}`;

const buildCareersPrompt = (sel, abroad, score, dream, careersInMind) =>
`You are an expert career counselor for IB Diploma students. Account for how generative AI will reshape careers in the next 5-10 years.

${PROFILE(sel, abroad, score, dream, careersInMind)}

AI-era label — use exactly one: "AI-Augmented" (grows with AI), "AI-Evolving" (transforms significantly), "Human-Essential" (irreducibly human skills).

Return ONLY valid JSON, no markdown fences, no extra text:
{
  "summary": "Warm 2-3 sentence personalised summary referencing the student's IB strengths and AI-era potential.",
  "careers": [
    {
      "title": "Career title",
      "field": "Industry or field",
      "ai_label": "AI-Augmented",
      "ai_rationale": "1-2 sentences on AI impact and why this student is well-placed.",
      "why_fit": "2-3 sentences on fit with this student's specific IB subjects, skills and interests.",
      "daily_life": "1-2 sentences on a typical day by 2030.",
      "outlook": "e.g. Strong — AI expands demand ~25% by 2030",
      "salary_range": "e.g. $70k–$160k USD",
      "ib_subjects": ["Subject 1", "Subject 2"],
      "degrees": ["Degree 1", "Degree 2"]
    }
  ],
  "action_plan": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]
}
Return exactly 4 careers. Keep all text fields concise (1-3 sentences max).`;

const buildUnisPrompt = (sel, abroad, score, dream, careersInMind, careers) =>
`You are an expert university admissions advisor for IB Diploma students.

${PROFILE(sel, abroad, score, dream, careersInMind)}
Recommended careers: ${careers.map(c => c.title).join(", ")}

Return ONLY valid JSON, no markdown fences, no extra text:
{
  "universities": [
    {
      "name": "University name",
      "country": "Country",
      "city": "City",
      "for_career": "Which career above this best suits",
      "competitiveness": "High",
      "acceptance_rate": "~8%",
      "ib_requirement": "e.g. 38+ pts, 7,6,6 at HL including Maths AA and Chemistry",
      "notable_programs": ["Program 1", "Program 2"],
      "application_tips": "3-4 concise tips referencing IB Extended Essay, TOK, CAS, HL choices and AI-readiness signals.",
      "tuition_local": "Annual tuition for domestic/EU students e.g. £9,250/yr or Free (Germany public)",
      "tuition_international": "Annual tuition for international students e.g. £32,000–£38,000/yr",
      "living_costs": "Estimated annual living costs (accommodation, food, transport) e.g. £14,000–£18,000/yr in London",
      "other_fees": "Notable additional costs e.g. student union £300, lab fees £500, health insurance £800 (if applicable)",
      "scholarships": "Key scholarships with amounts where known"
    }
  ]
}
Return 5-6 universities spread across countries (respecting abroad preference: ${abroad}). IB requirements must be precise and realistic. All fees must be realistic and clearly specify the currency and whether they are per year. Keep application_tips concise.`;

/* ─── PDF GENERATOR ────────────────────────────────────── */
async function generatePDF(result, selProfile) {
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pw = 210; // page width
  const margin = 18;
  const cw = pw - margin * 2; // content width
  let y = 0;

  const ACCENT = [91, 77, 232];
  const DARK   = [10, 10, 15];
  const MID    = [45, 45, 58];
  const MUTED  = [107, 107, 128];
  const WHITE  = [255, 255, 255];
  const LIGHT  = [244, 243, 248];

  function newPageIfNeeded(needed = 20) {
    if (y + needed > 272) { doc.addPage(); y = margin; }
  }

  function setColor(rgb) { doc.setTextColor(...rgb); }
  function setFill(rgb)  { doc.setFillColor(...rgb); }
  function setDraw(rgb)  { doc.setDrawColor(...rgb); }

  function wrappedText(text, x, maxW, lineH) {
    const lines = doc.splitTextToSize(String(text || ""), maxW);
    lines.forEach(line => {
      newPageIfNeeded(lineH + 2);
      doc.text(line, x, y);
      y += lineH;
    });
    return lines.length;
  }

  // ── Cover / Header ──────────────────────────────────
  setFill(DARK);
  doc.rect(0, 0, pw, 48, "F");

  // accent bar
  setFill(ACCENT);
  doc.rect(0, 0, 4, 48, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  setColor(WHITE);
  doc.text("IB Career & University Compass", margin, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setColor([180, 180, 210]);
  doc.text("AI-era edition  ·  Generated " + new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" }), margin, 29);

  doc.setFontSize(9);
  setColor([140, 140, 170]);
  const profileLine = [
    selProfile.academics.slice(0,3).join(", ") || "IB subjects not specified",
  ].join(" · ");
  doc.splitTextToSize(profileLine, cw).forEach((ln, i) => doc.text(ln, margin, 38 + i * 5));

  y = 58;

  // ── Summary ─────────────────────────────────────────
  if (result.summary) {
    newPageIfNeeded(24);
    setFill([237, 233, 255]);
    doc.roundedRect(margin, y, cw, 1, 2, 2, "F"); // thin accent line
    setFill([237, 233, 255]);
    const summLines = doc.splitTextToSize(result.summary, cw - 12);
    const summH = summLines.length * 5 + 10;
    doc.roundedRect(margin, y, cw, summH, 3, 3, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setColor([58, 48, 137]);
    summLines.forEach((ln, i) => doc.text(ln, margin + 6, y + 7 + i * 5));
    y += summH + 6;
  }

  // ── Section heading helper ───────────────────────────
  function sectionHeading(title) {
    newPageIfNeeded(14);
    y += 4;
    setFill(ACCENT);
    doc.rect(margin, y - 4, 3, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    setColor(DARK);
    doc.text(title, margin + 7, y + 3);
    y += 10;
    setDraw([220, 218, 235]);
    doc.setLineWidth(0.3);
    doc.line(margin, y, margin + cw, y);
    y += 5;
  }

  // ── AI label helper ──────────────────────────────────
  function aiLabelBadge(label, x, yy) {
    let bg, fg, txt;
    if (label === "AI-Augmented")   { bg = [224,247,241]; fg = [15,110,86];  txt = "AI-Augmented"; }
    else if (label === "AI-Evolving") { bg = [254,243,199]; fg = [146,64,14]; txt = "AI-Evolving"; }
    else                              { bg = [237,233,255]; fg = [74,61,209]; txt = "Human-Essential"; }
    const tw = doc.getTextWidth(txt) + 6;
    setFill(bg);
    doc.roundedRect(x, yy - 4, tw, 6, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    setColor(fg);
    doc.text(txt, x + 3, yy);
    return tw;
  }

  // ── CAREERS ──────────────────────────────────────────
  sectionHeading("Recommended Career Paths");

  (result.careers || []).forEach((c, idx) => {
    newPageIfNeeded(50);
    const boxStart = y;

    // card background
    setFill(WHITE);
    setDraw([220, 218, 235]);
    doc.setLineWidth(0.3);

    // left accent stripe colour by ai_label
    const stripeColor = c.ai_label === "AI-Augmented" ? [14,164,122]
                      : c.ai_label === "AI-Evolving"  ? [217,119,6]
                      : ACCENT;

    // Title row
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(DARK);
    doc.text(`${idx + 1}. ${c.title}`, margin, y);
    aiLabelBadge(c.ai_label, margin + doc.getTextWidth(`${idx + 1}. ${c.title}`) + 4, y);
    y += 5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    setColor(MUTED);
    doc.text(c.field || "", margin, y);
    y += 6;

    // Body fields
    const fields = [
      ["AI impact",       c.ai_rationale],
      ["Why it fits you", c.why_fit],
      ["Day-to-day 2030", c.daily_life],
      ["Outlook",         c.outlook],
      ["Salary range",    c.salary_range],
    ];
    fields.forEach(([label, val]) => {
      if (!val) return;
      newPageIfNeeded(10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      setColor(MID);
      doc.text(label + ": ", margin + 2, y);
      const lw = doc.getTextWidth(label + ": ");
      doc.setFont("helvetica", "normal");
      setColor(MUTED);
      const lines = doc.splitTextToSize(val, cw - lw - 4);
      doc.text(lines[0], margin + 2 + lw, y);
      y += 4.5;
      if (lines.length > 1) {
        lines.slice(1).forEach(ln => {
          newPageIfNeeded(5);
          doc.text(ln, margin + 2 + lw, y);
          y += 4.5;
        });
      }
    });

    // IB subjects + degrees pills row
    if ((c.ib_subjects||[]).length || (c.degrees||[]).length) {
      newPageIfNeeded(8);
      y += 1;
      let px = margin + 2;
      [...(c.ib_subjects||[]).map(s=>["#dbeafe","#1e3a8a",s]),
       ...(c.degrees||[]).map(d=>["#ede9ff","#4a3dd1",d])].forEach(([bg, fg, txt]) => {
        const tw = doc.getTextWidth(txt) + 5;
        if (px + tw > margin + cw) { px = margin + 2; y += 6; newPageIfNeeded(8); }
        doc.setFillColor(...bg.match(/\w\w/g).map(x=>parseInt(x,16)));
        doc.roundedRect(px, y - 3.5, tw, 5, 1.2, 1.2, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(...fg.match(/\w\w/g).map(x=>parseInt(x,16)));
        doc.text(txt, px + 2.5, y);
        px += tw + 2;
      });
      y += 6;
    }

    // left stripe
    setFill(stripeColor);
    doc.rect(margin - 3, boxStart - 4, 2, y - boxStart + 5, "F");

    // bottom separator
    setDraw(LIGHT);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 1, margin + cw, y + 1);
    y += 7;
  });

  // ── UNIVERSITIES ─────────────────────────────────────
  sectionHeading("Recommended Universities & Colleges");

  (result.universities || []).forEach((u, idx) => {
    newPageIfNeeded(48);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(DARK);
    doc.text(`${idx + 1}. ${u.name}`, margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setColor(MUTED);
    doc.text(`${u.city}, ${u.country}  ·  Best for: ${u.for_career || ""}`, margin, y);
    y += 5;

    // competitiveness badge
    const compColors = {
      High:       ["#fee2e2","#dc2626","Highly competitive"],
      Moderate:   ["#fef3c7","#d97706","Moderately competitive"],
      Accessible: ["#e0f7f1","#0ea47a","Accessible"],
    };
    const [cbg, cfg, ctxt] = compColors[u.competitiveness] || compColors.Accessible;
    const ctw = doc.getTextWidth(ctxt) + 6;
    doc.setFillColor(...cbg.match(/\w\w/g).map(x=>parseInt(x,16)));
    doc.roundedRect(margin, y - 3.5, ctw, 5.5, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...cfg.match(/\w\w/g).map(x=>parseInt(x,16)));
    doc.text(ctxt, margin + 3, y);
    y += 7;

    // meta grid
    const metaItems = [
      ["Acceptance rate",        u.acceptance_rate],
      ["IB requirement",         u.ib_requirement],
      ["Notable programs",       (u.notable_programs||[]).join(", ")],
      ["Tuition (domestic/EU)",  u.tuition_local],
      ["Tuition (international)",u.tuition_international],
      ["Est. living costs/yr",   u.living_costs],
      ["Other fees",             u.other_fees],
    ];
    metaItems.forEach(([label, val]) => {
      if (!val) return;
      newPageIfNeeded(10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      setColor(MID);
      doc.text(label + ": ", margin + 2, y);
      const lw = doc.getTextWidth(label + ": ");
      doc.setFont("helvetica", "normal");
      setColor(MUTED);
      const lines = doc.splitTextToSize(String(val), cw - lw - 4);
      doc.text(lines[0], margin + 2 + lw, y);
      y += 4.5;
      lines.slice(1).forEach(ln => { newPageIfNeeded(5); doc.text(ln, margin + 2 + lw, y); y += 4.5; });
    });

    // tips
    if (u.application_tips) {
      newPageIfNeeded(10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      setColor(MID);
      doc.text("How to get in: ", margin + 2, y);
      y += 4.5;
      doc.setFont("helvetica", "normal");
      setColor(MUTED);
      doc.splitTextToSize(u.application_tips, cw - 6).forEach(ln => {
        newPageIfNeeded(5);
        doc.text(ln, margin + 4, y);
        y += 4.5;
      });
    }
    if (u.scholarships) {
      newPageIfNeeded(10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      setColor(MID);
      doc.text("Scholarships: ", margin + 2, y);
      const lw = doc.getTextWidth("Scholarships: ");
      doc.setFont("helvetica", "normal");
      setColor(MUTED);
      doc.splitTextToSize(u.scholarships, cw - lw - 4).forEach((ln, i) => {
        newPageIfNeeded(5);
        doc.text(ln, i === 0 ? margin + 2 + lw : margin + 4, y);
        y += 4.5;
      });
    }

    setDraw(LIGHT);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 1, margin + cw, y + 1);
    y += 7;
  });

  // ── ACTION PLAN ──────────────────────────────────────
  if (result.action_plan && result.action_plan.length) {
    sectionHeading("Your Action Plan");
    result.action_plan.forEach((step, i) => {
      newPageIfNeeded(14);
      // number circle
      setFill(ACCENT);
      doc.circle(margin + 3.5, y - 1.5, 3.5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      setColor(WHITE);
      doc.text(String(i + 1), margin + 2.2, y - 0.2);
      // text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      setColor(MID);
      const lines = doc.splitTextToSize(step, cw - 12);
      lines.forEach((ln, li) => {
        newPageIfNeeded(5);
        doc.text(ln, margin + 10, y + li * 5);
      });
      y += lines.length * 5 + 4;
    });
  }

  // ── Footer on each page ──────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    setFill([237, 233, 255]);
    doc.rect(0, 287, pw, 10, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(ACCENT);
    doc.text("IB Career Compass — AI-era edition", margin, 293);
    doc.text(`Page ${p} of ${totalPages}`, pw - margin - 16, 293);
  }

  // doc.save() is blocked inside sandboxed iframes (claude.ai artifacts).
  // Instead, open the PDF as a blob URL in a new tab where the user can
  // view it and use the browser's own Save / Download button.
  const blob = doc.output("blob");
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if (!win) {
    // If popup was blocked, fall back to an anchor-click download
    const a = document.createElement("a");
    a.href = url;
    a.download = "IB_Career_Compass.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

/* ─── MAIN COMPONENT ──────────────────────────────────── */
export default function IBCareerCompass() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ academics: [], skills: [], interests: [], values: [] });
  const [abroad, setAbroad] = useState(2);
  const [score, setScore] = useState(2);
  const [dream, setDream] = useState("");
  const [careersInMind, setCareersInMind] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const toggle = useCallback((key, val) => {
    setSel(prev => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  }, []);

  const generate = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setStep(99);

    const abroadLabel = ABROAD_LABELS[abroad];
    const scoreLabel  = SCORE_LABELS[score];

    const callAPI = async (prompt) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const raw = data.content.map(i => i.text || "").join("");
      return JSON.parse(raw.replace(/```json[\s\S]*?```|```/g, "").trim());
    };

    try {
      // Call 1: careers, summary, action plan
      const part1 = await callAPI(buildCareersPrompt(sel, abroadLabel, scoreLabel, dream, careersInMind));
      // Call 2: universities (uses career titles from call 1 for context)
      const part2 = await callAPI(buildUnisPrompt(sel, abroadLabel, scoreLabel, dream, careersInMind, part1.careers || []));
      setResult({ ...part1, universities: part2.universities || [] });
      setStep(100);
    } catch (e) {
      setError(e.message);
      setStep(100);
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setSel({ academics: [], skills: [], interests: [], values: [] });
    setAbroad(2); setScore(2); setDream(""); setCareersInMind("");
    setResult(null); setError(""); setStep(0);
  };

  const showProgress = step >= 1 && step <= 4;

  return (
    <div style={S.root}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={S.card}>

        {/* Hero */}
        <div style={S.hero}>
          <div style={S.heroGlow} />
          <div style={S.heroTag}><span style={S.dot} /> IB Diploma · AI-era edition</div>
          <h1 style={S.heroH1}>Your career &amp;<br /><span style={S.heroAccent}>university compass</span></h1>
          <p style={S.heroP}>Built for IB students heading into a world shaped by AI. Get career paths that will still matter in 2030+, plus university recommendations matched to your profile.</p>
        </div>

        {/* Progress */}
        {showProgress && (
          <div style={S.progressWrap}>
            <div style={S.progressMeta}>
              <span style={S.progressName}>{STEP_NAMES[step]}</span>
              <span style={S.progressCount}>{step} of 5</span>
            </div>
            <div style={S.progressTrack}>
              <div style={{ ...S.progressFill, width: `${step * 20}%` }} />
            </div>
          </div>
        )}

        <div style={S.body}>

          {/* ── Step 0: Start ── */}
          {step === 0 && (
            <div>
              <h2 style={S.h2}>Let's map your future.</h2>
              <p style={S.sub}>Answer 5 short sections about your IB strengths, skills, and ambitions. Claude will then generate careers and universities tailored specifically to you — with an eye on what's relevant in an AI-driven world.</p>
              <div style={S.aiFutureBanner}>
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚡</span>
                <div><strong style={{ fontWeight: 500 }}>AI-aware recommendations.</strong> This tool considers which careers will grow, evolve, or transform as AI becomes mainstream. Expect honest, forward-looking guidance — not just what's popular today.</div>
              </div>
              <div style={{ ...S.btnRow, borderTop: "none", paddingTop: 0, marginTop: 0, justifyContent: "flex-start" }}>
                <button style={S.btnGenerate} onClick={() => setStep(1)}>
                  <span>✦</span> Begin my assessment
                </button>
              </div>
            </div>
          )}

          {/* ── Step 1: IB Subjects ── */}
          {step === 1 && (
            <div>
              <h2 style={S.h2}>IB academic strengths</h2>
              <p style={S.sub}>Which IB Diploma subject groups do you genuinely enjoy or perform well in? Select all that apply.</p>
              {IB_GROUPS.map((g, i) => (
                <div key={i}>
                  <div style={{ ...S.groupLabel, marginTop: i === 0 ? 0 : "1.1rem" }}>
                    {g.label}<span style={S.groupLine} />
                  </div>
                  <TagCloud items={g.items} selected={sel.academics} onToggle={v => toggle("academics", v)} />
                </div>
              ))}
              <div style={S.btnRow}>
                <button style={S.btn} onClick={() => setStep(0)}>← Back</button>
                <button style={S.btnPrimary} onClick={() => setStep(2)}>Continue →</button>
              </div>
            </div>
          )}

          {/* ── Step 2: Skills ── */}
          {step === 2 && (
            <div>
              <h2 style={S.h2}>Natural skills & talents</h2>
              <p style={S.sub}>What are you naturally good at — inside or outside the classroom?</p>
              <TagCloud items={SKILLS} selected={sel.skills} onToggle={v => toggle("skills", v)} />
              <div style={S.btnRow}>
                <button style={S.btn} onClick={() => setStep(1)}>← Back</button>
                <button style={S.btnPrimary} onClick={() => setStep(3)}>Continue →</button>
              </div>
            </div>
          )}

          {/* ── Step 3: Interests ── */}
          {step === 3 && (
            <div>
              <h2 style={S.h2}>Passions & interests</h2>
              <p style={S.sub}>What genuinely excites you — in or out of school?</p>
              <TagCloud items={INTERESTS} selected={sel.interests} onToggle={v => toggle("interests", v)} />
              <div style={S.btnRow}>
                <button style={S.btn} onClick={() => setStep(2)}>← Back</button>
                <button style={S.btnPrimary} onClick={() => setStep(4)}>Continue →</button>
              </div>
            </div>
          )}

          {/* ── Step 4: Values & Context ── */}
          {step === 4 && (
            <div>
              <h2 style={S.h2}>Work values & ambitions</h2>
              <p style={S.sub}>What matters most to you in a career, and a little about your context.</p>
              <div style={{ ...S.groupLabel, marginTop: 0 }}>What matters most in a career<span style={S.groupLine} /></div>
              <TagCloud items={VALUES} selected={sel.values} onToggle={v => toggle("values", v)} />

              <div style={{ marginTop: "1.5rem", marginBottom: "1.25rem" }}>
                <div style={S.sliderRow}>
                  <span style={S.sliderLabel}>Studying abroad preference</span>
                  <span style={S.sliderPill}>{ABROAD_LABELS[abroad]}</span>
                </div>
                <Slider value={abroad} onChange={setAbroad} labels={ABROAD_LABELS} />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <div style={S.sliderRow}>
                  <span style={S.sliderLabel}>IB predicted score</span>
                  <span style={S.sliderPill}>{SCORE_LABELS[score]}</span>
                </div>
                <Slider value={score} onChange={setScore} labels={SCORE_LABELS} />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={S.fieldLabel}>Dream future <span style={S.fieldNote}>— optional</span></label>
                <textarea style={{ ...S.textarea, minHeight: 72 }} rows={3} value={dream} onChange={e => setDream(e.target.value)} placeholder="e.g. I'd love to lead a tech startup, travel frequently, and work on problems that matter for the planet..." />
              </div>

              <div style={{ marginBottom: "0.5rem" }}>
                <label style={S.fieldLabel}>Careers already on your radar <span style={S.fieldNote}>— optional</span></label>
                <textarea style={{ ...S.textarea, minHeight: 52 }} rows={2} value={careersInMind} onChange={e => setCareersInMind(e.target.value)} placeholder="e.g. Medicine, UX design, international law..." />
              </div>

              <div style={S.btnRow}>
                <button style={S.btn} onClick={() => setStep(3)}>← Back</button>
                <button style={S.btnGenerate} onClick={generate}>
                  <span>✦</span> Generate my plan
                </button>
              </div>
            </div>
          )}

          {/* ── Loading ── */}
          {step === 99 && (
            <div style={S.loader}>
              <div style={{ width: 48, height: 48, border: "3px solid #eceaf4", borderTopColor: "#5b4de8", borderRadius: "50%", animation: "spin 0.9s linear infinite", margin: "0 auto" }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              <div style={S.loaderTitle}>Building your personalised plan…</div>
              <div style={S.loaderSub}>Running two AI calls — careers first, then universities. Usually 20–35 seconds.</div>
            </div>
          )}

          {/* ── Results ── */}
          {step === 100 && (
            <div>
              {error && <div style={S.errBox}><strong>Something went wrong.</strong> Please try again. ({error})</div>}
              {result && (
                <>
                  {result.summary && (
                    <div style={S.resultsBanner}>
                      <div style={S.resultsBannerGlow} />
                      <div style={{ fontSize: 18, marginBottom: 8, position: "relative", zIndex: 1 }}>✦</div>
                      <p style={S.resultsBannerP}>{result.summary}</p>
                    </div>
                  )}

                  <div style={S.sectionTitle}><span style={S.sectionBar} /> Recommended career paths</div>
                  <div style={S.legend}>
                    {[["#0ea47a","AI-Augmented"],["#d97706","AI-Evolving"],["#5b4de8","Human-Essential"]].map(([c,l]) => (
                      <div key={l} style={S.legendItem}><div style={S.legendDot(c)} />{l}</div>
                    ))}
                  </div>

                  {(result.careers || []).map((c, i) => (
                    <div key={i} style={S.careerCard}>
                      <div style={S.careerHead}>
                        <div>
                          <div style={S.careerName}>{c.title}</div>
                          <div style={S.careerField}>{c.field}</div>
                        </div>
                        <AiBadge label={c.ai_label} />
                      </div>
                      <div style={S.careerBody}>
                        <p style={{ marginBottom: 5 }}><strong style={{ color: "#2d2d3a", fontWeight: 500 }}>AI impact:</strong> {c.ai_rationale}</p>
                        <p style={{ marginBottom: 5 }}><strong style={{ color: "#2d2d3a", fontWeight: 500 }}>Why it fits you:</strong> {c.why_fit}</p>
                        <p style={{ marginBottom: 5 }}><strong style={{ color: "#2d2d3a", fontWeight: 500 }}>Day-to-day by 2030:</strong> {c.daily_life}</p>
                        <div style={S.badgeRow}>
                          {pill("📈 " + c.outlook, "green")}
                          {pill("💰 " + c.salary_range, "amber")}
                        </div>
                        <div style={S.badgeRow}>
                          {(c.ib_subjects || []).map(s => <span key={s}>{pill(s, "blue")}</span>)}
                          {(c.degrees || []).map(d => <span key={d}>{pill(d, "purple")}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div style={{ ...S.sectionTitle, marginTop: "1.5rem" }}><span style={S.sectionBar} /> Recommended universities & colleges</div>
                  {(result.universities || []).map((u, i) => (
                    <div key={i} style={S.uniCard}>
                      <div style={S.uniHead}>
                        <div>
                          <div style={S.uniName}>{u.name}</div>
                          <div style={S.uniLoc}>📍 {u.city}, {u.country} · Best for: {u.for_career}</div>
                        </div>
                        <CompBadge level={u.competitiveness} />
                      </div>
                      <div style={S.uniMeta}>
                        <div style={S.metaItem}><strong style={S.metaStrong}>{u.acceptance_rate}</strong>Acceptance rate</div>
                        <div style={S.metaItem}><strong style={S.metaStrong}>{u.ib_requirement}</strong>IB requirement</div>
                        <div style={{ ...S.metaItem, gridColumn: "1/-1" }}><strong style={S.metaStrong}>{(u.notable_programs || []).join(", ")}</strong>Notable programs</div>
                      </div>
                      {/* Fees section */}
                      <div style={{ borderTop: "1px solid rgba(10,10,15,0.08)", paddingTop: 10, marginTop: 2, marginBottom: 2 }}>
                        <div style={{ fontSize: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a0a0b8", marginBottom: 8 }}>Annual fees & costs</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                          {u.tuition_local && (
                            <div style={S.metaItem}><strong style={S.metaStrong}>{u.tuition_local}</strong>Tuition (domestic/EU)</div>
                          )}
                          {u.tuition_international && (
                            <div style={S.metaItem}><strong style={S.metaStrong}>{u.tuition_international}</strong>Tuition (international)</div>
                          )}
                          {u.living_costs && (
                            <div style={S.metaItem}><strong style={S.metaStrong}>{u.living_costs}</strong>Est. living costs/yr</div>
                          )}
                          {u.other_fees && (
                            <div style={{ ...S.metaItem, gridColumn: "1/-1" }}><strong style={S.metaStrong}>{u.other_fees}</strong>Other fees</div>
                          )}
                        </div>
                      </div>
                      <div style={S.uniTips}>
                        <strong style={{ color: "#2d2d3a", fontWeight: 500 }}>How to get in:</strong> {u.application_tips}
                        {u.scholarships && <><br /><br /><strong style={{ color: "#2d2d3a", fontWeight: 500 }}>Scholarships:</strong> {u.scholarships}</>}
                      </div>
                    </div>
                  ))}

                  {result.action_plan && result.action_plan.length > 0 && (
                    <>
                      <div style={{ ...S.sectionTitle, marginTop: "1.5rem" }}><span style={S.sectionBar} /> Your action plan</div>
                      {result.action_plan.map((s, i) => (
                        <div key={i} style={S.actionItem}>
                          <div style={S.actionNum}>{i + 1}</div>
                          <div style={S.actionText}>{s}</div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
              {result && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
                  <button
                    style={{ ...S.btnGenerate, background: pdfLoading ? "#0a7a5c" : "#0ea47a", borderColor: "#0ea47a", gap: 8, opacity: pdfLoading ? 0.8 : 1, cursor: pdfLoading ? "wait" : "pointer" }}
                    onClick={async () => {
                      if (pdfLoading) return;
                      setPdfLoading(true);
                      try { await generatePDF(result, sel); }
                      catch(e) { alert("Could not generate PDF: " + e.message); }
                      finally { setPdfLoading(false); }
                    }}
                  >
                    <span>{pdfLoading ? "⏳" : "↗"}</span>
                    {pdfLoading ? "Generating PDF…" : "Open PDF report"}
                  </button>
                </div>
              )}
              <div style={S.resetRow}>
                <button style={{ background: "none", border: "1px solid rgba(10,10,15,0.16)", borderRadius: 12, padding: "10px 20px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#6b6b80", cursor: "pointer" }} onClick={restart}>
                  ↺ Start over with different answers
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
