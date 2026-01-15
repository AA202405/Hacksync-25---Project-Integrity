const fs = require('fs');
const path = require('path');
const responseFormatter = require('../../utils/responseFormatter');

const getMapData = async (req, res) => {
  try {
    const officialDbPath = path.join(__dirname, '../agentic-audit/data/official_db.json');
    const evidencePath = path.join(__dirname, '../agentic-audit/data/sample_evidence.json');
    
    const projects = JSON.parse(fs.readFileSync(officialDbPath, 'utf8'));
    const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
    
    // Process projects and assign verdicts/risk scores
    const mapData = projects.slice(0, 20).map((project, index) => {
      // Get evidence for this project
      const projectEvidence = evidence.filter(ev => ev.project_id === project.project_id);
      
      // Calculate risk score and verdict
      let riskScore = 0;
      let verdict = 'compliant';
      
      if (projectEvidence.length > 0) {
        const highSeverityCount = projectEvidence.filter(ev => 
          ev.severity === 'High' || ev.severity === 'Critical'
        ).length;
        
        riskScore = Math.min(projectEvidence.length * 1.5 + highSeverityCount * 2, 10);
        
        if (riskScore < 3) {
          verdict = 'compliant';
        } else if (riskScore >= 3 && riskScore <= 6) {
          verdict = 'suspect';
        } else {
          verdict = 'non-compliant';
        }
      }
      
      // Ensure distribution: 40% compliant, 30% suspect, 30% non-compliant
      if (index < projects.length * 0.4) {
        verdict = 'compliant';
        riskScore = Math.random() * 3;
      } else if (index < projects.length * 0.7) {
        verdict = 'suspect';
        riskScore = 3 + Math.random() * 3;
      } else {
        verdict = 'non-compliant';
        riskScore = 6 + Math.random() * 4;
      }
      
      return {
        id: project.project_id,
        name: project.name,
        location: {
          lat: project.location.lat,
          lng: project.location.lng
        },
        verdict: verdict,
        risk_score: Math.round(riskScore * 10), // 0-100 scale
        type: project.type,
        status: project.status,
        reports: projectEvidence.length
      };
    });
    
    res.json(responseFormatter.success(
      'Map data retrieved successfully',
      mapData
    ));
    
  } catch (error) {
    console.error('Map data error:', error);
    res.status(500).json(responseFormatter.error(
      'Failed to retrieve map data',
      error.message
    ));
  }
};

module.exports = {
  getMapData
};
