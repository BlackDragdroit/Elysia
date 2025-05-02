const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  rewardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
});

module.exports = mongoose.model("Difficulty", Schema);
