// routes/contact.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact - submit contact form
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully", contact: newContact });
  } catch (err) {
    console.error("Contact submission error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

export default router;
