import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCategoryAccess } from "@/hooks/useCategoryAccess";
import { SelectionCard } from "@/components/SelectionCard";

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

  const STATIC_SLUGS = ["workover", "coiled-tubing", "wireline", "snubbing", "ogor"];
  const extraCategories = dynamicCategories.filter(
    (d) => !STATIC_SLUGS.includes(d.slug)
  );

  // Exact requested order:
  // 1- Workover
  // 2- Coiled Tubing
  // 3- Wireline
  // 4- Snubbing
  // 5- OGOR Mock Tests
  const staticCards = [
    {
      number: 1,
      slug: "workover",
      badge: "WELL SERVICES",
      title: "Workover",
      subtitle: "Workover operations and completion procedures",
      features: [
        "Workover rig procedures",
        "Completion & re-perforation",
        "Pressure control & well kill",
      ],
      buttonText: "Start Practicing",
      isFeatured: false,
      onClick: () => openCategory("workover"),
    },
    {
      number: 2,
      slug: "coiled-tubing",
      badge: "WELL SERVICES",
      title: "Coiled Tubing",
      subtitle: "Coiled tubing operations and well intervention techniques",
      features: [
        "CT operational procedures",
        "BOP stack & pressure control",
        "Well intervention scenarios",
      ],
      buttonText: "Start Practicing",
      isFeatured: false,
      onClick: () => openCategory("coiled-tubing"),
    },
    {
      number: 3,
      slug: "wireline",
      badge: "WELL SERVICES",
      title: "Wireline",
      subtitle: "Wireline logging, perforation and well integrity",
      features: [
        "Slickline & electric line ops",
        "Logging & perforation practice",
        "Well control on wireline",
      ],
      buttonText: "Start Practicing",
      isFeatured: false,
      onClick: () => openCategory("wireline"),
    },
    {
      number: 4,
      slug: "snubbing",
      badge: "WELL SERVICES",
      title: "Snubbing",
      subtitle: "Snubbing operations under live well pressure conditions",
      features: [
        "Snubbing unit components",
        "Live well entry procedures",
        "Emergency well control response",
      ],
      buttonText: "Start Practicing",
      isFeatured: false,
      onClick: () => openCategory("snubbing"),
    },
    {
      number: 5,
      slug: "ogor",
      badge: "MOCK EXAMS",
      title: "OGOR Mock Tests",
      subtitle: "IADC OGOR certification practice — full mock test format",
      features: [
        "Official OGOR exam-style questions",
        "Covers all syllabus sections",
        "Instant answer review & scoring",
      ],
      buttonText: "Start Practicing",
      isFeatured: true,
      onClick: () => navigate("/exercises/iacd/well-services/ogor/mock-tests"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta flex flex-col">
      {/* Sticky Top Breadcrumb Header */}
      <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2">
          <button
            onClick={() => navigate("/exercises/iacd")}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm text-slate-500">Exercises</span>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm text-slate-500">IADC</span>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">Well Services</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 animate-fade-in w-full">
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Select Topic
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            Choose the certification topic you want to practice.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400 text-sm">Loading topics...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {staticCards.map((card) => (
              <SelectionCard
                key={card.slug}
                number={card.number}
                badge={card.badge}
                title={card.title}
                subtitle={card.subtitle}
                features={card.features}
                buttonText={card.buttonText}
                isFeatured={card.isFeatured}
                onClick={card.onClick}
              />
            ))}

            {extraCategories.map((cat, idx) => (
              <SelectionCard
                key={cat.slug}
                number={idx + 6}
                badge="WELL SERVICES"
                title={cat.name}
                subtitle="Click to start practicing this topic"
                features={[
                  "Exam-style practice questions",
                  "Instant answer feedback",
                  "Track your progress",
                ]}
                buttonText="Start Practicing"
                isFeatured={false}
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
