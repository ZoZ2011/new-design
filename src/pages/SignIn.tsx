import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import backgroundImage from "@/assets/oil-rig-background.jpg";
import AdminPanel from "@/components/AdminPanel";

const ADMIN_CODE = "USERS.400315";
const QUESTION_MANAGER_CODE = "CONTROL QUESTIONS";

const SignIn = () => {
  const [idNumber, setIdNumber] = useState("");
  const [validIds, setValidIds] = useState<string[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    fetchValidIds();
  }, []);

  const fetchValidIds = async () => {
    const { data, error } = await supabase
      .from("valid_users")
      .select("user_id");

    if (error) {
      console.error("Failed to fetch valid IDs:", error);
      // Fallback to default admin ID if fetch fails
      setValidIds(["400315"]);
    } else {
      setValidIds(data?.map(u => u.user_id) || ["400315"]);
    }
    setLoading(false);
  };

  const handleSignIn = () => {
    // Check for admin code
    if (idNumber.trim().toUpperCase() === ADMIN_CODE) {
      setShowAdminPanel(true);
      return;
    }

    // Check for question manager code
    if (idNumber.trim().toUpperCase() === QUESTION_MANAGER_CODE) {
      navigate("/question-manager");
      return;
    }

    if (validIds.includes(idNumber.trim())) {
      localStorage.setItem("userId", idNumber.trim());
      navigate(`/questions/${category}`);
    } else {
      toast.error("Invalid ID Number", {
        description: "Please enter a valid ID number"
      });
    }
  };

  const getCategoryTitle = () => {
    if (!category) return "";
    
    // Special handling for IADC OGOR mock tests
    if (category.includes("iadc-ogor-mock-test")) {
      const testNumber = category.split("-").pop();
      return `IADC OGOR Mock Test #${testNumber}`;
    }
    
    return category.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  const handleAdminClose = () => {
    setShowAdminPanel(false);
    setIdNumber("");
    fetchValidIds(); // Refresh the valid IDs list
  };

  if (showAdminPanel) {
    return <AdminPanel onClose={handleAdminClose} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <Card className="w-full max-w-md p-8 space-y-6 relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">{getCategoryTitle()}</h1>
          <p className="text-muted-foreground">Enter your ID number to continue</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="idNumber" className="text-sm font-medium">
              ID Number
            </label>
            <Input
              id="idNumber"
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter your ID number"
              onKeyPress={(e) => e.key === "Enter" && handleSignIn()}
              disabled={loading}
            />
          </div>

          <Button 
            onClick={handleSignIn}
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
