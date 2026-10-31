const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    usernameLower: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, default: "" },
    totalXP: { type: Number, default: 0 },
    stats: {
      questsCompleted: { type: Number, default: 0 },
      epicQuestsCompleted: { type: Number, default: 0 },
      bossesDefeated: { type: Number, default: 0 },
    },
    equipped: {
      icon: { type: String, default: "person-standing" },
      title: { type: String, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
