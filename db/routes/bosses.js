const express = require("express");
const Boss = require("../models/Boss");

const router = express.Router();

// Create a task
router.post("/", async (req, res) => {
  try {
    const { userId, title, rewardId } = req.body;
    const boss = await Boss.create({ userId, title, rewardId });
    res.status(201).json(boss);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for a user
router.get("/:userId", async (req, res) => {
  try {
    const bosses = await Boss.find({ userId: req.params.userId });
    res.json(bosses);
    console.log(
      `Fetched ${bosses.length} bosses for user ${req.params.userId}`
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
