import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Lightbulb,
  MapPin,
  Upload,
  Send,
  Clock,
  CheckCircle2,
  Eye,
  AlertCircle,
  User,
  Calendar
} from "lucide-react";

const existingSuggestions = [
  {
    id: "1",
    location: "Ward 15, North District",
    category: "Roads",
    problem: "Large potholes on main road causing traffic congestion and accidents",
    solution: "Repair road surface with quality materials and add speed breakers",
    priority: "high",
    status: "under_review",
    submittedAt: "2024-08-10",
    author: "Anonymous Citizen"
  },
  {
    id: "2",
    location: "Ward 8, Central Zone",
    category: "Drainage",
    problem: "Drainage overflow during monsoon season causing waterlogging",
    solution: "Clean existing drains and install additional drainage capacity",
    priority: "medium",
    status: "mapped",
    submittedAt: "2024-08-05",
    author: "Resident Committee"
  },
  {
    id: "3",
    location: "Ward 22, South District",
    category: "Lighting",
    problem: "Street lights not working in residential area for 2 weeks",
    solution: "Replace damaged bulbs and check electrical connections",
    priority: "medium",
    status: "new",
    submittedAt: "2024-08-12",
    author: "Anonymous Citizen"
  },
];

const statusConfig = {
  new: { label: "New", icon: AlertCircle, className: "bg-blue-100 text-blue-700" },
  under_review: { label: "Under Review", icon: Eye, className: "bg-amber-100 text-amber-700" },
  mapped: { label: "Mapped to Project", icon: CheckCircle2, className: "bg-green-100 text-green-700" },
};

const priorityConfig = {
  low: { label: "Low Priority", className: "bg-gray-100 text-gray-700" },
  medium: { label: "Medium Priority", className: "bg-amber-100 text-amber-700" },
  high: { label: "High Priority", className: "bg-red-100 text-red-700" },
};

export default function Suggestions() {
  const [formData, setFormData] = useState({
    location: "",
    category: "",
    problem: "",
    solution: "",
    priority: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ location: "", category: "", problem: "", solution: "", priority: "" });
  };

  return (
    <Layout>
      <div className="section-gradient min-h-screen">
        <div className="container-civic py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="heading-section text-foreground mb-2">Citizen Suggestions</h1>
            <p className="text-muted-foreground">
              Submit proposals for infrastructure improvements in your area
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Submission Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Submit a Suggestion
                </CardTitle>
                <CardDescription>
                  Your proposals help improve public infrastructure and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location / Area</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter ward, street, or landmark..."
                        className="pl-10"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="roads">Roads & Highways</SelectItem>
                        <SelectItem value="drainage">Drainage & Sewage</SelectItem>
                        <SelectItem value="lighting">Street Lighting</SelectItem>
                        <SelectItem value="water">Water Supply</SelectItem>
                        <SelectItem value="buildings">Public Buildings</SelectItem>
                        <SelectItem value="parks">Parks & Recreation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Problem Description */}
                  <div className="space-y-2">
                    <Label htmlFor="problem">Problem Description</Label>
                    <Textarea
                      id="problem"
                      placeholder="Describe the issue you've observed..."
                      rows={4}
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      required
                    />
                  </div>

                  {/* Suggested Solution */}
                  <div className="space-y-2">
                    <Label htmlFor="solution">Suggested Solution</Label>
                    <Textarea
                      id="solution"
                      placeholder="What improvements would you recommend?"
                      rows={3}
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    />
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label>Priority Level</Label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General improvement</SelectItem>
                        <SelectItem value="medium">Medium - Causes inconvenience</SelectItem>
                        <SelectItem value="high">High - Safety concern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Attach Image (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Submitted Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Suggestion
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Suggestions List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Suggestions</h2>
                <Badge variant="outline">{existingSuggestions.length} total</Badge>
              </div>

              <div className="space-y-4">
                {existingSuggestions.map((suggestion) => {
                  const statusInfo = statusConfig[suggestion.status as keyof typeof statusConfig];
                  const priorityInfo = priorityConfig[suggestion.priority as keyof typeof priorityConfig];
                  const StatusIcon = statusInfo.icon;

                  return (
                    <Card key={suggestion.id} className="hover:shadow-civic-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={statusInfo.className}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                            <Badge variant="outline">{suggestion.category}</Badge>
                            <Badge className={priorityInfo.className}>
                              {priorityInfo.label}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{suggestion.location}</span>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Problem:</p>
                            <p className="text-sm">{suggestion.problem}</p>
                          </div>
                          {suggestion.solution && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Suggested Solution:</p>
                              <p className="text-sm">{suggestion.solution}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{suggestion.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{suggestion.submittedAt}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
