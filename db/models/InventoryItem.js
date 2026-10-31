const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    equipped: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model("InventoryItem", schema);
