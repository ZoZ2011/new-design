import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const IACDOGORMockTests = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/exercises/iacd/well-services")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">IADC OGOR</h1>
          <p className="text-lg text-muted-foreground">Select a mock test</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Button
            onClick={() => navigate("/signin/iadc-ogor-mock-test-1")}
            size="lg"
            className="h-32 text-xl font-semibold shadow-lg"
          >
            Mock Test #1
          </Button>

          <Button
            onClick={() => navigate("/signin/iadc-ogor-mock-test-2")}
            size="lg"
            className="h-32 text-xl font-semibold shadow-lg"
          >
            Mock Test #2
          </Button>

          <Button
            onClick={() => navigate("/signin/iadc-ogor-mock-test-3")}
            size="lg"
            className="h-32 text-xl font-semibold shadow-lg"
          >
            Mock Test #3
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IACDOGORMockTests;
