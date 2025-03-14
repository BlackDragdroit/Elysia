import React from "react";
import { View, StatusBar } from "react-native";
import commonStyles from "../../assets/styles/common";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import HomePage from "../../components/HomePage";
import HomeIntro from "../../components/HomeIntro";
export default function Home() {
  useFonts({
    "Audiowide-Regular": require("../../assets/fonts/Audiowide-Regular.ttf"),
    SpaceGrotesk: require("../../assets/fonts/SpaceGrotesk.ttf"),
  });

  let showIntro = false;
  let showHome = true;

  return (
    <LinearGradient
      colors={["#5E1C59", "#150067"]}
      style={commonStyles.container}
    >
      {showIntro && (
        <>
          <HomeIntro />
        </>
      )}
      {showHome && (
        <>
          <HomePage />
        </>
      )}
    </LinearGradient>
  );
}
