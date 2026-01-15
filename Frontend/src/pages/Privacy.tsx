import { Layout } from "@/components/layout/Layout";
import { Shield, Eye, Lock, AlertTriangle, Scale, FileText } from "lucide-react";

const sections = [
  {
    icon: Shield,
    title: "Data Usage Policy",
    content: `Project Integrity collects and processes data solely for the purpose of enabling civic oversight and transparency. All submitted evidence, including photographs and metadata, is used exclusively to compare against official records and generate compliance assessments.

We do not sell, share, or transfer personal data to third parties for commercial purposes. Data may only be shared with relevant oversight bodies or authorities when legally required or when explicit consent is provided.

Aggregated, anonymized data may be used to generate public statistics and insights about infrastructure integrity across regions.`,
  },
  {
    icon: Eye,
    title: "Anonymous Reporting",
    content: `Anonymous submissions are fully supported and encouraged. When you choose to submit anonymously:

• Your identity is never stored or linked to your submission
• Only the evidence content (photos, location, timestamp) is retained
• IP addresses are not logged for anonymous submissions
• There is no way to trace an anonymous report back to its submitter

Non-anonymous submissions allow you to receive updates on your report's status, but your identity remains protected and is never publicly disclosed.`,
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `All data transmitted to and from Project Integrity is encrypted using industry-standard TLS protocols. Stored data is encrypted at rest using AES-256 encryption.

Access to submitted evidence and personal data is strictly controlled and limited to authorized personnel only. All access is logged and audited regularly.

We implement comprehensive security measures including regular penetration testing, vulnerability assessments, and compliance audits to ensure the protection of your data.`,
  },
  {
    icon: AlertTriangle,
    title: "AI Limitations",
    content: `The AI systems used by Project Integrity are designed to assist in identifying potential discrepancies between official records and ground-level evidence. However, these systems have inherent limitations:

• AI assessments are probabilistic, not deterministic
• Confidence scores indicate pattern match reliability, not certainty of findings
• Environmental factors, image quality, and data availability affect accuracy
• AI cannot infer intent, motivation, or causation

All AI-generated findings are presented as "may require review" or "suggests potential discrepancy" rather than definitive conclusions. Human verification is always recommended before any action is taken.`,
  },
  {
    icon: Scale,
    title: "Legal Disclaimer",
    content: `Project Integrity is an independent platform providing indicative analysis based on available evidence. The platform:

• Does not make accusations or allegations against any individual or entity
• Does not infer intent, negligence, or wrongdoing
• Does not replace official investigations or legal proceedings
• Is not affiliated with any government body or political organization

Findings presented on this platform should be considered preliminary indicators that may warrant further independent investigation. Users are encouraged to verify all information through official channels before taking any action.

This platform is provided "as is" without warranty of any kind. The operators of Project Integrity are not liable for any decisions made based on information presented on this platform.`,
  },
  {
    icon: FileText,
    title: "Data Retention",
    content: `Evidence and reports submitted to Project Integrity are retained in accordance with the following policy:

• Active reports: Retained for the duration of any ongoing assessment
• Resolved reports: Retained for 3 years after resolution for audit purposes
• Anonymous submissions: Retained indefinitely in anonymized form
• Personal contact information: Deleted upon request or 1 year after last activity

You may request deletion of your personal data at any time by contacting our data protection officer. Note that anonymized evidence may be retained for public interest purposes even after personal data deletion.`,
  },
];

export default function Privacy() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-civic-50 border-b border-border">
        <div className="container-civic py-12">
          <div className="max-w-3xl">
            <h1 className="heading-section text-foreground mb-4">
              Privacy, Ethics & Disclaimer
            </h1>
            <p className="body-large text-muted-foreground">
              Project Integrity is committed to responsible data handling, 
              transparent AI practices, and ethical civic oversight. This page 
              outlines our policies and the limitations of our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-civic">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="institutional-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-civic-100">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="heading-card text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="prose prose-sm max-w-none">
                      {section.content.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-muted-foreground mb-4 whitespace-pre-line leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className="institutional-card bg-civic-50">
              <h2 className="heading-card text-foreground mb-4">
                Questions or Concerns?
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our privacy practices, ethical guidelines, 
                or wish to exercise your data rights, please contact our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Data Protection Officer</p>
                  <p className="font-medium text-foreground">privacy@projectintegrity.org</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">General Inquiries</p>
                  <p className="font-medium text-foreground">contact@projectintegrity.org</p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-center text-sm text-muted-foreground">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
