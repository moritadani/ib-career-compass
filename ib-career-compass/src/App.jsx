import { useState, useCallback, useRef, useEffect } from "react";
 
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
  resilientCard: {
    border: "1px solid rgba(10,10,15,0.08)", borderRadius: 20,
    padding: "1.1rem 1.4rem", background: "#f8fdf9", marginBottom: 10,
    borderLeft: "3px solid #0ea47a",
  },
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
  "summary": "Warm 1-2 sentence personalised summary referencing the student's IB strengths and AI-era potential.",
  "careers": [
    {
      "title": "Career title",
      "field": "Industry or field",
      "ai_label": "AI-Augmented",
      "ai_rationale": "1-2 sentences on AI impact and why this student is well-placed.",
      "why_fit": "2-3 sentences on fit with this student's specific IB subjects, skills and interests.",
      "daily_life": "1-2 sentences on a typical day by 2030.",
      "outlook": "e.g. Strong — AI expands demand ~25% by 2030",
      "salary_range": "e.g. $70k–$160k USD (always express in USD)",
      "ib_subjects": ["Subject 1", "Subject 2"],
      "degrees": ["Degree 1", "Degree 2"]
    }
  ],
  "action_plan": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
  "ai_resilient": [
    {
      "title": "Career or major title",
      "reason": "1-2 sentences on why AI is unlikely to replace this in the next 10 years.",
      "fit": "1 sentence on how this connects to the student's profile.",
      "majors": ["Relevant degree 1", "Relevant degree 2"]
    }
  ]
}
Return exactly 10 careers and exactly 6 ai_resilient entries. Keep all text fields to 1 sentence max. Be extremely concise.`;
 
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
      "qs_ranking": "e.g. #12 globally (QS World University Rankings 2024)",
      "qs_subject_ranking": "e.g. #5 in Engineering & Technology (QS Subject Rankings 2024)",
      "acceptance_rate": "~8%",
      "intl_student_rate": "e.g. ~32% international students",
      "ib_requirement": "e.g. 38+ pts, 7,6,6 at HL including Maths AA and Chemistry",
      "sat_requirement": "e.g. 1450–1580 (if applicable; write 'Not required' if the university does not use SAT)",
      "tuition_fees": "e.g. $55,000 USD/year (international students; always express in USD)",
      "cost_of_living": "e.g. ~$1,200–1,600 USD/month (housing, food, transport; always express in USD)",
      "notable_programs": ["Program 1", "Program 2"],
      "application_tips": "1-3 concise tips referencing IB Extended Essay, TOK, CAS, HL choices and AI-readiness signals.",
      "language_requirements": "State the primary language of instruction. If non-English, name it and list any required proficiency test (e.g. DELF B2, DSH-2, HSK 5). If English-medium, list IELTS/TOEFL minimums. Note if bilingual or English-track options exist.",
      "scholarships": "Key scholarships"
    }
  ]
}
Return 8 universities spread across countries (respecting abroad preference: ${abroad}). IB requirements must be precise and realistic. Keep application_tips to 1 sentence max. Be extremely concise. Use the most recent QS World University Rankings available (2025 or 2026).`;
 
