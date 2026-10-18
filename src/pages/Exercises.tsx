import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Asterisk,
  BookOpen,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  LayoutGrid,
  Layers,
  Wrench,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Sample data. Replace with real student stats when they are tracked. */
/* ------------------------------------------------------------------ */
const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

// 0 = none, 1 = blue, 2 = navy, 3 = black, 4 = light dotted
const PRACTICE_GRID: { label: string; cells: number[] }[] = [
  { label: "Drilling", cells: [0, 4, 2, 1, 4, 3, 0] },
  { label: "Intervention", cells: [4, 2, 4, 3, 1, 3, 4] },
  { label: "Well Services", cells: [3, 2, 3, 1, 1, 2, 0] },
];

const SCORE_BARS = [
  { label: "IWCF L3", value: 82, tone: "black" },
  { label: "IWCF L4", value: 64, tone: "navy" },
  { label: "IADC OGOR", value: 91, tone: "blue" },
  { label: "Kill Sheets", value: 76, tone: "light" },
] as const;

const READINESS = 78;

const STRIPES =
  "repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0 3px, transparent 3px 8px)";

const barBase: Record<(typeof SCORE_BARS)[number]["tone"], string> = {
  black: "#1c1c1e",
  navy: "#0b2a8a",
  blue: "#0a6cff",
  light: "#b9d3ff",
};

/* ---------------------------- small pieces ---------------------------- */

const Dot = ({ kind }: { kind: number }) => {
  const base = "w-[26px] h-[26px] sm:w-8 sm:h-8 rounded-full";
  if (kind === 0) return <span className={`${base} bg-[#ececee]`} />;
  if (kind === 4)
    return (
      <span
        className={`${base} bg-[#ececee]`}
        style={{ backgroundImage: "radial-gradient(#cfcfd4 1px, transparent 1.2px)", backgroundSize: "5px 5px" }}
      />
    );
  const color = kind === 1 ? "#0a6cff" : kind === 2 ? "#0b2a8a" : "#1c1c1e";
  return <span className={base} style={{ backgroundColor: color, backgroundImage: STRIPES }} />;
};

const Gauge = ({ percent }: { percent: number }) => {
  const segments = 26;
  const filled = Math.round((percent / 100) * segments);
  const cx = 110;
  const cy = 105;
  return (
    <svg viewBox="0 0 220 120" className="w-full max-w-[240px] mx-auto" role="img" aria-label={`${percent}% exam readiness`}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle = Math.PI - (i / (segments - 1)) * Math.PI;
        const r1 = 74;
        const r2 = 98;
        const x1 = cx + Math.cos(angle) * r1;
        const y1 = cy - Math.sin(angle) * r1;
        const x2 = cx + Math.cos(angle) * r2;
        const y2 = cy - Math.sin(angle) * r2;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth={6}
            strokeLinecap="round"
            stroke={i < filled ? "#0a6cff" : "#e4e6ee"}
          />
        );
      })}
    </svg>
  );
};

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white rounded-[24px] p-5 sm:p-6 ${className}`}>{children}</div>
);

const IconBtn = ({ children, onClick, dark = false, label }: { children: React.ReactNode; onClick?: () => void; dark?: boolean; label: string }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
      dark ? "bg-white text-black hover:bg-white/90" : "bg-[#f1f1f3] text-slate-800 hover:bg-[#e6e6ea]"
    }`}
  >
    {children}
  </button>
);

/* ------------------------------- page --------------------------------- */

