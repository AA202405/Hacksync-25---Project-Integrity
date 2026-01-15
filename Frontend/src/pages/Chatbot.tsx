import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { 
  Bot, 
  Send, 
  User, 
  Sparkles,
  Building2,
  MapPin,
  Clock,
  FileText,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  AlertTriangle,
  Calendar,
  Users
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  references?: { type: string; name: string; link: string; icon: string }[];
  actions?: { label: string; link: string }[];
}

const suggestedQueries = [
  { icon: Clock, text: "Projects delayed in my area", category: "delays" },
  { icon: Users, text: "Who is responsible for road repairs?", category: "officials" },
  { icon: TrendingUp, text: "Compare planned vs actual work", category: "comparison" },
  { icon: Building2, text: "Show ongoing projects in Ward 15", category: "projects" },
  { icon: FileText, text: "Find budget allocation for drainage", category: "budget" },
  { icon: HelpCircle, text: "How do I report an issue?", category: "help" },
  { icon: Calendar, text: "Upcoming project milestones", category: "schedule" },
  { icon: AlertTriangle, text: "Projects with quality concerns", category: "quality" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your **Governance Assistant**. I can help you with:\n\n• 📋 **Project information** - status, timelines, budgets\n• 👤 **Responsible officials** - who to contact\n• 📊 **Performance analytics** - delays, comparisons\n• 📝 **Filing reports** - issues and suggestions\n\nHow can I assist you today?",
    timestamp: new Date(),
  },
];

