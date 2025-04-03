import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import "react-native-reanimated";
import "react-native-gesture-handler";
import React, { useRef } from "react";
import { FadeInOut } from "../assets/styles/Animations/Animations";
import { commonStyles } from "../assets/styles/common";

const HomeIntro = () => {
  return (
    <View style={styles.container}>
      <FadeInOut duration={2000}>
        <View style={styles.textContainer}>
          <StatusBar translucent />
          <Text style={commonStyles.title}>This is your Home Page</Text>
        </View>
      </FadeInOut>
      <FadeInOut duration={2000} delay={2500}>
        <View style={styles.textContainer}>
          <Text style={commonStyles.title}>
            This Page is basically your Overview
          </Text>
        </View>
      </FadeInOut>
      <FadeInOut duration={2000} delay={4500}>
        <View style={styles.textContainer}>
          <Text style={commonStyles.title}>
            You can see important Profile Information
          </Text>
        </View>
      </FadeInOut>
      <FadeInOut duration={2000} delay={6500}>
        <View style={styles.textContainer}>
          <Text style={commonStyles.title}>Notifications</Text>
        </View>
      </FadeInOut>
      <FadeInOut duration={2000} delay={8500}>
        <View style={styles.textContainer}>
          <Text style={commonStyles.title}>Your current Quests</Text>
        </View>
      </FadeInOut>
      <FadeInOut duration={2000} delay={10500}>
        <View style={styles.textContainer}>
          <Text style={commonStyles.title}>And upcoming Events!</Text>
        </View>
      </FadeInOut>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default HomeIntro;
