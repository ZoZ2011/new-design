import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCategoryAccess } from "@/hooks/useCategoryAccess";
import SelectionCard from "@/components/SelectionCard";

const STATIC_CATEGORIES = [
  { slug: "ogor", badge: "OGOR", name: "OGOR", description: "IADC OGOR certification practice questions", isOgor: true,
    features: ["Coiled Tubing, Snubbing, Workover, Wireline", "Full OGOR Mock Tests", "Instant answer review"] },
  { slug: "coiled-tubing", badge: "COURSE", name: "Coiled Tubing", description: "Coiled tubing operations and well intervention techniques",
    features: ["CT equipment & stack", "Pressure control", "Operations procedures"] },
  { slug: "workover", badge: "COURSE", name: "Workover", description: "Workover operations and completion procedures",
    features: ["Completion equipment", "Well killing", "Workover procedures"] },
  { slug: "snubbing", badge: "COURSE", name: "Snubbing", description: "Snubbing operations under pressure conditions",
    features: ["Snubbing stack", "Pipe-light / heavy", "Barrier management"] },
  { slug: "wireline", badge: "COURSE", name: "Wireline", description: "Wireline logging and perforation operations",
    features: ["Lubricator & BOP", "Slickline & e-line", "Pressure testing"] },
];

const IACDWellServices = () => {
  const navigate = useNavigate();
  const { openCategory, AccessModal } = useCategoryAccess();
  const [dynamicCategories, setDynamicCategories] = useState<{ name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamic = async () => {
      const { data } = await supabase
        .from("question_categories")
        .select("name, slug")
        .eq("parent_path", "/exercises/iacd/well-services")
        .order("display_order");
      if (data) setDynamicCategories(data);
      setLoading(false);
    };
    fetchDynamic();
  }, []);

  const extraCategories = dynamicCategories.filter(d => !STATIC_CATEGORIES.some(s => s.slug === d.slug));

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta">
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
          <button onClick={() => navigate("/exercises/iacd")} className="text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900">IADC</button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">Well Services</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Well Services</h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">Choose the topic you want to practice.</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-500 text-sm">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {STATIC_CATEGORIES.map(cat => (
              <SelectionCard
                key={cat.slug}
                badge={cat.badge}
                title={cat.name}
                subtitle={cat.description}
                buttonText={cat.isOgor ? "Open OGOR" : "Start Practicing"}
                isFeatured={!!cat.isOgor}
                features={cat.features}
                onClick={() => cat.isOgor ? navigate("/exercises/iacd/well-services/ogor") : toast.info("No available questions for this topic yet.")}
              />
            ))}
            {extraCategories.map(cat => (
              <SelectionCard
                key={cat.slug}
                badge="TOPIC"
                title={cat.name}
                subtitle="Click to start practicing"
                features={["Exam-style questions", "Instant answer review"]}
                onClick={() => openCategory(cat.slug)}
              />
            ))}
          </div>
        )}
      </div>
      <AccessModal />
    </div>
  );
};

export default IACDWellServices;