const knowledgeBase = {
  delays: {
    content: `Based on current data, I found **5 delayed projects** in the monitored area:\n\n**Critical Delays (>30 days):**\n1. 🔴 **Smart Drainage System Installation** - Ward 8\n   • Original: Dec 2024 | Delay: 45 days\n   • Reason: Pending environmental clearance\n\n2. 🔴 **Government Hospital Renovation** - Civil Lines\n   • Original: Nov 2024 | Delay: 38 days\n   • Reason: Contractor disputes\n\n**Moderate Delays (15-30 days):**\n3. 🟠 **Road Resurfacing Project** - Ward 15\n   • Original: Oct 2024 | Delay: 18 days\n   • Reason: Material shortage\n\n**Minor Delays (<15 days):**\n4. 🟡 **Street Light Installation** - Ward 22\n   • Original: Sept 2024 | Delay: 8 days\n5. 🟡 **Footpath Construction** - Market Area\n   • Delay: 5 days`,
    references: [
      { type: "Project", name: "Smart Drainage System", link: "/project/2", icon: "project" },
      { type: "Schedule", name: "Project Timeline View", link: "/schedule", icon: "calendar" },
      { type: "Analytics", name: "Delay Analysis", link: "/analytics", icon: "chart" },
    ],
    actions: [
      { label: "View All Delayed Projects", link: "/projects?status=delayed" },
      { label: "Report a Delay", link: "/report" },
    ],
  },
  officials: {
    content: `Here are the responsible authorities for infrastructure maintenance:\n\n**National Highways (NH-44, etc.):**\n• Agency: NHAI\n• Officer: Shri Amit Verma (Project Director)\n• Contact: nhai-north@gov.in\n\n**State Roads:**\n• Agency: Public Works Department (PWD)\n• Officer: Shri Rajesh Kumar (Chief Engineer)\n• Phone: +91 98765 43210\n• Office: PWD North Division\n\n**Municipal Roads & Drainage:**\n• Agency: Municipal Corporation\n• Officer: Smt. Priya Sharma (Commissioner)\n• Ward Offices handle local issues\n\n**Electricity & Street Lights:**\n• Agency: BSES/Tata Power\n• Helpline: 1912\n\nWould you like me to help you contact a specific official?`,
    references: [
      { type: "Directory", name: "Official Contact List", link: "/documents", icon: "users" },
      { type: "Document", name: "Jurisdiction Guidelines", link: "/documents", icon: "file" },
    ],
    actions: [
      { label: "Contact PWD Office", link: "/contact/pwd" },
      { label: "View All Officials", link: "/documents?type=contacts" },
    ],
  },
  comparison: {
    content: `Here's the **Planned vs Actual Performance Analysis**:\n\n📊 **Overall Status:**\n\`\`\`\nOn Schedule     ████████████████████ 67%\nDelayed         ███████              23%  \nAhead           ███                  10%\n\`\`\`\n\n**By Project Category:**\n| Category    | Planned | Actual | Variance |\n|-------------|---------|--------|----------|\n| Roads       | 45 days | 57 days| +12 days |\n| Drainage    | 60 days | 88 days| +28 days |\n| Lighting    | 30 days | 35 days| +5 days  |\n| Buildings   | 90 days | 125 days| +35 days|\n\n**Top Performing Projects:**\n✅ NH-44 Road Widening (5 days ahead)\n✅ Smart Street Lighting (on schedule)\n\n**Needs Attention:**\n⚠️ Hospital Renovation (35 days behind)\n⚠️ Drainage System (28 days behind)`,
    references: [
      { type: "Analysis", name: "Comparison Library", link: "/comparison", icon: "chart" },
      { type: "Report", name: "Performance Report", link: "/documents?type=reports", icon: "file" },
    ],
    actions: [
      { label: "Open Comparison Tool", link: "/comparison" },
      { label: "Download Report", link: "/documents" },
    ],
  },
  projects: {
    content: `**Ongoing Projects in Ward 15 - North District:**\n\n1. **NH-44 Highway Expansion - Phase 2**\n   • Progress: ████████████████████ 65%\n   • Budget: ₹45.2 Crore\n   • Deadline: March 2025\n   • Status: 🟢 On Track\n\n2. **Pedestrian Pathway Construction**\n   • Progress: ████████████░░░░░░░░ 42%\n   • Budget: ₹8.5 Crore\n   • Deadline: February 2025\n   • Status: 🟡 Minor Delay\n\n3. **Storm Water Drain Network**\n   • Progress: ████████████████████ 78%\n   • Budget: ₹12.3 Crore\n   • Deadline: January 2025\n   • Status: 🟢 On Track\n\n4. **Community Health Center**\n   • Progress: ████████░░░░░░░░░░░░ 35%\n   • Budget: ₹22.1 Crore\n   • Deadline: June 2025\n   • Status: 🟢 On Track`,
    references: [
      { type: "Map", name: "Interactive Map", link: "/map", icon: "map" },
      { type: "Projects", name: "Projects Explorer", link: "/projects", icon: "folder" },
    ],
    actions: [
      { label: "View on Map", link: "/map" },
      { label: "Explore All Projects", link: "/projects" },
    ],
  },
  budget: {
    content: `**Budget Allocation for Drainage Projects (FY 2024-25):**\n\n💰 **Total Allocated:** ₹156.8 Crore\n\n**Breakdown by Project:**\n\n| Project | Allocated | Spent | Utilization |\n|---------|-----------|-------|-------------|\n| Smart Drainage System | ₹45.2 Cr | ₹28.4 Cr | 63% |\n| Stormwater Network | ₹38.7 Cr | ₹31.2 Cr | 81% |\n| Sewage Treatment | ₹52.1 Cr | ₹18.9 Cr | 36% |\n| Maintenance | ₹20.8 Cr | ₹14.7 Cr | 71% |\n\n**Key Observations:**\n• Sewage Treatment project has lowest utilization\n• Stormwater Network on track for completion\n• ₹63.6 Cr remaining for current FY\n\n**Funding Sources:**\n• Central Grant: 40%\n• State Budget: 35%\n• Municipal Bonds: 25%`,
    references: [
      { type: "Document", name: "Budget Documents", link: "/documents?type=budget", icon: "file" },
      { type: "Analytics", name: "Financial Dashboard", link: "/analytics", icon: "chart" },
    ],
    actions: [
      { label: "View Budget Documents", link: "/documents" },
      { label: "Financial Analytics", link: "/analytics" },
    ],
  },
  help: {
    content: `**How to Report an Infrastructure Issue:**\n\n**Step 1: Quick Report**\n📸 Upload visual evidence directly from the homepage\n\n**Step 2: Detailed Report**\nVisit the Report Issue page for comprehensive submission:\n• Select issue category (roads, drainage, lighting, etc.)\n• Mark location on map\n• Add description and photos\n• Set priority level\n\n**Step 3: Track Progress**\n• Receive confirmation within 24 hours\n• Track status in your dashboard\n• Get updates via email\n\n**What You Can Report:**\n✅ Road damage (potholes, cracks)\n✅ Drainage blockages/flooding\n✅ Non-working street lights\n✅ Incomplete construction\n✅ Quality concerns\n✅ Safety hazards\n\n**Anonymous Reporting:**\nAll reports can be submitted anonymously if preferred.`,
    references: [
      { type: "Guide", name: "Reporting Guidelines", link: "/documents?type=guides", icon: "file" },
    ],
    actions: [
      { label: "Report an Issue", link: "/report" },
      { label: "Submit Suggestion", link: "/suggestions" },
    ],
  },
  schedule: {
    content: `**Upcoming Project Milestones (Next 30 Days):**\n\n📅 **This Week:**\n• Jan 18: NH-44 Phase 2 - Section B completion\n• Jan 20: Street Lighting Ward 22 - Final inspection\n\n📅 **Next Week:**\n• Jan 23: Stormwater Drain - Testing phase begins\n• Jan 25: Footpath Construction - Materials delivery\n• Jan 27: Hospital Renovation - Contractor review meeting\n\n📅 **End of Month:**\n• Jan 30: Drainage System - Environmental clearance deadline\n• Jan 31: Bridge Construction - Load testing\n\n**Critical Dates to Watch:**\n🔴 Jan 30 - Drainage clearance (risk of further delay)\n🟡 Jan 27 - Hospital contractor meeting (dispute resolution)\n\nWould you like to set reminders for any of these milestones?`,
    references: [
      { type: "Calendar", name: "Project Schedule", link: "/schedule", icon: "calendar" },
    ],
    actions: [
      { label: "View Full Schedule", link: "/schedule" },
      { label: "Set Reminders", link: "/schedule" },
    ],
  },
  quality: {
    content: `**Projects with Quality Concerns:**\n\n🔴 **High Priority:**\n\n1. **Government Hospital Renovation**\n   • Issue: Material quality complaints (28 reports)\n   • Status: Under investigation\n   • Action: Independent audit scheduled\n\n2. **Road Resurfacing - Ward 15**\n   • Issue: Surface cracks within 3 months (12 reports)\n   • Status: Contractor notice issued\n   • Action: Re-work ordered\n\n🟠 **Under Review:**\n\n3. **Municipal Drainage System**\n   • Issue: Suspected deviation from specifications\n   • Status: AI Audit flagged for review\n   • Action: Technical committee inspection\n\n🟢 **Recently Resolved:**\n\n4. **Street Lighting Installation**\n   • Issue: Non-ISI fixtures reported\n   • Status: Replaced with compliant materials\n   • Action: Closed after verification`,
    references: [
      { type: "Audit", name: "AI Audit Reports", link: "/audit", icon: "shield" },
      { type: "Reports", name: "Citizen Reports", link: "/documents?type=reports", icon: "file" },
    ],
    actions: [
      { label: "View AI Audit", link: "/audit" },
      { label: "Report Quality Issue", link: "/report" },
    ],
  },
  default: {
    content: `I understand you're asking about that topic. Let me help you find the right information.\n\n**I can assist with:**\n• 📋 Project status, timelines, and progress\n• 👤 Responsible officials and contact info\n• 📊 Performance comparisons and analytics\n• 💰 Budget allocations and utilization\n• 📝 Filing reports and suggestions\n• 🗓️ Project schedules and milestones\n\nCould you please be more specific about what you'd like to know? For example:\n• "Show delayed projects in my area"\n• "Who handles road repairs?"\n• "What's the budget for drainage projects?"`,
    references: [],
    actions: [
      { label: "Browse Projects", link: "/projects" },
      { label: "View Dashboard", link: "/dashboard" },
    ],
  },
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getResponseCategory = (query: string): keyof typeof knowledgeBase => {
    const q = query.toLowerCase();
    if (q.includes("delayed") || q.includes("delay") || q.includes("late")) return "delays";
    if (q.includes("responsible") || q.includes("who") || q.includes("contact") || q.includes("official")) return "officials";
    if (q.includes("compare") || q.includes("planned") || q.includes("actual") || q.includes("vs")) return "comparison";
    if (q.includes("ongoing") || q.includes("ward") || q.includes("project") || q.includes("show")) return "projects";
    if (q.includes("budget") || q.includes("allocation") || q.includes("cost") || q.includes("money")) return "budget";
    if (q.includes("report") || q.includes("issue") || q.includes("how do i") || q.includes("help")) return "help";
    if (q.includes("schedule") || q.includes("milestone") || q.includes("upcoming") || q.includes("deadline")) return "schedule";
    if (q.includes("quality") || q.includes("concern") || q.includes("problem") || q.includes("audit")) return "quality";
    return "default";
  };

  const simulateResponse = async (query: string): Promise<Message> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const category = getResponseCategory(query);
    const knowledge = knowledgeBase[category];

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: knowledge.content,
      timestamp: new Date(),
      references: knowledge.references,
      actions: knowledge.actions,
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const response = await simulateResponse(input);
    setIsTyping(false);
    setMessages(prev => [...prev, response]);
  };

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
  };

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content.replace(/\*\*/g, "").replace(/`/g, ""));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
  };

  const renderMarkdown = (content: string) => {
    return content.split("\n").map((line, i) => {
      // Bold text
      let processed = line.split(/(\*\*.*?\*\*)/).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      // Code blocks
      if (line.startsWith("```")) return null;
      if (line.includes("|") && line.includes("-")) {
        return <div key={i} className="text-xs font-mono opacity-70">{line}</div>;
      }

      return (
        <div key={i} className={line.startsWith("•") || line.startsWith("-") ? "ml-2" : ""}>
          {processed}
        </div>
      );
    });
  };

  return (
    <Layout>
      <div className="section-gradient min-h-screen">
        <div className="container-civic py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary text-sm">AI-Powered Assistant</span>
              </div>
              <h1 className="heading-section text-foreground mb-2">Governance Chatbot</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Get instant answers about projects, officials, schedules, budgets, and more
              </p>
            </div>

            {/* Chat Interface */}
            <Card className="h-[650px] flex flex-col shadow-lg">
              <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Governance Assistant</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          Online • Powered by Local AI
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearChat}
                    className="text-muted-foreground"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                    >
                      {message.role === "assistant" && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <div className={`max-w-[85%] space-y-3 ${message.role === "user" ? "items-end" : ""}`}>
                        <div
                          className={`rounded-2xl p-4 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-sm"
                              : "bg-muted rounded-tl-sm"
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {renderMarkdown(message.content)}
                          </div>
                        </div>
                        
                        {/* Message Actions */}
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 px-1">
                            <button
                              onClick={() => handleCopy(message.content, message.id)}
                              className="text-muted-foreground hover:text-foreground p-1 rounded"
                            >
                              {copiedId === message.id ? (
                                <Check className="h-3.5 w-3.5 text-green-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <button className="text-muted-foreground hover:text-foreground p-1 rounded">
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </button>
                            <button className="text-muted-foreground hover:text-foreground p-1 rounded">
                              <ThumbsDown className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                        
                        {/* References */}
                        {message.references && message.references.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground font-medium">📎 References:</p>
                            <div className="flex flex-wrap gap-2">
                              {message.references.map((ref, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-accent transition-colors"
                                  onClick={() => navigate(ref.link)}
                                >
                                  <FileText className="h-3 w-3 mr-1" />
                                  {ref.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quick Actions */}
                        {message.actions && message.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {message.actions.map((action, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => navigate(action.link)}
                              >
                                {action.label}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
                        <div className="flex gap-1.5">
                          <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                          <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                          <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Suggested Queries */}
              <div className="px-4 py-3 border-t bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Quick queries:</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {suggestedQueries.map((query, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="shrink-0 text-xs h-8 bg-background"
                      onClick={() => handleSuggestedQuery(query.text)}
                    >
                      <query.icon className="h-3 w-3 mr-1.5" />
                      {query.text}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <CardContent className="border-t p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-3"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, officials, schedules, budgets..."
                    className="flex-1 h-11"
                    disabled={isTyping}
                  />
                  <Button type="submit" disabled={!input.trim() || isTyping} className="h-11 px-5">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This assistant uses local data. For real-time updates, connect to live sources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}