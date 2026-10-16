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

  const STATIC_SLUGS = ["ogor", "coiled-tubing", "workover", "snubbing", "wireline"];
  const extraCategories = dynamicCategories.filter(
    (d) => !STATIC_SLUGS.includes(d.slug)
  );

  const staticCards = [
    {
      slug: "ogor",
      badge: "FEATURED",
      title: "OGOR",
      subtitle: "IADC OGOR certification practice — full mock test format",
      features: [
        "Official OGOR exam-style questions",
        "Covers all syllabus sections",
        "Instant answer review & scoring",
      ],
      buttonText: "Start Practicing",
      isFeatured: true,
      onClick: () => navigate("/exercises/iacd/well-services/ogor"),
    },
    {
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
  ];

  return (
    <div className="min-h-screen bg-background font-jakarta flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/exercises/iacd")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-border">›</span>
          <span className="text-sm text-muted-foreground">Exercises</span>
          <span className="text-border">›</span>
          <span className="text-sm text-muted-foreground">IADC</span>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Well Services</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 animate-fade-in w-full">
        <div className="mb-10 space-y-3">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
            IADC — Well Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Select Topic
          </h1>
          <p className="text-muted-foreground text-sm">
            Choose the certification topic you want to practice
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticCards.map((card) => (
              <SelectionCard
                key={card.slug}
                badge={card.badge}
                title={card.title}
                subtitle={card.subtitle}
                features={card.features}
                buttonText={card.buttonText}
                isFeatured={card.isFeatured}
                onClick={card.onClick}
              />
            ))}

            {extraCategories.map((cat) => (
              <SelectionCard
                key={cat.slug}
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
