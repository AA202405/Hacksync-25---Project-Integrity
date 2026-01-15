const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const { getMockExtraction } = require('./mockData');

const analyzeDocument = async (filename, documentType) => {
  // Simulate OCR processing delay (4-6 seconds)
  const delayMs = 4000 + Math.random() * 2000;
  await delay(delayMs);
  
  // Get mock extraction based on filename
  const extraction = getMockExtraction(filename, documentType);
  
  // Build extracted fields
  const extractedFields = [
    {
      label: 'Project Name',
      value: extraction.project_name,
      confidence: extraction.confidence_scores.project_name,
      editable: false
    },
    {
      label: 'Sanctioned Budget',
      value: extraction.budget,
      confidence: extraction.confidence_scores.budget,
      editable: false
    },
    {
      label: 'Contractor',
      value: extraction.contractor,
      confidence: extraction.confidence_scores.contractor,
      editable: false
    },
    {
      label: 'Project Location',
      value: extraction.location,
      confidence: extraction.confidence_scores.location,
      editable: true
    },
    {
      label: 'Expected Completion',
      value: extraction.dates,
      confidence: extraction.confidence_scores.dates,
      editable: true
    }
  ];
  
  // Add document-specific fields
  if (extraction.completion_status) {
    extractedFields.push({
      label: 'Completion Status',
      value: extraction.completion_status,
      confidence: extraction.confidence_scores.completion_status,
      editable: false
    });
  }
  
  if (extraction.inspection_status) {
    extractedFields.push({
      label: 'Inspection Status',
      value: extraction.inspection_status,
      confidence: extraction.confidence_scores.inspection_status,
      editable: false
    });
  }
  
  // Processing steps
  const processingSteps = [
    'Document uploaded and validated',
    'OCR processing initiated',
    'Text extraction completed',
    'Field identification using AI models',
    'Confidence scoring applied',
    'Data validation and formatting',
    'Extraction completed'
  ];
  
  return {
    extracted_fields: extractedFields,
    processing_steps: processingSteps,
    processing_time: (delayMs / 1000).toFixed(2),
    document_type: documentType,
    filename: filename
  };
};

module.exports = { analyzeDocument };
