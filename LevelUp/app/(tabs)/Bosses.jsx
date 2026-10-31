import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type } from "@/assets/styles/theme";
import renderIcon from "@/assets/styles/renderIcon";
import Screen from "@/components/UI/Screen";
import Card from "@/components/UI/Card";
import EmptyState from "@/components/UI/EmptyState";
import IconButton from "@/components/UI/IconButton";
import ProgressBar from "@/components/UI/ProgressBar";
import Chip from "@/components/UI/Chip";
import { AddBoss } from "@/components/UI/AddBoss";
import { formatDueDate } from "@/services/filters";

function StepRow({ step, bossDefeated, onComplete, last, c }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center",
      borderBottomWidth: last ? 0 : 1, borderBottomColor: c.border }}>
      <Pressable
        onPress={step.completed || bossDefeated ? undefined : onComplete}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: !!step.completed }}
        accessibilityLabel={`Complete step ${step.text}`}
        hitSlop={10}
        style={{ minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center", marginLeft: -10 }}
      >
        <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2,
          borderColor: step.completed ? c.accent : c.textMuted,
          backgroundColor: step.completed ? c.accent : "transparent",
          alignItems: "center", justifyContent: "center" }}>
          {step.completed ? renderIcon("check", "#ffffff", 13) : null}
        </View>
      </Pressable>
      <Text style={[type.body, { flex: 1, color: step.completed || bossDefeated ? c.textMuted : c.text },
        step.completed && { textDecorationLine: "line-through" }]}>{step.text}</Text>
      {!step.completed && !bossDefeated ? (
        <Text style={[type.caption, { color: c.textMuted }]}>+150 XP</Text>
      ) : null}
    </View>
  );
}

export default function Bosses() {
  const { c } = useTheme();
  const { bosses, completeBossStep, deleteBoss } = useData();
  const [newBossUI, setNewBossUI] = useState(false);

  return (
    <Screen title="Boss battles" action={<IconButton icon="plus" accessibilityLabel="New boss battle" onPress={() => setNewBossUI(true)} />}>
      {bosses.length === 0 ? (
        <Card><EmptyState icon="swords" title="No boss battles yet" hint="Break a big goal into steps" /></Card>
      ) : (
        bosses.map((b) => {
          const done = b.steps.filter((s) => s.completed).length;
          return (
            <Card key={b.id} style={{ marginTop: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.accentSoft, alignItems: "center", justifyContent: "center" }}>
                  {renderIcon("swords", c.accent, 20)}
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[type.body, { fontSize: 17, fontWeight: "700", color: c.text }]}>{b.title}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2, gap: 8 }}>
                    <Text style={[type.caption, { color: c.textMuted }]}>
                      {done} of {b.steps.length} steps{b.dueDate ? ` · due ${formatDueDate(b.dueDate)}` : ""}
                    </Text>
                    {b.defeated ? <Chip label="Defeated" color={c.accentText} bg={c.accentSoft} /> : null}
                  </View>
                </View>
                <IconButton icon="trash" variant="plain" color={c.textMuted} accessibilityLabel={`Delete ${b.title}`}
                  onPress={() => Alert.alert("Delete boss battle", `Delete "${b.title}"?`, [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: () => deleteBoss(b.id) },
                  ])}
                  style={{ marginRight: -8 }} />
              </View>
              <ProgressBar progress={done / b.steps.length} style={{ marginTop: 12, marginBottom: 4 }} />
              {b.steps.map((st, si) => (
                <StepRow key={st.id} step={st} bossDefeated={b.defeated} last={si === b.steps.length - 1} c={c}
                  onComplete={() => completeBossStep(b.id, st.id)} />
              ))}
            </Card>
          );
        })
      )}
      {newBossUI ? <AddBoss onClose={() => setNewBossUI(false)} /> : null}
    </Screen>
  );
}
