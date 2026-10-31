import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type } from "@/assets/styles/theme";
import renderIcon from "@/assets/styles/renderIcon";
import Screen from "@/components/UI/Screen";
import Card from "@/components/UI/Card";
import SegmentedControl from "@/components/UI/SegmentedControl";
import EmptyState from "@/components/UI/EmptyState";
import PlayerCard from "@/components/UI/PlayerCard";
import Button from "@/components/UI/Button";
import TextField from "@/components/UI/TextField";
import { formatDueDate } from "@/services/filters";

const TABS = ["Achievements", "Inventory", "Settings"];

function Stats({ profile }) {
  const { c } = useTheme();
  const cells = [
    { icon: "trophy", value: profile.totalXP, label: "Total XP" },
    { icon: "check-circle-2", value: profile.stats.questsCompleted, label: "Quests" },
    { icon: "award", value: profile.stats.achievementsUnlocked ?? profile.achievementsCount ?? 0, label: "Achievements" },
  ];
  return (
    <Card style={{ flexDirection: "row", paddingVertical: 16, marginTop: 16 }}>
      {cells.map((cell, i) => (
        <View key={cell.label} style={{ flex: 1, alignItems: "center",
          borderLeftWidth: i === 0 ? 0 : 1, borderLeftColor: c.border }}>
          {renderIcon(cell.icon, c.textMuted, 18)}
          <Text style={[type.stat, { color: c.text, marginTop: 4 }]}>{cell.value}</Text>
          <Text style={[type.caption, { color: c.textMuted }]}>{cell.label}</Text>
        </View>
      ))}
    </Card>
  );
}

function AchievementsTab({ achievements, c }) {
  if (achievements.length === 0) return <EmptyState icon="award" title="No achievements yet" hint="Complete quests to unlock them" />;
  return (
    <Card style={{ paddingVertical: 4, marginTop: 12 }}>
      {achievements.map((a, i) => (
        <View key={a.id} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10,
          borderBottomWidth: i === achievements.length - 1 ? 0 : 1, borderBottomColor: c.border }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: a.unlocked ? c.accentSoft : c.surfaceRaised, alignItems: "center", justifyContent: "center", opacity: a.unlocked ? 1 : 0.5 }}>
            {renderIcon(a.unlocked ? (a.icon || "award") : "lock", a.unlocked ? c.accent : c.textMuted, 20)}
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[type.body, { color: a.unlocked ? c.text : c.textMuted, fontWeight: "500" }]}>{a.title}</Text>
            <Text style={[type.caption, { color: c.textMuted }]}>{a.description}</Text>
          </View>
          <Text style={[type.caption, { color: c.textMuted }]}>
            {a.unlocked ? formatDueDate(a.unlockedAt) : "Locked"}
          </Text>
        </View>
      ))}
    </Card>
  );
}

function InventoryTab({ inventory, useItem, equipItem, c }) {
  if (inventory.length === 0) return <EmptyState icon="backpack" title="Inventory is empty" hint="Items drop from quests and bosses" />;
  return (
    <Card style={{ paddingVertical: 4, marginTop: 12 }}>
      {inventory.map((e, i) => (
        <View key={e.item.id} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10,
          borderBottomWidth: i === inventory.length - 1 ? 0 : 1, borderBottomColor: c.border }}>
          <View style={{ width: 36, alignItems: "center" }}>{renderIcon(e.item.icon || "package", c.accent, 20)}</View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[type.body, { color: c.text, fontWeight: "500" }]}>{e.item.name}{e.quantity > 1 ? ` ×${e.quantity}` : ""}</Text>
            <Text style={[type.caption, { color: c.textMuted }]} numberOfLines={1}>{e.item.description}</Text>
          </View>
          {e.item.type === "consumable" ? (
            <Button title="Use" onPress={() => useItem(e.item.id)} style={{ height: 36, paddingHorizontal: 14 }} />
          ) : e.equipped ? (
            <Button title="Equipped" disabled variant="secondary" style={{ height: 36, paddingHorizontal: 14 }} />
          ) : (
            <Button title="Equip" variant="secondary" onPress={() => equipItem(e.item.id)} style={{ height: 36, paddingHorizontal: 14 }} />
          )}
        </View>
      ))}
    </Card>
  );
}

function SettingsTab({ settings, profile, updateProfile, switchToLocal, switchToServer, logout, c }) {
  const [name, setName] = useState(profile?.displayName || "");
  const [serverUrl, setServerUrl] = useState(settings?.serverUrl || "");
  const [error, setError] = useState(null);
  const [urlError, setUrlError] = useState(null);
  const [saved, setSaved] = useState(false);
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[type.sectionTitle, { color: c.text, marginBottom: 8 }]}>Profile</Text>
      <Card>
        <TextField label="Display name" value={name} onChangeText={setName} error={error} />
        <Button title="Save" style={{ marginTop: 12, alignSelf: "flex-start" }}
          onPress={async () => { setError(null); setSaved(false); try { await updateProfile({ displayName: name }); setSaved(true); setTimeout(() => setSaved(false), 2000); } catch (e) { setError(e.message); } }} />
        {saved ? <Text style={[type.caption, { color: c.textMuted, marginTop: 8 }]}>Saved</Text> : null}
      </Card>
      <Text style={[type.sectionTitle, { color: c.text, marginTop: 20, marginBottom: 8 }]}>Data</Text>
      <Card>
        <Text style={[type.body, { color: c.textMuted }]}>
          {settings?.mode === "server" ? `Connected to ${settings.serverUrl} as @${settings.username}` : "Your data is stored on this device."}
        </Text>
        {settings?.mode !== "server" ? (
          <>
            <TextField label="Server URL" value={serverUrl} onChangeText={(t) => { setServerUrl(t); setUrlError(null); }}
              placeholder="http://192.168.1.10:3001" autoCapitalize="none" error={urlError} style={{ marginTop: 12 }} />
            <Button title="Connect to server" variant="secondary" style={{ marginTop: 12 }}
              onPress={() => { if (!serverUrl.trim()) { setUrlError("Enter a server URL"); return; } switchToServer(serverUrl.trim()); }} />
          </>
        ) : (
          <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
            <Button title="Log out" variant="secondary" onPress={logout} />
            <Button title="Switch to offline mode" variant="secondary" onPress={switchToLocal} />
          </View>
        )}
        <Text style={[type.caption, { color: c.textMuted, marginTop: 12 }]}>
          Data is not migrated when switching modes — each mode has its own profile.
        </Text>
      </Card>
    </View>
  );
}

export default function Profile() {
  const { c } = useTheme();
  const data = useData();
  const [sel, setSel] = useState(0);
  const { profile, achievements, inventory } = data;

  return (
    <Screen title="Profile">
      {profile ? <PlayerCard profile={profile} /> : null}
      {profile ? <Stats profile={{ ...profile, stats: { ...profile.stats, achievementsUnlocked: achievements.filter((a) => a.unlocked).length } }} /> : null}
      <View style={{ marginTop: 16 }}>
        <SegmentedControl options={TABS.map((t) => ({ label: t }))} selected={sel} onSelect={setSel} />
      </View>
      {sel === 0 && <AchievementsTab achievements={achievements} c={c} />}
      {sel === 1 && <InventoryTab inventory={inventory} useItem={data.useItem} equipItem={data.equipItem} c={c} />}
      {sel === 2 && <SettingsTab settings={data.settings} profile={profile} updateProfile={data.updateProfile}
        switchToLocal={data.switchToLocal} switchToServer={data.switchToServer} logout={data.logout} c={c} />}
    </Screen>
  );
}
