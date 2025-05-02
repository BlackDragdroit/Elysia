const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseId: {
      type: String,
      required: true,
    },
    selectedCharacterIcon: {
      type: String,
      default: "person-standing",
    },
    totalXP: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
