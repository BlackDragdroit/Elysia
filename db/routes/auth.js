const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { loadUserState, profileResponse } = require("../lib/state");

const router = express.Router();

const signToken = (userId) =>
  jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, { expiresIn: "30d" });

async function profileFor(userId) {
  const { state } = await loadUserState(userId);
  return profileResponse(state);
}

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, displayName } = req.body || {};
    if (!username || !String(username).trim()) {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!password || String(password).length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    const usernameLower = String(username).trim().toLowerCase();
    const existing = await User.findOne({ usernameLower });
    if (existing) {
      return res.status(409).json({ error: "Username already taken" });
    }
    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await User.create({
      username: String(username).trim(),
      usernameLower,
      passwordHash,
      displayName: displayName ? String(displayName).trim() : String(username).trim(),
    });
    res.status(201).json({ token: signToken(user._id), profile: await profileFor(user._id) });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    const user = await User.findOne({ usernameLower: String(username).trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(String(password), user.passwordHash))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json({ token: signToken(user._id), profile: await profileFor(user._id) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
