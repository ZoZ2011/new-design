import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield, LogIn } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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
    const { data, error } = await supabase.from("valid_users").select("user_id");

    if (error) {
      console.error("Failed to fetch valid IDs:", error);
      setValidIds(["400315"]);
    } else {
      setValidIds(data?.map(u => u.user_id) || ["400315"]);
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
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

    const trimmedId = idNumber.trim();

    if (!validIds.includes(trimmedId)) {
      toast.error("Invalid ID Number", {
        description: "Please enter a valid ID number",
      });
      return;
    }

    // Check category access — if no rows at all for user, allow everything (open access)
    // If rows exist, user must have access to this specific category
    if (category) {
      const { data: accessData, error: accessError } = await supabase
        .from("user_category_access")
        .select("category_slug")
        .eq("user_id", trimmedId);

      if (!accessError && accessData && accessData.length > 0) {
        const allowedSlugs = accessData.map(r => r.category_slug);
        if (!allowedSlugs.includes(category)) {
          toast.error("Access Denied", {
            description: "You don't have permission to access this section.",
          });
          return;
        }
      }
    }

    localStorage.setItem("userId", trimmedId);
    navigate(`/questions/${category}`);
  };

  const getCategoryTitle = () => {
    if (!category) return "";

    if (category.includes("iadc-ogor-mock-test")) {
      const testNumber = category.split("-").pop();
      return `IADC OGOR Mock Test #${testNumber}`;
    }

    return category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleAdminClose = () => {
    setShowAdminPanel(false);
    setIdNumber("");
    fetchValidIds();
  };

  if (showAdminPanel) {
    return <AdminPanel onClose={handleAdminClose} />;
  }

  return (
    <div className="min-h-screen bg-background font-jakarta flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-border">›</span>
          <span className="text-sm font-semibold text-foreground truncate">
            {getCategoryTitle()}
          </span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          {/* Icon + Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {getCategoryTitle()}
            </h1>
            <p className="text-muted-foreground text-sm">Enter your ID number to access exercises</p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="space-y-2">
              <label htmlFor="idNumber" className="text-sm font-semibold text-foreground">
                ID Number
              </label>
              <Input
                id="idNumber"
                type="text"
                value={idNumber}
                onChange={e => setIdNumber(e.target.value)}
                placeholder="Enter your ID number"
                onKeyPress={e => e.key === "Enter" && handleSignIn()}
                disabled={loading}
                className="h-11 text-base"
              />
            </div>

            <Button
              onClick={handleSignIn}
              className="w-full h-11 font-semibold text-base gap-2 hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-primary/20"
              disabled={loading}
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
