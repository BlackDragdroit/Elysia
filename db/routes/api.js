const express = require("express");
const rules = require("../../shared/gameRules");
const Quest = require("../models/Quest");
const Boss = require("../models/Boss");
const {
  loadUserState,
  persistUserState,
  profileResponse,
  inventoryResponse,
} = require("../lib/state");

const router = express.Router();

// ---- Profile -------------------------------------------------------------

router.get("/profile", async (req, res, next) => {
  try {
    const { state } = await loadUserState(req.userId);
    res.json(profileResponse(state));
  } catch (err) {
    next(err);
  }
});

router.patch("/profile", async (req, res, next) => {
  try {
    const { displayName } = req.body || {};
    if (displayName !== undefined && !String(displayName).trim()) {
      return res.status(400).json({ error: "Display name cannot be empty" });
    }
    const { user, docs, state } = await loadUserState(req.userId);
    if (displayName !== undefined) state.profile.displayName = String(displayName).trim();
    await persistUserState(req.userId, docs, state);
    res.json(profileResponse(state));
  } catch (err) {
    next(err);
  }
});

// ---- Quests ---------------------------------------------------------------

router.get("/quests", async (req, res, next) => {
  try {
    const quests = await Quest.find({ userId: req.userId });
    res.json(quests.map((q) => q.toJSON()));
  } catch (err) {
    next(err);
  }
});

router.post("/quests", async (req, res, next) => {
  try {
    const data = rules.buildQuest(req.body || {});
    const quest = await Quest.create({ userId: req.userId, ...data, dueDate: data.dueDate });
    res.status(201).json(quest.toJSON());
  } catch (err) {
    next(err);
  }
});

router.post("/quests/:id/complete", async (req, res, next) => {
  try {
    const quest = await Quest.findOne({ _id: req.params.id, userId: req.userId });
    if (!quest) return res.status(404).json({ error: "Quest not found" });
    const { user, docs, state } = await loadUserState(req.userId);
    const { outcome } = rules.completeQuest(state, req.params.id, { rng: req.app.get("rng") });
    await persistUserState(req.userId, docs, state);
    const updated = state.quests.find((q) => q.id === req.params.id);
    res.json({ quest: updated, outcome });
  } catch (err) {
    next(err);
  }
});

router.delete("/quests/:id", async (req, res, next) => {
  try {
    const result = await Quest.deleteOne({ _id: req.params.id, userId: req.userId });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Quest not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ---- Bosses ---------------------------------------------------------------

router.get("/bosses", async (req, res, next) => {
  try {
    const bosses = await Boss.find({ userId: req.userId });
    res.json(bosses.map((b) => b.toJSON()));
  } catch (err) {
    next(err);
  }
});

router.post("/bosses", async (req, res, next) => {
  try {
    const data = rules.buildBoss(req.body || {});
    const boss = await Boss.create({
      userId: req.userId,
      title: data.title,
      dueDate: data.dueDate,
      steps: data.steps,
    });
    res.status(201).json(boss.toJSON());
  } catch (err) {
    next(err);
  }
});

router.post("/bosses/:id/steps/:stepId/complete", async (req, res, next) => {
  try {
    const boss = await Boss.findOne({ _id: req.params.id, userId: req.userId });
    if (!boss) return res.status(404).json({ error: "Boss not found" });
    const { docs, state } = await loadUserState(req.userId);
    const { outcome } = rules.completeBossStep(state, req.params.id, req.params.stepId, { rng: req.app.get("rng") });
    await persistUserState(req.userId, docs, state);
    const updated = state.bosses.find((b) => b.id === req.params.id);
    res.json({ boss: updated, outcome });
  } catch (err) {
    next(err);
  }
});

router.delete("/bosses/:id", async (req, res, next) => {
  try {
    const result = await Boss.deleteOne({ _id: req.params.id, userId: req.userId });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Boss not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ---- Achievements ---------------------------------------------------------

router.get("/achievements", async (req, res, next) => {
  try {
    const { state } = await loadUserState(req.userId);
    res.json(rules.listAchievements(state));
  } catch (err) {
    next(err);
  }
});

// ---- Inventory ------------------------------------------------------------

router.get("/inventory", async (req, res, next) => {
  try {
    const { state } = await loadUserState(req.userId);
    res.json(inventoryResponse(state));
  } catch (err) {
    next(err);
  }
});

router.post("/inventory/:itemId/use", async (req, res, next) => {
  try {
    const { docs, state } = await loadUserState(req.userId);
    const { outcome } = rules.useItem(state, req.params.itemId, { rng: req.app.get("rng") });
    await persistUserState(req.userId, docs, state);
    res.json({ inventory: inventoryResponse(state), outcome });
  } catch (err) {
    next(err);
  }
});

router.post("/inventory/:itemId/equip", async (req, res, next) => {
  try {
    const { docs, state } = await loadUserState(req.userId);
    const { outcome } = rules.equipItem(state, req.params.itemId, { rng: req.app.get("rng") });
    await persistUserState(req.userId, docs, state);
    res.json({ inventory: inventoryResponse(state), equipped: state.profile.equipped, outcome });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
