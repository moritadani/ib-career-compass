import { useState, useCallback } from "react";
 
/* ─── COUNTRIES ─────────────────────────────────────────── */
const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)",
  "Congo (Kinshasa)","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica",
  "Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
  "Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea",
  "Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
  "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives",
  "Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua",
  "Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama",
  "Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands",
  "Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia",
  "Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];
 
/* ─── SUBJECT GROUPS ────────────────────────────────────── */
const SUBJECT_GROUPS = [
  { label: "Language & Literature", items: ["Literature (literary analysis, writing, world literature)","Language & Literature (media, rhetoric, non-literary texts)"] },
  { label: "Language Acquisition",  items: ["Modern foreign languages (French, Spanish, Mandarin, Arabic, etc.)","Beginner foreign language learning","Classical languages (Latin, Classical Greek)"] },
  { label: "Individuals & Societies", items: ["History (global and regional historical analysis, source evaluation)","Geography (physical, human and environmental geography, fieldwork)","Economics (micro, macro, international and development economics)","Business Management (strategy, finance, marketing, operations, HRM)","Psychology (human behaviour, research methods, abnormal and social psychology)","Philosophy (ethics, epistemology, logic, metaphysics)","Global Politics (power, sovereignty, human rights, global development)","Social and Cultural Anthropology (culture, society, ethnographic fieldwork)","Environmental Systems and Societies (interdisciplinary science and social science)"] },
  { label: "Sciences", items: ["Biology (cells, genetics, ecology, evolution, human physiology)","Chemistry (atomic structure, bonding, organic chemistry, reactions)","Physics (mechanics, electricity, waves, modern and quantum physics)","Computer Science (algorithms, programming, data structures, systems, AI/ML basics)","Design Technology (engineering design, innovation, product development, CAD)","Sports, Exercise and Health Science (physiology, psychology of sport, nutrition)"] },
  { label: "Mathematics", items: ["Mathematics: Analysis and Approaches (pure mathematics, calculus, proof)","Mathematics: Applications and Interpretation (statistics, modelling, technology)"] },
  { label: "The Arts", items: ["Visual Arts (studio practice, art history, critique, exhibition curation)","Music (composition, performance, music history and analysis)","Theatre (performance, directing, design, theatre theory)","Film (cinematography, narrative structure, film history, production)","Dance (choreography, performance, dance theory and history)"] },
];
 
const SKILLS = [
  "Problem solving and logical reasoning","Creative and lateral thinking","Leadership and motivating others",
  "Communication and public speaking","Writing and storytelling","Empathy and active listening",
  "Hands-on building and making things","Analytical and data-driven thinking","Visual and spatial reasoning",
  "Organising, planning and project management","Research, investigation and synthesis of information",
  "Working well with diverse people and teams","Ethical reasoning and moral judgment",
  "Adapting quickly to new information and situations",
];
 
const INTERESTS = [
  "Technology, AI and coding","Robotics, automation and embedded systems","Data science, machine learning and deep learning",
  "Cybersecurity and digital privacy","Bioengineering and biotechnology","Neuroscience and brain-computer interfaces",
  "Renewable energy and clean technology","Space exploration, astronomy and astrophysics",
  "Quantum computing and advanced physics","Nanotechnology and materials science",
  "Health, medicine and life sciences","Climate, environment and sustainability",
  "Social justice, equity and helping others","Business, startups and entrepreneurship",
  "Creative arts, design and media","Sports, fitness and human performance","Science, research and discovery",
  "Travel, global cultures and international affairs","Law, justice and policy","Finance, economics and investment",
  "Education, mentoring and knowledge-sharing","Gaming, interactive media and virtual worlds",
  "Food, hospitality and experiential industries","Mental health, wellbeing and human psychology",
];
 
const VALUES = [
  "Working independently with autonomy","Collaborating in teams","Helping and serving others directly",
  "High earning potential","Work-life balance and flexibility","Making a measurable social or environmental impact",
  "Prestige, influence and recognition","Creative freedom and self-expression","Long-term job security and stability",
  "Constant learning, growth and intellectual challenge","Variety, travel and new experiences",
  "Building and leading my own venture",
];
 
const ABROAD_LABELS = ["Prefer home country","Lean toward home","Neutral","Open to abroad","Strongly want abroad"];
const STEP_NAMES    = ["","About You","Academic Strengths","Skills","Interests","Values & Ambitions"];
 
/* ─── TIMELINE COLOURS ──────────────────────────────────── */
const TL_COLORS = ["#5b4de8","#0ea47a","#d97706","#e84d7a","#0891b2"];
 
