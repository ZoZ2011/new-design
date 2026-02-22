import { Question } from "@/data/questions";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selectedAnswer: number | undefined;
  selectedAnswers?: number[];
  isSubmitted: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onMultiAnswerToggle?: (answerIndex: number) => void;
  textAnswer?: string;
  onTextAnswerChange?: (value: string) => void;
}

export const QuestionCard = ({
  question,
  questionIndex,
  selectedAnswer,
  selectedAnswers = [],
  isSubmitted,
  onAnswerSelect,
  onMultiAnswerToggle,
  textAnswer = "",
  onTextAnswerChange,
}: QuestionCardProps) => {
  const isStructured = question.questionType === "combination" && question.options.length === 0;
  const isMultiple = question.questionType === "mcq_multiple";
  const requiredCount = question.correctAnswers?.length || 1;

  // Determine select count label
  const getSelectLabel = () => {
    if (isStructured) return null;
    if (isMultiple) return `(Select ${requiredCount} Answer${requiredCount > 1 ? "s" : ""})`;
    return "(Select 1 Answer)";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-foreground">
          <span className="font-bold">{questionIndex + 1}. </span>
          <span className="whitespace-pre-wrap">{question.question}</span>
        </div>

        {getSelectLabel() && (
          <Badge variant="outline" className="text-xs font-medium text-muted-foreground">
            {getSelectLabel()}
          </Badge>
        )}
        
        {question.image && (
          <div className="mt-4">
            <img 
              src={question.image} 
              alt={`Question ${question.id} diagram`}
              className="max-w-full h-auto rounded-lg border"
            />
          </div>
        )}
      </div>

      {/* Structured answer display */}
      {isStructured && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Answer:</label>
            <Textarea
              value={textAnswer}
              onChange={(e) => onTextAnswerChange?.(e.target.value)}
              placeholder="Type your answer here..."
              disabled={isSubmitted}
              className="min-h-[80px] resize-y"
            />
          </div>
          {isSubmitted && question.answerText && (() => {
            // Extract numeric/text answer from answerText (e.g. "Answer: 130.5 bbl" -> "130.5")
            const correctRaw = question.answerText.replace(/^answer:\s*/i, "").trim().toLowerCase();
            const userRaw = textAnswer.trim().toLowerCase();
            const isCorrect = userRaw.length > 0 && (
              userRaw === correctRaw || correctRaw.includes(userRaw) || userRaw.includes(correctRaw)
            );
            return isCorrect ? (
              <div className="p-4 rounded-xl bg-success/10 border border-success">
                <p className="text-sm font-semibold text-success">✓ Correct!</p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive">
                <p className="text-sm font-semibold text-destructive mb-1">✗ Incorrect</p>
                <p className="text-sm text-foreground whitespace-pre-wrap">Correct Answer: {question.answerText.replace(/^answer:\s*/i, "").trim()}</p>
              </div>
            );
          })()}
        </div>
      )}

      {/* MCQ options */}
      {!isStructured && question.options.length > 0 && (
        <div className="space-y-3">
          {question.options.map((option, optionIndex) => {
            const isCorrectAnswer = question.correctAnswers 
              ? question.correctAnswers.includes(optionIndex)
              : optionIndex === question.correctAnswer;
            
            const isSelectedAnswer = isMultiple
              ? selectedAnswers.includes(optionIndex)
              : selectedAnswer === optionIndex;
            
            let optionStyles = "bg-muted/50 hover:bg-muted border-transparent";
            
            if (isSubmitted) {
              if (isCorrectAnswer) {
                optionStyles = "bg-success/10 border-success text-success";
              } else if (isSelectedAnswer) {
                optionStyles = "bg-destructive/10 border-destructive text-destructive";
              }
            } else if (isSelectedAnswer) {
              optionStyles = "bg-primary/10 border-primary";
            }
            
            const letter = String.fromCharCode(65 + optionIndex);
            
            return (
              <button
                key={optionIndex}
                onClick={() => {
                  if (isSubmitted) return;
                  if (isMultiple && onMultiAnswerToggle) {
                    onMultiAnswerToggle(optionIndex);
                  } else {
                    onAnswerSelect(optionIndex);
                  }
                }}
                disabled={isSubmitted}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                  optionStyles,
                  !isSubmitted && "cursor-pointer",
                  isSubmitted && "cursor-default"
                )}
              >
                <span className="font-medium">{letter}) </span>
                {option}
              </button>
            );
          })}

          {isMultiple && !isSubmitted && (
            <p className="text-xs text-muted-foreground text-center">
              {selectedAnswers.length} of {requiredCount} selected
            </p>
          )}
        </div>
      )}

      {/* Result feedback */}
      {!isStructured && isSubmitted && (
        <div className={cn(
          "p-4 rounded-xl",
          (() => {
            if (isMultiple && question.correctAnswers) {
              const allCorrect = question.correctAnswers.every(i => selectedAnswers.includes(i)) 
                && selectedAnswers.length === question.correctAnswers.length;
              return allCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive";
            }
            return (question.correctAnswers 
              ? question.correctAnswers.includes(selectedAnswer!)
              : selectedAnswer === question.correctAnswer)
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive";
          })()
        )}>
          {(() => {
            if (isMultiple && question.correctAnswers) {
              const allCorrect = question.correctAnswers.every(i => selectedAnswers.includes(i)) 
                && selectedAnswers.length === question.correctAnswers.length;
              return allCorrect
                ? "✓ Correct!"
                : `✗ Incorrect. The correct answers are: ${question.correctAnswers.map(i => String.fromCharCode(65 + i) + ") " + question.options[i]).join(", ")}`;
            }
            const isCorrect = question.correctAnswers 
              ? question.correctAnswers.includes(selectedAnswer!)
              : selectedAnswer === question.correctAnswer;
            return isCorrect
              ? "✓ Correct!"
              : question.correctAnswers && question.correctAnswers.length > 1
                ? `✗ Incorrect. The correct answers are: ${question.correctAnswers.map(i => question.options[i]).join(", ")}`
                : `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`;
          })()}
        </div>
      )}
    </div>
  );
};
