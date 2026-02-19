import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const IACDDrilling = () => {
  const navigate = useNavigate();
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
          <span className="text-sm font-semibold text-foreground">Drilling</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 animate-fade-in">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-1">
            IADC Drilling
          </h1>
          <p className="text-muted-foreground text-sm">
            {dynamicCategories.length > 0
              ? "Select a topic to begin practicing"
              : "This section is being prepared"}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>
        ) : dynamicCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dynamicCategories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/signin/${cat.slug}`)}
                className="group relative bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base mb-1">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">Click to start practicing</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Under Development State */
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2 max-w-sm">
              <h2 className="text-xl font-bold text-foreground">Coming Soon</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                IADC Drilling content is currently under development. Check back soon for new questions and practice materials.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => navigate("/exercises/iacd")}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Back to IADC
              </button>
              <span className="text-border">·</span>
              <button
                onClick={() => navigate("/")}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IACDDrilling;
