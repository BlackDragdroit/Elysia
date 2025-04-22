const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  reward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
});

module.exports = mongoose.model("Achievement", Schema);
