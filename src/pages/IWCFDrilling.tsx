import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import backgroundImage from "@/assets/oil-rig-background.jpg";

const IWCFDrilling = () => {
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
          onClick={() => navigate("/exercises/iwcf")}
          className="mb-4 text-white hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">IWCF Drilling</h1>
          <p className="text-xl text-white/90">Coming Soon...</p>
          <p className="text-white/70">This section is currently under development.</p>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="mt-8"
          >
            Back to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IWCFDrilling;
