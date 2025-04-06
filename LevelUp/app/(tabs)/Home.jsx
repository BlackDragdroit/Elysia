import React, { useContext } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { commonStyles, colors } from "../../assets/styles/common";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { subTitleSize, textColorPurple } from "@/assets/styles/common";
import Box from "../../components/UI/Box";

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
        <ScrollView
          bounces={true}
          alwaysBounceVertical={true}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 138 + 1 }}
        >
          <View style={styles.subTitleView}>
            <Text style={[styles.header, { color: textColor }]}>
              Today's Quests
            </Text>
            <Pressable>
              <Text style={styles.subTitleText}>+ New Task</Text>
            </Pressable>
          </View>

          <Box>No Quests for today. Add a new quest to get started!</Box>

          <View style={styles.subTitleView}>
            <Text style={[styles.header, { color: textColor }]}>
              Active Boss Battles
            </Text>
            <Pressable>
              <Text style={styles.subTitleText}>+ New Boss</Text>
            </Pressable>
          </View>

          <Box>No active boss battles. Create a new challenge!</Box>

          <View style={styles.subTitleView}>
            <Text style={[styles.header, { color: textColor }]}>
              Recent Achievements
            </Text>
            <Pressable>
              <Text style={styles.subTitleText}>View All {"-->"}</Text>
            </Pressable>
          </View>

          <Box>
            Pretty empty... {"\n"} Complete quests to earn achievements!
          </Box>
        </ScrollView>
      </FadeIn>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: subTitleSize,
    fontFamily: font,
    fontWeight: "bold",
    marginLeft: 10,
  },

  subTitleView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  subTitleText: {
    fontFamily: font,
    color: textColorPurple,
    marginRight: 10,
    marginTop: 10,
  },
});
