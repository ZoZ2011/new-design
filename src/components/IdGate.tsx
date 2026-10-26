import { useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import SignIn from "@/pages/SignIn";

/**
 * Ensures user is authenticated with their ID before accessing the site.
 * Admin control center (/control-center) remains exempt.
 */
const IdGate = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [, force] = useState(0);

  const p = location.pathname;
  const isControlCenter = p.startsWith("/control-center");
  const isPublic = p.startsWith("/iphone-3d");
  const isAuthenticated = !!localStorage.getItem("userId");

  if (isControlCenter || isPublic || isAuthenticated) {
    return <>{children}</>;
  }

  // Not signed in: Show the new modern Sign In page
  return <SignIn onSuccess={() => force((n) => n + 1)} />;
};

export default IdGate;
