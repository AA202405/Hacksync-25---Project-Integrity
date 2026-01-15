import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Scale,
  FileText,
  Camera,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ExternalLink,
  Download,
} from "lucide-react";
import { api } from "@/lib/api";

interface Discrepancy {
  id: number;
  type: string;
  official: string;
  observed: string;
  severity: "low" | "medium" | "high" | "critical" | string;
  confidence: number;
}

interface EvidenceSource {
  type: "citizen" | "official" | string;
  count: number;
  date?: string;
}

interface AuditResult {
  projectId: string;
  projectName: string;
  location: string;
  contractor: string;
  officialBudget: string;
  expectedCompletion: string;
  status: "compliant" | "suspect" | "non-compliant" | string;
  riskScore: number;
  discrepancies: Discrepancy[];
  evidenceSources: EvidenceSource[];
}

const defaultAuditResult: AuditResult = {
  projectId: "PRJ-2024-0847",
  projectName: "NH-44 Highway Resurfacing - Phase 2",
  location: "Sector 12-14, North District",
  contractor: "ABC Infrastructure Pvt. Ltd.",
  officialBudget: "₹45.7 Crore",
  expectedCompletion: "March 2024",
  status: "suspect",
  riskScore: 67,
  discrepancies: [
    {
      id: 1,
      type: "Material Quality",
      official: "High-grade bitumen as per IRC specifications",
      observed: "Surface cracking suggests potential material quality concerns",
      severity: "high",
      confidence: 78,
    },
    {
      id: 2,
      type: "Completion Status",
      official: "100% work completed as per contractor report",
      observed: "Visible incomplete sections near junction points",
      severity: "medium",
      confidence: 85,
    },
    {
      id: 3,
      type: "Drainage Integration",
      official: "Integrated drainage system installed",
      observed: "Water pooling observed, drainage appears non-functional",
      severity: "high",
      confidence: 72,
    },
  ],
  evidenceSources: [
    { type: "citizen", count: 12, date: "Jan 2024" },
    { type: "official", count: 3, date: "Dec 2023" },
  ],
};

const statusConfig = {
  compliant: {
    label: "Compliant",
    icon: CheckCircle,
    color: "text-status-compliant",
    bg: "bg-status-compliant-bg",
  },
  suspect: {
    label: "Requires Review",
    icon: AlertCircle,
    color: "text-status-suspect",
    bg: "bg-status-suspect-bg",
  },
  "non-compliant": {
    label: "Non-Compliant",
    icon: AlertTriangle,
    color: "text-status-non-compliant",
    bg: "bg-status-non-compliant-bg",
  },
};

