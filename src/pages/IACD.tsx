import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SelectionCard from "@/components/SelectionCard";

const IACD = () => {
  const navigate = useNavigate();

  const disciplines = [
    {
      number: 1,
      badge: "DRILLING TRACK",
      title: "Drilling",
      subtitle: "IADC WellSharp Drilling certification preparation",
      buttonText: "Start Drilling",
      isFeatured: true,
      path: "/exercises/iacd/drilling",
      features: [
        "Drilling Operations & Kick Detection",
        "Shut-in Procedures & Verification",
        "Circulating Methods & Calculations",
        "Equipment & Choke Manifolds",
      ],
    },
    {
      number: 2,
      badge: "WELL SERVICES",
      title: "Well Services",
      subtitle: "IADC Well Services certification prep and topic drills",
      buttonText: "Start Well Services",
      isFeatured: false,
      path: "/exercises/iacd/well-services",
      features: [
        "Workover & Completion Techniques",
        "Coiled Tubing & Snubbing Operations",
        "Wireline Equipment & Procedures",
        "OGOR Mock Tests & Drills",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta">
      {/* Sticky Top Breadcrumb Header */}
      <header className="sticky top-0 z-50 bg-[#fafafc]/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2">
          <button
            onClick={() => navigate("/exercises")}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Exercises
          </button>
          <span className="text-slate-300">›</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900">IADC Programs</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            IADC Programs
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            Select your IADC certification track to begin practicing.
          </p>
        </div>

        {/* 2-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8 items-stretch">
          {disciplines.map((d) => (
            <SelectionCard
              key={d.title}
              number={d.number}
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

export default IACD;
