import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type, radius } from "@/assets/styles/theme";
import TextField from "@/components/UI/TextField";
import Button from "@/components/UI/Button";
import { Sheet, DueDateRow } from "@/components/UI/Sheet";
import rules from "../../../shared/gameRules";

const DIFFS = ["easy", "medium", "hard", "epic"];

export function AddQuest({ onClose }) {
  const { c } = useTheme();
  const { createQuest } = useData();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [qtype, setQtype] = useState("core");
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!title.trim()) { setError("A quest needs a title"); return; }
    setSaving(true);
    try {
      await createQuest({ title: title.trim(), type: qtype, difficulty, dueDate: date ? date.toISOString() : null });
      onClose();
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  };

  return (
    <Sheet title="New quest" onClose={onClose}>
      <TextField label="Quest title" placeholder="What needs to be done?" value={title} onChangeText={(t) => { setTitle(t); setError(null); }} error={error} autoFocus />
      <Text style={[type.label, { color: c.textMuted, marginTop: 16, marginBottom: 8 }]}>Difficulty</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {DIFFS.map((d) => {
          const sel = d === difficulty;
          return (
            <Pressable key={d} onPress={() => setDifficulty(d)} accessibilityRole="button" accessibilityLabel={`Difficulty ${d}`}
              style={{ flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: radius.control,
                borderWidth: 1, borderColor: sel ? c.accent : c.border, backgroundColor: sel ? c.accentSoft : c.surface }}>
              <Text style={[type.label, { color: sel ? c.accentText : c.text, textTransform: "capitalize" }]}>{d}</Text>
              <Text style={[type.caption, { color: c.textMuted }]}>{rules.DIFFICULTIES[d]} XP</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[type.label, { color: c.textMuted, marginTop: 16, marginBottom: 8 }]}>Type</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {["core", "optional"].map((t) => {
          const sel = t === qtype;
          return (
            <Pressable key={t} onPress={() => setQtype(t)} accessibilityRole="button" accessibilityLabel={`Type ${t}`}
              style={{ flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: radius.control,
                borderWidth: 1, borderColor: sel ? c.accent : c.border, backgroundColor: sel ? c.accentSoft : c.surface }}>
              <Text style={[type.label, { color: sel ? c.accentText : c.text, textTransform: "capitalize" }]}>{t}</Text>
              <Text style={[type.caption, { color: c.textMuted }]}>{t === "optional" ? "half XP" : "full XP"}</Text>
            </Pressable>
          );
        })}
      </View>
      <DueDateRow date={date} setDate={setDate} showPicker={showPicker} setShowPicker={setShowPicker} c={c} />
      <Button title="Create quest" fullWidth loading={saving} onPress={submit} style={{ marginTop: 20 }} />
    </Sheet>
  );
}

