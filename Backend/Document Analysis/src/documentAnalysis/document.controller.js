import Document from "./document.model.js";
import { runOCR } from "./ocr.service.js";
import { cleanText } from "./textCleaner.js";
import { extractInfo } from "./llm.service.js";

export const analyzeDocument = async (req, res) => {
  try {
    // 1. File check
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;

    // 2. OCR: file -> raw text
    const rawText = await runOCR(file.path);

    // 3. Clean OCR text
    const cleanedText = cleanText(rawText);

    // 4. LLM extraction
    const extractedData = await extractInfo(cleanedText);

    // 5. Validate extracted fields
    const requiredFields = ["projectName", "budget", "contractor", "location"];
    const missingFields = [];

    requiredFields.forEach((field) => {
      if (!extractedData || !extractedData[field]) {
        missingFields.push(field);
      }
    });

    let confidence = "high";
    if (missingFields.length > 2) confidence = "low";
    else if (missingFields.length > 0) confidence = "medium";

    // 6. Save to database (will work once MongoDB is connected)
    const document = new Document({
      fileName: file.originalname,
      fileType: file.mimetype,
      extractedData,
      missingFields,
      confidence,
      rawText,
    });

    await document.save();

    // 7. Response
    res.status(200).json({
      message: "Document analyzed successfully",
      data: document,
    });
  } catch (error) {
    console.error("Document analysis error:", error);
    res.status(500).json({ error: "Document analysis failed" });
  }
};
