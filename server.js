import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import photoRoutes from "./routes/photoRoutes.js";

const app = express();

/* =========================
   CONNECT DATABASE
========================= */
connectDB();

/* =========================
   MIDDLEWARE
========================= */

// CORS (VERY IMPORTANT for Vercel)

app.use(
  cors({
    origin: [
      "https://photohubfrontend-manahilr452s-projects.vercel.app",
      "http://localhost:5173",  // ✅ Add this for local development
      "http://localhost:5174"   // ✅ Backup port
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ES MODULE __dirname FIX
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   STATIC FILES (IMAGES)
========================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/photos", photoRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.status(200).send("✅ PhotoHub Backend is running");
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
