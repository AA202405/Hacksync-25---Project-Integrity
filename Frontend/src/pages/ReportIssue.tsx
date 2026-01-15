import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  MapPin,
  Clock,
  Shield,
  Camera,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

const categories = [
  { value: "roads", label: "Roads & Highways" },
  { value: "drainage", label: "Drainage & Sewage" },
  { value: "buildings", label: "Public Buildings" },
  { value: "bridges", label: "Bridges & Flyovers" },
  { value: "water", label: "Water Supply" },
  { value: "electricity", label: "Electricity Infrastructure" },
  { value: "other", label: "Other" },
];

export default function ReportIssue() {
  const [step, setStep] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-civic">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-status-compliant-bg mb-6">
                <CheckCircle className="h-10 w-10 text-status-compliant" />
              </div>
              <h1 className="heading-section text-foreground mb-4">
                Report Submitted Successfully
              </h1>
              <p className="body-large text-muted-foreground mb-8">
                Your submission has been received and will be processed within 24-48 hours. 
                You will receive updates on the status of your report.
              </p>
              <div className="institutional-card text-left mb-8">
                <h3 className="font-semibold text-foreground mb-2">Reference ID</h3>
                <p className="text-2xl font-mono text-primary">PI-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please save this reference for future correspondence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="civic" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setImagePreview(null);
                  }}
                >
                  Submit Another Report
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/map'}>
                  View on Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-civic-50 border-b border-border">
        <div className="container-civic py-12">
          <div className="max-w-3xl">
            <h1 className="heading-section text-foreground mb-4">
              Report an Infrastructure Issue
            </h1>
            <p className="body-large text-muted-foreground">
              Submit evidence of infrastructure conditions to help bridge the gap between 
              official records and on-ground reality. Your report will be analyzed and 
              compared against official documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-civic">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-10">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-1 w-16 sm:w-24 md:w-32 mx-2 ${
                        step > s ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Evidence Upload */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="institutional-card">
                    <h2 className="heading-card text-foreground mb-6 flex items-center gap-2">
                      <Camera className="h-5 w-5 text-primary" />
                      Upload Evidence
                    </h2>

                    <div className="space-y-6">
                      {/* Image Upload */}
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">
                          Infrastructure Photo <span className="text-destructive">*</span>
                        </Label>
                        <div
                          className={`relative border-2 border-dashed rounded-lg transition-colors ${
                            imagePreview
                              ? "border-primary bg-civic-50"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {imagePreview ? (
                            <div className="p-4">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-64 mx-auto rounded-md"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-4 mx-auto block"
                                onClick={() => setImagePreview(null)}
                              >
                                Remove Image
                              </Button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                              <span className="text-sm font-medium text-foreground mb-1">
                                Click to upload or drag and drop
                              </span>
                              <span className="text-xs text-muted-foreground">
                                PNG, JPG up to 10MB
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">
                          Infrastructure Category <span className="text-destructive">*</span>
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Description */}
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">
                          Description (Optional)
                        </Label>
                        <Textarea
                          placeholder="Describe the condition observed. Avoid accusations or assumptions about intent."
                          className="min-h-[120px]"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Focus on observable facts: "Road surface shows cracks and potholes approximately 2 feet wide"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      variant="civic" 
                      size="lg"
                      onClick={() => setStep(2)}
                      disabled={!imagePreview}
                    >
                      Continue to Location
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="institutional-card">
                    <h2 className="heading-card text-foreground mb-6 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Location Details
                    </h2>

                    <div className="space-y-6">
                      {/* Map Placeholder */}
                      <div className="aspect-video bg-civic-100 rounded-lg border border-border flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Interactive map - drag pin to adjust location
                          </p>
                        </div>
                      </div>

                      {/* Auto-captured Info */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <MapPin className="h-4 w-4" />
                            GPS Coordinates
                          </div>
                          <p className="font-mono text-sm text-foreground">
                            12.9716° N, 77.5946° E
                          </p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            Timestamp
                          </div>
                          <p className="font-mono text-sm text-foreground">
                            {new Date().toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">
                          Address / Landmark
                        </Label>
                        <Input
                          placeholder="e.g., Near City Hospital, Main Road"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      variant="civic" 
                      size="lg"
                      onClick={() => setStep(3)}
                    >
                      Continue to Privacy
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Privacy & Submit */}
              {step === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="institutional-card">
                    <h2 className="heading-card text-foreground mb-6 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Privacy Settings
                    </h2>

                    <div className="space-y-6">
                      {/* Anonymous Toggle */}
                      <div className="flex items-start justify-between p-4 bg-civic-50 rounded-lg border border-civic-200">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium text-foreground">
                            Submit Anonymously
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Your identity will not be stored or linked to this report
                          </p>
                        </div>
                        <Switch
                          checked={isAnonymous}
                          onCheckedChange={setIsAnonymous}
                        />
                      </div>

                      {!isAnonymous && (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-foreground mb-2 block">
                              Email (for updates only)
                            </Label>
                            <Input type="email" placeholder="your@email.com" />
                          </div>
                        </div>
                      )}

                      {/* Privacy Notice */}
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p>
                            <strong>Data Usage:</strong> Your submission will be used solely for 
                            civic oversight purposes. Photos and metadata are processed to compare 
                            against official records.
                          </p>
                          <p>
                            <strong>Retention:</strong> Evidence is retained for the duration of 
                            any ongoing assessment and in accordance with applicable data retention policies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Warning */}
                  <div className="flex items-start gap-3 p-4 bg-status-suspect-bg rounded-lg border border-status-suspect/30">
                    <AlertCircle className="h-5 w-5 text-status-suspect shrink-0 mt-0.5" />
                    <div className="text-sm text-foreground">
                      <strong>Before Submitting:</strong> Ensure your evidence accurately represents 
                      observable conditions. Do not submit false or misleading information. All 
                      submissions may be subject to verification.
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      variant="civic" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Report"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
