const generateComplaintLetter = (auditData) => {
  const date = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return `
To,
The Municipal Commissioner
Municipal Corporation of Greater Mumbai
Mumbai, Maharashtra

Date: ${date}

Subject: Complaint regarding infrastructure project ${auditData.project_id} - ${auditData.project_name}

Respected Sir/Madam,

I am writing to bring to your attention concerns regarding the infrastructure project mentioned above, which was completed on ${auditData.expected_completion || 'the reported completion date'}.

PROJECT DETAILS:
- Project ID: ${auditData.project_id}
- Project Name: ${auditData.project_name}
- Location: ${auditData.location}
- Contractor: ${auditData.contractor}
- Sanctioned Budget: ${auditData.official_budget}

CONCERNS IDENTIFIED:
${auditData.discrepancies && auditData.discrepancies.length > 0 ? auditData.discrepancies.map((disc, idx) => `
${idx + 1}. ${disc.type}: ${disc.observed}
   Official Record: ${disc.official}
   Severity: ${disc.severity}
`).join('') : 'No specific discrepancies identified.'}

RISK ASSESSMENT:
The project has been assessed with a risk score of ${auditData.risk_score}/100, indicating ${auditData.status === 'compliant' ? 'compliance' : auditData.status === 'suspect' ? 'areas requiring review' : 'non-compliance concerns'}.

REQUESTED ACTION:
${auditData.recommendations && auditData.recommendations.length > 0 ? auditData.recommendations.map((rec, idx) => `${idx + 1}. ${rec}`).join('\n') : 'Please conduct an independent review of this project.'}

I request your office to investigate these concerns and take appropriate action to ensure public funds are utilized effectively and infrastructure quality meets the required standards.

Thank you for your attention to this matter.

Yours sincerely,
[Your Name]
[Your Address]
[Contact Information]
  `.trim();
};

module.exports = { generateComplaintLetter };
