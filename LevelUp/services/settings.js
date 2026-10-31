import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "elysia:settings";

const DEFAULT_SETTINGS = {
  mode: "local",
  serverUrl: null,
  token: null,
  username: null,
};

export async function getSettings() {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSettings(patch) {
  const current = await getSettings();
  const next = { ...current, ...patch };
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}

export async function clearServerCredentials() {
  return saveSettings({ token: null, username: null });
}
