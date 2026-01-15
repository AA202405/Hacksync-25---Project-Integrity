import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  IndianRupee,
  ArrowRight,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const mockProjects = [
  {
    id: "1",
    name: "NH-44 Highway Expansion - Phase 2",
    location: "Ward 15, North District",
    type: "Roads",
    status: "ongoing",
    budget: "₹45.2 Cr",
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    progress: 65,
    contractor: "ABC Infrastructure Ltd",
  },
  {
    id: "2",
    name: "Smart Drainage System Installation",
    location: "Ward 8, Central Zone",
    type: "Drainage",
    status: "delayed",
    budget: "₹12.8 Cr",
    startDate: "2023-08-01",
    endDate: "2024-12-31",
    progress: 42,
    contractor: "Urban Solutions Pvt Ltd",
  },
  {
    id: "3",
    name: "LED Street Lighting Project",
    location: "Ward 22, South District",
    type: "Lighting",
    status: "completed",
    budget: "₹8.5 Cr",
    startDate: "2023-03-01",
    endDate: "2024-09-15",
    progress: 100,
    contractor: "Green Energy Corp",
  },
  {
    id: "4",
    name: "Community Health Center Construction",
    location: "Ward 5, East Zone",
    type: "Buildings",
    status: "planned",
    budget: "₹22.0 Cr",
    startDate: "2025-02-01",
    endDate: "2026-08-30",
    progress: 0,
    contractor: "Metro Builders",
  },
  {
    id: "5",
    name: "Water Pipeline Network Upgrade",
    location: "Ward 12, West District",
    type: "Water Supply",
    status: "ongoing",
    budget: "₹35.6 Cr",
    startDate: "2024-04-01",
    endDate: "2025-10-31",
    progress: 38,
    contractor: "Aqua Systems Inc",
  },
  {
    id: "6",
    name: "Public Park Renovation",
    location: "Ward 3, Central Zone",
    type: "Parks",
    status: "completed",
    budget: "₹4.2 Cr",
    startDate: "2024-01-10",
    endDate: "2024-08-20",
    progress: 100,
    contractor: "Green Spaces Ltd",
  },
];

const statusConfig = {
  planned: { label: "Planned", icon: Clock, className: "bg-blue-100 text-blue-700 border-blue-200" },
  ongoing: { label: "Ongoing", icon: Building2, className: "bg-amber-100 text-amber-700 border-amber-200" },
  delayed: { label: "Delayed", icon: AlertTriangle, className: "bg-red-100 text-red-700 border-red-200" },
  completed: { label: "Completed", icon: CheckCircle2, className: "bg-green-100 text-green-700 border-green-200" },
};

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesType = typeFilter === "all" || project.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Layout>
      <div className="section-gradient min-h-screen">
        <div className="container-civic py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="heading-section text-foreground mb-2">Projects Explorer</h1>
            <p className="text-muted-foreground">
              Browse and filter infrastructure projects across all districts
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <Card className="mb-6 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Project Type</label>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Roads">Roads</SelectItem>
                          <SelectItem value="Drainage">Drainage</SelectItem>
                          <SelectItem value="Lighting">Lighting</SelectItem>
                          <SelectItem value="Buildings">Buildings</SelectItem>
                          <SelectItem value="Water Supply">Water Supply</SelectItem>
                          <SelectItem value="Parks">Parks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Budget Range</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Budgets" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Budgets</SelectItem>
                          <SelectItem value="0-5">₹0 - ₹5 Cr</SelectItem>
                          <SelectItem value="5-20">₹5 - ₹20 Cr</SelectItem>
                          <SelectItem value="20-50">₹20 - ₹50 Cr</SelectItem>
                          <SelectItem value="50+">₹50 Cr+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Time Period</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {mockProjects.length} projects
            </p>
            <div className="flex gap-2">
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setStatusFilter("all")}>
                  Status: {statusFilter} ×
                </Badge>
              )}
              {typeFilter !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setTypeFilter("all")}>
                  Type: {typeFilter} ×
                </Badge>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const statusInfo = statusConfig[project.status as keyof typeof statusConfig];
              const StatusIcon = statusInfo.icon;
              
              return (
                <Card key={project.id} className="group hover:shadow-civic-md transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge className={`${statusInfo.className} border`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {project.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors line-clamp-2">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <IndianRupee className="h-4 w-4" />
                        <span>Budget: {project.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{project.startDate} → {project.endDate}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              project.status === 'delayed' ? 'bg-red-500' :
                              project.status === 'completed' ? 'bg-green-500' :
                              'bg-primary'
                            }`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <Link to={`/project/${project.id}`}>
                        <Button variant="outline" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
