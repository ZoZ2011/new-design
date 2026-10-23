import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ArrowLeft, Asterisk } from "lucide-react";
import rigBg from "@/assets/oil-rig-background.jpg";
import iwcfLogo from "@/assets/iwcf-logo.jpg";
import iadcLogo from "@/assets/iadc-logo.png";
import cardDrilling from "@/assets/wellbore-schematic.png";
import cardIntervention from "@/assets/coiled-tubing-diagram.png";
import cardServices from "@/assets/snubbing-stack-q17.png";
import cardKill from "@/assets/gas-reservoir-diagram.png";

const Marker = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className={`flex items-center gap-2 text-[11px] font-medium ${dark ? "text-background/80" : "text-foreground"}`}>
    <span className="w-2.5 h-2.5 rounded-[2px] bg-primary" />
    {children}
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const nav = [
    { label: "Home", path: "/" },
    { label: "IWCF", path: "/exercises/iwcf" },
    { label: "IADC", path: "/exercises/iacd" },
  ];

  const cards = [
    {
      title: "IWCF Drilling",
      tag: "01",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
      path: "/exercises/iwcf",
    },
    {
      title: "IWCF Well Intervention",
      tag: "02",
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
      path: "/exercises/iwcf",
    },
    {
      title: "IADC Well Services",
      tag: "03",
      img: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
      path: "/exercises/iacd",
    },
    {
      title: "Kill Sheet Drills",
      tag: "04",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
      path: "/exercises",
    },
  ];

  const numbers = [
    { v: "500+", t: "Exam-style questions", d: "Written to IWCF and IADC syllabus, with worked answers." },
    { v: "8+", t: "Disciplines", d: "Drilling, intervention, coiled tubing, snubbing, wireline." },
    { v: "94%", t: "Pass rate", d: "Candidates who finished the full mock test set." },
    { v: "24/7", t: "Access", d: "Practice on any device, from rig floor to hotel room." },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollCourses = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 16), behavior: "smooth" });
  };

  const courses = [
    { t: "IWCF\nLevel 3", tags: ["Drilling", "Surface"], d: "Core well control principles, shut-in and kill methods.", img: cardDrilling, path: "/exercises/iwcf/drilling" },
    { t: "IWCF\nLevel 4", tags: ["Supervisor", "Day 1–3"], d: "Advanced supervisor topics grouped by training day.", img: rigBg, path: "/exercises/iwcf/drilling" },
    { t: "Well\nIntervention", tags: ["IWCF", "Completion"], d: "Wireline, coiled tubing and snubbing barrier control.", img: cardIntervention, path: "/exercises/iwcf/well-intervention" },
    { t: "IADC\nOGOR", tags: ["Well Services", "New"], d: "OGOR topic drills plus three full mock tests.", img: cardServices, path: "/exercises/iacd/well-services/ogor" },
    { t: "Coiled\nTubing", tags: ["IADC", "CT"], d: "CT stack, pressure control and running procedures.", img: cardIntervention, path: "/exercises/iacd/well-services" },
    { t: "Snubbing\n& Workover", tags: ["IADC", "Live well"], d: "Pipe-light, pipe-heavy and workover kill operations.", img: cardServices, path: "/exercises/iacd/well-services" },
    { t: "Kill Sheet\nDrills", tags: ["Calculations", "9 steps"], d: "Fill the full kill sheet and get graded at the end.", img: cardKill, path: "/exercises" },
    { t: "Study\nManuals", tags: ["Reference", "Formulas"], d: "Formula sheets and guides for exam day.", img: rigBg, path: "/manuals" },
  ];

  return (
    <div className="min-h-screen bg-muted font-jakarta p-3 sm:p-5">
      <div className="bg-background rounded-[28px] overflow-hidden">
        {/* HERO */}
        <div className="p-2 sm:p-3">
          <section className="relative rounded-[24px] overflow-hidden bg-foreground min-h-[620px] sm:min-h-[680px] flex flex-col">
            <img src={rigBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/70 to-foreground/20" />

            {/* nav */}
            <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-5">
              <div className="flex items-center gap-2 text-background">
                <Asterisk className="w-6 h-6 text-primary" strokeWidth={3} />
                <span className="font-bold text-lg tracking-tight">Well Control<sup className="text-[9px] ml-0.5">®</sup></span>
              </div>
              <nav className="hidden md:flex items-center gap-7">
                {nav.map((n) => (
                  <button key={n.label} onClick={() => navigate(n.path)} className="relative text-[13px] text-background/80 hover:text-background transition-colors cursor-pointer">
                    {n.label}
                  </button>
                ))}
              </nav>
              {userId ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-background text-foreground rounded-full pl-3 pr-3.5 py-1.5 text-xs font-semibold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>ID: {userId}</span>
                    {userName && <span className="text-muted-foreground hidden sm:inline">({userName})</span>}
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("userId");
                      localStorage.removeItem("userName");
                      window.location.reload();
                    }}
                    title="Sign Out"
                    className="bg-background/20 hover:bg-background/40 text-background rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/exercises")}
                  className="group flex items-center gap-2 bg-background text-foreground rounded-full pl-1.5 pr-4 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Asterisk className="w-3.5 h-3.5 text-primary-foreground" />
                  </span>
                  Enter ID
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
            </header>

            <div className="relative z-10 flex-1 flex flex-col justify-between px-5 sm:px-10 pt-14 pb-8">
              <div>
                <Marker dark>Next-Gen Well Control Training</Marker>
                <h1 className="mt-5 text-background font-medium leading-[1.02] tracking-[-0.035em] text-[44px] sm:text-[64px] lg:text-[84px] max-w-[820px]">
                  Master Well Control.
                  <br />
                  Build a Safer Tomorrow.
                </h1>
                <p className="mt-4 text-background/80 text-sm sm:text-base lg:text-lg max-w-[640px] font-normal leading-relaxed">
                  Interactive training, realistic scenarios and comprehensive assessments to develop your well control skills and confidence.
                </p>
              </div>

              <div className="mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="flex flex-wrap gap-x-16 gap-y-2 text-xs text-background/80">
                  <span>+ IWCF</span>
                  <span>+ IADC</span>
                  <span>+ Realistic Scenarios</span>
                </div>
                <div className="max-w-xs">
                  <p className="text-background text-lg sm:text-xl leading-snug">
                    Drilling & Intervention
                    <br />
                    Exam-style mock tests
                    <br />
                    for Level 3 and Level 4
                  </p>
                  <div className="mt-6 flex gap-2.5">
                    <button
                      onClick={() => navigate("/manuals")}
                      className="group flex items-center gap-1.5 bg-background text-foreground rounded-full px-5 py-2.5 text-xs font-semibold cursor-pointer"
                    >
                      Manuals
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* LOGO RIBBON */}
        <section className="border-y border-border mt-6 px-5 sm:px-10 py-6 flex flex-col sm:flex-row items-center gap-8 sm:gap-14">
          <div className="flex items-center gap-3 shrink-0">
            <Asterisk className="w-9 h-9 text-foreground" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold uppercase leading-tight text-foreground">
              Built around the
              <br />
              IWCF & IADC syllabus
            </p>
          </div>
          <div className="flex-1 flex items-center justify-around gap-10 w-full">
            <img src={iwcfLogo} alt="IWCF" className="h-10 object-contain grayscale" />
            <img src={iadcLogo} alt="IADC" className="h-10 object-contain grayscale" />
            <span className="hidden sm:inline font-bold text-lg tracking-tight text-foreground/70">API RP 59</span>
            <span className="hidden md:inline font-bold text-lg tracking-tight text-foreground/70">API STD 53</span>
          </div>
        </section>

        {/* STATEMENT WITH GRADIENT TRANSITION */}
        <div className="bg-gradient-to-b from-background via-sky-50/60 to-blue-50/80 transition-colors">
          <section className="px-5 sm:px-10 pt-20 pb-16">
            <Marker>Who we are</Marker>
            <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h2 className="text-[30px] sm:text-[42px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.03em] text-foreground max-w-[720px]">
                We build exam-verified practice systems to help drilling crews{" "}
                <span className="text-muted-foreground">pass on the first attempt.</span>
              </h2>
              {/* Enhanced Pill Button for Explore Courses */}
              <button
                onClick={() => navigate("/exercises")}
                className="group flex items-center gap-2.5 bg-foreground hover:bg-foreground/90 text-background rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold shadow-md transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <span>Explore courses</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </section>

          {/* PORTRAIT CARDS WITH NEW REALISTIC HIGH-RES IMAGES */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 px-4 sm:px-6 pb-12">
            {cards.map((c, i) => (
              <button
                key={c.title}
                onClick={() => navigate(c.path)}
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-900 text-left shadow-lg border border-slate-200/40 cursor-pointer ${
                  i === 0 ? "sm:rounded-l-2xl" : ""
                }`}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                <div className="absolute top-4 left-4 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  ■ {c.tag}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                  <span className="text-white font-bold text-base sm:text-lg tracking-tight leading-snug drop-shadow-sm">
                    {c.title}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            ))}
          </section>
        </div>

        {/* NUMBERS */}
        <section className="px-5 sm:px-10 pt-16 pb-20">
          <div className="text-[11px] uppercase"><Marker>By the numbers</Marker></div>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {numbers.map((n) => (
              <div key={n.t}>
                <div className="text-[44px] sm:text-[56px] font-medium tracking-[-0.04em] leading-none text-foreground pb-3 border-b border-dotted border-foreground/40">
                  {n.v}
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{n.t}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{n.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COURSES CAROUSEL (NEW DESIGN WITH SLIDER & READ MORE) */}
        <section className="px-5 sm:px-10 pt-16 pb-14 bg-[#fafafc] border-t border-slate-200/60">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">Elevate your exam</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <h2 className="text-[34px] sm:text-[52px] font-bold tracking-[-0.035em] text-foreground leading-[1.02] max-w-[640px]">
              Our Courses for Every Well Control Crew
            </h2>
            <div className="flex gap-2 shrink-0">
              <button
                aria-label="Previous"
                onClick={() => scrollCourses(-1)}
                className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                aria-label="Next"
                onClick={() => scrollCourses(1)}
                className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div
            ref={trackRef}
            className="mt-8 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {courses.map((c, i) => (
              <div
                key={c.t}
                data-card
                className={`snap-start shrink-0 w-[270px] sm:w-[310px] rounded-[26px] p-2.5 flex flex-col shadow-sm border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-white text-foreground"
                }`}
              >
                <div className="px-4 pt-4 pb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {c.tags.map((tg) => (
                        <span
                          key={tg}
                          className="text-[10px] font-bold bg-background text-foreground rounded-full px-2.5 py-1 shadow-2xs"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        i === 0 ? "bg-foreground" : "bg-slate-100"
                      }`}
                    >
                      <Asterisk className={`w-4 h-4 ${i === 0 ? "text-primary" : "text-foreground/70"}`} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-[28px] sm:text-[32px] font-extrabold tracking-[-0.03em] leading-[1.05] whitespace-pre-line">
                    {c.t}
                  </h3>
                  <p
                    className={`mt-2.5 text-xs leading-relaxed ${
                      i === 0 ? "text-primary-foreground/90 font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {c.d}
                  </p>
                </div>
                <div className="relative mt-auto aspect-[4/5] rounded-[20px] overflow-hidden">
                  <img src={c.img} alt={c.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <button
                    onClick={() => navigate(c.path)}
                    className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full pl-4 pr-1.5 py-1.5 text-xs font-semibold hover:bg-white/35 transition-all cursor-pointer shadow-md"
                  >
                    Read More
                    <span className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-foreground px-5 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-background/50">
          <span className="flex items-center gap-1.5"><Asterisk className="w-4 h-4 text-primary" /> Well Control Club</span>
          <span>© 2026 Well Control Club. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
};

export default Index;
