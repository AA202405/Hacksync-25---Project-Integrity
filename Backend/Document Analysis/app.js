import express from "express";
import documentRoutes from "./src/documentAnalysis/document.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/documents", documentRoutes);

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("Document Analysis Backend is running");
});

export default app;
