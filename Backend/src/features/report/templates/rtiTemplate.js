const generateRTIRequest = (auditData) => {
  const date = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return `
To,
The Public Information Officer
Municipal Corporation of Greater Mumbai
Mumbai, Maharashtra

Date: ${date}

Subject: Request for Information under Right to Information Act, 2005

Respected Sir/Madam,

Under the provisions of the Right to Information Act, 2005, I request the following information regarding infrastructure project ${auditData.project_id}:

PROJECT IDENTIFICATION:
- Project ID: ${auditData.project_id}
- Project Name: ${auditData.project_name}
- Location: ${auditData.location}

INFORMATION REQUESTED:

1. Detailed project completion report including:
   - Final inspection reports
   - Quality assurance certificates
   - Material test reports
   - Contractor's completion certificate

2. Financial information:
   - Total amount sanctioned
   - Amount disbursed to contractor
   - Payment schedule and dates
   - Any variations or additional work orders

3. Technical specifications:
   - Approved technical drawings
   - Material specifications used
   - Quality standards compliance reports

4. Monitoring and supervision:
   - Site inspection reports
   - Engineer's daily reports
   - Quality control records

5. Post-completion:
   - Maintenance records
   - Any complaints received
   - Remedial actions taken, if any

GROUNDS FOR REQUEST:
This information is sought to ensure transparency and accountability in public infrastructure projects, particularly in light of evidence suggesting potential discrepancies between official records and ground-level conditions.

I am willing to pay the prescribed fees for this information as per RTI Act provisions.

Please provide the information within 30 days as mandated under Section 7(1) of the RTI Act, 2005.

Thank you for your cooperation.

Yours sincerely,
[Your Name]
[Your Address]
[Contact Information]
[RTI Application Fee Receipt Number: ___________]
  `.trim();
};

module.exports = { generateRTIRequest };
