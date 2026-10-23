import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  GraduationCap,
  Layers3,
  LogOut,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Waves,
  Zap,
} from "lucide-react";
import iwcfLogo from "@/assets/iwcf-logo.jpg";
import iadcLogo from "@/assets/iadc-logo.png";

type Course = {
  title: string;
  provider: "IWCF" | "IADC";
  track: string;
  detail: string;
  progress: number;
  lessons: string;
  color: string;
  icon: typeof ShieldCheck;
  path: string;
};

const courses: Course[] = [
  {
    title: "Drilling Well Control",
    provider: "IWCF",
    track: "Level 3 & 4",
    detail: "Surface and subsea operations",
    progress: 46,
    lessons: "24 topics",
    color: "violet",
    icon: ShieldCheck,
    path: "/exercises/iwcf/drilling",
  },
  {
    title: "Well Intervention",
    provider: "IWCF",
    track: "Intervention",
    detail: "Wireline, coiled tubing and snubbing",
    progress: 18,
    lessons: "16 topics",
    color: "lime",
    icon: Waves,
    path: "/exercises/iwcf/well-intervention",
  },
  {
    title: "Well Services",
    provider: "IADC",
    track: "WellSharp",
    detail: "Service operations and pressure control",
    progress: 31,
    lessons: "20 topics",
    color: "amber",
    icon: Layers3,
    path: "/exercises/iacd/well-services",
  },
  {
    title: "Drilling Operations",
    provider: "IADC",
    track: "WellSharp",
    detail: "Kick detection and shut-in procedures",
    progress: 0,
    lessons: "18 topics",
    color: "blue",
    icon: Target,
    path: "/exercises/iacd/drilling",
  },
  {
    title: "OGOR Mock Tests",
    provider: "IADC",
    track: "Exam practice",
    detail: "Timed full-length practice exams",
    progress: 0,
    lessons: "3 mock tests",
    color: "pink",
    icon: Award,
    path: "/exercises/iacd/well-services/ogor/mock-tests",
  },
];

const colorStyles: Record<string, { badge: string; icon: string; bar: string; glow: string }> = {
  violet: { badge: "bg-violet-100 text-violet-700", icon: "bg-violet-200 text-violet-700", bar: "bg-violet-500", glow: "bg-violet-200" },
  lime: { badge: "bg-lime-100 text-lime-800", icon: "bg-lime-200 text-lime-800", bar: "bg-lime-500", glow: "bg-lime-200" },
  amber: { badge: "bg-amber-100 text-amber-800", icon: "bg-amber-200 text-amber-800", bar: "bg-amber-500", glow: "bg-amber-200" },
  blue: { badge: "bg-sky-100 text-sky-800", icon: "bg-sky-200 text-sky-800", bar: "bg-sky-500", glow: "bg-sky-200" },
  pink: { badge: "bg-pink-100 text-pink-800", icon: "bg-pink-200 text-pink-800", bar: "bg-pink-500", glow: "bg-pink-200" },
};

