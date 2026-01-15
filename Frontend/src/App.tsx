import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReportIssue from "./pages/ReportIssue";
import Documents from "./pages/Documents";
import AIAudit from "./pages/AIAudit";
import MapOverview from "./pages/MapOverview";
import Dashboard from "./pages/Dashboard";
import Privacy from "./pages/Privacy";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Schedule from "./pages/Schedule";
import Comparison from "./pages/Comparison";
import Suggestions from "./pages/Suggestions";
import Chatbot from "./pages/Chatbot";
import Contact from "./pages/Contact";
import Analytics from "./pages/Analytics";
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
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/audit" element={<AIAudit />} />
          <Route path="/map" element={<MapOverview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/contact/:id" element={<Contact />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
