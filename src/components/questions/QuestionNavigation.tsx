import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface QuestionNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  isSubmitted: boolean;
  hasSelectedAnswer: boolean;
  autoSubmit: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onAskAI: () => void;
}

export const QuestionNavigation = ({
  currentIndex,
  totalQuestions,
  isSubmitted,
  hasSelectedAnswer,
  autoSubmit,
  onPrevious,
  onNext,
  onSubmit,
  onAskAI,
}: QuestionNavigationProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
      {/* Previous Button */}
      <Button
        variant="ghost"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="rounded-full px-4 h-10 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 gap-1.5 transition-colors cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {/* Middle Action: Submit or Next */}
      <div className="flex items-center gap-2">
        {!isSubmitted && !autoSubmit && (
          <Button
            onClick={onSubmit}
            disabled={!hasSelectedAnswer}
            className="rounded-full px-7 h-10 bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-40 cursor-pointer"
          >
            Submit Answer
          </Button>
        )}

        {isSubmitted && currentIndex < totalQuestions - 1 && (
          <Button
            onClick={onNext}
            className="rounded-full px-7 h-10 bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-all gap-1.5 cursor-pointer"
          >
            <span>Next Question</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {isSubmitted && currentIndex === totalQuestions - 1 && (
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
            All Questions Completed
          </div>
        )}
      </div>

      {/* AI Assistant Button */}
      <Button
        variant="outline"
        onClick={onAskAI}
        className="rounded-full px-4 h-10 text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 gap-2 cursor-pointer shadow-2xs"
      >
        <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
        <span>Ask AI Tutor</span>
      </Button>
    </div>
  );
};