const Index = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const firstName = userName?.trim().split(/\s+/)[0] || "there";
  const [filter, setFilter] = useState<"All" | "IWCF" | "IADC">("All");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastCourse = localStorage.getItem("lastCourse") || courses[0].path;

  const visibleCourses = useMemo(() => courses.filter((course) => {
    const matchesProvider = filter === "All" || course.provider === filter;
    const matchesQuery = `${course.title} ${course.provider} ${course.track}`.toLowerCase().includes(query.toLowerCase());
    return matchesProvider && matchesQuery;
  }), [filter, query]);

  const openCourse = (path: string) => {
    localStorage.setItem("lastCourse", path);
    navigate(path);
  };

  return (
    <main className="min-h-screen bg-[#eeeaff] px-3 py-5 sm:px-6 sm:py-8 font-jakarta">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_28px_90px_rgba(46,35,89,0.18)] sm:rounded-[34px]">
        <header className="relative z-20 flex min-h-[68px] items-center justify-between gap-4 bg-[#111111] px-5 text-white sm:px-8">
          <button onClick={() => navigate("/")} className="shrink-0 text-xl font-black tracking-tight text-white" aria-label="Well Control home">
            well<span className="text-[#d8f33f]">wise</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white">⌂&nbsp; Dashboard</button>
            <button onClick={() => document.getElementById("course-library")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-4 py-2 text-xs text-white/65 transition hover:bg-white/10 hover:text-white">◫&nbsp; Courses</button>
            <button onClick={() => navigate("/exercises")} className="rounded-full px-4 py-2 text-xs text-white/65 transition hover:bg-white/10 hover:text-white">◎&nbsp; Practice</button>
            <button onClick={() => navigate("/manuals")} className="rounded-full px-4 py-2 text-xs text-white/65 transition hover:bg-white/10 hover:text-white">▤&nbsp; Manuals</button>
          </nav>

          <div className="relative">
            <button onClick={() => setMenuOpen((open) => !open)} className="flex items-center gap-2 rounded-full px-1 py-1 text-left hover:bg-white/10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-400 text-sm">👷</span>
              <span className="hidden sm:block">
                <span className="block text-[11px] font-semibold">{userName || "Candidate"}</span>
                <span className="block text-[9px] text-white/55">{userId ? `ID ${userId}` : "Well control learner"}</span>
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-white/65" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-12 z-30 w-44 rounded-2xl border border-slate-100 bg-white p-2 text-slate-700 shadow-xl">
                <button onClick={() => navigate("/settings/iwcf")} className="w-full rounded-xl px-3 py-2 text-left text-xs hover:bg-slate-50">Settings</button>
                <button onClick={() => { localStorage.removeItem("userId"); localStorage.removeItem("userName"); window.location.reload(); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50"><LogOut className="h-3.5 w-3.5" /> Sign out</button>
              </div>
            )}
          </div>
        </header>

        <div className="space-y-6 bg-[#fbfbfa] p-4 sm:p-7 lg:p-9">
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">YOUR WELL CONTROL CLASSROOM</p>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl">Good morning, {firstName}!</h1>
              <p className="mt-1 text-xs text-slate-500">You’re making steady progress toward your certification. <span className="text-lime-600">✦</span></p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="flex min-w-[92px] items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5"><span className="text-lg">🏅</span><span><b className="block text-sm text-slate-900">248</b><small className="text-[9px] text-slate-500">Points</small></span></div>
              <div className="flex min-w-[92px] items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-3 py-2.5"><GraduationCap className="h-5 w-5 text-violet-500" /><span><b className="block text-sm text-slate-900">2</b><small className="text-[9px] text-slate-500">Programs</small></span></div>
              <div className="flex min-w-[92px] items-center gap-2 rounded-2xl border border-lime-200 bg-lime-50 px-3 py-2.5"><Award className="h-5 w-5 text-amber-500" /><span><b className="block text-sm text-slate-900">1</b><small className="text-[9px] text-slate-500">Certificate</small></span></div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(275px,.85fr)]">
            <div className="space-y-5">
              <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">PICK UP WHERE YOU LEFT OFF</p><h2 className="mt-1 text-base font-extrabold text-slate-900">Continue learning</h2></div>
                  <span className="rounded-full bg-lime-100 px-3 py-1 text-[10px] font-bold text-lime-800">46% complete</span>
                </div>
                <button onClick={() => openCourse(lastCourse)} className="group flex w-full items-center gap-4 rounded-2xl bg-[#fafafa] p-3 text-left transition hover:bg-violet-50 sm:p-4">
                  <div className="relative flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-lime-200">
                    <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-lime-300" />
                    <ShieldCheck className="relative h-10 w-10 text-violet-700" />
                    <Sparkles className="absolute bottom-2 left-2 h-4 w-4 text-violet-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2"><span className="text-[9px] font-bold text-violet-600">IWCF · DRILLING</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[8px] text-slate-500">Level 3 & 4</span></div>
                    <h3 className="truncate text-sm font-extrabold text-slate-900">Drilling Well Control</h3>
                    <p className="mt-1 text-[10px] text-slate-500">11 of 24 topics completed</p>
                    <div className="mt-2 h-1.5 max-w-[230px] overflow-hidden rounded-full bg-slate-200"><div className="h-full w-[46%] rounded-full bg-violet-500" /></div>
                  </div>
                  <span className="hidden shrink-0 items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-[10px] font-bold text-white transition group-hover:bg-violet-600 sm:flex">Resume <Play className="h-3 w-3 fill-current" /></span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 sm:hidden" />
                </button>
              </article>

              <section id="course-library" className="scroll-mt-5">
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">BUILD YOUR SKILLS</p><h2 className="mt-1 text-base font-extrabold text-slate-900">Choose a course</h2></div>
                  <label className="flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3"><Search className="h-3.5 w-3.5 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a course" className="w-28 bg-transparent text-[10px] outline-none placeholder:text-slate-400 sm:w-36" /></label>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  {(["All", "IWCF", "IADC"] as const).map((provider) => <button key={provider} onClick={() => setFilter(provider)} className={`rounded-full px-3.5 py-1.5 text-[10px] font-bold transition ${filter === provider ? "bg-[#171717] text-white" : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100"}`}>{provider === "All" ? "All courses" : provider}</button>)}
                  <span className="ml-auto text-[9px] text-slate-400">{visibleCourses.length} courses</span>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {visibleCourses.map((course) => {
                    const style = colorStyles[course.color];
                    const Icon = course.icon;
                    return (
                      <button key={course.title} onClick={() => openCourse(course.path)} className="group relative flex min-h-[112px] items-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
                        <span className={`absolute -right-6 -top-8 h-20 w-20 rounded-full opacity-40 ${style.glow}`} />
                        <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.icon}`}><Icon className="h-6 w-6" /></span>
                        <span className="relative z-10 min-w-0 flex-1">
                          <span className="mb-1 flex flex-wrap items-center gap-1.5"><span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${style.badge}`}>{course.provider}</span><span className="text-[8px] text-slate-400">{course.track}</span></span>
                          <span className="block truncate text-[11px] font-extrabold text-slate-900">{course.title}</span>
                          <span className="mt-0.5 block truncate text-[9px] text-slate-500">{course.detail}</span>
                          <span className="mt-2 flex items-center gap-2"><span className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100"><span className={`block h-full rounded-full ${style.bar}`} style={{ width: `${course.progress}%` }} /></span><span className="text-[8px] text-slate-400">{course.progress ? `${course.progress}%` : course.lessons}</span></span>
                        </span>
                        <ArrowRight className="relative z-10 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-700" />
                      </button>
                    );
                  })}
                </div>
                {visibleCourses.length === 0 && <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-xs text-slate-500">No courses match “{query}”. Try IWCF or IADC.</p>}
              </section>
            </div>

            <aside className="space-y-4">
              <article className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="absolute -right-12 -top-10 h-40 w-40 rounded-full bg-lime-100/70" />
                <div className="relative flex items-start justify-between">
                  <div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">KEEP THE MOMENTUM</p><h2 className="mt-1 text-base font-extrabold text-slate-900">Your study streak</h2></div>
                  <div className="flex items-center gap-1 text-2xl font-black text-slate-900"><Zap className="h-6 w-6 fill-lime-400 text-lime-500" />5</div>
                </div>
                <p className="relative mt-1 text-[10px] text-slate-500">You’ve practiced 5 days in a row. Keep it going!</p>
                <div className="relative my-5 grid grid-cols-7 gap-1.5">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <div key={`${day}-${index}`} className="flex flex-col items-center gap-1.5"><span className="text-[8px] font-semibold text-slate-400">{day}</span><span className={`flex h-7 w-7 items-center justify-center rounded-full ${index < 5 ? "bg-lime-300 text-slate-900" : "border border-slate-200 text-slate-300"}`}>{index < 5 ? <Check className="h-3.5 w-3.5" /> : <span className="text-[8px]">•</span>}</span></div>)}
                </div>
                <div className="relative space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-[9px]"><span className="font-semibold text-slate-700">Weekly goal</span><span className="text-slate-400">4 of 5 sessions</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-4/5 rounded-full bg-lime-400" /></div>
                  <button onClick={() => navigate("/exercises")} className="flex items-center gap-1 pt-1 text-[10px] font-bold text-slate-700 hover:text-violet-600">View practice tracks <ArrowRight className="h-3 w-3" /></button>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#8061e9] via-[#7652da] to-[#5135b7] p-5 text-white shadow-sm">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[20px] border-white/10" />
                <div className="relative">
                  <p className="text-[9px] font-bold uppercase tracking-[.18em] text-white/65">YOUR NEXT MILESTONE</p>
                  <h2 className="mt-2 max-w-[230px] text-lg font-extrabold leading-tight">Get exam-ready with a mock test</h2>
                  <p className="mt-2 max-w-[240px] text-[10px] leading-relaxed text-white/75">Practice under timed conditions and see where to focus next.</p>
                  <button onClick={() => openCourse("/exercises/iacd/well-services/ogor/mock-tests")} className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold text-violet-700 transition hover:bg-lime-200">Explore mock tests <ArrowRight className="h-3 w-3" /></button>
                </div>
              </article>

              <article className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-white p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500"><BriefcaseBusiness className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1"><b className="block text-[11px] text-slate-900">Career resources</b><small className="text-[9px] text-slate-500">Guides, manuals and study aids</small></span>
                <button onClick={() => navigate("/manuals")} aria-label="Open manuals" className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800"><ArrowRight className="h-4 w-4" /></button>
              </article>

              <div className="flex items-center justify-center gap-3 py-1 opacity-60">
                <img src={iwcfLogo} alt="IWCF" className="h-6 max-w-[62px] object-contain grayscale" />
                <span className="h-4 w-px bg-slate-300" />
                <img src={iadcLogo} alt="IADC" className="h-6 max-w-[62px] object-contain grayscale" />
              </div>
            </aside>
          </section>

          <footer className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-4 text-[9px] text-slate-400 sm:flex-row">
            <span className="font-semibold text-slate-600">wellwise · Well Control Prep</span>
            <span>Choose a track, practice with purpose, and build confidence for exam day.</span>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Index;
