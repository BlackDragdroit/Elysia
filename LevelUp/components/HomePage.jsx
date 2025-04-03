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
        <ScrollView style={styles.container}>
          <View style={styles.container1}>
            <Text>he</Text>
          </View>
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
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  container1: {
    flex: 1,
    height: "20em",
    width: "10em",
    borderColor: "white",
    borderWidth: 1,
  },
  container2: {},
  container3: {},
  container4: {},
  container5: {},
  container6: {},
});

export default HomePage;
