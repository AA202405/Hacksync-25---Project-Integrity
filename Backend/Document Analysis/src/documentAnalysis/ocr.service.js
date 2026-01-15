import { exec } from "child_process";

export const runOCR = (filePath) => {
  return new Promise((resolve, reject) => {
    // Tesseract command: input file -> stdout
    exec(`tesseract "${filePath}" stdout`, (error, stdout, stderr) => {
      if (error) {
        console.error("OCR error:", error);
        reject("OCR failed");
      } else {
        resolve(stdout);
      }
    });
  });
};
