import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import backgroundImage from "@/assets/oil-rig-background.jpg";

const IWCF = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="max-w-4xl mx-auto pt-8 space-y-8 relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/exercises")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">IWCF</h1>
          <p className="text-lg text-muted-foreground">Select your discipline</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Button
            onClick={() => navigate("/exercises/iwcf/drilling")}
            size="lg"
            className="h-32 text-xl font-semibold shadow-lg"
          >
            Drilling
          </Button>

          <Button
            onClick={() => navigate("/exercises/iwcf/well-intervention")}
            size="lg"
            className="h-32 text-xl font-semibold shadow-lg"
          >
            Well Intervention
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IWCF;
