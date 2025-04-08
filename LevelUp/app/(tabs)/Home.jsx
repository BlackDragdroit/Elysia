import React, { useContext } from "react";
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
import Box from "../../components/UI/Box";
import { Achievement } from "../../components/UI/Achievement";

let font = "Roboto-Variable";
export default function Home() {
  useFonts({
    "Audiowide-Regular": require("@/assets/fonts/Audiowide-Regular.ttf"),
    SpaceGrotesk: require("@/assets/fonts/SpaceGrotesk.ttf"),
    "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Variable": require("@/assets/fonts/Roboto-Variable.ttf"),
  });

  // let showHome = true;

  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

  const textColor = isDarkmode ? colors.textDark : colors.textLight;

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
      <FadeIn speed={300}>
        <ScrollView>
          <View style={styles.subTitleView}>
            <Text style={[styles.subTitle, { color: textColor }]}>
              Today's Quests
            </Text>
            <Pressable>
              <Text style={styles.subTitleText}>+ New Task</Text>
            </Pressable>
          </View>

          <Box>No Quests for today. Add a new quest to get started!</Box>

          <View style={styles.subTitleView}>
            <Text style={[styles.subTitle, { color: textColor }]}>
              Active Boss Battles
            </Text>
            <Pressable>
              <Text style={styles.subTitleText}>+ New Boss</Text>
            </Pressable>
          </View>

          <Box>No active boss battles. Create a new challenge!</Box>

          <View style={styles.subTitleView}>
            <Text style={[styles.subTitle, { color: textColor }]}>
              Recent Achievements
            </Text>
            <Pressable>
              <Text style={styles.subTitleText}>View All {"-->"}</Text>
            </Pressable>
          </View>

          <Box>
            <Achievement
              title="Dedicator"
              descr="Complete 10 Quests"
              icon="tasks"
            />
            <Achievement
              title="Motivator"
              descr="Successfully invite 5 friends"
              icon="tasks"
            />
            <Achievement
              title="Chef in Training"
              descr="Prepare 5 healthy meals"
              icon="tasks"
            />
            <Achievement
              title="Dragon Slayer"
              descr="Defeat your first boss"
              icon="tasks"
            />

            {/* Pretty empty... {"\n"} Complete quests to earn achievements! */}
          </Box>
        </ScrollView>
      </FadeIn>
    </LinearGradient>
  );
}
