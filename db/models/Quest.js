const mongoose = require("mongoose");

const questSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    type: { type: String, enum: ["core", "optional"], default: "core" },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "epic"],
      default: "easy",
    },
    dueDate: { type: Date, default: null },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

questSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    delete ret.updatedAt;
    return ret;
  },
});

module.exports = mongoose.model("Quest", questSchema);
