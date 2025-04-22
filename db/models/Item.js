const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["consumable", "equipment", "misc"],
      required: true,
    },
    description: String,
    icon: String,
    effect: {
      type: Object,
      default: {},
    },
    stackable: { type: Boolean, default: true },
    value: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
