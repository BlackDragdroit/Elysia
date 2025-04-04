import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FadeIn } from "../../assets/styles/Animations/Animations";
import { commonStyles, colors } from "../../assets/styles/common";
import { ThemeContext } from "@/components/Contexts/ThemeProvider";

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkmode = theme === "dark" ? true : false;

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
        <View style={commonStyles.container}>
          <StatusBar translucent />
        </View>
      </FadeIn>
    </LinearGradient>
  );
};

export default Profile;
