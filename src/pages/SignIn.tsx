import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import backgroundImage from "@/assets/oil-rig-background.jpg";

const VALID_IDS = ["791997", "761238", "233844", "291568", "762852", "783405", "776654", "235121", "295406", "222609", "277708", "291269", "400315"];

const SignIn = () => {
  const [idNumber, setIdNumber] = useState("");
  const navigate = useNavigate();
  const { category } = useParams();

  const handleSignIn = () => {
    if (VALID_IDS.includes(idNumber.trim())) {
      localStorage.setItem("userId", idNumber.trim());
      navigate(`/questions/${category}`);
    } else {
      toast.error("Invalid ID Number", {
        description: "Please enter a valid ID number"
      });
    }
  };

  const getCategoryTitle = () => {
    return category?.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ") || "";
  };

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
            />
          </div>

          <Button 
            onClick={handleSignIn}
            className="w-full"
            size="lg"
          >
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
