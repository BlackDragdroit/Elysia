const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create a task
router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for a user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
