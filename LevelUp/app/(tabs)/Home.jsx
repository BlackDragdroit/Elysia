import React, { useContext } from "react";
import { View, StatusBar, StyleSheet, Text, Pressable } from "react-native";
import { commonStyles, colors } from "../../assets/styles/common";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";
import { FadeIn } from "@/assets/styles/Animations/Animations";
import { subTitleSize, textColorPurple } from "@/assets/styles/common";

let font = "Audiowide-Regular";
export default function Home() {
  useFonts({
    "Audiowide-Regular": require("@/assets/fonts/Audiowide-Regular.ttf"),
    SpaceGrotesk: require("@/assets/fonts/SpaceGrotesk.ttf"),
    "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
  });

  // let showHome = true;

  const { theme } = useContext(ThemeContext);

  const isDarkmode = theme === "dark" ? true : false;

  const textColor = isDarkmode ? "white" : "black";

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
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={[styles.header, { color: textColor }]}>
            Today's Quests
          </Text>
          <Pressable>
            <Text
              style={{
                fontFamily: font,
                color: textColorPurple,
                marginRight: 10,
                marginTop: 10,
              }}
            >
              + New Task
            </Text>
          </Pressable>
        </View>
      </FadeIn>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: subTitleSize,
    fontFamily: font,
    marginLeft: 10,
  },
});
