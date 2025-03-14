import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { FadeIn } from "../assets/styles/Animations/Animations";
import commonStyles from "../assets/styles/common";

const HomePage = () => {
  return (
    <GestureHandlerRootView>
      <FadeIn speed={300}>
        <ScrollView>
          <View style={styles.container1} />
          <View style={styles.container2} />
          <View style={styles.container3} />
          <View style={styles.container4} />
          <View style={styles.container5} />
          <View style={styles.container6} />
        </ScrollView>
      </FadeIn>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container1: {},
  container2: {},
  container3: {},
  container4: {},
  container5: {},
  container6: {},
});

export default HomePage;
