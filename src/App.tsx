import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Support from "./pages/Support";
import Download from "./pages/Download";
import Docs from "./pages/Docs";
import Databases from "./pages/docs/Databases";
import Engines from "./pages/docs/Engines";
import AnalyzeGame from "./pages/docs/AnalyzeGame";
import ManageRepertoire from "./pages/docs/ManageRepertoire";
import ConfigureEngines from "./pages/docs/ConfigureEngines";
import DatabaseFormat from "./pages/docs/DatabaseFormat";
import Auth from "./pages/Auth";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/support" element={<Support />} />
              <Route path="/download" element={<Download />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/docs/databases" element={<Databases />} />
              <Route path="/docs/engines" element={<Engines />} />
              <Route path="/docs/analyze-game" element={<AnalyzeGame />} />
              <Route path="/docs/manage-repertoire" element={<ManageRepertoire />} />
              <Route path="/docs/configure-engines" element={<ConfigureEngines />} />
              <Route path="/docs/database-format" element={<DatabaseFormat />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/issues/:id" element={<IssueDetail />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
