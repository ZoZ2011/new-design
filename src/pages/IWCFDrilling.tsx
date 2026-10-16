import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCategoryAccess } from "@/hooks/useCategoryAccess";
import { checkCategoryAccess } from "@/lib/accessControl";
import SelectionCard from "@/components/SelectionCard";

const IWCFDrilling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { level?: number; day?: string } | null;

  const [selectedLevel, setSelectedLevel] = useState<null | 3 | 4>(
    locationState?.level === 4 ? 4 : locationState?.level === 3 ? 3 : null
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(locationState?.day || null);
  const [dayCategories, setDayCategories] = useState<{ name: string; slug: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const { openCategory, AccessModal, setModalOpen } = useCategoryAccess();
  const [levelChecking, setLevelChecking] = useState(false);

  const handleSelectLevel = async (level: 3 | 4) => {
    if (level === 4) {
      setLevelChecking(true);
      const { allowed } = await checkCategoryAccess(undefined, true);
      setLevelChecking(false);
      if (!allowed) {
        setModalOpen(true);
        return;
      }
    }
    setSelectedLevel(level);
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
      <div className="min-h-screen bg-[#fafafc] font-jakarta flex flex-col">
        <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <button
              onClick={() => setSelectedLevel(null)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-slate-300">›</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900">Level 3</span>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Clock className="w-8 h-8 text-slate-400" />
          </div>
          <div className="text-center space-y-2 max-w-sm">
            <h2 className="text-xl font-bold text-slate-900">Under Development</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Level 3 content is currently being prepared. Check back soon.
            </p>
          </div>
          <button
            onClick={() => setSelectedLevel(null)}
            className="text-sm font-semibold text-primary hover:underline cursor-pointer"
          >
            Back to Drilling Levels
          </button>
        </div>
      </div>
    );
  }

  if (selectedLevel === 4) {
    const days = [
      {
        title: "Day #1",
        badge: "PART 1",
        subtitle: "Principles & Procedures (Part 1)",
        slug: "iwcf-drilling-level4-day1",
        features: [
          "Hydrostatic & Formation Pressure",
          "Kick Causes & Warning Signs",
          "Shut-in Methods & Verification",
          "Gas Behavior & Migration",
        ],
      },
      {
        title: "Day #2",
        badge: "PART 2",
        subtitle: "Principles & Procedures (Part 2) & Calculations",
        slug: "iwcf-drilling-level4-day2",
        isFeatured: true,
        features: [
          "Wait & Weight Method Drills",
          "Driller's Method Calculation Steps",
          "Kill Mud & Influx Calculation",
          "Volumetric & Stripping Operations",
        ],
      },
      {
        title: "Day #3",
        badge: "EQUIPMENT",
        subtitle: "Well Control Equipment & Barrier Verification",
        slug: "iwcf-drilling-level4-day3",
        features: [
          "BOP Stack & Annular Preventers",
          "Choke & Kill Manifolds",
          "Accumulator & Closing Units",
          "Testing & Industry Standards",
        ],
      },
    ];

    const selectedDayInfo = selectedDay ? days.find((d) => d.slug === selectedDay) : null;

    if (selectedDay && selectedDayInfo) {
      return (
        <div className="min-h-screen bg-[#fafafc] font-jakarta flex flex-col">
          <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedDay(null);
                  setDayCategories([]);
                }}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-slate-300">›</span>
              <span className="text-xs sm:text-sm text-slate-500">Level 4</span>
              <span className="text-slate-300">›</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900">{selectedDayInfo.title}</span>
            </div>
          </header>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 animate-fade-in w-full">
            <div className="text-center space-y-2 mb-12">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {selectedDayInfo.title} — Topics
              </h1>
              <p className="text-slate-500 text-sm max-w-md mx-auto">{selectedDayInfo.subtitle}</p>
            </div>
            {loadingCategories ? (
              <p className="text-center text-slate-400 text-sm py-16">Loading topics...</p>
            ) : dayCategories.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <p className="text-slate-500 text-sm">No topics added under this day yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dayCategories.map((cat, idx) => (
                  <SelectionCard
                    key={cat.slug}
                    badge={`TOPIC #${idx + 1}`}
                    title={cat.name}
                    subtitle="Practice questions & mock review"
                    features={[
                      "Curated syllabus questions",
                      "Instant solution & grading",
                      "Real exam difficulty",
                    ]}
                    buttonText="Start Practicing"
                    isFeatured={idx === 0}
                    onClick={() => openCategory(cat.slug)}
                  />
                ))}
              </div>
            )}
          </div>
          <AccessModal />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#fafafc] font-jakarta flex flex-col">
        <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
            <button
              onClick={() => setSelectedLevel(null)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-slate-300">›</span>
            <span className="text-xs sm:text-sm text-slate-500">IWCF Drilling</span>
            <span className="text-slate-300">›</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900">Level 4</span>
          </div>
        </header>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 animate-fade-in w-full">
          <div className="text-center space-y-2.5 mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              IWCF Level 4 Days
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
              Select a training day to begin exam practice drills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {days.map((day) => (
              <SelectionCard
                key={day.slug}
                badge={day.badge}
                title={day.title}
                subtitle={day.subtitle}
                features={day.features}
                buttonText="Start Day"
                isFeatured={day.isFeatured}
                onClick={() => setSelectedDay(day.slug)}
              />
            ))}
          </div>
        </div>
        <AccessModal />
      </div>
    );
  }

  // Main: Level 3 / Level 4 selection
  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta flex flex-col">
      <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/exercises/iwcf")}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm text-slate-500">IWCF</span>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">Drilling</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 animate-fade-in w-full">
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            IWCF Drilling Certification
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            Select candidate Level 3 or supervisor Level 4 to start practicing.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto items-stretch">
          <SelectionCard
            badge="CANDIDATE TRACK"
            title="Level 3"
            subtitle="Driller candidate well control certification preparation"
            buttonText="Select Level 3"
            isFeatured={false}
            features={[
              "Basic well control calculations",
              "Kick detection & shut-in procedures",
              "Driller's method fundamentals",
              "Surface equipment overview",
            ]}
            loading={levelChecking}
            onClick={() => handleSelectLevel(3)}
          />
          <SelectionCard
            badge="SUPERVISOR TRACK"
            title="Level 4"
            subtitle="Supervisor & toolpusher well control certification prep"
            buttonText="Start Level 4"
            isFeatured={true}
            features={[
              "Advanced supervisor calculations",
              "Wait & Weight & Volumetric methods",
              "Subsea & high pressure scenarios",
              "Days #1, #2 and #3 full course drills",
            ]}
            loading={levelChecking}
            onClick={() => handleSelectLevel(4)}
          />
        </div>
      </div>
      <AccessModal />
    </div>
  );
};

export default IWCFDrilling;
