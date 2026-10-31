// Shared game rules for Elysia.
// Pure functions + static catalogs used by BOTH the app's local store and the
// self-hosted server, so results are identical in both modes.
// CommonJS, zero dependencies. All randomness goes through an injected `rng`.

const DIFFICULTIES = { easy: 100, medium: 300, hard: 500, epic: 1000 };
const DROP_CHANCES = { easy: 0, medium: 0.1, hard: 0.25, epic: 1 };
const QUEST_TYPES = ["core", "optional"];
const OPTIONAL_XP_FACTOR = 0.5;
const BOSS_STEP_XP = 150;
const BOSS_DEFEAT_BONUS_XP = 1000;
const MIN_BOSS_STEPS = 2;

// XP needed to go from level L to L+1.
const xpForLevelUp = (level) => 1000 + (level - 1) * 250;

function levelInfo(totalXP) {
  let level = 1;
  let remaining = Math.max(0, Math.floor(totalXP || 0));
  let cost = xpForLevelUp(level);
  while (remaining >= cost) {
    remaining -= cost;
    level += 1;
    cost = xpForLevelUp(level);
  }
  return { level, xpIntoLevel: remaining, xpForNext: cost };
}

const ITEMS = [
  {
    id: "xp_potion_small",
    name: "Small XP Potion",
    type: "consumable",
    icon: "flask-conical",
    xp: 100,
    description: "Grants 100 XP when used.",
  },
  {
    id: "xp_potion",
    name: "XP Potion",
    type: "consumable",
    icon: "flask-conical",
    xp: 250,
    description: "Grants 250 XP when used.",
  },
  {
    id: "xp_potion_grand",
    name: "Grand XP Potion",
    type: "consumable",
    icon: "flask-conical",
    xp: 1000,
    description: "Grants 1000 XP when used.",
  },
  {
    id: "icon_shield",
    name: "Guardian Icon",
    type: "equipment",
    slot: "icon",
    icon: "shield",
    value: "shield",
    description: "Equip a shield as your character icon.",
  },
  {
    id: "icon_crown",
    name: "Royal Icon",
    type: "equipment",
    slot: "icon",
    icon: "crown",
    value: "crown",
    description: "Equip a crown as your character icon.",
  },
  {
    id: "icon_flame",
    name: "Flame Icon",
    type: "equipment",
    slot: "icon",
    icon: "flame",
    value: "flame",
    description: "Equip a flame as your character icon.",
  },
  {
    id: "icon_ghost",
    name: "Ghost Icon",
    type: "equipment",
    slot: "icon",
    icon: "ghost",
    value: "ghost",
    description: "Equip a ghost as your character icon.",
  },
  {
    id: "title_quest_novice",
    name: "Title: Quest Novice",
    type: "equipment",
    slot: "title",
    icon: "scroll",
    value: "Quest Novice",
    description: "Equip the title 'Quest Novice'.",
  },
  {
    id: "title_boss_slayer",
    name: "Title: Boss Slayer",
    type: "equipment",
    slot: "title",
    icon: "swords",
    value: "Boss Slayer",
    description: "Equip the title 'Boss Slayer'.",
  },
  {
    id: "title_unstoppable",
    name: "Title: Unstoppable",
    type: "equipment",
    slot: "title",
    icon: "zap",
    value: "Unstoppable",
    description: "Equip the title 'Unstoppable'.",
  },
  {
    id: "title_grandmaster",
    name: "Title: Grandmaster",
    type: "equipment",
    slot: "title",
    icon: "crown",
    value: "Grandmaster",
    description: "Equip the title 'Grandmaster'.",
  },
];

const ITEMS_BY_ID = Object.fromEntries(ITEMS.map((i) => [i.id, i]));

