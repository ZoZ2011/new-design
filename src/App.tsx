import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
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
import QuestionManager from "./pages/QuestionManager";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/iacd" element={<IACD />} />
          <Route path="/exercises/iacd/drilling" element={<IACDDrilling />} />
          <Route path="/exercises/iacd/well-services" element={<IACDWellServices />} />
          <Route path="/exercises/iacd/well-services/ogor" element={<IACDWellServicesOGOR />} />
          <Route path="/exercises/iacd/well-services/ogor/mock-tests" element={<IACDOGORMockTests />} />
          <Route path="/exercises/iwcf" element={<IWCF />} />
          <Route path="/exercises/iwcf/drilling" element={<IWCFDrilling />} />
          <Route path="/exercises/iwcf/well-intervention" element={<IWCFWellIntervention />} />
          <Route path="/manuals" element={<Manuals />} />
          <Route path="/signin/:category" element={<SignIn />} />
          <Route path="/questions/:category" element={<Questions />} />
          <Route path="/settings/:category" element={<Settings />} />
          <Route path="/question-manager" element={<QuestionManager />} />
          <Route path="/control-center" element={<AdminDashboard />} />
          <Route path="/control-center/users" element={<AdminUsers />} />
          <Route path="/control-center/questions" element={<QuestionManager />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
