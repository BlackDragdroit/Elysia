const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  bossId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Boss",
    require: true,
  },
  text: String,
  orderNum: Number,
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Step", Schema);
