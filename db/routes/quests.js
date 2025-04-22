const express = require("express");
const Quest = require("../models/Quest");

const router = express.Router();

// Create a task
router.post("/", async (req, res) => {
  try {
    const { userId, title } = req.body;
    const quest = await Quest.create({ userId, title });
    res.status(201).json(quest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for a user
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Quest.find({ userId: req.params.userId });
    res.json(tasks);
    console.log(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
