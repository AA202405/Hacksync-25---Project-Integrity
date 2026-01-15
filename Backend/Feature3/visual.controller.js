import { extractMetadata } from "./exif.service.js";
import { analyzeImageMock } from "./visual.service.js";
import { saveEvidence } from "./image.model.js";

export const uploadEvidence = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const metadata = extractMetadata(imagePath);
    const analysis = analyzeImageMock();

    const evidence = {
      issue_type: analysis.issue_type,
      severity: analysis.severity,
      location: metadata.location,
      timestamp: metadata.timestamp,
      confidence: analysis.confidence,
      model_used: "model_placeholder",
      source: "citizen_uploaded_image"
    };

    saveEvidence(evidence);

    res.status(200).json(evidence);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
