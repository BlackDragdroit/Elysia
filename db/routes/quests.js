const express = require("express");
const Quest = require("../models/Quest");

const router = express.Router();

// Create a quest
router.post("/", async (req, res) => {
  try {
    const { userId, title } = req.body;
    await Quest.create({ userId, title });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all quests for a user
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Quest.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
