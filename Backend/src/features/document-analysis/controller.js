const { uploadDocument } = require('../../middleware/uploadConfig');
const { analyzeDocument } = require('./service');
const responseFormatter = require('../../utils/responseFormatter');

const analyze = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(responseFormatter.error(
        'No file uploaded',
        'Please upload a document file'
      ));
    }
    
    const documentType = req.body.document_type || 'tender';
    const filename = req.file.originalname;
    
    // Analyze document
    const result = await analyzeDocument(filename, documentType);
    
    res.json(responseFormatter.success(
      'Document analyzed successfully',
      result
    ));
    
  } catch (error) {
    console.error('Document analysis error:', error);
    res.status(500).json(responseFormatter.error(
      'Document analysis failed',
      error.message
    ));
  }
};

module.exports = {
  analyze: [uploadDocument, analyze]
};
