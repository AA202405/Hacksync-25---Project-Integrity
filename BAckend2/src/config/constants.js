/* =========================
   PROJECT CONSTANTS
   ========================= */

export const PROJECT_STATUS = {
  COMPLETED: "Completed",
  ONGOING: "Ongoing"
};

/* =========================
   ISSUE & DEFECT TYPES
   (Visual Evidence + Agentic Audit)
   ========================= */

export const ISSUE_TYPES = {
  POTHOLE: "Pothole",
  POTHOLE_REAPPEARED: "Pothole reappeared after repair",
  CRACK: "Crack",
  MINOR_CRACK: "Minor Crack",
  UNEVEN_SURFACE: "Uneven Surface",
  UNEVEN_PATCHWORK: "Uneven patchwork",
  WATER_LOGGING: "Water Logging / Poor Drainage",
  DRAINAGE_UNFINISHED: "Drainage work unfinished",
  INCOMPLETE_RESURFACING: "Incomplete Resurfacing",
  FOOTPATH_DAMAGE: "Footpath uneven and unsafe",
  FOOTPATH_TILES_BROKEN: "Footpath tiles broken",
  STREETLIGHT_NOT_WORKING: "Streetlight not working",
  CONSTRUCTION_DEBRIS: "Construction debris not cleared",
  LOOSE_GRAVEL: "Loose gravel on road",
  BARRICADES_LEFT: "Barricades left on road",
  POOR_QUALITY_REPAIR: "Poor quality pothole filling"
};

/* =========================
   SEVERITY LEVELS
   ========================= */

export const SEVERITY_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High"
};

/* =========================
   AGENTIC AUDIT CONSTANTS
   ========================= */

export const AUDIT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  FLAGGED: "flagged"
};

export const AUDIT_VERDICTS = {
  COMPLIANT: "COMPLIANT",
  PARTIALLY_COMPLIANT: "PARTIALLY_COMPLIANT",
  NON_COMPLIANT: "NON_COMPLIANT"
};

export const RISK_LEVELS = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH"
};

/* =========================
   FILE UPLOAD CONSTRAINTS
   ========================= */

export const FILE_LIMITS = {
  MAX_IMAGE_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png"]
};

/* =========================
   API RESPONSE CONSTANTS
   ========================= */

export const RESPONSE_STATUS = {
  SUCCESS: "success",
  ERROR: "error"
};

/* =========================
   GENERAL APP CONSTANTS
   ========================= */

export const API_PREFIX = "/api";
