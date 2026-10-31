import { getSettings } from "./settings";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.code = "UNAUTHORIZED";
  }
}

async function request(path, { method = "GET", body } = {}) {
  const { serverUrl, token } = await getSettings();
  if (!serverUrl) throw new Error("No server URL configured");
  const res = await fetch(`${serverUrl.replace(/\/+$/, "")}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) throw new UnauthorizedError();
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

async function authRequest(serverUrl, path, body) {
  const res = await fetch(`${serverUrl.replace(/\/+$/, "")}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function login(serverUrl, username, password) {
  return authRequest(serverUrl, "/api/auth/login", { username, password });
}

export async function register(serverUrl, username, password, displayName) {
  return authRequest(serverUrl, "/api/auth/register", {
    username,
    password,
    displayName,
  });
}

export const getProfile = () => request("/api/profile");
export const updateProfile = ({ displayName }) =>
  request("/api/profile", { method: "PATCH", body: { displayName } });
export const listQuests = () => request("/api/quests");
export const createQuest = (quest) =>
  request("/api/quests", { method: "POST", body: quest });
export const completeQuest = async (id) =>
  (await request(`/api/quests/${id}/complete`, { method: "POST" })).outcome;
export const deleteQuest = (id) =>
  request(`/api/quests/${id}`, { method: "DELETE" });
export const listBosses = () => request("/api/bosses");
export const createBoss = (boss) =>
  request("/api/bosses", { method: "POST", body: boss });
export const completeBossStep = async (bossId, stepId) =>
  (
    await request(`/api/bosses/${bossId}/steps/${stepId}/complete`, {
      method: "POST",
    })
  ).outcome;
export const deleteBoss = (id) => request(`/api/bosses/${id}`, { method: "DELETE" });
export const listAchievements = () => request("/api/achievements");
export const listInventory = () => request("/api/inventory");
export const useItem = async (itemId) =>
  (await request(`/api/inventory/${itemId}/use`, { method: "POST" })).outcome;
export const equipItem = async (itemId) =>
  (await request(`/api/inventory/${itemId}/equip`, { method: "POST" })).outcome;
