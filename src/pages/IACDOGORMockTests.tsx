import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STATIC_MOCK_TESTS = [
  { slug: "iadc-ogor-mock-test-1", name: "Mock Test #1" },
  { slug: "iadc-ogor-mock-test-2", name: "Mock Test #2" },
  { slug: "iadc-ogor-mock-test-3", name: "Mock Test #3" },
];

const IACDOGORMockTests = () => {
  const navigate = useNavigate();
  const [dynamicCategories, setDynamicCategories] = useState<{ name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamic = async () => {
      const { data } = await supabase
        .from("question_categories")
        .select("name, slug")
        .eq("parent_path", "/exercises/iacd/well-services/ogor/mock-tests")
        .order("display_order");
      if (data) setDynamicCategories(data);
      setLoading(false);
    };
    fetchDynamic();
  }, []);

  const allTests = [
    ...STATIC_MOCK_TESTS,
    ...dynamicCategories.filter(d => !STATIC_MOCK_TESTS.some(s => s.slug === d.slug)),
  ];

  const rows: { slug: string; name: string }[][] = [];
  for (let i = 0; i < allTests.length; i += 3) {
    rows.push(allTests.slice(i, i + 3));
  }

  return (
    <div className="min-h-screen bg-background font-jakarta flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => navigate("/exercises/iacd/well-services/ogor")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-border">›</span>
          <span className="text-sm text-muted-foreground">IADC</span>
          <span className="text-border">›</span>
          <button
            onClick={() => navigate("/exercises/iacd/well-services")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Well Services
          </button>
          <span className="text-border">›</span>
          <button
            onClick={() => navigate("/exercises/iacd/well-services/ogor")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            OGOR
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground">Mock Tests</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-1 animate-fade-in w-full">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            IADC OGOR Mock Tests
          </h1>
          <p className="text-muted-foreground text-base">Select a mock test to begin</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground text-sm">Loading...</div>
        ) : (
          <div className="space-y-4">
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid gap-4 ${
                  row.length === 3 ? "grid-cols-3" : row.length === 2 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {row.map(cat => (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default IACDOGORMockTests;
