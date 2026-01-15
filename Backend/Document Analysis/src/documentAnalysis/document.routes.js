import express from "express";
import multer from "multer";
import { analyzeDocument } from "./document.controller.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route: upload & analyze document
router.post("/upload", upload.single("file"), analyzeDocument);

export default router;
