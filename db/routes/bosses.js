const express = require("express");
const Boss = require("../models/Boss");
const Step = require("../models/Step");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, title, rewardId } = req.body;
    const boss = await Boss.create({ userId, title, rewardId });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const bosses = await Boss.find({ userId: req.params.userId });
    res.status(200).json(bosses);
    console.log(
      `Fetched ${bosses.length} bosses for user ${req.params.userId}`
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/createStep", async (req, res) => {
  try {
    const { bossId, text, orderNum } = req.body;
    await Step.create({ bossId, text, orderNum });
    res.status.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
