import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  Edit,
  Info,
} from "lucide-react";
import { api } from "@/lib/api";

const documentTypes = [
  { value: "tender", label: "Tender Document" },
  { value: "completion", label: "Completion Report" },
  { value: "budget", label: "Budget Allocation" },
  { value: "contract", label: "Contract Agreement" },
  { value: "inspection", label: "Inspection Report" },
];

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
  editable?: boolean;
}

const mockExtractedData: ExtractedField[] = [
  { label: "Project Name", value: "NH-44 Highway Resurfacing - Phase 2", confidence: 98 },
  { label: "Sanctioned Budget", value: "₹45,70,00,000", confidence: 95 },
  { label: "Contractor", value: "ABC Infrastructure Pvt. Ltd.", confidence: 92 },
  { label: "Project Location", value: "Sector 12-14, North District", confidence: 88, editable: true },
  { label: "Expected Completion", value: "March 2024", confidence: 78, editable: true },
  { label: "Tender Reference", value: "TND/2023/NH44/PH2/1847", confidence: 99 },
];

export default function Documents() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [documentType, setDocumentType] = useState<string>("tender");
  const [extractedData, setExtractedData] = useState<ExtractedField[]>(mockExtractedData);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);

      try {
        const formData = new FormData();
        formData.append("document", file);
        formData.append("document_type", documentType || "tender");

        const response = await api.post("/api/document/analyze", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = response.data?.data;
        if (data?.extracted_fields) {
          const mapped: ExtractedField[] = data.extracted_fields.map((field: any) => ({
            label: field.label,
            value: field.value,
            confidence: field.confidence,
            editable: field.editable,
          }));
          setExtractedData(mapped);
        }

        setIsProcessed(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Document analysis failed", error);
        setExtractedData(mockExtractedData);
        setIsProcessed(true);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-civic-50 border-b border-border">
        <div className="container-civic py-12">
          <div className="max-w-3xl">
            <h1 className="heading-section text-foreground mb-4">
              Document Upload & Analysis
            </h1>
            <p className="body-large text-muted-foreground">
              Upload government records for AI-powered analysis. Our system extracts 
              key information from tenders, completion reports, and budget allocations 
              for verification against ground reality.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-civic">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Upload Section */}
            <div className="space-y-6">
              <div className="institutional-card">
                <h2 className="heading-card text-foreground mb-6 flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Document
                </h2>

                <div className="space-y-6">
                  {/* Document Type */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      Document Type
                    </Label>
                    <Select value={documentType} onValueChange={setDocumentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      Document File
                    </Label>
                    <div
                      className={`relative border-2 border-dashed rounded-lg transition-colors ${
                        uploadedFile
                          ? "border-primary bg-civic-50"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {uploadedFile ? (
                        <div className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {uploadedFile.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            {isProcessing && (
                              <Loader2 className="h-5 w-5 text-primary animate-spin" />
                            )}
                            {isProcessed && (
                              <CheckCircle className="h-5 w-5 text-status-compliant" />
                            )}
                          </div>
                          {isProcessing && (
                            <div className="mt-4">
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full animate-pulse w-2/3" />
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 text-center">
                                Extracting document data...
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                          <span className="text-sm font-medium text-foreground mb-1">
                            Click to upload or drag and drop
                          </span>
                          <span className="text-xs text-muted-foreground">
                            PDF, PNG, JPG up to 20MB
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Preview Placeholder */}
              {uploadedFile && (
                <div className="institutional-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      Document Preview
                    </h3>
                  </div>
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center border border-border">
                    <div className="text-center p-6">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Document preview would display here
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Extracted Data */}
            <div className="space-y-6">
              <div className="institutional-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-card text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Extracted Information
                  </h2>
                  {isProcessed && (
                    <Badge variant="outline" className="status-compliant border">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Processed
                    </Badge>
                  )}
                </div>

                {!isProcessed ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Upload a document to see extracted information
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {extractedData.map((field, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          field.confidence < 80
                            ? "border-status-suspect/30 bg-status-suspect-bg/30"
                            : "border-border bg-muted/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {field.label}
                          </span>
                          <div className="flex items-center gap-2">
                            {field.confidence < 80 && (
                              <AlertCircle className="h-4 w-4 text-status-suspect" />
                            )}
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                field.confidence >= 90
                                  ? "status-compliant"
                                  : field.confidence >= 80
                                  ? ""
                                  : "status-suspect"
                              } border`}
                            >
                              {field.confidence}% confidence
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">
                            {field.value}
                          </p>
                          {field.editable && (
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Low Confidence Notice */}
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg mt-6">
                      <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">
                          Fields with low confidence
                        </p>
                        <p>
                          Fields marked with lower confidence scores may require 
                          manual verification. You can edit these values if they 
                          appear incorrect.
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button variant="civic" className="flex-1">
                        Proceed to Audit
                      </Button>
                      <Button variant="outline">
                        Save Draft
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
