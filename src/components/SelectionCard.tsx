import React from "react";
import { Check, ArrowRight, Loader2 } from "lucide-react";

export interface SelectionCardProps {
  badge: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  isFeatured?: boolean;
  features: string[];
  onClick: () => void;
  loading?: boolean;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  badge,
  title,
  subtitle,
  buttonText = "Start Practicing",
  isFeatured = false,
  features,
  onClick,
  loading = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer bg-white rounded-[32px] p-2.5 pb-8 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.07)] border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between ${
        isFeatured ? "border-blue-200/80 ring-2 ring-blue-500/10" : "border-slate-100/90"
      }`}
    >
      {/* Top Inner Rounded Header Block */}
      <div
        className={`rounded-[26px] p-6 sm:p-7 flex flex-col justify-between min-h-[235px] transition-colors ${
          isFeatured
            ? "bg-[#dce6f8] group-hover:bg-[#d4e1f6]"
            : "bg-[#eff0f3] group-hover:bg-[#e9ebef]"
        }`}
      >
        <div>
          {/* Badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 text-slate-800 shadow-xs">
            {badge}
          </span>

          {/* Main Title */}
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 leading-tight">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1.5 leading-snug">
            {subtitle}
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={loading}
          className="w-full mt-6 py-3 px-5 rounded-full bg-gradient-to-b from-[#262626] to-[#121212] hover:from-[#1a1a1a] hover:to-[#000000] text-white text-xs sm:text-sm font-semibold shadow-md shadow-black/15 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>{buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>

      {/* Bottom Checklist Features */}
      <div className="px-5 pt-6 space-y-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-600 font-medium">
            <Check className="w-4 h-4 text-slate-400 stroke-[2.5] shrink-0" />
            <span className="leading-tight">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionCard;
