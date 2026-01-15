import { useState } from "react";
import { Layout } from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  User,
  FileText,
  Download,
  Send,
  CheckCircle2,
  MapPin,
  IndianRupee,
  Image
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const projectData = {
    id: "1",
    name: "NH-44 Highway Expansion - Phase 2",
    location: "Ward 15, North District",
    status: "Ongoing",
    budget: "₹45.2 Cr",
    department: "Public Works Department",
    contractor: "ABC Infrastructure Ltd",
    responsibleOfficer: "Shri Rajesh Kumar",
    officerDesignation: "Executive Engineer",
    officerPhone: "+91 98765 43210",
    officerEmail: "rajesh.kumar@pwd.gov.in",
  };

  const attachedEvidence = [
    { id: 1, name: "Site Photo - Section A", type: "image", date: "2024-08-15" },
    { id: 2, name: "Progress Report Q2", type: "document", date: "2024-07-01" },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleDownload = () => {
    // Mock download functionality
    alert("Downloading grievance document as PDF...");
  };

  if (submitted) {
    return (
      <Layout>
        <div className="section-gradient min-h-screen">
          <div className="container-civic py-8">
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="heading-section text-foreground mb-4">Request Submitted Successfully</h1>
              <p className="text-muted-foreground mb-8">
                Your grievance/inquiry has been submitted to the responsible department. 
                You will receive a confirmation email with a tracking number shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects">
                  <Button variant="outline">View Other Projects</Button>
                </Link>
                <Link to="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-gradient min-h-screen">
        <div className="container-civic py-8">
          {/* Back Button */}
          <Link to={`/project/${projectData.id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="heading-section text-foreground mb-2">Contact Responsible Official</h1>
            <p className="text-muted-foreground">
              Submit a grievance or inquiry regarding this project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Project Name</p>
                      <p className="font-medium">{projectData.name}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="outline">{projectData.status}</Badge>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Location
                      </p>
                      <p className="font-medium">{projectData.location}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" />
                        Budget
                      </p>
                      <p className="font-medium">{projectData.budget}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attached Evidence */}
              <Card>
                <CardHeader>
                  <CardTitle>Attached Evidence</CardTitle>
                  <CardDescription>The following evidence will be included with your request</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attachedEvidence.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          {item.type === "image" ? (
                            <Image className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                  <CardDescription>Add any additional information for the official</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe your concern or inquiry in detail..."
                    rows={6}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download as PDF
                </Button>
                <Button className="flex-1" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Sidebar - Official Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Responsible Official</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{projectData.responsibleOfficer}</p>
                      <p className="text-sm text-muted-foreground">{projectData.officerDesignation}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{projectData.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contractor</p>
                      <p className="font-medium">{projectData.contractor}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-3">
                    <a 
                      href={`tel:${projectData.officerPhone}`}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{projectData.officerPhone}</p>
                      </div>
                    </a>
                    <a 
                      href={`mailto:${projectData.officerEmail}`}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-sm">{projectData.officerEmail}</p>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> All communications are logged and tracked. 
                    You will receive a reference number after submission for future correspondence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
