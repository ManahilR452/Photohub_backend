import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user", "name");
  res.json(posts);
});

export default router;
