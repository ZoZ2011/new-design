import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Asterisk } from "lucide-react";
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
    { label: "IADC", path: "/exercises/iacd", badge: "New" },
    { label: "Exercises", path: "/exercises" },
    { label: "Manuals", path: "/manuals" },
  ];

  const cards = [
    { title: "IWCF Drilling", tag: "01", img: cardDrilling, path: "/exercises/iwcf" },
    { title: "IWCF Well Intervention", tag: "02", img: cardIntervention, path: "/exercises/iwcf" },
    { title: "IADC Well Services", tag: "03", img: cardServices, path: "/exercises/iacd" },
    { title: "Kill Sheet Drills", tag: "04", img: cardKill, path: "/exercises" },
  ];

  const numbers = [
    { v: "500+", t: "Exam-style questions", d: "Written to IWCF and IADC syllabus, with worked answers." },
    { v: "8+", t: "Disciplines", d: "Drilling, intervention, coiled tubing, snubbing, wireline." },
    { v: "94%", t: "Pass rate", d: "Candidates who finished the full mock test set." },
    { v: "24/7", t: "Access", d: "Practice on any device, from rig floor to hotel room." },
  ];

  const services = [
    { n: "01", t: "IWCF Level 3 & 4", d: "Surface & subsea drilling well control, kill sheets, gauge problems.", path: "/exercises/iwcf" },
    { n: "02", t: "IADC WellSharp & OGOR", d: "Well services, coiled tubing, workover, snubbing and full mock tests.", path: "/exercises/iacd" },
    { n: "03", t: "Study Manuals", d: "Reference guides and formula sheets for exam day.", path: "/manuals" },
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
                  <button key={n.label} onClick={() => navigate(n.path)} className="relative text-[13px] text-background/80 hover:text-background transition-colors">
                    {n.label}
                    {n.badge && (
                      <span className="absolute -top-2.5 -right-5 text-[8px] bg-primary text-primary-foreground rounded-full px-1.5 py-px">{n.badge}</span>
                    )}
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
                    className="bg-background/20 hover:bg-background/40 text-background rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/exercises")}
                  className="group flex items-center gap-2 bg-background text-foreground rounded-full pl-1.5 pr-4 py-1.5 text-xs font-semibold"
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
                  Next-Gen
                  <br />
                  Well Control Prep for
                  <br />
                  Drilling Crews.
                </h1>
              </div>

              <div className="mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="flex flex-wrap gap-x-16 gap-y-2 text-xs text-background/80">
                  <span>+ IWCF</span>
                  <span>+ IADC</span>
                  <span>+ Kill Sheets</span>
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
                      onClick={() => navigate("/exercises")}
                      className="group flex items-center gap-1.5 bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-xs font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Start Practicing
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <button
                      onClick={() => navigate("/manuals")}
                      className="group flex items-center gap-1.5 bg-background text-foreground rounded-full px-5 py-2.5 text-xs font-semibold"
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

        {/* STATEMENT */}
        <section className="px-5 sm:px-10 pt-20 pb-14">
          <Marker>Who we are</Marker>
          <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-[30px] sm:text-[42px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.03em] text-foreground max-w-[720px]">
              We build exam-verified practice systems to help drilling crews{" "}
              <span className="text-muted-foreground">pass on the first attempt.</span>
            </h2>
            <button
              onClick={() => navigate("/exercises")}
              className="group flex items-center gap-3 text-foreground font-semibold text-base sm:text-lg uppercase tracking-tight border-b border-dotted border-primary pb-2 shrink-0"
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              Explore courses
            </button>
          </div>
        </section>

        {/* PORTRAIT CARDS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-0">
          {cards.map((c, i) => (
            <button
              key={c.title}
              onClick={() => navigate(c.path)}
              className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-foreground text-left ${i === 0 ? "rounded-l-none" : ""} ${i === 3 ? "rounded-r-none" : ""}`}
            >
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-primary/30" />
              <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.18em] text-background/80">■ {c.tag}</div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                <span className="text-background font-semibold text-base sm:text-xl tracking-tight leading-tight">{c.title}</span>
                <ArrowUpRight className="w-5 h-5 text-background shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          ))}
        </section>

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

        {/* DARK SERVICES */}
        <section className="bg-foreground px-5 sm:px-10 pt-16 pb-10">
          <Marker dark>Courses</Marker>
          <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-background/15">
            <h2 className="text-[40px] sm:text-[56px] font-medium tracking-[-0.035em] text-background leading-none">
              Our <span className="text-background/50">Courses</span>
            </h2>
            <p className="text-xs text-background/60 max-w-xs leading-relaxed">
              Practice the way the real exam is set — timed mock tests, kill sheet calculations and instant answer review.
            </p>
          </div>
          <div>
            {services.map((s) => (
              <button
                key={s.n}
                onClick={() => navigate(s.path)}
                className="group w-full grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 border-b border-dashed border-background/20 text-left"
              >
                <span className="text-[11px] font-mono text-primary">[{s.n}]</span>
                <div>
                  <p className="text-xl sm:text-3xl font-medium tracking-tight text-background group-hover:text-primary transition-colors">{s.t}</p>
                  <p className="mt-1 text-xs sm:text-sm text-background/55">{s.d}</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-background/25 flex items-center justify-center text-background group-hover:bg-primary group-hover:border-primary transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
          <footer className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-background/50">
            <span className="flex items-center gap-1.5"><Asterisk className="w-4 h-4 text-primary" /> Well Control Club</span>
            <span>© 2026 Well Control Club. All rights reserved.</span>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Index;
