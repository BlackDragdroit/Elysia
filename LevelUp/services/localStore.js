import AsyncStorage from "@react-native-async-storage/async-storage";
import rules from "../../shared/gameRules";

const DATA_KEY = "elysia:data:v1";

let cache = null;

function genId() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

async function load() {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(DATA_KEY);
    cache = raw ? JSON.parse(raw) : rules.newUserState();
  } catch {
    cache = rules.newUserState();
  }
  return cache;
}

async function save(state) {
  cache = state;
  await AsyncStorage.setItem(DATA_KEY, JSON.stringify(state));
}

function profileOf(state) {
  const li = rules.levelInfo(state.profile.totalXP);
  return {
    displayName: state.profile.displayName,
    username: state.profile.username,
    totalXP: state.profile.totalXP,
    level: li.level,
    xpIntoLevel: li.xpIntoLevel,
    xpForNext: li.xpForNext,
    stats: { ...state.profile.stats },
    equipped: { ...state.profile.equipped },
  };
}

export async function getProfile() {
  return profileOf(await load());
}

export async function updateProfile({ displayName }) {
  const state = await load();
  if (displayName !== undefined) state.profile.displayName = String(displayName).trim();
  await save(state);
  return profileOf(state);
}

export async function listQuests() {
  const state = await load();
  return state.quests.map((q) => ({ ...q }));
}

export async function createQuest({ title, type, difficulty, dueDate }) {
  const state = await load();
  const quest = { id: genId(), ...rules.buildQuest({ title, type, difficulty, dueDate }) };
  state.quests.push(quest);
  await save(state);
  return { ...quest };
}

export async function completeQuest(id) {
  const state = await load();
  const { outcome } = rules.completeQuest(state, id, {});
  await save(state);
  return outcome;
}

export async function deleteQuest(id) {
  const state = await load();
  const before = state.quests.length;
  state.quests = state.quests.filter((q) => q.id !== id);
  if (state.quests.length === before) {
    const err = new Error("Quest not found");
    err.code = "NOT_FOUND";
    throw err;
  }
  await save(state);
  return { success: true };
}

export async function listBosses() {
  const state = await load();
  return state.bosses.map((b) => ({ ...b, steps: b.steps.map((s) => ({ ...s })) }));
}

export async function createBoss({ title, dueDate, steps }) {
  const state = await load();
  const data = rules.buildBoss({ title, dueDate, steps });
  const boss = {
    id: genId(),
    ...data,
    steps: data.steps.map((s) => ({ id: genId(), ...s })),
  };
  state.bosses.push(boss);
  await save(state);
  return { ...boss };
}

export async function completeBossStep(bossId, stepId) {
  const state = await load();
  const { outcome } = rules.completeBossStep(state, bossId, stepId, {});
  await save(state);
  return outcome;
}

export async function deleteBoss(id) {
  const state = await load();
  const before = state.bosses.length;
  state.bosses = state.bosses.filter((b) => b.id !== id);
  if (state.bosses.length === before) {
    const err = new Error("Boss not found");
    err.code = "NOT_FOUND";
    throw err;
  }
  await save(state);
  return { success: true };
}

export async function listAchievements() {
  const state = await load();
  return rules.listAchievements(state);
}

export async function listInventory() {
  const state = await load();
  return state.inventory.map((e) => ({
    item: rules.ITEMS_BY_ID[e.itemId],
    quantity: e.quantity,
    equipped: e.equipped,
  }));
}

export async function useItem(itemId) {
  const state = await load();
  const { outcome } = rules.useItem(state, itemId, {});
  await save(state);
  return outcome;
}

export async function equipItem(itemId) {
  const state = await load();
  const { outcome } = rules.equipItem(state, itemId, {});
  await save(state);
  return outcome;
}

// Test helper: drop the in-memory cache so the next call re-reads storage.
export function _resetCache() {
  cache = null;
}
