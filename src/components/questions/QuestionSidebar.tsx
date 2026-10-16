import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, X, Bookmark, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/questions";

interface QuestionSidebarProps {
  questions: Question[];
  currentIndex: number;
  submittedAnswers: { [key: number]: boolean };
  selectedAnswers: { [key: number]: number };
  correctCount: number;
  flaggedIds?: Set<number>;
  isOpen: boolean;
  onQuestionSelect: (index: number) => void;
  onSettingsClick: () => void;
  onClose: () => void;
  onResetProgress?: () => void;
}

export const QuestionSidebar = ({
  questions,
  currentIndex,
  submittedAnswers,
  selectedAnswers,
  correctCount,
  flaggedIds = new Set(),
  isOpen,
  onQuestionSelect,
  onSettingsClick,
  onClose,
  onResetProgress,
}: QuestionSidebarProps) => {
  const submittedCount = Object.keys(submittedAnswers).filter((k) => submittedAnswers[parseInt(k)]).length;
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  const handleQuestionSelect = (index: number) => {
    onQuestionSelect(index);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar Box */}
      <aside
        className={cn(
          "fixed right-0 top-0 h-full w-80 bg-white border-l border-slate-200/80 shadow-2xl z-50 transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-0 lg:h-fit lg:rounded-3xl lg:border lg:shadow-xs lg:sticky lg:top-8 flex flex-col font-jakarta",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 lg:hidden rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5 text-slate-500" />
        </Button>

        <div className="p-5 flex flex-col gap-5">
          {/* Calm Minimal Score Card */}
          <div className="bg-[#f8f9fb] rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Score</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-extrabold text-slate-900">{percentage}%</span>
                <span className="text-xs text-slate-500 font-medium">
                  ({correctCount}/{questions.length} correct)
                </span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-full bg-white border border-slate-200/70 flex items-center justify-center font-bold text-xs text-slate-700 shadow-2xs">
              {submittedCount}/{questions.length}
            </div>
          </div>

          {/* Quick Stats Filter Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span className="font-semibold text-slate-700">Question Palette</span>
            {flaggedIds.size > 0 && (
              <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                <Bookmark className="w-3 h-3" />
                {flaggedIds.size} flagged
              </span>
            )}
          </div>

          {/* Grid Question Palette for easy jumping */}
          <div className="grid grid-cols-5 gap-2 max-h-[340px] overflow-y-auto p-1 pr-2 [scrollbar-width:thin]">
            {questions.map((question, index) => {
              const isSubmitted = submittedAnswers[question.id];
              const isCorrect =
                isSubmitted &&
                (question.correctAnswers
                  ? question.correctAnswers.includes(selectedAnswers[question.id])
                  : selectedAnswers[question.id] === question.correctAnswer);
              const isCurrent = index === currentIndex;
              const isFlagged = flaggedIds.has(question.id);

              let btnStyle = "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100";

              if (isCurrent) {
                btnStyle = "bg-slate-900 text-white border-slate-900 font-bold shadow-xs scale-105";
              } else if (isSubmitted) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold";
                } else {
                  btnStyle = "bg-rose-50 text-rose-800 border-rose-300 font-semibold";
                }
              }

              return (
                <button
                  key={question.id}
                  onClick={() => handleQuestionSelect(index)}
                  className={cn(
                    "relative h-10 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer",
                    btnStyle
                  )}
                  title={`Question ${index + 1}`}
                >
                  <span>{index + 1}</span>
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={onSettingsClick}
              className="flex-1 py-2 px-3 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-600 flex items-center justify-center gap-2 border border-slate-200/70 transition-colors cursor-pointer"
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
            {onResetProgress && (
              <button
                onClick={onResetProgress}
                title="Reset answers"
                className="py-2 px-3 rounded-xl hover:bg-rose-50 text-xs font-semibold text-rose-600 border border-rose-200/70 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
