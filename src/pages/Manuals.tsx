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
    <div className="min-h-screen bg-[#f1f5f9] p-2.5 sm:p-5 lg:p-8 font-jakarta flex justify-center items-start">
      <div className="w-full max-w-[1140px] bg-white rounded-[36px] sm:rounded-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 p-4 sm:p-8 lg:p-10 space-y-10 sm:space-y-12 overflow-hidden">
        
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-100">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full pl-3 pr-4 py-2 text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d68f2]" />
            </div>
            <span className="font-extrabold text-xs sm:text-sm tracking-[0.14em] text-slate-900 uppercase">
              UIXSHUVO
            </span>
          </div>

          <button
            onClick={() => navigate("/exercises")}
            className="bg-[#111827] hover:bg-black text-white px-5 py-2 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            Practice Tests
          </button>
        </header>

        {/* Title Section */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            REFERENCE & FORMULAS
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Study Manuals
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
            Official formula sheets, worked kill sheets, and essential well control reference materials.
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

        {/* Footer */}
        <footer className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1d68f2]" />
            <span className="font-semibold text-slate-600">UIXSHUVO • Well Control Club</span>
          </div>
          <span>© 2026 Well Control Club. All rights reserved.</span>
        </footer>

      </div>
    </div>
  );
};

export default Manuals;
