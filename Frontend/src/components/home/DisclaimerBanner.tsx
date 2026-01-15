import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export function DisclaimerBanner() {
  return (
    <section className="bg-civic-50 border-y border-civic-200">
      <div className="container-civic py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-civic-100">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">
              Important Disclaimer
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Project Integrity is an independent platform providing indicative analysis based on 
              available evidence. All findings require independent verification before any action. 
              This platform does not make accusations or infer intent. Compliance assessments 
              suggest areas that <em>may require review</em> and should not be interpreted as 
              definitive conclusions.
            </p>
            <Link 
              to="/privacy" 
              className="inline-block text-sm font-medium text-primary hover:underline"
            >
              Read our full ethics statement →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