/* ─── MAIN COMPONENT ──────────────────────────────────── */
export default function IBCareerCompass() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ academics: [], skills: [], interests: [], values: [] });
  const [abroad, setAbroad] = useState(2);
  const [score, setScore] = useState(2);
  const [dream, setDream] = useState("");
  const [careersInMind, setCareersInMind] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfDownloading, setPdfDownloading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const resultsRef = useRef(null);
 
  // Dynamically load a script tag once
  const loadScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
 
  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    setPdfDownloading(true);
    try {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      const { jsPDF } = window.jspdf;
      const canvas = await window.html2canvas(resultsRef.current, {
        scale: 2, useCORS: true, backgroundColor: "#f4f3f8", logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      let yOffset = 0;
      let remaining = imgH;
      while (remaining > 0) {
        pdf.addImage(imgData, "PNG", 0, -yOffset, imgW, imgH);
        remaining -= pageH;
        if (remaining > 0) { pdf.addPage(); yOffset += pageH; }
      }
      pdf.save("IB-Career-Compass-Report.pdf");
    } catch (e) {
      alert("PDF generation failed: " + e.message);
    } finally {
      setPdfDownloading(false);
    }
  };
 
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
        model: "claude-sonnet-4-5",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    const raw = data.content.map(i => i.text || "").join("").trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found in response");
    return JSON.parse(match[0]);
  };

  try {
    const [part1, part2] = await Promise.all([
      callAPI(buildCareersPrompt(sel, abroadLabel, scoreLabel, dream, careersInMind)),
      callAPI(buildUnisPrompt(sel, abroadLabel, scoreLabel, dream, careersInMind, [])),
    ]);
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
                <div ref={resultsRef}>
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
                        {u.qs_ranking && <div style={S.metaItem}><strong style={S.metaStrong}>🏅 {u.qs_ranking}</strong>QS World Ranking</div>}
                        {u.qs_subject_ranking && <div style={S.metaItem}><strong style={S.metaStrong}>📐 {u.qs_subject_ranking}</strong>QS Subject Ranking</div>}
                        <div style={S.metaItem}><strong style={S.metaStrong}>{u.acceptance_rate}</strong>Acceptance rate</div>
                        {u.intl_student_rate && <div style={S.metaItem}><strong style={S.metaStrong}>{u.intl_student_rate}</strong>International students</div>}
                        <div style={S.metaItem}><strong style={S.metaStrong}>{u.ib_requirement}</strong>IB requirement</div>
                        {u.sat_requirement && <div style={S.metaItem}><strong style={S.metaStrong}>{u.sat_requirement}</strong>SAT requirement</div>}
                        {u.tuition_fees && <div style={S.metaItem}><strong style={S.metaStrong}>{u.tuition_fees}</strong>Tuition fees</div>}
                        {u.cost_of_living && <div style={S.metaItem}><strong style={S.metaStrong}>{u.cost_of_living}</strong>Cost of living</div>}
                        <div style={{ ...S.metaItem, gridColumn: "1/-1" }}><strong style={S.metaStrong}>{(u.notable_programs || []).join(", ")}</strong>Notable programs</div>
                        {u.language_requirements && (
                          <div style={{ ...S.metaItem, gridColumn: "1/-1" }}><strong style={S.metaStrong}>🗣 {u.language_requirements}</strong>Language requirements</div>
                        )}
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
 
                  {result.ai_resilient && result.ai_resilient.length > 0 && (
                    <>
                      <div style={{ ...S.sectionTitle, marginTop: "1.5rem" }}>
                        <span style={{ ...S.sectionBar, background: "#0ea47a" }} /> Careers &amp; majors least impacted by AI
                      </div>
                      <div style={{ ...S.aiFutureBanner, marginBottom: "1rem" }}>
                        <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>🛡</span>
                        <div>These paths rely on deeply human skills — creativity, physical presence, emotional intelligence, ethical judgment — that AI is unlikely to replace within the next 10 years. Consider them as alternatives or complements to your main recommendations.</div>
                      </div>
                      {result.ai_resilient.map((r, i) => (
                        <div key={i} style={S.resilientCard}>
                          <div style={{ ...S.careerName, marginBottom: 6 }}>{r.title}</div>
                          <div style={S.careerBody}>
                            <p style={{ marginBottom: 5 }}><strong style={{ color: "#2d2d3a", fontWeight: 500 }}>Why AI-resilient:</strong> {r.reason}</p>
                            <p style={{ marginBottom: 8 }}><strong style={{ color: "#2d2d3a", fontWeight: 500 }}>Fits your profile:</strong> {r.fit}</p>
                            <div style={S.badgeRow}>
                              {(r.majors || []).map(m => <span key={m}>{pill(m, "green")}</span>)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
              <div style={{ ...S.resetRow, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                {result && (
                  <button
                    style={{ background: "#0a0a0f", border: "none", borderRadius: 12, padding: "10px 22px", fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", cursor: pdfDownloading ? "not-allowed" : "pointer", opacity: pdfDownloading ? 0.7 : 1, display: "flex", alignItems: "center", gap: 7 }}
                    onClick={downloadPDF}
                    disabled={pdfDownloading}
                  >
                    {pdfDownloading ? "⏳ Generating PDF…" : "⬇ Download report as PDF"}
                  </button>
                )}
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
