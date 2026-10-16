import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SelectionCard from "@/components/SelectionCard";

const IWCF = () => {
  const navigate = useNavigate();

  const disciplines = [
    {
      badge: "DRILLING TRACK",
      title: "Drilling",
      subtitle: "Surface & Subsea well control for Level 3 and Level 4",
      buttonText: "Start Drilling",
      isFeatured: true,
      path: "/exercises/iwcf/drilling",
      features: [
        "Level 3 Candidate Questions",
        "Level 4 Supervisor Calculations",
        "Wait & Weight / Driller's Method",
        "BOP & Choke Manifold Systems",
      ],
    },
    {
      badge: "INTERVENTION",
      title: "Intervention",
      subtitle: "Coiled tubing, wireline, snubbing and completion exams",
      buttonText: "Start Intervention",
      isFeatured: false,
      path: "/exercises/iwcf/well-intervention",
      features: [
        "Coiled Tubing Well Control",
        "Wireline Lubricator Operations",
        "Snubbing Under High Pressure",
        "Barrier Verification & Testing",
      ],
    },
    {
      badge: "STUDY AIDS",
      title: "Manuals",
      subtitle: "IWCF formula sheets, kill sheets and reference tables",
      buttonText: "Open Manuals",
      isFeatured: false,
      path: "/manuals",
      features: [
        "Official IWCF Formula Sheet",
        "Kill Sheet Worksheets (Subsea & Surface)",
        "Pressure Gradient Reference Tables",
        "Gas Law Calculations Summary",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <span className="text-slate-300">›</span>
          <button
            onClick={() => navigate("/exercises")}
            className="text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            Exercises
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">IWCF</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            IWCF Programs
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            Choose the IWCF discipline you want to practice.
          </p>
        </div>

        {/* 3-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {disciplines.map((d) => (
            <SelectionCard
              key={d.title}
              badge={d.badge}
              title={d.title}
              subtitle={d.subtitle}
              buttonText={d.buttonText}
              isFeatured={d.isFeatured}
              features={d.features}
              onClick={() => navigate(d.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IWCF;
