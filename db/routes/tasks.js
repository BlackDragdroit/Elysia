const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create a task
router.post("/", async (req, res) => {
  try {
    const { userId, title } = req.body;
    const task = await Task.create({ userId, title });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for a user
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
    console.log(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
