import React, { useState } from "react";
import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type, radius } from "@/assets/styles/theme";
import renderIcon from "@/assets/styles/renderIcon";
import TextField from "@/components/UI/TextField";
import Button from "@/components/UI/Button";
import IconButton from "@/components/UI/IconButton";
import rules from "../../../shared/gameRules";
import { formatDueDate } from "@/services/filters";

const DIFFS = ["easy", "medium", "hard", "epic"];

function Sheet({ title, onClose, children }) {
  const { c } = useTheme();
  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
      <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} onPress={onClose} accessibilityLabel="Close" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={{ backgroundColor: c.surface, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet, padding: 20, paddingBottom: 32 }}>
          <View style={{ alignSelf: "center", width: 36, height: 4, borderRadius: 2, backgroundColor: c.border, marginBottom: 12 }} />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={[type.sectionTitle, { color: c.text }]}>{title}</Text>
            <IconButton icon="x" accessibilityLabel="Close" onPress={onClose} />
          </View>
          <ScrollView style={{ maxHeight: 560 }} keyboardShouldPersistTaps="handled">{children}</ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function DueDateRow({ date, setDate, showPicker, setShowPicker, c }) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[type.label, { color: c.textMuted, marginBottom: 6 }]}>Due date</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={() => setShowPicker(true)}
          accessibilityRole="button" accessibilityLabel="Pick a due date"
          style={{ flexDirection: "row", alignItems: "center", height: 48, paddingHorizontal: 14, borderRadius: radius.control, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, flex: 1 }}>
          {renderIcon("calendar", c.textMuted, 18)}
          <Text style={[type.body, { color: date ? c.text : c.textMuted, marginLeft: 10 }]}>
            {date ? formatDueDate(date.toISOString()) : "None"}
          </Text>
        </Pressable>
        {date ? <IconButton icon="x" accessibilityLabel="Clear due date" onPress={() => setDate(null)} /> : null}
      </View>
      {showPicker ? (
        <DateTimePicker value={date || new Date()} onChange={(_, d) => { setShowPicker(false); if (d) setDate(d); }} themeVariant="light" />
      ) : null}
    </View>
  );
}

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
              {t === "optional" ? <Text style={[type.caption, { color: c.textMuted }]}>half XP</Text> : null}
            </Pressable>
          );
        })}
      </View>
      <DueDateRow date={date} setDate={setDate} showPicker={showPicker} setShowPicker={setShowPicker} c={c} />
      <Button title="Create quest" fullWidth loading={saving} onPress={submit} style={{ marginTop: 20 }} />
    </Sheet>
  );
}

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
