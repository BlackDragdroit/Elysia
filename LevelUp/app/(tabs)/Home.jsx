import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { commonStyles, colors } from "../../assets/styles/common";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import HomePage from "../../components/HomePage";
import HomeIntro from "../../components/HomeIntro";
export default function Home() {
  useFonts({
    "Audiowide-Regular": require("../../assets/fonts/Audiowide-Regular.ttf"),
    SpaceGrotesk: require("../../assets/fonts/SpaceGrotesk.ttf"),
  });

  let showIntro = true;
  // let showHome = true;

  return (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {showIntro && (
        <>
          <HomeIntro />
        </>
      )}
      {!showIntro && (
        <>
          <HomePage />
        </>
      )}
    </LinearGradient>
  );
}
