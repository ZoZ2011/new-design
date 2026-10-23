import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCategoryAccess } from "@/hooks/useCategoryAccess";
import SelectionCard from "@/components/SelectionCard";

const IACDDrilling = () => {
  const navigate = useNavigate();
  const { openCategory, AccessModal } = useCategoryAccess();
  const [dynamicCategories, setDynamicCategories] = useState<{ name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamic = async () => {
      const { data } = await supabase
        .from("question_categories")
        .select("name, slug")
        .eq("parent_path", "/exercises/iacd/drilling")
        .order("display_order");
      if (data) setDynamicCategories(data);
      setLoading(false);
    };
    fetchDynamic();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/exercises/iacd")}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm text-slate-500">Exercises</span>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm text-slate-500">IADC</span>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">Drilling</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 animate-fade-in w-full">
        {/* Title */}
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            IADC Drilling
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            {dynamicCategories.length > 0
              ? "Select a topic to begin practicing."
              : "This section is currently being prepared."}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400 text-sm">Loading topics...</div>
        ) : dynamicCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {dynamicCategories.map((cat, idx) => (
              <SelectionCard
                key={cat.slug}
                number={idx + 1}
                badge={`DRILLING #${idx + 1}`}
                title={cat.name}
                subtitle="WellSharp drilling practice & worked problems"
                buttonText="Start Topic"
                isFeatured={idx === 0}
                features={[
                  "IADC WellSharp syllabus questions",
                  "Step-by-step mathematical answers",
                  "Comprehensive topic drills",
                ]}
                onClick={() => openCategory(cat.slug)}
              />
            ))}
          </div>
        ) : (
          /* Under Development State */
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <div className="text-center space-y-2 max-w-sm">
              <h2 className="text-xl font-bold text-slate-900">Coming Soon</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                IADC Drilling content is currently under development. Check back soon for new questions and practice materials.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => navigate("/exercises/iacd")}
                className="text-sm font-semibold text-primary hover:underline cursor-pointer"
              >
                Back to IADC
              </button>
              <span className="text-slate-300">·</span>
              <button
                onClick={() => navigate("/")}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Home
              </button>
            </div>
          </div>
        )}
      </div>
      <AccessModal />
    </div>
  );
};

export default IACDDrilling;
