{
  _id: ObjectId;
  imageUrl: String;
  country: String;
  category: String;
  uploaderName: String;
  createdAt: Date;       // ← IMPORTANT: Auto-set on upload
  likes: Number;       // ← IMPORTANT: Default 0, increment on like
  likedBy: [String]       // ← OPTIONAL: Track who liked (prevent double-liking)
}