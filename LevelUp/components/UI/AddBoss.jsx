import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type } from "@/assets/styles/theme";
import TextField from "@/components/UI/TextField";
import Button from "@/components/UI/Button";
import IconButton from "@/components/UI/IconButton";
import { Sheet, DueDateRow } from "@/components/UI/Sheet";

export function AddBoss({ onClose }) {
  const { c } = useTheme();
  const { createBoss } = useData();
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState(["", ""]);
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!title.trim()) { setError("A boss needs a title"); return; }
    const clean = steps.map((s) => s.trim()).filter(Boolean);
    if (clean.length < 2) { setError("Add at least 2 steps"); return; }
    setSaving(true);
    try {
      await createBoss({ title: title.trim(), dueDate: date ? date.toISOString() : null, steps: clean });
      onClose();
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  };

  return (
    <Sheet title="New boss battle" onClose={onClose}>
      <TextField label="Boss title" placeholder="The big goal" value={title} onChangeText={(t) => { setTitle(t); setError(null); }} error={error} autoFocus />
      <Text style={[type.label, { color: c.textMuted, marginTop: 16, marginBottom: 8 }]}>Steps</Text>
      {steps.map((s, i) => (
        <View key={i} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <View style={{ flex: 1 }}>
            <TextField placeholder={`Step ${i + 1}`} value={s} onChangeText={(t) => setSteps(steps.map((x, j) => (j === i ? t : x)))} />
          </View>
          {steps.length > 2 ? <IconButton icon="x" accessibilityLabel={`Remove step ${i + 1}`} onPress={() => setSteps(steps.filter((_, j) => j !== i))} /> : null}
        </View>
      ))}
      <Pressable onPress={() => setSteps([...steps, ""])} hitSlop={12} accessibilityRole="button" style={{ minHeight: 40, justifyContent: "center" }}>
        <Text style={[type.label, { color: c.accentText }]}>+ Add step</Text>
      </Pressable>
      <DueDateRow date={date} setDate={setDate} showPicker={showPicker} setShowPicker={setShowPicker} c={c} />
      <Button title="Create boss battle" fullWidth loading={saving} onPress={submit} style={{ marginTop: 20 }} />
    </Sheet>
  );
}
