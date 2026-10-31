import React, { useState } from "react";
import { View } from "react-native";
import { useData } from "@/components/Contexts/DataProvider";
import Screen from "@/components/UI/Screen";
import Card from "@/components/UI/Card";
import EmptyState from "@/components/UI/EmptyState";
import SegmentedControl from "@/components/UI/SegmentedControl";
import IconButton from "@/components/UI/IconButton";
import QuestRow from "@/components/UI/QuestRow";
import { AddQuest } from "@/components/UI/AddQuest";
import { isToday, isUpcoming } from "@/services/filters";

const EMPTY = [
  { icon: "list-checks", title: "Nothing due today", hint: "You're all caught up" },
  { icon: "calendar", title: "Nothing upcoming", hint: "No quests planned ahead" },
  { icon: "check-circle-2", title: "Nothing completed yet", hint: "Complete a quest to see it here" },
];

export default function Quests() {
  const { quests, completeQuest, deleteQuest } = useData();
  const [sel, setSel] = useState(0);
  const [newQuestUI, setNewQuestUI] = useState(false);

  const open = quests.filter((q) => !q.completed);
  const lists = [open.filter(isToday), open.filter(isUpcoming), quests.filter((q) => q.completed)];
  const list = lists[sel];

  return (
    <Screen title="Quests" action={<IconButton icon="plus" accessibilityLabel="New quest" onPress={() => setNewQuestUI(true)} />}>
      <SegmentedControl
        options={[{ label: "Today", count: lists[0].length }, { label: "Upcoming", count: lists[1].length }, { label: "Completed", count: lists[2].length }]}
        selected={sel} onSelect={setSel}
      />
      <Card style={{ marginTop: 12, paddingVertical: 4 }}>
        {list.length === 0 ? (
          <EmptyState {...EMPTY[sel]} />
        ) : (
          list.map((q, i) => (
            <QuestRow key={q.id} quest={q} last={i === list.length - 1}
              onComplete={() => completeQuest(q.id)} onDelete={() => deleteQuest(q.id)} />
          ))
        )}
      </Card>
      {newQuestUI ? <AddQuest onClose={() => setNewQuestUI(false)} /> : null}
    </Screen>
  );
}
