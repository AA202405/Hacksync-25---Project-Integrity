// cv.service.js
import { execFile } from "child_process";

export const analyzeImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    execFile(
      "python",
      ["yolo_infer.py", imagePath],
      (error, stdout) => {
        if (error) reject(error);
        else resolve(JSON.parse(stdout));
      }
    );
  });
};
