const express = require("express");
const Achievement = require("../models/Achievement");
const UserAchievement = require("../models/UserAchievement");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, icon, xp, rewardId } = req.body;
    const achievement = await Achievement.create({
      title,
      description,
      icon,
      xp,
      rewardId,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
    console.log(`Gathered ${achievements.length} Achievements`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userAchievements = await UserAchievement.find({
      userId: req.params.userId,
    });

    const achievementIDs = userAchievements.map((ua) => ua.achievementId);

    const achievements = await Achievement.find({
      _id: { $in: achievementIDs },
    });
    res.status(200).json(achievements);

    console.log(
      `Fetched ${achievements.length} achievements for user ${req.params.userId}`
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/mapUserAchievement", async (req, res) => {
  try {
    const { userID, achievementID } = req.body;

    await UserAchievement.create({
      userId: userID,
      achievementId: achievementID,
    });

    res.status(201).json({ success: true });
    console.log(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
