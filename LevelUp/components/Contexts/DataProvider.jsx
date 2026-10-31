import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as localStore from "@/services/localStore";
import * as remoteStore from "@/services/remoteStore";
import { getSettings, saveSettings } from "@/services/settings";
import Message from "@/components/UI/Message";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { colors } from "@/assets/styles/common";

export const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [profile, setProfile] = useState(null);
  const [quests, setQuests] = useState([]);
  const [bosses, setBosses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [lastOutcome, setLastOutcome] = useState(null);
  const [lastError, setLastError] = useState(null);
  const [loading, setLoading] = useState(true);
  const outcomeCounter = useRef(0);

  const activeStore =
    settings?.mode === "server" ? remoteStore : localStore;
  const authenticated =
    settings?.mode === "local" || (settings?.mode === "server" && settings?.token);

  const refresh = useCallback(async (currentSettings, store) => {
    if (!currentSettings) return;
    const isAuthed =
      currentSettings.mode === "local" ||
      (currentSettings.mode === "server" && currentSettings.token);
    if (!isAuthed) {
      setProfile(null);
      setQuests([]);
      setBosses([]);
      setAchievements([]);
      setInventory([]);
      return;
    }
    const [p, q, b, a, i] = await Promise.all([
      store.getProfile(),
      store.listQuests(),
      store.listBosses(),
      store.listAchievements(),
      store.listInventory(),
    ]);
    setProfile(p);
    setQuests(q);
    setBosses(b);
    setAchievements(a);
    setInventory(i);
  }, []);

  const handleUnauthorized = useCallback(async () => {
    const next = await saveSettings({ token: null });
    setSettings(next);
  }, []);

  // Initial settings load.
  useEffect(() => {
    let mounted = true;
    (async () => {
      const s = await getSettings();
      if (!mounted) return;
      setSettings(s);
      try {
        await refresh(s, s.mode === "server" ? remoteStore : localStore);
      } catch (e) {
        if (e?.code === "UNAUTHORIZED") await handleUnauthorized();
        else console.error("Failed to load data:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [refresh, handleUnauthorized]);

  // surfaceErrors=false (default): failures become a `lastError` toast and the
  // action resolves to null. Create/update forms pass true so they can show
  // their own inline errors instead.
  const runAction = useCallback(
    async (fn, { surfaceErrors = false } = {}) => {
      try {
        const outcome = await fn();
        if (outcome && typeof outcome === "object" && "xpGained" in outcome) {
          outcomeCounter.current += 1;
          setLastOutcome({ id: outcomeCounter.current, ...outcome });
        }
        await refresh(settings, activeStore);
        return outcome;
      } catch (e) {
        if (e?.code === "UNAUTHORIZED") {
          await handleUnauthorized();
          return null;
        }
        if (surfaceErrors) throw e;
        outcomeCounter.current += 1;
        setLastError({ id: outcomeCounter.current, message: e.message || "Something went wrong" });
        return null;
      }
    },
    [settings, activeStore, refresh, handleUnauthorized]
  );

  // Settings / mode actions -----------------------------------------------

  const switchToLocal = useCallback(async () => {
    const next = await saveSettings({
      mode: "local",
      serverUrl: null,
      token: null,
      username: null,
    });
    setSettings(next);
    await refresh(next, localStore);
  }, [refresh]);

  const switchToServer = useCallback(async (serverUrl) => {
    const next = await saveSettings({
      mode: "server",
      serverUrl: serverUrl ? serverUrl.trim() : null,
      token: null,
      username: null,
    });
    setSettings(next);
    setProfile(null);
    setQuests([]);
    setBosses([]);
    setAchievements([]);
    setInventory([]);
  }, []);

  const loginServer = useCallback(
    async (serverUrl, username, password) => {
      const { token } = await remoteStore.login(serverUrl, username, password);
      const next = await saveSettings({
        mode: "server",
        serverUrl: serverUrl.trim(),
        token,
        username: username.trim(),
      });
      setSettings(next);
      await refresh(next, remoteStore);
    },
    [refresh]
  );

  const registerServer = useCallback(
    async (serverUrl, username, password, displayName) => {
      const { token } = await remoteStore.register(
        serverUrl,
        username,
        password,
        displayName
      );
      const next = await saveSettings({
        mode: "server",
        serverUrl: serverUrl.trim(),
        token,
        username: username.trim(),
      });
      setSettings(next);
      await refresh(next, remoteStore);
    },
    [refresh]
  );

  const logout = useCallback(async () => {
    const next = await saveSettings({ token: null, username: null });
    setSettings(next);
    setProfile(null);
    setQuests([]);
    setBosses([]);
    setAchievements([]);
    setInventory([]);
  }, []);

  // Store actions ----------------------------------------------------------

  const throwing = { surfaceErrors: true };
  const actions = {
    updateProfile: (patch) =>
      runAction(() => activeStore.updateProfile(patch), throwing),
    createQuest: (q) => runAction(() => activeStore.createQuest(q), throwing),
    completeQuest: (id) => runAction(() => activeStore.completeQuest(id)),
    deleteQuest: (id) => runAction(() => activeStore.deleteQuest(id)),
    createBoss: (b) => runAction(() => activeStore.createBoss(b), throwing),
    completeBossStep: (bossId, stepId) =>
      runAction(() => activeStore.completeBossStep(bossId, stepId)),
    deleteBoss: (id) => runAction(() => activeStore.deleteBoss(id)),
    useItem: (itemId) => runAction(() => activeStore.useItem(itemId)),
    equipItem: (itemId) => runAction(() => activeStore.equipItem(itemId)),
  };

  const value = {
    settings,
    loading,
    profile,
    quests,
    bosses,
    achievements,
    inventory,
    lastOutcome,
    lastError,
    refresh: () => refresh(settings, activeStore),
    switchToLocal,
    switchToServer,
    loginServer,
    registerServer,
    logout,
    ...actions,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Renders a toast summarizing the last action outcome. Mount inside a
// ThemeProvider + DataProvider (e.g. in the tabs layout).
export function OutcomeToast() {
  const { lastOutcome, lastError } = useData();
  const { theme } = useContext(ThemeContext);

  // lastOutcome and lastError share one counter, so the larger id is newer.
  const showError =
    lastError && (!lastOutcome || lastError.id > lastOutcome.id);

  if (!lastOutcome && !lastError) return null;

  let message;
  let key;
  let isError = false;
  if (showError) {
    message = lastError.message;
    key = lastError.id;
    isError = true;
  } else if (lastOutcome) {
    const lines = [];
    if (lastOutcome.xpGained > 0) lines.push(`+${lastOutcome.xpGained} XP`);
    if (lastOutcome.leveledUp)
      lines.push(`Level up! You are now level ${lastOutcome.levelAfter}`);
    for (const a of lastOutcome.unlockedAchievements || [])
      lines.push(`Achievement unlocked: ${a.title}`);
    for (const r of lastOutcome.rewards || []) lines.push(`Received: ${r.name}`);
    if (lines.length === 0) return null;
    message = lines.join("\n");
    key = lastOutcome.id;
  } else {
    return null;
  }

  return (
    <View style={{ position: "absolute", top: 60, right: 10, zIndex: 1000 }}>
      <Message
        key={key}
        isError={isError}
        message={message}
        duration={3500}
        width={240}
      />
    </View>
  );
}
