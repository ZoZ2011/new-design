import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCategoryAccess } from "@/hooks/useCategoryAccess";
import SelectionCard from "@/components/SelectionCard";

const STATIC_TOPICS = [
  {
    slug: "workover",
    name: "Workover",
    badge: "COMPLETIONS",
    subtitle: "Workover operations and completion procedures",
    isFeatured: false,
    features: [
      "Kill Fluid Weight & Volume Calculations",
      "Packer & Tubing Retrieval Drills",
      "Well Control Barriers Verification",
      "Perforating & Stimulation Safety",
    ],
  },
  {
    slug: "coiled-tubing",
    name: "Coiled Tubing",
    badge: "OPERATIONS",
    subtitle: "Coiled tubing operations and well intervention techniques",
    isFeatured: false,
    features: [
      "Injector Head & Stripper Assemblies",
      "Tubing Forces & Collapse Pressures",
      "Circulation & Nitrogen Lift Drills",
      "Emergency Shear & Seal Procedures",
    ],
  },
  {
    slug: "wireline",
    name: "Wireline",
    badge: "WELL SERVICES",
    subtitle: "Wireline logging, fishing and perforation operations",
    isFeatured: false,
    features: [
      "Slickline & E-Line Pressure Equipment",
      "Stuffing Box & Grease Injection Heads",
      "Tool String Fishing Operations",
      "Pressure Bleed-off Safety Steps",
    ],
  },
  {
    slug: "snubbing",
    name: "Snubbing",
    badge: "HIGH PRESSURE",
    subtitle: "Snubbing operations under pressure conditions",
    isFeatured: false,
    features: [
      "Pipe Light & Pipe Heavy Calculations",
      "Snubbing Stack & Equalizing Loops",
      "Slip Systems & Interlocking Safety",
      "Stripping & High Pressure Control",
    ],
  },
  {
    slug: "mock-tests",
    name: "OGOR Mock Tests",
    badge: "EXAM SIMULATION",
    subtitle: "Full-length timed mock tests #1, #2 and #3",
    isFeatured: true,
    isMockTestRedirect: true,
    features: [
      "Official Timed Exam Simulation",
      "Covers All OGOR Well Services Modules",
      "Immediate Review & Score Breakdown",
      "Realistic Exam Question Pool",
    ],
  },
];

const IACDWellServicesOGOR = () => {
  const navigate = useNavigate();
  const { openCategory, AccessModal } = useCategoryAccess();
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data, error } = await supabase
          .from("question_categories")
          .select("*")
          .eq("parent_path", "/exercises/iacd/well-services/ogor")
          .order("display_order");

        if (!error && data) {
          setDynamicCategories(data);
        }
      } catch (err) {
        console.error("Error fetching OGOR categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const extraCategories = dynamicCategories
    .filter((c) => !STATIC_TOPICS.some((s) => s.slug === c.slug))
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      badge: "OGOR MODULE",
      subtitle: c.description || "IADC OGOR exam practice questions",
      isFeatured: false,
      features: [
        "Syllabus questions with answers",
        "Step-by-step verified explanations",
        "Timed mock practice mode",
        "Official scoring assessment",
      ],
    }));

  const allTopics = [...STATIC_TOPICS, ...extraCategories];

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate("/exercises/iacd/well-services")}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm text-slate-500">IADC</span>
          <span className="text-slate-300">›</span>
          <button
            onClick={() => navigate("/exercises/iacd/well-services")}
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Well Services
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">OGOR</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            IADC OGOR Topics
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            Choose an OGOR topic to practice or take a full timed simulation exam.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading topics...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {allTopics.map((topic: any, idx: number) => (
              <SelectionCard
                key={topic.slug}
                number={idx + 1}
                badge={topic.badge}
                title={topic.name}
                subtitle={topic.subtitle}
                buttonText={topic.isMockTestRedirect ? "View Mock Tests" : "Start Practicing"}
                isFeatured={topic.isFeatured}
                features={topic.features}
                onClick={() => {
                  if (topic.isMockTestRedirect) {
                    navigate("/exercises/iacd/well-services/ogor/mock-tests");
                  } else {
                    openCategory(topic.slug);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      <AccessModal />
    </div>
  );
};

export default IACDWellServicesOGOR;
