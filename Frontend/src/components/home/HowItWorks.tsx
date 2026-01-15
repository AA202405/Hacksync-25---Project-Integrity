import { Upload, Cpu, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Evidence",
    description: "Submit official documents or citizen-captured evidence of infrastructure conditions. All submissions can be anonymous.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analysis",
    description: "Our AI compares official claims against submitted evidence, identifying discrepancies and generating a confidence assessment.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Transparent Verdict",
    description: "Receive a clear compliance assessment with full explainability. Generate formal reports or RTI requests as needed.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding section-gradient">
      <div className="container-civic">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2 className="heading-section text-foreground mb-4">
            From Evidence to Accountability
          </h2>
          <p className="body-regular text-muted-foreground max-w-2xl mx-auto">
            A transparent, three-step process designed to bridge the gap between 
            official records and on-ground reality.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="institutional-card h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-civic-200 font-serif">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="heading-card text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="body-regular text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-civic-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
