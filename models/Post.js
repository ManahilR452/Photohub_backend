import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption: String,
    imageUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
