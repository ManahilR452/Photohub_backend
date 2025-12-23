import express from "express";
import multer from "multer";
import Photo from "../models/photoModel.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });


// ===============================
// 📌 GET ALL PHOTOS (FOR GALLERY)
// ===============================
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadedAt: -1 });
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch photos" });
  }
});


// ===============================
// 📌 UPLOAD PHOTO
// ===============================
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const { country, category, uploadedBy, uploaderName } = req.body;

    if (!country || !category || !uploadedBy || !uploaderName) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newPhoto = new Photo({
      imageUrl: `/uploads/${req.file.filename}`,
      country,
      category,
      uploadedBy,
      uploaderName,
    });

    await newPhoto.save();

    res.status(201).json({
      message: "Photo uploaded successfully",
      photo: newPhoto,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});


// ===============================
// 📌 DELETE PHOTO
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete photo" });
  }
});

export default router;
