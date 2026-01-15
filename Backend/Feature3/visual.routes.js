import express from "express";
import multer from "multer";
import { uploadEvidence } from "./visual.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/images/" });

router.post("/upload", upload.single("image"), uploadEvidence);

export default router;
