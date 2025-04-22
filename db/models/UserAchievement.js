const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    achievementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievement",
      required: true,
    },
  },
  { timestamps: true }
);

Schema.index({ userId: 1, achievementId: 1 }, { unique: true });

module.exports = mongoose.model("UserAchievement", Schema);