const Exercises = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const firstName = (userName || "Student").split(" ")[0];
  const initials = (userName || "S")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const tabs = [
    { label: "Dashboard", path: "/exercises", active: true },
    { label: "IWCF", path: "/exercises/iwcf" },
    { label: "IADC", path: "/exercises/iacd" },
    { label: "Manuals", path: "/manuals" },
  ];

  const sidebarMain = [
    { label: "Overview", icon: LayoutGrid, path: "/exercises", active: true },
    { label: "IADC Mock Tests", icon: ClipboardList, path: "/exercises/iacd/well-services/ogor/mock-tests" },
    { label: "IWCF Drilling", icon: Layers, path: "/exercises/iwcf/drilling" },
    { label: "Well Intervention", icon: Wrench, path: "/exercises/iwcf/well-intervention" },
  ];

  const sidebarQuick = [
    { label: "Study Manuals", icon: BookOpen, path: "/manuals" },
    { label: "Well Services", icon: FileText, path: "/exercises/iacd/well-services" },
  ];

  const programs = [
    {
      badge: "IADC WELLSHARP",
      title: "IADC",
      subtitle: "Well Services & Drilling tracks",
      buttonText: "Start Practicing",
      path: "/exercises/iacd",
      features: ["Well Services & Coiled Tubing", "Snubbing, Wireline & Workover", "Official OGOR Full Mock Tests"],
    },
    {
      badge: "MOST POPULAR",
      title: "IWCF",
      subtitle: "Drilling Level 3 & Level 4 prep",
      buttonText: "Start Practicing",
      path: "/exercises/iwcf",
      featured: true,
      features: ["Surface & Subsea Drilling Control", "Well Intervention Specialists", "Kill Sheets & Volumetric Drills"],
    },
    {
      badge: "STUDY GUIDES",
      title: "Manuals",
      subtitle: "Formula sheets and references",
      buttonText: "Open Manuals",
      path: "/manuals",
      features: ["IWCF Formula Quick Reference", "IADC Calculation Sheets", "BOP Stack & Wellbore Schematics"],
    },
  ];

  const maxBar = 100;

  return (
    <div className="min-h-screen bg-[#dcdcdf] font-jakarta p-3 sm:p-6 text-slate-900">
      <div className="max-w-[1320px] mx-auto bg-white rounded-[28px] p-3 sm:p-5 lg:p-6">
        {/* ---------------------------- top bar ---------------------------- */}
        <header className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 pr-2 cursor-pointer" aria-label="Home">
            <span className="w-9 h-9 rounded-xl bg-[#0a6cff] flex items-center justify-center">
              <Asterisk className="w-5 h-5 text-white" strokeWidth={3} />
            </span>
            <span className="font-bold text-lg tracking-tight">Well Control</span>
          </button>

          <nav className="order-3 lg:order-none w-full lg:w-auto flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:ml-2">
            {tabs.map((t) => (
              <button
                key={t.label}
                onClick={() => navigate(t.path)}
                className={`shrink-0 rounded-full px-5 py-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                  t.active ? "bg-[#0a6cff] text-white" : "bg-[#f1f1f3] text-slate-700 hover:bg-[#e6e6ea]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <IconBtn label="Home" onClick={() => navigate("/")}>
              <Home className="w-4 h-4" />
            </IconBtn>
            <div className="flex items-center gap-2.5 pl-1">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0a6cff] to-[#0b2a8a] text-white text-xs font-bold flex items-center justify-center">
                {initials}
              </span>
              <div className="hidden sm:block leading-tight">
                <p className="text-[13px] font-bold">{userName || "Student"}</p>
                <p className="text-[11px] text-slate-500">{userId ? `ID: ${userId}` : "Not signed in"}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-4 lg:mt-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* ----------------------------- sidebar ----------------------------- */}
          <aside className="lg:w-[250px] shrink-0 flex flex-col">
            <h1 className="text-[34px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] px-1">
              Welcome
              <br />
              Back, {firstName}!
            </h1>
            <p className="mt-2 text-[13px] text-slate-500 px-1">Current summary study report</p>

            <div className="hidden lg:block mt-8">
              <p className="text-[10px] font-bold tracking-[0.14em] text-slate-400 px-1">HOME</p>
              <ul className="mt-3 space-y-1.5">
                {sidebarMain.map((s) => (
                  <li key={s.label}>
                    <button
                      onClick={() => navigate(s.path)}
                      className={`w-full flex items-center gap-3 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                        s.active ? "bg-black text-white" : "text-slate-700 hover:bg-[#f1f1f3]"
                      }`}
                    >
                      <s.icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{s.label}</span>
                      {s.active && <ChevronDown className="w-4 h-4" />}
                    </button>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-[10px] font-bold tracking-[0.14em] text-slate-400 px-1">QUICK ACCESS</p>
              <ul className="mt-3 space-y-1.5">
                {sidebarQuick.map((s) => (
                  <li key={s.label}>
                    <button
                      onClick={() => navigate(s.path)}
                      className="w-full flex items-center gap-3 rounded-full px-4 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-[#f1f1f3] transition-colors cursor-pointer"
                    >
                      <s.icon className="w-4 h-4" />
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* promo card */}
            <div className="hidden lg:flex relative mt-auto pt-6">
              <div className="relative w-full rounded-[24px] bg-[#0a6cff] text-white p-5 overflow-hidden min-h-[230px] flex flex-col justify-end">
                <div
                  className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-30"
                  style={{ backgroundImage: STRIPES, backgroundColor: "#0b2a8a" }}
                />
                <Asterisk className="absolute top-5 left-5 w-8 h-8 text-white/90" strokeWidth={2.5} />
                <p className="text-[26px] font-extrabold leading-[1.05] tracking-[-0.02em]">
                  Full question
                  <br />
                  bank
                </p>
                <p className="mt-1 text-[11px] text-white/80">500+ exam-style questions</p>
                <button
                  onClick={() => navigate("/exercises/iwcf")}
                  className="mt-4 self-start flex items-center gap-2 bg-black text-white rounded-full pl-4 pr-1.5 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Start practicing
                  <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </aside>

          {/* ------------------------------ main ------------------------------ */}
          <main className="flex-1 min-w-0 bg-[#f4f4f6] rounded-[24px] p-3 sm:p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-[26px] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-tight">Study Overview</h2>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Overview <span className="mx-1">›</span> All Reports
                  <span className="ml-3 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-500">Sample data</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/manuals")}
                  className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-[13px] font-semibold cursor-pointer hover:bg-white/80 transition-colors"
                >
                  Manuals
                </button>
                <IconBtn dark label="Open programs" onClick={() => navigate("/exercises/iwcf")}>
                  <ArrowUpRight className="w-4 h-4" />
                </IconBtn>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* practice breakdown */}
              <Card className="md:col-span-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold">Practice Breakdown</h3>
                  <span className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold">
                    Weekly <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <p className="text-[34px] font-extrabold tracking-[-0.03em]">142 <span className="text-base font-semibold text-slate-400">questions</span></p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] text-slate-500 pb-1">
                    <span className="flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full bg-[#0a6cff]" /> 20 – 30</span>
                    <span className="flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full bg-[#0b2a8a]" /> 10 – 20</span>
                    <span className="flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" /> 30+</span>
                    <span className="flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full bg-[#cfcfd4]" /> No practice</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {PRACTICE_GRID.map((row) => (
                    <div key={row.label} className="flex items-center gap-2 sm:gap-3">
                      <span className="w-[74px] sm:w-[92px] shrink-0 text-[11px] sm:text-xs text-slate-500">{row.label}</span>
                      <div className="flex-1 flex items-center justify-between">
                        {row.cells.map((c, i) => (
                          <Dot key={i} kind={c} />
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="w-[74px] sm:w-[92px] shrink-0" />
                    <div className="flex-1 flex items-center justify-between">
                      {WEEK_DAYS.map((d, i) => (
                        <span key={i} className="w-[26px] sm:w-8 text-center text-[10px] text-slate-400">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* right column */}
              <div className="md:col-span-5 grid grid-cols-2 gap-4">
                <div className="col-span-2 relative rounded-[24px] bg-black text-white p-5 overflow-hidden min-h-[150px] flex flex-col justify-between">
                  <div
                    className="absolute -right-8 -top-8 w-44 h-44 rounded-full opacity-60"
                    style={{ background: "radial-gradient(circle at 30% 30%, #5b5b63, #0d0d0f 70%)" }}
                  />
                  <p className="relative text-[20px] leading-tight">
                    Join Our <span className="font-bold">Mock Exam</span>
                    <br />
                    <span className="font-bold">Mastery</span>
                  </p>
                  <div className="relative flex items-end justify-between">
                    <span className="text-[10px] font-bold bg-[#c7f464] text-black rounded-full px-2 py-1">3 full tests</span>
                    <button
                      onClick={() => navigate("/exercises/iacd/well-services/ogor/mock-tests")}
                      className="flex items-center gap-2 bg-[#0a6cff] text-white rounded-full pl-4 pr-1.5 py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      Start Test
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                </div>

                <Card className="!p-4">
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#f1f1f3] flex items-center justify-center"><Asterisk className="w-3 h-3" /></span>
                    Today
                    <br />
                    Practiced
                  </p>
                  <p className="mt-3 text-[30px] font-extrabold tracking-[-0.03em] leading-none">38</p>
                  <p className="mt-2 text-xs text-slate-500">+12% vs yesterday</p>
                </Card>

                <button
                  onClick={() => navigate("/manuals")}
                  className="relative rounded-[24px] bg-black text-white p-4 text-left flex flex-col justify-between min-h-[140px] cursor-pointer"
                >
                  <div className="flex justify-between">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><X className="w-4 h-4" /></span>
                    <span className="flex gap-1.5">
                      <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"><FileText className="w-4 h-4" /></span>
                      <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"><ArrowUpRight className="w-4 h-4" /></span>
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-[9px] bg-white/20 rounded-full px-2 py-0.5 mb-2">Formulas and guides</span>
                    <p className="text-[20px] font-bold leading-tight">Study Manuals</p>
                  </div>
                </button>
              </div>

              {/* score trend */}
              <Card className="md:col-span-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold">Score Trend</h3>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold">
                      Sort by Month <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-6">
                  <div className="sm:w-[44%] flex flex-col">
                    <span className="self-start text-[11px] font-semibold bg-black text-white rounded-full px-3 py-1">30 Days</span>
                    <p className="mt-4 text-[34px] font-extrabold tracking-[-0.03em] leading-none">86%</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Average mock score
                      <br />
                      across all programs
                    </p>
                    <p className="mt-6 sm:mt-auto text-[28px] font-semibold text-[#0a6cff] tracking-[-0.02em]">+7.3%</p>
                    <p className="text-xs text-slate-500">better than last month</p>
                  </div>
                  <div className="flex-1 flex items-end justify-between gap-2.5 min-h-[190px]">
                    {SCORE_BARS.map((b) => (
                      <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-[190px]">
                        <div
                          className="w-full rounded-[18px] flex items-start justify-center pt-2"
                          style={{
                            height: `${(b.value / maxBar) * 100}%`,
                            backgroundColor: barBase[b.tone],
                            backgroundImage: STRIPES,
                          }}
                        >
                          <span className="text-[10px] font-bold bg-white text-black rounded-full px-1.5 py-0.5">{b.value}%</span>
                        </div>
                        <span className="mt-2 text-[9px] sm:text-[10px] text-slate-500 text-center leading-tight">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* readiness gauge */}
              <Card className="md:col-span-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold">Exam Readiness</h3>
                  <IconBtn label="Open practice" onClick={() => navigate("/exercises/iwcf")}>
                    <ArrowUpRight className="w-4 h-4" />
                  </IconBtn>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-[#b9d3ff]" /> Total</span>
                  <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-[#e4e6ee]" /> Target 85%</span>
                  <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-[#0a6cff]" /> Ready today</span>
                </div>
                <div className="relative mt-4">
                  <Gauge percent={READINESS} />
                  <div className="absolute inset-x-0 bottom-0 text-center">
                    <p className="text-[34px] font-extrabold tracking-[-0.03em] leading-none">
                      {READINESS}%<span className="text-xs font-medium text-slate-400"> from last week</span>
                    </p>
                  </div>
                </div>
                <p className="mt-4 mx-auto rounded-full bg-[#f1f1f3] px-4 py-1.5 text-[10px] text-slate-600">
                  Readiness is <b>{READINESS}%</b>. Keep going to reach your target.
                </p>
              </Card>
            </div>

            {/* ---------------------------- programs ---------------------------- */}
            <div className="mt-6">
              <div className="flex items-end justify-between gap-3">
                <h3 className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.03em]">Choose your program</h3>
                <span className="text-xs text-slate-500 hidden sm:inline">Pick a certification or study guide</span>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {programs.map((p) => (
                  <div
                    key={p.title}
                    className={`rounded-[24px] p-5 flex flex-col ${p.featured ? "bg-[#0a6cff] text-white" : "bg-white text-slate-900"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold tracking-wide rounded-full px-2.5 py-1 ${
                          p.featured ? "bg-white text-black" : "bg-[#f1f1f3] text-slate-700"
                        }`}
                      >
                        {p.badge}
                      </span>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center ${p.featured ? "bg-black" : "bg-[#f1f1f3]"}`}>
                        <Asterisk className={`w-4 h-4 ${p.featured ? "text-[#0a6cff]" : "text-slate-600"}`} />
                      </span>
                    </div>
                    <h4 className="mt-5 text-[34px] font-extrabold tracking-[-0.03em] leading-none">{p.title}</h4>
                    <p className={`mt-2 text-xs ${p.featured ? "text-white/85" : "text-slate-500"}`}>{p.subtitle}</p>
                    <ul className="mt-4 space-y-2 text-[12px]">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${p.featured ? "bg-white" : "bg-[#0a6cff]"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate(p.path)}
                      className={`mt-6 self-start flex items-center gap-2 rounded-full pl-5 pr-1.5 py-1.5 text-xs font-semibold cursor-pointer ${
                        p.featured ? "bg-black text-white" : "bg-black text-white hover:bg-black/85"
                      }`}
                    >
                      {p.buttonText}
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
