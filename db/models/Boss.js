const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

module.exports = mongoose.model("Boss", Schema);