// `check` receives derived stats:
// { questsCompleted, epicQuestsCompleted, bossesDefeated, level, distinctItems }
const ACHIEVEMENTS = [
  {
    id: "first_quest",
    title: "First Steps",
    description: "Complete your first quest",
    icon: "flag",
    xp: 50,
    check: (s) => s.questsCompleted >= 1,
  },
  {
    id: "dedicator",
    title: "Dedicator",
    description: "Complete 10 quests",
    icon: "medal",
    xp: 200,
    check: (s) => s.questsCompleted >= 10,
  },
  {
    id: "quest_master",
    title: "Quest Master",
    description: "Complete 50 quests",
    icon: "crown",
    xp: 500,
    rewardItemId: "title_grandmaster",
    check: (s) => s.questsCompleted >= 50,
  },
  {
    id: "epic_win",
    title: "Epic Win",
    description: "Complete an epic quest",
    icon: "zap",
    xp: 150,
    check: (s) => s.epicQuestsCompleted >= 1,
  },
  {
    id: "dragon_slayer",
    title: "Dragon Slayer",
    description: "Defeat your first boss",
    icon: "swords",
    xp: 250,
    rewardItemId: "title_boss_slayer",
    check: (s) => s.bossesDefeated >= 1,
  },
  {
    id: "boss_hunter",
    title: "Boss Hunter",
    description: "Defeat 5 bosses",
    icon: "trophy",
    xp: 500,
    check: (s) => s.bossesDefeated >= 5,
  },
  {
    id: "level_5",
    title: "Rising Star",
    description: "Reach level 5",
    icon: "star",
    xp: 100,
    check: (s) => s.level >= 5,
  },
  {
    id: "level_10",
    title: "Veteran",
    description: "Reach level 10",
    icon: "gem",
    xp: 250,
    check: (s) => s.level >= 10,
  },
  {
    id: "collector",
    title: "Collector",
    description: "Own 5 distinct items",
    icon: "backpack",
    xp: 150,
    check: (s) => s.distinctItems >= 5,
  },
];

const ACHIEVEMENTS_BY_ID = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a])
);

function fail(code, message) {
  const err = new Error(message);
  err.code = code;
  throw err;
}

// ---------------------------------------------------------------------------
// State helpers
// state = {
//   profile: { displayName, username, totalXP,
//              stats: { questsCompleted, epicQuestsCompleted, bossesDefeated },
//              equipped: { icon, title } },
//   quests:      [ { id, title, type, difficulty, dueDate, completed, completedAt, createdAt } ],
//   bosses:      [ { id, title, dueDate, steps: [{id,text,order,completed,completedAt}], defeated, defeatedAt, createdAt } ],
//   achievements:[ { id, unlockedAt } ],
//   inventory:   [ { itemId, quantity, equipped } ],
// }
// ---------------------------------------------------------------------------

function newUserState({ displayName = "", username = null } = {}) {
  return {
    profile: {
      displayName,
      username,
      totalXP: 0,
      stats: { questsCompleted: 0, epicQuestsCompleted: 0, bossesDefeated: 0 },
      equipped: { icon: "person-standing", title: null },
    },
    quests: [],
    bosses: [],
    achievements: [],
    inventory: [],
  };
}

function derivedStats(state) {
  const li = levelInfo(state.profile.totalXP);
  return {
    questsCompleted: state.profile.stats.questsCompleted || 0,
    epicQuestsCompleted: state.profile.stats.epicQuestsCompleted || 0,
    bossesDefeated: state.profile.stats.bossesDefeated || 0,
    level: li.level,
    distinctItems: state.inventory.filter((e) => e.quantity > 0).length,
  };
}

function isUnlocked(state, achievementId) {
  return state.achievements.some((a) => a.id === achievementId);
}

function addItemToInventory(state, itemId, now) {
  const entry = state.inventory.find((e) => e.itemId === itemId);
  if (entry) {
    entry.quantity += 1;
  } else {
    state.inventory.push({ itemId, quantity: 1, equipped: false });
  }
}

function emptyOutcome(totalXP, level) {
  return {
    xpGained: 0,
    totalXP,
    levelBefore: level,
    levelAfter: level,
    leveledUp: false,
    unlockedAchievements: [],
    rewards: [],
  };
}

