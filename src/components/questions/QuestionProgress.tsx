import { Progress } from "@/components/ui/progress";

interface QuestionProgressProps {
  current: number;
  total: number;
}

export const QuestionProgress = ({ current, total }: QuestionProgressProps) => {
  const percentage = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <Progress value={percentage} className="h-2" />
      <div className="text-right text-sm text-muted-foreground">
        {percentage}%
      </div>
    </div>
  );
};
