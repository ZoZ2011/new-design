import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STATIC_CATEGORIES = [
  { slug: "coiled-tubing", name: "Coiled Tubing" },
  { slug: "workover", name: "Workover" },
  { slug: "snubbing", name: "Snubbing" },
  { slug: "wireline", name: "Wireline" },
];

const IACDWellServices = () => {
  const navigate = useNavigate();
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

  const allCategories = [
    ...STATIC_CATEGORIES,
    ...dynamicCategories.filter(d => !STATIC_CATEGORIES.some(s => s.slug === d.slug)),
  ];

  // Split into pairs for grid layout, last one spans full if odd
  const pairs: { slug: string; name: string }[][] = [];
  for (let i = 0; i < allCategories.length; i += 2) {
    pairs.push(allCategories.slice(i, i + 2));
  }

  return (
    <div className="min-h-screen bg-background font-jakarta flex flex-col">
      {/* Header */}
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-1 animate-fade-in w-full">
        {/* Title */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            Well Services
          </h1>
          <p className="text-muted-foreground text-base">Select your service type</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>
        ) : (
          <div className="space-y-4">
            {pairs.map((pair, i) => (
              <div
                key={i}
                className={`grid gap-4 ${
                  pair.length === 2 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {pair.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => navigate(`/signin/${cat.slug}`)}
                    className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-8 sm:p-10 text-center font-bold text-lg sm:text-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            ))}

            {/* Mock Tests — always full width */}
            <button
              onClick={() => navigate("/exercises/iacd/well-services/mock-test")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-8 sm:p-10 text-center font-bold text-lg sm:text-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Mock Tests
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IACDWellServices;
