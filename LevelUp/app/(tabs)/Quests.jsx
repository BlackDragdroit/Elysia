import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useData } from "@/components/Contexts/DataProvider";
import { styles, colors } from "@/assets/styles/common";
import { NewQuestButton } from "@/components/UI/NewQuestButton";
import renderIcon from "@/assets/styles/renderIcon";
import Box from "@/components/UI/Box";
import QuestRow from "@/components/UI/QuestRow";
import { AddQuest } from "@/components/UI/AddQuest";
import { isToday, isUpcoming } from "@/services/filters";

const Quests = () => {
  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark";
  const textColor = isDarkmode ? colors.textDark : colors.textLight;

  const [newQuestUI, setNewQuestUI] = useState(false);

  return (
    <LinearGradient
      colors={
        isDarkmode
          ? [colors.gradientDark1, colors.gradientDark2]
          : [colors.gradientLight1, colors.gradientLight2]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {newQuestUI ? <AddQuest onClose={setNewQuestUI} /> : ""}
      <FadeIn speed={100}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                marginTop: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Text
                style={[styles.subTitle, { color: textColor, marginLeft: 0 }]}
              >
                All Quests
              </Text>
              <Pressable onPress={setNewQuestUI}>
                <NewQuestButton />
              </Pressable>
            </View>
          </View>
          <TaskMapper
            textColor={textColor}
            back1={isDarkmode ? "#27272a" : "#f5f5f4"}
            back2={isDarkmode ? "black" : "white"}
          />
        </ScrollView>
      </FadeIn>
    </LinearGradient>
  );
};

const TaskMapper = ({ textColor, back1, back2 }) => {
  const { quests } = useData();
  const [selected, setSelected] = useState(0);

  const today = quests.filter(isToday);
  const upcoming = quests.filter(isUpcoming);
  const completed = quests
    .filter((q) => q.completed)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  const sections = [today, upcoming, completed];
  const emptyTexts = [
    "No quests for today. Add a new quest to get started!",
    "No upcoming quests scheduled. Plan ahead by adding some future quests!",
    "You haven't completed any quests yet. Get to work!",
  ];
  const current = sections[selected];

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: "90%",
          height: 35,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: back1,
          borderRadius: 5,
        }}
      >
        <Pressable
          style={[
            localStyles.textContainer,
            { backgroundColor: selected == 0 ? back2 : "transparent" },
          ]}
          onPress={() => setSelected(0)}
        >
          {renderIcon("calendar", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>Today</Text>
        </Pressable>

        <Pressable
          style={[
            localStyles.textContainer,
            { backgroundColor: selected == 1 ? back2 : "transparent" },
          ]}
          onPress={() => setSelected(1)}
        >
          {renderIcon("calendar-arrow-up", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>Upcoming</Text>
        </Pressable>
        <Pressable
          style={[
            localStyles.textContainer,
            { backgroundColor: selected == 2 ? back2 : "transparent" },
          ]}
          onPress={() => setSelected(2)}
        >
          {renderIcon("calendar-check", textColor, 14)}
          <Text style={[localStyles.text, { color: textColor }]}>
            Completed
          </Text>
        </Pressable>
      </View>
      {current.length === 0 ? (
        <Box>{emptyTexts[selected]}</Box>
      ) : (
        <Box style={{ flexDirection: "column", alignItems: "stretch" }}>
          {current.map((q) => (
            <QuestRow key={q.id} quest={q} />
          ))}
        </Box>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  textContainer: {
    backgroundColor: "white",
    width: "32%",
    height: "80%",
    flexDirection: "row",
    marginVertical: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    fontFamily: "Roboto-Variable",
    fontWeight: "200",
  },
});

export default Quests;
