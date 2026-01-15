const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const verdictAgent = async (officialProject, issues, evidenceCount) => {
  const startTime = Date.now();
  
  // Simulate 1-2 second delay
  await delay(1000 + Math.random() * 1000);
  
  // Calculate risk score
  let riskScore = 0;
  
  // Base risk from number of issues
  riskScore += issues.length * 1.5;
  
  // Severity multipliers
  issues.forEach(issue => {
    if (issue.severity === 'critical') riskScore += 3;
    else if (issue.severity === 'high') riskScore += 2;
    else if (issue.severity === 'medium') riskScore += 1;
    else riskScore += 0.5;
  });
  
  // Budget factor (higher budget = higher expectations)
  if (officialProject.budget > 300000000) {
    riskScore += issues.length * 0.5;
  }
  
  // Cap risk score at 10
  riskScore = Math.min(riskScore, 10);
  riskScore = Math.round(riskScore * 10) / 10; // Round to 1 decimal
  
  // Determine verdict
  let verdict;
  if (riskScore < 3 && issues.filter(i => i.severity === 'critical' || i.severity === 'high').length === 0) {
    verdict = 'Compliant';
  } else if (riskScore >= 3 && riskScore <= 6) {
    verdict = 'Suspect';
  } else {
    verdict = 'Non-Compliant';
  }
  
  // Generate explanation
  const projectName = officialProject.name;
  const completionDate = officialProject.completion_date || 'ongoing';
  const budget = `₹${(officialProject.budget / 10000000).toFixed(1)} Cr`;
  
  let explanation = `${projectName} `;
  
  if (officialProject.status === 'Completed') {
    explanation += `was completed on ${completionDate} with a budget of ${budget}. `;
  } else {
    explanation += `is currently ongoing with a budget of ${budget}. `;
  }
  
  if (issues.length > 0) {
    const criticalIssues = issues.filter(i => i.severity === 'critical' || i.severity === 'high');
    if (criticalIssues.length > 0) {
      explanation += `Evidence shows ${criticalIssues.length} critical or high-severity issue(s) including ${criticalIssues[0].type.toLowerCase()}. `;
    } else {
      explanation += `Evidence shows ${issues.length} issue(s) requiring attention. `;
    }
    
    if (officialProject.status === 'Completed') {
      const postCompletionIssues = issues.filter(i => i.discrepancy && i.discrepancy.includes('after completion'));
      if (postCompletionIssues.length > 0) {
        explanation += `This suggests potential concerns regarding material quality, workmanship, or maintenance standards. `;
      } else {
        explanation += `This suggests the need for review of contractor performance and material specifications. `;
      }
    } else {
      explanation += `This suggests the need for closer monitoring of ongoing work and adherence to quality standards. `;
    }
  } else {
    explanation += `No significant discrepancies found between official records and ground-level evidence. `;
  }
  
  // Generate recommendations
  const recommendations = [];
  
  if (issues.length > 0) {
    recommendations.push('Conduct independent verification of reported completion status');
    recommendations.push('Review material quality and contractor performance records');
  }
  
  if (issues.some(i => i.type === 'Drainage Integration')) {
    recommendations.push('Inspect drainage system functionality and integration');
  }
  
  if (riskScore > 6) {
    recommendations.push('Consider formal inquiry into project execution and fund utilization');
    recommendations.push('Request detailed contractor reports and material test certificates');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Continue monitoring project status and evidence submissions');
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  return {
    verdict,
    risk_score: riskScore,
    explanation,
    recommendations,
    log: {
      agent: 'verdict_agent',
      action: 'generate_verdict',
      duration: `${duration}s`,
      timestamp: new Date().toISOString(),
      message: `Generated verdict: ${verdict} (Risk Score: ${riskScore}/10)`
    }
  };
};

module.exports = verdictAgent;
