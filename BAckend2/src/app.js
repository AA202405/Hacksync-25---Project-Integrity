import express from "express";

/* Feature routes */
import documentRoutes from "./features/document-analysis/routes.js";
import visualEvidenceRoutes from "./features/visual-evidence/routes.js";
// filteringRoutes will be added later
// agenticAuditRoutes will be added later

const app = express();

/* Global middleware */
app.use(express.json());

/* Feature mounting */
app.use("/api/documents", documentRoutes);
app.use("/api/visual-evidence", visualEvidenceRoutes);

/* Global health check */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "Unified Backend" });
});

export default app;
