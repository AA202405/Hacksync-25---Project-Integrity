const retrievalAgent = require('./agents/retrieval_agent');
const auditAgent = require('./agents/audit_agent');
const verdictAgent = require('./agents/verdict_agent');
const responseFormatter = require('../../utils/responseFormatter');

const runAudit = async (req, res) => {
  try {
    const { project_id, location, evidence_data } = req.body;
    
    if (!project_id && !location) {
      return res.status(400).json(responseFormatter.error(
        'Missing required parameter',
        'Either project_id or location must be provided'
      ));
    }
    
    const agentLogs = [];
    
    // Step 1: Retrieval Agent
    const retrievalResult = await retrievalAgent(project_id, location);
    agentLogs.push(retrievalResult.log);
    
    if (!retrievalResult.success || !retrievalResult.project) {
      return res.status(404).json(responseFormatter.error(
        'Project not found',
        'No official record found for the specified project or location'
      ));
    }
    
    const officialProject = retrievalResult.project;
    
    // Step 2: Audit Agent
    const auditResult = await auditAgent(officialProject, evidence_data);
    agentLogs.push(auditResult.log);
    
    // Step 3: Verdict Agent
    const verdictResult = await verdictAgent(
      officialProject,
      auditResult.issues,
      auditResult.evidence_count
    );
    agentLogs.push(verdictResult.log);
    
    // Prepare response
    const response = {
      project_id: officialProject.project_id,
      project_name: officialProject.name,
      location: officialProject.location.address,
      contractor: officialProject.contractor,
      official_budget: `₹${(officialProject.budget / 10000000).toFixed(1)} Cr`,
      expected_completion: officialProject.completion_date || 'Ongoing',
      status: verdictResult.verdict.toLowerCase().replace('-', '_'),
      risk_score: Math.round(verdictResult.risk_score * 10), // Convert to 0-100 scale
      discrepancies: auditResult.issues,
      explanation: verdictResult.explanation,
      recommendations: verdictResult.recommendations,
      agent_logs: agentLogs,
      evidence_sources: [
        { type: 'citizen', count: auditResult.evidence_count },
        { type: 'official', count: Math.floor(auditResult.evidence_count * 0.25) }
      ]
    };
    
    res.json(responseFormatter.success('Audit completed successfully', response));
    
  } catch (error) {
    console.error('Audit error:', error);
    res.status(500).json(responseFormatter.error(
      'Audit processing failed',
      error.message
    ));
  }
};

const getProjects = async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const officialDbPath = path.join(__dirname, './data/official_db.json');
    const officialDb = JSON.parse(fs.readFileSync(officialDbPath, 'utf8'));
    
    res.json(responseFormatter.success('Projects retrieved successfully', officialDb));
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json(responseFormatter.error(
      'Failed to retrieve projects',
      error.message
    ));
  }
};

module.exports = {
  runAudit,
  getProjects
};