export default function AIAudit() {
  const [expandedDiscrepancy, setExpandedDiscrepancy] = useState<number | null>(1);
  const [auditResult, setAuditResult] = useState<AuditResult>(defaultAuditResult);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        setIsLoading(true);
        const response = await api.post("/api/audit/run", {
          project_id: "PRJ-2024-0847",
        });

        const data = response.data?.data;
        if (!data) return;

        const mapped: AuditResult = {
          projectId: data.project_id,
          projectName: data.project_name,
          location: data.location,
          contractor: data.contractor,
          officialBudget: data.official_budget,
          expectedCompletion: data.expected_completion,
          status: data.status,
          riskScore: data.risk_score,
          discrepancies: (data.discrepancies || []).map(
            (disc: any, idx: number): Discrepancy => ({
              id: idx + 1,
              type: disc.type,
              official: disc.official,
              observed: disc.observed,
              severity: disc.severity,
              confidence: disc.confidence,
            })
          ),
          evidenceSources:
            data.evidence_sources?.map((src: any) => ({
              type: src.type,
              count: src.count,
              date: src.date,
            })) ?? defaultAuditResult.evidenceSources,
        };

        setAuditResult(mapped);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch audit result", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAudit();
  }, []);

  const config = statusConfig[auditResult.status as keyof typeof statusConfig] ??
    statusConfig.suspect;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-civic-50 border-b border-border">
        <div className="container-civic py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {auditResult.projectId}
                </Badge>
                <Badge className={`${config.bg} ${config.color} border-0`}>
                  <config.icon className="h-3 w-3 mr-1" />
                  {config.label}
                </Badge>
              </div>
              <h1 className="heading-section text-foreground mb-2">
                {auditResult.projectName}
              </h1>
              <p className="body-regular text-muted-foreground">
                {auditResult.location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="civic">
                <FileText className="h-4 w-4 mr-2" />
                Generate RTI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-civic">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Main Audit Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Risk Score Card */}
              <div className="institutional-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-card text-foreground flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    AI Audit Assessment
                  </h2>
                  <Badge variant="outline" className="text-xs">
                    {isLoading ? "Running audit..." : "Last updated: just now"}
                  </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Risk Score</p>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-bold text-status-suspect">
                        {auditResult.riskScore}
                      </span>
                      <span className="text-lg text-muted-foreground mb-1">/ 100</span>
                    </div>
                    <Progress value={auditResult.riskScore} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Scores above 50 suggest areas requiring independent review
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Evidence Sources</p>
                    <div className="space-y-2">
                      {auditResult.evidenceSources.map((source) => (
                        <div key={source.type} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {source.type === "citizen" ? (
                              <Camera className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-sm capitalize">{source.type} Reports</span>
                          </div>
                          <span className="text-sm font-medium">{source.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discrepancies */}
              <div className="institutional-card">
                <h2 className="heading-card text-foreground mb-6 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Identified Discrepancies
                </h2>

                <div className="space-y-4">
                  {auditResult.discrepancies.map((disc) => (
                    <div
                      key={disc.id}
                      className={`border rounded-lg overflow-hidden ${
                        disc.severity === "high"
                          ? "border-status-non-compliant/30"
                          : "border-border"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setExpandedDiscrepancy(
                            expandedDiscrepancy === disc.id ? null : disc.id
                          )
                        }
                        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              disc.severity === "high"
                                ? "bg-status-non-compliant"
                                : "bg-status-suspect"
                            }`}
                          />
                          <span className="font-medium text-foreground">
                            {disc.type}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {disc.confidence}% confidence
                          </Badge>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            expandedDiscrepancy === disc.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedDiscrepancy === disc.id && (
                        <div className="px-4 pb-4 border-t border-border">
                          <div className="grid gap-4 md:grid-cols-2 pt-4">
                            <div className="p-4 bg-civic-50 rounded-lg">
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                <FileText className="h-4 w-4 text-primary" />
                                Official Record States
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {disc.official}
                              </p>
                            </div>
                            <div className="p-4 bg-status-suspect-bg/50 rounded-lg">
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                <Camera className="h-4 w-4 text-status-suspect" />
                                Evidence Suggests
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {disc.observed}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
                            <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground">
                              This discrepancy is identified through AI analysis and requires 
                              independent verification. The confidence score indicates the 
                              reliability of the pattern match, not the certainty of wrongdoing.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="institutional-card">
                <h2 className="heading-card text-foreground mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  AI Reasoning Summary
                </h2>
                <p className="body-regular text-muted-foreground mb-4">
                  The analysis indicates potential discrepancies between officially reported 
                  completion status and ground-level evidence. Citizen-submitted photographs 
                  from multiple sources show conditions that <em>may not align</em> with the 
                  documented project specifications.
                </p>
                <p className="body-regular text-muted-foreground">
                  Key areas flagged for review include material quality indicators, completion 
                  status verification, and infrastructure integration concerns. These findings 
                  are <strong>indicative</strong> and require independent verification before 
                  any conclusions can be drawn.
                </p>
              </div>
            </div>

            {/* Right Column - Project Details */}
            <div className="space-y-6">
              {/* Project Metadata */}
              <div className="institutional-card">
                <h3 className="font-semibold text-foreground mb-4">Project Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      Contractor
                    </dt>
                    <dd className="text-sm font-medium text-foreground mt-1">
                      {auditResult.contractor}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      Official Budget
                    </dt>
                    <dd className="text-sm font-medium text-foreground mt-1">
                      {auditResult.officialBudget}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      Expected Completion
                    </dt>
                    <dd className="text-sm font-medium text-foreground mt-1">
                      {auditResult.expectedCompletion}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Actions */}
              <div className="institutional-card">
                <h3 className="font-semibold text-foreground mb-4">Take Action</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Complaint Letter
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate RTI Request
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Evidence
                  </Button>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    This assessment is generated through automated analysis and should not 
                    be considered a definitive conclusion. All findings require independent 
                    verification. This platform does not make accusations or infer intent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
