import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const IACDWellServices = () => {
  const navigate = useNavigate();
  const [dynamicCategories, setDynamicCategories] = useState<{ name: string; slug: string }[]>([]);

  useEffect(() => {
    const fetchDynamic = async () => {
      const { data } = await supabase
        .from("question_categories")
        .select("name, slug")
        .eq("parent_path", "/exercises/iacd/well-services")
        .order("display_order");
      if (data) setDynamicCategories(data);
    };
    fetchDynamic();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/exercises/iacd")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Well Services</h1>
          <p className="text-lg text-muted-foreground">Select your service type</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Button onClick={() => navigate("/signin/coiled-tubing")} size="lg" className="h-32 text-xl font-semibold shadow-lg">
            Coiled Tubing
          </Button>
          <Button onClick={() => navigate("/signin/workover")} size="lg" className="h-32 text-xl font-semibold shadow-lg">
            Workover
          </Button>
          <Button onClick={() => navigate("/signin/snubbing")} size="lg" className="h-32 text-xl font-semibold shadow-lg">
            Snubbing
          </Button>
          <Button onClick={() => navigate("/signin/wireline")} size="lg" className="h-32 text-xl font-semibold shadow-lg">
            Wireline
          </Button>

          {dynamicCategories.map((cat) => (
            <Button
              key={cat.slug}
              onClick={() => navigate(`/signin/${cat.slug}`)}
              size="lg"
              className="h-32 text-xl font-semibold shadow-lg"
            >
              {cat.name}
            </Button>
          ))}

          <Button
            onClick={() => navigate("/exercises/iacd/well-services/mock-test")}
            size="lg"
            className="h-32 text-xl font-semibold shadow-lg md:col-span-2"
          >
            Mock Tests
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IACDWellServices;
