import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IWCFDrilling = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to sign-in page with the iwcf-drilling category
    navigate("/signin/iwcf-drilling");
  }, [navigate]);

  return null;
};

export default IWCFDrilling;
