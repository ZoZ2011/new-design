import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SelectionCard from "@/components/SelectionCard";

const IACD = () => {
  const navigate = useNavigate();

  const disciplines = [
    {
      badge: "WELL SERVICES",
      title: "Well Services",
      subtitle: "IADC Well Services certification prep and topic drills",
      buttonText: "Start Well Services",
      isFeatured: false,
      path: "/exercises/iacd/well-services",
      features: [
        "Coiled Tubing & Snubbing Operations",
        "Wireline Equipment & Procedures",
        "Workover & Completion Techniques",
        "Wellhead & Tree Pressure Control",
      ],
    },
    {
      badge: "MOCK EXAMS",
      title: "Mock Tests",
      subtitle: "Official IADC OGOR full timed simulation exams",
      buttonText: "Take Mock Tests",
      isFeatured: true,
      path: "/exercises/iacd/well-services/ogor/mock-tests",
      features: [
        "OGOR Mock Test #1 (Comprehensive)",
        "OGOR Mock Test #2 (Advanced)",
        "OGOR Mock Test #3 (Final Drill)",
        "Real-Time Timed Score Tracking",
      ],
    },
    {
      badge: "DRILLING TRACK",
      title: "Drilling",
      subtitle: "IADC WellSharp Drilling certification preparation",
      buttonText: "Start Drilling",
      isFeatured: false,
      path: "/exercises/iacd/drilling",
      features: [
        "Drilling Operations & Kick Detection",
        "Shut-in Procedures & Verification",
        "Circulating Methods & Calculations",
        "Equipment & Choke Manifolds",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-2.5 sm:p-5 lg:p-8 font-jakarta flex justify-center items-start">
      <div className="w-full max-w-[1140px] bg-white rounded-[36px] sm:rounded-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 p-4 sm:p-8 lg:p-10 space-y-10 sm:space-y-12 overflow-hidden">
        
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-100">
          <button
            onClick={() => navigate("/exercises")}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full pl-3 pr-4 py-2 text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exercises</span>
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
            All Tracks
          </button>
        </header>

        {/* Title Section */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            OFFICIAL IADC WELLSHARP
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            IADC Programs
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
            Choose the IADC discipline or mock test you want to practice. Includes full-length simulation tests.
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

export default IACD;
