import React from "react";
import { View, Text, StatusBar } from "react-native";
import commonStyles from "../../assets/styles/common";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import FirstHome from "../../components/FirstHome";
export default function Home() {
  useFonts({
    "Audiowide-Regular": require("../../assets/fonts/Audiowide-Regular.ttf"),
    SpaceGrotesk: require("../../assets/fonts/SpaceGrotesk.ttf"),
  });

  return (
    <LinearGradient
      colors={["#5E1C59", "#150067"]}
      style={commonStyles.container}
    >
      <View style={commonStyles.container}>
        <StatusBar translucent />
        <FirstHome />
      </View>
    </LinearGradient>
  );
}
