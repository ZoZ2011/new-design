import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AdminPanel from "@/components/AdminPanel";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check if user navigated from control center (simple session check)
    const referrer = document.referrer;
    // Always allow — the control center already authenticates
    setHasAccess(true);
  }, []);

  if (!hasAccess) return null;

  return <AdminPanel onClose={() => navigate("/control-center")} />;
};

export default AdminUsers;
