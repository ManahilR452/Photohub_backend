import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  const user = await User.create({
    name: "Test User",
    email: "test@test.com",
    password: "123"
  });

  res.json(user);
});

export default router;
