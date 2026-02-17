import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import backgroundImage from "@/assets/oil-rig-background.jpg";

const IACDDrilling = () => {
  const navigate = useNavigate();
  const [dynamicCategories, setDynamicCategories] = useState<{ name: string; slug: string }[]>([]);

  useEffect(() => {
    const fetchDynamic = async () => {
      const { data } = await supabase
        .from("question_categories")
        .select("name, slug")
        .eq("parent_path", "/exercises/iacd/drilling")
        .order("display_order");
      if (data) setDynamicCategories(data);
    };
    fetchDynamic();
  }, []);

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
          onClick={() => navigate("/exercises/iacd")}
          className="mb-4 text-white hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">IADC Drilling</h1>
          {dynamicCategories.length === 0 ? (
            <>
              <p className="text-xl text-white/90">Coming Soon...</p>
              <p className="text-white/70">This section is currently under development.</p>
            </>
          ) : (
            <p className="text-lg text-white/80">Select your topic</p>
          )}
        </div>

        {dynamicCategories.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
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
          </div>
        )}

        {dynamicCategories.length === 0 && (
          <div className="text-center">
            <Button onClick={() => navigate("/")} size="lg" className="mt-8">
              Back to Home Page
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IACDDrilling;
