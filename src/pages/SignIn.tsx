import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield, LogIn } from "lucide-react";
import { signinCheck } from "@/lib/backendApi";


const ADMIN_CODE = "ADMIN DASH";

const SignIn = () => {
  const [idNumber, setIdNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();

  const handleSignIn = async () => {
    // Check for admin code
    if (idNumber.trim().toUpperCase() === ADMIN_CODE) {
      navigate("/control-center");
      return;
    }

    const trimmedId = idNumber.trim();
    if (!trimmedId) {
      setErrorMsg("Please enter your ID");
      return;
    }

    setLoading(true);
    const res = await signinCheck({ userId: trimmedId, category });
    setLoading(false);

    if (!res.ok) {
      setErrorMsg(res.error || "Invalid ID Number");
      return;
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
                onChange={e => { setIdNumber(e.target.value); setErrorMsg(""); }}
                placeholder="Enter your ID number"
                onKeyPress={e => e.key === "Enter" && handleSignIn()}
                disabled={loading}
                className="h-11 text-base"
              />
              {errorMsg && <p className="text-destructive text-xs mt-1">{errorMsg}</p>}
            </div>

            <Button
              onClick={handleSignIn}
              className="w-full h-11 font-semibold text-base gap-2 hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-primary/20"
              disabled={loading}
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Checking..." : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
