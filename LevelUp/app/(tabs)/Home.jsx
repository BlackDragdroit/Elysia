import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { useData } from "@/components/Contexts/DataProvider";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { styles, colors } from "@/assets/styles/common";
import Box from "@/components/UI/Box";
import QuestRow from "@/components/UI/QuestRow";
import { Achievement } from "@/components/UI/Achievement";
import { LevelBar } from "@/components/UI/LevelBar";
import { useNavigation } from "expo-router";
import { AddQuest } from "@/components/UI/AddQuest";
import { AddBoss } from "@/components/UI/AddBoss";
import { isToday } from "@/services/filters";

export default function Home() {
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);
  const { quests, bosses, achievements } = useData();

  const isDarkmode = theme === "dark";
  const textColor = isDarkmode ? colors.textDark : colors.textLight;

  const [newQuestUI, setNewQuestUI] = useState(false);
  const [newBossUI, setNewBossUI] = useState(false);

  const todaysQuests = quests.filter(isToday);
  const activeBosses = bosses.filter((b) => !b.defeated);
  const recentAchievements = achievements
    .filter((a) => a.unlocked)
    .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
    .slice(0, 4);

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
      {newBossUI ? <AddBoss onClose={setNewBossUI} /> : ""}
      <FadeIn speed={100}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.subTitleView}>
            <Text style={[styles.subTitle, { color: textColor }]}>
              Today's Quests
            </Text>
            <Pressable onPress={setNewQuestUI}>
              <Text style={styles.subTitleText}>+ New Quest</Text>
            </Pressable>
          </View>

          <View style={localStyles.boxView}>
            {todaysQuests.length === 0 ? (
              <Box>No Quests for today. Add a new quest to get started!</Box>
            ) : (
              <Box style={{ flexDirection: "column", alignItems: "stretch" }}>
                {todaysQuests.map((q) => (
                  <QuestRow key={q.id} quest={q} showDelete={false} />
                ))}
              </Box>
            )}
          </View>
          <View style={styles.subTitleView}>
            <Text style={[styles.subTitle, { color: textColor }]}>
              Active Boss Battles
            </Text>
            <Pressable onPress={setNewBossUI}>
              <Text style={styles.subTitleText}>+ New Boss</Text>
            </Pressable>
          </View>

          <View style={localStyles.boxView}>
            {activeBosses.length === 0 ? (
              <Box>No active boss battles. Create a new challenge!</Box>
            ) : (
              activeBosses.map((b) => {
                const done = b.steps.filter((s) => s.completed).length;
                return (
                  <Box
                    key={b.id}
                    style={{ flexDirection: "column", alignItems: "stretch" }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: textColor,
                          fontFamily: "Roboto-Variable",
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        {b.title}
                      </Text>
                      <Text style={{ color: textColor, fontSize: 13 }}>
                        {done}/{b.steps.length} steps
                      </Text>
                    </View>
                    <LevelBar
                      prog={(done / b.steps.length) * 100}
                      style={{ width: "100%", marginTop: 8 }}
                    />
                  </Box>
                );
              })
            )}
          </View>

          <View style={styles.subTitleView}>
            <Text style={[styles.subTitle, { color: textColor }]}>
              Recent Achievements
            </Text>
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Text style={styles.subTitleText}>View All {"-->"}</Text>
            </Pressable>
          </View>
          <View style={localStyles.boxView}>
            <Box>
              {recentAchievements.length === 0 ? (
                <Text
                  style={{
                    color: isDarkmode ? "#a3a3a3" : "#737373",
                    textAlign: "center",
                  }}
                >
                  Pretty empty... {"\n"} Complete quests to earn achievements!
                </Text>
              ) : (
                recentAchievements.map((a) => (
                  <Achievement
                    key={a.id}
                    title={a.title}
                    descr={a.description}
                    icon={a.icon}
                  />
                ))
              )}
            </Box>
          </View>
        </ScrollView>
      </FadeIn>
    </LinearGradient>
  );
}

const localStyles = StyleSheet.create({
  boxView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
