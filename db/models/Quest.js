const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    difficultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Difficulty",
      required: true,
    },
    title: String,
    completed: {
      type: Boolean,
      default: false,
    },
    reward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quest", Schema);
