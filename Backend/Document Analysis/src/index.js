import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "../server.js";

dotenv.config();

// Connect to MongoDB
connectDB();
