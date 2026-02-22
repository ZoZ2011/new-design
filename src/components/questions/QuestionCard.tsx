import { Question } from "@/data/questions";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const isKillSheet = question.questionType === "kill_sheet";
  const isStructured = !isKillSheet && question.questionType === "combination" && question.options.length === 0;
  const isMultiple = question.questionType === "mcq_multiple";
  const requiredCount = question.correctAnswers?.length || 1;

  const [killSheetAnswers, setKillSheetAnswers] = useState<string[]>(
    isKillSheet ? new Array(question.options.length).fill("") : []
  );
  const [killSheetSubmitted, setKillSheetSubmitted] = useState(false);

  const allKillSheetFilled = isKillSheet && killSheetAnswers.every(a => a.trim().length > 0);

  const handleKillSheetSubmit = () => {
    if (allKillSheetFilled) {
      setKillSheetSubmitted(true);
    }
  };

  // Determine select count label
  const getSelectLabel = () => {
    if (isStructured || isKillSheet) return null;
    if (isMultiple) return `(Select ${requiredCount} Answer${requiredCount > 1 ? "s" : ""})`;
    return "(Select 1 Answer)";
  };

  // Parse kill sheet question text into structured sections
  const renderKillSheetContent = (text: string) => {
    // Split by double newlines to get sections
    const sections = text.split(/\n\n+/);
    const elements: React.ReactNode[] = [];

    const knownHeaders = ["well data", "capacities", "kick data"];

    for (const section of sections) {
      const lines = section.split("\n").filter(l => l.trim().length > 0);
      if (lines.length === 0) continue;

      const firstLine = lines[0].trim();
      const isHeader = knownHeaders.includes(firstLine.toLowerCase().replace(/:$/, ""));

      if (isHeader) {
        // Render header + its bullet items
        elements.push(
          <div key={`section-${elements.length}`} className="space-y-2">
            <h3 className="text-base font-bold text-foreground">{firstLine.replace(/:$/, "")}</h3>
            <ul className="space-y-2 pl-4">
              {lines.slice(1).map((line, i) => (
                <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/60 shrink-0" />
                  <span>{line.trim().replace(/^[•·\-]\s*/, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        // Regular paragraph (e.g. the final instruction)
        elements.push(
          <p key={`p-${elements.length}`} className="text-sm font-medium text-foreground/80 italic">
            {lines.join(" ")}
          </p>
        );
      }
    }
    return elements;
  };

  if (isKillSheet) {
    return (
      <div className="space-y-6">
        <div className="bg-card border rounded-xl p-6 space-y-6">
          {renderKillSheetContent(question.question)}
        </div>
        
        {question.image && (
          <div className="mt-4">
            <img src={question.image} alt="Question diagram" className="max-w-full h-auto rounded-lg border" />
          </div>
        )}

        <div className="space-y-4 mt-6">
          {question.options.map((subQ, idx) => {
            const correctAnswer = question.killSheetAnswers?.[idx] || "";
            const userAnswer = killSheetAnswers[idx] || "";
            const isCorrect = killSheetSubmitted && userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
            const isWrong = killSheetSubmitted && !isCorrect;

            return (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="text-sm font-medium text-foreground min-w-0 sm:min-w-[320px]">
                  {idx + 1}. {subQ}
                </label>
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    value={killSheetAnswers[idx]}
                    onChange={(e) => {
                      const updated = [...killSheetAnswers];
                      updated[idx] = e.target.value;
                      setKillSheetAnswers(updated);
                    }}
                    disabled={killSheetSubmitted}
                    placeholder="Enter your answer"
                    className={cn(
                      "h-10",
                      killSheetSubmitted && isCorrect && "border-success bg-success/10",
                      killSheetSubmitted && isWrong && "border-destructive bg-destructive/10"
                    )}
                  />
                </div>
                {killSheetSubmitted && isWrong && (
                  <span className="text-sm text-destructive font-medium whitespace-nowrap">
                    ✗ Correct: {correctAnswer}
                  </span>
                )}
                {killSheetSubmitted && isCorrect && (
                  <span className="text-sm text-success font-medium whitespace-nowrap">✓ Correct</span>
                )}
              </div>
            );
          })}
        </div>

        {!killSheetSubmitted && (
          <Button onClick={handleKillSheetSubmit} disabled={!allKillSheetFilled} className="mt-4">
            Submit All Answers
          </Button>
        )}

        {killSheetSubmitted && (
          <div className={cn(
            "p-4 rounded-xl mt-4",
            killSheetAnswers.every((a, i) => a.trim().toLowerCase() === (question.killSheetAnswers?.[i] || "").trim().toLowerCase())
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}>
            {killSheetAnswers.every((a, i) => a.trim().toLowerCase() === (question.killSheetAnswers?.[i] || "").trim().toLowerCase())
              ? "✓ All answers correct!"
              : `✗ Some answers are incorrect. Review above.`}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-foreground">
          {question.question.includes('\n\n') ? (
            question.question.split('\n\n').map((paragraph, i) => (
              <p key={i} className={cn("whitespace-pre-wrap", i > 0 && "mt-4")}>
                {i === 0 && <span className="font-bold">{questionIndex + 1}. </span>}
                {paragraph}
              </p>
            ))
          ) : (
            <>
              <span className="font-bold">{questionIndex + 1}. </span>
              <span className="whitespace-pre-wrap">{question.question}</span>
            </>
          )}
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
