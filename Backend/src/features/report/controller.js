const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const { generateComplaintLetter } = require('./templates/complaintTemplate');
const { generateRTIRequest } = require('./templates/rtiTemplate');
const responseFormatter = require('../../utils/responseFormatter');

const generateReport = async (req, res) => {
  try {
    const { audit_data, type } = req.body;
    
    if (!audit_data) {
      return res.status(400).json(responseFormatter.error(
        'Missing audit data',
        'audit_data is required'
      ));
    }
    
    if (!type || !['complaint', 'rti'].includes(type)) {
      return res.status(400).json(responseFormatter.error(
        'Invalid report type',
        'type must be either "complaint" or "rti"'
      ));
    }
    
    // Simulate processing delay (2-3 seconds)
    await delay(2000 + Math.random() * 1000);
    
    let reportContent;
    let reportTitle;
    
    if (type === 'complaint') {
      reportContent = generateComplaintLetter(audit_data);
      reportTitle = `Complaint_Letter_${audit_data.project_id}_${Date.now()}.txt`;
    } else {
      reportContent = generateRTIRequest(audit_data);
      reportTitle = `RTI_Request_${audit_data.project_id}_${Date.now()}.txt`;
    }
    
    res.json(responseFormatter.success(
      'Report generated successfully',
      {
        report_content: reportContent,
        report_title: reportTitle,
        report_type: type,
        generated_at: new Date().toISOString(),
        project_id: audit_data.project_id
      }
    ));
    
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json(responseFormatter.error(
      'Report generation failed',
      error.message
    ));
  }
};

module.exports = {
  generateReport
};
