import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { useSearchParams } from "expo-router/build/hooks";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { styles, colors } from "@/assets/styles/common";
import { NewQuestButton } from "@/components/UI/NewQuestButton";
import renderIcon from "@/assets/styles/renderIcon";
import Box from "@/components/UI/Box";
import { AddQuest } from "@/components/UI/AddQuest";

const Quests = () => {
  let params = useSearchParams();

  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

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
          {taskMapper(
            textColor,
            isDarkmode ? "#27272a" : "#f5f5f4",
            isDarkmode ? "black" : "white"
          )}
        </ScrollView>
      </FadeIn>
    </LinearGradient>
  );
};

const taskMapper = (textColor, back1, back2) => {
  const [selected, setSelected] = useState(0);

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
      {selected == 0 && (
        <Box>No quests for today. Add a new quest to get started!</Box>
      )}
      {selected == 1 && (
        <Box>
          No upcoming quests scheduled. Plan ahead by adding some future quests!
        </Box>
      )}
      {selected == 2 && (
        <Box>You haven't completed any quests yet. Get to work!</Box>
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
