import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Exercises from "./pages/Exercises";
import IACD from "./pages/IACD";
import IACDDrilling from "./pages/IACDDrilling";
import IACDWellServices from "./pages/IACDWellServices";
import IACDOGORMockTests from "./pages/IACDOGORMockTests";
import IWCF from "./pages/IWCF";
import IWCFDrilling from "./pages/IWCFDrilling";
import IWCFWellIntervention from "./pages/IWCFWellIntervention";
import Manuals from "./pages/Manuals";
import SignIn from "./pages/SignIn";
import Questions from "./pages/Questions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/iacd" element={<IACD />} />
          <Route path="/exercises/iacd/drilling" element={<IACDDrilling />} />
          <Route path="/exercises/iacd/well-services" element={<IACDWellServices />} />
          <Route path="/exercises/iacd/well-services/mock-test" element={<IACDOGORMockTests />} />
          <Route path="/exercises/iwcf" element={<IWCF />} />
          <Route path="/exercises/iwcf/drilling" element={<IWCFDrilling />} />
          <Route path="/exercises/iwcf/well-intervention" element={<IWCFWellIntervention />} />
          <Route path="/manuals" element={<Manuals />} />
          <Route path="/signin/:category" element={<SignIn />} />
          <Route path="/questions/:category" element={<Questions />} />
          <Route path="/settings/:category" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
