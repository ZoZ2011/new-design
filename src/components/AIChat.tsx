import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";


interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  onClose: () => void;
  category: string;
  userId: string;
  currentQuestion?: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    image?: string;
  } | null;
}

const AIChat = ({ onClose, category, userId, currentQuestion }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved chat history
    const savedChat = localStorage.getItem(`chat_${userId}_${category}`);
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
  }, [userId, category]);

  useEffect(() => {
    // Save chat history
    if (messages.length > 0) {
      localStorage.setItem(`chat_${userId}_${category}`, JSON.stringify(messages));
    }
  }, [messages, userId, category]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    let userMessageContent = input;
    
    // If there's a current question, prepend it to the user's message
    if (currentQuestion) {
      userMessageContent = `Context: I'm looking at this question:\n\n"${currentQuestion.question}"\n\nOptions:\n${currentQuestion.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\nMy question: ${input}`;
    }

    const userMessage: Message = { role: "user", content: userMessageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { 
          messages: [...messages, userMessage],
          category 
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <Card className="w-full sm:max-w-2xl h-[85vh] sm:h-[600px] flex flex-col rounded-t-2xl sm:rounded-2xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">AI Assistant</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-muted-foreground">
                Ask me anything about the questions!
              </p>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder="Ask a question..."
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
