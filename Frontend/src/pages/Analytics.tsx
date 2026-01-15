import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  MapPin,
  IndianRupee,
  BarChart3,
  PieChart
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const summaryMetrics = [
  { label: "Total Projects", value: "2,847", change: "+12%", trend: "up", icon: Building2 },
  { label: "On Schedule", value: "1,892", change: "+8%", trend: "up", icon: CheckCircle2 },
  { label: "Delayed", value: "423", change: "-5%", trend: "down", icon: AlertTriangle },
  { label: "Citizen Reports", value: "15,892", change: "+23%", trend: "up", icon: Users },
];

const projectsByStatus = [
  { name: "Completed", value: 1250, color: "#22c55e" },
  { name: "Ongoing", value: 1174, color: "#eab308" },
  { name: "Delayed", value: 423, color: "#ef4444" },
];

const projectsByType = [
  { type: "Roads", total: 856, completed: 520, delayed: 86 },
  { type: "Drainage", total: 423, completed: 280, delayed: 65 },
  { type: "Lighting", total: 312, completed: 245, delayed: 22 },
  { type: "Water", total: 289, completed: 165, delayed: 48 },
  { type: "Buildings", total: 245, completed: 120, delayed: 42 },
  { type: "Parks", total: 178, completed: 140, delayed: 15 },
];

const monthlyTrends = [
  { month: "Jan", reports: 1200, resolved: 980 },
  { month: "Feb", reports: 1350, resolved: 1100 },
  { month: "Mar", reports: 1180, resolved: 1050 },
  { month: "Apr", reports: 1420, resolved: 1200 },
  { month: "May", reports: 1580, resolved: 1350 },
  { month: "Jun", reports: 1650, resolved: 1420 },
  { month: "Jul", reports: 1720, resolved: 1500 },
  { month: "Aug", reports: 1890, resolved: 1620 },
];

const areaPerformance = [
  { area: "Ward 15 - North", projects: 45, onTime: 38, delayed: 7, trustIndex: 84 },
  { area: "Ward 8 - Central", projects: 62, onTime: 52, delayed: 10, trustIndex: 78 },
  { area: "Ward 22 - South", projects: 38, onTime: 35, delayed: 3, trustIndex: 92 },
  { area: "Ward 5 - East", projects: 51, onTime: 40, delayed: 11, trustIndex: 71 },
  { area: "Ward 12 - West", projects: 44, onTime: 36, delayed: 8, trustIndex: 76 },
];

export default function Analytics() {
  return (
    <Layout>
      <div className="section-gradient min-h-screen">
        <div className="container-civic py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="heading-section text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of infrastructure performance and citizen engagement
              </p>
            </div>
            <div className="flex gap-3">
              <Select defaultValue="2024">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="north">North District</SelectItem>
                  <SelectItem value="south">South District</SelectItem>
                  <SelectItem value="central">Central Zone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {summaryMetrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <metric.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge 
                      className={metric.trend === "up" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                      }
                    >
                      {metric.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Projects by Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Projects by Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={projectsByStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {projectsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {projectsByStatus.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Citizen Reports Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Citizen Engagement Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="reports" stroke="#3b82f6" name="Reports Submitted" />
                      <Line type="monotone" dataKey="resolved" stroke="#22c55e" name="Issues Resolved" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Projects by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Projects by Infrastructure Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectsByType} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="type" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#22c55e" name="Completed" stackId="a" />
                      <Bar dataKey="delayed" fill="#ef4444" name="Delayed" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Area Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Area Performance</CardTitle>
                <CardDescription>Trust index based on on-time project delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {areaPerformance.map((area) => (
                    <div key={area.area} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{area.area}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {area.onTime}/{area.projects} on-time
                          </span>
                          <Badge 
                            className={
                              area.trustIndex >= 85 ? "bg-green-100 text-green-700" :
                              area.trustIndex >= 75 ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-700"
                            }
                          >
                            {area.trustIndex}%
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            area.trustIndex >= 85 ? "bg-green-500" :
                            area.trustIndex >= 75 ? "bg-amber-500" :
                            "bg-red-500"
                          }`}
                          style={{ width: `${area.trustIndex}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Budget Utilization Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Allocated</p>
                  <p className="text-2xl font-bold">₹1,245 Cr</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Utilized</p>
                  <p className="text-2xl font-bold text-green-600">₹892 Cr</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                  <p className="text-2xl font-bold text-amber-600">₹245 Cr</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                  <p className="text-2xl font-bold text-blue-600">₹108 Cr</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
