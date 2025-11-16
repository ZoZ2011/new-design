import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, ClipboardList } from "lucide-react";
import backgroundImage from "@/assets/oil-rig-background.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-primary leading-tight">
            Training Program
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Select your training category to begin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Button
            onClick={() => navigate("/exercises")}
            size="lg"
            className="h-48 text-2xl font-semibold flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all"
          >
            <ClipboardList className="w-16 h-16" />
            <span>Exercises</span>
          </Button>

          <Button
            onClick={() => navigate("/manuals")}
            size="lg"
            variant="secondary"
            className="h-48 text-2xl font-semibold flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all"
          >
            <BookOpen className="w-16 h-16" />
            <span>Manuals</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
