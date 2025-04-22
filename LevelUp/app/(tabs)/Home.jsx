import React, { useContext, useState } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { styles, colors } from "@/assets/styles/common";
import Box from "@/components/UI/Box";
import { Achievement } from "@/components/UI/Achievement";
import { useNavigation } from "expo-router";
import { AddQuest } from "@/components/UI/AddQuest";
import { AddBoss } from "@/components/UI/AddBoss";

let font = "Roboto-Variable";
export default function Home() {
  useFonts({
    "Audiowide-Regular": require("@/assets/fonts/Audiowide-Regular.ttf"),
    SpaceGrotesk: require("@/assets/fonts/SpaceGrotesk.ttf"),
    "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Variable": require("@/assets/fonts/Roboto-Variable.ttf"),
  });

  // let showHome = true;

  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

  const textColor = isDarkmode ? colors.textDark : colors.textLight;

  const [newQuestUI, setNewQuestUI] = useState(false);
  const [newBossUI, setNewBossUI] = useState(false);

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
      <FadeIn speed={300}>
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
            <Box>No Quests for today. Add a new quest to get started!</Box>
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
            <Box>No active boss battles. Create a new challenge!</Box>
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
              <Achievement
                title="Dedicator"
                descr="Complete 10 Quests"
                icon="swords"
              />
              <Achievement
                title="Motivator"
                descr="Successfully invite 5 friends"
                icon="swords"
              />
              <Achievement
                title="Chef in Training"
                descr="Prepare 5 healthy meals"
                icon="swords"
              />
              <Achievement
                title="Dragon Slayer"
                descr="Defeat your first boss"
                icon="swords"
              />

              {/* Pretty empty... {"\n"} Complete quests to earn achievements! */}
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
