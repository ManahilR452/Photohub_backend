// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db.js";           // Your MongoDB connection
import authRoutes from "./routes/auth.js"; // Authentication routes
import contactRoutes from "./routes/contact.js"; // Contact routes
import photoRoutes from "./routes/photoRoutes.js"; // Photo upload routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// For ES Modules: get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder (for images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/photos", photoRoutes);

// Root route for testing
app.get("/", (req, res) => res.send("✅ Server is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
