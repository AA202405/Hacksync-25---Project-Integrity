import { 
  FileSearch, 
  Map, 
  Scale, 
  FileText, 
  ShieldCheck,
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Document Analysis",
    description: "Upload government tenders, completion reports, and budget allocations for automated extraction and analysis.",
  },
  {
    icon: Map,
    title: "Geographic Mapping",
    description: "Visualize infrastructure integrity across regions with interactive maps and status indicators.",
  },
  {
    icon: Scale,
    title: "AI Audit Engine",
    description: "Compare official claims against citizen evidence with explainable AI reasoning and confidence scores.",
  },
  {
    icon: FileText,
    title: "RTI Generation",
    description: "Automatically generate complaint letters and Right to Information requests based on audit findings.",
  },
  {
    icon: ShieldCheck,
    title: "Anonymous Reporting",
    description: "Submit evidence securely and anonymously with automatic GPS and timestamp capture.",
  },
  {
    icon: BarChart3,
    title: "Integrity Dashboard",
    description: "Access aggregated insights, municipality trust indices, and infrastructure breakdown analytics.",
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-civic">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Platform Features
          </span>
          <h2 className="heading-section text-foreground mb-4">
            Built for Civic Accountability
          </h2>
          <p className="body-regular text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed for transparency organizations, oversight bodies, 
            and citizens committed to public accountability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group institutional-card hover:border-primary/30 transition-colors duration-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-civic-100 mb-4 group-hover:bg-primary/10 transition-colors duration-200">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="heading-card text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="body-regular text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
