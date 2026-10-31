import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import renderIcon from "@/assets/styles/renderIcon";
import { useTheme, type, radius } from "@/assets/styles/theme";
import { isOverdue, formatDueDate } from "@/services/filters";
import rules from "../../../shared/gameRules";
import Chip from "./Chip";
import IconButton from "./IconButton";

const DIFF_LABELS = { easy: "Easy", medium: "Medium", hard: "Hard", epic: "Epic" };

export default function QuestRow({ quest, onComplete, onDelete, showDelete = true, last = false }) {
  const { c } = useTheme();
  const overdue = !quest.completed && quest.dueDate && isOverdue(quest);
  const base = rules.DIFFICULTIES[quest.difficulty] || 0;
  const xp = quest.type === "optional" ? Math.round(base * rules.OPTIONAL_XP_FACTOR) : base;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 12,
      borderBottomWidth: last ? 0 : 1, borderBottomColor: c.border }}>
      <Pressable
        onPress={quest.completed ? undefined : onComplete}
        disabled={quest.completed}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: !!quest.completed }}
        accessibilityLabel={`Complete ${quest.title}`}
        hitSlop={10}
        style={{ minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center", marginLeft: -10 }}
      >
        <View style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 2,
          borderColor: quest.completed ? c.accent : c.textMuted,
          backgroundColor: quest.completed ? c.accent : "transparent",
          alignItems: "center", justifyContent: "center" }}>
          {quest.completed ? renderIcon("check", "#ffffff", 14) : null}
        </View>
      </Pressable>
      <View style={{ flex: 1, marginLeft: 4 }}>
        <Text style={[type.body, { color: quest.completed ? c.textMuted : c.text },
          quest.completed && { textDecorationLine: "line-through" }]} numberOfLines={2}>
          {quest.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, gap: 8, flexWrap: "wrap" }}>
          <Chip label={DIFF_LABELS[quest.difficulty] || quest.difficulty}
            color={c.difficulty[quest.difficulty]}
            bg={quest.completed ? c.surfaceRaised : `${c.difficulty[quest.difficulty]}26`} />
          {quest.dueDate ? (
            <Text style={[type.caption, { color: overdue ? c.danger : c.textMuted }]}>
              {overdue ? "Overdue · " : ""}{formatDueDate(quest.dueDate)}
            </Text>
          ) : quest.type === "optional" ? (
            <Text style={[type.caption, { color: c.textMuted }]}>Optional</Text>
          ) : null}
          {quest.completed && quest.completedAt ? (
            <Text style={[type.caption, { color: c.textMuted }]}>Completed {formatDueDate(quest.completedAt)}</Text>
          ) : null}
        </View>
      </View>
      {!quest.completed ? (
        <Text style={[type.caption, { color: c.accentText, fontWeight: "600", marginHorizontal: 8 }]}>+{xp} XP</Text>
      ) : null}
      {showDelete && onDelete ? (
        <IconButton icon="trash" variant="plain" color={c.textMuted} accessibilityLabel={`Delete ${quest.title}`}
          onPress={() => Alert.alert("Delete quest", `Delete "${quest.title}"?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: onDelete },
          ])}
          style={{ marginRight: -8, minWidth: 44 }} />
      ) : null}
    </View>
  );
}
