import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeftRight, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Image,
  FileText,
  Calendar,
  IndianRupee,
  Clock,
  Building2
} from "lucide-react";

const projectsForComparison = [
  { id: "1", name: "NH-44 Highway Expansion - Phase 2", budget: 45.2, progress: 65, delays: 15, status: "ongoing" },
  { id: "2", name: "Smart Drainage System Installation", budget: 12.8, progress: 42, delays: 45, status: "delayed" },
  { id: "3", name: "LED Street Lighting Project", budget: 8.5, progress: 100, delays: 0, status: "completed" },
  { id: "4", name: "Water Pipeline Network Upgrade", budget: 35.6, progress: 38, delays: 0, status: "ongoing" },
];

const areasForComparison = [
  { id: "ward15", name: "Ward 15 - North District", totalProjects: 12, completedOnTime: 8, delayed: 3, avgBudget: 15.2 },
  { id: "ward8", name: "Ward 8 - Central Zone", totalProjects: 18, completedOnTime: 14, delayed: 2, avgBudget: 22.5 },
  { id: "ward22", name: "Ward 22 - South District", totalProjects: 9, completedOnTime: 7, delayed: 1, avgBudget: 11.8 },
];

export default function Comparison() {
  const [comparisonType, setComparisonType] = useState("project-vs-project");
  const [selectedProject1, setSelectedProject1] = useState("");
  const [selectedProject2, setSelectedProject2] = useState("");
  const [selectedArea1, setSelectedArea1] = useState("");
  const [selectedArea2, setSelectedArea2] = useState("");

  const project1 = projectsForComparison.find(p => p.id === selectedProject1);
  const project2 = projectsForComparison.find(p => p.id === selectedProject2);
  const area1 = areasForComparison.find(a => a.id === selectedArea1);
  const area2 = areasForComparison.find(a => a.id === selectedArea2);

  const getDeltaIndicator = (value1: number, value2: number, reverseLogic = false) => {
    const diff = value1 - value2;
    const isPositive = reverseLogic ? diff < 0 : diff > 0;
    const Icon = diff > 0 ? TrendingUp : diff < 0 ? TrendingDown : Minus;
    const color = diff === 0 ? 'text-muted-foreground' : isPositive ? 'text-green-600' : 'text-red-600';
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{Math.abs(diff).toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="section-gradient min-h-screen">
        <div className="container-civic py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="heading-section text-foreground mb-2">Comparison Library</h1>
            <p className="text-muted-foreground">
              Compare projects, timelines, and areas to identify patterns and discrepancies
            </p>
          </div>

          {/* Comparison Type Tabs */}
          <Tabs value={comparisonType} onValueChange={setComparisonType} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="project-vs-project">Project vs Project</TabsTrigger>
              <TabsTrigger value="planned-vs-actual">Planned vs Actual</TabsTrigger>
              <TabsTrigger value="before-after">Before & After</TabsTrigger>
              <TabsTrigger value="area-comparison">Area Comparison</TabsTrigger>
            </TabsList>

            {/* Project vs Project */}
            <TabsContent value="project-vs-project" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Projects to Compare</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Select value={selectedProject1} onValueChange={setSelectedProject1}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project 1" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectsForComparison.map((project) => (
                          <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex justify-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <Select value={selectedProject2} onValueChange={setSelectedProject2}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project 2" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectsForComparison.map((project) => (
                          <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {project1 && project2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project 1 Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{project1.name}</CardTitle>
                      <Badge variant="outline">{project1.status}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-muted-foreground" />
                          <span>Budget</span>
                        </div>
                        <span className="font-semibold">₹{project1.budget} Cr</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>Progress</span>
                        </div>
                        <span className="font-semibold">{project1.progress}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Delay Days</span>
                        </div>
                        <span className="font-semibold">{project1.delays}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project 2 Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{project2.name}</CardTitle>
                      <Badge variant="outline">{project2.status}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-muted-foreground" />
                          <span>Budget</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">₹{project2.budget} Cr</span>
                          {getDeltaIndicator(project1.budget, project2.budget)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>Progress</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{project2.progress}%</span>
                          {getDeltaIndicator(project1.progress, project2.progress)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Delay Days</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{project2.delays}</span>
                          {getDeltaIndicator(project1.delays, project2.delays, true)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Planned vs Actual */}
            <TabsContent value="planned-vs-actual" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Planned vs Actual Timeline Comparison</CardTitle>
                  <CardDescription>Compare scheduled milestones with actual completion dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { milestone: "Project Kickoff", planned: "Jan 15, 2024", actual: "Jan 15, 2024", variance: 0 },
                      { milestone: "Land Acquisition", planned: "Feb 28, 2024", actual: "Mar 10, 2024", variance: 10 },
                      { milestone: "Phase 1 Construction", planned: "Apr 15, 2024", actual: "Apr 20, 2024", variance: 5 },
                      { milestone: "Phase 2 Construction", planned: "Aug 01, 2024", actual: "Aug 15, 2024", variance: 14 },
                      { milestone: "Final Inspection", planned: "May 15, 2025", actual: "-", variance: null },
                    ].map((item, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg items-center">
                        <div className="font-medium">{item.milestone}</div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Planned</p>
                          <p className="font-medium">{item.planned}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Actual</p>
                          <p className="font-medium">{item.actual}</p>
                        </div>
                        <div className="text-center">
                          {item.variance !== null ? (
                            <Badge className={item.variance === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                              {item.variance === 0 ? 'On Time' : `+${item.variance} days`}
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Before & After */}
            <TabsContent value="before-after" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Evidence Comparison</CardTitle>
                  <CardDescription>Before and after visual documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Before (Jan 2024)
                      </h4>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                        <div className="text-center text-muted-foreground">
                          <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Initial site condition</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        After (Aug 2024)
                      </h4>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                        <div className="text-center text-muted-foreground">
                          <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Current site status</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Evidence References</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer">
                        <FileText className="h-3 w-3 mr-1" />
                        Site Survey Report
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        <FileText className="h-3 w-3 mr-1" />
                        Progress Report Q2
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer">
                        <Image className="h-3 w-3 mr-1" />
                        Citizen Photo #1234
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Area Comparison */}
            <TabsContent value="area-comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Areas to Compare</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Select value={selectedArea1} onValueChange={setSelectedArea1}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Area 1" />
                      </SelectTrigger>
                      <SelectContent>
                        {areasForComparison.map((area) => (
                          <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex justify-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <Select value={selectedArea2} onValueChange={setSelectedArea2}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Area 2" />
                      </SelectTrigger>
                      <SelectContent>
                        {areasForComparison.map((area) => (
                          <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {area1 && area2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{area1.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span>Total Projects</span>
                        <span className="font-semibold">{area1.totalProjects}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span>Completed On Time</span>
                        <span className="font-semibold">{area1.completedOnTime}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span>Delayed Projects</span>
                        <span className="font-semibold">{area1.delayed}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span>Avg Budget</span>
                        <span className="font-semibold">₹{area1.avgBudget} Cr</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{area2.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span>Total Projects</span>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{area2.totalProjects}</span>
                          {getDeltaIndicator(area1.totalProjects, area2.totalProjects)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span>Completed On Time</span>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{area2.completedOnTime}</span>
                          {getDeltaIndicator(area1.completedOnTime, area2.completedOnTime)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span>Delayed Projects</span>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{area2.delayed}</span>
                          {getDeltaIndicator(area1.delayed, area2.delayed, true)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span>Avg Budget</span>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">₹{area2.avgBudget} Cr</span>
                          {getDeltaIndicator(area1.avgBudget, area2.avgBudget)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
