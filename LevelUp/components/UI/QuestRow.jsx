import React, { useContext } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useData } from "@/components/Contexts/DataProvider";
import renderIcon from "@/assets/styles/renderIcon";
import { colors } from "@/assets/styles/common";
import { isOverdue, formatDueDate } from "@/services/filters";

// A single quest row with complete + delete actions.
const QuestRow = ({ quest, showDelete = true }) => {
  const { theme } = useContext(ThemeContext);
  const { completeQuest, deleteQuest } = useData();
  const isDarkmode = theme === "dark";
  const textColor = isDarkmode ? colors.textDark : colors.textLight;
  const overdue = isOverdue(quest);
  const due = formatDueDate(quest.dueDate);

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: isDarkmode ? "#27272a" : "#e7e5e4",
      }}
    >
      <Pressable
        onPress={() => !quest.completed && completeQuest(quest.id)}
        style={{
          width: 28,
          height: 28,
          borderRadius: 360,
          borderWidth: 2,
          borderColor: quest.completed ? colors.purple : isDarkmode ? "#a3a3a3" : "#737373",
          backgroundColor: quest.completed ? colors.purple : "transparent",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        {quest.completed && renderIcon("check", "white", 16)}
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: textColor,
            fontSize: 15,
            fontFamily: "Roboto-Variable",
            textDecorationLine: quest.completed ? "line-through" : "none",
          }}
        >
          {quest.title}
        </Text>
        <Text
          style={{
            color: overdue ? "#ef4444" : isDarkmode ? "#a3a3a3" : "#737373",
            fontSize: 12,
          }}
        >
          {quest.difficulty}
          {quest.type === "optional" ? " · optional" : ""}
          {due ? ` · due ${due}` : ""}
          {overdue ? " (overdue)" : ""}
        </Text>
      </View>
      {showDelete && (
        <Pressable
          onPress={() =>
            Alert.alert("Delete quest?", `"${quest.title}" will be removed.`, [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteQuest(quest.id),
              },
            ])
          }
          style={{ padding: 6 }}
        >
          {renderIcon("trash-2", isDarkmode ? "#a3a3a3" : "#737373", 18)}
        </Pressable>
      )}
    </View>
  );
};

export default QuestRow;
