jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

const AsyncStorage = require("@react-native-async-storage/async-storage");
const store = require("../services/localStore");

beforeEach(async () => {
  await AsyncStorage.clear();
  store._resetCache();
});

test("create + complete quest persists across a fresh store instance", async () => {
  const quest = await store.createQuest({
    title: "Write tests",
    type: "core",
    difficulty: "medium",
    dueDate: null,
  });
  expect(quest.id).toBeTruthy();

  // Simulate an app restart.
  store._resetCache();
  const quests = await store.listQuests();
  expect(quests).toHaveLength(1);
  expect(quests[0].title).toBe("Write tests");
  expect(quests[0].completed).toBe(false);

  const outcome = await store.completeQuest(quest.id);
  expect(outcome.xpGained).toBeGreaterThanOrEqual(300);
  expect(outcome.totalXP).toBeGreaterThanOrEqual(300);

  store._resetCache();
  const [after] = await store.listQuests();
  expect(after.completed).toBe(true);
  const profile = await store.getProfile();
  expect(profile.stats.questsCompleted).toBe(1);
  expect(profile.totalXP).toBeGreaterThanOrEqual(300);

  // Completing twice is rejected.
  await expect(store.completeQuest(quest.id)).rejects.toMatchObject({
    code: "ALREADY_COMPLETED",
  });
});

test("boss flow: create, complete steps, defeat", async () => {
  const boss = await store.createBoss({
    title: "Learn Spanish",
    dueDate: null,
    steps: ["vocab", "grammar", "speak"],
  });
  expect(boss.steps).toHaveLength(3);

  // Bosses need at least 2 steps.
  await expect(
    store.createBoss({ title: "x", steps: ["only"] })
  ).rejects.toMatchObject({ code: "VALIDATION" });

  const r1 = await store.completeBossStep(boss.id, boss.steps[0].id);
  expect(r1.xpGained).toBe(150);

  await store.completeBossStep(boss.id, boss.steps[1].id);
  const r3 = await store.completeBossStep(boss.id, boss.steps[2].id);
  // 150 step XP + 1000 defeat bonus + 250 dragon_slayer achievement
  expect(r3.xpGained).toBe(150 + 1000 + 250);
  expect(r3.rewards.length).toBeGreaterThanOrEqual(2); // guaranteed drop + title reward
  expect(r3.unlockedAchievements.some((a) => a.id === "dragon_slayer")).toBe(true);

  store._resetCache();
  const [saved] = await store.listBosses();
  expect(saved.defeated).toBe(true);
  expect(saved.steps.every((s) => s.completed)).toBe(true);
  const profile = await store.getProfile();
  expect(profile.stats.bossesDefeated).toBe(1);
});

test("inventory and achievements stay in sync", async () => {
  const achievements = await store.listAchievements();
  expect(achievements.length).toBeGreaterThanOrEqual(9);
  expect(achievements.every((a) => !a.unlocked)).toBe(true);

  const inventory = await store.listInventory();
  expect(inventory).toHaveLength(0);
});
