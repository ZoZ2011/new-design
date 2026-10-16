import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCategoryAccess } from "@/hooks/useCategoryAccess";
import SelectionCard from "@/components/SelectionCard";

const STATIC_MOCK_TESTS = [
  {
    slug: "iadc-ogor-mock-test-1",
    name: "Mock Test #1",
    badge: "MOCK TEST #1",
    subtitle: "Comprehensive IADC OGOR certification mock simulation",
    isFeatured: false,
    features: [
      "Well Control Principles & Procedures",
      "Barrier Verification & Calculations",
      "Immediate Step-by-Step Solutions",
      "Detailed Performance Breakdown",
    ],
  },
  {
    slug: "iadc-ogor-mock-test-2",
    name: "Mock Test #2",
    badge: "MOST POPULAR",
    subtitle: "Advanced scenario question bank with volumetric drills",
    isFeatured: true,
    features: [
      "Rig-Floor Problems & Gas Migration",
      "Wellhead & Tree Pressure Problems",
      "Volumetric Method Calculations",
      "Full Worked Answers Review",
    ],
  },
  {
    slug: "iadc-ogor-mock-test-3",
    name: "Mock Test #3",
    badge: "FINAL ASSESSMENT",
    subtitle: "Complete timed evaluation drill before exam day",
    isFeatured: false,
    features: [
      "Full Exam Syllabus Questions",
      "Timed Exam Pressure Environment",
      "Real Exam Pass/Fail Indicator",
      "Complete Explanation Notes",
    ],
  },
];

const IACDOGORMockTests = () => {
  const navigate = useNavigate();
  const { openCategory, AccessModal } = useCategoryAccess();
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

  const extraTests = dynamicCategories
    .filter((d) => !STATIC_MOCK_TESTS.some((s) => s.slug === d.slug))
    .map((d, index) => ({
      slug: d.slug,
      name: d.name,
      badge: `ADDITIONAL #${index + 4}`,
      subtitle: "Official mock simulation test set",
      isFeatured: false,
      features: [
        "Curated IADC Syllabus Questions",
        "Timed Simulation Mode",
        "Instant Grading & Explanations",
      ],
    }));

  const allTests = [...STATIC_MOCK_TESTS, ...extraTests];

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => navigate("/exercises/iacd/well-services/ogor")}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm text-slate-500">IADC</span>
          <span className="text-slate-300">›</span>
          <button
            onClick={() => navigate("/exercises/iacd/well-services")}
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            Well Services
          </button>
          <span className="text-slate-300">›</span>
          <button
            onClick={() => navigate("/exercises/iacd/well-services/ogor")}
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            OGOR
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">Mock Tests</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            IADC OGOR Mock Tests
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            Select a full-length mock test to begin your exam practice.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading mock tests...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {allTests.map((test) => (
              <SelectionCard
                key={test.slug}
                badge={test.badge}
                title={test.name}
                subtitle={test.subtitle}
                buttonText="Start Test"
                isFeatured={test.isFeatured}
                features={test.features}
                onClick={() => openCategory(test.slug)}
              />
            ))}
          </div>
        )}
      </div>

      <AccessModal />
    </div>
  );
};

export default IACDOGORMockTests;
