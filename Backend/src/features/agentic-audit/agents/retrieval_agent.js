const fs = require('fs');
const path = require('path');

const officialDbPath = path.join(__dirname, '../data/official_db.json');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const retrievalAgent = async (projectId, location) => {
  const startTime = Date.now();
  
  // Simulate 1-2 second delay
  await delay(1000 + Math.random() * 1000);
  
  // Load official database
  const officialDb = JSON.parse(fs.readFileSync(officialDbPath, 'utf8'));
  
  let project = null;
  
  if (projectId) {
    project = officialDb.find(p => p.project_id === projectId);
  } else if (location) {
    // Find project by location proximity (within 0.01 degrees)
    project = officialDb.find(p => {
      const latDiff = Math.abs(p.location.lat - location.lat);
      const lngDiff = Math.abs(p.location.lng - location.lng);
      return latDiff < 0.01 && lngDiff < 0.01;
    });
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  return {
    success: !!project,
    project: project,
    log: {
      agent: 'retrieval_agent',
      action: 'fetch_official_records',
      duration: `${duration}s`,
      timestamp: new Date().toISOString(),
      message: project 
        ? `Found official record for project ${project.project_id}: ${project.name}`
        : 'No matching official record found'
    }
  };
};

module.exports = retrievalAgent;
