import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  uploaderName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },           // ← ADD THIS
  likedBy: { type: [String], default: [] },      // ← ADD THIS
});

const Photo = mongoose.model("Photo", photoSchema);
export default Photo;