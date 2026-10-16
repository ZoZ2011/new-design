import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import SelectionCard from "@/components/SelectionCard";
import { toast } from "sonner";

const Manuals = () => {
  const navigate = useNavigate();

  const manuals = [
    {
      badge: "IWCF OFFICIAL",
      title: "IWCF Formulas",
      subtitle: "Official IWCF formula sheets for drilling & intervention",
      buttonText: "View Formula Sheet",
      isFeatured: true,
      features: [
        "Hydrostatic & Kill Mud Weight Formulas",
        "Initial & Final Circulating Pressures",
        "MAASP & Formation Breakdown Gradients",
        "Subsea Choke Line Friction Calculations",
      ],
    },
    {
      badge: "IADC WELLSHARP",
      title: "IADC Manual",
      subtitle: "Comprehensive IADC WellSharp calculation & procedure manual",
      buttonText: "View IADC Manual",
      isFeatured: false,
      features: [
        "Well Services Pressure Barriers Sheet",
        "Stripping & Snubbing Force Equations",
        "Lubricate & Bleed Calculations",
        "Volumetric Method Worksheets",
      ],
    },
    {
      badge: "KILL SHEETS",
      title: "Kill Sheets",
      subtitle: "Standardized worked surface and subsea kill sheet templates",
      buttonText: "View Kill Sheets",
      isFeatured: false,
      features: [
        "Wait & Weight Method Worksheets",
        "Driller's Method Calculation Guides",
        "BOP Stack Schematics & Cavity Ratings",
        "Gas Bubble Migration Reference Tables",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] font-jakarta">
      {/* Header */}
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
          <span className="text-xs sm:text-sm font-semibold text-slate-900">Study Manuals</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center space-y-2.5 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Study Manuals
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto">
            Official formula sheets, kill sheets and reference manuals.
          </p>
        </div>

        {/* 3-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {manuals.map((m) => (
            <SelectionCard
              key={m.title}
              badge={m.badge}
              title={m.title}
              subtitle={m.subtitle}
              buttonText={m.buttonText}
              isFeatured={m.isFeatured}
              features={m.features}
              onClick={() => {
                toast.info(`Opening ${m.title} — Reference sheet is ready for your review.`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manuals;
