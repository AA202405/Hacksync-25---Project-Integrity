const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const verifyEvidence = async (filename, imageBuffer = null) => {
  // Simulate processing delay (3-4 seconds)
  const delayMs = 3000 + Math.random() * 1000;
  await delay(delayMs);
  
  // Mock EXIF data
  const exifData = {
    timestamp: new Date().toISOString(),
    gps: {
      latitude: 19.1136 + (Math.random() - 0.5) * 0.1,
      longitude: 72.8697 + (Math.random() - 0.5) * 0.1
    },
    camera: {
      make: 'Samsung',
      model: 'Galaxy S21',
      iso: 200,
      aperture: 'f/2.2',
      shutter_speed: '1/120s'
    }
  };
  
  // Mock tampering analysis
  const tamperingAnalysis = {
    authenticity_score: 88 + Math.floor(Math.random() * 9), // 88-97%
    manipulation_detected: Math.random() > 0.7, // 30% chance
    analysis_details: {
      compression_consistency: 'Normal',
      metadata_integrity: 'Intact',
      pixel_analysis: 'No anomalies detected',
      format_validation: 'Valid'
    }
  };
  
  // Mock issue detection based on filename patterns
  let issueType = 'Pothole';
  let severity = 'Medium';
  let confidence = 88 + Math.floor(Math.random() * 9);
  
  const lowerFilename = filename.toLowerCase();
  if (lowerFilename.includes('crack')) {
    issueType = 'Crack';
    severity = 'Low';
  } else if (lowerFilename.includes('water') || lowerFilename.includes('drain')) {
    issueType = 'Water Logging';
    severity = 'High';
  } else if (lowerFilename.includes('incomplete')) {
    issueType = 'Incomplete Work';
    severity = 'Medium';
  } else if (lowerFilename.includes('structural') || lowerFilename.includes('damage')) {
    issueType = 'Structural Damage';
    severity = 'High';
  } else if (lowerFilename.includes('pothole')) {
    issueType = 'Pothole';
    severity = Math.random() > 0.5 ? 'High' : 'Medium';
  }
  
  const issueDetection = {
    issue_type: issueType,
    severity: severity,
    confidence: confidence,
    description: `Detected ${issueType.toLowerCase()} with ${severity.toLowerCase()} severity`,
    location_identified: true,
    quality_indicators: {
      surface_condition: severity === 'High' ? 'Poor' : 'Moderate',
      material_quality: 'Requires review',
      workmanship: 'Needs verification'
    }
  };
  
  return {
    exif_data: exifData,
    tampering_analysis: tamperingAnalysis,
    issue_detection: issueDetection,
    processing_time: (delayMs / 1000).toFixed(2),
    filename: filename
  };
};

module.exports = { verifyEvidence };
