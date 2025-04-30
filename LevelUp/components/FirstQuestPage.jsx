import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";

import font from "@/assets/styles/common";
import { FadeIn } from "../assets/styles/Animations/Animations";

const FirstQuestPage = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <FadeIn speed={100}>
      <View style={styles.container}>
        <StatusBar translucent />
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Pressable
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Create your first Quest</Text>
          </Pressable>
        </Animated.View>
      </View>
    </FadeIn>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "white",
  },
  button: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    width: 200,
    height: 100,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontFamily: font,
  },
});

export default FirstQuestPage;