// Evaluate achievements in a loop until no new unlocks happen, since
// achievement XP can trigger level-based achievements in the same action.
function settleAchievements(state, outcome, now) {
  const nowIso = (now || new Date()).toISOString();
  let changed = true;
  while (changed) {
    changed = false;
    const stats = derivedStats(state);
    for (const a of ACHIEVEMENTS) {
      if (isUnlocked(state, a.id)) continue;
      if (!a.check(stats)) continue;
      state.achievements.push({ id: a.id, unlockedAt: nowIso });
      outcome.unlockedAchievements.push(a);
      state.profile.totalXP += a.xp;
      outcome.xpGained += a.xp;
      if (a.rewardItemId && ITEMS_BY_ID[a.rewardItemId]) {
        addItemToInventory(state, a.rewardItemId, nowIso);
        outcome.rewards.push(ITEMS_BY_ID[a.rewardItemId]);
      }
      changed = true;
    }
  }
}

function finalizeOutcome(state, outcome) {
  const li = levelInfo(state.profile.totalXP);
  outcome.totalXP = state.profile.totalXP;
  outcome.levelAfter = li.level;
  outcome.leveledUp = outcome.levelAfter > outcome.levelBefore;
  return outcome;
}

// ---------------------------------------------------------------------------
// Builders (validation + shapes)
// ---------------------------------------------------------------------------

function buildQuest({ title, type = "core", difficulty = "easy", dueDate = null }, { now } = {}) {
  if (!title || !String(title).trim()) fail("VALIDATION", "Quest title is required");
  if (!QUEST_TYPES.includes(type)) fail("VALIDATION", `Unknown quest type: ${type}`);
  if (!(difficulty in DIFFICULTIES)) fail("VALIDATION", `Unknown difficulty: ${difficulty}`);
  const created = (now || new Date()).toISOString();
  return {
    title: String(title).trim(),
    type,
    difficulty,
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    completed: false,
    completedAt: null,
    createdAt: created,
  };
}

function buildBoss({ title, dueDate = null, steps = [] }, { now } = {}) {
  if (!title || !String(title).trim()) fail("VALIDATION", "Boss title is required");
  const clean = steps.map((s) => String(s).trim()).filter((s) => s.length > 0);
  if (clean.length < MIN_BOSS_STEPS)
    fail("VALIDATION", `A boss needs at least ${MIN_BOSS_STEPS} steps`);
  const created = (now || new Date()).toISOString();
  return {
    title: String(title).trim(),
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    steps: clean.map((text, i) => ({
      order: i,
      text,
      completed: false,
      completedAt: null,
    })),
    defeated: false,
    defeatedAt: null,
    createdAt: created,
  };
}

// ---------------------------------------------------------------------------
// Loot
// ---------------------------------------------------------------------------

