const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/createUser/:firebaseId", async (req, res) => {
  try {
    const firebaseId = req.params.firebaseId;
    await User.create({ firebaseId });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getUser/:firebaseId", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.params.firebaseId });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
