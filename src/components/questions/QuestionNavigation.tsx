import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-6">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {!isSubmitted && !autoSubmit && (
        <Button
          onClick={onSubmit}
          disabled={!hasSelectedAnswer}
          className="px-8"
        >
          Submit
        </Button>
      )}

      {!isSubmitted && autoSubmit && (
        <div className="px-4 py-2 text-sm text-muted-foreground">
          Auto-submit enabled
        </div>
      )}

      {isSubmitted && currentIndex < totalQuestions - 1 && (
        <Button
          onClick={onNext}
          className="gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <Button
        variant="outline"
        onClick={onAskAI}
        className="gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        Ask AI
      </Button>
    </div>
  );
};
