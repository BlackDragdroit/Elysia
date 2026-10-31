const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
});

stepSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

const bossSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    dueDate: { type: Date, default: null },
    steps: { type: [stepSchema], default: [] },
    defeated: { type: Boolean, default: false },
    defeatedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

bossSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.userId;
    delete ret.updatedAt;
    return ret;
  },
});

module.exports = mongoose.model("Boss", bossSchema);
