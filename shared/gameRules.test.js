const test = require("node:test");
const assert = require("node:assert/strict");
const rules = require("./gameRules");

const {
  levelInfo,
  newUserState,
  buildQuest,
  buildBoss,
  completeQuest,
  completeBossStep,
  useItem,
  equipItem,
  listAchievements,
  ITEMS,
} = rules;

const seq = (values) => {
  let i = 0;
  return () => values[Math.min(i++, values.length - 1)];
};

function stateWithQuest(quest = {}, profile = {}) {
  const state = newUserState({ displayName: "Tester" });
  Object.assign(state.profile, profile);
  const q = { id: "q1", ...buildQuest({ title: "Do a thing", ...quest }) };
  state.quests.push(q);
  return { state, quest: q };
}

test("levelInfo boundaries", () => {
  assert.deepEqual(levelInfo(0), { level: 1, xpIntoLevel: 0, xpForNext: 1000 });
  assert.deepEqual(levelInfo(999), { level: 1, xpIntoLevel: 999, xpForNext: 1000 });
  assert.deepEqual(levelInfo(1000), { level: 2, xpIntoLevel: 0, xpForNext: 1250 });
  assert.deepEqual(levelInfo(2249), { level: 2, xpIntoLevel: 1249, xpForNext: 1250 });
  assert.deepEqual(levelInfo(2250), { level: 3, xpIntoLevel: 0, xpForNext: 1500 });
  // 1000+1250+1500+1750 = 5500 -> level 5
  assert.deepEqual(levelInfo(5500), { level: 5, xpIntoLevel: 0, xpForNext: 2000 });
});

test("optional quest gives 50% XP (rounded)", () => {
  const { state } = stateWithQuest({ difficulty: "easy", type: "optional" });
  const { outcome } = completeQuest(state, "q1", { rng: () => 0.99 });
  assert.equal(outcome.xpGained - 50, outcome.unlockedAchievements.reduce((s, a) => s + a.xp, 0));
  // easy optional = round(100 * 0.5) = 50 XP base
  assert.equal(state.quests[0].completed, true);
});

test("hard optional quest gives 250 XP", () => {
  const { state } = stateWithQuest({ difficulty: "hard", type: "optional" });
  const { outcome } = completeQuest(state, "q1", { rng: () => 0.99 });
  // 250 base + 50 for first_quest achievement
  assert.equal(outcome.xpGained, 300);
});

test("completing a quest twice is rejected", () => {
  const { state } = stateWithQuest({ difficulty: "easy" });
  completeQuest(state, "q1", { rng: () => 0.99 });
  assert.throws(() => completeQuest(state, "q1"), (e) => e.code === "ALREADY_COMPLETED");
});

test("completing an unknown quest throws NOT_FOUND", () => {
  const state = newUserState();
  assert.throws(() => completeQuest(state, "nope"), (e) => e.code === "NOT_FOUND");
});

test("boss defeat gives step XP + 1000 bonus + guaranteed drop on last step", () => {
  const state = newUserState({ displayName: "T" });
  const boss = {
    id: "b1",
    ...buildBoss({ title: "Big Boss", steps: ["step one", "step two"] }),
  };
  boss.steps = boss.steps.map((s, i) => ({ ...s, id: `s${i}` }));
  state.bosses.push(boss);

  const r1 = completeBossStep(state, "b1", "s0", { rng: () => 0.5 });
  assert.equal(r1.outcome.xpGained, 150);
  assert.equal(boss.defeated, false);

  const r2 = completeBossStep(state, "b1", "s1", { rng: () => 0 });
  // 150 step + 1000 bonus + 250 dragon_slayer achievement XP
  assert.equal(r2.outcome.xpGained, 150 + 1000 + 250);
  assert.equal(boss.defeated, true);
  assert.equal(state.profile.stats.bossesDefeated, 1);
  // guaranteed drop: rng() = 0 -> ITEMS[0], plus achievement reward title_boss_slayer
  const rewardIds = r2.outcome.rewards.map((r) => r.id);
  assert.ok(rewardIds.includes(ITEMS[0].id));
  assert.ok(rewardIds.includes("title_boss_slayer"));
});

