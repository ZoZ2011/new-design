import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SelectionCard from "@/components/SelectionCard";

const Exercises = () => {
  const navigate = useNavigate();

  const programs = [
    {
      badge: "IADC WELLSHARP",
      title: "IADC",
      subtitle: "Well Services & Drilling certification tracks",
      buttonText: "Start Practicing",
      isFeatured: false,
      path: "/exercises/iacd",
      features: [
        "Well Services & Coiled Tubing",
        "Snubbing, Wireline & Workover",
        "Official OGOR Full Mock Tests",
        "Instant Step-by-Step Solutions",
      ],
    },
    {
      badge: "MOST POPULAR",
      title: "IWCF",
      subtitle: "Drilling Level 3 & Level 4 certification prep",
      buttonText: "Start Practicing",
      isFeatured: true,
      path: "/exercises/iwcf",
      features: [
        "Surface & Subsea Drilling Control",
        "Well Intervention Specialists",
        "Kill Sheets & Volumetric Drills",
        "Full Syllabus Question Bank",
      ],
    },
    {
      badge: "STUDY GUIDES",
      title: "Manuals",
      subtitle: "Official formula sheets and reference manuals",
      buttonText: "Open Manuals",
      isFeatured: false,
      path: "/manuals",
      features: [
        "IWCF Formula Quick Reference",
        "IADC Calculation Sheets",
        "BOP Stack & Wellbore Schematics",
        "Gauge Problem Worked Drills",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta">
      {/* Sticky Top Header */}
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
          <span className="text-xs sm:text-sm font-semibold text-slate-900">Exercises</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Title and Subtitle matching the design in the image */}
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Select Program
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            Choose the right certification or study guide for your needs.
          </p>
        </div>

        {/* 3-Cards Grid matching the design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {programs.map((prog) => (
            <SelectionCard
              key={prog.title}
              badge={prog.badge}
              title={prog.title}
              subtitle={prog.subtitle}
              buttonText={prog.buttonText}
              isFeatured={prog.isFeatured}
              features={prog.features}
              onClick={() => navigate(prog.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
