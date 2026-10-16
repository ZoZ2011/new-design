import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Wrench, Cable, Anchor, Radio, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCategoryAccess } from "@/hooks/useCategoryAccess";

const STATIC_CATEGORIES = [
  { slug: "ogor", name: "OGOR", description: "IADC OGOR certification practice questions", icon: FileText, isOgor: true },
  { slug: "coiled-tubing", name: "Coiled Tubing", description: "Coiled tubing operations and well intervention techniques", icon: Cable },
  { slug: "workover", name: "Workover", description: "Workover operations and completion procedures", icon: Wrench },
  { slug: "snubbing", name: "Snubbing", description: "Snubbing operations under pressure conditions", icon: Anchor },
  { slug: "wireline", name: "Wireline", description: "Wireline logging and perforation operations", icon: Radio },
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
    <div className="min-h-screen bg-background font-jakarta flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 animate-fade-in w-full">
        <div className="mb-8 space-y-3">
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
          <div className="space-y-4">
            {STATIC_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => cat.isOgor ? navigate("/exercises/iacd/well-services/ogor") : toast.info("No available questions for this topic yet.")}
                  className="group w-full bg-card border border-border rounded-2xl p-5 sm:p-6 flex items-center gap-4 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base sm:text-lg">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{cat.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}

            {extraCategories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => openCategory(cat.slug)}
                className="group w-full bg-card border border-border rounded-2xl p-5 sm:p-6 flex items-center gap-4 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-200">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-base sm:text-lg">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Click to start practicing</p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}
      </div>
      <AccessModal />
    </div>
  );
};

export default IACDWellServices;
