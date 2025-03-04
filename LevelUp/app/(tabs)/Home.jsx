import React from "react";
import { View, Text, StatusBar } from "react-native";
import commonStyles from "../../assets/styles/common";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
export default function Home() {
  useFonts({
    "Audiowide-Regular": require("../../assets/fonts/Audiowide-Regular.ttf"),
  });

  return (
    <LinearGradient
      colors={["#150067", "#5E1C59"]}
      style={commonStyles.container}
    >
      <View style={commonStyles.container}>
        <StatusBar
          translucent
          backgroundColor="black"
          barStyle="light-content"
        />
        <Text style={commonStyles.title}>Home</Text>
        <View style={commonStyles.contentContainer}>
          <Text style={commonStyles.text}>Welcome to LevelUp!</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