test("defeated boss rejects further completions", () => {
  const state = newUserState();
  const boss = { id: "b1", ...buildBoss({ title: "B", steps: ["a", "b"] }) };
  boss.steps = boss.steps.map((s, i) => ({ ...s, id: `s${i}` }));
  state.bosses.push(boss);
  completeBossStep(state, "b1", "s0");
  completeBossStep(state, "b1", "s1");
  assert.throws(() => completeBossStep(state, "b1", "s0"), (e) => e.code === "ALREADY_COMPLETED");
});

test("achievement cascade: achievement XP pushes level that unlocks level achievement", () => {
  const { state } = stateWithQuest(
    { difficulty: "easy", type: "core" },
    { totalXP: 5300, stats: { questsCompleted: 9, epicQuestsCompleted: 0, bossesDefeated: 0 } }
  );
  const { outcome } = completeQuest(state, "q1", { rng: () => 0.99 });
  const ids = outcome.unlockedAchievements.map((a) => a.id);
  assert.ok(ids.includes("dedicator")); // 10th quest -> +200 XP -> level 5
  assert.ok(ids.includes("level_5")); // level 5 reached in the same action
  assert.ok(outcome.levelAfter >= 5);
});

test("deterministic loot with stubbed rng", () => {
  const { state } = stateWithQuest({ difficulty: "hard" });
  const expected = ITEMS[Math.floor(0.5 * ITEMS.length)];
  const { outcome } = completeQuest(state, "q1", { rng: seq([0.1, 0.5]) });
  const drops = outcome.rewards.filter((r) => !r.id.startsWith("title_"));
  assert.equal(drops[0].id, expected.id);
});

test("no drop when rng roll exceeds chance", () => {
  const { state } = stateWithQuest({ difficulty: "medium" });
  const { outcome } = completeQuest(state, "q1", { rng: () => 0.99 });
  assert.equal(outcome.rewards.length, 0);
});

test("easy quests never drop", () => {
  const { state } = stateWithQuest({ difficulty: "easy" });
  const { outcome } = completeQuest(state, "q1", { rng: () => 0 });
  assert.equal(outcome.rewards.length, 0);
});

test("useItem consumes quantity and grants XP", () => {
  const state = newUserState();
  state.inventory.push({ itemId: "xp_potion", quantity: 2, equipped: false });
  const { outcome } = useItem(state, "xp_potion");
  assert.equal(outcome.xpGained, 250);
  assert.equal(state.profile.totalXP, 250);
  assert.equal(state.inventory.find((e) => e.itemId === "xp_potion").quantity, 1);
  useItem(state, "xp_potion");
  assert.equal(state.inventory.find((e) => e.itemId === "xp_potion"), undefined);
  assert.throws(() => useItem(state, "xp_potion"), (e) => e.code === "NOT_FOUND");
});

test("equipItem sets equipped slot and unequips same-slot items", () => {
  const state = newUserState();
  state.inventory.push(
    { itemId: "icon_shield", quantity: 1, equipped: false },
    { itemId: "icon_crown", quantity: 1, equipped: false }
  );
  equipItem(state, "icon_shield");
  assert.equal(state.profile.equipped.icon, "shield");
  equipItem(state, "icon_crown");
  assert.equal(state.profile.equipped.icon, "crown");
  assert.equal(state.inventory.find((e) => e.itemId === "icon_shield").equipped, false);
  assert.equal(state.inventory.find((e) => e.itemId === "icon_crown").equipped, true);
});

test("buildBoss requires at least 2 non-empty steps", () => {
  assert.throws(() => buildBoss({ title: "x", steps: ["only"] }), (e) => e.code === "VALIDATION");
  assert.throws(() => buildBoss({ title: "x", steps: ["", "  "] }), (e) => e.code === "VALIDATION");
  const b = buildBoss({ title: "x", steps: ["", "a", "b"] });
  assert.equal(b.steps.length, 2);
});

test("listAchievements returns full catalog with unlocked flags", () => {
  const state = newUserState();
  const list = listAchievements(state);
  assert.equal(list.length, rules.ACHIEVEMENTS.length);
  assert.ok(list.every((a) => a.unlocked === false));
  state.achievements.push({ id: "first_quest", unlockedAt: "2025-01-01T00:00:00.000Z" });
  assert.equal(listAchievements(state).find((a) => a.id === "first_quest").unlocked, true);
});
