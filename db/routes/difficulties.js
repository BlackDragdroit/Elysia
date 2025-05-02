const express = require("express");
const Difficulty = require("../models/Difficulty");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { label, xp, rewardId } = req.body;
    await Difficulty.create({ label, xp, rewardId });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
