import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    extractedData: {
      projectName: {
        type: String,
      },
      budget: {
        type: Number,
      },
      contractor: {
        type: String,
      },
      location: {
        type: String,
      },
    },

    missingFields: {
      type: [String],
      default: [],
    },

    confidence: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "low",
    },

    rawText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
