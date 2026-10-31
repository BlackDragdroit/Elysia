import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router, useNavigation } from "expo-router";
import { useData } from "@/components/Contexts/DataProvider";
import { useTheme, type } from "@/assets/styles/theme";
import renderIcon from "@/assets/styles/renderIcon";
import Screen from "@/components/UI/Screen";
import Card from "@/components/UI/Card";
import SectionHeader from "@/components/UI/SectionHeader";
import EmptyState from "@/components/UI/EmptyState";
import QuestRow from "@/components/UI/QuestRow";
import PlayerCard from "@/components/UI/PlayerCard";
import ProgressBar from "@/components/UI/ProgressBar";
import { AddQuest } from "@/components/UI/AddQuest";
import { AddBoss } from "@/components/UI/AddBoss";
import { isToday } from "@/services/filters";

export default function Home() {
  const { c } = useTheme();
  const nav = useNavigation();
  const { profile, quests, bosses, achievements, completeQuest } = useData();
  const [newQuestUI, setNewQuestUI] = useState(false);
  const [newBossUI, setNewBossUI] = useState(false);

  const todays = quests.filter((q) => !q.completed && isToday(q));
  const activeBosses = bosses.filter((b) => !b.defeated);
  const recent = achievements.filter((a) => a.unlocked).slice(-3).reverse();

  return (
    <Screen>
      {profile ? <PlayerCard profile={profile} /> : null}

      <SectionHeader title="Today" action="New quest" onAction={() => setNewQuestUI(true)} />
      <Card style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
        {todays.length === 0 ? (
          <EmptyState icon="list-checks" title="No quests for today" hint="Tap + to add one" />
        ) : (
          todays.map((q, i) => (
            <QuestRow key={q.id} quest={q} last={i === todays.length - 1}
              showDelete={false} onComplete={() => completeQuest(q.id)} />
          ))
        )}
      </Card>

      <SectionHeader title="Boss battles" action="New boss" onAction={() => setNewBossUI(true)} />
      <Card style={{ paddingVertical: 4 }}>
        {activeBosses.length === 0 ? (
          <EmptyState icon="swords" title="No active boss battles" hint="Break a big goal into steps" />
        ) : (
          activeBosses.map((b, i) => {
            const done = b.steps.filter((s) => s.completed).length;
            return (
              <Pressable key={b.id} onPress={() => nav.navigate("Bosses")}
                accessibilityRole="button" accessibilityLabel={`${b.title}, ${done} of ${b.steps.length} steps`}
                style={{ flexDirection: "row", alignItems: "center", paddingVertical: 12,
                  borderBottomWidth: i === activeBosses.length - 1 ? 0 : 1, borderBottomColor: c.border }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.accentSoft, alignItems: "center", justifyContent: "center" }}>
                  {renderIcon("swords", c.accent, 20)}
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[type.body, { color: c.text, fontWeight: "500" }]} numberOfLines={1}>{b.title}</Text>
                  <Text style={[type.caption, { color: c.textMuted, marginTop: 2 }]}>{done} of {b.steps.length} steps</Text>
                  <ProgressBar progress={done / b.steps.length} style={{ marginTop: 6 }} />
                </View>
              </Pressable>
            );
          })
        )}
      </Card>

      <SectionHeader title="Recent achievements" action="See all" onAction={() => nav.navigate("Profile")} />
      <Card style={{ paddingVertical: 4 }}>
        {recent.length === 0 ? (
          <EmptyState icon="trophy" title="No achievements yet" hint="Complete your first quest to unlock one" />
        ) : (
          recent.map((a, i) => (
            <View key={a.id} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10,
              borderBottomWidth: i === recent.length - 1 ? 0 : 1, borderBottomColor: c.border }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.accentSoft, alignItems: "center", justifyContent: "center" }}>
                {renderIcon(a.icon || "award", c.accent, 20)}
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[type.body, { color: c.text, fontWeight: "500" }]}>{a.title}</Text>
                <Text style={[type.caption, { color: c.textMuted }]}>{a.description}</Text>
              </View>
            </View>
          ))
        )}
      </Card>

      {newQuestUI ? <AddQuest onClose={() => setNewQuestUI(false)} /> : null}
      {newBossUI ? <AddBoss onClose={() => setNewBossUI(false)} /> : null}
    </Screen>
  );
}
