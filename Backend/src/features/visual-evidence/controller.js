const { uploadImage } = require('../../middleware/uploadConfig');
const { verifyEvidence } = require('./service');
const responseFormatter = require('../../utils/responseFormatter');

const verify = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(responseFormatter.error(
        'No image uploaded',
        'Please upload an image file'
      ));
    }
    
    const filename = req.file.originalname;
    
    // Verify evidence (using filename for mock processing)
    const result = await verifyEvidence(filename, null);
    
    res.json(responseFormatter.success(
      'Evidence verified successfully',
      result
    ));
    
  } catch (error) {
    console.error('Evidence verification error:', error);
    res.status(500).json(responseFormatter.error(
      'Evidence verification failed',
      error.message
    ));
  }
};

module.exports = {
  verify: [uploadImage, verify]
};
