import { useState } from "react";
import { Layout } from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  IndianRupee,
  User,
  FileText,
  Image,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Download,
  CheckCircle2,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const projectData = {
  id: "1",
  name: "NH-44 Highway Expansion - Phase 2",
  description: "Expansion of National Highway 44 to 6 lanes with improved drainage systems, smart lighting, and road safety measures. This phase covers a 12km stretch from Junction A to Junction B.",
  location: "Ward 15, North District",
  type: "Roads",
  status: "ongoing",
  budget: "₹45.2 Cr",
  spent: "₹28.5 Cr",
  startDate: "2024-01-15",
  plannedEndDate: "2025-06-30",
  actualEndDate: null,
  progress: 65,
  contractor: "ABC Infrastructure Ltd",
  department: "Public Works Department",
  responsibleOfficer: "Shri Rajesh Kumar",
  officerPhone: "+91 98765 43210",
  officerEmail: "rajesh.kumar@pwd.gov.in",
};

const documents = [
  { id: 1, name: "Project Tender Document", type: "PDF", date: "2023-11-20", size: "2.4 MB" },
  { id: 2, name: "Environmental Clearance", type: "PDF", date: "2023-12-05", size: "1.8 MB" },
  { id: 3, name: "Budget Allocation Order", type: "PDF", date: "2024-01-10", size: "856 KB" },
  { id: 4, name: "Site Survey Report", type: "PDF", date: "2023-10-15", size: "4.2 MB" },
  { id: 5, name: "Progress Report - Q1 2024", type: "PDF", date: "2024-04-01", size: "1.2 MB" },
];

const evidence = [
  { id: 1, caption: "Construction site - Section A", date: "2024-08-15", submittedBy: "Citizen Report" },
  { id: 2, caption: "Road surface quality check", date: "2024-08-10", submittedBy: "Official Inspection" },
  { id: 3, caption: "Drainage work progress", date: "2024-07-28", submittedBy: "Contractor Update" },
  { id: 4, caption: "Material storage area", date: "2024-07-20", submittedBy: "Citizen Report" },
];

const schedule = [
  { milestone: "Project Kickoff", planned: "2024-01-15", actual: "2024-01-15", status: "completed" },
  { milestone: "Land Acquisition Complete", planned: "2024-02-28", actual: "2024-03-10", status: "delayed" },
  { milestone: "Phase 1 Construction", planned: "2024-04-15", actual: "2024-04-20", status: "delayed" },
  { milestone: "Phase 2 Construction", planned: "2024-08-01", actual: null, status: "ongoing" },
  { milestone: "Phase 3 Construction", planned: "2024-12-01", actual: null, status: "planned" },
  { milestone: "Final Inspection", planned: "2025-05-15", actual: null, status: "planned" },
  { milestone: "Project Completion", planned: "2025-06-30", actual: null, status: "planned" },
];

const discussions = [
  { id: 1, author: "Anonymous Citizen", category: "Observation", content: "Noticed that work has been halted for the past 2 weeks at Section B. No workers visible on site.", date: "2024-08-12" },
  { id: 2, author: "Ward Committee", category: "Question", content: "What is the expected completion timeline for the pedestrian crossing near the school zone?", date: "2024-08-08" },
  { id: 3, author: "Site Inspector", category: "Update", content: "Quality inspection completed for Phase 1. All parameters within acceptable limits.", date: "2024-07-25" },
];

export default function ProjectDetails() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <div className="section-gradient min-h-screen">
        <div className="container-civic py-8">
          {/* Back Button */}
          <Link to="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
                <Building2 className="h-3 w-3 mr-1" />
                Ongoing
              </Badge>
              <Badge variant="outline">{projectData.type}</Badge>
              <Badge variant="outline" className="text-muted-foreground">
                ID: PRJ-{projectData.id.padStart(4, '0')}
              </Badge>
            </div>
            <h1 className="heading-section text-foreground mb-2">{projectData.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {projectData.location}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4" />
                {projectData.budget}
              </span>
            </div>
          </div>

          {/* Contact Official Button */}
          <div className="mb-8">
            <Link to={`/contact/${projectData.id}`}>
              <Button className="bg-primary">
                <Phone className="h-4 w-4 mr-2" />
                Contact Responsible Official
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{projectData.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                        <p className="text-xl font-semibold">{projectData.budget}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Amount Spent</p>
                        <p className="text-xl font-semibold">{projectData.spent}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                        <p className="text-xl font-semibold">{projectData.startDate}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Expected Completion</p>
                        <p className="text-xl font-semibold">{projectData.plannedEndDate}</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span className="font-semibold">{projectData.progress}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${projectData.progress}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Responsible Officials */}
                <Card>
                  <CardHeader>
                    <CardTitle>Responsible Authority</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{projectData.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contractor</p>
                      <p className="font-medium">{projectData.contractor}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Responsible Officer</p>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{projectData.responsibleOfficer}</p>
                          <p className="text-sm text-muted-foreground">{projectData.department}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{projectData.officerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{projectData.officerEmail}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Project Documents</CardTitle>
                  <CardDescription>Official documents and reports related to this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">{doc.type} • {doc.size} • {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Evidence Tab */}
            <TabsContent value="evidence">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Evidence</CardTitle>
                  <CardDescription>Photos and visual documentation uploaded by citizens and officials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {evidence.map((item) => (
                      <div key={item.id} className="group relative overflow-hidden rounded-lg border bg-muted aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <p className="text-sm text-white font-medium">{item.caption}</p>
                          <p className="text-xs text-white/70">{item.date} • {item.submittedBy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Project Schedule</CardTitle>
                  <CardDescription>Planned vs actual timeline with delay indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedule.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                          item.status === 'completed' ? 'bg-green-100' :
                          item.status === 'delayed' ? 'bg-red-100' :
                          item.status === 'ongoing' ? 'bg-amber-100' :
                          'bg-muted'
                        }`}>
                          {item.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-green-600" /> :
                           item.status === 'delayed' ? <AlertTriangle className="h-5 w-5 text-red-600" /> :
                           item.status === 'ongoing' ? <Clock className="h-5 w-5 text-amber-600" /> :
                           <Clock className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{item.milestone}</p>
                            <Badge variant={
                              item.status === 'completed' ? 'default' :
                              item.status === 'delayed' ? 'destructive' :
                              item.status === 'ongoing' ? 'secondary' :
                              'outline'
                            }>
                              {item.status}
                            </Badge>
                          </div>
                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span>Planned: {item.planned}</span>
                            {item.actual && <span>Actual: {item.actual}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions">
              <Card>
                <CardHeader>
                  <CardTitle>Community Discussion</CardTitle>
                  <CardDescription>Contextual discussions about this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{discussion.author}</span>
                            <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">{discussion.date}</span>
                        </div>
                        <p className="text-muted-foreground">{discussion.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
