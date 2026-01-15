import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Reports",
    value: "1,284",
    change: "+12%",
    trend: "up",
    icon: FileText,
  },
  {
    label: "Verified Compliant",
    value: "847",
    change: "+8%",
    trend: "up",
    icon: CheckCircle,
    color: "text-status-compliant",
  },
  {
    label: "Requires Review",
    value: "312",
    change: "-5%",
    trend: "down",
    icon: AlertCircle,
    color: "text-status-suspect",
  },
  {
    label: "Non-Compliant",
    value: "125",
    change: "+3%",
    trend: "up",
    icon: AlertTriangle,
    color: "text-status-non-compliant",
  },
];

const infrastructureBreakdown = [
  { type: "Roads & Highways", count: 456, percentage: 35 },
  { type: "Drainage Systems", count: 312, percentage: 24 },
  { type: "Public Buildings", count: 234, percentage: 18 },
  { type: "Bridges & Flyovers", count: 156, percentage: 12 },
  { type: "Water Supply", count: 89, percentage: 7 },
  { type: "Other", count: 37, percentage: 4 },
];

const recentReports = [
  {
    id: "RPT-2024-1284",
    project: "Municipal Road Repair",
    location: "Ward 12",
    status: "suspect",
    date: "2 hours ago",
  },
  {
    id: "RPT-2024-1283",
    project: "School Building Renovation",
    location: "Education District",
    status: "compliant",
    date: "5 hours ago",
  },
  {
    id: "RPT-2024-1282",
    project: "Drainage System Upgrade",
    location: "Old City",
    status: "non-compliant",
    date: "8 hours ago",
  },
  {
    id: "RPT-2024-1281",
    project: "Bridge Maintenance",
    location: "River Crossing",
    status: "compliant",
    date: "1 day ago",
  },
];

const statusConfig = {
  compliant: {
    label: "Compliant",
    class: "status-compliant",
  },
  suspect: {
    label: "Requires Review",
    class: "status-suspect",
  },
  "non-compliant": {
    label: "Non-Compliant",
    class: "status-non-compliant",
  },
};

export default function Dashboard() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-civic-50 border-b border-border">
        <div className="container-civic py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="heading-section text-foreground mb-2">
                Integrity Dashboard
              </h1>
              <p className="body-regular text-muted-foreground">
                Aggregated infrastructure integrity insights across the region
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="30d">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-civic">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="institutional-card">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-civic-100`}>
                    <stat.icon className={`h-5 w-5 ${stat.color || 'text-primary'}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-status-compliant' : 'text-status-non-compliant'
                  }`}>
                    {stat.change}
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Infrastructure Breakdown */}
            <div className="lg:col-span-2">
              <div className="institutional-card h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-card text-foreground flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Infrastructure Breakdown
                  </h2>
                </div>

                <div className="space-y-4">
                  {infrastructureBreakdown.map((item) => (
                    <div key={item.type}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {item.type}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {item.count} projects ({item.percentage}%)
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Index */}
            <div className="institutional-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-card text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trust Index
                </h2>
                <Badge variant="outline" className="text-xs">Regional</Badge>
              </div>

              <div className="text-center py-8">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${66 * 3.52} ${100 * 3.52}`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">66</span>
                    <span className="text-xs text-muted-foreground">of 100</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Based on verification rate and discrepancy resolution
                </p>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last month</span>
                  <span className="font-medium text-status-compliant flex items-center gap-1">
                    +2.3% <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="mt-8">
            <div className="institutional-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-card text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Reports
                </h2>
                <a href="/map" className="text-sm text-primary hover:underline">
                  View all →
                </a>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Report ID
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Project
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Location
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentReports.map((report) => {
                      const config = statusConfig[report.status as keyof typeof statusConfig];
                      return (
                        <tr key={report.id} className="hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-mono text-sm text-foreground">
                              {report.id}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium text-foreground">
                              {report.project}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-muted-foreground">
                              {report.location}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={`${config.class} border text-xs`}>
                              {config.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-muted-foreground">
                              {report.date}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