// Returns an item catalog entry or null.
function rollDrop(chance, rng = Math.random) {
  if (chance <= 0) return null;
  if (rng() < chance) {
    const idx = Math.min(ITEMS.length - 1, Math.floor(rng() * ITEMS.length));
    return ITEMS[idx];
  }
  return null;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

function completeQuest(state, questId, { rng = Math.random, now } = {}) {
  const quest = state.quests.find((q) => q.id === questId);
  if (!quest) fail("NOT_FOUND", "Quest not found");
  if (quest.completed) fail("ALREADY_COMPLETED", "Quest already completed");

  const levelBefore = levelInfo(state.profile.totalXP).level;
  const outcome = emptyOutcome(state.profile.totalXP, levelBefore);

  const base = DIFFICULTIES[quest.difficulty] || 0;
  const xp = quest.type === "optional" ? Math.round(base * OPTIONAL_XP_FACTOR) : base;

  quest.completed = true;
  quest.completedAt = (now || new Date()).toISOString();
  state.profile.totalXP += xp;
  outcome.xpGained += xp;
  state.profile.stats.questsCompleted += 1;
  if (quest.difficulty === "epic") state.profile.stats.epicQuestsCompleted += 1;

  const drop = rollDrop(DROP_CHANCES[quest.difficulty] || 0, rng);
  if (drop) {
    addItemToInventory(state, drop.id, quest.completedAt);
    outcome.rewards.push(drop);
  }

  settleAchievements(state, outcome, now);
  return { state, outcome: finalizeOutcome(state, outcome) };
}

function completeBossStep(state, bossId, stepId, { rng = Math.random, now } = {}) {
  const boss = state.bosses.find((b) => b.id === bossId);
  if (!boss) fail("NOT_FOUND", "Boss not found");
  if (boss.defeated) fail("ALREADY_COMPLETED", "Boss already defeated");
  const step = boss.steps.find((s) => s.id === stepId);
  if (!step) fail("NOT_FOUND", "Boss step not found");
  if (step.completed) fail("ALREADY_COMPLETED", "Step already completed");

  const levelBefore = levelInfo(state.profile.totalXP).level;
  const outcome = emptyOutcome(state.profile.totalXP, levelBefore);
  const nowIso = (now || new Date()).toISOString();

  step.completed = true;
  step.completedAt = nowIso;
  state.profile.totalXP += BOSS_STEP_XP;
  outcome.xpGained += BOSS_STEP_XP;

  const allDone = boss.steps.every((s) => s.completed);
  if (allDone) {
    boss.defeated = true;
    boss.defeatedAt = nowIso;
    state.profile.totalXP += BOSS_DEFEAT_BONUS_XP;
    outcome.xpGained += BOSS_DEFEAT_BONUS_XP;
    state.profile.stats.bossesDefeated += 1;
    // Guaranteed item drop on boss defeat.
    const idx = Math.min(ITEMS.length - 1, Math.floor(rng() * ITEMS.length));
    const drop = ITEMS[idx];
    addItemToInventory(state, drop.id, nowIso);
    outcome.rewards.push(drop);
  }

  settleAchievements(state, outcome, now);
  return { state, outcome: finalizeOutcome(state, outcome) };
}

function useItem(state, itemId, { now } = {}) {
  const item = ITEMS_BY_ID[itemId];
  if (!item) fail("NOT_FOUND", "Item not found");
  const entry = state.inventory.find((e) => e.itemId === itemId && e.quantity > 0);
  if (!entry) fail("NOT_FOUND", "Item not in inventory");
  if (item.type !== "consumable") fail("VALIDATION", "Only consumables can be used");

  const levelBefore = levelInfo(state.profile.totalXP).level;
  const outcome = emptyOutcome(state.profile.totalXP, levelBefore);

  entry.quantity -= 1;
  if (entry.quantity <= 0) {
    entry.quantity = 0;
    entry.equipped = false;
    state.inventory = state.inventory.filter((e) => e.quantity > 0);
  }

  const xp = item.xp || 0;
  state.profile.totalXP += xp;
  outcome.xpGained += xp;

  settleAchievements(state, outcome, now);
  return { state, outcome: finalizeOutcome(state, outcome) };
}

function equipItem(state, itemId, { now } = {}) {
  const item = ITEMS_BY_ID[itemId];
  if (!item) fail("NOT_FOUND", "Item not found");
  const entry = state.inventory.find((e) => e.itemId === itemId && e.quantity > 0);
  if (!entry) fail("NOT_FOUND", "Item not in inventory");
  if (item.type !== "equipment") fail("VALIDATION", "Only equipment can be equipped");

  const levelBefore = levelInfo(state.profile.totalXP).level;
  const outcome = emptyOutcome(state.profile.totalXP, levelBefore);

  for (const e of state.inventory) {
    const other = ITEMS_BY_ID[e.itemId];
    if (other && other.slot === item.slot) e.equipped = false;
  }
  entry.equipped = true;
  state.profile.equipped[item.slot] = item.value;

  return { state, outcome: finalizeOutcome(state, outcome) };
}

// Full achievement catalog annotated with this user's unlock state.
function listAchievements(state) {
  return ACHIEVEMENTS.map((a) => {
    const unlocked = state.achievements.find((u) => u.id === a.id);
    const { check, ...catalogEntry } = a;
    return { ...catalogEntry, unlocked: !!unlocked, unlockedAt: unlocked ? unlocked.unlockedAt : null };
  });
}

module.exports = {
  DIFFICULTIES,
  DROP_CHANCES,
  QUEST_TYPES,
  OPTIONAL_XP_FACTOR,
  BOSS_STEP_XP,
  BOSS_DEFEAT_BONUS_XP,
  MIN_BOSS_STEPS,
  ITEMS,
  ITEMS_BY_ID,
  ACHIEVEMENTS,
  ACHIEVEMENTS_BY_ID,
  xpForLevelUp,
  levelInfo,
  newUserState,
  derivedStats,
  buildQuest,
  buildBoss,
  rollDrop,
  completeQuest,
  completeBossStep,
  useItem,
  equipItem,
  listAchievements,
};
