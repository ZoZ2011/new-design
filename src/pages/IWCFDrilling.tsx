import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, ChevronRight, Calendar, Shield, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { signinCheck } from "@/lib/backendApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const IWCFDrilling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { level?: number; day?: string } | null;

  const [selectedLevel, setSelectedLevel] = useState<null | 3 | 4>(locationState?.level === 4 ? 4 : locationState?.level === 3 ? 3 : null);
  const [selectedDay, setSelectedDay] = useState<string | null>(locationState?.day || null);
  const [dayCategories, setDayCategories] = useState<{ name: string; slug: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [authenticated, setAuthenticated] = useState(locationState?.level === 4 && !!localStorage.getItem("userId"));
  const [idNumber, setIdNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingIds, setLoadingIds] = useState(false);

  const handleLevel4SignIn = async () => {
    const trimmedId = idNumber.trim();
    if (!trimmedId) {
      setErrorMsg("Please enter your ID");
      return;
    }
    setLoadingIds(true);
    const res = await signinCheck({ userId: trimmedId, level4: true });
    setLoadingIds(false);
    if (!res.ok) {
      setErrorMsg(res.error || "Invalid ID Number");
      return;
    }
    localStorage.setItem("userId", trimmedId);
    setAuthenticated(true);
    setErrorMsg("");
  };

  useEffect(() => {
    if (!selectedDay) return;
    const fetchCategories = async () => {
      setLoadingCategories(true);
      const { data } = await supabase
        .from("question_categories")
        .select("name, slug")
        .eq("parent_path", selectedDay)
        .order("display_order");
      setDayCategories(data ?? []);
      setLoadingCategories(false);
    };
    fetchCategories();
  }, [selectedDay]);

  if (selectedLevel === 3) {
    return (
      <div className="min-h-screen bg-background font-jakarta flex flex-col">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <button onClick={() => setSelectedLevel(null)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-border">›</span>
            <span className="text-sm font-semibold text-foreground">Level 3</span>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2 max-w-sm">
            <h2 className="text-xl font-bold text-foreground">Under Development</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Level 3 content is currently being prepared. Check back soon.
            </p>
          </div>
          <button onClick={() => setSelectedLevel(null)} className="text-sm font-semibold text-primary hover:underline">
            Back to Drilling
          </button>
        </div>
      </div>
    );
  }

  if (selectedLevel === 4) {
    // Sign-in gate
    if (!authenticated) {
      return (
        <div className="min-h-screen bg-background font-jakarta flex flex-col">
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
              <button onClick={() => setSelectedLevel(null)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-border">›</span>
              <span className="text-sm font-semibold text-foreground">Level 4</span>
            </div>
          </header>
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">IWCF Drilling Level 4</h1>
                <p className="text-muted-foreground text-sm">Enter your ID number to access exercises</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
                <div className="space-y-2">
                  <label htmlFor="idNumber" className="text-sm font-semibold text-foreground">ID Number</label>
                  <Input
                    id="idNumber"
                    type="text"
                    value={idNumber}
                    onChange={e => { setIdNumber(e.target.value); setErrorMsg(""); }}
                    placeholder="Enter your ID number"
                    onKeyPress={e => e.key === "Enter" && handleLevel4SignIn()}
                    disabled={loadingIds}
                    className="h-11 text-base"
                  />
                  {errorMsg && <p className="text-destructive text-xs mt-1">{errorMsg}</p>}
                </div>
                <Button onClick={handleLevel4SignIn} className="w-full h-11 font-semibold text-base gap-2" disabled={loadingIds}>
                  <LogIn className="w-4 h-4" />
                  {loadingIds ? "Loading..." : "Sign In"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const days = [
      { title: "Day #1", subtitle: "P&P Part 1", slug: "iwcf-drilling-level4-day1" },
      { title: "Day #2", subtitle: "P&P Part 2", slug: "iwcf-drilling-level4-day2" },
      { title: "Day #3", subtitle: "Equipment", slug: "iwcf-drilling-level4-day3" },
    ];

    const selectedDayInfo = selectedDay ? days.find(d => d.slug === selectedDay) : null;

    if (selectedDay && selectedDayInfo) {
      return (
        <div className="min-h-screen bg-background font-jakarta flex flex-col">
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
              <button onClick={() => { setSelectedDay(null); setDayCategories([]); }} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-border">›</span>
              <span className="text-sm text-muted-foreground">Level 4</span>
              <span className="text-border">›</span>
              <span className="text-sm font-semibold text-foreground">{selectedDayInfo.title}</span>
            </div>
          </header>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 animate-fade-in w-full">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-1">{selectedDayInfo.title}</h1>
              <p className="text-muted-foreground text-sm">{selectedDayInfo.subtitle}</p>
            </div>
            {loadingCategories ? (
              <p className="text-muted-foreground text-sm">Loading...</p>
            ) : dayCategories.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="text-muted-foreground text-sm">No questions added yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dayCategories.map((cat, idx) => (
                  <button
                    key={cat.slug}
                    onClick={() => navigate(`/questions/${cat.slug}`)}
                    className="w-full text-left p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 flex items-center gap-3"
                  >
                    <span className="text-primary font-bold text-lg min-w-[2rem]">{idx + 1}.</span>
                    <span className="font-semibold text-foreground">{cat.name}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background font-jakarta flex flex-col">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <button onClick={() => { setSelectedLevel(null); setAuthenticated(false); }} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-border">›</span>
            <span className="text-sm text-muted-foreground">Drilling</span>
            <span className="text-border">›</span>
            <span className="text-sm font-semibold text-foreground">Level 4</span>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 animate-fade-in w-full">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-1">Level 4</h1>
            <p className="text-muted-foreground text-sm">Select a day to begin practicing</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {days.map(day => (
              <button
                key={day.slug}
                onClick={() => setSelectedDay(day.slug)}
                className="group relative bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-0.5">{day.title}</h3>
                    <p className="text-xs text-muted-foreground">{day.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main: Level 3 / Level 4 selection
  return (
    <div className="min-h-screen bg-background font-jakarta flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button onClick={() => navigate("/exercises/iwcf")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-border">›</span>
          <span className="text-sm text-muted-foreground">IWCF</span>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Drilling</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 animate-fade-in w-full">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-1">IWCF Drilling</h1>
          <p className="text-muted-foreground text-sm">Select a level to continue</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { level: 3 as const, label: "Level 3" },
            { level: 4 as const, label: "Level 4" },
          ].map(item => (
            <button
              key={item.level}
              onClick={() => { setSelectedLevel(item.level);  }}
              className="group relative bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">{item.label}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IWCFDrilling;
