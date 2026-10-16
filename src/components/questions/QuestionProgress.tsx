import { Progress } from "@/components/ui/progress";

interface QuestionProgressProps {
  current: number;
  total: number;
  answeredCount?: number;
  flaggedCount?: number;
}

export const QuestionProgress = ({
  current,
  total,
  answeredCount = 0,
  flaggedCount = 0,
}: QuestionProgressProps) => {
  const percentage = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
  const answeredPercentage = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  return (
    <div className="space-y-3 pb-2 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Question {current + 1} of {total}
          </span>
          <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">•</span>
          <span className="hidden sm:inline-block">
            {answeredCount} answered ({answeredPercentage}%)
          </span>
          {flaggedCount > 0 && (
            <>
              <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">•</span>
              <span className="text-amber-600 font-semibold">{flaggedCount} flagged</span>
            </>
          )}
        </div>
        <span className="font-bold text-slate-700 dark:text-slate-300">{percentage}% Viewed</span>
      </div>
      <Progress value={percentage} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
    </div>
  );
};
