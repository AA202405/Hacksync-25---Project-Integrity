const fs = require('fs');
const path = require('path');

const evidencePath = path.join(__dirname, '../data/sample_evidence.json');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const auditAgent = async (officialProject, evidenceData) => {
  const startTime = Date.now();
  
  // Simulate 2-3 second delay
  await delay(2000 + Math.random() * 1000);
  
  // Load evidence database
  const allEvidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
  
  // Find evidence related to this project
  const projectEvidence = evidenceData || allEvidence.filter(
    ev => ev.project_id === officialProject.project_id
  );
  
  const issues = [];
  
  // Check completion date vs evidence timestamp
  if (officialProject.completion_date && projectEvidence.length > 0) {
    const completionDate = new Date(officialProject.completion_date);
    
    projectEvidence.forEach(ev => {
      const evidenceDate = new Date(ev.timestamp);
      
      if (evidenceDate > completionDate) {
        const daysAfter = Math.floor((evidenceDate - completionDate) / (1000 * 60 * 60 * 24));
        issues.push({
          type: 'Completion Status',
          official: `Project completed on ${officialProject.completion_date}`,
          observed: `Evidence shows ${ev.issue_type} (${ev.severity} severity) ${daysAfter} days after reported completion`,
          severity: ev.severity.toLowerCase(),
          confidence: 85 + Math.floor(Math.random() * 10),
          discrepancy: `Issues reported ${daysAfter} days after completion date`
        });
      }
    });
  }
  
  // Check budget vs quality indicators
  const highSeverityIssues = projectEvidence.filter(ev => 
    ev.severity === 'High' || ev.severity === 'Critical'
  );
  
  if (highSeverityIssues.length > 0 && officialProject.budget > 200000000) {
    issues.push({
      type: 'Material Quality',
      official: `High-grade materials specified for budget of ₹${(officialProject.budget / 10000000).toFixed(1)} Cr`,
      observed: `Multiple ${highSeverityIssues.length} high-severity issues suggest potential material quality concerns`,
      severity: 'high',
      confidence: 78 + Math.floor(Math.random() * 10),
      discrepancy: 'High budget but poor quality indicators'
    });
  }
  
  // Check claimed status vs actual evidence
  if (officialProject.status === 'Completed' && projectEvidence.length > 0) {
    const recentEvidence = projectEvidence.filter(ev => {
      const evDate = new Date(ev.timestamp);
      const completionDate = new Date(officialProject.completion_date);
      return evDate > completionDate;
    });
    
    if (recentEvidence.length > 0) {
      issues.push({
        type: 'Completion Status',
        official: `100% work completed as per contractor report`,
        observed: `Visible incomplete sections and issues reported after completion`,
        severity: 'medium',
        confidence: 85 + Math.floor(Math.random() * 10),
        discrepancy: 'Status mismatch with evidence'
      });
    }
  }
  
  // Check drainage integration if applicable
  if (officialProject.type === 'water' && projectEvidence.some(ev => ev.issue_type === 'Water Logging')) {
    issues.push({
      type: 'Drainage Integration',
      official: 'Integrated drainage system installed',
      observed: 'Water pooling observed, drainage appears non-functional',
      severity: 'high',
      confidence: 72 + Math.floor(Math.random() * 10),
      discrepancy: 'Drainage system not functioning as claimed'
    });
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  return {
    issues: issues,
    evidence_count: projectEvidence.length,
    log: {
      agent: 'audit_agent',
      action: 'compare_records_vs_evidence',
      duration: `${duration}s`,
      timestamp: new Date().toISOString(),
      message: `Analyzed ${projectEvidence.length} evidence records, found ${issues.length} discrepancies`
    }
  };
};

module.exports = auditAgent;