/* ─── STYLES ────────────────────────────────────────────── */
const S = {
  root: {
    fontFamily: "'Inter', 'DM Sans', 'Segoe UI', sans-serif",
    background: "#f4f3f8", minHeight: "100vh",
    padding: "2rem 1rem 4rem", display: "flex", flexDirection: "column", alignItems: "center",
  },
  card: {
    background: "#fff", borderRadius: 28, border: "1px solid rgba(10,10,15,0.08)",
    boxShadow: "0 12px 40px rgba(10,10,15,0.14)", width: "100%", maxWidth: 740, overflow: "hidden",
  },
  hero: { padding: "2.75rem 2.5rem 2.25rem", background: "#0a0a0f", position: "relative", overflow: "hidden" },
  heroGlow: {
    position: "absolute", inset: 0, pointerEvents: "none",
    background: "radial-gradient(circle at 70% 50%, rgba(91,77,232,0.3) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(14,164,122,0.15) 0%, transparent 50%)",
  },
  heroH1: {
    fontFamily: "'Plus Jakarta Sans', 'Outfit', 'DM Sans', sans-serif",
    fontSize: "clamp(2rem,4.5vw,3rem)",
    fontWeight: 700, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em",
    marginBottom: "0.85rem", position: "relative", zIndex: 1,
  },
  heroAccent: {
    background: "linear-gradient(135deg,#a78bfa 0%,#60a5fa 50%,#34d399 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  },
  heroP: { fontSize: 14, color: "rgba(255,255,255,0.55)", maxWidth: 460, lineHeight: 1.7, fontWeight: 400, position: "relative", zIndex: 1 },
  progressWrap: { padding: "1.25rem 2.5rem 0", background: "#fff" },
  progressMeta: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  progressName: { fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#5b4de8", textTransform: "uppercase", letterSpacing: "0.08em" },
  progressCount: { fontSize: 12, color: "#a0a0b8", fontWeight: 400 },
  progressTrack: { height: 3, background: "#eceaf4", borderRadius: 100, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#5b4de8,#8b7ef5)", borderRadius: 100, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" },
  body: { padding: "1.75rem 2.5rem 2.5rem" },
  h2: { fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#0a0a0f", marginBottom: 4, letterSpacing: "-0.02em" },
  sub: { fontSize: 14, color: "#6b6b80", marginBottom: "1.5rem", fontWeight: 400, lineHeight: 1.65 },
  groupLabel: {
    fontSize: 10, fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontWeight: 700, letterSpacing: "0.1em",
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
  aiBanner: {
    display: "flex", alignItems: "flex-start", gap: 12,
    background: "linear-gradient(135deg,#ede9ff,#e0f2fe)",
    border: "1px solid rgba(91,77,232,0.2)", borderRadius: 12,
    padding: "12px 16px", marginBottom: "1.5rem", fontSize: 13, color: "#3730a3", lineHeight: 1.65, fontWeight: 400,
  },
  fieldLabel: { display: "block", fontSize: 13, fontWeight: 500, color: "#2d2d3a", marginBottom: 6 },
  fieldNote: { fontSize: 12, color: "#a0a0b8", fontWeight: 400, marginLeft: 4 },
  input: {
    width: "100%", padding: "11px 15px", borderRadius: 12,
    border: "1px solid rgba(10,10,15,0.16)", background: "#f4f3f8", color: "#0a0a0f",
    fontFamily: "inherit", fontSize: 14, fontWeight: 400, outline: "none", boxSizing: "border-box",
  },
  select: {
    width: "100%", padding: "11px 15px", borderRadius: 12,
    border: "1px solid rgba(10,10,15,0.16)", background: "#f4f3f8", color: "#0a0a0f",
    fontFamily: "inherit", fontSize: 14, fontWeight: 400, outline: "none", cursor: "pointer",
    appearance: "none", boxSizing: "border-box",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b6b80' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "40px",
  },
  textarea: {
    width: "100%", padding: "11px 15px", borderRadius: 12,
    border: "1px solid rgba(10,10,15,0.16)", background: "#f4f3f8", color: "#0a0a0f",
    fontFamily: "inherit", fontSize: 14, fontWeight: 400, lineHeight: 1.6, resize: "vertical", outline: "none",
  },
  sliderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sliderLabel: { fontSize: 13, fontWeight: 500, color: "#2d2d3a" },
  sliderPill: { fontSize: 12, fontWeight: 500, color: "#5b4de8", background: "#ede9ff", padding: "3px 10px", borderRadius: 100 },
  btnRow: { display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: "1.5rem", borderTop: "1px solid rgba(10,10,15,0.08)", marginTop: "1.5rem" },
  btn: { padding: "10px 22px", borderRadius: 12, border: "1px solid rgba(10,10,15,0.16)", background: "#fff", color: "#2d2d3a", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnPrimary: { padding: "10px 22px", borderRadius: 12, border: "1px solid #5b4de8", background: "#5b4de8", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnGenerate: {
    padding: "11px 26px", borderRadius: 12, border: "none", background: "#0a0a0f", color: "#fff",
    fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: 15, fontWeight: 700,
    cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
  },
  loader: { textAlign: "center", padding: "3.5rem 1rem" },
  loaderTitle: { fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#0a0a0f", marginBottom: 6, marginTop: "1rem" },
  loaderSub: { fontSize: 13, color: "#6b6b80", fontWeight: 400 },
  errBox: { background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#dc2626", marginBottom: "1rem" },
  resultsBanner: { background: "linear-gradient(135deg,#0a0a0f,#1a1830)", borderRadius: 20, padding: "1.25rem 1.5rem", marginBottom: "1.75rem", position: "relative", overflow: "hidden" },
  resultsBannerGlow: { position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 80% 50%, rgba(91,77,232,0.22) 0%, transparent 60%)" },
  resultsBannerP: { fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, fontWeight: 400, position: "relative", zIndex: 1 },
  sectionTitle: {
    fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: "0.95rem", fontWeight: 700,
    color: "#0a0a0f", marginBottom: "1rem", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 8,
  },
  sectionBar: { width: 3, height: 18, background: "#5b4de8", borderRadius: 2, flexShrink: 0 },
  groupHeader: {
    fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 700,
    letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff",
    padding: "5px 12px", borderRadius: 8, marginTop: "1.25rem", marginBottom: "0.6rem",
    display: "inline-block",
  },
  careerCard: { border: "1px solid rgba(10,10,15,0.08)", borderRadius: 20, padding: "1.1rem 1.4rem", background: "#fff", marginBottom: 10, borderLeft: "3px solid #5b4de8" },
  careerHead: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 },
  careerName: { fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#0a0a0f", letterSpacing: "-0.01em" },
  careerField: { fontSize: 12, color: "#6b6b80", fontWeight: 400, marginTop: 2 },
  careerBody: { fontSize: 13, color: "#6b6b80", lineHeight: 1.65, fontWeight: 400 },
  uniCard: { border: "1px solid rgba(10,10,15,0.08)", borderRadius: 20, padding: "1.1rem 1.4rem", background: "#fff", marginBottom: 10 },
  uniHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 },
  uniName: { fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#0a0a0f", letterSpacing: "-0.01em" },
  uniLoc: { fontSize: 12, color: "#6b6b80", fontWeight: 400, marginTop: 2 },
  uniMeta: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "10px 0" },
  metaItem: { fontSize: 12, color: "#6b6b80", fontWeight: 400 },
  metaStrong: { display: "block", fontWeight: 600, color: "#2d2d3a", fontSize: 13 },
  uniTips: { fontSize: 12, color: "#6b6b80", lineHeight: 1.65, fontWeight: 400, paddingTop: 10, borderTop: "1px solid rgba(10,10,15,0.08)" },
  actionItem: { display: "flex", gap: 13, alignItems: "flex-start", background: "#f4f3f8", borderRadius: 12, padding: "11px 15px", marginBottom: 8 },
  actionNum: { minWidth: 26, height: 26, borderRadius: "50%", background: "#5b4de8", color: "#fff", fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 },
  actionText: { fontSize: 13, color: "#2d2d3a", lineHeight: 1.6, fontWeight: 400 },
  resetRow: { textAlign: "center", paddingTop: "1.25rem", borderTop: "1px solid rgba(10,10,15,0.08)", marginTop: "1.5rem" },
  legend: { display: "flex", flexWrap: "wrap", gap: 12, marginBottom: "1rem" },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#6b6b80" },
  legendDot: (bg) => ({ width: 8, height: 8, borderRadius: "50%", background: bg }),
  badgeRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 },
};
 
/* ─── HELPER COMPONENTS ─────────────────────────────────── */
function pill(text, type) {
  const styles = { green:{background:"#d1fae5",color:"#065f46"}, amber:{background:"#fef3c7",color:"#92400e"}, blue:{background:"#dbeafe",color:"#1e3a8a"}, purple:{background:"#ede9ff",color:"#4a3dd1"} };
  return <span style={{ fontSize:11, fontWeight:500, padding:"3px 10px", borderRadius:100, ...styles[type] }}>{text}</span>;
}
 
function AiBadge({ label }) {
  if (label==="AI-Augmented") return <span style={{ fontSize:10, fontWeight:700, fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", letterSpacing:"0.06em", textTransform:"uppercase", padding:"4px 9px", borderRadius:100, background:"#e0f7f1", color:"#0f6e56", whiteSpace:"nowrap", flexShrink:0 }}>⚡ AI-Augmented</span>;
  if (label==="AI-Evolving")  return <span style={{ fontSize:10, fontWeight:700, fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", letterSpacing:"0.06em", textTransform:"uppercase", padding:"4px 9px", borderRadius:100, background:"#fef3c7", color:"#92400e", whiteSpace:"nowrap", flexShrink:0 }}>↗ AI-Evolving</span>;
  return <span style={{ fontSize:10, fontWeight:700, fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", letterSpacing:"0.06em", textTransform:"uppercase", padding:"4px 9px", borderRadius:100, background:"#ede9ff", color:"#4a3dd1", whiteSpace:"nowrap", flexShrink:0 }}>♡ Human-Essential</span>;
}
 
function CompBadge({ level }) {
  if (level==="High")     return <span style={{ fontSize:10, fontWeight:700, fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:"0.06em", padding:"4px 10px", borderRadius:100, background:"#fee2e2", color:"#dc2626", flexShrink:0 }}>Highly competitive</span>;
  if (level==="Moderate") return <span style={{ fontSize:10, fontWeight:700, fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:"0.06em", padding:"4px 10px", borderRadius:100, background:"#fef3c7", color:"#d97706", flexShrink:0 }}>Moderately competitive</span>;
  return <span style={{ fontSize:10, fontWeight:700, fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:"0.06em", padding:"4px 10px", borderRadius:100, background:"#e0f7f1", color:"#0ea47a", flexShrink:0 }}>Accessible</span>;
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
  return <input type="range" min={0} max={labels.length-1} step={1} value={value} onChange={e => onChange(parseInt(e.target.value))} style={{ width:"100%", accentColor:"#5b4de8" }} />;
}
 
/* ─── VISUAL TIMELINE ───────────────────────────────────── */
function Timeline({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0ea47a", marginBottom: 12 }}>
        Application timeline
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {items.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            {/* Left column: dot + line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: TL_COLORS[i % TL_COLORS.length], flexShrink: 0, marginTop: 3 }} />
              {i < items.length - 1 && <div style={{ width: 2, flex: 1, background: "rgba(10,10,15,0.08)", minHeight: 18, marginTop: 2 }} />}
            </div>
            {/* Right column: label + text */}
            <div style={{ paddingBottom: i < items.length - 1 ? 12 : 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: TL_COLORS[i % TL_COLORS.length], fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", marginBottom: 2 }}>
                {t.month}
              </div>
              <div style={{ fontSize: 12, color: "#4b4b60", lineHeight: 1.5, fontWeight: 400 }}>
                {t.action}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
/* ─── PROMPTS ───────────────────────────────────────────── */
const PROFILE = (dem, sel, abroad, homeCountry, dream, careersInMind) =>
`## Student Profile
- Name: ${dem.name || "Not provided"}
- Home country: ${homeCountry || "Not specified"}
- Academic strengths: ${sel.academics.join("; ") || "Not specified"}
- Natural skills: ${sel.skills.join(", ") || "Not specified"}
- Passions & interests: ${sel.interests.join(", ") || "Not specified"}
- Work values: ${sel.values.join(", ") || "Not specified"}
- Study abroad preference: ${abroad} (home country: ${homeCountry || "not specified"})
${dream ? "- Dream future: " + dream : ""}
${careersInMind ? "- Already considering: " + careersInMind : ""}`;
 
const buildCareersPrompt = (dem, sel, abroad, homeCountry, dream, careersInMind) =>
`You are an expert career counselor for high school students. Your task is to recommend careers that will remain relevant, resilient and in-demand in an AI-driven world — not necessarily AI careers, but careers that AI cannot fully replace.
 
${PROFILE(dem, sel, abroad, homeCountry, dream, careersInMind)}
 
## Critical career selection principles
- Prioritise careers that rely on irreducibly human capabilities: complex judgment, physical presence, emotional intelligence, ethical accountability, creative vision, human relationships, and embodied skills
- A career does NOT need to involve AI or technology — a surgeon, diplomat, architect, therapist, teacher or chef can be just as future-proof as a data scientist
- Avoid recommending careers where AI is projected to significantly reduce headcount or eliminate the role within 10–15 years (e.g. routine data entry, basic legal research, standard accounting, content moderation)
- If a recommended career is enhanced by AI tools, note that — but the career's core value must rest on human capability, not AI output
- Match careers to this specific student's strengths, subjects and interests — do not default to generic "safe" choices
 
## AI-era label — use exactly one per career:
- "AI-Augmented": career grows stronger as professionals use AI tools — but the human judgment, creativity or relationships remain the core value (e.g. surgeon using AI diagnostics, architect using generative design tools, teacher personalising learning with AI)
- "AI-Evolving": career is transforming — professionals who adapt their skills will thrive; those who don't may struggle (e.g. journalist, lawyer, financial advisor)
- "Human-Essential": career depends on capabilities AI fundamentally cannot replicate — physical care, complex empathy, moral accountability, spiritual/cultural meaning, elite physical performance (e.g. nurse, psychotherapist, diplomat, athlete, chef)
 
Return ONLY valid JSON, no markdown fences, no extra text:
{
  "summary": "Warm 2-3 sentence personalised summary addressing the student by first name if provided, noting their specific strengths and why they are well-placed in an AI-era world.",
  "careers": [
    {
      "title": "Career title",
      "field": "Industry or field",
      "ai_label": "AI-Augmented",
      "ai_rationale": "1-2 sentences: why AI cannot replace this career, and how AI may enhance (not replace) the human in this role.",
      "why_fit": "2-3 sentences on fit with this student's specific strengths, subjects and interests.",
      "daily_life": "1-2 sentences on a typical day by 2030.",
      "outlook": "e.g. Strong — demand grows as AI handles routine tasks, freeing humans for complex judgment",
      "salary_range": "e.g. $70k–$160k USD",
      "subjects": ["Relevant subject 1", "Subject 2"],
      "degrees": ["Degree 1", "Degree 2"]
    }
  ],
  "action_plan": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]
}
Return exactly 4 careers. Keep all text fields concise (1-3 sentences max). Prioritise careers that are genuinely matched to this student — not generic suggestions.`;
 
const buildIBUnisPrompt = (dem, sel, abroad, homeCountry, dream, careersInMind, careers, batch) => {
  const batchNote = "Return exactly 7 universities spread across different countries respecting abroad preference: " + abroad + " from " + (homeCountry || "home country") + ". Include universities from Europe, UK, Asia-Pacific, Canada and other relevant regions.";
  return `You are an expert university admissions advisor for high school students.
 
${PROFILE(dem, sel, abroad, homeCountry, dream, careersInMind)}
Recommended careers: ${careers.map(c => c.title).join(", ")}
 
IMPORTANT — ALL monetary amounts must be expressed in USD ($). Convert from local currency using approximate current exchange rates.
 
COMPETITIVENESS CONSISTENCY RULE:
- "High" competitiveness: international acceptance rate below 20%
- "Moderate" competitiveness: international acceptance rate 20%–50%
- "Accessible": international acceptance rate above 50%
Base the competitiveness badge on the INTERNATIONAL acceptance rate only.
 
${batchNote}
 
Return ONLY valid JSON, no markdown fences, no extra text:
{
  "ib_universities": [
    {
      "name": "University name",
      "country": "Country",
      "city": "City",
      "for_career": "Which career this best suits",
      "competitiveness": "High",
      "qs_ranking_overall": "e.g. #47 QS World University Rankings 2025, or Not ranked",
      "qs_ranking_subject": "e.g. #12 QS Subject Ranking 2025 — Computer Science & Information Systems, or Not ranked in relevant subject",
      "acceptance_rate_overall": "e.g. ~35% (all applicants)",
      "acceptance_rate_international": "e.g. ~12% (international applicants)",
      "ib_score_req": "e.g. 38+ pts overall, 6,6,6 at HL including Chemistry and Maths AA",
      "notable_programs": ["Program 1", "Program 2"],
      "application_tips": "2-3 concise actionable tips.",
      "tuition_local": "e.g. ~$12,000/yr (domestic)",
      "tuition_international": "e.g. ~$42,000/yr (international)",
      "living_costs": "e.g. ~$18,000–22,000/yr",
      "other_fees": "e.g. ~$600/yr (student union, health cover)",
      "scholarships": "Key scholarships with USD amounts where known"
    }
  ]
}
All IB score requirements must be precise and realistic. All fees in USD. For QS rankings: use the most recent QS World University Rankings available in your training data for the overall rank. For the subject ranking, use the most relevant QS Subject Ranking that matches the recommended career or field — e.g. for a Medicine career use QS Medicine ranking, for Engineering use QS Engineering & Technology, for Business use QS Business & Management Studies. Use the exact rank number where known, or state "Not ranked" if absent. Keep tips brief.`;
};
 
const buildSATUnisPrompt = (dem, sel, abroad, homeCountry, dream, careersInMind, careers, batch) => {
  const batchNote = "Return exactly 7 universities where SAT is the PRIMARY admission metric — primarily US, Canada and other SAT-accepting institutions. Vary the institutions across regions and selectivity levels.";
  return `You are an expert university admissions advisor for high school students.
 
${PROFILE(dem, sel, abroad, homeCountry, dream, careersInMind)}
Recommended careers: ${careers.map(c => c.title).join(", ")}
 
IMPORTANT — ALL monetary amounts must be expressed in USD ($). Convert from local currency using approximate current exchange rates.
 
COMPETITIVENESS CONSISTENCY RULE:
- "High" competitiveness: international acceptance rate below 20%
- "Moderate" competitiveness: international acceptance rate 20%–50%
- "Accessible": international acceptance rate above 50%
Base the competitiveness badge on the INTERNATIONAL acceptance rate only.
 
${batchNote}
 
Return ONLY valid JSON, no markdown fences, no extra text:
{
  "sat_universities": [
    {
      "name": "University name",
      "country": "Country",
      "city": "City",
      "for_career": "Which career this best suits",
      "competitiveness": "High",
      "qs_ranking_overall": "e.g. #1 QS World University Rankings 2025, or Not ranked",
      "qs_ranking_subject": "e.g. #3 QS Subject Ranking 2025 — Engineering & Technology, or Not ranked in relevant subject",
      "acceptance_rate_overall": "e.g. ~40% (all applicants)",
      "acceptance_rate_international": "e.g. ~15% (international applicants)",
      "sat_score_req": "e.g. SAT 1450+ (Evidence-Based Reading & Math)",
      "ib_also_accepted": "Yes — IB 38+ pts accepted in lieu of SAT" or "No — SAT/ACT required; IB not accepted as substitute",
      "notable_programs": ["Program 1", "Program 2"],
      "application_tips": "2-3 concise actionable tips.",
      "tuition_local": "e.g. ~$16,000/yr (in-state)",
      "tuition_international": "e.g. ~$58,000/yr",
      "living_costs": "e.g. ~$18,000–22,000/yr",
      "other_fees": "e.g. ~$3,000/yr (activity fee, health insurance)",
      "scholarships": "Key scholarships with USD amounts where known"
    }
  ]
}
For each university accurately state whether the IB Diploma score is also accepted as an alternative entry qualification. All fees in USD. For QS rankings: use the most recent QS World University Rankings available in your training data for the overall rank. For the subject ranking, use the most relevant QS Subject Ranking that matches the recommended career or field — e.g. for a Medicine career use QS Medicine ranking, for Engineering use QS Engineering & Technology, for Business use QS Business & Management Studies. Use the exact rank number where known, or state "Not ranked" if absent. Keep tips brief.`;
};
 
/* ─── PDF GENERATOR ─────────────────────────────────────── */
async function generatePDF(result, selProfile, demographics, homeCountry) {
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:"mm", format:"a4" });
  const pw=210, margin=18, cw=pw-margin*2;
  let y=0;
  const ACCENT=[91,77,232], DARK=[10,10,15], MID=[45,45,58], MUTED=[107,107,128], WHITE=[255,255,255], LIGHT=[244,243,248];
  function newPageIfNeeded(n=20){if(y+n>272){doc.addPage();y=margin;}}
  function setColor(c){doc.setTextColor(...c);}
  function setFill(c){doc.setFillColor(...c);}
  function setDraw(c){doc.setDrawColor(...c);}
 
  // Cover
  setFill(DARK); doc.rect(0,0,pw,54,"F");
  setFill(ACCENT); doc.rect(0,0,4,54,"F");
  doc.setFont("helvetica","bold"); doc.setFontSize(22); setColor(WHITE);
  doc.text("Career & University Compass", margin, 18);
  doc.setFont("helvetica","normal"); doc.setFontSize(10); setColor([180,180,210]);
  doc.text("Generated " + new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}), margin, 28);
  if (demographics.name) { doc.setFontSize(11); setColor([200,200,230]); doc.text("Prepared for: " + demographics.name + (homeCountry ? "  ·  " + homeCountry : ""), margin, 38); }
  doc.setFontSize(9); setColor([140,140,170]);
  doc.splitTextToSize((selProfile.academics.slice(0,3).join(", ")||"Subjects not specified"),cw).forEach((ln,i)=>doc.text(ln,margin,46+i*5));
  y=64;
 
  if (result.summary) {
    newPageIfNeeded(24);
    const sl=doc.splitTextToSize(result.summary,cw-12), sh=sl.length*5+10;
    setFill([237,233,255]); doc.roundedRect(margin,y,cw,sh,3,3,"F");
    doc.setFont("helvetica","normal"); doc.setFontSize(10); setColor([58,48,137]);
    sl.forEach((ln,i)=>doc.text(ln,margin+6,y+7+i*5)); y+=sh+6;
  }
 
  function sectionHeading(title) {
    newPageIfNeeded(14); y+=4;
    setFill(ACCENT); doc.rect(margin,y-4,3,10,"F");
    doc.setFont("helvetica","bold"); doc.setFontSize(12); setColor(DARK);
    doc.text(title,margin+7,y+3); y+=10;
    setDraw([220,218,235]); doc.setLineWidth(0.3); doc.line(margin,y,margin+cw,y); y+=5;
  }
 
  function aiLabelBadge(label,x,yy) {
    let bg,fg,txt;
    if(label==="AI-Augmented"){bg=[224,247,241];fg=[15,110,86];txt="AI-Augmented";}
    else if(label==="AI-Evolving"){bg=[254,243,199];fg=[146,64,14];txt="AI-Evolving";}
    else{bg=[237,233,255];fg=[74,61,209];txt="Human-Essential";}
    const tw=doc.getTextWidth(txt)+6; setFill(bg);
    doc.roundedRect(x,yy-4,tw,6,1.5,1.5,"F");
    doc.setFont("helvetica","bold"); doc.setFontSize(7); setColor(fg);
    doc.text(txt,x+3,yy); return tw;
  }
 
  sectionHeading("Recommended Career Paths");
  (result.careers||[]).forEach((c,idx)=>{
    newPageIfNeeded(50); const boxStart=y;
    const sc=c.ai_label==="AI-Augmented"?[14,164,122]:c.ai_label==="AI-Evolving"?[217,119,6]:ACCENT;
    doc.setFont("helvetica","bold"); doc.setFontSize(11); setColor(DARK);
    doc.text(`${idx+1}. ${c.title}`,margin,y);
    aiLabelBadge(c.ai_label,margin+doc.getTextWidth(`${idx+1}. ${c.title}`)+4,y); y+=5;
    doc.setFont("helvetica","italic"); doc.setFontSize(9); setColor(MUTED); doc.text(c.field||"",margin,y); y+=6;
    [["Why AI won't replace this",c.ai_rationale],["Why it fits you",c.why_fit],["Day-to-day by 2030",c.daily_life],["Outlook",c.outlook],["Salary range",c.salary_range]].forEach(([label,val])=>{
      if(!val)return; newPageIfNeeded(10);
      doc.setFont("helvetica","bold"); doc.setFontSize(8.5); setColor(MID); doc.text(label+": ",margin+2,y);
      const lw=doc.getTextWidth(label+": ");
      doc.setFont("helvetica","normal"); setColor(MUTED);
      const lines=doc.splitTextToSize(val,cw-lw-4);
      doc.text(lines[0],margin+2+lw,y); y+=4.5;
      lines.slice(1).forEach(ln=>{newPageIfNeeded(5);doc.text(ln,margin+2+lw,y);y+=4.5;});
    });
    if((c.subjects||[]).length||(c.degrees||[]).length){
      newPageIfNeeded(8); y+=1; let px=margin+2;
      [...(c.subjects||[]).map(s=>["#dbeafe","#1e3a8a",s]),...(c.degrees||[]).map(d=>["#ede9ff","#4a3dd1",d])].forEach(([bg,fg,txt])=>{
        const tw=doc.getTextWidth(txt)+5;
        if(px+tw>margin+cw){px=margin+2;y+=6;newPageIfNeeded(8);}
        doc.setFillColor(...bg.match(/\w\w/g).map(x=>parseInt(x,16)));
        doc.roundedRect(px,y-3.5,tw,5,1.2,1.2,"F");
        doc.setFont("helvetica","normal"); doc.setFontSize(7.5);
        doc.setTextColor(...fg.match(/\w\w/g).map(x=>parseInt(x,16)));
        doc.text(txt,px+2.5,y); px+=tw+2;
      }); y+=6;
    }
    setFill(sc); doc.rect(margin-3,boxStart-4,2,y-boxStart+5,"F");
    setDraw(LIGHT); doc.setLineWidth(0.4); doc.line(margin,y+1,margin+cw,y+1); y+=7;
  });
 
  function renderUnis(unis, scoreLabel, scoreField) {
    unis.forEach((u,idx)=>{
      newPageIfNeeded(60);
      doc.setFont("helvetica","bold"); doc.setFontSize(11); setColor(DARK); doc.text(`${idx+1}. ${u.name}`,margin,y); y+=5;
      doc.setFont("helvetica","normal"); doc.setFontSize(9); setColor(MUTED);
      doc.text(`${u.city}, ${u.country}  ·  Best for: ${u.for_career||""}`,margin,y); y+=5;
      // QS Rankings
      if(u.qs_ranking_overall){
        doc.setFont("helvetica","bold"); doc.setFontSize(8.5); setColor([91,77,232]);
        doc.text("🏅 "+u.qs_ranking_overall, margin+2, y); y+=4.5;
      }
      if(u.qs_ranking_subject){
        doc.setFont("helvetica","normal"); doc.setFontSize(8.5); setColor([14,164,122]);
        doc.text("📚 "+u.qs_ranking_subject, margin+2, y); y+=5;
      }
      const cc={High:["#fee2e2","#dc2626","Highly competitive"],Moderate:["#fef3c7","#d97706","Moderately competitive"],Accessible:["#e0f7f1","#0ea47a","Accessible"]};
      const [cbg,cfg,ctxt]=cc[u.competitiveness]||cc.Accessible;
      const ctw=doc.getTextWidth(ctxt)+6; doc.setFillColor(...cbg.match(/\w\w/g).map(x=>parseInt(x,16)));
      doc.roundedRect(margin,y-3.5,ctw,5.5,1.5,1.5,"F"); doc.setFont("helvetica","bold"); doc.setFontSize(7.5);
      doc.setTextColor(...cfg.match(/\w\w/g).map(x=>parseInt(x,16))); doc.text(ctxt,margin+3,y); y+=7;
      [
        [scoreLabel, u[scoreField]],
        ...(scoreField==="sat_score_req"&&u.ib_also_accepted ? [["IB Diploma accepted?", u.ib_also_accepted]] : []),
        ["Acceptance rate (overall)",       u.acceptance_rate_overall||u.acceptance_rate],
        ["Acceptance rate (international)", u.acceptance_rate_international],
        ["Notable programs",               (u.notable_programs||[]).join(", ")],
        ["Tuition (domestic)",              u.tuition_local],
        ["Tuition (international)",         u.tuition_international],
        ["Est. living costs / yr",          u.living_costs],
        ["Other fees",                      u.other_fees],
      ].forEach(([label,val])=>{
        if(!val)return; newPageIfNeeded(10);
        doc.setFont("helvetica","bold"); doc.setFontSize(8.5); setColor(MID); doc.text(label+": ",margin+2,y);
        const lw=doc.getTextWidth(label+": ");
        doc.setFont("helvetica","normal"); setColor(MUTED);
        const lines=doc.splitTextToSize(String(val),cw-lw-4);
        doc.text(lines[0],margin+2+lw,y); y+=4.5;
        lines.slice(1).forEach(ln=>{newPageIfNeeded(5);doc.text(ln,margin+2+lw,y);y+=4.5;});
      });
      if(u.application_tips){
        newPageIfNeeded(10); doc.setFont("helvetica","bold"); doc.setFontSize(8.5); setColor(MID);
        doc.text("How to get in: ",margin+2,y); y+=4.5;
        doc.setFont("helvetica","normal"); setColor(MUTED);
        doc.splitTextToSize(u.application_tips,cw-6).forEach(ln=>{newPageIfNeeded(5);doc.text(ln,margin+4,y);y+=4.5;});
      }
      if(u.scholarships){
        newPageIfNeeded(10); doc.setFont("helvetica","bold"); doc.setFontSize(8.5); setColor(MID);
        doc.text("Scholarships: ",margin+2,y);
        const lw=doc.getTextWidth("Scholarships: ");
        doc.setFont("helvetica","normal"); setColor(MUTED);
        doc.splitTextToSize(u.scholarships,cw-lw-4).forEach((ln,i)=>{newPageIfNeeded(5);doc.text(ln,i===0?margin+2+lw:margin+4,y);y+=4.5;});
      }
      setDraw(LIGHT); doc.setLineWidth(0.4); doc.line(margin,y+1,margin+cw,y+1); y+=7;
    });
  }
 
  sectionHeading("Universities — IB Score Entry");
  renderUnis(result.ib_universities||[], "IB score requirement", "ib_score_req");
 
  sectionHeading("Universities — SAT Score Entry");
  renderUnis(result.sat_universities||[], "SAT score requirement", "sat_score_req");
 
  if(result.action_plan&&result.action_plan.length){
    sectionHeading("Your Action Plan");
    result.action_plan.forEach((s,i)=>{
      newPageIfNeeded(14);
      setFill(ACCENT); doc.circle(margin+3.5,y-1.5,3.5,"F");
      doc.setFont("helvetica","bold"); doc.setFontSize(8); setColor(WHITE); doc.text(String(i+1),margin+2.2,y-0.2);
      doc.setFont("helvetica","normal"); doc.setFontSize(9.5); setColor(MID);
      const lines=doc.splitTextToSize(s,cw-12);
      lines.forEach((ln,li)=>{newPageIfNeeded(5);doc.text(ln,margin+10,y+li*5);});
      y+=lines.length*5+4;
    });
  }
 
  const tp=doc.getNumberOfPages();
  for(let p=1;p<=tp;p++){
    doc.setPage(p); setFill([237,233,255]); doc.rect(0,287,pw,10,"F");
    doc.setFont("helvetica","normal"); doc.setFontSize(8); setColor(ACCENT);
    doc.text("Career & University Compass",margin,293);
    setColor(MUTED); doc.text(`Page ${p} of ${tp}`,pw-margin-16,293);
  }
 
  const blob=doc.output("blob"), url=URL.createObjectURL(blob);
  const win=window.open(url,"_blank");
  if(!win){const a=document.createElement("a");a.href=url;a.download="Career_Compass.pdf";document.body.appendChild(a);a.click();document.body.removeChild(a);}
  setTimeout(()=>URL.revokeObjectURL(url),60000);
}
 
/* ─── UNI CARD COMPONENT ────────────────────────────────── */
function UniCard({ u, scoreLabel, scoreField }) {
  const ibAccepted = u.ib_also_accepted;
  const ibYes = ibAccepted && ibAccepted.toLowerCase().startsWith("yes");
  const ibNo  = ibAccepted && ibAccepted.toLowerCase().startsWith("no");
  return (
    <div style={S.uniCard}>
      <div style={S.uniHead}>
        <div>
          <div style={S.uniName}>{u.name}</div>
          <div style={S.uniLoc}>📍 {u.city}, {u.country} · Best for: {u.for_career}</div>
          {(u.qs_ranking_overall || u.qs_ranking) && (
            <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 3 }}>
              {(u.qs_ranking_overall || u.qs_ranking) && (
                <div style={{ fontSize: 11, fontWeight: 600, color: "#5b4de8", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 13 }}>🏅</span>
                  <span>{u.qs_ranking_overall || u.qs_ranking}</span>
                </div>
              )}
              {u.qs_ranking_subject && (
                <div style={{ fontSize: 11, fontWeight: 600, color: "#0ea47a", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 13 }}>📚</span>
                  <span>{u.qs_ranking_subject}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <CompBadge level={u.competitiveness} />
      </div>
      <div style={S.uniMeta}>
        <div style={S.metaItem}><strong style={S.metaStrong}>{u.acceptance_rate_overall || u.acceptance_rate}</strong>Acceptance rate (overall)</div>
        <div style={S.metaItem}><strong style={S.metaStrong}>{u.acceptance_rate_international || "—"}</strong>Acceptance rate (international)</div>
        <div style={S.metaItem}><strong style={S.metaStrong}>{u[scoreField]}</strong>{scoreLabel}</div>
        <div style={S.metaItem}><strong style={S.metaStrong}>{(u.notable_programs||[]).join(", ")}</strong>Notable programs</div>
      </div>
      {/* IB also accepted indicator — only shown on SAT cards */}
      {ibAccepted && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 8,
          padding: "8px 12px", borderRadius: 10, marginBottom: 10,
          background: ibYes ? "#f0fdf8" : ibNo ? "#fef2f2" : "#f4f3f8",
          border: `1px solid ${ibYes ? "rgba(14,164,122,0.25)" : ibNo ? "rgba(220,38,38,0.2)" : "rgba(10,10,15,0.1)"}`,
        }}>
          <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>
            {ibYes ? "✅" : ibNo ? "❌" : "ℹ️"}
          </span>
          <div>
            <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: ibYes ? "#0ea47a" : ibNo ? "#dc2626" : "#6b6b80", marginBottom: 2 }}>
              IB Diploma accepted?
            </div>
            <div style={{ fontSize: 12, color: ibYes ? "#065f46" : ibNo ? "#991b1b" : "#4b4b60", fontWeight: 400, lineHeight: 1.5 }}>
              {ibAccepted}
            </div>
          </div>
        </div>
      )}
      <div style={{ borderTop:"1px solid rgba(10,10,15,0.08)", paddingTop:10, marginTop:2, marginBottom:8 }}>
        <div style={{ fontSize:10, fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#a0a0b8", marginBottom:8 }}>Annual fees &amp; costs</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {u.tuition_local && <div style={S.metaItem}><strong style={S.metaStrong}>{u.tuition_local}</strong>Tuition (domestic)</div>}
          {u.tuition_international && <div style={S.metaItem}><strong style={S.metaStrong}>{u.tuition_international}</strong>Tuition (international)</div>}
          {u.living_costs && <div style={S.metaItem}><strong style={S.metaStrong}>{u.living_costs}</strong>Est. living costs/yr</div>}
          {u.other_fees && <div style={{ ...S.metaItem, gridColumn:"1/-1" }}><strong style={S.metaStrong}>{u.other_fees}</strong>Other fees</div>}
        </div>
      </div>
      <div style={S.uniTips}>
        <strong style={{ color:"#2d2d3a", fontWeight:500 }}>How to get in:</strong> {u.application_tips}
        {u.scholarships && <><br/><br/><strong style={{ color:"#2d2d3a", fontWeight:500 }}>Scholarships:</strong> {u.scholarships}</>}
      </div>
    </div>
  );
}
/* ─── MAIN COMPONENT ────────────────────────────────────── */
export default function CareerCompass() {
  const [step, setStep]                   = useState(0);
  const [demographics, setDemographics]   = useState({ name: "" });
  const [homeCountry, setHomeCountry]     = useState("");
  const [sel, setSel]                     = useState({ academics:[], skills:[], interests:[], values:[] });
  const [abroad, setAbroad]               = useState(2);
  const [dream, setDream]                 = useState("");
  const [careersInMind, setCareersInMind] = useState("");
  const [pdfLoading, setPdfLoading]       = useState(false);
  const [result, setResult]               = useState(null);
  const [error, setError]                 = useState("");
 
  const toggle = useCallback((key, val) => {
    setSel(prev => ({ ...prev, [key]: prev[key].includes(val) ? prev[key].filter(x=>x!==val) : [...prev[key], val] }));
  }, []);
 
  const generate = async () => {
    setError(""); setResult(null); setStep(99);
    const abroadLabel = ABROAD_LABELS[abroad];
 
    const callAPI = async (prompt) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:8000, messages:[{ role:"user", content:prompt }] }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      let raw = data.content.map(i=>i.text||"").join("");
      raw = raw.replace(/```json[\s\S]*?```|```/g,"").trim();
      // Attempt to repair truncated JSON by closing open structures
      try {
        return JSON.parse(raw);
      } catch(e) {
        // Find last complete object by trimming after last }
        const lastBrace = raw.lastIndexOf("}");
        if (lastBrace > 0) {
          let repaired = raw.slice(0, lastBrace + 1);
          // Close any open arrays/objects
          const opens = (repaired.match(/\[/g)||[]).length - (repaired.match(/\]/g)||[]).length;
          const openObj = (repaired.match(/\{/g)||[]).length - (repaired.match(/\}/g)||[]).length;
          for(let i=0;i<opens;i++) repaired += "]";
          for(let i=0;i<openObj;i++) repaired += "}";
          try { return JSON.parse(repaired); } catch(e2) { throw new Error("JSON parse failed: " + e.message); }
        }
        throw new Error("JSON parse failed: " + e.message);
      }
    };
 
    try {
      const part1 = await callAPI(buildCareersPrompt(demographics, sel, abroadLabel, homeCountry, dream, careersInMind));
      const careers = part1.careers || [];
      const part2 = await callAPI(buildIBUnisPrompt(demographics, sel, abroadLabel, homeCountry, dream, careersInMind, careers, "A"));
      const part3 = await callAPI(buildSATUnisPrompt(demographics, sel, abroadLabel, homeCountry, dream, careersInMind, careers, "A"));
      setResult({
        ...part1,
        ib_universities:  part2.ib_universities  || [],
        sat_universities: part3.sat_universities || [],
      });
      setStep(100);
    } catch(e) {
      setError(e.message); setStep(100);
    }
  };
 
  const restart = () => {
    setDemographics({ name:"" }); setHomeCountry("");
    setSel({ academics:[], skills:[], interests:[], values:[] });
    setAbroad(2); setDream(""); setCareersInMind(""); setResult(null); setError(""); setStep(0);
  };
 
  const showProgress = step >= 1 && step <= 5;
 
  return (
    <div style={S.root}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={S.card}>
 
        {/* Hero */}
        <div style={S.hero}>
          <div style={S.heroGlow} />
          <h1 style={S.heroH1}>
            Your career &amp;<br />
            <span style={S.heroAccent}>university compass</span>
          </h1>
          <p style={S.heroP}>Get personalised career paths that will matter in 2030+, plus university recommendations tailored to your strengths, interests and ambitions.</p>
        </div>
 
        {/* Progress */}
        {showProgress && (
          <div style={S.progressWrap}>
            <div style={S.progressMeta}>
              <span style={S.progressName}>{STEP_NAMES[step]}</span>
              <span style={S.progressCount}>{step} of 5</span>
            </div>
            <div style={S.progressTrack}>
              <div style={{ ...S.progressFill, width:`${step*20}%` }} />
            </div>
          </div>
        )}
 
        <div style={S.body}>
 
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div>
              <h2 style={S.h2}>Let's map your future.</h2>
              <p style={S.sub}>Answer 5 short sections about your strengths, skills and ambitions. The AI will generate careers and universities tailored specifically to you — with an eye on what's relevant in an AI-driven world.</p>
              <div style={S.aiBanner}>
                <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>🛡️</span>
                <div><strong style={{ fontWeight:600 }}>Built for an AI-driven world.</strong> This tool recommends careers that AI cannot replace — roles grounded in human judgment, creativity, relationships and physical presence. Not just what's popular today, but what will still matter in 2030 and beyond.</div>
              </div>
              <div style={{ ...S.btnRow, borderTop:"none", paddingTop:0, marginTop:0, justifyContent:"flex-start" }}>
                <button style={S.btnGenerate} onClick={()=>setStep(1)}><span>✦</span> Begin my assessment</button>
              </div>
            </div>
          )}
 
          {/* Step 1: About You */}
          {step === 1 && (
            <div>
              <h2 style={S.h2}>About you</h2>
              <p style={S.sub}>Tell us a little about yourself so we can personalise your results.</p>
              <div style={{ marginBottom:"1.25rem" }}>
                <label style={S.fieldLabel}>Your name <span style={S.fieldNote}>— optional</span></label>
                <input style={S.input} type="text" value={demographics.name}
                  onChange={e=>setDemographics(p=>({...p,name:e.target.value}))}
                  placeholder="e.g. Alex" />
              </div>
              <div style={{ marginBottom:"1.25rem" }}>
                <label style={S.fieldLabel}>Home country</label>
                <select style={S.select} value={homeCountry} onChange={e=>setHomeCountry(e.target.value)}>
                  <option value="">— Select your country —</option>
                  {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <div style={{ fontSize:12, color:"#a0a0b8", marginTop:6, fontWeight:400 }}>Used alongside your study-abroad preference to personalise university recommendations.</div>
              </div>
              <div style={S.btnRow}>
                <button style={S.btn} onClick={()=>setStep(0)}>← Back</button>
                <button style={S.btnPrimary} onClick={()=>setStep(2)}>Continue →</button>
              </div>
            </div>
          )}
 
          {/* Step 2: Academic Strengths */}
          {step === 2 && (
            <div>
              <h2 style={S.h2}>Academic strengths</h2>
              <p style={S.sub}>Which subjects do you genuinely enjoy or perform well in? Select all that apply.</p>
              {SUBJECT_GROUPS.map((g,i) => (
                <div key={i}>
                  <div style={{ ...S.groupLabel, marginTop:i===0?0:"1.1rem" }}>{g.label}<span style={S.groupLine}/></div>
                  <TagCloud items={g.items} selected={sel.academics} onToggle={v=>toggle("academics",v)} />
                </div>
              ))}
              <div style={S.btnRow}>
                <button style={S.btn} onClick={()=>setStep(1)}>← Back</button>
                <button style={S.btnPrimary} onClick={()=>setStep(3)}>Continue →</button>
              </div>
            </div>
          )}
 
          {/* Step 3: Skills */}
          {step === 3 && (
            <div>
              <h2 style={S.h2}>Natural skills &amp; talents</h2>
              <p style={S.sub}>What are you naturally good at — inside or outside the classroom?</p>
              <TagCloud items={SKILLS} selected={sel.skills} onToggle={v=>toggle("skills",v)} />
              <div style={S.btnRow}>
                <button style={S.btn} onClick={()=>setStep(2)}>← Back</button>
                <button style={S.btnPrimary} onClick={()=>setStep(4)}>Continue →</button>
              </div>
            </div>
          )}
 
          {/* Step 4: Interests */}
          {step === 4 && (
            <div>
              <h2 style={S.h2}>Passions &amp; interests</h2>
              <p style={S.sub}>What genuinely excites you — in or out of school?</p>
              <TagCloud items={INTERESTS} selected={sel.interests} onToggle={v=>toggle("interests",v)} />
              <div style={S.btnRow}>
                <button style={S.btn} onClick={()=>setStep(3)}>← Back</button>
                <button style={S.btnPrimary} onClick={()=>setStep(5)}>Continue →</button>
              </div>
            </div>
          )}
 
          {/* Step 5: Values & Ambitions */}
          {step === 5 && (
            <div>
              <h2 style={S.h2}>Work values &amp; ambitions</h2>
              <p style={S.sub}>What matters most to you in a career, and a little about your goals.</p>
              <div style={{ ...S.groupLabel, marginTop:0 }}>What matters most in a career<span style={S.groupLine}/></div>
              <TagCloud items={VALUES} selected={sel.values} onToggle={v=>toggle("values",v)} />
              <div style={{ marginTop:"1.5rem", marginBottom:"1.25rem" }}>
                <div style={S.sliderRow}>
                  <span style={S.sliderLabel}>Studying abroad preference</span>
                  <span style={S.sliderPill}>{ABROAD_LABELS[abroad]}</span>
                </div>
                <Slider value={abroad} onChange={setAbroad} labels={ABROAD_LABELS} />
              </div>
              <div style={{ marginBottom:"1.25rem" }}>
                <label style={S.fieldLabel}>Dream future <span style={S.fieldNote}>— optional</span></label>
                <textarea style={{ ...S.textarea, minHeight:72 }} rows={3} value={dream}
                  onChange={e=>setDream(e.target.value)}
                  placeholder="e.g. I'd love to lead a tech startup, travel frequently, and work on problems that matter for the planet..." />
              </div>
              <div style={{ marginBottom:"0.5rem" }}>
                <label style={S.fieldLabel}>Careers already on your radar <span style={S.fieldNote}>— optional</span></label>
                <textarea style={{ ...S.textarea, minHeight:52 }} rows={2} value={careersInMind}
                  onChange={e=>setCareersInMind(e.target.value)}
                  placeholder="e.g. Medicine, UX design, international law..." />
              </div>
              <div style={S.btnRow}>
                <button style={S.btn} onClick={()=>setStep(4)}>← Back</button>
                <button style={S.btnGenerate} onClick={generate}><span>✦</span> Generate my plan</button>
              </div>
            </div>
          )}
 
          {/* Loading */}
          {step === 99 && (
            <div style={S.loader}>
              <div style={{ width:48, height:48, border:"3px solid #eceaf4", borderTopColor:"#5b4de8", borderRadius:"50%", animation:"spin 0.9s linear infinite", margin:"0 auto" }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              <div style={S.loaderTitle}>Building your personalised plan…</div>
              <div style={S.loaderSub}>Running 3 AI calls — careers first, then universities. Usually 25–40 seconds.</div>
            </div>
          )}
 
          {/* Results */}
          {step === 100 && (
            <div>
              {error && <div style={S.errBox}><strong>Something went wrong.</strong> Please try again. ({error})</div>}
              {result && (
                <>
                  {result.summary && (
                    <div style={S.resultsBanner}>
                      <div style={S.resultsBannerGlow} />
                      <div style={{ fontSize:18, marginBottom:8, position:"relative", zIndex:1 }}>✦</div>
                      <p style={S.resultsBannerP}>{result.summary}</p>
                    </div>
                  )}
 
                  {/* Careers */}
                  <div style={S.sectionTitle}><span style={S.sectionBar}/> Recommended career paths</div>
                  <div style={S.legend}>
                    {[["#0ea47a","AI-Augmented"],["#d97706","AI-Evolving"],["#5b4de8","Human-Essential"]].map(([c,l])=>(
                      <div key={l} style={S.legendItem}><div style={S.legendDot(c)}/>{l}</div>
                    ))}
                  </div>
                  {(result.careers||[]).map((c,i)=>(
                    <div key={i} style={S.careerCard}>
                      <div style={S.careerHead}>
                        <div><div style={S.careerName}>{c.title}</div><div style={S.careerField}>{c.field}</div></div>
                        <AiBadge label={c.ai_label}/>
                      </div>
                      <div style={S.careerBody}>
                        <p style={{ marginBottom:5 }}><strong style={{ color:"#2d2d3a", fontWeight:500 }}>Why AI won't replace this:</strong> {c.ai_rationale}</p>
                        <p style={{ marginBottom:5 }}><strong style={{ color:"#2d2d3a", fontWeight:500 }}>Why it fits you:</strong> {c.why_fit}</p>
                        <p style={{ marginBottom:5 }}><strong style={{ color:"#2d2d3a", fontWeight:500 }}>Day-to-day by 2030:</strong> {c.daily_life}</p>
                        <div style={S.badgeRow}>{pill("📈 "+c.outlook,"green")}{pill("💰 "+c.salary_range,"amber")}</div>
                        <div style={S.badgeRow}>
                          {(c.subjects||[]).map(s=><span key={s}>{pill(s,"blue")}</span>)}
                          {(c.degrees||[]).map(d=><span key={d}>{pill(d,"purple")}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
 
                  {/* Universities — IB group */}
                  {(result.ib_universities||[]).length > 0 && (
                    <>
                      <div style={{ ...S.sectionTitle, marginTop:"1.75rem" }}><span style={S.sectionBar}/> Universities — IB score entry</div>
                      <div style={{ fontSize:12, color:"#6b6b80", marginBottom:"1rem", fontWeight:400 }}>These universities primarily assess applicants on the IB Diploma score.</div>
                      {result.ib_universities.map((u,i)=><UniCard key={i} u={u} scoreLabel="IB score requirement" scoreField="ib_score_req"/>)}
                    </>
                  )}
 
                  {/* Universities — SAT group */}
                  {(result.sat_universities||[]).length > 0 && (
                    <>
                      <div style={{ ...S.sectionTitle, marginTop:"1.75rem" }}><span style={S.sectionBar}/> Universities — SAT score entry</div>
                      <div style={{ fontSize:12, color:"#6b6b80", marginBottom:"1rem", fontWeight:400 }}>These universities primarily assess applicants on the SAT score.</div>
                      {result.sat_universities.map((u,i)=><UniCard key={i} u={u} scoreLabel="SAT score requirement" scoreField="sat_score_req"/>)}
                    </>
                  )}
 
                  {/* Action Plan */}
                  {result.action_plan&&result.action_plan.length>0&&(
                    <>
                      <div style={{ ...S.sectionTitle, marginTop:"1.5rem" }}><span style={S.sectionBar}/> Your action plan</div>
                      {result.action_plan.map((s,i)=>(
                        <div key={i} style={S.actionItem}>
                          <div style={S.actionNum}>{i+1}</div>
                          <div style={S.actionText}>{s}</div>
                        </div>
                      ))}
                    </>
                  )}
 
                  {/* PDF */}
                  <div style={{ display:"flex", justifyContent:"center", marginTop:"1.5rem" }}>
                    <button
                      style={{ ...S.btnGenerate, background:pdfLoading?"#0a7a5c":"#0ea47a", borderColor:"#0ea47a", gap:8, opacity:pdfLoading?0.8:1, cursor:pdfLoading?"wait":"pointer" }}
                      onClick={async()=>{
                        if(pdfLoading)return;
                        setPdfLoading(true);
                        try{ await generatePDF(result,sel,demographics,homeCountry); }
                        catch(e){ alert("Could not generate PDF: "+e.message); }
                        finally{ setPdfLoading(false); }
                      }}>
                      <span>{pdfLoading?"⏳":"↗"}</span>
                      {pdfLoading?"Generating PDF…":"Open PDF report"}
                    </button>
                  </div>
                </>
              )}
 
              <div style={S.resetRow}>
                <button style={{ background:"none", border:"1px solid rgba(10,10,15,0.16)", borderRadius:12, padding:"10px 20px", fontFamily:"inherit", fontSize:13, color:"#6b6b80", cursor:"pointer" }} onClick={restart}>
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
