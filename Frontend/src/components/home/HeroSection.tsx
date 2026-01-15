import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Map, 
  ArrowRight, 
  Shield, 
  Eye, 
  FileSearch,
  MessageSquare,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock
} from "lucide-react";

const metrics = [
  { label: "Total Projects", value: "2,847", icon: Building2, trend: "+12%" },
  { label: "Active Monitoring", value: "1,234", icon: Eye, trend: "Live" },
  { label: "Citizen Reports", value: "15,892", icon: Users, trend: "+23%" },
  { label: "Issues Resolved", value: "8,456", icon: CheckCircle2, trend: "94%" },
];

const quickActions = [
  { label: "View Projects", href: "/projects", icon: Building2 },
  { label: "Upload Evidence", href: "/report", icon: FileSearch },
  { label: "View Schedules", href: "/schedule", icon: Clock },
  { label: "Submit Suggestions", href: "/suggestions", icon: MessageSquare },
  { label: "Ask Chatbot", href: "/chatbot", icon: MessageSquare },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }} 
          />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-civic relative">
        <div className="py-16 md:py-24 lg:py-32">
          {/* Top Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-2.5 shadow-lg">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                Smart Governance & Infrastructure Transparency Platform
              </span>
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>

          {/* Main Headline */}
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h1 className="heading-display text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Transparency, Accountability &{" "}
              <span className="relative">
                <span className="relative z-10">Citizen Participation</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-white/20 -z-0 rounded" />
              </span>
            </h1>

            <p className="body-large text-white/85 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A government-grade platform enabling citizens, auditors, and public officials 
              to monitor infrastructure projects with real-time evidence and data-driven insights.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/projects">
                <Button variant="hero" size="xl" className="group shadow-xl">
                  <Building2 className="h-5 w-5" />
                  Explore Projects
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="hero-outline" size="xl" className="backdrop-blur-sm">
                  <Map className="h-5 w-5" />
                  View Map Overview
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="mx-auto max-w-4xl mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {quickActions.map((action) => (
                <Link 
                  key={action.label} 
                  to={action.href}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white/90 text-center">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Metrics Dashboard */}
          <div className="mx-auto max-w-5xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <div 
                  key={metric.label}
                  className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5 hover:bg-white/15 transition-all duration-300"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      <metric.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-green-300 bg-green-400/20 px-2 py-0.5 rounded-full">
                      {metric.trend}
                    </span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-white/70">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/60 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span className="text-sm">Real-time Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure & Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Data-Driven Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Evidence-Based</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
